import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { rateLimit } from "@/lib/rate-limit";

const limiter = rateLimit({
  maxRequests: 3,
  windowMs: 15 * 60 * 1000, // 3 submissions per 15 minutes per IP
});

// Validate environment variables once
function getMailConfig() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT) || 587;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const to = process.env.CONTACT_EMAIL;

  if (!host || !user || !pass || !to) {
    return null;
  }

  return { host, port, user, pass, to };
}

export async function POST(request: NextRequest) {
  // --- Rate limiting ---
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() || "unknown";

  const { allowed, remaining, retryAfterMs } = limiter(ip);

  if (!allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      {
        status: 429,
        headers: {
          "Retry-After": String(Math.ceil(retryAfterMs / 1000)),
          "X-RateLimit-Remaining": "0",
        },
      },
    );
  }

  // --- Input validation ---
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 },
    );
  }

  const { name, email, phone, service, message } = body as {
    name: string;
    email: string;
    phone?: string;
    service?: string;
    message: string;
  };

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return NextResponse.json(
      { error: "Name, email, and message are required." },
      { status: 400 },
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { error: "Invalid email address." },
      { status: 400 },
    );
  }

  // Honeypot / basic anti-spam: reject if message is suspiciously long
  if (name.length > 200 || email.length > 254 || message.length > 5000) {
    return NextResponse.json({ error: "Input too long." }, { status: 400 });
  }

  // --- Send email ---
  const config = getMailConfig();

  if (!config) {
    console.error("SMTP environment variables are not configured.");
    return NextResponse.json(
      { error: "Mail service is not configured. Please contact us directly." },
      { status: 503 },
    );
  }

  const transporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.port === 465,
    auth: {
      user: config.user,
      pass: config.pass,
    },
  });

  const htmlBody = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #3b82f6; border-bottom: 2px solid #3b82f6; padding-bottom: 8px;">
        New Contact Message — NJIWA
      </h2>
      <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
        <tr>
          <td style="padding: 8px 12px; font-weight: 600; color: #555; width: 120px;">Name</td>
          <td style="padding: 8px 12px;">${escapeHtml(name)}</td>
        </tr>
        <tr style="background: #f9f9f9;">
          <td style="padding: 8px 12px; font-weight: 600; color: #555;">Email</td>
          <td style="padding: 8px 12px;"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td>
        </tr>
        ${
          phone
            ? `<tr>
                <td style="padding: 8px 12px; font-weight: 600; color: #555;">Phone</td>
                <td style="padding: 8px 12px;">${escapeHtml(phone)}</td>
              </tr>`
            : ""
        }
        ${
          service
            ? `<tr style="background: #f9f9f9;">
                <td style="padding: 8px 12px; font-weight: 600; color: #555;">Service</td>
                <td style="padding: 8px 12px;">${escapeHtml(service)}</td>
              </tr>`
            : ""
        }
      </table>
      <div style="margin-top: 20px; padding: 16px; background: #f4f4f5; border-radius: 8px;">
        <p style="margin: 0 0 8px; font-weight: 600; color: #555;">Message</p>
        <p style="margin: 0; white-space: pre-wrap; color: #333;">${escapeHtml(message)}</p>
      </div>
      <p style="margin-top: 24px; font-size: 12px; color: #999;">
        Sent from njiwa.cd contact form
      </p>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: `"NJIWA Contact" <${config.user}>`,
      replyTo: email,
      to: config.to,
      subject: `[NJIWA] New message from ${name}${service ? ` — ${service}` : ""}`,
      html: htmlBody,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || "N/A"}\nService: ${service || "N/A"}\n\nMessage:\n${message}`,
    });
  } catch (err) {
    console.error("Failed to send email:", err);
    return NextResponse.json(
      { error: "Failed to send message. Please try again later." },
      { status: 500 },
    );
  }

  return NextResponse.json(
    { success: true },
    {
      headers: {
        "X-RateLimit-Remaining": String(remaining),
      },
    },
  );
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

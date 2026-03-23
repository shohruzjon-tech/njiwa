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

  // --- Confirmation email to sender ---
  const confirmationHtml = `
    <!DOCTYPE html>
    <html lang="en">
    <head><meta charset="UTF-8" /></head>
    <body style="margin: 0; padding: 0; background-color: #09090b; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, sans-serif;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #09090b; padding: 40px 0;">
        <tr>
          <td align="center">
            <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width: 560px; width: 100%;">

              <!-- Logo / Brand -->
              <tr>
                <td align="center" style="padding: 0 0 32px;">
                  <span style="font-size: 28px; font-weight: 700; letter-spacing: -0.5px; color: #ffffff;">NJIWA</span>
                </td>
              </tr>

              <!-- Card -->
              <tr>
                <td style="background-color: #111111; border: 1px solid rgba(255,255,255,0.06); border-radius: 16px; overflow: hidden;">

                  <!-- Blue accent bar -->
                  <div style="height: 4px; background: linear-gradient(90deg, #3b82f6 0%, #60a5fa 50%, #3b82f6 100%);"></div>

                  <!-- Check icon + heading -->
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td align="center" style="padding: 40px 40px 0;">
                        <div style="width: 64px; height: 64px; border-radius: 50%; background: rgba(16,185,129,0.1); border: 2px solid rgba(16,185,129,0.25); display: inline-block; line-height: 64px; text-align: center;">
                          <span style="font-size: 28px; line-height: 64px;">✓</span>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td align="center" style="padding: 20px 40px 0;">
                        <h1 style="margin: 0; font-size: 22px; font-weight: 600; color: #ffffff; letter-spacing: -0.3px;">
                          Message Received
                        </h1>
                      </td>
                    </tr>
                    <tr>
                      <td align="center" style="padding: 12px 40px 0;">
                        <p style="margin: 0; font-size: 15px; line-height: 24px; color: #a1a1aa;">
                          Hi <strong style="color: #d4d4d8;">${escapeHtml(name)}</strong>, thank you for reaching out to us. We&rsquo;ve received your message and our team will get back to you shortly.
                        </p>
                      </td>
                    </tr>
                  </table>

                  <!-- Divider -->
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td style="padding: 28px 40px;">
                        <div style="height: 1px; background: rgba(255,255,255,0.06);"></div>
                      </td>
                    </tr>
                  </table>

                  <!-- Message summary -->
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td style="padding: 0 40px;">
                        <p style="margin: 0 0 16px; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: #71717a;">
                          Your Message Summary
                        </p>
                      </td>
                    </tr>
                    ${
                      service
                        ? `<tr>
                            <td style="padding: 0 40px 12px;">
                              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background: rgba(255,255,255,0.03); border-radius: 10px; border: 1px solid rgba(255,255,255,0.06);">
                                <tr>
                                  <td style="padding: 12px 16px;">
                                    <p style="margin: 0 0 2px; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: #71717a;">Service</p>
                                    <p style="margin: 0; font-size: 14px; color: #e4e4e7;">${escapeHtml(service)}</p>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>`
                        : ""
                    }
                    <tr>
                      <td style="padding: 0 40px 12px;">
                        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background: rgba(255,255,255,0.03); border-radius: 10px; border: 1px solid rgba(255,255,255,0.06);">
                          <tr>
                            <td style="padding: 12px 16px;">
                              <p style="margin: 0 0 2px; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: #71717a;">Message</p>
                              <p style="margin: 0; font-size: 14px; color: #e4e4e7; white-space: pre-wrap; line-height: 22px;">${escapeHtml(message)}</p>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>

                  <!-- Response time note -->
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td style="padding: 16px 40px 36px;">
                        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background: rgba(59,130,246,0.06); border-radius: 10px; border: 1px solid rgba(59,130,246,0.12);">
                          <tr>
                            <td style="padding: 14px 16px;">
                              <p style="margin: 0; font-size: 13px; line-height: 20px; color: #93c5fd;">
                                ⏱ We typically respond within <strong>24 hours</strong> during business days. If your matter is urgent, don&rsquo;t hesitate to call us directly.
                              </p>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>

                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td align="center" style="padding: 28px 0 0;">
                  <p style="margin: 0 0 6px; font-size: 13px; color: #52525b;">
                    NJIWA &mdash; Innovation &amp; Excellence
                  </p>
                  <p style="margin: 0; font-size: 12px; color: #3f3f46;">
                    Lubumbashi, DR Congo &bull; <a href="https://njiwa.cd" style="color: #60a5fa; text-decoration: none;">njiwa.cd</a>
                  </p>
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;

  const confirmationText = `Hi ${name},\n\nThank you for contacting NJIWA. We've received your message and will get back to you within 24 hours.\n\nYour message summary:\n${service ? `Service: ${service}\n` : ""}Message: ${message}\n\nBest regards,\nThe NJIWA Team\nhttps://njiwa.cd`;

  try {
    // Send notification to team
    await transporter.sendMail({
      from: `"NJIWA Contact" <${config.user}>`,
      replyTo: email,
      to: config.to,
      subject: `[NJIWA] New message from ${name}${service ? ` — ${service}` : ""}`,
      html: htmlBody,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || "N/A"}\nService: ${service || "N/A"}\n\nMessage:\n${message}`,
    });

    // Send confirmation to the sender
    await transporter.sendMail({
      from: `"NJIWA" <${config.user}>`,
      to: email,
      subject: "We received your message — NJIWA",
      html: confirmationHtml,
      text: confirmationText,
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

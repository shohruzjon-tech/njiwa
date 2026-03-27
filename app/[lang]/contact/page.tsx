import type { Metadata } from "next";
import { getDictionary, hasLocale } from "../dictionaries";
import type { Locale } from "../dictionaries";
import { notFound } from "next/navigation";
import ContactForm from "@/components/contact-form";
import Image from "next/image";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang as Locale);

  const otherLang = lang === "fr" ? "en" : "fr";

  return {
    title: `${dict.contact.title} — NJIWA`,
    description: dict.contact.subtitle,
    alternates: {
      canonical: `/${lang}/contact`,
      languages: {
        [otherLang]: `/${otherLang}/contact`,
      },
    },
    openGraph: {
      title: `${dict.contact.title} — NJIWA`,
      description: dict.contact.subtitle,
      type: "website",
      locale: lang,
      alternateLocale: otherLang,
      url: `/${lang}/contact`,
    },
  };
}

export default async function ContactPage({
  params,
}: PageProps<"/[lang]/contact">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang as Locale);

  return (
    <>
      {/* ── Hero ── */}
      <div className="relative overflow-hidden border-b border-white/[0.06] py-28 px-6">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-40 left-1/4 h-80 w-80 rounded-full bg-primary/8 blur-[120px]" />
          <div className="absolute -bottom-20 right-1/4 h-60 w-60 rounded-full bg-accent/6 blur-[100px]" />
          <div className="absolute inset-0 dot-grid" />
        </div>
        <div className="relative mx-auto max-w-3xl text-center animate-[fade-in_0.6s_ease-out]">
          <span className="pill-badge mb-4">{dict.contact.title}</span>
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            {dict.contact.title}
          </h1>
          <p className="mt-5 text-lg text-zinc-400">{dict.contact.subtitle}</p>
        </div>
      </div>

      {/* ── Form + Info ── */}
      <section className="py-24 px-6">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-5 lg:gap-16">
            {/* Contact form */}
            <div className="lg:col-span-3 animate-[slide-up_0.6s_ease-out]">
              <div className="glass-card rounded-3xl p-8 sm:p-10">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold tracking-tight text-white">
                    {dict.contact.form.message}
                  </h2>
                  <p className="mt-1.5 text-sm text-zinc-500">
                    {dict.contact.subtitle}
                  </p>
                </div>
                <ContactForm dict={dict} />
              </div>
            </div>

            {/* Info column */}
            <div className="lg:col-span-2 animate-[slide-up_0.6s_ease-out_0.12s_both]">
              <div className="flex h-full flex-col gap-5">
                {/* Address card */}
                <div className="group glass-card rounded-2xl p-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary-light ring-1 ring-primary/20">
                    <svg
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                      <circle cx="12" cy="9" r="2.5" />
                    </svg>
                  </div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-zinc-500">
                    {dict.contact.addressFull.label}
                  </p>
                  <div className="space-y-0.5 text-sm leading-relaxed text-zinc-300">
                    {dict.contact.addressFull.lines.map((line, i) => (
                      <p key={i}>{line}</p>
                    ))}
                  </div>
                </div>

                {/* Phone card */}
                <a
                  href="tel:+2439942951808140550444"
                  className="group glass-card rounded-2xl p-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:ring-primary/20"
                >
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary-light ring-1 ring-primary/20">
                    <svg
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </div>
                  <p className="mb-1.5 text-xs font-semibold uppercase tracking-widest text-zinc-500">
                    {dict.contact.phoneLabel}
                  </p>
                  <p className="text-sm font-medium text-white transition-colors group-hover:text-primary-light">
                    {dict.footer.contactInfo.phone}
                  </p>
                </a>

                {/* Email card */}
                <a
                  href={`mailto:${dict.footer.contactInfo.email}`}
                  className="group glass-card rounded-2xl p-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:ring-primary/20"
                >
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary-light ring-1 ring-primary/20">
                    <svg
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                  </div>
                  <p className="mb-1.5 text-xs font-semibold uppercase tracking-widest text-zinc-500">
                    {dict.contact.emailLabel}
                  </p>
                  <p className="text-sm font-medium text-white transition-colors group-hover:text-primary-light break-all">
                    {dict.footer.contactInfo.email}
                  </p>
                </a>

                {/* Quick CTA */}
                <a
                  href={`/${lang}/team`}
                  className="group flex items-center justify-between rounded-2xl border border-white/[0.06] bg-white/[0.02] px-6 py-4 transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.04]"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent/10 text-accent ring-1 ring-accent/20">
                      <svg
                        className="h-4 w-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      >
                        <circle cx="9" cy="7" r="4" />
                        <path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
                        <path d="M16 3.13a4 4 0 0 1 0 7.75M21 21v-2a4 4 0 0 0-3-3.85" />
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-zinc-300">
                      {dict.nav.team}
                    </span>
                  </div>
                  <svg
                    className="h-4 w-4 text-zinc-600 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-white"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Map ── */}
      <section className="border-t border-white/[0.06] px-6 pb-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-zinc-500">
                {dict.contact.mapLabel}
              </p>
              <h2 className="text-2xl font-bold tracking-tight text-white">
                {dict.contact.addressFull.lines[2]}
              </h2>
            </div>
            <a
              href="https://maps.app.goo.gl/p3CtM5W6VARcrWu96"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.04] px-4 py-2 text-xs font-medium text-zinc-400 transition-all duration-200 hover:border-white/[0.14] hover:text-white"
            >
              <svg
                className="h-3.5 w-3.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
              Google Maps
            </a>
          </div>
          <div className="overflow-hidden rounded-3xl ring-1 ring-white/[0.06] shadow-2xl">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3907.5401079040316!2d27.486731!3d-11.656084!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2s!5e0!3m2!1sen!2s!4v1774607517529!5m2!1sen!2s"
              width="100%"
              height="480"
              style={{ border: 0, display: "block" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={dict.contact.mapLabel}
            />
          </div>
        </div>
      </section>
    </>
  );
}

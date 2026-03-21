import type { Metadata } from "next";
import { getDictionary, hasLocale } from "../dictionaries";
import type { Locale } from "../dictionaries";
import { notFound } from "next/navigation";
import Section from "@/components/section";
import ContactForm from "@/components/contact-form";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang as Locale);

  return {
    title: `${dict.contact.title} — NJIWA`,
    description: dict.contact.subtitle,
    openGraph: {
      title: `${dict.contact.title} — NJIWA`,
      description: dict.contact.subtitle,
      type: "website",
      locale: lang,
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
      {/* Page header */}
      <div className="bg-gradient-to-br from-primary-dark via-primary to-primary-light py-24 px-6">
        <div className="mx-auto max-w-3xl text-center animate-[fade-in_0.6s_ease-out]">
          <h1 className="text-4xl font-bold text-white sm:text-5xl">
            {dict.contact.title}
          </h1>
          <p className="mt-4 text-lg text-blue-100/90">
            {dict.contact.subtitle}
          </p>
        </div>
      </div>

      <Section>
        <div className="grid gap-12 lg:grid-cols-5">
          {/* Form */}
          <div className="lg:col-span-3 animate-[slide-up_0.6s_ease-out]">
            <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-lg sm:p-10">
              <ContactForm dict={dict} />
            </div>
          </div>

          {/* Contact info sidebar */}
          <div className="lg:col-span-2 animate-[slide-up_0.6s_ease-out_0.15s_both]">
            <div className="space-y-8">
              {/* Address */}
              <div className="flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                    <circle cx="12" cy="9" r="2.5" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {dict.contact.addressLabel}
                  </h3>
                  <p className="mt-1 text-sm text-gray-600">
                    {dict.footer.contactInfo.address}
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {dict.contact.phoneLabel}
                  </h3>
                  <p className="mt-1 text-sm text-gray-600">
                    {dict.footer.contactInfo.phone}
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{dict.contact.emailLabel}</h3>
                  <p className="mt-1 text-sm text-gray-600">
                    {dict.footer.contactInfo.email}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}

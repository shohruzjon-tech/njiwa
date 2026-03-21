import type { Metadata } from "next";
import { getDictionary, hasLocale } from "../dictionaries";
import type { Locale } from "../dictionaries";
import { notFound } from "next/navigation";
import Section from "@/components/section";
import ServiceCard from "@/components/service-card";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang as Locale);

  return {
    title: `${dict.services.title} — NJIWA`,
    description: dict.services.subtitle,
    openGraph: {
      title: `${dict.services.title} — NJIWA`,
      description: dict.services.subtitle,
      type: "website",
      locale: lang,
    },
  };
}

export default async function ServicesPage({
  params,
}: PageProps<"/[lang]/services">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang as Locale);

  return (
    <>
      {/* Page header */}
      <div className="bg-gradient-to-br from-primary-dark via-primary to-primary-light py-24 px-6">
        <div className="mx-auto max-w-3xl text-center animate-[fade-in_0.6s_ease-out]">
          <h1 className="text-4xl font-bold text-white sm:text-5xl">
            {dict.services.title}
          </h1>
          <p className="mt-4 text-lg text-blue-100/90">
            {dict.services.subtitle}
          </p>
        </div>
      </div>

      {/* All services with full features */}
      <Section>
        <div className="grid gap-8 sm:grid-cols-2">
          {dict.services.items.map((item, i) => (
            <ServiceCard
              key={item.id}
              id={item.id}
              title={item.title}
              description={item.description}
              features={item.features}
              index={i}
            />
          ))}
        </div>
      </Section>

      {/* CTA */}
      <section className="bg-gray-50 py-20 px-6">
        <div className="mx-auto max-w-2xl text-center animate-[fade-in_0.6s_ease-out]">
          <h2 className="text-3xl font-bold text-gray-900">
            {dict.hero.secondaryCta}
          </h2>
          <p className="mt-4 text-gray-600">{dict.contact.subtitle}</p>
          <a
            href={`/${lang}/contact`}
            className="mt-8 inline-flex items-center rounded-full bg-primary px-8 py-3.5 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:bg-primary-light hover:shadow-xl hover:-translate-y-0.5"
          >
            {dict.common.contactUs}
            <svg className="ml-2 h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </a>
        </div>
      </section>
    </>
  );
}

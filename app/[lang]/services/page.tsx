import type { Metadata } from "next";
import { getDictionary, hasLocale } from "../dictionaries";
import type { Locale } from "../dictionaries";
import { notFound } from "next/navigation";
import ServiceCard from "@/components/service-card";

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
    title: `${dict.services.title} — NJIWA`,
    description: dict.services.subtitle,
    alternates: {
      canonical: `/${lang}/services`,
      languages: {
        [otherLang]: `/${otherLang}/services`,
      },
    },
    openGraph: {
      title: `${dict.services.title} — NJIWA`,
      description: dict.services.subtitle,
      type: "website",
      locale: lang,
      alternateLocale: otherLang,
      url: `/${lang}/services`,
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
    <div>
      {/* Page header */}
      <div className="relative overflow-hidden border-b border-white/[0.06] py-28 px-6">
        {/* Decorative bg elements */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-40 left-1/4 h-80 w-80 rounded-full bg-primary/8 blur-[120px]" />
          <div className="absolute -bottom-20 right-1/4 h-60 w-60 rounded-full bg-accent/6 blur-[100px]" />
          <div className="absolute inset-0 dot-grid" />
        </div>
        <div className="relative mx-auto max-w-3xl text-center animate-[fade-in_0.6s_ease-out]">
          <span className="pill-badge mb-4">{dict.services.title}</span>
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            {dict.services.title}
          </h1>
          <p className="mt-5 text-lg text-zinc-400">{dict.services.subtitle}</p>
        </div>
      </div>

      {/* All services – expanded cards */}
      <section className="py-20 px-6">
        <div className="mx-auto max-w-7xl space-y-10">
          {dict.services.items.map((item, i) => (
            <ServiceCard
              key={item.id}
              id={item.id}
              title={item.title}
              description={item.description}
              features={item.features}
              index={i}
              expanded
            />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden border-t border-white/[0.06] py-28 px-6">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/6 blur-[150px]" />
        </div>
        <div className="relative mx-auto max-w-2xl text-center animate-[fade-in_0.6s_ease-out]">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            {dict.hero.secondaryCta}
          </h2>
          <p className="mt-4 text-zinc-400">{dict.contact.subtitle}</p>
          <a
            href={`/${lang}/contact`}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-semibold text-background shadow-lg transition-all duration-300 hover:bg-zinc-200 hover:shadow-xl hover:-translate-y-0.5"
          >
            {dict.common.contactUs}
            <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        </div>
      </section>
    </div>
  );
}

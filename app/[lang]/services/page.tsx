import type { Metadata } from "next";
import { getDictionary, hasLocale } from "../dictionaries";
import type { Locale } from "../dictionaries";
import { notFound } from "next/navigation";
import ServiceCard from "@/components/service-card";
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
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://njiwardc.com";

  return {
    title: `${dict.services.title} — NJIWA`,
    description: dict.services.subtitle,
    alternates: {
      canonical: `${baseUrl}/${lang}/services`,
      languages: {
        [otherLang]: `${baseUrl}/${otherLang}/services`,
        "x-default": `${baseUrl}/fr/services`,
      },
    },
    openGraph: {
      title: `${dict.services.title} — NJIWA`,
      description: dict.services.subtitle,
      type: "website",
      locale: lang,
      alternateLocale: otherLang,
      url: `${baseUrl}/${lang}/services`,
    },
  };
}

export default async function ServicesPage({
  params,
}: PageProps<"/[lang]/services">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang as Locale);

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://njiwardc.com";

  const servicesJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: dict.services.title,
    description: dict.services.subtitle,
    url: `${baseUrl}/${lang}/services`,
    numberOfItems: dict.services.items.length,
    itemListElement: dict.services.items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Service",
        name: item.title,
        description: item.description,
        provider: {
          "@type": "Organization",
          name: "NJIWA",
          url: "https://njiwardc.com",
        },
      },
    })),
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesJsonLd) }}
      />
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

      {/* GPS Tracking Abroad */}
      <section className="border-t border-white/[0.06] py-20 px-6">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center animate-[fade-in_0.6s_ease-out]">
            <span className="pill-badge mb-4">
              {dict.services.gpsAbroad.title}
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {dict.services.gpsAbroad.title}
            </h2>
            <p className="mt-4 mx-auto max-w-2xl text-zinc-400">
              {dict.services.gpsAbroad.subtitle}
            </p>
          </div>

          <div className="space-y-16">
            {dict.services.gpsAbroad.sections.map((section) => (
              <div key={section.country}>
                <div className="mb-8 flex items-center gap-4">
                  <div className="h-px flex-1 bg-white/[0.06]" />
                  <span className="text-xs font-bold tracking-[0.2em] text-zinc-500 uppercase">
                    {section.country}
                  </span>
                  <div className="h-px flex-1 bg-white/[0.06]" />
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {section.tracks.map((track) => (
                    <a
                      key={track.videoId}
                      href={`https://youtu.be/${track.videoId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative overflow-hidden rounded-xl bg-surface ring-1 ring-white/[0.06] transition-all duration-300 hover:-translate-y-1 hover:ring-primary/30 hover:shadow-xl"
                    >
                      <div className="relative aspect-video overflow-hidden">
                        <Image
                          src={`https://img.youtube.com/vi/${track.videoId}/hqdefault.jpg`}
                          alt={track.label}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-black/30 transition-colors duration-300 group-hover:bg-black/10" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:bg-white">
                            <svg
                              className="ml-1 h-5 w-5 text-background"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-4">
                        <p className="text-sm font-medium text-white">
                          {track.label}
                        </p>
                        <span className="text-xs text-primary-light">
                          {dict.services.gpsAbroad.watchLabel} →
                        </span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
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

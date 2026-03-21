import type { Metadata } from "next";
import { getDictionary, hasLocale } from "./dictionaries";
import type { Locale } from "./dictionaries";
import { notFound } from "next/navigation";
import Hero from "@/components/hero";
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
    title: `NJIWA — ${dict.hero.title}`,
    description: dict.hero.subtitle,
    openGraph: {
      title: `NJIWA — ${dict.hero.title}`,
      description: dict.hero.subtitle,
      type: "website",
      locale: lang,
    },
  };
}

export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang as Locale);

  return (
    <>
      <Hero dict={dict} lang={lang} />

      {/* Services overview */}
      <Section
        id="services"
        title={dict.services.title}
        subtitle={dict.services.subtitle}
      >
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
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

      {/* CTA banner */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary-light to-primary py-24 px-6">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-accent/15 blur-3xl" />
          <div className="absolute -bottom-16 -left-16 h-60 w-60 rounded-full bg-white/10 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-3xl text-center animate-[fade-in_0.6s_ease-out]">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            {dict.hero.secondaryCta}
          </h2>
          <p className="mt-4 text-lg text-blue-100/90">
            {dict.about.subtitle}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href={`/${lang}/contact`}
              className="inline-flex items-center rounded-full bg-accent px-8 py-3.5 text-sm font-semibold text-primary-dark shadow-lg transition-all duration-300 hover:bg-accent-light hover:shadow-xl hover:-translate-y-0.5"
            >
              {dict.common.contactUs}
            </a>
            <a
              href={`/${lang}/about`}
              className="inline-flex items-center rounded-full border-2 border-white/30 bg-white/10 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-white/60 hover:bg-white/20"
            >
              {dict.common.learnMore}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

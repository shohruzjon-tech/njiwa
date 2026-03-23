import type { Metadata } from "next";
import { getDictionary, hasLocale } from "./dictionaries";
import type { Locale } from "./dictionaries";
import { notFound } from "next/navigation";
import Hero from "@/components/hero";
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
      <section id="services" className="relative overflow-hidden py-28 px-6">
        {/* Decorative background */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-40 right-0 h-80 w-80 rounded-full bg-primary/8 blur-[120px]" />
          <div className="absolute -bottom-20 left-0 h-60 w-60 rounded-full bg-accent/6 blur-[100px]" />
          <div className="absolute inset-0 dot-grid" />
        </div>

        <div className="relative mx-auto max-w-7xl">
          <div className="mb-16 text-center animate-[fade-in_0.6s_ease-out]">
            <span className="pill-badge mb-4">{dict.services.title}</span>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">
              {dict.services.title}
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-zinc-400">
              {dict.services.subtitle}
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
        </div>
      </section>

      {/* CTA banner */}
      <section className="relative overflow-hidden border-t border-white/[0.06] py-28 px-6">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/6 blur-[150px]" />
        </div>
        <div className="relative mx-auto max-w-3xl text-center animate-[fade-in_0.6s_ease-out]">
          <h2 className="text-3xl font-bold text-white sm:text-5xl">
            {dict.hero.secondaryCta}
          </h2>
          <p className="mt-5 text-lg text-zinc-400">{dict.about.subtitle}</p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a
              href={`/${lang}/contact`}
              className="inline-flex items-center rounded-full bg-white px-8 py-4 text-sm font-semibold text-background shadow-lg transition-all duration-300 hover:bg-zinc-200 hover:shadow-xl hover:-translate-y-0.5"
            >
              {dict.common.contactUs}
            </a>
            <a
              href={`/${lang}/about`}
              className="inline-flex items-center rounded-full border border-white/[0.12] bg-white/[0.04] px-8 py-4 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-white/[0.2] hover:bg-white/[0.08]"
            >
              {dict.common.learnMore}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

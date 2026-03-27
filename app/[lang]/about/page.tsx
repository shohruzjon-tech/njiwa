import type { Metadata } from "next";
import { getDictionary, hasLocale } from "../dictionaries";
import type { Locale } from "../dictionaries";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang as Locale);

  const allLocales = ["fr", "en", "sw"] as const;
  const otherLocales = allLocales.filter((l) => l !== lang);
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://njiwardc.com";

  return {
    title: `${dict.about.title} — NJIWA`,
    description: dict.about.description,
    alternates: {
      canonical: `${baseUrl}/${lang}/about`,
      languages: {
        ...Object.fromEntries(
          otherLocales.map((l) => [l, `${baseUrl}/${l}/about`]),
        ),
        "x-default": `${baseUrl}/fr/about`,
      },
    },
    openGraph: {
      title: `${dict.about.title} — NJIWA`,
      description: dict.about.description,
      type: "website",
      locale: lang,
      alternateLocale: otherLocales as unknown as string[],
      url: `${baseUrl}/${lang}/about`,
    },
  };
}

export default async function AboutPage({
  params,
}: PageProps<"/[lang]/about">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang as Locale);

  const valueIcons = [
    /* Shield - Reliability */
    <svg
      key="shield"
      className="h-6 w-6"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>,
    /* Eye - Transparency */
    <svg
      key="eye"
      className="h-6 w-6"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z" />
      <circle cx="12" cy="12" r="3" />
    </svg>,
    /* Lightbulb - Innovation */
    <svg
      key="bulb"
      className="h-6 w-6"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M9 18h6m-5 2h4M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2z" />
    </svg>,
    /* Heart - Customer commitment */
    <svg
      key="heart"
      className="h-6 w-6"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>,
  ];

  return (
    <>
      {/* Page header */}
      <div className="relative overflow-hidden border-b border-white/[0.06] py-28 px-6">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-40 left-1/4 h-80 w-80 rounded-full bg-primary/8 blur-[120px]" />
          <div className="absolute -bottom-20 right-1/4 h-60 w-60 rounded-full bg-accent/6 blur-[100px]" />
          <div className="absolute inset-0 dot-grid" />
        </div>
        <div className="relative mx-auto max-w-3xl text-center animate-[fade-in_0.6s_ease-out]">
          <span className="pill-badge mb-4">{dict.about.title}</span>
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            {dict.about.title}
          </h1>
          <p className="mt-5 text-lg text-zinc-400">{dict.about.subtitle}</p>
        </div>
      </div>

      {/* Description */}
      <section className="py-20 px-6">
        <div className="mx-auto max-w-3xl animate-[fade-in_0.6s_ease-out]">
          <p className="text-lg leading-relaxed text-zinc-400">
            {dict.about.description}
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="border-t border-white/[0.06] py-20 px-6">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-2">
          {/* Mission */}
          <div className="glass-card rounded-2xl p-10 animate-[slide-up_0.6s_ease-out]">
            <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary-light">
              <svg
                className="h-6 w-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="m9 12 2 2 4-4" />
              </svg>
            </div>
            <h2 className="mb-3 text-2xl font-bold text-white">
              {dict.about.mission.title}
            </h2>
            <p className="leading-relaxed text-zinc-400">
              {dict.about.mission.description}
            </p>
          </div>

          {/* Vision */}
          <div className="glass-card rounded-2xl p-10 animate-[slide-up_0.6s_ease-out_0.15s_both]">
            <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-accent/20 bg-accent/10 text-accent">
              <svg
                className="h-6 w-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7S2 12 2 12z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </div>
            <h2 className="mb-3 text-2xl font-bold text-white">
              {dict.about.vision.title}
            </h2>
            <p className="leading-relaxed text-zinc-400">
              {dict.about.vision.description}
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="border-t border-white/[0.06] py-20 px-6">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {dict.about.values.map((value, i) => (
              <div
                key={value.title}
                className="glass-card rounded-2xl p-8 text-center"
                style={{ animation: `slide-up 0.6s ease-out ${i * 0.1}s both` }}
              >
                <div className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.04] text-primary-light">
                  {valueIcons[i]}
                </div>
                <h3 className="mb-2 text-lg font-semibold text-white">
                  {value.title}
                </h3>
                <p className="text-sm leading-relaxed text-zinc-500">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

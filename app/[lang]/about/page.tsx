import type { Metadata } from "next";
import { getDictionary, hasLocale } from "../dictionaries";
import type { Locale } from "../dictionaries";
import { notFound } from "next/navigation";
import Section from "@/components/section";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang as Locale);

  return {
    title: `${dict.about.title} — NJIWA`,
    description: dict.about.description,
    openGraph: {
      title: `${dict.about.title} — NJIWA`,
      description: dict.about.description,
      type: "website",
      locale: lang,
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
    <svg key="shield" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>,
    /* Eye - Transparency */
    <svg key="eye" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z" />
      <circle cx="12" cy="12" r="3" />
    </svg>,
    /* Lightbulb - Innovation */
    <svg key="bulb" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M9 18h6m-5 2h4M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2z" />
    </svg>,
    /* Heart - Customer commitment */
    <svg key="heart" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>,
  ];

  return (
    <>
      {/* Page header */}
      <div className="bg-gradient-to-br from-primary-dark via-primary to-primary-light py-24 px-6">
        <div className="mx-auto max-w-3xl text-center animate-[fade-in_0.6s_ease-out]">
          <h1 className="text-4xl font-bold text-white sm:text-5xl">
            {dict.about.title}
          </h1>
          <p className="mt-4 text-lg text-blue-100/90">{dict.about.subtitle}</p>
        </div>
      </div>

      {/* Description */}
      <Section>
        <div className="mx-auto max-w-3xl animate-[fade-in_0.6s_ease-out]">
          <p className="text-lg leading-relaxed text-gray-600">
            {dict.about.description}
          </p>
        </div>
      </Section>

      {/* Mission & Vision */}
      <section className="bg-gray-50 py-20 px-6">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2">
          {/* Mission */}
          <div
            className="rounded-2xl border border-gray-100 bg-white p-10 shadow-lg animate-[slide-up_0.6s_ease-out]"
          >
            <div className="mb-5 inline-flex rounded-xl bg-primary/10 p-3 text-primary">
              <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10" />
                <path d="m9 12 2 2 4-4" />
              </svg>
            </div>
            <h2 className="mb-3 text-2xl font-bold text-gray-900">
              {dict.about.mission.title}
            </h2>
            <p className="leading-relaxed text-gray-600">
              {dict.about.mission.description}
            </p>
          </div>

          {/* Vision */}
          <div
            className="rounded-2xl border border-gray-100 bg-white p-10 shadow-lg animate-[slide-up_0.6s_ease-out_0.15s_both]"
          >
            <div className="mb-5 inline-flex rounded-xl bg-accent/10 p-3 text-accent">
              <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7S2 12 2 12z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </div>
            <h2 className="mb-3 text-2xl font-bold text-gray-900">
              {dict.about.vision.title}
            </h2>
            <p className="leading-relaxed text-gray-600">
              {dict.about.vision.description}
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <Section>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {dict.about.values.map((value, i) => (
            <div
              key={value.title}
              className="rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              style={{ animation: `slide-up 0.6s ease-out ${i * 0.1}s both` }}
            >
              <div className="mx-auto mb-4 inline-flex rounded-xl bg-primary/10 p-3 text-primary">
                {valueIcons[i]}
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900">
                {value.title}
              </h3>
              <p className="text-sm leading-relaxed text-gray-600">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}

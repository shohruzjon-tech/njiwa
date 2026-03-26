import type { Metadata } from "next";
import Image from "next/image";
import { getDictionary, hasLocale } from "../dictionaries";
import type { Locale } from "../dictionaries";
import { notFound } from "next/navigation";

const memberPhotos: Record<string, string> = {
  ventury: "/team-members/ventury_kulalia.jpg",
  mike: "/team-members/mike_kulalia.jpg",
  tegra: "/team-members/tegra_mukebo.jpg",
  plamedie: "/team-members/plamedie.jpg",
  jimmy: "/team-members/jimmy_kampate.jpg",
};

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
    title: `${dict.team.title} — NJIWA`,
    description: dict.team.metaDescription,
    alternates: {
      canonical: `/${lang}/team`,
      languages: {
        [otherLang]: `/${otherLang}/team`,
      },
    },
    openGraph: {
      title: `${dict.team.title} — NJIWA`,
      description: dict.team.metaDescription,
      type: "website",
      locale: lang,
      alternateLocale: otherLang,
      url: `/${lang}/team`,
    },
  };
}

export default async function TeamPage({ params }: PageProps<"/[lang]/team">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang as Locale);
  const team = dict.team;

  return (
    <div>
      {/* Page header */}
      <div className="relative overflow-hidden border-b border-white/[0.06] py-28 px-6">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-40 left-1/4 h-80 w-80 rounded-full bg-primary/8 blur-[120px]" />
          <div className="absolute -bottom-20 right-1/4 h-60 w-60 rounded-full bg-accent/6 blur-[100px]" />
          <div className="absolute inset-0 dot-grid" />
        </div>
        <div className="relative mx-auto max-w-3xl text-center animate-[fade-in_0.6s_ease-out]">
          <span className="pill-badge mb-4">{team.title}</span>
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            {team.title}
          </h1>
          <p className="mt-5 text-lg text-zinc-400">{team.subtitle}</p>
        </div>
      </div>

      {/* Team grid */}
      <section className="py-20 px-6">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {team.members.map((member, i) => {
              const delay = i * 0.1;
              const photo = memberPhotos[member.id];
              return (
                <article
                  key={member.id}
                  className="glass-card group relative overflow-hidden rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
                  style={{ animation: `slide-up 0.6s ease-out ${delay}s both` }}
                >
                  {/* Top accent line on hover */}
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  {/* Profile photo */}
                  <div className="mb-6 flex justify-center">
                    <div className="relative h-28 w-28 overflow-hidden rounded-full ring-2 ring-white/10 ring-offset-2 ring-offset-background transition-all duration-300 group-hover:ring-primary/40">
                      {photo ? (
                        <Image
                          src={photo}
                          alt={member.name}
                          fill
                          className="object-cover object-top"
                          sizes="112px"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-white/[0.06] text-3xl font-bold text-zinc-600">
                          {member.name.charAt(0)}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Name & role */}
                  <div className="mb-5 text-center">
                    <h3 className="text-lg font-bold leading-tight text-white">
                      {member.name}
                    </h3>
                    <p className="mt-1.5 text-sm font-semibold text-primary-light">
                      {member.role}
                    </p>
                  </div>

                  {/* Divider */}
                  <div className="mb-5 h-px bg-white/[0.06]" />

                  {/* Details */}
                  <ul className="space-y-3 text-sm">
                    {/* Experience */}
                    <li className="flex items-start gap-3 text-zinc-400">
                      <svg
                        className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 6v6l4 2" />
                      </svg>
                      <span>
                        <span className="text-zinc-500">
                          {team.experienceLabel} :{" "}
                        </span>
                        {member.experience}
                      </span>
                    </li>

                    {/* Location */}
                    <li className="flex items-start gap-3 text-zinc-400">
                      <svg
                        className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      >
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                        <circle cx="12" cy="9" r="2.5" />
                      </svg>
                      <span>
                        <span className="text-zinc-500">
                          {team.locationLabel} :{" "}
                        </span>
                        {member.location}
                      </span>
                    </li>

                    {/* Phone */}
                    <li className="flex items-start gap-3 text-zinc-400">
                      <svg
                        className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      >
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                      <a
                        href={`tel:${member.phone}`}
                        className="transition-colors hover:text-white"
                      >
                        {member.phone}
                      </a>
                    </li>

                    {/* Email (conditional) */}
                    {member.email && (
                      <li className="flex items-start gap-3 text-zinc-400">
                        <svg
                          className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        >
                          <rect x="2" y="4" width="20" height="16" rx="2" />
                          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                        </svg>
                        <a
                          href={`mailto:${member.email}`}
                          className="break-all transition-colors hover:text-white"
                        >
                          {member.email}
                        </a>
                      </li>
                    )}

                    {/* Nationality */}
                    <li className="flex items-start gap-3 text-zinc-400">
                      <svg
                        className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      >
                        <circle cx="12" cy="8" r="4" />
                        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                      </svg>
                      <span className="text-zinc-500">
                        {member.nationality}
                      </span>
                    </li>
                  </ul>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Group photo card */}
      <section className="border-t border-white/[0.06] py-16 px-6">
        <div className="mx-auto max-w-7xl">
          <div
            className="glass-card group relative overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
            style={{
              animation: `slide-up 0.6s ease-out ${team.members.length * 0.1}s both`,
            }}
          >
            {/* Top accent line on hover */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            <div className="flex flex-col sm:flex-row">
              {/* Photo */}
              <div className="relative h-64 w-full overflow-hidden sm:h-auto sm:w-64 sm:shrink-0">
                <Image
                  src="/team-group/group_on_work.jpg"
                  alt="NJIWA engineers on site"
                  fill
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, 256px"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-surface/60 sm:bg-gradient-to-r sm:from-transparent sm:to-surface/60" />
              </div>

              {/* Content */}
              <div className="flex flex-col justify-center p-7">
                <div className="mb-3 flex items-center gap-2">
                  <span className="h-px w-6 bg-accent/60" />
                  <span className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
                    NJIWA
                  </span>
                </div>
                <h3 className="text-xl font-bold tracking-tight text-white">
                  {team.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                  {team.subtitle}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

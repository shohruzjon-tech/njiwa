import Image from "next/image";
import type { Dictionary } from "@/app/[lang]/dictionaries";

interface HeroProps {
  dict: Dictionary;
  lang: string;
}

export default function Hero({ dict, lang }: HeroProps) {
  return (
    <section id="main_hero_banner" className="relative overflow-hidden">
      {/* Background image */}
      <Image
        src="/app-banners/main.webp"
        alt="Main hero banner"
        fill
        priority
        className="object-cover object-center"
      />

      {/* Overlays */}
      <div className="absolute inset-0 bg-black/70" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background" />

      {/* Background decorative elements */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-primary/8 blur-[120px]" />
        <div className="absolute -bottom-32 -left-32 h-[500px] w-[500px] rounded-full bg-accent/6 blur-[120px]" />
      </div>

      {/* Dot grid */}
      <div className="pointer-events-none absolute inset-0 dot-grid" />

      <div className="relative mx-auto flex min-h-[90vh] max-w-7xl items-center px-6 py-32">
        <div className="max-w-3xl">
          {/* Pill badge */}
          <div className="mb-6 animate-[fade-in_0.8s_ease-out]">
            <span className="pill-badge">NJIWA</span>
          </div>

          <h1 className="text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-7xl animate-[fade-in_0.8s_ease-out_0.1s_both]">
            {dict.hero.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400 sm:text-xl animate-[fade-in_0.8s_ease-out_0.25s_both]">
            {dict.hero.subtitle}
          </p>
          <div className="mt-10 flex flex-wrap gap-4 animate-[fade-in_0.8s_ease-out_0.4s_both]">
            <a
              href={`/${lang}/services`}
              className="inline-flex items-center rounded-full bg-white px-8 py-4 text-sm font-semibold text-background shadow-lg transition-all duration-300 hover:bg-zinc-200 hover:shadow-xl hover:-translate-y-0.5"
            >
              {dict.hero.cta}
              <svg
                className="ml-2 h-4 w-4"
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
            <a
              href={`/${lang}/contact`}
              className="inline-flex items-center rounded-full border border-white/[0.12] bg-white/[0.04] px-8 py-4 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-white/[0.2] hover:bg-white/[0.08]"
            >
              {dict.hero.secondaryCta}
            </a>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade into next section */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}

import Image from "next/image";
import type { Dictionary } from "@/app/[lang]/dictionaries";
import MobileNav from "./mobile-nav";

interface NavbarProps {
  dict: Dictionary;
  lang: string;
}

export default function Navbar({ dict, lang }: NavbarProps) {
  const otherLang = lang === "fr" ? "en" : "fr";

  const links = [
    { href: `/${lang}`, label: dict.nav.home },
    { href: `/${lang}/about`, label: dict.nav.about },
    { href: `/${lang}/services`, label: dict.nav.services },
    { href: `/${lang}/team`, label: dict.nav.team },
    { href: `/${lang}/contact`, label: dict.nav.contact },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-background/80 backdrop-blur-xl backdrop-saturate-150">
      <div className="relative mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <a href={`/${lang}`} className="flex items-center">
          <Image src="/logo.svg" alt="NJIWA" width={44} height={44} priority />
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-lg px-4 py-2 text-sm font-medium text-zinc-400 transition-colors hover:bg-white/[0.04] hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop actions */}
        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={`/${otherLang}`}
            className="rounded-lg px-3 py-1.5 text-sm font-medium text-zinc-500 transition-colors hover:text-white"
          >
            {otherLang.toUpperCase()}
          </a>
          <a
            href={`/${lang}/contact`}
            className="rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-background shadow-sm transition-all duration-300 hover:bg-zinc-200 hover:shadow-md hover:-translate-y-0.5"
          >
            {dict.nav.getQuote}
          </a>
        </div>

        {/* Mobile menu */}
        <MobileNav dict={dict} lang={lang} />
      </div>
    </header>
  );
}

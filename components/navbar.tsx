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
    { href: `/${lang}/contact`, label: dict.nav.contact },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100/50 bg-white/80 backdrop-blur-lg">
      <div className="relative mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <a href={`/${lang}`} className="text-xl font-bold tracking-tight text-primary">
          NJIWA
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 hover:text-primary"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop actions */}
        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={`/${otherLang}`}
            className="rounded-lg px-3 py-1.5 text-sm font-medium text-gray-500 transition-colors hover:bg-gray-50 hover:text-primary"
          >
            {otherLang.toUpperCase()}
          </a>
          <a
            href={`/${lang}/contact`}
            className="rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:bg-primary-light hover:shadow-md hover:-translate-y-0.5"
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

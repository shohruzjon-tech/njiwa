import Image from "next/image";
import type { Dictionary } from "@/app/[lang]/dictionaries";
import MobileNav from "./mobile-nav";
import LanguageSwitcher from "./language-switcher";
import { DesktopNavLinks } from "./nav-links";

interface NavbarProps {
  dict: Dictionary;
  lang: string;
}

export default function Navbar({ dict, lang }: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-background/80 backdrop-blur-xl backdrop-saturate-150">
      <div className="relative mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <a href={`/${lang}`} className="flex items-center">
          <Image src="/logo.svg" alt="NJIWA" width={100} height={72} priority />
        </a>

        {/* Desktop nav — active-aware with icons */}
        <DesktopNavLinks dict={dict} lang={lang} />

        {/* Desktop actions */}
        <div className="hidden items-center gap-3 lg:flex">
          <LanguageSwitcher lang={lang} />
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

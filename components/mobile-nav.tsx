"use client";

import { useState } from "react";
import type { Dictionary } from "@/app/[lang]/dictionaries";

interface MobileNavProps {
  dict: Dictionary;
  lang: string;
}

export default function MobileNav({ dict, lang }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const otherLang = lang === "fr" ? "en" : "fr";

  const links = [
    { href: `/${lang}`, label: dict.nav.home },
    { href: `/${lang}/about`, label: dict.nav.about },
    { href: `/${lang}/services`, label: dict.nav.services },
    { href: `/${lang}/contact`, label: dict.nav.contact },
  ];

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex items-center justify-center rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100 lg:hidden cursor-pointer"
        aria-label="Toggle menu"
        aria-expanded={open}
      >
        {open ? (
          <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {open && (
        <div className="absolute inset-x-0 top-full border-b border-gray-100 bg-white/95 backdrop-blur-lg lg:hidden animate-[fade-in_0.2s_ease-out]">
          <nav className="mx-auto flex max-w-7xl flex-col px-6 py-4">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg py-3 px-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-primary"
              >
                {link.label}
              </a>
            ))}
            <div className="mt-2 flex items-center gap-3 border-t border-gray-100 pt-4">
              <a
                href={`/${otherLang}`}
                className="rounded-lg px-3 py-1.5 text-sm font-medium text-gray-500 transition-colors hover:text-primary"
              >
                {otherLang.toUpperCase()}
              </a>
              <a
                href={`/${lang}/contact`}
                className="flex-1 rounded-full bg-primary px-6 py-2.5 text-center text-sm font-semibold text-white transition-all hover:bg-primary-light"
              >
                {dict.nav.getQuote}
              </a>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}

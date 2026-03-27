"use client";

import { usePathname } from "next/navigation";
import type { Dictionary } from "@/app/[lang]/dictionaries";

/* ── SVG icon components ─────────────────────────────────────────── */

function HomeIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 10.5L12 3l9 7.5" />
      <path d="M5 10v9a1 1 0 001 1h3.5v-5a1.5 1.5 0 013 0v5H16a1 1 0 001-1v-9" />
    </svg>
  );
}

function AboutIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="8" r="4" />
      <path d="M5.5 20a6.5 6.5 0 0113 0" />
    </svg>
  );
}

function ServicesIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </svg>
  );
}

function TeamIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="9" cy="7" r="3.5" />
      <circle cx="17" cy="9" r="2.5" />
      <path d="M2 19.5a7 7 0 0114 0" />
      <path d="M16 19.5a5 5 0 015-5" />
    </svg>
  );
}

function ContactIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M22 7l-10 6L2 7" />
    </svg>
  );
}

/* ── Icons map ───────────────────────────────────────────────────── */

const navIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  home: HomeIcon,
  about: AboutIcon,
  services: ServicesIcon,
  team: TeamIcon,
  contact: ContactIcon,
};

/* ── Build links helper ──────────────────────────────────────────── */

export type NavLink = {
  key: string;
  href: string;
  label: string;
  Icon: React.ComponentType<{ className?: string }>;
};

export function useNavLinks(dict: Dictionary, lang: string): NavLink[] {
  return [
    { key: "home", href: `/${lang}`, label: dict.nav.home },
    { key: "about", href: `/${lang}/about`, label: dict.nav.about },
    { key: "services", href: `/${lang}/services`, label: dict.nav.services },
    { key: "team", href: `/${lang}/team`, label: dict.nav.team },
    { key: "contact", href: `/${lang}/contact`, label: dict.nav.contact },
  ].map((l) => ({ ...l, Icon: navIcons[l.key] }));
}

/* ── Active-detection hook ───────────────────────────────────────── */

export function useIsActive(href: string, key: string, lang: string): boolean {
  const pathname = usePathname();
  if (key === "home") return pathname === `/${lang}`;
  return pathname.startsWith(href);
}

/* ── Desktop nav links (drop-in replacement) ─────────────────────── */

export function DesktopNavLinks({
  dict,
  lang,
}: {
  dict: Dictionary;
  lang: string;
}) {
  const links = useNavLinks(dict, lang);

  return (
    <nav className="hidden items-center gap-0.5 lg:flex">
      {links.map((link) => (
        <DesktopLink key={link.key} link={link} lang={lang} />
      ))}
    </nav>
  );
}

function DesktopLink({ link, lang }: { link: NavLink; lang: string }) {
  const active = useIsActive(link.href, link.key, lang);
  const { Icon } = link;

  return (
    <a
      href={link.href}
      className={`group relative flex items-center rounded-lg px-3.5 py-2 text-sm font-medium transition-all duration-200 ${
        active ? "text-white" : "text-zinc-400 hover:text-white"
      }`}
    >
      {link.label}
      {/* Active indicator dot */}
      <span
        className={`absolute bottom-0 left-1/2 h-0.5 -translate-x-1/2 rounded-full bg-primary transition-all duration-300 ${
          active ? "w-5 opacity-100" : "w-0 opacity-0"
        }`}
      />
    </a>
  );
}

"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import type { Dictionary } from "@/app/[lang]/dictionaries";
import LanguageSwitcher from "./language-switcher";
import { useNavLinks, useIsActive, type NavLink } from "./nav-links";

interface MobileNavProps {
  dict: Dictionary;
  lang: string;
}

/* ── Individual mobile link with active detection ──────────────── */

function MobileLink({
  link,
  lang,
  index,
  onNavigate,
}: {
  link: NavLink;
  lang: string;
  index: number;
  onNavigate: () => void;
}) {
  const active = useIsActive(link.href, link.key, lang);
  const { Icon } = link;

  return (
    <a
      href={link.href}
      onClick={onNavigate}
      className={`group relative flex items-center gap-3.5 rounded-xl px-4 py-3.5 text-[15px] font-medium transition-all duration-200 animate-[slide-up_0.3s_ease-out_both] ${
        active
          ? "bg-white/[0.07] text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]"
          : "text-zinc-400 hover:bg-white/[0.04] hover:text-white"
      }`}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {/* Active left accent bar */}
      <span
        className={`absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-r-full bg-primary transition-all duration-300 ${
          active ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0"
        }`}
      />

      {/* Icon container */}
      <span
        className={`flex h-9 w-9 items-center justify-center rounded-lg transition-all duration-200 ${
          active
            ? "bg-primary/15 text-primary"
            : "bg-white/[0.04] text-zinc-500 group-hover:bg-white/[0.06] group-hover:text-zinc-300"
        }`}
      >
        <Icon className="h-[18px] w-[18px]" />
      </span>

      {/* Label */}
      <span className="flex-1">{link.label}</span>

      {/* Active badge / chevron */}
      {active ? (
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/20">
          <svg
            className="h-3 w-3 text-primary"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      ) : (
        <svg
          className="h-4 w-4 text-zinc-600 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-zinc-500"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
            clipRule="evenodd"
          />
        </svg>
      )}
    </a>
  );
}

/* ── Mobile nav component ──────────────────────────────────────── */

export default function MobileNav({ dict, lang }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const links = useNavLinks(dict, lang);
  const pathname = usePathname();

  /* Close menu on route change */
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  /* Prevent body scroll when menu is open */
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="flex items-center gap-2 lg:hidden">
      <LanguageSwitcher lang={lang} compact />

      {/* Hamburger / close button */}
      <button
        onClick={() => setOpen(!open)}
        className="relative inline-flex h-10 w-10 items-center justify-center rounded-xl text-zinc-400 transition-all duration-200 hover:bg-white/[0.06] hover:text-white cursor-pointer"
        aria-label="Toggle menu"
        aria-expanded={open}
      >
        <span className="sr-only">Menu</span>
        <span
          className={`absolute h-[2px] w-5 rounded-full bg-current transition-all duration-300 ${
            open ? "rotate-45" : "-translate-y-1.5"
          }`}
        />
        <span
          className={`absolute h-[2px] w-5 rounded-full bg-current transition-all duration-300 ${
            open ? "scale-x-0 opacity-0" : ""
          }`}
        />
        <span
          className={`absolute h-[2px] w-5 rounded-full bg-current transition-all duration-300 ${
            open ? "-rotate-45" : "translate-y-1.5"
          }`}
        />
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 top-16 z-40 bg-black/60 backdrop-blur-sm animate-[fade-in_0.2s_ease-out] lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Slide-down panel */}
      {open && (
        <div className="fixed inset-x-0 top-16 z-50 max-h-[calc(100dvh-4rem)] overflow-y-auto border-b border-white/[0.06] bg-zinc-950/98 backdrop-blur-2xl lg:hidden animate-[slide-down_0.25s_ease-out]">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4">
            {links.map((link, i) => (
              <MobileLink
                key={link.key}
                link={link}
                lang={lang}
                index={i}
                onNavigate={() => setOpen(false)}
              />
            ))}
          </nav>

          {/* Bottom decorative gradient */}
          <div className="pointer-events-none h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
        </div>
      )}
    </div>
  );
}

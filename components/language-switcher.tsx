"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";

interface LanguageSwitcherProps {
  lang: string;
  /** Render a compact version for tight spaces */
  compact?: boolean;
}

const languages = [
  {
    code: "fr",
    label: "Français",
    flag: "https://flagcdn.com/w40/fr.png",
    flagRetina: "https://flagcdn.com/w80/fr.png",
    shortLabel: "FR",
  },
  {
    code: "en",
    label: "English",
    flag: "https://flagcdn.com/w40/gb.png",
    flagRetina: "https://flagcdn.com/w80/gb.png",
    shortLabel: "EN",
  },
  {
    code: "sw",
    label: "Kiswahili",
    flag: "https://flagcdn.com/w40/tz.png",
    flagRetina: "https://flagcdn.com/w80/tz.png",
    shortLabel: "SW",
  },
];

export default function LanguageSwitcher({
  lang,
  compact,
}: LanguageSwitcherProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const current = languages.find((l) => l.code === lang) ?? languages[0];

  /* close on outside click */
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  /* close on Escape */
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <div ref={ref} className="relative">
      {/* Trigger button */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-lg px-2.5 py-2 text-sm font-medium text-zinc-300 transition-colors hover:bg-white/[0.06] hover:text-white cursor-pointer"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Select language"
      >
        <Image
          src={current.flag}
          alt={current.label}
          width={20}
          height={15}
          className="rounded-[2px] object-cover"
          unoptimized
        />
        {!compact && (
          <span className="hidden sm:inline">{current.shortLabel}</span>
        )}
        <svg
          className={`h-3.5 w-3.5 text-zinc-500 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {/* Dropdown */}
      {open && (
        <ul
          role="listbox"
          aria-label="Languages"
          className="absolute right-0 top-full z-50 mt-1.5 min-w-[10rem] overflow-hidden rounded-xl border border-white/[0.08] bg-zinc-900/95 p-1 shadow-2xl backdrop-blur-xl animate-[fade-in_0.15s_ease-out]"
        >
          {languages.map((l) => {
            const isActive = l.code === lang;
            return (
              <li key={l.code} role="option" aria-selected={isActive}>
                <a
                  href={`/${l.code}`}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                    isActive
                      ? "bg-white/[0.08] text-white"
                      : "text-zinc-400 hover:bg-white/[0.04] hover:text-white"
                  }`}
                >
                  <Image
                    src={l.flag}
                    alt={l.label}
                    width={20}
                    height={15}
                    className="rounded-[2px] object-cover"
                    unoptimized
                  />
                  <span className="flex-1">{l.label}</span>
                  {isActive && (
                    <svg
                      className="h-4 w-4 text-primary"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </a>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

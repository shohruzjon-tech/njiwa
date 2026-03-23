import {
  getDictionary,
  defaultLocale,
  hasLocale,
  type Locale,
} from "./dictionaries";
import { headers } from "next/headers";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 — NJIWA",
  description: "Page not found",
};

export default async function NotFound() {
  const headersList = await headers();
  const localeHeader = headersList.get("x-locale") || "";
  const lang: Locale = hasLocale(localeHeader) ? localeHeader : defaultLocale;
  const dict = await getDictionary(lang);

  return (
    <div className="relative flex flex-1 flex-col items-center justify-center overflow-hidden px-6 py-24">
      {/* Background decorative blurs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-primary/6 blur-[120px] animate-[pulse-ring_6s_ease-in-out_infinite]" />
        <div className="absolute -bottom-32 -right-32 h-[420px] w-[420px] rounded-full bg-accent/5 blur-[120px] animate-[pulse-ring_8s_ease-in-out_infinite_1s]" />
        <div className="absolute inset-0 dot-grid" />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center animate-[fade-in_0.8s_ease-out]">
        {/* Animated illustration */}
        <div className="relative mb-8 animate-[float_4s_ease-in-out_infinite]">
          <div className="absolute inset-0 rounded-full border-2 border-dashed border-white/[0.06] animate-[pulse-ring_5s_ease-in-out_infinite]" />
          <div className="flex h-40 w-40 items-center justify-center rounded-full bg-white/[0.03] border border-white/[0.06] shadow-lg">
            <svg
              className="h-20 w-20 text-primary-light"
              viewBox="0 0 80 80"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="40"
                cy="40"
                r="30"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray="188.5"
                strokeDashoffset="188.5"
                className="animate-[dash-offset_1.5s_ease-out_0.3s_forwards]"
              />
              <circle
                cx="40"
                cy="40"
                r="22"
                stroke="currentColor"
                strokeWidth="1.5"
                opacity="0.3"
                strokeDasharray="138.2"
                strokeDashoffset="138.2"
                className="animate-[dash-offset_1.5s_ease-out_0.6s_forwards]"
              />
              <path
                d="M40 18 L43 40 L40 62 L37 40 Z"
                fill="currentColor"
                opacity="0.15"
              />
              <path
                d="M40 18 L43 40 L40 42 L37 40 Z"
                fill="currentColor"
                opacity="0.5"
              />
              <circle cx="40" cy="40" r="3" fill="currentColor" opacity="0.7" />
              <text
                x="40"
                y="46"
                textAnchor="middle"
                fill="currentColor"
                fontSize="16"
                fontWeight="bold"
                opacity="0.15"
              >
                ?
              </text>
            </svg>
          </div>
        </div>

        {/* 404 heading */}
        <h1 className="text-8xl font-bold tracking-tighter text-white/[0.06] sm:text-9xl animate-[fade-in_0.8s_ease-out_0.2s_both]">
          {dict.notFound.heading}
        </h1>

        <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl animate-[fade-in_0.8s_ease-out_0.3s_both]">
          {dict.notFound.title}
        </h2>

        <p className="mt-4 max-w-md text-base text-zinc-400 leading-relaxed animate-[fade-in_0.8s_ease-out_0.4s_both]">
          {dict.notFound.description}
        </p>

        <p className="mt-2 text-sm text-zinc-600 animate-[fade-in_0.8s_ease-out_0.45s_both]">
          {dict.notFound.suggestion}
        </p>

        {/* Action buttons */}
        <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:gap-4 animate-[fade-in_0.8s_ease-out_0.5s_both]">
          <Link
            href={`/${lang}`}
            className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-background shadow-lg transition-all duration-300 hover:bg-zinc-200 hover:shadow-xl hover:-translate-y-0.5"
          >
            <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            {dict.notFound.backHome}
          </Link>
          <Link
            href={`/${lang}/services`}
            className="inline-flex items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.04] px-8 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:border-white/[0.2] hover:bg-white/[0.08] hover:-translate-y-0.5"
          >
            <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
              <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
            </svg>
            {dict.notFound.browseServices}
          </Link>
          <Link
            href={`/${lang}/contact`}
            className="inline-flex items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.04] px-8 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:border-accent/30 hover:text-accent hover:-translate-y-0.5"
          >
            <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
            {dict.notFound.contactUs}
          </Link>
        </div>
      </div>
    </div>
  );
}

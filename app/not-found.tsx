import "@/app/globals.css";
import localFont from "next/font/local";
import Link from "next/link";
import type { Metadata } from "next";

const geist = localFont({
  src: "../public/geist-latin.woff2",
  variable: "--font-geist-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "404 — NJIWA",
  description: "Page not found",
};

export default function GlobalNotFound() {
  return (
    <html lang="fr" className={geist.variable}>
      <body className="flex min-h-screen flex-col bg-background text-foreground antialiased font-sans">
        {/* Minimal navbar */}
        <header className="sticky top-0 z-50 border-b border-gray-100/50 bg-white/80 backdrop-blur-lg">
          <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
            <Link
              href="/fr"
              className="text-xl font-bold tracking-tight text-primary"
            >
              NJIWA
            </Link>
            <nav className="hidden items-center gap-1 sm:flex">
              <Link
                href="/fr"
                className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 hover:text-primary"
              >
                Accueil
              </Link>
              <Link
                href="/fr/services"
                className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 hover:text-primary"
              >
                Services
              </Link>
              <Link
                href="/fr/contact"
                className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 hover:text-primary"
              >
                Contact
              </Link>
            </nav>
          </div>
        </header>

        {/* 404 content */}
        <main className="relative flex flex-1 flex-col items-center justify-center overflow-hidden px-6 py-24">
          {/* Background decorative blurs */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-primary/5 blur-3xl animate-[pulse-ring_6s_ease-in-out_infinite]" />
            <div className="absolute -bottom-32 -right-32 h-[420px] w-[420px] rounded-full bg-accent/5 blur-3xl animate-[pulse-ring_8s_ease-in-out_infinite_1s]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-64 rounded-full bg-primary-light/5 blur-3xl animate-[pulse-ring_7s_ease-in-out_infinite_0.5s]" />
          </div>

          <div className="relative z-10 flex flex-col items-center text-center animate-[fade-in_0.8s_ease-out]">
            {/* Animated illustration */}
            <div className="relative mb-8 animate-[float_4s_ease-in-out_infinite]">
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-primary/10 animate-[pulse-ring_5s_ease-in-out_infinite]" />
              <div className="flex h-40 w-40 items-center justify-center rounded-full bg-gradient-to-br from-primary/10 via-primary-light/10 to-accent/10 shadow-lg shadow-primary/5">
                <svg
                  className="h-20 w-20 text-primary"
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
                    opacity="0.4"
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
                    opacity="0.6"
                  />
                  <circle
                    cx="40"
                    cy="40"
                    r="3"
                    fill="currentColor"
                    opacity="0.8"
                  />
                  <text
                    x="40"
                    y="46"
                    textAnchor="middle"
                    fill="currentColor"
                    fontSize="16"
                    fontWeight="bold"
                    opacity="0.25"
                  >
                    ?
                  </text>
                </svg>
              </div>
            </div>

            {/* 404 heading */}
            <h1 className="text-8xl font-bold tracking-tighter text-primary/10 sm:text-9xl animate-[fade-in_0.8s_ease-out_0.2s_both]">
              404
            </h1>

            <h2 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl animate-[fade-in_0.8s_ease-out_0.3s_both]">
              Page introuvable
            </h2>

            <p className="mt-4 max-w-md text-base text-gray-500 leading-relaxed animate-[fade-in_0.8s_ease-out_0.4s_both]">
              Désolé, la page que vous recherchez n&apos;existe pas ou a été
              déplacée.
            </p>

            <p className="mt-2 text-sm text-gray-400 animate-[fade-in_0.8s_ease-out_0.45s_both]">
              Vérifiez l&apos;URL ou explorez nos pages ci-dessous.
            </p>

            {/* Action buttons */}
            <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:gap-4 animate-[fade-in_0.8s_ease-out_0.5s_both]">
              <Link
                href="/fr"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-all duration-300 hover:bg-primary-light hover:shadow-xl hover:-translate-y-0.5"
              >
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                Retour à l&apos;accueil
              </Link>
              <Link
                href="/fr/services"
                className="inline-flex items-center gap-2 rounded-full border-2 border-gray-200 bg-white px-8 py-3.5 text-sm font-semibold text-gray-700 transition-all duration-300 hover:border-primary/30 hover:text-primary hover:shadow-md hover:-translate-y-0.5"
              >
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  />
                  <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                </svg>
                Découvrir nos services
              </Link>
              <Link
                href="/fr/contact"
                className="inline-flex items-center gap-2 rounded-full border-2 border-gray-200 bg-white px-8 py-3.5 text-sm font-semibold text-gray-700 transition-all duration-300 hover:border-accent/40 hover:text-accent hover:shadow-md hover:-translate-y-0.5"
              >
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                Nous contacter
              </Link>
            </div>
          </div>

          {/* Decorative grid pattern */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage:
                "radial-gradient(circle, #1e3a5f 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />
        </main>

        {/* Minimal footer */}
        <footer className="border-t border-gray-100 bg-gray-50 py-8 px-6 text-center">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} NJIWA. Tous droits réservés.
          </p>
        </footer>
      </body>
    </html>
  );
}

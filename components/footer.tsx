import Image from "next/image";
import type { Dictionary } from "@/app/[lang]/dictionaries";

interface FooterProps {
  dict: Dictionary;
  lang: string;
}

export default function Footer({ dict, lang }: FooterProps) {
  const navLinks = [
    { href: `/${lang}`, label: dict.nav.home },
    { href: `/${lang}/about`, label: dict.nav.about },
    { href: `/${lang}/services`, label: dict.nav.services },
    { href: `/${lang}/team`, label: dict.nav.team },
    { href: `/${lang}/contact`, label: dict.nav.contact },
  ];

  const serviceLinks = dict.services.items.map((item) => ({
    href: `/${lang}/services`,
    label: item.title,
  }));

  return (
    <footer className="border-t border-white/[0.06] bg-background">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <a href={`/${lang}`} className="flex items-center">
              <Image src="/logo.svg" alt="NJIWA" width={44} height={44} />
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-zinc-500">
              {dict.footer.description}
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-zinc-300">
              {dict.footer.quickLinks}
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href + link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-zinc-500 transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-zinc-300">
              {dict.footer.services}
            </h4>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-zinc-500 transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-zinc-300">
              Contact
            </h4>
            <ul className="space-y-3 text-sm text-zinc-500">
              <li className="flex items-start gap-2">
                <svg
                  className="mt-0.5 h-4 w-4 shrink-0 text-zinc-600"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                  <circle cx="12" cy="9" r="2.5" />
                </svg>
                {dict.footer.contactInfo.address}
              </li>
              <li className="flex items-start gap-2">
                <svg
                  className="mt-0.5 h-4 w-4 shrink-0 text-zinc-600"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                {dict.footer.contactInfo.phone}
              </li>
              <li className="flex items-start gap-2">
                <svg
                  className="mt-0.5 h-4 w-4 shrink-0 text-zinc-600"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                {dict.footer.contactInfo.email}
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-white/[0.06] pt-8 text-center text-sm text-zinc-600">
          © {new Date().getFullYear()} NJIWA. {dict.footer.rights}
        </div>
      </div>
    </footer>
  );
}

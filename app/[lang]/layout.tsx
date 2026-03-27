import "@/app/globals.css";
import localFont from "next/font/local";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "./dictionaries";
import type { Locale } from "./dictionaries";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://njiwardc.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
};

const geist = localFont({
  src: "../../public/geist-latin.woff2",
  variable: "--font-geist-sans",
  display: "swap",
});

export function generateStaticParams() {
  return [{ lang: "fr" }, { lang: "en" }, { lang: "sw" }];
}

export default async function RootLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const { lang } = await params;

  if (!hasLocale(lang)) {
    notFound();
  }

  const dict = await getDictionary(lang as Locale);

  return (
    <html lang={lang} className={`${geist.variable} dark`}>
      <body className="flex min-h-screen flex-col bg-background text-foreground antialiased font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "NJIWA",
              url: "https://njiwardc.com",
              logo: "https://njiwardc.com/logo.svg",
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+243-994-295-180",
                contactType: "customer service",
                availableLanguage: ["French", "English", "Swahili"],
              },
              address: {
                "@type": "PostalAddress",
                streetAddress: "2, Av Kambove, Qr Kiwele",
                addressLocality: "Lubumbashi",
                addressRegion: "Haut-Katanga",
                addressCountry: "CD",
              },
              sameAs: [],
            }),
          }}
        />
        <Navbar dict={dict} lang={lang} />
        <main className="flex-1">{children}</main>
        <Footer dict={dict} lang={lang} />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}

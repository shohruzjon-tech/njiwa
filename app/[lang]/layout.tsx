import "@/app/globals.css";
import localFont from "next/font/local";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "./dictionaries";
import type { Locale } from "./dictionaries";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";

const geist = localFont({
  src: "../../public/geist-latin.woff2",
  variable: "--font-geist-sans",
  display: "swap",
});

export function generateStaticParams() {
  return [{ lang: "fr" }, { lang: "en" }];
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
        <Navbar dict={dict} lang={lang} />
        <main className="flex-1">{children}</main>
        <Footer dict={dict} lang={lang} />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}

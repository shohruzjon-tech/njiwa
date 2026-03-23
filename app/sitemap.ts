import type { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://njiwa.cd";

const locales = ["fr", "en"] as const;
const defaultLocale = "fr";

const routes = ["", "/about", "/services", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const route of routes) {
    for (const locale of locales) {
      const path = `/${locale}${route}`;

      entries.push({
        url: `${BASE_URL}${path}`,
        lastModified: new Date(),
        changeFrequency: route === "" ? "weekly" : "monthly",
        priority: route === "" ? 1.0 : route === "/services" ? 0.9 : 0.8,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [
              l === defaultLocale ? "fr-CD" : "en",
              `${BASE_URL}/${l}${route}`,
            ]),
          ),
        },
      });
    }
  }

  return entries;
}

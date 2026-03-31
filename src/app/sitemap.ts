import type { MetadataRoute } from "next";
import {
  getAbsolutePageUrl,
  sitePageKeys,
} from "@/content/site-pages";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ["en", "de"] as const;

  return locales.flatMap((locale) =>
    sitePageKeys.map((pageKey) => ({
      url: getAbsolutePageUrl(locale, pageKey),
      lastModified: new Date(),
      changeFrequency: pageKey === "blog" ? "monthly" : "weekly",
      priority:
        pageKey === "home"
          ? locale === "en"
            ? 1
            : 0.9
          : pageKey === "services"
            ? 0.8
            : 0.6,
      alternates: {
        languages: {
          en: getAbsolutePageUrl("en", pageKey),
          de: getAbsolutePageUrl("de", pageKey),
        },
      },
    })),
  );
}


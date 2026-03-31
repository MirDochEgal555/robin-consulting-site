import type { MetadataRoute } from "next";
import {
  getBlogPosts,
  getAbsoluteBlogPostUrl,
} from "@/content/blog-posts";
import {
  sitePageKeys,
  getAbsolutePageUrl as getAbsoluteStaticPageUrl,
} from "@/content/site-pages";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ["en", "de"] as const;

  return locales.flatMap((locale) => [
    ...sitePageKeys.map((pageKey) => ({
      url: getAbsoluteStaticPageUrl(locale, pageKey),
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority:
        pageKey === "home"
          ? locale === "en"
            ? 1
            : 0.9
          : pageKey === "services"
            ? 0.8
            : 0.75,
      alternates: {
        languages: {
          en: getAbsoluteStaticPageUrl("en", pageKey),
          de: getAbsoluteStaticPageUrl("de", pageKey),
        },
      },
    })),
    ...getBlogPosts(locale).map((post) => ({
      url: post.url,
      lastModified: new Date(post.updatedAt),
      changeFrequency: "monthly" as const,
      priority: 0.7,
      alternates: {
        languages: {
          en:
            locale === "en"
              ? post.url
              : getAbsoluteBlogPostUrl("en", post.alternate.slug),
          de:
            locale === "de"
              ? post.url
              : getAbsoluteBlogPostUrl("de", post.alternate.slug),
        },
      },
    })),
  ]);
}


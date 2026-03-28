import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const siteUrl =
  (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(
    /\/$/,
    "",
  );

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
      alternates: {
        languages: {
          en: siteUrl,
          de: `${siteUrl}/de`,
        },
      },
    },
    {
      url: `${siteUrl}/de`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: {
        languages: {
          en: siteUrl,
          de: `${siteUrl}/de`,
        },
      },
    },
  ];
}


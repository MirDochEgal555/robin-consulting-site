import { siteContent } from "@/content/site-content";

const fallbackSiteUrl = "http://localhost:3000";

const normalizePublicEnv = (value: string | undefined) => value?.trim() || undefined;

export const siteConfig = {
  siteUrl: normalizePublicEnv(process.env.NEXT_PUBLIC_SITE_URL) ?? fallbackSiteUrl,
  analyticsId: normalizePublicEnv(process.env.NEXT_PUBLIC_ANALYTICS_ID),
  bookingConversionId: normalizePublicEnv(
    process.env.NEXT_PUBLIC_BOOKING_CONVERSION_ID,
  ),
  emailConversionId: normalizePublicEnv(
    process.env.NEXT_PUBLIC_EMAIL_CONVERSION_ID,
  ),
  themeColor: "#07111f",
  locale: "en_US",
  title: siteContent.seo.title,
  description: siteContent.seo.description,
  ogDescription: siteContent.seo.ogDescription,
  keywords: siteContent.seo.keywords,
  personName: siteContent.personName,
  siteName: siteContent.siteName,
  companyName: siteContent.companyName,
} as const;

export const siteUrl = siteConfig.siteUrl;
export const ogImageUrl = `${siteConfig.siteUrl}/opengraph-image`;

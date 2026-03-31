import type { Metadata } from "next";
import { getSiteContent, type SiteLocale } from "@/content/site-content";

export const sitePageKeys = ["home", "services", "blog"] as const;

export type SitePageKey = (typeof sitePageKeys)[number];

export type SiteNavItem = {
  label: string;
  href: string;
};

export type LanguageSwitchLink = SiteNavItem & {
  ariaLabel: string;
};

type PageMetadataContent = {
  title: string;
  description: string;
  openGraphTitle: string;
  openGraphDescription: string;
};

type PageIntroContent = {
  eyebrow: string;
  title: string;
  description: string;
};

type EmptyStateContent = {
  status: string;
  title: string;
  description: string;
};

type SitePageDefinition = {
  label: string;
  slug: string;
  metadata?: PageMetadataContent;
  intro?: PageIntroContent;
  emptyState?: EmptyStateContent;
};

const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
).replace(/\/$/, "");

const pageDefinitions = {
  en: {
    home: {
      label: "Home",
      slug: "",
    },
    services: {
      label: "Services",
      slug: "services",
      metadata: {
        title: "Services | Robin Keim IT Consulting",
        description:
          "AI consulting, task automation, and website creation and hosting for businesses that want practical digital leverage.",
        openGraphTitle: "Services | Robin Keim IT Consulting",
        openGraphDescription:
          "A service overview covering AI consulting, task automation, and website creation and hosting.",
      },
      intro: {
        eyebrow: "Services",
        title: "AI consulting, task automation, and websites built around business needs.",
        description:
          "This page explains how businesses can benefit from practical AI use, cleaner task automation, and websites that are created and hosted as reliable business assets.",
      },
    },
    blog: {
      label: "Blog",
      slug: "blog",
      metadata: {
        title: "Blog | Robin Keim IT Consulting",
        description:
          "Practical articles on IT consulting, architecture decisions, delivery planning, and software implementation.",
        openGraphTitle: "Blog | Robin Keim IT Consulting",
        openGraphDescription:
          "Published insights on architecture, delivery planning, internal tools, and focused software execution.",
      },
      intro: {
        eyebrow: "Blog",
        title: "Published insights, case notes, and technical writing.",
        description:
          "This page now acts as a proper publishing hub for articles that can rank independently, be shared directly, and support long-term discoverability.",
      },
    },
  },
  de: {
    home: {
      label: "Start",
      slug: "",
    },
    services: {
      label: "Leistungen",
      slug: "services",
      metadata: {
        title: "Leistungen | Robin Keim IT-Beratung",
        description:
          "KI-Beratung, Aufgabenautomatisierung sowie Erstellung und Hosting von Websites fuer Unternehmen, die digitale Hebel praktisch nutzen wollen.",
        openGraphTitle: "Leistungen | Robin Keim IT-Beratung",
        openGraphDescription:
          "Eine Leistungsseite zu KI-Beratung, Aufgabenautomatisierung sowie Erstellung und Hosting von Websites.",
      },
      intro: {
        eyebrow: "Leistungen",
        title: "KI-Beratung, Automatisierung und Websites mit klarem Nutzen fuer Ihr Unternehmen.",
        description:
          "Diese Seite zeigt, wie Unternehmen von praktischem KI-Einsatz, sauberer Aufgabenautomatisierung und professionell erstellten und gehosteten Websites profitieren koennen.",
      },
    },
    blog: {
      label: "Blog",
      slug: "blog",
      metadata: {
        title: "Blog | Robin Keim IT-Beratung",
        description:
          "Praxisnahe Beitraege zu IT-Beratung, Architekturentscheidungen, Delivery-Planung und Software-Umsetzung.",
        openGraphTitle: "Blog | Robin Keim IT-Beratung",
        openGraphDescription:
          "Veroeffentlichte Einordnungen zu Architektur, Delivery-Planung, internen Tools und fokussierter Software-Umsetzung.",
      },
      intro: {
        eyebrow: "Blog",
        title: "Veroeffentlichte Einordnungen, Fallbeispiele und technische Notizen.",
        description:
          "Diese Seite ist jetzt ein echter Publishing-Hub fuer Artikel, die eigenstaendig ranken, direkt geteilt werden und langfristig neue Suchanfragen erreichen koennen.",
      },
    },
  },
} as const satisfies Record<SiteLocale, Record<SitePageKey, SitePageDefinition>>;

function getLocalePrefix(locale: SiteLocale) {
  return locale === "de" ? "/de" : "";
}

function getPageMetadataContent(locale: SiteLocale, pageKey: SitePageKey) {
  if (pageKey === "home") {
    const content = getSiteContent(locale);

    return {
      title: content.metadata.title,
      description: content.metadata.description,
      openGraphTitle: content.metadata.openGraphTitle,
      openGraphDescription: content.metadata.openGraphDescription,
    };
  }

  return pageDefinitions[locale][pageKey].metadata;
}

export function getPageDefinition(
  locale: SiteLocale,
  pageKey: "home",
): (typeof pageDefinitions)[SiteLocale]["home"];
export function getPageDefinition(
  locale: SiteLocale,
  pageKey: "services",
): (typeof pageDefinitions)[SiteLocale]["services"];
export function getPageDefinition(
  locale: SiteLocale,
  pageKey: "blog",
): (typeof pageDefinitions)[SiteLocale]["blog"];
export function getPageDefinition(
  locale: SiteLocale,
  pageKey: SitePageKey,
): SitePageDefinition;
export function getPageDefinition(locale: SiteLocale, pageKey: SitePageKey) {
  return pageDefinitions[locale][pageKey];
}

export function getPagePath(locale: SiteLocale, pageKey: SitePageKey) {
  const { slug } = getPageDefinition(locale, pageKey);
  const localePrefix = getLocalePrefix(locale);

  if (!slug) {
    return localePrefix || "/";
  }

  return `${localePrefix}/${slug}`;
}

export function getAbsolutePageUrl(locale: SiteLocale, pageKey: SitePageKey) {
  const path = getPagePath(locale, pageKey);

  return path === "/" ? siteUrl : `${siteUrl}${path}`;
}

export function getPrimaryNavItems(locale: SiteLocale): SiteNavItem[] {
  return sitePageKeys.map((pageKey) => ({
    label: getPageDefinition(locale, pageKey).label,
    href: getPagePath(locale, pageKey),
  }));
}

export function getLanguageSwitch(
  locale: SiteLocale,
  pageKey: SitePageKey,
): LanguageSwitchLink {
  const switchContent = getSiteContent(locale).languageSwitch;
  const targetLocale = locale === "de" ? "en" : "de";

  return {
    label: switchContent.label,
    ariaLabel: switchContent.ariaLabel,
    href: getPagePath(targetLocale, pageKey),
  };
}

export function getPageMetadata(
  locale: SiteLocale,
  pageKey: SitePageKey = "home",
): Metadata {
  const metadata = getPageMetadataContent(locale, pageKey);
  const canonical = getPagePath(locale, pageKey);

  return {
    title: metadata.title,
    description: metadata.description,
    alternates: {
      canonical,
      languages: {
        en: getPagePath("en", pageKey),
        de: getPagePath("de", pageKey),
      },
    },
    openGraph: {
      title: metadata.openGraphTitle,
      description: metadata.openGraphDescription,
      url: getAbsolutePageUrl(locale, pageKey),
      siteName: getSiteContent(locale).metadata.siteName,
      type: "website",
      locale: locale === "de" ? "de_DE" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: metadata.openGraphTitle,
      description: metadata.openGraphDescription,
    },
  };
}

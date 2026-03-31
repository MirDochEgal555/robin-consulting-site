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
          "A dedicated overview of consulting, scoping, architecture support, and focused software implementation.",
        openGraphTitle: "Services | Robin Keim IT Consulting",
        openGraphDescription:
          "Consulting and implementation support for architecture, planning, and delivery decisions that need to move forward.",
      },
      intro: {
        eyebrow: "Services",
        title: "Consulting and implementation support with room to grow.",
        description:
          "This route separates the service offer from the homepage so additional offers, case studies, and delivery formats can be added later without restructuring the site.",
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
          "Eine eigene Uebersicht fuer Beratung, Scoping, Architekturunterstuetzung und fokussierte Software-Umsetzung.",
        openGraphTitle: "Leistungen | Robin Keim IT-Beratung",
        openGraphDescription:
          "Beratung und Umsetzung fuer Architektur, Planung und Delivery-Entscheidungen, die vorankommen muessen.",
      },
      intro: {
        eyebrow: "Leistungen",
        title: "Beratung und Umsetzung mit einer Struktur, die mitwachsen kann.",
        description:
          "Diese Route trennt das Leistungsangebot von der Startseite, damit weitere Angebote, Fallbeispiele und Formate spaeter ohne Umbau der Grundstruktur ergaenzt werden koennen.",
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

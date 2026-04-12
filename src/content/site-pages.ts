import type { Metadata } from "next";
import { getSiteContent, type SiteLocale } from "@/content/site-content";

export const sitePageKeys = ["home", "services", "projects", "blog"] as const;
export const utilitySitePageKeys = [
  "dashboard",
  "legalNotice",
  "privacy",
] as const;
export const allSitePageKeys = [...sitePageKeys, ...utilitySitePageKeys] as const;

export type SitePageKey = (typeof allSitePageKeys)[number];

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
        eyebrow: "Overview",
        title: "Technical solutions built around business needs.",
        description:
          "This page explains how businesses can benefit from practical AI use, cleaner task automation, and websites that are created and hosted as reliable business assets.",
      },
    },
    projects: {
      label: "Projects",
      slug: "projects",
      metadata: {
        title: "Previous Projects | Robin Keim IT Consulting",
        description:
          "A growing archive of previous projects, GitHub work, professional web development experience, and coding knowledge built through college and practice.",
        openGraphTitle: "Previous Projects | Robin Keim IT Consulting",
        openGraphDescription:
          "Selected older projects, GitHub repositories, working student experience, and coding background.",
      },
      intro: {
        eyebrow: "Previous projects",
        title: "Earlier project work, public repositories, and practical coding experience.",
        description:
          "This page gathers public GitHub work, selected older repositories, working student experience in web development and task automation, and the broader coding foundation built through business informatics studies.",
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
          "",
      },
    },
    dashboard: {
      label: "Dashboard",
      slug: "dashboard",
      metadata: {
        title: "Dashboard | Robin Keim IT Consulting",
        description:
          "A lightweight browser dashboard for SEO, analytics wiring, and recent performance signals.",
        openGraphTitle: "Dashboard | Robin Keim IT Consulting",
        openGraphDescription:
          "A browser-side dashboard showing SEO readiness, tracking status, and recent performance metrics.",
      },
      intro: {
        eyebrow: "Site pulse",
        title: "A small control room for SEO, tracking, and performance.",
        description:
          "Use this page to confirm what the current deployment is emitting, which events the browser is capturing, and whether analytics forwarding is actually configured.",
      },
    },
    legalNotice: {
      label: "Legal notice",
      slug: "legal-notice",
      metadata: {
        title: "Legal Notice | Robin Keim IT Consulting",
        description:
          "Provider identification and mandatory legal disclosures for Robin Keim IT Consulting.",
        openGraphTitle: "Legal Notice | Robin Keim IT Consulting",
        openGraphDescription:
          "Provider identification and mandatory legal disclosures for this website.",
      },
    },
    privacy: {
      label: "Privacy",
      slug: "privacy",
      metadata: {
        title: "Privacy Policy | Robin Keim IT Consulting",
        description:
          "Privacy information for the website, contact flow, booking flow, and optional analytics.",
        openGraphTitle: "Privacy Policy | Robin Keim IT Consulting",
        openGraphDescription:
          "Privacy information for the website, contact flow, booking flow, and optional analytics.",
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
        title: "Lösungen mit klarem Nutzen fuer Ihr Unternehmen.",
        description:
          "Diese Seite zeigt, wie Unternehmen von praktischem KI-Einsatz, sauberer Aufgabenautomatisierung und professionell erstellten und gehosteten Websites profitieren können.",
      },
    },
    projects: {
      label: "Projekte",
      slug: "projekte",
      metadata: {
        title: "Fruehere Projekte | Robin Keim IT-Beratung",
        description:
          "Ein wachsendes Archiv frueherer Projekte, GitHub-Arbeit, werkstudentischer Webentwicklung und Coding-Wissen aus Studium und Praxis.",
        openGraphTitle: "Fruehere Projekte | Robin Keim IT-Beratung",
        openGraphDescription:
          "Ausgewaehlte aeltere Projekte, GitHub-Repositories, Berufserfahrung und technischer Hintergrund.",
      },
      intro: {
        eyebrow: "Fruehere Projekte",
        title: "Fruehere Projektarbeit, oeffentliche Repositories und praktische Coding-Erfahrung.",
        description:
          "Diese Seite buendelt oeffentliche GitHub-Arbeit, ausgewaehlte aeltere Repositories, werkstudentische Erfahrung in Webentwicklung und Aufgabenautomatisierung sowie das breitere Coding-Fundament aus dem Wirtschaftsinformatik-Studium.",
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
          "Veröffentlichte Blog-Posts zu Lösungen, Use-Cases, internen Tools und fokussierter Software-Umsetzung.",
      },
      intro: {
        eyebrow: "Blog",
        title: "Veröffentlichte Blog-Posts zu Lösungen, Use-Cases, internen Tools und fokussierter Software-Umsetzung.",
        description:
          "",
      },
    },
    dashboard: {
      label: "Dashboard",
      slug: "dashboard",
      metadata: {
        title: "Dashboard | Robin Keim IT-Beratung",
        description:
          "Ein leichtgewichtiges Browser-Dashboard fuer SEO, Analytics-Verkabelung und aktuelle Performance-Signale.",
        openGraphTitle: "Dashboard | Robin Keim IT-Beratung",
        openGraphDescription:
          "Ein browserseitiges Dashboard fuer SEO-Bereitschaft, Tracking-Status und aktuelle Performance-Metriken.",
      },
      intro: {
        eyebrow: "Site pulse",
        title: "Ein kleines Kontrollzentrum fuer SEO, Tracking und Performance.",
        description:
          "Diese Seite zeigt, was die aktuelle Deployment wirklich ausliefert, welche Events der Browser erfasst und ob Analytics-Weiterleitung derzeit ueberhaupt konfiguriert ist.",
      },
    },
    legalNotice: {
      label: "Impressum",
      slug: "impressum",
      metadata: {
        title: "Impressum | Robin Keim IT-Beratung",
        description:
          "Anbieterkennzeichnung und Pflichtangaben fuer Robin Keim IT-Beratung.",
        openGraphTitle: "Impressum | Robin Keim IT-Beratung",
        openGraphDescription:
          "Anbieterkennzeichnung und Pflichtangaben fuer diese Website.",
      },
    },
    privacy: {
      label: "Datenschutz",
      slug: "datenschutz",
      metadata: {
        title: "Datenschutzerklaerung | Robin Keim IT-Beratung",
        description:
          "Datenschutzhinweise fuer Website, Kontaktweg, Terminbuchung und optionale Analytics.",
        openGraphTitle: "Datenschutzerklaerung | Robin Keim IT-Beratung",
        openGraphDescription:
          "Datenschutzhinweise fuer Website, Kontaktweg, Terminbuchung und optionale Analytics.",
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
  pageKey: "projects",
): (typeof pageDefinitions)[SiteLocale]["projects"];
export function getPageDefinition(
  locale: SiteLocale,
  pageKey: "blog",
): (typeof pageDefinitions)[SiteLocale]["blog"];
export function getPageDefinition(
  locale: SiteLocale,
  pageKey: "dashboard",
): (typeof pageDefinitions)[SiteLocale]["dashboard"];
export function getPageDefinition(
  locale: SiteLocale,
  pageKey: "legalNotice",
): (typeof pageDefinitions)[SiteLocale]["legalNotice"];
export function getPageDefinition(
  locale: SiteLocale,
  pageKey: "privacy",
): (typeof pageDefinitions)[SiteLocale]["privacy"];
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

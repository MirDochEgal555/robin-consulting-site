import type { Metadata } from "next";
import { getSiteContent, type SiteLocale } from "@/content/site-content";
import { getAbsolutePageUrl, getPagePath } from "@/content/site-pages";

type BlogPostSection = {
  title: string;
  paragraphs: string[];
  bullets?: string[];
};

type BlogPostLocaleContent = {
  slug: string;
  title: string;
  excerpt: string;
  seoDescription: string;
  category: string;
  tags: string[];
  sections: BlogPostSection[];
};

type BlogPostEntry = {
  id: string;
  featured: boolean;
  publishedAt: string;
  updatedAt: string;
  readingTimeMinutes: number;
  locales: Record<SiteLocale, BlogPostLocaleContent>;
};

export type BlogPost = {
  id: string;
  slug: string;
  path: string;
  url: string;
  title: string;
  excerpt: string;
  seoDescription: string;
  category: string;
  tags: string[];
  sections: BlogPostSection[];
  featured: boolean;
  publishedAt: string;
  updatedAt: string;
  readingTimeMinutes: number;
  alternate: {
    locale: SiteLocale;
    slug: string;
    path: string;
    url: string;
  };
};

const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
).replace(/\/$/, "");

const blogPostEntries = [
  {
    id: "what-i-do-it-consultant-ai",
    featured: true,
    publishedAt: "2026-03-30",
    updatedAt: "2026-03-30",
    readingTimeMinutes: 5,
    locales: {
      en: {
        slug: "what-i-actually-do-as-an-it-consultant",
        title: "What I Actually Do as an IT Consultant",
        excerpt:
          "A practical look at what I actually do as an IT consultant — from automation and custom software to modern AI solutions for businesses.",
        seoDescription:
          "Learn what an IT consultant really does and how automation, custom software, and AI solutions can help businesses work more efficiently.",
        category: "IT Consulting",
        tags: ["IT Consulting", "Automation", "AI Solutions", "Custom Software"],
        sections: [
          {
            title: "Introduction",
            paragraphs: [
              "If you’ve ever wondered what an IT consultant actually does, you’re not alone. Most people imagine something vague — fixing computers, writing code, or just “doing something technical.”",
              "In reality, my work is much more business-focused: I help companies solve problems using technology — including modern AI solutions.",
            ],
          },
          {
            title: "The Real Goal: Solving Business Problems",
            paragraphs: [
              "IT consulting is not primarily about technology. It is about efficiency, clarity, and growth.",
              "Most businesses struggle with operational friction rather than pure technical issues.",
            ],
            bullets: [
              "Manual and repetitive processes",
              "Disconnected tools and data silos",
              "Time lost in inefficient workflows",
              "Systems that don’t scale",
            ],
          },
          {
            title: "What I Actually Do in Practice",
            paragraphs: [
              "My work follows a structured approach to identify problems and implement the most effective solutions.",
            ],
          },
          {
            title: "1. Understand the Business",
            paragraphs: [
              "Before building anything, I analyze how your business operates — workflows, tools, bottlenecks, and goals.",
              "This ensures that any solution actually fits your real-world processes.",
            ],
          },
          {
            title: "2. Identify Opportunities",
            paragraphs: [
              "I identify where processes can be automated, simplified, or redesigned.",
              "Even small improvements can have a significant impact on efficiency.",
            ],
          },
          {
            title: "3. Design the Right Solution",
            paragraphs: [
              "Not every problem needs custom software.",
              "Sometimes a clean automation or better system structure is enough.",
              "The principle is always: as simple as possible, as powerful as necessary.",
            ],
          },
          {
            title: "4. Build & Implement",
            paragraphs: [
              "If needed, I build dashboards, internal tools, automations, APIs, and structured systems.",
              "Everything is designed to be usable, reliable, and scalable.",
            ],
          },
          {
            title: "5. Provide AI Solutions",
            paragraphs: [
              "A growing part of my work is helping businesses use AI in a practical way.",
            ],
            bullets: [
              "AI-assisted workflows",
              "Internal AI assistants",
              "Automated communication",
              "Data-driven decision support",
              "Content and knowledge systems",
            ],
          },
          {
            title: "6. Iterate & Improve",
            paragraphs: [
              "After implementation, I continuously improve systems.",
              "This ensures long-term scalability and increasing value over time.",
            ],
          },
          {
            title: "Final Thoughts",
            paragraphs: [
              "What I do as an IT consultant is simple: I help businesses work better.",
              "Through automation, custom systems, and AI, I create clarity, efficiency, and growth.",
            ],
          },
          {
            title: "Get Started",
            paragraphs: [
              "If you want to improve workflows, automate repetitive tasks, or explore AI solutions for your business, let’s talk.",
            ],
          },
        ],
      },

      de: {
        slug: "was-ich-als-it-consultant-eigentlich-mache",
        title: "Was ich als IT-Consultant eigentlich mache",
        excerpt:
          "Ein praktischer Einblick in meine Arbeit als IT-Consultant — von Automatisierung und individueller Software bis hin zu modernen KI-Lösungen.",
        seoDescription:
          "Erfahre, was ein IT-Consultant wirklich macht und wie Automatisierung, individuelle Software und KI Unternehmen effizienter machen.",
        category: "IT-Consulting",
        tags: ["IT-Consulting", "Automatisierung", "KI-Lösungen", "Software"],
        sections: [
          {
            title: "Einleitung",
            paragraphs: [
              "Viele fragen sich, was ein IT-Consultant eigentlich genau macht. Oft denkt man an Programmieren oder „irgendwas mit Technik“.",
              "In Wirklichkeit geht es vor allem darum, Geschäftsprobleme mit Technologie zu lösen — inklusive moderner KI.",
            ],
          },
          {
            title: "Das eigentliche Ziel",
            paragraphs: [
              "IT-Consulting bedeutet Effizienz, Klarheit und Wachstum.",
              "Die meisten Unternehmen kämpfen mit ineffizienten Abläufen und nicht optimal abgestimmten Systemen.",
            ],
            bullets: [
              "Manuelle und repetitive Aufgaben",
              "Unverbundene Tools",
              "Ineffiziente Prozesse",
              "Nicht skalierbare Systeme",
            ],
          },
          {
            title: "Was ich konkret mache",
            paragraphs: [
              "Mein Vorgehen folgt einem klaren Prozess, um Probleme zu identifizieren und gezielt zu lösen.",
            ],
          },
          {
            title: "1. Unternehmen verstehen",
            paragraphs: [
              "Ich analysiere Abläufe, Tools, Engpässe und Ziele.",
              "Nur so entstehen Lösungen, die wirklich zum Unternehmen passen.",
            ],
          },
          {
            title: "2. Potenziale erkennen",
            paragraphs: [
              "Ich finde Möglichkeiten zur Automatisierung und Optimierung.",
              "Oft bringen schon kleine Änderungen große Verbesserungen.",
            ],
          },
          {
            title: "3. Lösung konzipieren",
            paragraphs: [
              "Nicht jede Herausforderung braucht individuelle Software.",
              "Oft reichen einfache, gut durchdachte Lösungen.",
            ],
          },
          {
            title: "4. Umsetzung",
            paragraphs: [
              "Ich entwickle Dashboards, Tools und Automationen.",
              "Dabei stehen Skalierbarkeit und Benutzerfreundlichkeit im Fokus.",
            ],
          },
          {
            title: "5. KI einsetzen",
            paragraphs: [
              "Ein wichtiger Bestandteil ist der sinnvolle Einsatz von KI.",
            ],
            bullets: [
              "KI-gestützte Workflows",
              "Interne Assistenten",
              "Automatisierte Kommunikation",
              "Datenbasierte Entscheidungen",
              "Content- und Wissenssysteme",
            ],
          },
          {
            title: "6. Optimierung",
            paragraphs: [
              "Systeme werden kontinuierlich verbessert.",
              "So entsteht langfristig echter Mehrwert.",
            ],
          },
          {
            title: "Fazit",
            paragraphs: [
              "Ich helfe Unternehmen, effizienter zu arbeiten.",
              "Durch Automatisierung, Systeme und KI entsteht Klarheit und Wachstum.",
            ],
          },
          {
            title: "Kontakt",
            paragraphs: [
              "Wenn du Prozesse verbessern oder KI sinnvoll nutzen möchtest, lass uns sprechen.",
            ],
          },
        ],
      },
    },
  }
] as const satisfies readonly BlogPostEntry[];

function normalizeBlogPost(
  locale: SiteLocale,
  entry: BlogPostEntry,
): BlogPost {
  const localized = entry.locales[locale];
  const alternateLocale = locale === "de" ? "en" : "de";
  const alternate = entry.locales[alternateLocale];

  return {
    id: entry.id,
    slug: localized.slug,
    path: getBlogPostPath(locale, localized.slug),
    url: getAbsoluteBlogPostUrl(locale, localized.slug),
    title: localized.title,
    excerpt: localized.excerpt,
    seoDescription: localized.seoDescription,
    category: localized.category,
    tags: localized.tags,
    sections: localized.sections,
    featured: entry.featured,
    publishedAt: entry.publishedAt,
    updatedAt: entry.updatedAt,
    readingTimeMinutes: entry.readingTimeMinutes,
    alternate: {
      locale: alternateLocale,
      slug: alternate.slug,
      path: getBlogPostPath(alternateLocale, alternate.slug),
      url: getAbsoluteBlogPostUrl(alternateLocale, alternate.slug),
    },
  };
}

function sortByPublishedDateDescending(a: BlogPost, b: BlogPost) {
  return (
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getBlogPostPath(locale: SiteLocale, slug: string) {
  return `${getPagePath(locale, "blog")}/${slug}`;
}

export function getAbsoluteBlogPostUrl(locale: SiteLocale, slug: string) {
  const path = getBlogPostPath(locale, slug);

  return `${siteUrl}${path}`;
}

export function getBlogPosts(locale: SiteLocale): BlogPost[] {
  return blogPostEntries
    .map((entry) => normalizeBlogPost(locale, entry))
    .sort(sortByPublishedDateDescending);
}

export function getFeaturedBlogPosts(
  locale: SiteLocale,
  limit = 3,
): BlogPost[] {
  return getBlogPosts(locale)
    .filter((post) => post.featured)
    .slice(0, limit);
}

export function getBlogPost(
  locale: SiteLocale,
  slug: string,
): BlogPost | undefined {
  return getBlogPosts(locale).find((post) => post.slug === slug);
}

export function getRelatedBlogPosts(
  locale: SiteLocale,
  currentPostId: string,
  limit = 2,
): BlogPost[] {
  return getBlogPosts(locale)
    .filter((post) => post.id !== currentPostId)
    .slice(0, limit);
}

export function formatBlogDate(locale: SiteLocale, value: string) {
  return new Intl.DateTimeFormat(locale === "de" ? "de-DE" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(value));
}

export function getReadingTimeLabel(
  locale: SiteLocale,
  readingTimeMinutes: number,
) {
  return locale === "de"
    ? `${readingTimeMinutes} Min. Lesezeit`
    : `${readingTimeMinutes} min read`;
}

export function getBlogPostMetadata(
  locale: SiteLocale,
  slug: string,
): Metadata | undefined {
  const post = getBlogPost(locale, slug);

  if (!post) {
    return undefined;
  }

  const siteContent = getSiteContent(locale);

  return {
    title: `${post.title} | ${getPageDefinitionLabel(locale)}`,
    description: post.seoDescription,
    alternates: {
      canonical: post.path,
      languages: {
        en:
          locale === "en"
            ? post.path
            : getBlogPostPath("en", post.alternate.slug),
        de:
          locale === "de"
            ? post.path
            : getBlogPostPath("de", post.alternate.slug),
      },
    },
    openGraph: {
      title: post.title,
      description: post.seoDescription,
      url: post.url,
      siteName: siteContent.metadata.siteName,
      type: "article",
      locale: locale === "de" ? "de_DE" : "en_US",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: ["Robin Keim"],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.seoDescription,
    },
  };
}

function getPageDefinitionLabel(locale: SiteLocale) {
  return locale === "de"
    ? "Blog | Robin Keim IT-Beratung"
    : "Blog | Robin Keim IT Consulting";
}

export function getBlogIndexStructuredData(locale: SiteLocale) {
  const posts = getBlogPosts(locale);
  const pageContent = getSiteContent(locale);

  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    name:
      locale === "de"
        ? "Robin Keim IT-Blog"
        : "Robin Keim IT Consulting Blog",
    description:
      locale === "de"
        ? "Blog mit praxisnahen Beitraegen zu IT-Beratung, Architektur und Delivery."
        : "Blog with practical articles on IT consulting, architecture, and delivery.",
    url: getAbsolutePageUrl(locale, "blog"),
    inLanguage: pageContent.lang,
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.seoDescription,
      url: post.url,
      datePublished: post.publishedAt,
      dateModified: post.updatedAt,
      keywords: post.tags,
      articleSection: post.category,
      author: {
        "@type": "Person",
        name: "Robin Keim",
      },
    })),
  };
}

export function getBlogPostStructuredData(post: BlogPost, locale: SiteLocale) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.seoDescription,
    url: post.url,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    articleSection: post.category,
    inLanguage: locale === "de" ? "de-DE" : "en-US",
    keywords: post.tags,
    author: {
      "@type": "Person",
      name: "Robin Keim",
    },
    publisher: {
      "@type": "Organization",
      name: "Robin Consulting",
      url: siteUrl,
    },
    mainEntityOfPage: post.url,
  };
}

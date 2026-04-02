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

export const blogSettings = {
  publicationTimeZone:
    process.env.BLOG_PUBLICATION_TIME_ZONE ?? "Europe/Berlin",
} as const;

const blogPostEntries = [
  {
    id: "ai-use-cases-business",
    featured: true,
    publishedAt: "2026-04-13",
    updatedAt: "2026-04-13",
    readingTimeMinutes: 6,
    locales: {
      en: {
        slug: "ai-use-cases-every-business-should-use",
        title: "5 AI Use Cases Every Business Should Implement Right Now",
        excerpt:
          "AI isn’t hype — it’s practical. Here are 5 real use cases that can immediately save time, improve workflows, and increase efficiency.",
        seoDescription:
          "Discover 5 practical AI use cases businesses can implement today — from automation to AI assistants and smarter workflows.",
        category: "AI & Business",
        tags: ["AI", "Automation", "Business Efficiency", "Workflows"],
        sections: [
          {
            title: "Introduction",
            paragraphs: [
              "AI is everywhere right now — but most businesses still don’t know how to actually use it.",
              "The problem is not the technology. It’s knowing where AI creates real value.",
              "If you're new to how AI fits into modern systems, this article explains the bigger picture: /blog/how-ai-is-changing-websites",
            ],
          },
          {
            title: "Why Most Companies Fail with AI",
            paragraphs: [
              "Many businesses try AI in random places without a clear strategy.",
              "They start with tools instead of problems — and that leads to disappointing results.",
            ],
            bullets: [
              "Using AI without a clear use case",
              "Overcomplicating simple workflows",
              "Expecting magic instead of improvement",
            ],
          },
          {
            title: "1. Automating Repetitive Tasks",
            paragraphs: [
              "One of the biggest wins is removing repetitive manual work.",
              "AI can handle tasks that previously required constant human input.",
            ],
            bullets: [
              "Email replies and sorting",
              "Data entry and formatting",
              "Internal documentation",
              "Report generation",
            ],
          },
          {
            title: "2. AI Assistants for Internal Work",
            paragraphs: [
              "Instead of searching through documents or asking colleagues, teams can use internal AI assistants.",
              "These systems provide instant answers and improve productivity significantly.",
            ],
          },
          {
            title: "3. Smarter Customer Interaction",
            paragraphs: [
              "AI can improve how you communicate with customers.",
              "This is not just about chatbots — it’s about guiding users intelligently.",
            ],
            bullets: [
              "Answering common questions instantly",
              "Pre-qualifying leads",
              "Recommending products or services",
            ],
          },
          {
            title: "4. Content & Knowledge Systems",
            paragraphs: [
              "AI can help create and manage content much faster.",
              "It also enables structured knowledge systems inside your business.",
            ],
            bullets: [
              "Blog content and marketing text",
              "Internal knowledge bases",
              "Documentation systems",
            ],
          },
          {
            title: "5. Decision Support & Data Insights",
            paragraphs: [
              "AI can analyze data and provide insights that support decision-making.",
              "Instead of manually reviewing data, you get structured recommendations.",
            ],
          },
          {
            title: "How This Fits Together",
            paragraphs: [
              "These use cases are even more powerful when combined.",
              "AI becomes part of your overall system — not just a single tool.",
              "If you want to understand how these systems are actually designed and implemented, read this: /blog/what-i-actually-do-as-an-it-consultant",
            ],
          },
          {
            title: "Final Thoughts",
            paragraphs: [
              "AI is not about replacing people — it’s about removing unnecessary work.",
              "Businesses that use AI strategically gain a massive advantage in efficiency and scalability.",
            ],
          },
          {
            title: "Get Started",
            paragraphs: [
              "If you want to implement AI in a practical way — without overcomplicating things — let’s talk.",
            ],
          },
        ],
      },

      de: {
        slug: "ki-anwendungsfaelle-unternehmen",
        title: "5 KI-Anwendungen, die jedes Unternehmen jetzt nutzen sollte",
        excerpt:
          "KI ist kein Hype — sondern ein praktisches Werkzeug. Diese 5 Anwendungsfälle bringen sofort echten Mehrwert.",
        seoDescription:
          "Entdecke 5 konkrete KI-Anwendungen für Unternehmen — von Automatisierung bis hin zu smarteren Workflows.",
        category: "KI & Business",
        tags: ["KI", "Automatisierung", "Effizienz", "Workflows"],
        sections: [
          {
            title: "Einleitung",
            paragraphs: [
              "KI ist aktuell überall — aber viele Unternehmen wissen nicht, wie sie sie konkret einsetzen sollen.",
              "Das Problem ist nicht die Technologie, sondern die Anwendung.",
              "Wenn du verstehen willst, wie KI Websites und Systeme verändert, lies hier: /de/blog/wie-ki-websites-veraendert",
            ],
          },
          {
            title: "Warum viele Unternehmen scheitern",
            paragraphs: [
              "Viele starten ohne klare Strategie.",
              "Sie denken in Tools statt in Problemen.",
            ],
            bullets: [
              "Keine klaren Anwendungsfälle",
              "Zu komplexe Lösungen",
              "Falsche Erwartungen",
            ],
          },
          {
            title: "1. Automatisierung",
            paragraphs: [
              "Wiederkehrende Aufgaben lassen sich hervorragend automatisieren.",
              "Das spart Zeit und reduziert Fehler.",
            ],
            bullets: [
              "E-Mails",
              "Dateneingabe",
              "Berichte",
              "Dokumentation",
            ],
          },
          {
            title: "2. Interne KI-Assistenten",
            paragraphs: [
              "Mitarbeiter können schneller arbeiten, indem sie direkt Antworten erhalten.",
              "Das reduziert Suchaufwand und verbessert Effizienz.",
            ],
          },
          {
            title: "3. Kundeninteraktion verbessern",
            paragraphs: [
              "KI hilft dabei, Kunden schneller und gezielter zu unterstützen.",
            ],
            bullets: [
              "Fragen beantworten",
              "Leads qualifizieren",
              "Empfehlungen geben",
            ],
          },
          {
            title: "4. Content & Wissen",
            paragraphs: [
              "KI beschleunigt die Erstellung und Organisation von Inhalten.",
            ],
            bullets: [
              "Marketingtexte",
              "Wissensdatenbanken",
              "Dokumentation",
            ],
          },
          {
            title: "5. Entscheidungen unterstützen",
            paragraphs: [
              "KI hilft dabei, Daten zu analysieren und bessere Entscheidungen zu treffen.",
            ],
          },
          {
            title: "Zusammenspiel",
            paragraphs: [
              "Der größte Mehrwert entsteht, wenn alles zusammenarbeitet.",
              "Wenn du sehen willst, wie solche Systeme umgesetzt werden, lies hier: /de/blog/was-ich-als-it-consultant-eigentlich-mache",
            ],
          },
          {
            title: "Fazit",
            paragraphs: [
              "KI hilft, unnötige Arbeit zu reduzieren und effizienter zu werden.",
              "Unternehmen, die das früh nutzen, haben klare Vorteile.",
            ],
          },
          {
            title: "Start",
            paragraphs: [
              "Wenn du KI sinnvoll einsetzen willst, lass uns darüber sprechen.",
            ],
          },
        ],
      },
    },
  },
  {
    id: "ai-changing-websites",
    featured: true,
    publishedAt: "2026-04-06",
    updatedAt: "2026-04-06",
    readingTimeMinutes: 5,
    locales: {
      en: {
        slug: "how-ai-is-changing-websites",
        title: "Websites Are Dead? What AI Really Changes About Them",
        excerpt:
          "AI is transforming how websites work — from static pages to intelligent systems. Here’s what that means for your business.",
        seoDescription:
          "Discover how AI is changing websites, from automation and personalization to AI assistants and smarter user experiences.",
        category: "AI & Websites",
        tags: ["AI", "Web Development", "Automation", "User Experience"],
        sections: [
          {
            title: "Introduction",
            paragraphs: [
              "You’ve probably heard statements like “websites are dead” or “AI will replace websites.” That’s not entirely true — but something big is definitely changing.",
              "Websites are no longer just static pages. They are evolving into intelligent, interactive systems — and AI is the main driver behind that shift.",
            ],
          },
          {
            title: "What Changed?",
            paragraphs: [
              "Traditional websites were built to present information. You created pages, users clicked through them, and that was it.",
              "Today, users expect something different — faster answers, personalized experiences, and direct interaction.",
            ],
            bullets: [
              "Users don’t want to search — they want answers",
              "Content is no longer enough — interaction matters",
              "Speed and relevance are more important than structure",
            ],
          },
          {
            title: "From Static Pages to Intelligent Systems",
            paragraphs: [
              "AI turns websites from passive content hubs into active systems.",
              "Instead of just showing information, modern websites can now understand, respond, and assist users in real time.",
            ],
          },
          {
            title: "1. AI Assistants Replace Navigation",
            paragraphs: [
              "Instead of clicking through menus, users can simply ask what they need.",
              "AI assistants guide users directly to answers, products, or actions — reducing friction dramatically.",
            ],
          },
          {
            title: "2. Personalization Becomes the Default",
            paragraphs: [
              "Websites can now adapt to each visitor in real time.",
              "Content, offers, and flows can change depending on behavior, preferences, or intent.",
            ],
          },
          {
            title: "3. Automation Behind the Scenes",
            paragraphs: [
              "AI doesn’t just improve the frontend — it transforms what happens in the background.",
            ],
            bullets: [
              "Automatic content generation",
              "Smart lead qualification",
              "Dynamic data processing",
              "Workflow automation",
            ],
          },
          {
            title: "4. Faster Decision Making",
            paragraphs: [
              "AI enables websites to act, not just display.",
              "Instead of waiting for user input, systems can proactively suggest next steps, recommend solutions, or trigger actions.",
            ],
          },
          {
            title: "What This Means for Businesses",
            paragraphs: [
              "A modern website is no longer just a digital business card.",
              "It becomes a system that actively contributes to growth.",
              "If you want to understand how these systems are actually built and implemented in practice, check out: /blog/what-i-actually-do-as-an-it-consultant",

            ],
            bullets: [
              "More conversions through better user guidance",
              "Less manual work through automation",
              "Better user experience through personalization",
              "Higher efficiency across the business",
            ],
          },
          {
            title: "What Most Companies Get Wrong",
            paragraphs: [
              "Many businesses think adding AI means adding a chatbot — and that’s it.",
              "But real impact comes from integrating AI into the entire system, not just one feature.",
            ],
          },
          {
            title: "Final Thoughts",
            paragraphs: [
              "Websites are not dead — they are evolving.",
              "The real shift is from static content to intelligent systems that understand and support users.",
              "Companies that adapt early will have a major advantage.",
            ],
          },
          {
            title: "Get Started",
            paragraphs: [
              "If you’re thinking about upgrading your website or integrating AI into your business, now is the right time.",
              "Let’s explore how your website can become a real growth engine.",
            ],
          },
        ],
      },

      de: {
        slug: "wie-ki-websites-veraendert",
        title: "Sind Websites tot? Was KI wirklich verändert",
        excerpt:
          "KI verändert Websites grundlegend — von statischen Seiten zu intelligenten Systemen. Was das für dein Business bedeutet.",
        seoDescription:
          "Erfahre, wie KI Websites verändert und wie Automatisierung, Personalisierung und intelligente Systeme dein Business verbessern.",
        category: "KI & Websites",
        tags: ["KI", "Webentwicklung", "Automatisierung", "User Experience"],
        sections: [
          {
            title: "Einleitung",
            paragraphs: [
              "Vielleicht hast du schon gehört: „Websites sind tot“ oder „KI ersetzt Websites“. Ganz so einfach ist es nicht — aber es verändert sich gerade sehr viel.",
              "Websites entwickeln sich von statischen Seiten zu intelligenten Systemen — und KI ist der Haupttreiber dieser Entwicklung.",
            ],
          },
          {
            title: "Was sich verändert hat",
            paragraphs: [
              "Früher waren Websites dafür da, Informationen bereitzustellen.",
              "Heute erwarten Nutzer direkte Antworten, personalisierte Inhalte und Interaktion.",
            ],
            bullets: [
              "Nutzer wollen nicht suchen — sie wollen Antworten",
              "Interaktion wird wichtiger als Struktur",
              "Relevanz schlägt Informationsmenge",
            ],
          },
          {
            title: "Von statischen Seiten zu Systemen",
            paragraphs: [
              "KI macht Websites aktiv statt passiv.",
              "Sie reagieren, unterstützen und helfen Nutzern in Echtzeit.",
            ],
          },
          {
            title: "1. KI ersetzt Navigation",
            paragraphs: [
              "Statt sich durch Menüs zu klicken, können Nutzer einfach Fragen stellen.",
              "KI führt direkt zur passenden Lösung.",
            ],
          },
          {
            title: "2. Personalisierung wird Standard",
            paragraphs: [
              "Websites passen sich automatisch an den Nutzer an.",
              "Inhalte und Angebote verändern sich je nach Verhalten und Bedarf.",
            ],
          },
          {
            title: "3. Automatisierung im Hintergrund",
            paragraphs: [
              "KI verändert nicht nur das Frontend, sondern auch die Prozesse dahinter.",
            ],
            bullets: [
              "Automatische Content-Erstellung",
              "Lead-Qualifizierung",
              "Datenverarbeitung",
              "Workflow-Automatisierung",
            ],
          },
          {
            title: "4. Schnellere Entscheidungen",
            paragraphs: [
              "Websites handeln aktiv statt nur Informationen zu zeigen.",
              "Sie schlagen nächste Schritte vor und unterstützen Entscheidungen.",
            ],
          },
          {
            title: "Was das für Unternehmen bedeutet",
            paragraphs: [
              "Eine Website ist nicht mehr nur eine digitale Visitenkarte.",
              "Sie wird zu einem aktiven Bestandteil des Geschäfts.",
              "Wenn du verstehen willst, wie solche Systeme konkret umgesetzt werden, lies hier weiter: /de/blog/was-ich-als-it-consultant-eigentlich-mache",
            ],
            bullets: [
              "Mehr Conversions",
              "Weniger manueller Aufwand",
              "Bessere Nutzererfahrung",
              "Höhere Effizienz",
            ],
          },
          {
            title: "Typische Fehler",
            paragraphs: [
              "Viele Unternehmen denken, KI bedeutet einfach ein Chatbot.",
              "Der echte Mehrwert entsteht aber durch Integration in das gesamte System.",
            ],
          },
          {
            title: "Fazit",
            paragraphs: [
              "Websites sind nicht tot — sie entwickeln sich weiter.",
              "Der Wandel geht hin zu intelligenten Systemen, die Nutzer aktiv unterstützen.",
              "Wer früh handelt, hat einen klaren Vorteil.",
            ],
          },
          {
            title: "Start",
            paragraphs: [
              "Wenn du deine Website modernisieren oder KI sinnvoll integrieren willst, ist jetzt der richtige Zeitpunkt.",
              "Lass uns gemeinsam schauen, wie deine Website mehr leisten kann.",
            ],
          },
        ],
      },
    },
  },
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
              "If you're curious how AI is changing modern websites and digital systems, you can read more here: /en/blog/how-ai-is-changing-websites",

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
              "Wenn dich interessiert, wie KI moderne Websites verändert, kannst du hier mehr dazu lesen: /de/blog/wie-ki-websites-veraendert",

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
  return b.publishedAt.localeCompare(a.publishedAt);
}

function getDatePartsInTimeZone(date: Date, timeZone: string) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);

  const year = parts.find((part) => part.type === "year")?.value;
  const month = parts.find((part) => part.type === "month")?.value;
  const day = parts.find((part) => part.type === "day")?.value;

  if (!year || !month || !day) {
    throw new Error("Unable to resolve the current blog publication date.");
  }

  return `${year}-${month}-${day}`;
}

function getCurrentPublicationDate() {
  return getDatePartsInTimeZone(
    new Date(),
    blogSettings.publicationTimeZone,
  );
}

function isPublishedBlogPost(
  entry: BlogPostEntry,
  currentPublicationDate: string,
) {
  return entry.publishedAt <= currentPublicationDate;
}

export function getBlogPostPath(locale: SiteLocale, slug: string) {
  return `${getPagePath(locale, "blog")}/${slug}`;
}

export function getAbsoluteBlogPostUrl(locale: SiteLocale, slug: string) {
  const path = getBlogPostPath(locale, slug);

  return `${siteUrl}${path}`;
}

export function getBlogPosts(locale: SiteLocale): BlogPost[] {
  const currentPublicationDate = getCurrentPublicationDate();

  return blogPostEntries
    .filter((entry) => isPublishedBlogPost(entry, currentPublicationDate))
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

import type { Metadata } from "next";

export type SiteLocale = "en" | "de";

type NavItem = {
  label: string;
  href: string;
};

type Highlight = {
  value: string;
  label: string;
};

type Service = {
  eyebrow: string;
  title: string;
  description: string;
};

type ProcessStep = {
  title: string;
  description: string;
};

type UseCase = {
  eyebrow: string;
  title: string;
  description: string;
  outcome: string;
};

type TimelineItem = {
  period: string;
  title: string;
  institution: string;
  description: string;
};

type LanguageSwitch = {
  label: string;
  href: string;
  ariaLabel: string;
};

export type SiteContent = {
  locale: SiteLocale;
  lang: string;
  path: "/" | "/de";
  metadata: {
    title: string;
    description: string;
    openGraphTitle: string;
    openGraphDescription: string;
    siteName: string;
  };
  companyName: string;
  brand: {
    primary: string;
    secondary: string;
  };
  bookingUrl: string;
  email: string;
  emailLink: string;
  navItems: NavItem[];
  cta: {
    bookConsultation: string;
    emailRobin: string;
    sendEmail: string;
  };
  languageSwitch: LanguageSwitch;
  footerTagline: string;
  footerLinks: {
    legalNotice: string;
    privacy: string;
    cookieSettings: string;
  };
  hero: {
    eyebrow: string;
    headline: string;
    description: string;
    promiseLabel: string;
    promise: string;
    problemsLabel: string;
    highlights: Highlight[];
    problems: string[];
  };
  sections: {
    overviewLabel: string;
    blog: {
      eyebrow: string;
      title: string;
      description: string;
    };
    services: {
      eyebrow: string;
      title: string;
      description: string;
      pageLinkLabel: string;
    };
    useCases: {
      eyebrow: string;
      title: string;
      description: string;
      outcomeLabel: string;
    };
    process: {
      eyebrow: string;
      title: string;
      description: string;
    };
    about: {
      eyebrow: string;
      title: string;
      description: string;
      imageAlt: string;
      timelineLabel: string;
      credibilityLabel: string;
      capabilitiesTitle: string;
    };
    contact: {
      eyebrow: string;
      title: string;
      description: string;
    };
  };
  services: Service[];
  useCases: UseCase[];
  process: ProcessStep[];
  about: {
    summary: string;
    timeline: TimelineItem[];
    highlights: Highlight[];
    capabilities: string[];
  };
  contact: {
    title: string;
    description: string;
    email: string;
  };
  blog: {
    featuredLabel: string;
    latestLabel: string;
    archiveLabel: string;
    readArticleLabel: string;
    browseAllLabel: string;
    backToBlogLabel: string;
    relatedPostsLabel: string;
  };
};

const contactEmail =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "robin-keim@gmx.de";

const bookingUrl =
  process.env.NEXT_PUBLIC_BOOKING_URL ??
  "https://www.cal.eu/robin-keim-consulting";

const shared = {
  bookingUrl,
  email: contactEmail,
  emailLink: `mailto:${contactEmail}`,
} as const;

const siteContent = {
  en: {
    locale: "en",
    lang: "en",
    path: "/",
    metadata: {
      title: "Robin Keim | IT Consulting",
      description:
        "Technical advisory for founders, professionals, and teams who need clarity and a working system fast.",
      openGraphTitle: "Robin Keim | IT Consulting",
      openGraphDescription:
        "Fast, practical IT consulting that turns technical uncertainty into clear execution.",
      siteName: "Robin Consulting",
    },
    companyName: "IT Consulting by Robin Keim",
    brand: {
      primary: "Robin Keim",
      secondary: "IT Consulting",
    },
    navItems: [
      { label: "Services", href: "#services" },
      { label: "Use Cases", href: "#use-cases" },
      { label: "Projects", href: "#projects" },
      { label: "Insights", href: "#insights" },
      { label: "About", href: "#about" },
      { label: "Contact", href: "#contact" },
    ],
    cta: {
      bookConsultation: "Book a free consultation",
      emailRobin: "Email me",
      sendEmail: "Send an email",
    },
    languageSwitch: {
      label: "DE",
      href: "/de",
      ariaLabel: "Switch to the German version",
    },
    footerTagline: "Clear systems. Faster decisions.",
    footerLinks: {
      legalNotice: "Legal notice",
      privacy: "Privacy",
      cookieSettings: "Cookie settings",
    },
    hero: {
      eyebrow: "IT Consulting",
      headline: "AI Consulting. Task Automation.",
      description:
        "I help small businesses automate repetitive workflows with AI and the right software, without needing in-house technical expertise.",
      promiseLabel: "Core promise",
      promise:
        "Get practical consulting on architecture, tooling, scope, and delivery, with the option to move from recommendation into focused software implementation.",
      problemsLabel: "Why clients reach out",
      highlights: [
        {
          value: "Fast clarity",
          label: "Focused consulting for decisions that cannot stall",
        },
        {
          value: "Free intro call",
          label: "A simple first conversation to assess fit",
        },
        {
          value: "From plan to build",
          label: "Advice that can continue into implementation",
        },
      ],
      problems: [
        "You need to make a technical decision soon, but the options all sound plausible.",
        "You know the business outcome you want, but not the engineering tradeoffs behind it.",
        "You need a realistic plan, not a long list of abstract recommendations.",
      ],
    },
    sections: {
      overviewLabel: "Overview",
      blog: {
        eyebrow: "Insights",
        title: "Recent articles about current trends and the professional offering",
        description:
          "The blog serves as practical consulting notes, architecture guidance, and delivery insights.",
      },
      services: {
        eyebrow: "Services",
        title: "How I Can Help",
        description:
          "Start with a focused consultation, move into implementation for a defined use case, or keep ongoing technical support available as your workflows evolve.",
        pageLinkLabel: "To concrete services",
      },
      useCases: {
        eyebrow: "Use Cases",
        title: "Typical Use Cases for AI and Automation",
        description:
          "Concrete examples of the workflows, admin tasks, and internal processes I help small businesses improve.",
        outcomeLabel: "Result",
      },
      process: {
        eyebrow: "Process",
        title: "A short path from uncertainty to a working direction",
        description:
          "The process section reinforces speed, clarity, and concrete outcomes.",
      },
      about: {
        eyebrow: "About",
        title:
          "A technical partner who brings clarity, structure, and follow-through",
        description:
          "I offer independent consulting for founders and lean teams that need sound engineering judgment, plain communication, and hands-on support when the next step should be built.",
        imageAlt: "Portrait of Robin Keim",
        timelineLabel: "Education and experience",
        credibilityLabel: "Highlights",
        capabilitiesTitle: "Strengths",
      },
      contact: {
        eyebrow: "Contact",
        title: "Book the call or start the conversation by email",
        description:
          "The primary contact remains the consultation booking link, with email as the secondary path if questions arise.",
      },
    },
    services: [
      {
        eyebrow: "Start",
        title: "Initial consultation",
        description:
          "Use a focused first session to review your current workflows, identify realistic AI or automation opportunities, and leave with a clear recommendation for the next step.",
      },
      {
        eyebrow: "Build",
        title: "Implementation",
        description:
          "When the solution is clear, I can also implement selected software components, internal tools, automations, or product features without turning the engagement into a large agency process.",
      },
      {
        eyebrow: "Support",
        title: "Ongoing support",
        description:
          "Stay supported beyond a single project with ongoing guidance on tooling, workflow improvements, prioritization, and hands-on help when new technical questions or blockers come up.",
      },
    ],
    useCases: [
      {
        eyebrow: "Sales",
        title: "Automate incoming inquiries",
        description:
          "Website forms, emails, or lead requests can be captured, tagged, routed, and followed up automatically instead of being handled by hand.",
        outcome: "Less manual lead handling and faster replies.",
      },
      {
        eyebrow: "Admin",
        title: "Reduce manual admin work",
        description:
          "Recurring email sorting, data entry, document handling, and status updates can be streamlined so routine tasks stop eating up the day.",
        outcome: "Less repetitive work and more time for valuable tasks.",
      },
      {
        eyebrow: "Operations",
        title: "Connect disconnected tools",
        description:
          "Move data automatically between email, spreadsheets, CRM, calendars, and internal systems instead of relying on copy-paste processes.",
        outcome: "Fewer errors and smoother day-to-day operations.",
      },
      {
        eyebrow: "Internal tools",
        title: "Build simple internal tools",
        description:
          "Replace fragile spreadsheet workflows with focused dashboards or lightweight tools built around the way your team actually works.",
        outcome: "Cleaner processes and better visibility.",
      },
      {
        eyebrow: "Customer service",
        title: "Speed up customer communication",
        description:
          "Automate first responses, summaries, routing, and follow-ups so clients get answers faster and requests land in the right place.",
        outcome: "A faster and more reliable client experience.",
      },
      {
        eyebrow: "Knowledge",
        title: "Create internal AI assistants",
        description:
          "Set up simple assistants that answer recurring questions based on your own documents, notes, and internal workflows.",
        outcome: "Faster access to information and less repeated back-and-forth.",
      },
    ],
    process: [
      {
        title: "Clarify the decision",
        description:
          "Start with the business context, the blocker, and the decision that actually needs to be made now.",
      },
      {
        title: "Compare the real options",
        description:
          "Reduce complexity into a small number of defensible paths, each with clear tradeoffs, cost implications, and delivery impact.",
      },
      {
        title: "Leave with a direction",
        description:
          "Walk away with a recommendation, a decision framework, or a concrete next-step plan, with implementation support available when it makes sense.",
      },
    ],
    about: {
      summary:
        "My consulting work is backed by formal training in business informatics and several years of hands-on software delivery in a professional environment.",
      timeline: [
        {
          period: "2019-2022",
          title: "B.Sc. in Business Informatics",
          institution: "University of Mannheim",
          description:
            "I built my academic foundation across software, information systems, and business context there, and that still shapes how I frame technical decisions.",
        },
        {
          period: "2022-2026",
          title: "M.Sc. in Business Informatics",
          institution: "Karlsruhe Institute of Technology (KIT)",
          description:
            "I deepened my ability to analyze complex requirements and translate them into structured, workable technical solutions there.",
        },
        {
          period: "Since 2023",
          title: "Application development at Omikron Data Solutions GmbH",
          institution: "Professional software delivery",
          description:
            "I have built several applications in an active delivery environment, with direct exposure to implementation, iteration, and product-oriented engineering work.",
        },
      ],
      highlights: [
        {
          value: "2019-2026",
          label: "Continuous formal training in business informatics",
        },
        {
          value: "Since 2023",
          label: "Building applications in a professional software company",
        },
        {
          value: "Business + tech",
          label: "Comfortable connecting business needs to technical execution",
        },
      ],
      capabilities: [
        "Architecture reviews and implementation planning",
        "Technical feasibility and delivery-risk assessment",
        "Product, tooling, and vendor decision support",
        "Business goals translated into practical engineering choices",
        "Hands-on implementation of focused software solutions",
      ],
    },
    contact: {
      title: "Free initial consultation",
      description:
        "Start with a short consultation to discuss the problem, the decision in front of you, and whether the work calls for consulting, implementation, or both. If you prefer email, reach out directly.",
      email: contactEmail,
    },
    blog: {
      featuredLabel: "Featured article",
      latestLabel: "Latest article",
      archiveLabel: "Article archive",
      readArticleLabel: "Read article",
      browseAllLabel: "Browse the blog",
      backToBlogLabel: "Back to blog",
      relatedPostsLabel: "Related reading",
    },
    ...shared,
  },
  de: {
    locale: "de",
    lang: "de",
    path: "/de",
    metadata: {
      title: "Robin Keim | IT-Beratung",
      description:
        "IT-Beratung für Unternehmen und Unternehmern, die schnell Klarheit und ein funktionierendes System brauchen.",
      openGraphTitle: "Robin Keim | IT-Beratung",
      openGraphDescription:
        "Schnelle, pragmatische IT-Beratung, die technische Unsicherheit in klare Umsetzung übersetzt.",
      siteName: "Robin Consulting",
    },
    companyName: "IT-Beratung von Robin Keim",
    brand: {
      primary: "Robin Keim",
      secondary: "IT-Beratung",
    },
    navItems: [
      { label: "Leistungen", href: "#services" },
      { label: "Anwendungsfälle", href: "#use-cases" },
      { label: "Projekte", href: "#projects" },
      { label: "Blog", href: "#insights" },
      { label: "Über mich", href: "#about" },
      { label: "Kontakt", href: "#contact" },
    ],
    cta: {
      bookConsultation: "Kostenloses Erstgespräch buchen",
      emailRobin: "Mir schreiben",
      sendEmail: "E-Mail senden",
    },
    languageSwitch: {
      label: "EN",
      href: "/",
      ariaLabel: "Zur englischen Version wechseln",
    },
    footerTagline: "Klare Systeme. Schnellere Entscheidungen.",
    footerLinks: {
      legalNotice: "Impressum",
      privacy: "Datenschutz",
      cookieSettings: "Cookie-Einstellungen",
    },
    hero: {
      eyebrow: "IT-Beratung",
      headline: "KI-Beratung. Prozessautomatisierung.",
      description:
        "Ich helfe kleinen Unternehmen, wiederkehrende Workflows mit KI und passender Software zu automatisieren, ohne eigenes technisches Know-how.",
      promiseLabel: "Kernversprechen",
      promise:
        "Sie erhalten pragmatische Beratung zu Architektur, Tooling, Scope und Delivery, mit der Option, aus einer Empfehlung direkt in eine fokussierte Software-Umsetzung zu wechseln.",
      problemsLabel: "Warum Kunden anfragen",
      highlights: [
        {
          value: "Schnell Klarheit",
          label: "Fokussierte Beratung für Entscheidungen, die nicht warten können",
        },
        {
          value: "Kostenloses Erstgespräch",
          label: "Ein unkompliziertes erstes Gespräch, um Bedarfe zu klären und Lösungen zu skizzieren",
        },
        {
          value: "Von Plan zu Umsetzung",
          label: "Beratungvon der Planung bis hin zur effizienten Umsetzung in Ihrem Unternehmen",
        },
      ],
      problems: [
        "Sie müssen bald eine Entscheidung treffen, aber alle Optionen klingen plausibel.",
        "Sie kennen das gewünschte Geschäftsergebnis, aber nicht die technischen Trade-offs dahinter.",
        "Sie brauchen einen realistischen Plan und keine lange Liste abstrakter Empfehlungen.",
      ],
    },
    sections: {
      overviewLabel: "Überblick",
      blog: {
        eyebrow: "Blog",
        title: "Neue Beiträge über aktuelle Neuigkeiten und das Beratungsangebot",
        description:
          "Der Blog besteht aus Inhalten zur Beratung, Architektur und aktuellen Trends.",
      },
      services: {
        eyebrow: "Leistungen",
        title:
          "Wobei ich Sie unterstütze",
        description:
          "Starten Sie mit einem fokussierten Erstgespräch, gehen Sie in die Umsetzung eines klaren Anwendungsfalls oder sichern Sie sich laufende technische Unterstützung für wachsende Anforderungen.",
        pageLinkLabel: "Zu den konkreten Leistungen",
      },
      useCases: {
        eyebrow: "Anwendungsfälle",
        title: "Typische Anwendungsfälle für KI und Automatisierung",
        description:
          "Konkrete Beispiele für Workflows, Verwaltungsaufgaben und interne Prozesse, die ich für kleine Unternehmen verbessere.",
        outcomeLabel: "Ergebnis",
      },
      process: {
        eyebrow: "Vorgehen",
        title: "Ein kurzer Weg von einer Idee zu einer tragfähigen Umsetzung",
        description:
          "Der Prozess garantiert Geschwindigkeit, Klarheit und konkrete Ergebnisse.",
      },
      about: {
        eyebrow: "Über mich",
        title: "Ihr IT-Partner mit Expertise, klarer Kommunikation und Kompetenz",
        description:
          "Ich biete unabhängige Beratung für Unternehmen, die fundiertes Engineering-Urteilsvermögen, klare Kommunikation und praktische Unterstützung im IT-Bereich brauchen.",
        imageAlt: "Porträt von Robin Keim",
        timelineLabel: "Ausbildung und Erfahrung",
        credibilityLabel: "Highlights",
        capabilitiesTitle: "Stärken",
      },
      contact: {
        eyebrow: "Kontakt",
        title: "Call buchen oder per E-Mail ins Gespräch kommen",
        description:
          "Die primäre Anlaufstelle ist ein Erstgespräch, aber senden Sie mir auch gerne eine E-Mail bei Fragen.",
      },
    },
    services: [
      {
        eyebrow: "Start",
        title: "Erstgespräch",
        description:
          "In einem fokussierten ersten Termin analysieren wir Ihre aktuellen Abläufe, identifizieren sinnvolle KI- oder Automatisierungsansätze und leiten daraus einen klaren nächsten Schritt ab.",
      },
      {
        eyebrow: "Umsetzung",
        title: "Implementierung",
        description:
          "Wenn wir gemeinsam die Lösung gefunden haben, können ausgewählte Software-Bausteine, interne Tools, Automatisierungen oder Produktfunktionen umgesetzt werden, ohne dass daraus ein großer Agenturprozess wird.",
      },
      {
        eyebrow: "Begleitung",
        title: "Laufende Beratung",
        description:
          "Bleiben Sie auch nach einem Projekt flexibel mit fortlaufender Beratung zu Tooling, Prozessverbesserungen, Priorisierung und konkreter Unterstützung bei neuen technischen Fragen oder Blockern.",
      },
    ],
    useCases: [
      {
        eyebrow: "Vertrieb",
        title: "Eingehende Anfragen automatisieren",
        description:
          "Website-Formulare, E-Mails oder Lead-Anfragen können automatisch erfasst, markiert, weitergeleitet und mit einer ersten Reaktion versehen werden.",
        outcome: "Weniger manuelle Lead-Bearbeitung und schnellere Rückmeldungen.",
      },
      {
        eyebrow: "Verwaltung",
        title: "Manuelle Verwaltungsarbeit reduzieren",
        description:
          "Wiederkehrende E-Mail-Sortierung, Dateneingabe, Dokumentenbearbeitung und Status-Updates lassen sich verschlanken, damit Routineaufgaben nicht den Tag bestimmen.",
        outcome: "Weniger repetitive Arbeit und mehr Zeit für wichtige Aufgaben.",
      },
      {
        eyebrow: "Abläufe",
        title: "Getrennte Tools verbinden",
        description:
          "Daten können automatisch zwischen E-Mail, Tabellen, CRM, Kalendern und internen Systemen fließen, statt über Copy-and-paste-Prozesse.",
        outcome: "Weniger Fehler und reibungslosere Abläufe im Alltag.",
      },
      {
        eyebrow: "Interne Tools",
        title: "Einfache interne Tools bauen",
        description:
          "Fragile Tabellenprozesse können durch fokussierte Dashboards oder schlanke Tools ersetzt werden, die zu Ihren echten Arbeitsabläufen passen.",
        outcome: "Sauberere Prozesse und mehr Überblick.",
      },
      {
        eyebrow: "Kundenkontakt",
        title: "Kundenkommunikation beschleunigen",
        description:
          "Erste Antworten, Zusammenfassungen, Weiterleitungen und Follow-ups lassen sich automatisieren, damit Anfragen schneller an der richtigen Stelle landen.",
        outcome: "Ein schnelleres und verlässlicheres Kundenerlebnis.",
      },
      {
        eyebrow: "Wissen",
        title: "Interne KI-Assistenten einrichten",
        description:
          "Einfache Assistenten können wiederkehrende Fragen auf Basis Ihrer eigenen Dokumente, Notizen und internen Prozesse beantworten.",
        outcome: "Schnellerer Zugriff auf Wissen und weniger wiederholte Rückfragen.",
      },
    ],
    process: [
      {
        title: "Die Idee konkretisieren",
        description:
          "Am Anfang steht ein persönliches Gespräch um die gemeinsamen Ziele zu definieren.",
      },
      {
        title: "Mögliche Optionen vergleichen",
        description:
          "Komplexität wird auf wenige Möglichkeiten reduziert, jeweils mit klaren Trade-offs, Kostenauswirkungen und Delivery-Folgen.",
      },
      {
        title: "Ein einheitliches Commitment erzeugen",
        description:
          "Sie bekommen eine klare Empfehlung und Sie entscheiden welche nächsten Schritte zu gehen sind bei denen ich Sie gerne unterstütze.",
      },
    ],
    about: {
      summary:
        "Meine Beratungsarbeit wird durch formale Ausbildung in Wirtschaftsinformatik und mehrere Jahre praktischer Software-Entwicklung im professionellen Umfeld getragen.",
      timeline: [
        {
          period: "2019-2022",
          title: "B.Sc. Wirtschaftsinformatik",
          institution: "Universität Mannheim",
          description:
            "Dort habe ich mein akademisches Fundament in Software, Informationssystemen und betriebswirtschaftlichem Kontext aufgebaut, das meine Einordnung technischer Entscheidungen bis heute prägt.",
        },
        {
          period: "2022-2026",
          title: "M.Sc. Wirtschaftsinformatik",
          institution: "Karlsruher Institut für Technologie (KIT)",
          description:
            "Dort habe ich meine Fähigkeit vertieft, komplexe Anforderungen zu analysieren und in strukturierte, tragfähige technische Lösungen zu übersetzen.",
        },
        {
          period: "Seit 2023",
          title: "Anwendungsentwicklung bei Omikron Data Solutions GmbH",
          institution: "Professionelle Software-Entwicklung",
          description:
            "Ich habe mehrere Anwendungen in einem aktiven Delivery-Umfeld gebaut, mit direktem Bezug zu Implementierung, Iteration und produktnaher Engineering-Arbeit.",
        },
      ],
      highlights: [
        {
          value: "2019-2026",
          label: "Durchgehendes Studium einer Kombination aus Wirtschaft und Informatik",
        },
        {
          value: "Seit 2023",
          label: "Entwicklung von Anwendungen in einem professionellen IT-Unternehmen",
        },
        {
          value: "Business + Tech",
          label: "Sicher im Verbinden von Business-Bedarf und technischer Umsetzung",
        },
      ],
      capabilities: [
        "Architektur-Reviews und Implementierungsplanung",
        "Bewertung technischer Umsetzbarkeit und Delivery-Risiken",
        "Unterstützung bei Produkt-, Tooling- und Anbieterentscheidungen",
        "Übersetzung von Geschäftszielen in praktikable Entscheidungen",
        "Hands-on-Umsetzung fokussierter Software-Lösungen",
      ],
    },
    contact: {
      title: "Kostenloses Erstgespräch",
      description:
        "Starten Sie mit einem kurzen Gespräch über das Problem, die anstehende Entscheidung und die Frage, ob Beratung, Umsetzung oder beides gebraucht wird. Wenn Sie lieber per E-Mail starten, schreiben Sie direkt.",
      email: contactEmail,
    },
    blog: {
      featuredLabel: "Hervorgehobener Beitrag",
      latestLabel: "Neuester Beitrag",
      archiveLabel: "Beitragsarchiv",
      readArticleLabel: "Beitrag lesen",
      browseAllLabel: "Zum Blog",
      backToBlogLabel: "Zurück zum Blog",
      relatedPostsLabel: "Weiterführende Beiträge",
    },
    ...shared,
  },
} as const satisfies Record<SiteLocale, SiteContent>;

const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
).replace(/\/$/, "");

export function getSiteContent(locale: SiteLocale): SiteContent {
  return siteContent[locale];
}

export function getSiteMetadata(locale: SiteLocale): Metadata {
  const content = getSiteContent(locale);

  return {
    title: content.metadata.title,
    description: content.metadata.description,
    alternates: {
      canonical: content.path,
      languages: {
        en: "/",
        de: "/de",
      },
    },
    openGraph: {
      title: content.metadata.openGraphTitle,
      description: content.metadata.openGraphDescription,
      url: content.path === "/" ? siteUrl : `${siteUrl}${content.path}`,
      siteName: content.metadata.siteName,
      type: "website",
      locale: locale === "de" ? "de_DE" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: content.metadata.openGraphTitle,
      description: content.metadata.openGraphDescription,
    },
  };
}

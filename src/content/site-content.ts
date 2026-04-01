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
      { label: "Process", href: "#process" },
      { label: "About", href: "#about" },
      { label: "Insights", href: "#insights" },
      { label: "Contact", href: "#contact" },
    ],
    cta: {
      bookConsultation: "Book a free consultation",
      emailRobin: "Email Robin",
      sendEmail: "Send an email",
    },
    languageSwitch: {
      label: "DE",
      href: "/de",
      ariaLabel: "Switch to the German version",
    },
    footerTagline: "Clear systems. Faster decisions.",
    hero: {
      eyebrow: "Technical advisory",
      headline: "IT consulting with a path to implementation.",
      description:
        "Helping companies and founders make better technical decisions, define a workable solution, and implement the right software when hands-on execution is needed.",
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
        title: "Recent articles that keep the site active and searchable",
        description:
          "The blog now works as a publishing surface for practical consulting notes, architecture guidance, and delivery insights that can compound discoverability over time.",
      },
      services: {
        eyebrow: "Services",
        title: "Practical help for technical decisions that need to move forward",
        description:
          "The offer is positioned as fast, outcome-focused advisory rather than long, abstract consulting cycles.",
        pageLinkLabel: "To concrete services",
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
          "Independent consulting for founders and lean teams that need sound engineering judgment, plain communication, and hands-on support when the next step should be built.",
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
        eyebrow: "Strategy",
        title: "Architecture and stack decisions",
        description:
          "Pressure-test technical options before you commit, so platform, tooling, and system design choices match the actual business need.",
      },
      {
        eyebrow: "Planning",
        title: "Scoping and delivery planning",
        description:
          "Turn broad requirements into a workable plan with clear priorities, realistic scope, and sensible tradeoffs for delivery.",
      },
      {
        eyebrow: "Implementation",
        title: "Software solutions for focused use cases",
        description:
          "When the solution is clear, Robin can also implement selected software components, internal tools, automations, or product features without turning the engagement into a large agency process.",
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
        "The consulting offer is backed by formal training in business informatics and several years of hands-on software delivery in a professional environment.",
      timeline: [
        {
          period: "2019-2022",
          title: "B.Sc. in Business Informatics",
          institution: "University of Mannheim",
          description:
            "Built the academic foundation across software, information systems, and business context that informs how technical decisions are framed.",
        },
        {
          period: "2022-2026",
          title: "M.Sc. in Business Informatics",
          institution: "Karlsruhe Institute of Technology (KIT)",
          description:
            "Deepened the ability to analyze complex requirements and translate them into structured, workable technical solutions.",
        },
        {
          period: "Since 2022",
          title: "Application development at Omikron Data Solutions GmbH",
          institution: "Professional software delivery",
          description:
            "Built several applications in an active delivery environment, with direct exposure to implementation, iteration, and product-oriented engineering work.",
        },
      ],
      highlights: [
        {
          value: "2019-2026",
          label: "Continuous formal training in business informatics",
        },
        {
          value: "Since 2022",
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
      { label: "Vorgehen", href: "#process" },
      { label: "Über mich", href: "#about" },
      { label: "Blog", href: "#insights" },
      { label: "Kontakt", href: "#contact" },
    ],
    cta: {
      bookConsultation: "Kostenloses Erstgespräch buchen",
      emailRobin: "Robin schreiben",
      sendEmail: "E-Mail senden",
    },
    languageSwitch: {
      label: "EN",
      href: "/",
      ariaLabel: "Zur englischen Version wechseln",
    },
    footerTagline: "Klare Systeme. Schnellere Entscheidungen.",
    hero: {
      eyebrow: "IT-Beratung",
      headline: "IT-Beratung mit klarem Weg in die Umsetzung.",
      description:
        "Unternehmen und Unternehmern wird dabei geholfen, gute IT-Entscheidungen zu treffen, eine tragfähige Lösung zu definieren und die richtige Software umzusetzen, wenn praktische Umsetzung gefragt ist.",
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
        title: "Neue Beiträge, die Sichtbarkeit und Relevanz aufbauen",
        description:
          "Der Blog dient jetzt als Publishing-Fläche für praxisnahe Inhalte zu Beratung, Architektur und Delivery, die über die Zeit neue Suchanfragen adressieren können.",
      },
      services: {
        eyebrow: "Leistungen",
        title:
          "Konkrete Unterstützung für IT-Systeme in Ihrem Unternehmen, die helfen Ihre Potenziale zu heben",
        description:
          "Das Angebot ist als schnelle, ergebnisorientierte Beratung angelegt und nicht als langer, abstrakter Beratungsprozess.",
        pageLinkLabel: "Zu den konkreten Leistungen",
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
          "Unabhängige Beratung für Gründer und schlanke Teams, die fundiertes Engineering-Urteilsvermögen, klare Kommunikation und praktische Unterstützung brauchen, wenn der nächste Schritt gebaut werden soll.",
        imageAlt: "Porträt von Robin Keim",
        timelineLabel: "Ausbildung und Erfahrung",
        credibilityLabel: "Highlights",
        capabilitiesTitle: "Stärken",
      },
      contact: {
        eyebrow: "Kontakt",
        title: "Call buchen oder per E-Mail ins Gespräch kommen",
        description:
          "Die primäre Anlaufstelle ist ein Erstgespräch, aber gerne senden Sie mir auch eine E-Mail bei Fragen.",
      },
    },
    services: [
      {
        eyebrow: "Strategie",
        title: "Architektur- und Stack-Entscheidungen",
        description:
          "Technische Optionen werden vor einer Festlegung auf Umsetzbarkeit geprüft, damit Plattform, Tooling und Systemdesign zum tatsächlichen Geschäftsbedarf passen.",
      },
      {
        eyebrow: "Planung",
        title: "Scoping und Umsetzungsplanung",
        description:
          "Breite Anforderungen werden in einen klar strukturierten Plan mit klaren Prioritäten, realistischem Scope und sinnvollen Trade-offs für die Delivery umgesetzt.",
      },
      {
        eyebrow: "Umsetzung",
        title: "Software-Lösungen für klar umrissene Anwendungsfälle",
        description:
          "Wenn wir gemeinsam die Lösung gefunden haben, können ausgewählte Software-Bausteine, interne Tools, Automatisierungen oder Produktfunktionen umgesetzt werden, ohne dass daraus ein großer Agenturprozess wird.",
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
        "Das Beratungsangebot wird durch formale Ausbildung in Wirtschaftsinformatik und mehrere Jahre praktischer Software-Entwicklung im professionellen Umfeld gestützt.",
      timeline: [
        {
          period: "2019-2022",
          title: "B.Sc. Wirtschaftsinformatik",
          institution: "Universität Mannheim",
          description:
            "Hier entstand das akademische Fundament über Software, Informationssysteme und betriebswirtschaftlichen Kontext, das die Einordnung technischer Entscheidungen bis heute prägt.",
        },
        {
          period: "2022-2026",
          title: "M.Sc. Wirtschaftsinformatik",
          institution: "Karlsruher Institut für Technologie (KIT)",
          description:
            "Dort wurde die Fähigkeit vertieft, komplexe Anforderungen zu analysieren und in strukturierte, tragfähige technische Lösungen zu übersetzen.",
        },
        {
          period: "Seit 2022",
          title: "Anwendungsentwicklung bei Omikron Data Solutions GmbH",
          institution: "Professionelle Software-Entwicklung",
          description:
            "Mehrere Anwendungen wurden in einem aktiven Delivery-Umfeld gebaut, mit direktem Bezug zu Implementierung, Iteration und produktnaher Engineering-Arbeit.",
        },
      ],
      highlights: [
        {
          value: "2019-2026",
          label: "Durchgehendes Studium einer Kombination aus Wirtschaft und Informatik",
        },
        {
          value: "Seit 2022",
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

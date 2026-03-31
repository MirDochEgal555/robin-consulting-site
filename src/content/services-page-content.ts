import type { SiteLocale } from "@/content/site-content";

type ServiceOffering = {
  eyebrow: string;
  title: string;
  description: string;
  outcomes: string[];
};

type ServicesPageContent = {
  section: {
    eyebrow: string;
    title: string;
    description: string;
  };
  offerings: ServiceOffering[];
};

const servicesPageContent = {
  en: {
    section: {
      eyebrow: "Service overview",
      title: "AI, automation, and websites that create practical business leverage.",
      description:
        "The focus is not technology for its own sake. Each service is designed to help a business save time, improve quality, or strengthen how it presents itself online.",
    },
    offerings: [
      {
        eyebrow: "AI",
        title: "AI consulting",
        description:
          "Clarify how AI can be used inside your company in a way that supports real workflows instead of becoming a distracting experiment.",
        outcomes: [
          "Find realistic AI use cases tied to current business processes",
          "Prioritize where AI can improve speed, quality, or decision support",
          "Choose a practical rollout path with manageable complexity",
        ],
      },
      {
        eyebrow: "Automation",
        title: "Task automation",
        description:
          "Reduce manual work by automating repeatable tasks across operations, communication, reporting, and routine internal processes.",
        outcomes: [
          "Remove repetitive admin work from day-to-day operations",
          "Connect tools and move information without manual copying",
          "Save time while reducing avoidable mistakes and delays",
        ],
      },
      {
        eyebrow: "Web",
        title: "Create and host websites",
        description:
          "Build a business website that communicates your offer clearly, performs well, and is hosted reliably without creating extra operational overhead.",
        outcomes: [
          "Launch a professional online presence for your business",
          "Get a fast, maintainable website built around clear messaging",
          "Keep build and hosting responsibility in one place",
        ],
      },
    ],
  },
  de: {
    section: {
      eyebrow: "Leistungsueberblick",
      title: "KI, Automatisierung und Websites mit praktischem Nutzen fuer Unternehmen.",
      description:
        "Im Mittelpunkt steht nicht Technik um der Technik willen. Jede Leistung soll dabei helfen, Zeit zu sparen, die Qualitaet zu verbessern oder den digitalen Auftritt des Unternehmens zu staerken.",
    },
    offerings: [
      {
        eyebrow: "KI",
        title: "KI-Beratung",
        description:
          "Gemeinsam wird geklaert, wie KI in Ihrem Unternehmen sinnvoll eingesetzt werden kann, damit echte Arbeitsablaeufe unterstuetzt werden statt nur neue Komplexitaet zu entstehen.",
        outcomes: [
          "Sinnvolle KI-Anwendungsfaelle im aktuellen Geschaeft identifizieren",
          "Bereiche priorisieren, in denen KI Tempo, Qualitaet oder Entscheidungen verbessert",
          "Einen pragmatischen Einfuehrungsweg mit ueberschaubarer Komplexitaet festlegen",
        ],
      },
      {
        eyebrow: "Automatisierung",
        title: "Aufgaben automatisieren",
        description:
          "Wiederkehrende manuelle Arbeit in Ablaeufen, Kommunikation, Reporting und internen Prozessen wird durch saubere Automatisierungen ersetzt.",
        outcomes: [
          "Repetitive Verwaltungsarbeit im Alltag reduzieren",
          "Tools verbinden und Informationen ohne manuelles Kopieren bewegen",
          "Zeit sparen und vermeidbare Fehler sowie Verzoegerungen reduzieren",
        ],
      },
      {
        eyebrow: "Web",
        title: "Websites erstellen und hosten",
        description:
          "Es wird eine Unternehmenswebsite aufgebaut, die Ihr Angebot klar praesentiert, gut funktioniert und verlaesslich gehostet wird, ohne unnoetigen Betriebsaufwand zu erzeugen.",
        outcomes: [
          "Einen professionellen digitalen Auftritt fuer Ihr Unternehmen aufbauen",
          "Eine schnelle und wartbare Website mit klarer Kommunikation erhalten",
          "Erstellung und Hosting an einer Stelle zusammenfassen",
        ],
      },
    ],
  },
} as const satisfies Record<SiteLocale, ServicesPageContent>;

export function getServicesPageContent(locale: SiteLocale): ServicesPageContent {
  return servicesPageContent[locale];
}

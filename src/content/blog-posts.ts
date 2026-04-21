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
    id: "from-chaos-to-system",
    featured: true,
    publishedAt: "2026-05-25",
    updatedAt: "2026-05-25",
    readingTimeMinutes: 5,
    locales: {
      en: {
        slug: "from-chaos-to-system-business",
        title: "From Chaos to System: What a Well-Structured Business Actually Looks Like",
        excerpt:
          "Most businesses operate in chaos without realizing it. Here’s what a well-structured system actually looks like.",
        seoDescription:
          "Learn what a well-structured business system looks like and how to move from chaos to efficiency.",
        category: "Business Systems",
        tags: ["Systems", "Efficiency", "Automation", "Business"],
        sections: [
          {
            title: "Introduction",
            paragraphs: [
              "Most businesses don’t think they are chaotic.",
              "But when you look closely, you often find scattered tools, manual work, and unclear processes.",
              "If this sounds familiar, start here: /en/blog/hidden-cost-of-manual-work",
            ],
          },
          {
            title: "What Chaos Actually Looks Like",
            paragraphs: [
              "Chaos is not obvious — it’s subtle.",
            ],
            bullets: [
              "Data spread across tools",
              "Manual workflows",
              "Repeated questions",
              "No clear processes",
            ],
          },
          {
            title: "Why This Happens",
            paragraphs: [
              "Most systems evolve over time.",
              "They are built step by step without a clear structure.",
            ],
          },
          {
            title: "What a Good System Looks Like",
            paragraphs: [
              "A good system feels simple — even if it’s powerful.",
            ],
            bullets: [
              "Clear workflows",
              "Connected tools",
              "Minimal manual work",
              "Transparent data",
            ],
          },
          {
            title: "The Key Difference",
            paragraphs: [
              "Chaotic systems react.",
              "Good systems guide and automate.",
            ],
          },
          {
            title: "Where Automation & AI Fit",
            paragraphs: [
              "Automation removes repetitive work.",
              "AI enhances decision-making and workflows.",
              "Examples: /en/blog/ai-use-cases-every-business-should-use",
            ],
          },
          {
            title: "How You Get There",
            paragraphs: [
              "You don’t rebuild everything.",
              "You improve step by step.",
              "Start by identifying opportunities: /en/blog/identify-automation-opportunities-business",
            ],
          },
          {
            title: "Why Structure Creates Growth",
            paragraphs: [
              "Structured systems scale.",
              "Chaos does not.",
            ],
          },
          {
            title: "Final Thoughts",
            paragraphs: [
              "The goal is not perfection.",
              "The goal is clarity and efficiency.",
            ],
          },
          {
            title: "Get Started",
            paragraphs: [
              "If your business feels messy, that’s normal.",
              "Let’s turn it into a system that works.",
            ],
          },
        ],
      },

      de: {
        slug: "von-chaos-zu-system",
        title: "Von Chaos zu System: Wie ein gut strukturiertes Unternehmen wirklich aussieht",
        excerpt:
          "Viele Unternehmen arbeiten im Chaos, ohne es zu merken. So sieht ein gutes System wirklich aus.",
        seoDescription:
          "Erfahre, wie strukturierte Systeme aussehen und wie du dein Unternehmen effizienter machst.",
        category: "Systeme",
        tags: ["Systeme", "Effizienz", "Automatisierung", "Business"],
        sections: [
          {
            title: "Einleitung",
            paragraphs: [
              "Viele Unternehmen merken gar nicht, wie chaotisch ihre Abläufe sind.",
              "Wenn Prozesse ineffizient wirken, lies auch: /de/blog/versteckte-kosten-manuelle-arbeit",
            ],
          },
          {
            title: "Wie Chaos aussieht",
            paragraphs: [
              "Chaos ist oft subtil.",
            ],
            bullets: [
              "Verteilte Daten",
              "Manuelle Arbeit",
              "Unklare Prozesse",
              "Wiederkehrende Fragen",
            ],
          },
          {
            title: "Warum das passiert",
            paragraphs: [
              "Systeme entstehen oft ohne Planung.",
            ],
          },
          {
            title: "Wie gute Systeme aussehen",
            paragraphs: [
              "Gute Systeme sind klar und effizient.",
            ],
            bullets: [
              "Klare Abläufe",
              "Verbundene Tools",
              "Wenig manuelle Arbeit",
              "Transparente Daten",
            ],
          },
          {
            title: "Der Unterschied",
            paragraphs: [
              "Chaos reagiert.",
              "Systeme steuern.",
            ],
          },
          {
            title: "Automatisierung & KI",
            paragraphs: [
              "Sie verbessern Prozesse deutlich.",
              "Beispiele: /de/blog/ki-anwendungsfaelle-unternehmen",
            ],
          },
          {
            title: "Der Weg dahin",
            paragraphs: [
              "Schrittweise verbessern.",
              "Start hier: /de/blog/automatisierungspotenziale-erkennen",
            ],
          },
          {
            title: "Fazit",
            paragraphs: [
              "Struktur ermöglicht Wachstum.",
            ],
          },
          {
            title: "Start",
            paragraphs: [
              "Wenn dein System nicht optimal ist, lass es uns verbessern.",
            ],
          },
        ],
      },
    },
  },
  {
    id: "no-code-vs-custom",
    featured: true,
    publishedAt: "2026-05-18",
    updatedAt: "2026-05-18",
    readingTimeMinutes: 6,
    locales: {
      en: {
        slug: "no-code-vs-custom-development",
        title: "No-Code vs Custom Development: What’s Actually Right for Your Business?",
        excerpt:
          "No-code tools are powerful — but not always the right solution. Here’s how to decide between no-code and custom development.",
        seoDescription:
          "Learn when to use no-code tools vs custom development and how to choose the right approach for your business.",
        category: "IT Strategy",
        tags: ["No-Code", "Custom Development", "Automation", "Business"],
        sections: [
          {
            title: "Introduction",
            paragraphs: [
              "No-code tools are everywhere — and they’re powerful.",
              "You can build workflows, apps, and systems without writing code.",
              "But the real question is: are they the right solution for your business?",
            ],
          },
          {
            title: "What No-Code Is Great At",
            paragraphs: [
              "No-code tools are perfect for getting started quickly.",
            ],
            bullets: [
              "Fast setup",
              "Low cost",
              "No technical barrier",
              "Great for simple workflows",
            ],
          },
          {
            title: "Where No-Code Breaks",
            paragraphs: [
              "At some point, limitations appear.",
              "This is where friction starts to build.",
            ],
            bullets: [
              "Limited flexibility",
              "Difficult integrations",
              "Performance issues",
              "Scaling problems",
            ],
          },
          {
            title: "When Custom Development Makes Sense",
            paragraphs: [
              "Custom solutions are not about complexity — they’re about fit.",
              "They become valuable when your business outgrows standard tools.",
              "This is closely related to the broader decision: /en/blog/build-vs-buy-custom-software",
            ],
          },
          {
            title: "The Hybrid Approach",
            paragraphs: [
              "The best solution is rarely one or the other.",
              "You use no-code where it works — and extend it with custom logic where needed.",
              "This is how modern systems are built in practice: /en/blog/what-i-actually-do-as-an-it-consultant",
            ],
          },
          {
            title: "Where AI Changes the Game",
            paragraphs: [
              "AI makes both approaches more powerful.",
              "It allows smarter workflows and better automation.",
              "For real examples: /en/blog/ai-use-cases-every-business-should-use",
            ],
          },
          {
            title: "A Simple Decision Framework",
            paragraphs: [
              "If your setup feels simple — use no-code.",
              "If your business feels constrained — go custom.",
            ],
            bullets: [
              "Start simple",
              "Watch for friction",
              "Upgrade when needed",
            ],
          },
          {
            title: "Final Thoughts",
            paragraphs: [
              "No-code is not a replacement for custom development.",
              "It’s a starting point.",
              "The goal is always the same: efficient, scalable systems.",
            ],
          },
          {
            title: "Get Started",
            paragraphs: [
              "If you’re unsure which path is right, that’s completely normal.",
              "Let’s figure out what makes the most sense for your business.",
            ],
          },
        ],
      },

      de: {
        slug: "no-code-vs-custom-entwicklung",
        title: "No-Code vs individuelle Entwicklung: Was passt wirklich zu deinem Business?",
        excerpt:
          "No-Code ist stark — aber nicht immer die richtige Lösung. So triffst du die richtige Entscheidung.",
        seoDescription:
          "Erfahre, wann No-Code sinnvoll ist und wann individuelle Entwicklung besser passt.",
        category: "IT-Strategie",
        tags: ["No-Code", "Software", "Automatisierung", "Business"],
        sections: [
          {
            title: "Einleitung",
            paragraphs: [
              "No-Code Tools sind überall — und sie sind leistungsfähig.",
              "Doch die entscheidende Frage ist: passen sie wirklich zu deinem Unternehmen?",
            ],
          },
          {
            title: "Stärken von No-Code",
            paragraphs: [
              "No-Code eignet sich perfekt für den Einstieg.",
            ],
            bullets: [
              "Schnelle Umsetzung",
              "Geringe Kosten",
              "Einfache Nutzung",
              "Ideal für einfache Prozesse",
            ],
          },
          {
            title: "Grenzen von No-Code",
            paragraphs: [
              "Mit der Zeit zeigen sich Einschränkungen.",
            ],
            bullets: [
              "Wenig Flexibilität",
              "Schwierige Integration",
              "Performance-Probleme",
              "Skalierungsgrenzen",
            ],
          },
          {
            title: "Wann individuelle Lösungen sinnvoll sind",
            paragraphs: [
              "Individuelle Entwicklung lohnt sich, wenn Standardlösungen nicht mehr passen.",
              "Mehr dazu: /de/blog/build-vs-buy-software",
            ],
          },
          {
            title: "Die Kombination",
            paragraphs: [
              "Die beste Lösung ist oft eine Mischung.",
              "So entstehen moderne Systeme: /de/blog/was-ich-als-it-consultant-eigentlich-mache",
            ],
          },
          {
            title: "KI als Verstärker",
            paragraphs: [
              "KI macht beide Ansätze leistungsfähiger.",
              "Beispiele: /de/blog/ki-anwendungsfaelle-unternehmen",
            ],
          },
          {
            title: "Entscheidungsregel",
            paragraphs: [
              "Einfach starten — und bei Bedarf erweitern.",
            ],
            bullets: [
              "Mit Tools starten",
              "Engpässe erkennen",
              "Gezielt erweitern",
            ],
          },
          {
            title: "Fazit",
            paragraphs: [
              "No-Code ist ein Einstieg, keine Endlösung.",
              "Ziel sind skalierbare Systeme.",
            ],
          },
          {
            title: "Start",
            paragraphs: [
              "Wenn du unsicher bist, welche Lösung passt, lass uns das gemeinsam anschauen.",
            ],
          },
        ],
      },
    },
  },
  {
    id: "rag-ai-explained",
    featured: true,
    publishedAt: "2026-05-11",
    updatedAt: "2026-05-11",
    readingTimeMinutes: 6,
    locales: {
      en: {
        slug: "what-is-rag-ai-explained",
        title: "RAG: The Missing Piece That Makes AI Actually Useful",
        excerpt:
          "Most AI tools fail in real business use. RAG (Retrieval-Augmented Generation) is what makes AI accurate, reliable, and actually useful.",
        seoDescription:
          "Learn what RAG (Retrieval-Augmented Generation) is and how it makes AI systems more accurate, reliable, and useful for businesses.",
        category: "AI",
        tags: ["AI", "RAG", "Automation", "Knowledge Systems"],
        sections: [
          {
            title: "Introduction",
            paragraphs: [
              "AI is impressive — but in real business use, it often falls short.",
              "It sounds confident, but gives wrong answers. It doesn’t know your data. It can’t access your internal knowledge.",
              "This is exactly where most AI projects fail.",
              "And this is exactly where RAG comes in.",
            ],
          },
          {
            title: "The Problem with “Standard AI”",
            paragraphs: [
              "Most AI systems work based on general training data.",
              "They are powerful — but they don’t know your business.",
            ],
            bullets: [
              "No access to internal documents",
              "No real-time data",
              "Limited accuracy in specific contexts",
              "Risk of hallucinations",
            ],
          },
          {
            title: "What RAG Actually Does",
            paragraphs: [
              "RAG stands for Retrieval-Augmented Generation.",
              "Instead of relying only on what the model “knows”, it actively retrieves relevant information and uses it to generate answers.",
              "In simple terms:",
              "👉 AI + your data = useful AI",
            ],
          },
          {
            title: "Why This Changes Everything",
            paragraphs: [
              "With RAG, AI becomes context-aware.",
              "It doesn’t just generate — it understands based on your actual information.",
            ],
            bullets: [
              "Answers based on your documents",
              "Up-to-date information",
              "Higher accuracy",
              "More trust in results",
            ],
          },
          {
            title: "Real Business Use Cases",
            paragraphs: [
              "RAG is not theoretical — it solves very real problems.",
            ],
            bullets: [
              "Internal knowledge assistants",
              "Customer support systems",
              "Document search and analysis",
              "Onboarding and training tools",
            ],
          },
          {
            title: "How This Fits into Modern Systems",
            paragraphs: [
              "RAG is often part of a bigger system.",
              "It connects data, workflows, and user interaction into one intelligent layer.",
              "If you want to see how AI fits into modern digital systems overall: /en/blog/how-ai-is-changing-websites",
            ],
          },
          {
            title: "Why Most Businesses Don’t Use It Yet",
            paragraphs: [
              "Despite its power, many companies are not using RAG yet.",
            ],
            bullets: [
              "Lack of understanding",
              "Unclear implementation path",
              "Focus on tools instead of systems",
            ],
          },
          {
            title: "Where It Creates the Most Value",
            paragraphs: [
              "RAG shines where knowledge matters.",
              "The more information your business has, the more powerful it becomes.",
              "If you’re looking for practical AI applications, this article is a good next step: /en/blog/ai-use-cases-every-business-should-use",
            ],
          },
          {
            title: "From Idea to Implementation",
            paragraphs: [
              "RAG is not just a feature — it’s part of a system design.",
              "You need the right data structure, workflows, and integration.",
              "This is exactly where structured consulting helps: /en/blog/what-i-actually-do-as-an-it-consultant",
            ],
          },
          {
            title: "Final Thoughts",
            paragraphs: [
              "AI without context is impressive — but limited.",
              "AI with context becomes truly useful.",
              "RAG is the bridge between the two.",
            ],
          },
          {
            title: "Get Started",
            paragraphs: [
              "If you’re thinking about using AI with your own data, RAG is probably the right approach.",
              "Let’s explore how it could work in your business.",
            ],
          },
        ],
      },

      de: {
        slug: "rag-ki-erklaert",
        title: "RAG: Das fehlende Puzzlestück für wirklich nützliche KI",
        excerpt:
          "Viele KI-Anwendungen scheitern im Alltag. RAG macht KI präzise, zuverlässig und wirklich nutzbar.",
        seoDescription:
          "Erfahre, was RAG (Retrieval-Augmented Generation) ist und wie es KI-Systeme für Unternehmen deutlich verbessert.",
        category: "KI",
        tags: ["KI", "RAG", "Automatisierung", "Wissenssysteme"],
        sections: [
          {
            title: "Einleitung",
            paragraphs: [
              "KI ist beeindruckend — aber im echten Einsatz oft unzuverlässig.",
              "Sie klingt überzeugend, liegt aber manchmal falsch.",
              "Das liegt daran, dass sie dein Unternehmen nicht kennt.",
              "Genau hier kommt RAG ins Spiel.",
            ],
          },
          {
            title: "Das Problem klassischer KI",
            paragraphs: [
              "Die meisten Modelle arbeiten mit allgemeinem Wissen.",
              "Sie haben keinen Zugriff auf deine Daten.",
            ],
            bullets: [
              "Keine internen Informationen",
              "Keine aktuellen Daten",
              "Begrenzte Genauigkeit",
              "Fehleranfällige Antworten",
            ],
          },
          {
            title: "Was RAG macht",
            paragraphs: [
              "RAG steht für Retrieval-Augmented Generation.",
              "Das System holt sich gezielt Informationen und nutzt sie für Antworten.",
              "Einfach gesagt:",
              "👉 KI + deine Daten = echte Lösungen",
            ],
          },
          {
            title: "Warum das entscheidend ist",
            paragraphs: [
              "Mit RAG wird KI kontextbezogen.",
              "Sie arbeitet mit echten Informationen statt Annahmen.",
            ],
            bullets: [
              "Antworten auf Basis deiner Daten",
              "Aktuelle Informationen",
              "Höhere Genauigkeit",
              "Mehr Vertrauen",
            ],
          },
          {
            title: "Praxisbeispiele",
            paragraphs: [
              "RAG löst konkrete Probleme im Unternehmen.",
            ],
            bullets: [
              "Interne Wissenssysteme",
              "Support-Systeme",
              "Dokumentensuche",
              "Onboarding-Tools",
            ],
          },
          {
            title: "Einordnung",
            paragraphs: [
              "RAG ist Teil moderner Systeme.",
              "Es verbindet Daten, Prozesse und Interaktion.",
              "Mehr dazu: /de/blog/wie-ki-websites-veraendert",
            ],
          },
          {
            title: "Warum es noch selten ist",
            paragraphs: [
              "Viele Unternehmen nutzen RAG noch nicht.",
            ],
            bullets: [
              "Zu wenig Wissen",
              "Unklare Umsetzung",
              "Fokus auf Tools statt Systeme",
            ],
          },
          {
            title: "Wo es den größten Nutzen bringt",
            paragraphs: [
              "Besonders dort, wo viel Wissen vorhanden ist.",
              "Weitere Anwendungsfälle: /de/blog/ki-anwendungsfaelle-unternehmen",
            ],
          },
          {
            title: "Umsetzung",
            paragraphs: [
              "RAG braucht eine saubere Systemstruktur.",
              "Hier kommt IT-Consulting ins Spiel: /de/blog/was-ich-als-it-consultant-eigentlich-mache",
            ],
          },
          {
            title: "Fazit",
            paragraphs: [
              "KI ohne Kontext ist begrenzt.",
              "KI mit Kontext ist wirklich nützlich.",
              "RAG verbindet beides.",
            ],
          },
          {
            title: "Start",
            paragraphs: [
              "Wenn du KI mit deinen Daten nutzen willst, ist RAG ein sinnvoller Ansatz.",
              "Lass uns schauen, wie das für dein Unternehmen aussehen kann.",
            ],
          },
        ],
      },
    },
  },
  {
    id: "identify-automation-opportunities",
    featured: true,
    publishedAt: "2026-05-04",
    updatedAt: "2026-05-04",
    readingTimeMinutes: 6,
    locales: {
      en: {
        slug: "identify-automation-opportunities-business",
        title: "How to Identify Automation Opportunities in Your Business",
        excerpt:
          "Not sure where to start with automation? Here’s a simple, practical framework to identify the biggest opportunities in your business.",
        seoDescription:
          "Learn how to identify automation opportunities in your business and improve efficiency with practical steps and real examples.",
        category: "Automation",
        tags: ["Automation", "AI", "Efficiency", "Workflows"],
        sections: [
          {
            title: "Introduction",
            paragraphs: [
              "Most businesses know they should automate — but they don’t know where to start.",
              "The problem is not a lack of tools. It’s a lack of clarity.",
              "If you’ve already noticed inefficiencies, this article might sound familiar: /en/blog/hidden-cost-of-manual-work",
            ],
          },
          {
            title: "Why Automation Feels Hard",
            paragraphs: [
              "Automation often feels like a big technical project.",
              "But in reality, most opportunities are simple — once you know where to look.",
            ],
            bullets: [
              "Processes are not clearly documented",
              "Workflows evolved over time",
              "Inefficiencies feel “normal”",
            ],
          },
          {
            title: "Step 1: Look for Repetition",
            paragraphs: [
              "Repetition is the clearest signal for automation.",
              "If something happens frequently, it’s a strong candidate.",
            ],
            bullets: [
              "Daily tasks",
              "Weekly reports",
              "Recurring emails",
              "Data transfers between tools",
            ],
          },
          {
            title: "Step 2: Identify Manual Work",
            paragraphs: [
              "Any task that requires copying, pasting, or moving data manually is a red flag.",
              "These processes are slow, error-prone, and unnecessary.",
            ],
          },
          {
            title: "Step 3: Find Bottlenecks",
            paragraphs: [
              "Look at where work slows down.",
              "These points often reveal the biggest opportunities.",
            ],
            bullets: [
              "Waiting for approvals",
              "Missing information",
              "Too many handoffs",
            ],
          },
          {
            title: "Step 4: Check for Tool Gaps",
            paragraphs: [
              "Many inefficiencies come from tools that don’t work well together.",
              "Instead of replacing everything, connecting systems is often enough.",
              "This is where smart system design matters: /blog/build-vs-buy-custom-software",
            ],
          },
          {
            title: "Step 5: Prioritize Impact",
            paragraphs: [
              "Not every automation is worth it.",
              "Focus on what creates the biggest impact first.",
            ],
            bullets: [
              "Time saved",
              "Error reduction",
              "Process speed",
              "Scalability",
            ],
          },
          {
            title: "Where AI Fits In",
            paragraphs: [
              "AI expands what can be automated.",
              "It enables systems to handle more complex tasks.",
              "For real examples, see: /blog/ai-use-cases-every-business-should-use",
            ],
          },
          {
            title: "From Opportunity to Implementation",
            paragraphs: [
              "Identifying opportunities is only the first step.",
              "The real value comes from turning them into working systems.",
              "If you want to understand how this works in practice: /blog/what-i-actually-do-as-an-it-consultant",
            ],
          },
          {
            title: "Final Thoughts",
            paragraphs: [
              "Automation is not about replacing everything.",
              "It’s about removing unnecessary work and improving how your business operates.",
              "Once you start looking, you’ll see opportunities everywhere.",
            ],
          },
          {
            title: "Get Started",
            paragraphs: [
              "If you’re unsure where your biggest opportunities are, that’s completely normal.",
              "Let’s identify them together and turn them into real improvements.",
            ],
          },
        ],
      },

      de: {
        slug: "automatisierungspotenziale-erkennen",
        title: "Wie du Automatisierungspotenziale in deinem Unternehmen erkennst",
        excerpt:
          "Du willst automatisieren, weißt aber nicht wo anfangen? Hier ist ein einfacher Leitfaden für die größten Hebel in deinem Business.",
        seoDescription:
          "Erfahre, wie du Automatisierungspotenziale erkennst und dein Unternehmen effizienter machst — mit konkreten Schritten.",
        category: "Automatisierung",
        tags: ["Automatisierung", "KI", "Effizienz", "Prozesse"],
        sections: [
          {
            title: "Einleitung",
            paragraphs: [
              "Viele Unternehmen wissen, dass sie automatisieren sollten — aber nicht, wo sie anfangen sollen.",
              "Das Problem ist nicht die Technik, sondern die fehlende Klarheit.",
              "Wenn dir ineffiziente Prozesse bekannt vorkommen, lies auch: /de/blog/versteckte-kosten-manuelle-arbeit",
            ],
          },
          {
            title: "Warum es schwer wirkt",
            paragraphs: [
              "Automatisierung wirkt oft wie ein großes Projekt.",
              "Dabei sind die meisten Potenziale einfacher als gedacht.",
            ],
            bullets: [
              "Keine klaren Prozesse",
              "Historisch gewachsene Abläufe",
              "Ineffizienzen wirken normal",
            ],
          },
          {
            title: "Schritt 1: Wiederholung erkennen",
            paragraphs: [
              "Alles, was regelmäßig passiert, ist ein Kandidat für Automatisierung.",
            ],
            bullets: [
              "Tägliche Aufgaben",
              "Wöchentliche Reports",
              "Wiederkehrende E-Mails",
              "Datentransfers",
            ],
          },
          {
            title: "Schritt 2: Manuelle Arbeit finden",
            paragraphs: [
              "Kopieren, Einfügen oder manuelle Dateneingabe sind klare Signale.",
              "Diese Prozesse sind langsam und fehleranfällig.",
            ],
          },
          {
            title: "Schritt 3: Engpässe identifizieren",
            paragraphs: [
              "Wo Arbeit stockt, liegen oft große Hebel.",
            ],
            bullets: [
              "Freigaben",
              "Fehlende Informationen",
              "Viele Übergaben",
            ],
          },
          {
            title: "Schritt 4: Tool-Probleme prüfen",
            paragraphs: [
              "Viele Probleme entstehen durch schlecht integrierte Tools.",
              "Oft reicht es, Systeme zu verbinden statt sie zu ersetzen.",
              "Mehr dazu: /de/blog/build-vs-buy-software",
            ],
          },
          {
            title: "Schritt 5: Priorisieren",
            paragraphs: [
              "Nicht alles lohnt sich sofort.",
              "Fokus auf den größten Impact.",
            ],
            bullets: [
              "Zeitersparnis",
              "Fehlerreduktion",
              "Geschwindigkeit",
              "Skalierbarkeit",
            ],
          },
          {
            title: "KI als Verstärker",
            paragraphs: [
              "KI erweitert die Möglichkeiten der Automatisierung.",
              "Sie ermöglicht komplexere Abläufe.",
              "Beispiele: /de/blog/ki-anwendungsfaelle-unternehmen",
            ],
          },
          {
            title: "Von der Idee zur Umsetzung",
            paragraphs: [
              "Erkennen ist nur der erste Schritt.",
              "Der echte Mehrwert entsteht durch Umsetzung.",
              "So funktioniert das in der Praxis: /de/blog/was-ich-als-it-consultant-eigentlich-mache",
            ],
          },
          {
            title: "Fazit",
            paragraphs: [
              "Automatisierung bedeutet nicht, alles zu ersetzen.",
              "Es geht darum, unnötige Arbeit zu eliminieren.",
            ],
          },
          {
            title: "Start",
            paragraphs: [
              "Wenn du unsicher bist, wo deine größten Potenziale liegen, ist das normal.",
              "Lass uns gemeinsam die besten Möglichkeiten identifizieren.",
            ],
          },
        ],
      },
    },
  },
  {
    id: "build-vs-buy-software",
    featured: true,
    publishedAt: "2026-04-27",
    updatedAt: "2026-04-27",
    readingTimeMinutes: 6,
    locales: {
      en: {
        slug: "build-vs-buy-custom-software",
        title: "Build vs Buy: When Custom Software Actually Makes Sense",
        excerpt:
          "Should you build custom software or use existing tools? Here’s a practical guide to making the right decision for your business.",
        seoDescription:
          "Learn when custom software makes sense vs buying existing tools. A practical guide for businesses deciding between build vs buy.",
        category: "IT Strategy",
        tags: ["Custom Software", "Automation", "IT Strategy", "Business"],
        sections: [
          {
            title: "Introduction",
            paragraphs: [
              "One of the most common questions businesses face is simple: should we build something ourselves, or just use an existing tool?",
              "There is no universal answer — but there is a clear way to think about it.",
              "If you're already dealing with inefficient processes, this article might resonate: /blog/hidden-cost-of-manual-work",
            ],
          },
          {
            title: "The Default: Buy First",
            paragraphs: [
              "In most cases, buying an existing solution is the right starting point.",
              "Modern tools are powerful, affordable, and fast to implement.",
            ],
            bullets: [
              "Lower upfront cost",
              "Faster setup",
              "Proven reliability",
              "No maintenance required",
            ],
          },
          {
            title: "Where Buying Breaks Down",
            paragraphs: [
              "At some point, standard tools stop fitting your needs.",
              "This is where friction starts to build inside your business.",
            ],
            bullets: [
              "Too many manual workarounds",
              "Tools don’t integrate properly",
              "Limited flexibility",
              "Scaling becomes difficult",
            ],
          },
          {
            title: "When Custom Software Makes Sense",
            paragraphs: [
              "Custom solutions are not about building everything from scratch.",
              "They are about solving specific problems in the most effective way.",
            ],
            bullets: [
              "Your processes are unique",
              "You rely heavily on manual workflows",
              "Your tools don’t work well together",
              "You are losing time or money due to inefficiencies",
            ],
          },
          {
            title: "The Hybrid Approach (What Actually Works)",
            paragraphs: [
              "The best solution is often not build OR buy — but a combination of both.",
              "You use existing tools where they fit, and build custom layers where needed.",
              "This is how modern systems are designed: /blog/what-i-actually-do-as-an-it-consultant",
            ],
          },
          {
            title: "Where AI Changes the Equation",
            paragraphs: [
              "AI makes custom solutions more powerful and more accessible.",
              "You can now build smarter systems without massive complexity.",
              "To understand the bigger shift, read: /blog/how-ai-is-changing-websites",
            ],
          },
          {
            title: "A Simple Rule of Thumb",
            paragraphs: [
              "Start simple — but don’t stay stuck.",
            ],
            bullets: [
              "Use tools early",
              "Automate where possible",
              "Build when friction becomes expensive",
            ],
          },
          {
            title: "Real-World Example",
            paragraphs: [
              "A business starts with spreadsheets and standard tools.",
              "Over time, manual work increases, processes slow down, and errors appear.",
              "At that point, a custom solution or automation layer creates massive leverage.",
              "For concrete examples, see: /blog/ai-use-cases-every-business-should-use",
            ],
          },
          {
            title: "Final Thoughts",
            paragraphs: [
              "Build vs buy is not a technical decision — it’s a business decision.",
              "The goal is always the same: reduce friction, save time, and create scalable systems.",
            ],
          },
          {
            title: "Get Started",
            paragraphs: [
              "If you’re unsure whether your current setup still makes sense, it’s worth taking a closer look.",
              "Let’s figure out where tools are enough — and where custom solutions create real value.",
            ],
          },
        ],
      },

      de: {
        slug: "build-vs-buy-software",
        title: "Build vs Buy: Wann individuelle Software wirklich sinnvoll ist",
        excerpt:
          "Solltest du Software selbst entwickeln oder bestehende Tools nutzen? Ein praktischer Leitfaden für die richtige Entscheidung.",
        seoDescription:
          "Erfahre, wann individuelle Software sinnvoll ist und wann bestehende Tools ausreichen. Ein Guide für Build vs Buy Entscheidungen.",
        category: "IT-Strategie",
        tags: ["Software", "Automatisierung", "Strategie", "Business"],
        sections: [
          {
            title: "Einleitung",
            paragraphs: [
              "Eine der häufigsten Fragen in Unternehmen ist: selbst entwickeln oder bestehende Tools nutzen?",
              "Eine einfache Antwort gibt es nicht — aber eine klare Entscheidungslogik.",
              "Wenn du bereits ineffiziente Prozesse hast, könnte dieser Artikel relevant sein: /de/blog/versteckte-kosten-manuelle-arbeit",
            ],
          },
          {
            title: "Standard: Erst kaufen",
            paragraphs: [
              "In den meisten Fällen ist es sinnvoll, mit bestehenden Tools zu starten.",
              "Sie sind schnell verfügbar und kostengünstig.",
            ],
            bullets: [
              "Geringe Kosten",
              "Schnelle Umsetzung",
              "Bewährte Lösungen",
              "Kein Wartungsaufwand",
            ],
          },
          {
            title: "Wann Tools an Grenzen kommen",
            paragraphs: [
              "Irgendwann passen Standardlösungen nicht mehr perfekt.",
              "Dann entstehen Reibungsverluste im Alltag.",
            ],
            bullets: [
              "Manuelle Workarounds",
              "Fehlende Integration",
              "Zu wenig Flexibilität",
              "Schlechte Skalierbarkeit",
            ],
          },
          {
            title: "Wann individuelle Lösungen sinnvoll sind",
            paragraphs: [
              "Individuelle Software löst gezielt Probleme.",
            ],
            bullets: [
              "Einzigartige Prozesse",
              "Viele manuelle Aufgaben",
              "Tools arbeiten nicht zusammen",
              "Zeit- oder Geldverlust",
            ],
          },
          {
            title: "Die beste Lösung: Kombination",
            paragraphs: [
              "Die Realität ist meist eine Mischung aus beidem.",
              "Tools + individuelle Erweiterungen führen zum besten Ergebnis.",
              "So entstehen moderne Systeme: /de/blog/was-ich-als-it-consultant-eigentlich-mache",
            ],
          },
          {
            title: "KI verändert alles",
            paragraphs: [
              "KI macht individuelle Lösungen leistungsfähiger und zugänglicher.",
              "Mehr dazu hier: /de/blog/wie-ki-websites-veraendert",
            ],
          },
          {
            title: "Faustregel",
            paragraphs: [
              "Einfach starten — aber nicht stehen bleiben.",
            ],
            bullets: [
              "Tools nutzen",
              "Automatisieren",
              "Bei Bedarf individuell erweitern",
            ],
          },
          {
            title: "Beispiel",
            paragraphs: [
              "Viele starten mit Excel und Standardtools.",
              "Mit Wachstum entstehen Probleme — hier helfen Automatisierung und individuelle Lösungen.",
              "Konkrete Beispiele: /de/blog/ki-anwendungsfaelle-unternehmen",
            ],
          },
          {
            title: "Fazit",
            paragraphs: [
              "Build vs Buy ist eine strategische Entscheidung.",
              "Ziel ist Effizienz und Skalierbarkeit.",
            ],
          },
          {
            title: "Start",
            paragraphs: [
              "Wenn du unsicher bist, ob deine aktuellen Tools noch passen, lohnt sich ein genauer Blick.",
              "Lass uns gemeinsam die beste Lösung finden.",
            ],
          },
        ],
      },
    },
  },
  {
    id: "hidden-cost-manual-work",
    featured: true,
    publishedAt: "2026-04-20",
    updatedAt: "2026-04-20",
    readingTimeMinutes: 6,
    locales: {
      en: {
        slug: "hidden-cost-of-manual-work",
        title: "The Hidden Cost of Manual Work (You’re Losing More Than You Think)",
        excerpt:
          "Manual work feels harmless — but it silently costs your business time, money, and growth. Here’s what it’s really doing to you.",
        seoDescription:
          "Discover the hidden cost of manual work in your business and how automation and AI can save time, reduce errors, and improve efficiency.",
        category: "Business Efficiency",
        tags: ["Automation", "Efficiency", "AI", "Workflows"],
        sections: [
          {
            title: "Introduction",
            paragraphs: [
              "Most businesses don’t realize how much manual work is actually costing them.",
              "It feels normal — copying data, sending emails, updating spreadsheets, repeating the same steps every day.",
              "But over time, these small tasks add up to a massive hidden cost.",
            ],
          },
          {
            title: "The Problem: It Doesn’t Feel Expensive",
            paragraphs: [
              "Manual work is dangerous because it doesn’t look like a problem.",
              "It’s not a big failure — it’s a thousand tiny inefficiencies.",
            ],
            bullets: [
              "“It only takes 5 minutes”",
              "“We’ve always done it this way”",
              "“It’s not worth automating”",
            ],
          },
          {
            title: "The Real Cost of Manual Work",
            paragraphs: [
              "When you zoom out, the impact becomes clear.",
              "Manual work doesn’t just cost time — it affects your entire business.",
            ],
            bullets: [
              "Lost time across the team",
              "Higher error rates",
              "Slower processes",
              "Missed opportunities",
              "Limited scalability",
            ],
          },
          {
            title: "1. Time Loss Compounds Fast",
            paragraphs: [
              "A task that takes 10 minutes per day becomes over 40 hours per year — per person.",
              "Multiply that across a team, and you’re losing weeks of productive time.",
            ],
          },
          {
            title: "2. Errors Are Inevitable",
            paragraphs: [
              "Manual processes are prone to mistakes.",
              "Wrong data, missed steps, or inconsistent execution create problems that often cost more than the task itself.",
            ],
          },
          {
            title: "3. It Slows Down Growth",
            paragraphs: [
              "Manual systems don’t scale.",
              "As your business grows, the workload increases linearly — or worse.",
            ],
          },
          {
            title: "4. It Blocks Better Systems",
            paragraphs: [
              "Manual work often hides the need for better systems.",
              "Instead of fixing the root cause, teams adapt and keep working around inefficiencies.",
            ],
          },
          {
            title: "Where Automation & AI Come In",
            paragraphs: [
              "This is exactly where automation and AI create real value.",
              "Instead of doing tasks manually, systems can handle them faster, more reliably, and at scale.",
              "If you want to see concrete examples, check out: /en/blog/ai-use-cases-every-business-should-use",
            ],
          },
          {
            title: "What a Better System Looks Like",
            paragraphs: [
              "A well-designed system removes unnecessary work and lets your team focus on what actually matters.",
            ],
            bullets: [
              "Automated workflows instead of repetitive tasks",
              "Connected systems instead of isolated tools",
              "Clear processes instead of improvisation",
              "AI support where it makes sense",
            ],
          },
          {
            title: "Why Most Businesses Don’t Fix This",
            paragraphs: [
              "Even when the problem is obvious, many companies don’t act.",
              "Not because they don’t care — but because they don’t know where to start.",
              "This is exactly where structured IT consulting comes in: /en/blog/what-i-actually-do-as-an-it-consultant",
            ],
          },
          {
            title: "Final Thoughts",
            paragraphs: [
              "Manual work is not just inefficient — it’s a hidden growth blocker.",
              "The longer it stays in your business, the more it costs you.",
              "The good news: most of it can be improved quickly once you identify the right opportunities.",
            ],
          },
          {
            title: "Get Started",
            paragraphs: [
              "If you feel like your business is wasting time on repetitive work, you’re probably right.",
              "Let’s identify the biggest inefficiencies and turn them into scalable systems.",
            ],
          },
        ],
      },

      de: {
        slug: "versteckte-kosten-manuelle-arbeit",
        title: "Die versteckten Kosten manueller Arbeit (Du verlierst mehr als du denkst)",
        excerpt:
          "Manuelle Arbeit wirkt harmlos — kostet dein Unternehmen aber Zeit, Geld und Wachstum. Hier ist, was wirklich dahinter steckt.",
        seoDescription:
          "Erfahre, welche versteckten Kosten manuelle Arbeit verursacht und wie Automatisierung und KI dein Unternehmen effizienter machen.",
        category: "Effizienz",
        tags: ["Automatisierung", "Effizienz", "KI", "Prozesse"],
        sections: [
          {
            title: "Einleitung",
            paragraphs: [
              "Viele Unternehmen unterschätzen, wie teuer manuelle Arbeit wirklich ist.",
              "Sie fühlt sich normal an — Daten kopieren, E-Mails schreiben, Tabellen pflegen.",
              "Doch genau diese kleinen Aufgaben summieren sich zu großen Kosten.",
            ],
          },
          {
            title: "Das Problem: Es fühlt sich harmlos an",
            paragraphs: [
              "Manuelle Arbeit ist gefährlich, weil sie nicht wie ein Problem aussieht.",
              "Es sind viele kleine Ineffizienzen statt ein großer Fehler.",
            ],
            bullets: [
              "„Das dauert doch nur kurz“",
              "„Das haben wir schon immer so gemacht“",
              "„Lohnt sich nicht zu automatisieren“",
            ],
          },
          {
            title: "Die echten Kosten",
            paragraphs: [
              "Wenn man das Gesamtbild betrachtet, wird der Effekt deutlich.",
              "Manuelle Arbeit beeinflusst das gesamte Unternehmen.",
            ],
            bullets: [
              "Zeitverlust",
              "Fehleranfälligkeit",
              "Langsame Prozesse",
              "Verpasste Chancen",
              "Keine Skalierbarkeit",
            ],
          },
          {
            title: "1. Zeitverlust",
            paragraphs: [
              "10 Minuten pro Tag werden zu über 40 Stunden im Jahr.",
              "Multipliziert über ein Team entsteht ein enormer Verlust.",
            ],
          },
          {
            title: "2. Fehler",
            paragraphs: [
              "Manuelle Prozesse führen zwangsläufig zu Fehlern.",
              "Diese kosten oft mehr als die eigentliche Aufgabe.",
            ],
          },
          {
            title: "3. Wachstum wird gebremst",
            paragraphs: [
              "Manuelle Systeme skalieren nicht.",
              "Mehr Wachstum bedeutet mehr Aufwand.",
            ],
          },
          {
            title: "4. Schlechte Systeme bleiben bestehen",
            paragraphs: [
              "Manuelle Arbeit kaschiert strukturelle Probleme.",
              "Anstatt sie zu lösen, wird weiter improvisiert.",
            ],
          },
          {
            title: "Automatisierung & KI",
            paragraphs: [
              "Hier kommen Automatisierung und KI ins Spiel.",
              "Sie übernehmen Aufgaben schneller und zuverlässiger.",
              "Konkrete Beispiele findest du hier: /de/blog/ki-anwendungsfaelle-unternehmen",
            ],
          },
          {
            title: "Bessere Systeme",
            paragraphs: [
              "Ein gutes System reduziert unnötige Arbeit und schafft Klarheit.",
            ],
            bullets: [
              "Automatisierte Abläufe",
              "Verbundene Systeme",
              "Klare Prozesse",
              "Sinnvoll eingesetzte KI",
            ],
          },
          {
            title: "Warum viele nichts ändern",
            paragraphs: [
              "Viele Unternehmen wissen, dass etwas nicht optimal läuft.",
              "Aber sie wissen nicht, wo sie anfangen sollen.",
              "Hier hilft strukturiertes IT-Consulting: /de/blog/was-ich-als-it-consultant-eigentlich-mache",
            ],
          },
          {
            title: "Fazit",
            paragraphs: [
              "Manuelle Arbeit ist ein versteckter Wachstumsbremser.",
              "Je länger sie bleibt, desto teurer wird sie.",
            ],
          },
          {
            title: "Start",
            paragraphs: [
              "Wenn du das Gefühl hast, dass viel Zeit verloren geht, lohnt sich ein genauer Blick.",
              "Lass uns gemeinsam die größten Hebel identifizieren.",
            ],
          },
        ],
      },
    },
  },
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

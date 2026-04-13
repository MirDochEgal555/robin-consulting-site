import type { SiteLocale } from "@/content/site-content";

type GithubStat = {
  value: string;
  label: string;
};

type GithubProfile = {
  eyebrow: string;
  title: string;
  description: string;
  profileLabel: string;
  profileHref: string;
  ctaLabel: string;
  stats: GithubStat[];
};

type ProjectSection = {
  eyebrow: string;
  title: string;
  description: string;
  archiveNote: string;
};

type ProjectItem = {
  name: string;
  href: string;
  period: string;
  description: string;
  stack: string[];
  linkLabel: string;
};

type ExperienceSection = {
  eyebrow: string;
  title: string;
  description: string;
};

type ExperienceItem = {
  period: string;
  title: string;
  organization: string;
  description: string;
  points: string[];
};

type KnowledgeSection = {
  eyebrow: string;
  title: string;
  description: string;
};

type KnowledgeArea = {
  title: string;
  description: string;
  topics: string[];
};

export type ProjectsPageContent = {
  github: GithubProfile;
  projectSection: ProjectSection;
  projects: ProjectItem[];
  experienceSection: ExperienceSection;
  experience: ExperienceItem[];
  knowledgeSection: KnowledgeSection;
  knowledgeAreas: KnowledgeArea[];
};

const githubProfileHref = "https://github.com/MirDochEgal555";

const projectsPageContent = {
  en: {
    github: {
      eyebrow: "GitHub",
      title: "Public repositories, experiments, and older implementation work.",
      description:
        "Earlier implementation work, technical depth, and the path from idea to working software become visible here. Potential clients get a clearer sense of how problems are approached in code and execution.",
      profileLabel: "MirDochEgal555 / Robin Keim",
      profileHref: githubProfileHref,
      ctaLabel: "Open GitHub profile",
      stats: [
        {
          value: "Public repos",
          label: "A growing archive of repositories and code experiments on GitHub",
        },
        {
          value: "Web + automation",
          label: "Work centered on practical software, tooling, and workflow support",
        },
        {
          value: "Growing archive",
          label: "Older projects are being curated and added over time",
        },
      ],
    },
    projectSection: {
      eyebrow: "Projects",
      title: "A few older repositories that show range and technical curiosity.",
      description:
        "These examples show how different technical challenges were approached in practice, from dashboards and research-driven implementations to fast Python-based prototyping.",
      archiveNote:
        "More older projects and context notes will be added here over time.",
    },
    projects: [
      {
        name: "Master-Thesis-Implementation",
        href: `${githubProfileHref}/Master-Thesis-Implementation`,
        period: "Academic implementation work",
        description:
          "A repository connected to thesis-oriented implementation work, showing how larger academic ideas were translated into working code instead of remaining purely conceptual.",
        stack: ["Python", "Research", "Implementation"],
        linkLabel: "View repository",
      },
      {
        name: "Reinforcement-Learning-based-hyper-heuristics-for-Financial-Forecasting",
        href: `${githubProfileHref}/Reinforcement-Learning-based-hyper-heuristics-for-Financial-Forecasting`,
        period: "Research exploration",
        description:
          "A research-focused repository centered on reinforcement-learning-based hyper-heuristics for financial forecasting, representing deeper analytical and experimentation-heavy coding work.",
        stack: ["Jupyter Notebook", "Machine learning", "Forecasting"],
        linkLabel: "View repository",
      },
      {
        name: "Dashboard",
        href: `${githubProfileHref}/Dashboard`,
        period: "Applied project work",
        description:
          "An earlier dashboard-oriented codebase that reflects interest in turning raw information into interfaces that are easier to use, inspect, and act on.",
        stack: ["Python", "Dashboarding", "Data display"],
        linkLabel: "View repository",
      },
      {
        name: "trade-ideas-lab",
        href: `${githubProfileHref}/trade-ideas-lab`,
        period: "Experimentation repo",
        description:
          "A smaller Python experimentation space for testing ideas, workflows, and logic quickly before deciding whether something deserves deeper productization.",
        stack: ["Python", "Rapid prototyping", "Analysis"],
        linkLabel: "View repository",
      },
    ],
    experienceSection: {
      eyebrow: "Experience",
      title: "Working student experience in web development and task automation.",
      description:
        "Hands-on delivery in a real working environment shaped this background: building useful software, improving internal workflows, and shipping solutions that need to hold up in day-to-day use.",
    },
    experience: [
      {
        period: "Since 2023",
        title: "Working student in application development",
        organization: "Omikron Data Solutions GmbH",
        description:
          "Hands-on engineering work in a professional setting with direct exposure to implementation, iteration, and product-minded delivery.",
        points: [
          "Contributed to web development work with a focus on practical interfaces and usable internal or customer-facing functionality.",
          "Built and refined task automation approaches to reduce repetitive work and make workflows more reliable.",
          "Worked with real implementation constraints, changing requirements, and the need to ship solutions that hold up in day-to-day use.",
        ],
      },
      {
        period: "Across B.Sc. and M.Sc.",
        title: "Academic project experience in business informatics",
        organization: "University of Mannheim and Karlsruhe Institute of Technology",
        description:
          "Formal coursework and implementation-heavy university work strengthened both the technical and analytical side of software development.",
        points: [
          "Translated theoretical concepts into concrete implementations, prototypes, and project deliverables.",
          "Worked across software engineering, information systems, data-oriented tasks, and business-context problem solving.",
          "Learned to connect requirements, process thinking, and technical design instead of treating code as an isolated output.",
        ],
      },
    ],
    knowledgeSection: {
      eyebrow: "Knowledge",
      title: "General coding knowledge shaped by college work and applied projects.",
      description:
        "The college path in business informatics added structure to the practical experience: not just writing code, but understanding why a system should be built in a certain way and where it creates business value.",
    },
    knowledgeAreas: [
      {
        title: "Software engineering foundations",
        description:
          "Academic work reinforced the fundamentals that make implementation dependable instead of improvised.",
        topics: [
          "Data structures, algorithms, and structured problem solving",
          "Clean code, debugging, testing, and maintainability",
          "Version control and incremental delivery",
        ],
      },
      {
        title: "Web and application development",
        description:
          "Practical coding experience expanded into building interfaces, application logic, and small software systems that solve real problems.",
        topics: [
          "Frontend and web application implementation",
          "APIs, data handling, and internal tools",
          "Automation scripts and workflow support",
        ],
      },
      {
        title: "Business informatics perspective",
        description:
          "College projects trained the ability to connect technical choices with business context and operational usefulness.",
        topics: [
          "Requirements analysis and process modeling",
          "Identifying automation opportunities",
          "Turning vague ideas into workable software scopes",
        ],
      },
    ],
  },
  de: {
    github: {
      eyebrow: "GitHub",
      title: "Oeffentliche Repositories, Experimente und fruehere Implementierungsarbeit.",
      description:
        "Fruehere Implementierungsarbeit, technische Tiefe und der Weg von der Idee zur funktionierenden Software werden hier sichtbar. Potenzielle Kunden erhalten so ein klareres Bild davon, wie Probleme in Code und Umsetzung angegangen werden.",
      profileLabel: "MirDochEgal555 / Robin Keim",
      profileHref: githubProfileHref,
      ctaLabel: "GitHub-Profil oeffnen",
      stats: [
        {
          value: "Public repos",
          label: "Ein wachsendes Archiv aus Repositories und Code-Experimenten auf GitHub",
        },
        {
          value: "Web + Automatisierung",
          label: "Fokus auf praktischer Software, Tooling und Workflow-Unterstuetzung",
        },
        {
          value: "Wachsendes Archiv",
          label: "Weitere fruehere Projekte werden nach und nach ergaenzt",
        },
      ],
    },
    projectSection: {
      eyebrow: "Projekte",
      title: "Einige aeltere Repositories, die technische Bandbreite und Neugier zeigen.",
      description:
        "Diese Beispiele zeigen, wie unterschiedliche technische Herausforderungen praktisch angegangen wurden, von Dashboards und forschungsnahen Implementierungen bis hin zu schneller Python-basierter Prototyping-Arbeit.",
      archiveNote:
        "Weitere fruehere Projekte und kurze Kontextbeschreibungen werden hier nach und nach ergaenzt.",
    },
    projects: [
      {
        name: "Master-Thesis-Implementation",
        href: `${githubProfileHref}/Master-Thesis-Implementation`,
        period: "Akademische Implementierungsarbeit",
        description:
          "Ein Repository aus thesisnaher Implementierungsarbeit, das zeigt, wie groessere akademische Ideen in funktionierenden Code uebersetzt wurden statt nur konzeptionell zu bleiben.",
        stack: ["Python", "Research", "Implementierung"],
        linkLabel: "Repository ansehen",
      },
      {
        name: "Reinforcement-Learning-based-hyper-heuristics-for-Financial-Forecasting",
        href: `${githubProfileHref}/Reinforcement-Learning-based-hyper-heuristics-for-Financial-Forecasting`,
        period: "Forschungsprojekt",
        description:
          "Ein forschungsnahes Repository zu reinforcement-learning-basierten Hyper-Heuristiken fuer Financial Forecasting und damit ein Beispiel fuer analytisch tiefere, experimentgetriebene Entwicklungsarbeit.",
        stack: ["Jupyter Notebook", "Machine Learning", "Forecasting"],
        linkLabel: "Repository ansehen",
      },
      {
        name: "Dashboard",
        href: `${githubProfileHref}/Dashboard`,
        period: "Anwendungsnahes Projekt",
        description:
          "Eine fruehere Dashboard-Codebasis, die das Interesse daran zeigt, Informationen in nutzbare Oberflaechen zu uebersetzen, auf denen Entscheidungen leichter getroffen werden koennen.",
        stack: ["Python", "Dashboarding", "Datenaufbereitung"],
        linkLabel: "Repository ansehen",
      },
      {
        name: "trade-ideas-lab",
        href: `${githubProfileHref}/trade-ideas-lab`,
        period: "Experimentier-Repository",
        description:
          "Ein kleineres Python-Repo fuer schnelle Experimente mit Ideen, Workflows und Logik, bevor etwas spaeter tiefer ausgearbeitet oder weiterentwickelt wird.",
        stack: ["Python", "Rapid Prototyping", "Analyse"],
        linkLabel: "Repository ansehen",
      },
    ],
    experienceSection: {
      eyebrow: "Erfahrung",
      title: "Werkstudentische Erfahrung in Webentwicklung und Aufgabenautomatisierung.",
      description:
        "Praktische Umsetzung im echten Arbeitsumfeld praegt diesen Hintergrund: nuetzliche Software bauen, interne Ablaeufe verbessern und Loesungen ausliefern, die im Alltag verlaesslich funktionieren muessen.",
    },
    experience: [
      {
        period: "Seit 2023",
        title: "Werkstudent in der Anwendungsentwicklung",
        organization: "Omikron Data Solutions GmbH",
        description:
          "Praktische Engineering-Arbeit in einem professionellen Umfeld mit direktem Bezug zu Implementierung, Iteration und produktnaher Delivery.",
        points: [
          "Beitrag zu Webentwicklungsaufgaben mit Fokus auf praktische Oberflaechen und nutzbare interne oder kundennahe Funktionalitaet.",
          "Aufgabenautomatisierung mitentwickelt und verbessert, um wiederkehrende Arbeit zu reduzieren und Workflows robuster zu machen.",
          "Mit realen Umsetzungsgrenzen, wechselnden Anforderungen und der Notwendigkeit gearbeitet, Loesungen alltagstauglich auszuliefern.",
        ],
      },
      {
        period: "Im B.Sc. und M.Sc.",
        title: "Akademische Projekterfahrung in Wirtschaftsinformatik",
        organization: "Universitaet Mannheim und Karlsruher Institut fuer Technologie",
        description:
          "Formale Studieninhalte und umsetzungsnahe Projektarbeit haben sowohl die technische als auch die analytische Seite der Software-Entwicklung gestaerkt.",
        points: [
          "Theoretische Konzepte in konkrete Implementierungen, Prototypen und Projektergebnisse uebersetzt.",
          "Mit Software Engineering, Informationssystemen, datenbezogenen Aufgaben und betriebswirtschaftlich gepraegten Problemstellungen gearbeitet.",
          "Gelernt, Anforderungen, Prozessdenken und technisches Design gemeinsam zu betrachten statt Code isoliert zu sehen.",
        ],
      },
    ],
    knowledgeSection: {
      eyebrow: "Wissen",
      title: "Allgemeines Coding-Wissen aus Studium und praktischer Projektarbeit.",
      description:
        "Der Studienweg in Wirtschaftsinformatik hat der praktischen Erfahrung Struktur gegeben: nicht nur Code schreiben, sondern verstehen, warum ein System auf bestimmte Weise gebaut werden sollte und welchen Nutzen es fachlich stiftet.",
    },
    knowledgeAreas: [
      {
        title: "Software-Engineering-Grundlagen",
        description:
          "Das Studium hat die Grundlagen verstaerkt, die Implementierung verlaesslich statt improvisiert machen.",
        topics: [
          "Datenstrukturen, Algorithmen und strukturiertes Problemloesen",
          "Clean Code, Debugging, Testing und Wartbarkeit",
          "Versionskontrolle und inkrementelle Umsetzung",
        ],
      },
      {
        title: "Web- und Anwendungsentwicklung",
        description:
          "Die praktische Coding-Erfahrung wurde auf Interfaces, Anwendungslogik und kleinere Softwaresysteme erweitert, die echte Probleme loesen.",
        topics: [
          "Frontend- und Webanwendungsentwicklung",
          "APIs, Datenverarbeitung und interne Tools",
          "Automatisierungsskripte und Workflow-Unterstuetzung",
        ],
      },
      {
        title: "Wirtschaftsinformatik-Perspektive",
        description:
          "Studienprojekte haben trainiert, technische Entscheidungen mit fachlichem Kontext und operativem Nutzen zu verbinden.",
        topics: [
          "Anforderungsanalyse und Prozessmodellierung",
          "Identifikation von Automatisierungspotenzialen",
          "Vage Ideen in umsetzbare Software-Scopes uebersetzen",
        ],
      },
    ],
  },
} as const satisfies Record<SiteLocale, ProjectsPageContent>;

export function getProjectsPageContent(locale: SiteLocale): ProjectsPageContent {
  return projectsPageContent[locale];
}

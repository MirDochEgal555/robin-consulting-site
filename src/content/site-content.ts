const contactEmail =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "robin-keim@gmx.de";

const bookingUrl =
  process.env.NEXT_PUBLIC_BOOKING_URL ?? "https://www.cal.eu/robin-keim-consulting";

export const siteContent = {
  companyName: "IT Consulting by Robin Keim",
  bookingUrl,
  email: contactEmail,
  emailLink: `mailto:${contactEmail}`,
  navItems: [
    { label: "Services", href: "#services" },
    { label: "Process", href: "#process" },
    { label: "About", href: "#about" },
    { label: "Proof", href: "#proof" },
    { label: "Contact", href: "#contact" },
  ],
  hero: {
    headline: "Technical consulting with a path to implementation.",
    description:
      "Robin Keim helps founders, operators, and small teams make better technical decisions, define a workable solution, and implement the right software when hands-on execution is needed.",
    promise:
      "Get practical consulting on architecture, tooling, scope, and delivery, with the option to move from recommendation into focused software implementation.",
    highlights: [
      { value: "Fast clarity", label: "Focused consulting for decisions that cannot stall" },
      { value: "Free intro call", label: "A simple first conversation to assess fit" },
      { value: "From plan to build", label: "Advice that can continue into implementation" },
    ],
    problems: [
      "You need to make a technical decision soon, but the options all sound plausible.",
      "You know the business outcome you want, but not the engineering tradeoffs behind it.",
      "You need a realistic plan, not a long list of abstract recommendations.",
    ],
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
      "Robin works best with founders, operators, and small teams that need a clear technical direction without adding unnecessary process. He turns business goals into concrete engineering decisions, explains tradeoffs in plain language, and stays close enough to delivery to help move the work forward when execution support is useful.",
    points: [
      "Recommendations are grounded in business priorities, delivery risk, and realistic scope.",
      "Conversations stay direct and practical, so decisions are easier to make and act on.",
      "Technical depth is there when it matters, without hiding the answer behind jargon.",
      "A strong fit when you need both consulting judgment and selective implementation support.",
    ],
  },
  proof: {
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
} as const;

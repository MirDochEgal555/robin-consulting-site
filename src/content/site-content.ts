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
      "Robin works as a practical technical counterpart for clients who need clarity more than jargon. The focus is simple: understand the problem, expose the tradeoffs, define the most sensible next move, and help build the solution when execution support is needed.",
    points: [
      "Best suited to founders, decision-makers, and lean teams moving quickly.",
      "Advice is framed in business terms first, without losing technical depth.",
      "Engagements stay lightweight, direct, and focused on useful outcomes.",
      "A strong fit when you need both consulting judgment and selective implementation support.",
    ],
  },
  proof: {
    capabilities: [
      "Architecture reviews and implementation planning",
      "Technical feasibility and delivery-risk assessment",
      "Product, tooling, and vendor decision support",
      "Business goals translated into practical engineering choices",
      "Hands-on implementation of focused software solutions",
    ],
    placeholders: [
      {
        title: "Add one strong case study",
        description:
          "A short before-and-after story will do the most work here: what the client needed, what decision was made, and what improved afterward.",
      },
      {
        title: "Add credible background detail",
        description:
          "List relevant domains, technologies, or delivery contexts so the advisory offer feels specific and trustworthy rather than generic.",
      },
    ],
  },
  contact: {
    title: "Free initial consultation",
    description:
      "Start with a short consultation to discuss the problem, the decision in front of you, and whether the work calls for consulting, implementation, or both. If you want to share context first, use the form and Robin will reply directly.",
    email: contactEmail,
    highlights: [
      "Best for architecture reviews, implementation scoping, and urgent technical decisions.",
      "Share the context before the call so the first conversation can start at the real problem.",
      "If the form is unavailable, direct email and the booking link remain open.",
    ],
  },
} as const;

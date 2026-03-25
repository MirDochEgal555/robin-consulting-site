const contactEmail =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "robin-keim@gmx.de";

const bookingUrl =
  process.env.NEXT_PUBLIC_BOOKING_URL ?? "https://www.cal.eu/robin-keim-consulting";

export const siteContent = {
  companyName: "Robin Consulting",
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
    headline: "From technical confusion to a working system.",
    description:
      "Robin helps founders, professionals, and teams make better technical decisions quickly, without wasting time on the wrong architecture, tooling, or implementation path.",
    promise:
      "Get practical technical advisory that turns unclear options into a clear next move, with speed and cost-efficiency built into the process.",
    highlights: [
      { value: "5 sec", label: "Target window to communicate the value proposition" },
      { value: "1 call", label: "Free initial consultation as the main conversion step" },
      { value: "1 page", label: "Focused landing page funnel with clear CTA repetition" },
    ],
    problems: [
      "You need to make a technical decision, but do not have time to research every option.",
      "You understand the business problem, but not the tradeoffs behind the tech stack.",
      "You want a system that works in practice, not a vague list of recommendations.",
    ],
  },
  services: [
    {
      eyebrow: "Advisory",
      title: "Technical advisory for high-impact decisions",
      description:
        "Clarify architecture, stack choices, implementation paths, and delivery risks before expensive mistakes happen.",
    },
    {
      eyebrow: "Direction",
      title: "Outcome-focused guidance",
      description:
        "Translate messy requirements into a concrete plan with sensible tradeoffs, realistic scope, and a path to execution.",
    },
    {
      eyebrow: "Speed",
      title: "Fast support without enterprise overhead",
      description:
        "A lightweight consulting format designed for founders and busy professionals who need useful answers quickly.",
    },
  ],
  process: [
    {
      title: "Start with the real problem",
      description:
        "Use the initial consultation to understand the business context, technical blockers, and what needs to move next.",
    },
    {
      title: "Reduce the options",
      description:
        "Narrow broad technical choices into a small set of defensible directions with clear tradeoffs and costs.",
    },
    {
      title: "Move toward a working system",
      description:
        "Leave with an actionable recommendation, next-step plan, or implementation direction that can actually be executed.",
    },
  ],
  about: {
    summary:
      "Robin Keim is positioned here as a clear-thinking technical advisor who helps clients move from uncertainty to execution, with minimal fluff and strong emphasis on useful outcomes.",
    points: [
      "Problem-solver tone first, technical expertise second.",
      "Messaging stays concise and practical for non-technical buyers.",
      "The section is ready for a short founder story, credentials, and a professional image.",
      "Use this area to make the offer feel personal and trustworthy rather than anonymous.",
    ],
  },
  proof: {
    capabilities: [
      "Architecture and stack decision support",
      "Technical scoping and feasibility guidance",
      "Clear recommendations with business-context tradeoffs",
      "Bridging non-technical goals to implementation reality",
    ],
    placeholders: [
      {
        title: "Case study slot",
        description:
          "Add a short project summary showing the client problem, the decision made, and the concrete result.",
      },
      {
        title: "Tools and experience slot",
        description:
          "List technologies, domains, or delivery contexts that make the expertise feel credible and specific.",
      },
    ],
  },
  contact: {
    title: "Free initial consultation",
    description:
      "The contact area is intentionally simple. It supports the main booking CTA, reinforces the no-risk first step, and keeps email available for people who prefer a direct conversation.",
    email: contactEmail,
  },
} as const;

import type { CSSProperties } from "react";
import { ButtonLink } from "@/components/ui/button-link";
import type { SiteContent } from "@/content/site-content";
import { getPagePath } from "@/content/site-pages";

type ProjectsTeaserSectionProps = {
  content: SiteContent;
};

const teaserCopy = {
  en: {
    eyebrow: "Previous projects",
    title: "See older work, public repositories, and technical background.",
    description:
      "A separate projects page collects earlier GitHub work, selected older repositories, and more detail on web development, automation, and college-based coding experience.",
    linkLabel: "View previous projects",
  },
  de: {
    eyebrow: "Fruehere Projekte",
    title: "Mehr zu aelteren Arbeiten, oeffentlichen Repositories und technischem Hintergrund.",
    description:
      "Eine eigene Projektseite sammelt fruehere GitHub-Arbeit, ausgewaehlte aeltere Repositories sowie mehr Kontext zu Webentwicklung, Automatisierung und dem im Studium aufgebauten Coding-Wissen.",
    linkLabel: "Zu den frueheren Projekten",
  },
} as const;

export function ProjectsTeaserSection({
  content,
}: ProjectsTeaserSectionProps) {
  const projectsPath = getPagePath(content.locale, "projects");
  const teaser = teaserCopy[content.locale];

  return (
    <section id="projects" className="anchor-offset py-6 sm:py-8">
      <div className="container-shell">
        <div
          className="glass-panel reveal-up scroll-tilt-in rounded-[2rem] p-8 sm:p-10"
          style={{ "--delay": "120ms" } as CSSProperties}
        >
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
            <div className="max-w-3xl">
              <div className="eyebrow-line section-label">
                {teaser.eyebrow}
              </div>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                {teaser.title}
              </h2>
              <p className="mt-4 text-base leading-7 text-slate-300 sm:text-lg">
                {teaser.description}
              </p>
            </div>
            <div className="flex items-start lg:justify-end">
              <ButtonLink href={projectsPath} variant="secondary">
                {teaser.linkLabel}
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

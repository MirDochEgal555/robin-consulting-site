import type { CSSProperties } from "react";
import { SectionShell } from "@/components/section-shell";
import { ButtonLink } from "@/components/ui/button-link";
import type { SiteContent } from "@/content/site-content";
import { getPagePath } from "@/content/site-pages";

type ProjectsTeaserSectionProps = {
  content: SiteContent;
};

const teaserCopy = {
  en: {
    eyebrow: "Previous projects",
    title: "Take a look at previous projects.",
    description:
      "See selected past work and get a clearer picture of the technical range, practical experience, and problem-solving approach behind the consulting offer.",
    panelText: "Selected repositories, project examples, and practical development work.",
    linkLabel: "View previous projects",
  },
  de: {
    eyebrow: "Frühere Projekte",
    title: "Werfen Sie einen Blick auf frühere Projekte.",
    description:
      "Sehen Sie ausgewählte frühere Arbeiten und gewinnen Sie einen klareren Eindruck von technischer Bandbreite, praktischer Erfahrung und der Herangehensweise hinter dem Beratungsangebot.",
    panelText: "Ausgewählte Repositories, Projektbeispiele und praktische Entwicklungsarbeit.",
    linkLabel: "Zu den früheren Projekten",
  },
} as const;

export function ProjectsTeaserSection({
  content,
}: ProjectsTeaserSectionProps) {
  const projectsPath = getPagePath(content.locale, "projects");
  const teaser = teaserCopy[content.locale];

  return (
    <SectionShell
      id="projects"
      eyebrow={teaser.eyebrow}
      title={teaser.title}
      description={teaser.description}
    >
      <div className="mt-6">
        <div
          className="glass-panel reveal-up scroll-tilt-in rounded-[2rem] p-8 sm:p-10"
          style={{ "--delay": "120ms" } as CSSProperties}
        >
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-3xl text-base leading-7 text-slate-300">
              {teaser.panelText}
            </p>
            <div className="flex items-start sm:justify-end">
              <ButtonLink href={projectsPath} variant="secondary">
                {teaser.linkLabel}
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}

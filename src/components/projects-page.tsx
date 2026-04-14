import type { CSSProperties } from "react";
import { ContactSection } from "@/components/sections/contact-section";
import { PageIntro } from "@/components/page-intro";
import { PageShell } from "@/components/page-shell";
import { SectionShell } from "@/components/section-shell";
import { ButtonLink } from "@/components/ui/button-link";
import { getProjectsPageContent } from "@/content/projects-page-content";
import { getSiteContent, type SiteLocale } from "@/content/site-content";
import { getPageDefinition } from "@/content/site-pages";

type ProjectsPageProps = {
  locale: SiteLocale;
};

export function ProjectsPage({ locale }: ProjectsPageProps) {
  const content = getSiteContent(locale);
  const page = getPageDefinition(locale, "projects");
  const projectsContent = getProjectsPageContent(locale);
  const pageNavItems = [
    { label: content.sections.overviewLabel, href: "#overview" },
    { label: projectsContent.experienceSection.eyebrow, href: "#experience" },
    { label: projectsContent.projectSection.eyebrow, href: "#projects" },
    { label: projectsContent.github.eyebrow, href: "#github" },
    { label: projectsContent.knowledgeSection.eyebrow, href: "#strengths" },
    { label: content.sections.contact.eyebrow, href: "#contact" },
  ];

  if (!page.intro) {
    return null;
  }

  return (
    <PageShell
      locale={locale}
      pageKey="projects"
      brandHref="#overview"
      pageNavItems={pageNavItems}
    >
      <PageIntro
        id="overview"
        eyebrow={page.intro.eyebrow}
        title={page.intro.title}
        description={page.intro.description}
      />

      <SectionShell
        id="experience"
        eyebrow={projectsContent.experienceSection.eyebrow}
        title={projectsContent.experienceSection.title}
        description={projectsContent.experienceSection.description}
      >
        <div className="grid gap-6 lg:grid-cols-2">
          {projectsContent.experience.map((item, index) => (
            <article
              key={`${item.period}-${item.title}`}
              className="glass-panel reveal-up scroll-reveal-up rounded-[2rem] p-7"
              style={{ "--delay": `${120 + index * 90}ms` } as CSSProperties}
            >
              <div className="font-mono text-xs uppercase tracking-[0.18em] text-sky-300">
                {item.period}
              </div>
              <h2 className="mt-4 text-2xl font-semibold text-white">
                {item.title}
              </h2>
              <p className="mt-2 text-sm font-medium text-slate-200">
                {item.organization}
              </p>
              <p className="mt-4 text-sm leading-7 text-slate-300">
                {item.description}
              </p>
              <ul className="mt-6 space-y-3 text-sm leading-7 text-slate-300">
                {item.points.map((point) => (
                  <li
                    key={point}
                    className="rounded-[1.25rem] border border-white/10 bg-white/[0.03] px-4 py-3"
                  >
                    {point}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </SectionShell>

      <SectionShell
        id="projects"
        eyebrow={projectsContent.projectSection.eyebrow}
        title={projectsContent.projectSection.title}
        description={projectsContent.projectSection.description}
      >
        <div className="grid gap-6 lg:grid-cols-2">
          {projectsContent.projects.map((project, index) => (
            <article
              key={project.name}
              className="glass-panel card-lift reveal-up scroll-tilt-in rounded-[2rem] p-7"
              style={{ "--delay": `${120 + index * 80}ms` } as CSSProperties}
            >
              <div className="font-mono text-xs uppercase tracking-[0.18em] text-sky-300">
                {project.period}
              </div>
              <h2 className="mt-4 text-2xl font-semibold text-white">
                {project.name}
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-300">
                {project.description}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {project.stack.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-sky-300/20 bg-sky-300/10 px-3 py-1 text-xs uppercase tracking-[0.14em] text-sky-200"
                  >
                    {item}
                  </span>
                ))}
              </div>
              <div className="mt-7">
                <ButtonLink href={project.href} variant="secondary">
                  {project.linkLabel}
                </ButtonLink>
              </div>
            </article>
          ))}
        </div>
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-slate-500">
          {projectsContent.projectSection.archiveNote}
        </p>
      </SectionShell>

      <SectionShell
        id="github"
        eyebrow={projectsContent.github.eyebrow}
        title={projectsContent.github.title}
        description={projectsContent.github.description}
      >
        <div
          className="glass-panel reveal-up scroll-tilt-in rounded-[2rem] p-8 sm:p-10"
          style={{ "--delay": "100ms" } as CSSProperties}
        >
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
            <div>
              <div className="font-mono text-xs uppercase tracking-[0.2em] text-slate-400">
                {projectsContent.github.profileLabel}
              </div>
              <div className="mt-6 grid gap-4 md:grid-cols-3">
                {projectsContent.github.stats.map((stat, index) => (
                  <div
                    key={stat.label}
                    className="reveal-up scroll-reveal-up rounded-[1.5rem] border border-white/10 bg-slate-950/40 px-5 py-5"
                    style={{ "--delay": `${180 + index * 90}ms` } as CSSProperties}
                  >
                    <div className="text-lg font-semibold text-white">{stat.value}</div>
                    <p className="mt-2 text-sm leading-6 text-slate-300">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-start lg:justify-end">
              <ButtonLink href={projectsContent.github.profileHref}>
                {projectsContent.github.ctaLabel}
              </ButtonLink>
            </div>
          </div>
        </div>
      </SectionShell>

      <SectionShell
        id="strengths"
        eyebrow={projectsContent.knowledgeSection.eyebrow}
        title={projectsContent.knowledgeSection.title}
        description={projectsContent.knowledgeSection.description}
      >
        <div className="grid gap-6 lg:grid-cols-3">
          {projectsContent.knowledgeAreas.map((area, index) => (
            <article
              key={area.title}
              className="glass-panel reveal-up scroll-reveal-up rounded-[2rem] p-7"
              style={{ "--delay": `${120 + index * 80}ms` } as CSSProperties}
            >
              <h2 className="text-2xl font-semibold text-white">{area.title}</h2>
              <p className="mt-4 text-sm leading-7 text-slate-300">
                {area.description}
              </p>
              <ul className="mt-6 space-y-3 text-sm leading-7 text-slate-300">
                {area.topics.map((topic) => (
                  <li
                    key={topic}
                    className="rounded-[1.25rem] border border-white/10 bg-white/[0.03] px-4 py-3"
                  >
                    {topic}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </SectionShell>

      <ContactSection content={content} />
    </PageShell>
  );
}

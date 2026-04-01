import type { CSSProperties } from "react";
import { ButtonLink } from "@/components/ui/button-link";
import { SectionShell } from "@/components/section-shell";
import type { SiteContent } from "@/content/site-content";
import { getPagePath } from "@/content/site-pages";

type ServicesSectionProps = {
  content: SiteContent;
  showPageLink?: boolean;
};

export function ServicesSection({
  content,
  showPageLink = false,
}: ServicesSectionProps) {
  const servicesPath = getPagePath(content.locale, "services");

  return (
    <SectionShell
      id="services"
      eyebrow={content.sections.services.eyebrow}
      title={content.sections.services.title}
      description={content.sections.services.description}
    >
      <div className="grid gap-5 md:grid-cols-3">
        {content.services.map((service, index) => (
          <article
            key={service.title}
            className="glass-panel card-lift reveal-up scroll-tilt-in rounded-[1.75rem] p-6"
            style={{ "--delay": `${120 + index * 120}ms` } as CSSProperties}
          >
            <div className="font-mono text-xs uppercase tracking-[0.2em] text-sky-300">
              {service.eyebrow}
            </div>
            <h3 className="mt-4 text-xl font-semibold text-white">
              {service.title}
            </h3>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              {service.description}
            </p>
          </article>
        ))}
      </div>
      {showPageLink ? (
        <div
          className="reveal-up scroll-reveal-up pt-2"
          style={{ "--delay": "260ms" } as CSSProperties}
        >
          <ButtonLink href={servicesPath} variant="secondary">
            {content.sections.services.pageLinkLabel}
          </ButtonLink>
        </div>
      ) : null}
    </SectionShell>
  );
}

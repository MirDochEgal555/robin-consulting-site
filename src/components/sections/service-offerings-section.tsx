import type { CSSProperties } from "react";
import { SectionShell } from "@/components/section-shell";
import { getServicesPageContent } from "@/content/services-page-content";
import type { SiteLocale } from "@/content/site-content";

type ServiceOfferingsSectionProps = {
  locale: SiteLocale;
};

export function ServiceOfferingsSection({
  locale,
}: ServiceOfferingsSectionProps) {
  const content = getServicesPageContent(locale);

  return (
    <SectionShell
      id="services"
      eyebrow={content.section.eyebrow}
      title={content.section.title}
      description={content.section.description}
    >
      <div className="grid gap-5 lg:grid-cols-3">
        {content.offerings.map((service, index) => (
          <article
            key={service.title}
            className="glass-panel card-lift reveal-up scroll-tilt-in rounded-[1.75rem] p-6"
            style={{ "--delay": `${120 + index * 120}ms` } as CSSProperties}
          >
            <div className="font-mono text-xs uppercase tracking-[0.2em] text-sky-300">
              {service.eyebrow}
            </div>
            <h3 className="mt-4 text-2xl font-semibold tracking-tight text-white">
              {service.title}
            </h3>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              {service.description}
            </p>
            <ul className="mt-6 space-y-3 text-sm text-slate-200">
              {service.outcomes.map((outcome) => (
                <li key={outcome} className="flex gap-3 leading-6">
                  <span
                    aria-hidden="true"
                    className="mt-2 h-2 w-2 shrink-0 rounded-full bg-sky-300"
                  />
                  <span>{outcome}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}

import type { CSSProperties } from "react";
import { SectionShell } from "@/components/section-shell";
import type { SiteContent } from "@/content/site-content";

type UseCasesSectionProps = {
  content: SiteContent;
};

export function UseCasesSection({ content }: UseCasesSectionProps) {
  return (
    <SectionShell
      id="use-cases"
      eyebrow={content.sections.useCases.eyebrow}
      title={content.sections.useCases.title}
      description={content.sections.useCases.description}
    >
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {content.useCases.map((useCase, index) => (
          <article
            key={useCase.title}
            className="glass-panel card-lift reveal-up scroll-tilt-in flex h-full flex-col rounded-[1.75rem] p-6"
            style={{ "--delay": `${120 + index * 90}ms` } as CSSProperties}
          >
            <div className="font-mono text-xs uppercase tracking-[0.2em] text-sky-300">
              {useCase.eyebrow}
            </div>
            <h3 className="mt-4 text-xl font-semibold text-white">
              {useCase.title}
            </h3>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              {useCase.description}
            </p>
            <div className="mt-6 rounded-[1.25rem] border border-sky-300/20 bg-sky-400/10 p-4">
              <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-sky-200">
                {content.sections.useCases.outcomeLabel}
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-100">
                {useCase.outcome}
              </p>
            </div>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}

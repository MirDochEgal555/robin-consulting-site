import type { CSSProperties } from "react";
import { SectionShell } from "@/components/section-shell";
import type { SiteContent } from "@/content/site-content";

type ProcessSectionProps = {
  content: SiteContent;
};

export function ProcessSection({ content }: ProcessSectionProps) {
  return (
    <SectionShell
      id="process"
      eyebrow={content.sections.process.eyebrow}
      title={content.sections.process.title}
      description={content.sections.process.description}
    >
      <div className="grid gap-5 lg:grid-cols-3">
        {content.process.map((step, index) => (
          <article
            key={step.title}
            className="card-lift reveal-up scroll-tilt-in rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-6"
            style={{ "--delay": `${120 + index * 140}ms` } as CSSProperties}
          >
            <div className="font-mono text-sm text-sky-300">
              0{index + 1}
            </div>
            <h3 className="mt-4 text-xl font-semibold text-white">
              {step.title}
            </h3>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              {step.description}
            </p>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}

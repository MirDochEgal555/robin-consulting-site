import type { CSSProperties } from "react";
import { SectionShell } from "@/components/section-shell";
import type { SiteContent } from "@/content/site-content";

type ProofSectionProps = {
  content: SiteContent;
};

export function ProofSection({ content }: ProofSectionProps) {
  const { proof } = content;

  return (
    <SectionShell
      id="proof"
      eyebrow={content.sections.proof.eyebrow}
      title={content.sections.proof.title}
      description={content.sections.proof.description}
      headerClassName="mb-12"
    >
      <div className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
        <div
          className="glass-panel reveal-left scroll-reveal-left rounded-[2rem] p-7 lg:p-8"
          style={{ "--delay": "120ms" } as CSSProperties}
        >
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-sky-300">
            {content.sections.proof.timelineLabel}
          </div>
          <div className="mt-6 space-y-5">
            {proof.timeline.map((item, index) => (
              <article
                key={`${item.period}-${item.title}`}
                className="card-lift reveal-up scroll-reveal-up rounded-[1.5rem] border border-white/10 bg-white/[0.03] px-5 py-6 lg:px-6 lg:py-7"
                style={{ "--delay": `${220 + index * 110}ms` } as CSSProperties}
              >
                <div className="font-mono text-xs uppercase tracking-[0.18em] text-sky-300">
                  {item.period}
                </div>
                <h3 className="mt-3 text-lg font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mt-1 text-sm font-medium text-slate-200">
                  {item.institution}
                </p>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
        <div className="grid gap-6">
          <article
            className="card-lift reveal-right scroll-reveal-right overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-7 lg:p-8"
            style={{ "--delay": "180ms" } as CSSProperties}
          >
            <div className="font-mono text-xs uppercase tracking-[0.2em] text-sky-300">
              {content.sections.proof.credibilityLabel}
            </div>
            <p className="mt-4 text-base leading-7 text-slate-200">
              {proof.summary}
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              {proof.highlights.map((item, index) => (
                <div
                  key={item.label}
                  className="reveal-up scroll-reveal-up rounded-2xl border border-white/10 bg-slate-950/45 px-4 py-4"
                  style={{ "--delay": `${260 + index * 90}ms` } as CSSProperties}
                >
                  <div className="text-base font-semibold text-white">{item.value}</div>
                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </article>
          <article
            className="glass-panel reveal-right scroll-reveal-right overflow-hidden rounded-[1.75rem] p-7 lg:p-8"
            style={{ "--delay": "260ms" } as CSSProperties}
          >
            <h3 className="text-xl font-semibold text-white">{content.sections.proof.capabilitiesTitle}</h3>
            <ul className="mt-6 grid list-none gap-4 p-0 text-sm leading-7 text-slate-300">
              {proof.capabilities.map((item) => (
                <li
                  key={item}
                  className="card-lift rounded-2xl border border-white/10 px-5 py-4"
                >
                  {item}
                </li>
              ))}
            </ul>
          </article>
        </div>
      </div>
    </SectionShell>
  );
}

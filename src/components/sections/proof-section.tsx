import type { CSSProperties } from "react";
import { SectionShell } from "@/components/section-shell";
import { siteContent } from "@/content/site-content";

export function ProofSection() {
  return (
    <SectionShell
      id="proof"
      eyebrow="Proof"
      title="Proof points are scaffolded, but still need real project evidence"
      description="The README called for projects, tools, and experience. This section is ready for concrete case studies or testimonials."
    >
      <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
        <div
          className="glass-panel reveal-left scroll-reveal-left rounded-[2rem] p-6"
          style={{ "--delay": "120ms" } as CSSProperties}
        >
          <h3 className="text-xl font-semibold text-white">Tooling and delivery confidence</h3>
          <ul className="mt-5 space-y-3 text-sm leading-7 text-slate-300">
            {siteContent.proof.capabilities.map((item, index) => (
              <li
                key={item}
                className="card-lift reveal-up scroll-reveal-up rounded-2xl border border-white/10 px-4 py-3"
                style={{ "--delay": `${220 + index * 90}ms` } as CSSProperties}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="grid gap-5">
          {siteContent.proof.placeholders.map((item, index) => (
            <article
              key={item.title}
              className="card-lift reveal-right scroll-reveal-right rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-6"
              style={{ "--delay": `${180 + index * 120}ms` } as CSSProperties}
            >
              <div className="font-mono text-xs uppercase tracking-[0.2em] text-sky-300">
                Placeholder
              </div>
              <h3 className="mt-3 text-xl font-semibold text-white">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-300">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}

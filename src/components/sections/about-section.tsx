import type { CSSProperties } from "react";
import { SectionShell } from "@/components/section-shell";
import { siteContent } from "@/content/site-content";

export function AboutSection() {
  return (
    <SectionShell
      id="about"
      eyebrow="About"
      title="Robin Keim as the technical counterpart clients can actually work with"
      description="This is where final positioning copy, credibility, and a personal image can be refined."
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_1.15fr]">
        <div
          className="reveal-left scroll-reveal-left float-x rounded-[2rem] border border-dashed border-sky-300/30 bg-sky-400/[0.08] p-8 text-sm leading-7 text-slate-300"
          style={{ "--delay": "120ms" } as CSSProperties}
        >
          Placeholder for Robin&apos;s photo, portrait, or a branded visual block.
        </div>
        <div
          className="glass-panel reveal-right scroll-reveal-right rounded-[2rem] p-8"
          style={{ "--delay": "180ms" } as CSSProperties}
        >
          <p className="text-lg leading-8 text-slate-200">
            {siteContent.about.summary}
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {siteContent.about.points.map((point, index) => (
              <div
                key={point}
                className="card-lift reveal-up scroll-reveal-up rounded-3xl border border-white/10 bg-slate-950/35 p-4 text-sm leading-7 text-slate-300"
                style={{ "--delay": `${260 + index * 90}ms` } as CSSProperties}
              >
                {point}
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionShell>
  );
}

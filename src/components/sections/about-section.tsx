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
        <div className="rounded-[2rem] border border-dashed border-sky-300/30 bg-sky-400/[0.08] p-8 text-sm leading-7 text-slate-300">
          Placeholder for Robin&apos;s photo, portrait, or a branded visual block.
        </div>
        <div className="glass-panel rounded-[2rem] p-8">
          <p className="text-lg leading-8 text-slate-200">
            {siteContent.about.summary}
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {siteContent.about.points.map((point) => (
              <div
                key={point}
                className="rounded-3xl border border-white/10 bg-slate-950/35 p-4 text-sm leading-7 text-slate-300"
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

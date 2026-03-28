import type { CSSProperties } from "react";
import Image from "next/image";
import { SectionShell } from "@/components/section-shell";
import { siteContent } from "@/content/site-content";
import robinPortrait from "../../../IMG_0169.jpeg";

export function AboutSection() {
  return (
    <SectionShell
      id="about"
      eyebrow="About"
      title="A technical partner who brings clarity, structure, and follow-through"
      description="Independent consulting for founders and lean teams that need sound engineering judgment, plain communication, and hands-on support when the next step should be built."
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_1.15fr]">
        <div
          className="reveal-left scroll-reveal-left float-x overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/55 shadow-[0_30px_90px_rgba(15,23,42,0.35)]"
          style={{ "--delay": "120ms" } as CSSProperties}
        >
          <div className="relative aspect-[4/5] min-h-[320px]">
            <Image
              src={robinPortrait}
              alt="Portrait of Robin Keim"
              fill
              priority
              sizes="(min-width: 1024px) 32rem, (min-width: 640px) 70vw, 100vw"
              className="object-cover object-center"
            />
          </div>
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

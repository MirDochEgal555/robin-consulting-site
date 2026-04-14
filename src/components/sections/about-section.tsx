import type { CSSProperties } from "react";
import Image from "next/image";
import { SectionShell } from "@/components/section-shell";
import type { SiteContent } from "@/content/site-content";
import robinPortrait from "../../../IMG_0169.jpeg";

type AboutSectionProps = {
  content: SiteContent;
};

export function AboutSection({ content }: AboutSectionProps) {
  const { about } = content;

  return (
    <SectionShell
      id="about"
      eyebrow={content.sections.about.eyebrow}
      title={content.sections.about.title}
      description={content.sections.about.description}
      headerClassName="mb-8 sm:mb-12"
    >
      <div className="grid gap-5 sm:gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <div
          className="order-2 glass-panel reveal-left scroll-reveal-left rounded-[2rem] p-5 sm:p-7 lg:order-1 lg:p-8"
          style={{ "--delay": "120ms" } as CSSProperties}
        >
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-sky-300">
            {content.sections.about.timelineLabel}
          </div>
          <div className="mt-5 space-y-4 sm:mt-6 sm:space-y-5">
            {about.timeline.map((item, index) => (
              <article
                key={`${item.period}-${item.title}`}
                className="card-lift reveal-up scroll-reveal-up rounded-[1.5rem] border border-white/10 bg-white/[0.03] px-4 py-5 sm:px-5 sm:py-6 lg:px-6 lg:py-7"
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
        <div className="order-1 grid gap-5 sm:gap-6 lg:order-2">
          <div
            className="reveal-right scroll-reveal-right mx-auto w-full max-w-xs overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/55 shadow-[0_30px_90px_rgba(15,23,42,0.35)] sm:max-w-sm"
            style={{ "--delay": "160ms" } as CSSProperties}
          >
            <div className="relative aspect-[4/5] min-h-[260px] sm:min-h-[320px]">
              <Image
                src={robinPortrait}
                alt={content.sections.about.imageAlt}
                fill
                priority
                sizes="(min-width: 1024px) 26rem, (min-width: 640px) 60vw, 100vw"
                className="object-cover object-center"
              />
            </div>
          </div>
          <article
            className="card-lift reveal-right scroll-reveal-right overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-5 sm:p-7 lg:p-8"
            style={{ "--delay": "180ms" } as CSSProperties}
          >
            <div className="font-mono text-xs uppercase tracking-[0.2em] text-sky-300">
              {content.sections.about.credibilityLabel}
            </div>
            <p className="mt-4 text-base leading-7 text-slate-200">
              {about.summary}
            </p>
            <div className="mt-5 grid gap-3 sm:mt-6 sm:gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              {about.highlights.map((item, index) => (
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
        </div>
      </div>
      <article
        className="glass-panel reveal-up scroll-reveal-up mx-auto max-w-5xl overflow-hidden rounded-[1.75rem] p-5 text-center sm:p-7 lg:p-8"
        style={{ "--delay": "260ms" } as CSSProperties}
      >
        <h3 className="text-xl font-semibold text-white">
          {content.sections.about.capabilitiesTitle}
        </h3>
        <ul className="mt-6 grid list-none gap-4 p-0 text-sm leading-7 text-slate-300 sm:grid-cols-2 xl:grid-cols-3">
          {about.capabilities.map((item) => (
            <li
              key={item}
              className="card-lift flex items-center justify-start rounded-2xl border border-white/10 px-5 py-4 text-left sm:justify-center sm:text-center"
            >
              {item}
            </li>
          ))}
        </ul>
      </article>
    </SectionShell>
  );
}

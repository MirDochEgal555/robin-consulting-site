import type { CSSProperties } from "react";
import { ButtonLink } from "@/components/ui/button-link";
import type { SiteContent } from "@/content/site-content";

type HeroSectionProps = {
  content: SiteContent;
};

export function HeroSection({ content }: HeroSectionProps) {
  return (
    <section id="top" className="relative py-20 sm:py-28">
      <div className="hero-orb hero-orb-one float-y" />
      <div className="hero-orb hero-orb-two float-x" />
      <div className="container-shell grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="reveal-left" style={{ "--delay": "80ms" } as CSSProperties}>
          <div className="eyebrow-line section-label reveal-up" style={{ "--delay": "120ms" } as CSSProperties}>{content.hero.eyebrow}</div>
          <h1
            className="mt-6 max-w-4xl text-5xl font-semibold tracking-tight text-white sm:text-6xl reveal-up"
            style={{ "--delay": "180ms" } as CSSProperties}
          >
            {content.hero.headline}
          </h1>
          <p
            className="mt-6 max-w-2xl text-lg leading-8 text-slate-300 reveal-up"
            style={{ "--delay": "260ms" } as CSSProperties}
          >
            {content.hero.description}
          </p>
          <div
            className="mt-8 flex flex-col gap-3 sm:flex-row reveal-up"
            style={{ "--delay": "340ms" } as CSSProperties}
          >
            <ButtonLink
              href={content.bookingUrl}
              trackingEvent="cta_click"
              trackingLabel={content.cta.bookConsultation}
            >
              {content.cta.bookConsultation}
            </ButtonLink>
            <ButtonLink
              href={content.emailLink}
              variant="secondary"
              trackingEvent="cta_click"
              trackingLabel={content.cta.emailRobin}
            >
              {content.cta.emailRobin}
            </ButtonLink>
          </div>
          <div className="mt-8 grid gap-4 text-sm text-slate-300 sm:grid-cols-3">
            {content.hero.highlights.map((item, index) => (
              <div
                key={item.label}
                className="card-lift reveal-up rounded-3xl border border-white/10 bg-white/[0.04] p-4"
                style={
                  { "--delay": `${420 + index * 90}ms` } as CSSProperties
                }
              >
                <div className="text-2xl font-semibold text-white">{item.value}</div>
                <div className="mt-2 text-slate-400">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div
          className="glass-panel float-y reveal-right rounded-[2rem] p-6 sm:p-8"
          style={{ "--delay": "220ms" } as CSSProperties}
        >
          <div className="section-label">{content.hero.problemsLabel}</div>
          <div className="mt-6 space-y-4">
            {content.hero.problems.map((problem, index) => (
              <div
                key={problem}
                className="card-lift reveal-up rounded-3xl border border-white/10 bg-slate-950/40 p-5 text-slate-200"
                style={
                  { "--delay": `${340 + index * 120}ms` } as CSSProperties
                }
              >
                {problem}
              </div>
            ))}
          </div>
          <div className="pulse-glow mt-8 rounded-[1.75rem] border border-sky-300/20 bg-sky-400/10 p-5">
            <div className="section-label">{content.hero.promiseLabel}</div>
            <p className="mt-3 text-base leading-7 text-slate-200">
              {content.hero.promise}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

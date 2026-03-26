import type { CSSProperties } from "react";
import { siteContent } from "@/content/site-content";
import { ButtonLink } from "@/components/ui/button-link";

export function HeroSection() {
  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="relative py-20 sm:py-28"
    >
      <div className="hero-orb hero-orb-one float-y" />
      <div className="hero-orb hero-orb-two float-x" />
      <div className="container-shell grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="reveal-left" style={{ "--delay": "80ms" } as CSSProperties}>
          <div className="eyebrow-line section-label reveal-up" style={{ "--delay": "120ms" } as CSSProperties}>Technical advisory</div>
          <h1
            id="hero-heading"
            className="mt-6 max-w-4xl text-5xl font-semibold tracking-tight text-white sm:text-6xl reveal-up"
            style={{ "--delay": "180ms" } as CSSProperties}
          >
            {siteContent.hero.headline}
          </h1>
          <p
            className="mt-6 max-w-2xl text-lg leading-8 text-slate-300 reveal-up"
            style={{ "--delay": "260ms" } as CSSProperties}
          >
            {siteContent.hero.description}
          </p>
          <div
            className="mt-8 flex flex-col gap-3 sm:flex-row reveal-up"
            style={{ "--delay": "340ms" } as CSSProperties}
          >
            <ButtonLink
              href={siteContent.bookingUrl}
              trackingEvent="cta_click"
              trackingLabel="hero_book_consultation"
              trackingSection="hero"
              conversionType="booking"
            >
              Book a free consultation
            </ButtonLink>
            <ButtonLink
              href={siteContent.emailLink}
              variant="secondary"
              trackingEvent="cta_click"
              trackingLabel="hero_email"
              trackingSection="hero"
              conversionType="email"
            >
              Email Robin
            </ButtonLink>
          </div>
          <div className="mt-8 grid gap-4 text-sm text-slate-300 sm:grid-cols-3">
            {siteContent.hero.highlights.map((item, index) => (
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
          <div className="section-label">Why clients reach out</div>
          <div className="mt-6 space-y-4">
            {siteContent.hero.problems.map((problem, index) => (
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
            <div className="section-label">Core promise</div>
            <p className="mt-3 text-base leading-7 text-slate-200">
              {siteContent.hero.promise}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

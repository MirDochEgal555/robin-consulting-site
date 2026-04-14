import type { CSSProperties } from "react";

type PageIntroProps = {
  id?: string;
  eyebrow: string;
  title: string;
  description: string;
};

export function PageIntro({
  id,
  eyebrow,
  title,
  description,
}: PageIntroProps) {
  return (
    <section id={id} className="anchor-offset relative overflow-hidden py-20 sm:py-24">
      <div className="hero-orb page-intro-orb-one page-intro-float-y" />
      <div className="hero-orb page-intro-orb-two page-intro-float-x" />
      <div className="container-shell relative z-10">
        <div
          className="max-w-4xl reveal-left"
          style={{ "--delay": "80ms" } as CSSProperties}
        >
          <div
            className="eyebrow-line section-label reveal-up"
            style={{ "--delay": "120ms" } as CSSProperties}
          >
            {eyebrow}
          </div>
          <h1
            className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl reveal-up"
            style={{ "--delay": "180ms" } as CSSProperties}
          >
            {title}
          </h1>
          <p
            className="mt-6 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg reveal-up"
            style={{ "--delay": "260ms" } as CSSProperties}
          >
            {description}
          </p>
        </div>
      </div>
    </section>
  );
}

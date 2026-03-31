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
    <section id={id} className="anchor-offset py-20 sm:py-24">
      <div className="container-shell">
        <div className="max-w-4xl">
          <div className="eyebrow-line section-label reveal-up scroll-reveal-up">
            {eyebrow}
          </div>
          <h1
            className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl reveal-up scroll-reveal-up"
            style={{ "--delay": "90ms" } as CSSProperties}
          >
            {title}
          </h1>
          <p
            className="mt-6 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg reveal-up scroll-reveal-up"
            style={{ "--delay": "160ms" } as CSSProperties}
          >
            {description}
          </p>
        </div>
      </div>
    </section>
  );
}

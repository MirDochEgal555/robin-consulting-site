import { siteContent } from "@/content/site-content";
import { ButtonLink } from "@/components/ui/button-link";

export function HeroSection() {
  return (
    <section id="top" className="relative py-20 sm:py-28">
      <div className="container-shell grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <div className="eyebrow-line section-label">Technical advisory</div>
          <h1 className="mt-6 max-w-4xl text-5xl font-semibold tracking-tight text-white sm:text-6xl">
            {siteContent.hero.headline}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            {siteContent.hero.description}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={siteContent.bookingUrl}>
              Book a free consultation
            </ButtonLink>
            <ButtonLink href={siteContent.emailLink} variant="secondary">
              Email Robin
            </ButtonLink>
          </div>
          <div className="mt-8 grid gap-4 text-sm text-slate-300 sm:grid-cols-3">
            {siteContent.hero.highlights.map((item) => (
              <div
                key={item.label}
                className="rounded-3xl border border-white/10 bg-white/[0.04] p-4"
              >
                <div className="text-2xl font-semibold text-white">{item.value}</div>
                <div className="mt-2 text-slate-400">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="glass-panel rounded-[2rem] p-6 sm:p-8">
          <div className="section-label">Why clients reach out</div>
          <div className="mt-6 space-y-4">
            {siteContent.hero.problems.map((problem) => (
              <div
                key={problem}
                className="rounded-3xl border border-white/10 bg-slate-950/40 p-5 text-slate-200"
              >
                {problem}
              </div>
            ))}
          </div>
          <div className="mt-8 rounded-[1.75rem] border border-sky-300/20 bg-sky-400/10 p-5">
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

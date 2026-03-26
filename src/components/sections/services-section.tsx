import type { CSSProperties } from "react";
import { SectionShell } from "@/components/section-shell";
import { siteContent } from "@/content/site-content";

export function ServicesSection() {
  return (
    <SectionShell
      id="services"
      eyebrow="Services"
      title="Practical help for technical decisions that need to move forward"
      description="The offer is positioned as fast, outcome-focused advisory rather than long, abstract consulting cycles."
    >
      <div className="grid gap-5 md:grid-cols-3">
        {siteContent.services.map((service, index) => (
          <article
            key={service.title}
            className="glass-panel card-lift reveal-up scroll-tilt-in rounded-[1.75rem] p-6"
            style={{ "--delay": `${120 + index * 120}ms` } as CSSProperties}
          >
            <div className="font-mono text-xs uppercase tracking-[0.2em] text-sky-300">
              {service.eyebrow}
            </div>
            <h3 className="mt-4 text-xl font-semibold text-white">
              {service.title}
            </h3>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              {service.description}
            </p>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}

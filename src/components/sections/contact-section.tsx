import type { CSSProperties } from "react";
import { ButtonLink } from "@/components/ui/button-link";
import { SectionShell } from "@/components/section-shell";
import type { SiteContent } from "@/content/site-content";

type ContactSectionProps = {
  content: SiteContent;
};

export function ContactSection({ content }: ContactSectionProps) {
  return (
    <SectionShell
      id="contact"
      eyebrow={content.sections.contact.eyebrow}
      title={content.sections.contact.title}
      description={content.sections.contact.description}
    >
      <div
        className="glass-panel reveal-up scroll-tilt-in rounded-[2rem] p-8 sm:p-10"
        style={{ "--delay": "100ms" } as CSSProperties}
      >
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <h3 className="text-2xl font-semibold text-white">
              {content.contact.title}
            </h3>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">
              {content.contact.description}
            </p>
            <div className="mt-6 rounded-3xl border border-white/10 bg-slate-950/30 p-4 font-mono text-sm text-slate-300">
              {content.contact.email}
            </div>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col pulse-glow">
            <ButtonLink href={content.bookingUrl}>
              {content.cta.bookConsultation}
            </ButtonLink>
            <ButtonLink href={content.emailLink} variant="secondary">
              {content.cta.sendEmail}
            </ButtonLink>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}

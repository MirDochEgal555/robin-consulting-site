import type { CSSProperties } from "react";
import { ButtonLink } from "@/components/ui/button-link";
import { SectionShell } from "@/components/section-shell";
import { siteContent } from "@/content/site-content";

export function ContactSection() {
  return (
    <SectionShell
      id="contact"
      eyebrow="Contact"
      title="Book the call or start the conversation by email"
      description="The primary CTA remains the consultation booking link, with email as the secondary path."
    >
      <div
        className="glass-panel reveal-up scroll-tilt-in rounded-[2rem] p-8 sm:p-10"
        style={{ "--delay": "100ms" } as CSSProperties}
      >
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <h3 className="text-2xl font-semibold text-white">
              {siteContent.contact.title}
            </h3>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">
              {siteContent.contact.description}
            </p>
            <div className="mt-6 rounded-3xl border border-white/10 bg-slate-950/30 p-4 font-mono text-sm text-slate-300">
              {siteContent.contact.email}
            </div>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col pulse-glow">
            <ButtonLink href={siteContent.bookingUrl}>
              Book a free consultation
            </ButtonLink>
            <ButtonLink href={siteContent.emailLink} variant="secondary">
              Send an email
            </ButtonLink>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}

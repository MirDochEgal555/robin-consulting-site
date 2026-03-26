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
            <a
              href={siteContent.emailLink}
              className="mt-6 inline-flex rounded-3xl border border-white/10 bg-slate-950/30 p-4 font-mono text-sm text-slate-300 transition hover:border-sky-300/40 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            >
              {siteContent.contact.email}
            </a>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col pulse-glow">
            <ButtonLink
              href={siteContent.bookingUrl}
              trackingEvent="cta_click"
              trackingLabel="contact_book_consultation"
              trackingSection="contact"
              conversionType="booking"
            >
              Book a free consultation
            </ButtonLink>
            <ButtonLink
              href={siteContent.emailLink}
              variant="secondary"
              trackingEvent="cta_click"
              trackingLabel="contact_email"
              trackingSection="contact"
              conversionType="email"
            >
              Send an email
            </ButtonLink>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}

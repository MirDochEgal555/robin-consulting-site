import type { CSSProperties } from "react";
import { ButtonLink } from "@/components/ui/button-link";
import { SectionShell } from "@/components/section-shell";
import { ContactForm } from "@/components/sections/contact-form";
import { siteContent } from "@/content/site-content";

export function ContactSection() {
  return (
    <SectionShell
      id="contact"
      eyebrow="Contact"
      title="Book the call, or send the brief first"
      description="The booking link stays primary, with a validated contact form and direct email fallback for people who want to share context before the conversation."
    >
      <div
        className="glass-panel reveal-up scroll-tilt-in rounded-[2rem] p-8 sm:p-10"
        style={{ "--delay": "100ms" } as CSSProperties}
      >
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
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

            <ul className="mt-6 space-y-3 text-sm leading-7 text-slate-300">
              {siteContent.contact.highlights.map((item) => (
                <li
                  key={item}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3"
                >
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row lg:flex-col pulse-glow">
              <ButtonLink href={siteContent.bookingUrl}>
                Book a free consultation
              </ButtonLink>
              <ButtonLink href={siteContent.emailLink} variant="secondary">
                Send an email
              </ButtonLink>
            </div>
          </div>
          <div>
            <ContactForm />
          </div>
        </div>
      </div>
    </SectionShell>
  );
}

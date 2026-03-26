"use client";

import { trackConversion, trackEvent } from "@/lib/analytics";

type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  trackingEvent?: string;
  trackingLabel?: string;
  trackingSection?: string;
  conversionType?: "booking" | "email";
  ariaLabel?: string;
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  trackingEvent,
  trackingLabel,
  trackingSection,
  conversionType,
  ariaLabel,
}: ButtonLinkProps) {
  const styles =
    variant === "primary"
      ? "bg-sky-400 text-slate-950 hover:bg-sky-300"
      : "border border-white/[0.15] bg-white/[0.05] text-white hover:border-sky-300/50 hover:bg-white/[0.1]";

  const external = href.startsWith("http");

  const handleClick = () => {
    if (trackingEvent) {
      trackEvent(trackingEvent, {
        cta_label: trackingLabel,
        cta_section: trackingSection,
        cta_url: href,
      });
    }

    if (!conversionType) {
      return;
    }

    trackConversion(conversionType, {
      cta_label: trackingLabel,
      cta_section: trackingSection,
      cta_url: href,
    });
  };

  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      aria-label={ariaLabel}
      onClick={handleClick}
      className={`inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-medium transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_16px_36px_rgba(14,165,233,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 ${styles}`}
    >
      {children}
    </a>
  );
}

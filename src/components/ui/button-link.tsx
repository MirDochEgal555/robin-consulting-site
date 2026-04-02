import Link from "next/link";

type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  trackingEvent?: "cta_click";
  trackingLabel?: string;
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  trackingEvent,
  trackingLabel,
}: ButtonLinkProps) {
  const styles =
    variant === "primary"
      ? "bg-sky-400 text-slate-950 hover:bg-sky-300"
      : "border border-white/[0.15] bg-white/[0.05] text-white hover:border-sky-300/50 hover:bg-white/[0.1]";

  const external = href.startsWith("http");
  const specialScheme = href.startsWith("mailto:") || href.startsWith("#");
  const className = `inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-medium transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_16px_36px_rgba(14,165,233,0.18)] ${styles}`;

  if (!external && !specialScheme) {
    return (
      <Link
        href={href}
        className={className}
        data-analytics-event={trackingEvent}
        data-analytics-label={trackingLabel}
      >
        {children}
      </Link>
    );
  }

  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className={className}
      data-analytics-event={trackingEvent}
      data-analytics-label={trackingLabel}
    >
      {children}
    </a>
  );
}

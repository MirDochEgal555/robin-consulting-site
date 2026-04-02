import Link from "next/link";
import type { SiteContent } from "@/content/site-content";

type SiteFooterProps = {
  content: SiteContent;
  dashboardHref: string;
  dashboardLabel: string;
};

export function SiteFooter({
  content,
  dashboardHref,
  dashboardLabel,
}: SiteFooterProps) {
  return (
    <footer className="border-t border-white/10 py-8">
      <div className="container-shell flex flex-col gap-3 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
        <div>{content.companyName}</div>
        <div className="flex items-center gap-3">
          <Link
            href={dashboardHref}
            className="rounded-full border border-white/10 px-3 py-1 font-mono text-xs uppercase tracking-[0.18em] text-slate-400 transition hover:border-sky-300/35 hover:text-sky-200"
          >
            {dashboardLabel}
          </Link>
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-slate-500">
            {content.footerTagline}
          </div>
        </div>
      </div>
    </footer>
  );
}

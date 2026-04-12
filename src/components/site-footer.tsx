import Link from "next/link";
import { ConsentPreferencesButton } from "@/components/consent-preferences-button";
import type { SiteContent } from "@/content/site-content";
import { getPagePath } from "@/content/site-pages";

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
  const legalNoticeHref = getPagePath(content.locale, "legalNotice");
  const privacyHref = getPagePath(content.locale, "privacy");

  return (
    <footer className="border-t border-white/10 py-8">
      <div className="container-shell flex flex-col gap-4 text-sm text-slate-400 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-3">
          <div>{content.companyName}</div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href={legalNoticeHref}
              className="rounded-full border border-white/10 px-3 py-1 font-mono text-xs uppercase tracking-[0.18em] text-slate-400 transition hover:border-sky-300/35 hover:text-sky-200"
            >
              {content.footerLinks.legalNotice}
            </Link>
            <Link
              href={privacyHref}
              className="rounded-full border border-white/10 px-3 py-1 font-mono text-xs uppercase tracking-[0.18em] text-slate-400 transition hover:border-sky-300/35 hover:text-sky-200"
            >
              {content.footerLinks.privacy}
            </Link>
            <ConsentPreferencesButton label={content.footerLinks.cookieSettings} />
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3">
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

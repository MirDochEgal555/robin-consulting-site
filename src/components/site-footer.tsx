import type { SiteContent } from "@/content/site-content";

type SiteFooterProps = {
  content: SiteContent;
};

export function SiteFooter({ content }: SiteFooterProps) {
  return (
    <footer className="border-t border-white/10 py-8">
      <div className="container-shell flex flex-col gap-3 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
        <div>{content.companyName}</div>
        <div className="font-mono text-xs uppercase tracking-[0.2em] text-slate-500">
          {content.footerTagline}
        </div>
      </div>
    </footer>
  );
}

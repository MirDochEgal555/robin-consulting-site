import { siteContent } from "@/content/site-content";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 py-8">
      <div className="container-shell flex flex-col gap-3 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
        <div>{siteContent.companyName}</div>
        <div className="font-mono text-xs uppercase tracking-[0.2em] text-slate-500">
          Clear systems. Faster decisions.
        </div>
      </div>
    </footer>
  );
}


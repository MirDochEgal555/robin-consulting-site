import { siteContent } from "@/content/site-content";
import { ButtonLink } from "@/components/ui/button-link";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/65 backdrop-blur-xl">
      <div className="container-shell flex items-center justify-between gap-4 py-4">
        <a href="#top" className="flex flex-col">
          <span className="text-sm font-medium uppercase tracking-[0.16em] text-sky-300">
            Robin Keim
          </span>
          <span className="text-sm text-slate-400">IT Consulting</span>
        </a>
        <nav className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
          {siteContent.navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="transition hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <ButtonLink href={siteContent.bookingUrl}>Book a free consultation</ButtonLink>
      </div>
    </header>
  );
}


import type { CSSProperties } from "react";
import { PageIntro } from "@/components/page-intro";
import { PageShell } from "@/components/page-shell";
import { ContactSection } from "@/components/sections/contact-section";
import { getSiteContent, type SiteLocale } from "@/content/site-content";
import { getPageDefinition } from "@/content/site-pages";

type BlogPageProps = {
  locale: SiteLocale;
};

export function BlogPage({ locale }: BlogPageProps) {
  const content = getSiteContent(locale);
  const page = getPageDefinition(locale, "blog");
  const pageNavItems = [
    { label: content.sections.overviewLabel, href: "#overview" },
    { label: content.sections.contact.eyebrow, href: "#contact" },
  ];

  if (!page.intro || !page.emptyState) {
    return null;
  }

  return (
    <PageShell
      locale={locale}
      pageKey="blog"
      brandHref="#overview"
      pageNavItems={pageNavItems}
    >
      <PageIntro
        id="overview"
        eyebrow={page.intro.eyebrow}
        title={page.intro.title}
        description={page.intro.description}
      />
      <section className="pb-20 sm:pb-24">
        <div className="container-shell">
          <article
            className="glass-panel reveal-up scroll-tilt-in rounded-[2rem] p-8 sm:p-10"
            style={{ "--delay": "120ms" } as CSSProperties}
          >
            <div className="font-mono text-xs uppercase tracking-[0.2em] text-sky-300">
              {page.emptyState.status}
            </div>
            <h2 className="mt-4 text-3xl font-semibold text-white">
              {page.emptyState.title}
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-8 text-slate-300">
              {page.emptyState.description}
            </p>
          </article>
        </div>
      </section>
      <ContactSection content={content} />
    </PageShell>
  );
}

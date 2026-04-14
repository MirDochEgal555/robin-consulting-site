import { PageIntro } from "@/components/page-intro";
import { PageShell } from "@/components/page-shell";
import { getLegalPageContent } from "@/content/legal-pages";
import { type SiteLocale } from "@/content/site-content";
import { getPagePath } from "@/content/site-pages";

type LegalPageProps = {
  locale: SiteLocale;
  pageKey: "legalNotice" | "privacy";
};

export function LegalPage({ locale, pageKey }: LegalPageProps) {
  const page = getLegalPageContent(locale, pageKey);
  const pageNavItems = page.sections.map((section) => ({
    label: section.title,
    href: `#${section.id}`,
  }));

  return (
    <PageShell
      locale={locale}
      pageKey={pageKey}
      brandHref={getPagePath(locale, "home")}
      pageNavItems={pageNavItems}
      mainClassName="pt-20 pb-12"
    >
      <PageIntro
        id="overview"
        eyebrow={page.eyebrow}
        title={page.title}
        description={page.description}
      />
      <div className="container-shell pb-16 sm:pb-20">
        <div className="grid gap-6">
          {page.sections.map((section) => (
            <section
              key={section.id}
              id={section.id}
              className="anchor-offset glass-panel rounded-[2rem] p-7 sm:p-8"
            >
              <h2 className="text-2xl font-semibold tracking-tight text-white">
                {section.title}
              </h2>
              {section.paragraphs?.map((paragraph) => (
                <p
                  key={paragraph}
                  className="mt-4 max-w-4xl text-sm leading-7 text-slate-300"
                >
                  {paragraph}
                </p>
              ))}
              {section.items?.length ? (
                <ul className="mt-5 space-y-3 text-sm leading-7 text-slate-300">
                  {section.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-[1.25rem] border border-white/10 bg-white/[0.03] px-4 py-3"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
        </div>
      </div>
    </PageShell>
  );
}

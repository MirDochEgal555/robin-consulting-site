import { DashboardPanels } from "@/components/dashboard-panels";
import { PageIntro } from "@/components/page-intro";
import { PageShell } from "@/components/page-shell";
import { getBlogPosts } from "@/content/blog-posts";
import { getSiteContent, type SiteLocale } from "@/content/site-content";
import { getPageDefinition } from "@/content/site-pages";

type DashboardPageProps = {
  locale: SiteLocale;
};

const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
).replace(/\/$/, "");

const analyticsEnabled = Boolean(process.env.NEXT_PUBLIC_ANALYTICS_ID?.trim());

export function DashboardPage({ locale }: DashboardPageProps) {
  const content = getSiteContent(locale);
  const page = getPageDefinition(locale, "dashboard");
  const analyticsLabel = locale === "de" ? "Analytics" : "Analytics";
  const performanceLabel = locale === "de" ? "Performance" : "Performance";
  const localizedRouteCount = 8;
  const localizedBlogPostCount = getBlogPosts(locale).length * 2;
  const indexablePageCount = localizedRouteCount + localizedBlogPostCount;
  const pageNavItems = [
    { label: content.sections.overviewLabel, href: "#overview" },
    { label: analyticsLabel, href: "#analytics" },
    { label: performanceLabel, href: "#performance" },
  ];

  if (!page.intro) {
    return null;
  }

  return (
    <PageShell
      locale={locale}
      pageKey="dashboard"
      brandHref="#dashboard-top"
      pageNavItems={pageNavItems}
      mainClassName="pt-24 pb-8"
    >
      <PageIntro
        id="dashboard-top"
        eyebrow={page.intro.eyebrow}
        title={page.intro.title}
        description={page.intro.description}
      />
      <DashboardPanels
        locale={locale}
        siteUrl={siteUrl}
        analyticsEnabled={analyticsEnabled}
        indexablePageCount={indexablePageCount}
        blogPostCount={localizedBlogPostCount}
        localizedRouteCount={localizedRouteCount}
        robotsUrl={`${siteUrl}/robots.txt`}
        sitemapUrl={`${siteUrl}/sitemap.xml`}
      />
    </PageShell>
  );
}

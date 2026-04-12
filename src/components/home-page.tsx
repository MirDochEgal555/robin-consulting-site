import { AboutSection } from "@/components/sections/about-section";
import { ContactSection } from "@/components/sections/contact-section";
import { HeroSection } from "@/components/sections/hero-section";
import { InsightsSection } from "@/components/sections/insights-section";
import { ProcessSection } from "@/components/sections/process-section";
import { ProjectsTeaserSection } from "@/components/sections/projects-teaser-section";
import { ServicesSection } from "@/components/sections/services-section";
import { PageShell } from "@/components/page-shell";
import { getSiteContent, type SiteLocale } from "@/content/site-content";

type HomePageProps = {
  locale: SiteLocale;
};

export function HomePage({ locale }: HomePageProps) {
  const content = getSiteContent(locale);

  return (
    <PageShell
      locale={locale}
      pageKey="home"
      brandHref="#top"
      pageNavItems={content.navItems}
    >
      <HeroSection content={content} />
      <ServicesSection content={content} showPageLink />
      <ProcessSection content={content} />
      <AboutSection content={content} />
      <ProjectsTeaserSection content={content} />
      <InsightsSection content={content} />
      <ContactSection content={content} />
    </PageShell>
  );
}

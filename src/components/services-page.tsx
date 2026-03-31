import { ContactSection } from "@/components/sections/contact-section";
import { ProcessSection } from "@/components/sections/process-section";
import { ServiceOfferingsSection } from "@/components/sections/service-offerings-section";
import { PageIntro } from "@/components/page-intro";
import { PageShell } from "@/components/page-shell";
import { getSiteContent, type SiteLocale } from "@/content/site-content";
import { getPageDefinition } from "@/content/site-pages";
import { getServicesPageContent } from "@/content/services-page-content";

type ServicesPageProps = {
  locale: SiteLocale;
};

export function ServicesPage({ locale }: ServicesPageProps) {
  const content = getSiteContent(locale);
  const page = getPageDefinition(locale, "services");
  const servicesPageContent = getServicesPageContent(locale);
  const pageNavItems = [
    { label: content.sections.overviewLabel, href: "#overview" },
    { label: servicesPageContent.section.eyebrow, href: "#services" },
    { label: content.sections.process.eyebrow, href: "#process" },
    { label: content.sections.contact.eyebrow, href: "#contact" },
  ];

  if (!page.intro) {
    return null;
  }

  return (
    <PageShell
      locale={locale}
      pageKey="services"
      brandHref="#overview"
      pageNavItems={pageNavItems}
    >
      <PageIntro
        id="overview"
        eyebrow={page.intro.eyebrow}
        title={page.intro.title}
        description={page.intro.description}
      />
      <ServiceOfferingsSection locale={locale} />
      <ProcessSection content={content} />
      <ContactSection content={content} />
    </PageShell>
  );
}

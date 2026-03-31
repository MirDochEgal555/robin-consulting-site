import { AboutSection } from "@/components/sections/about-section";
import { ContactSection } from "@/components/sections/contact-section";
import { HeroSection } from "@/components/sections/hero-section";
import { ProcessSection } from "@/components/sections/process-section";
import { ServicesSection } from "@/components/sections/services-section";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { LangSync } from "@/components/lang-sync";
import { getSiteContent, type SiteLocale } from "@/content/site-content";

type HomePageProps = {
  locale: SiteLocale;
};

export function HomePage({ locale }: HomePageProps) {
  const content = getSiteContent(locale);

  return (
    <div className="relative overflow-x-hidden">
      <LangSync lang={content.lang} />
      <SiteHeader content={content} />
      <main className="pt-24">
        <HeroSection content={content} />
        <ServicesSection content={content} />
        <ProcessSection content={content} />
        <AboutSection content={content} />
        <ContactSection content={content} />
      </main>
      <SiteFooter content={content} />
    </div>
  );
}

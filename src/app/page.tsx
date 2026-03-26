import { AboutSection } from "@/components/sections/about-section";
import { ContactSection } from "@/components/sections/contact-section";
import { HeroSection } from "@/components/sections/hero-section";
import { ProcessSection } from "@/components/sections/process-section";
import { ProofSection } from "@/components/sections/proof-section";
import { ServicesSection } from "@/components/sections/services-section";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function HomePage() {
  return (
    <div className="relative overflow-x-hidden">
      <SiteHeader />
      <main className="pt-24">
        <HeroSection />
        <ServicesSection />
        <ProcessSection />
        <AboutSection />
        <ProofSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </div>
  );
}

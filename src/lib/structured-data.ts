import { siteContent } from "@/content/site-content";
import { ogImageUrl, siteConfig, siteUrl } from "@/lib/site-config";

const serviceCatalog = {
  "@type": "OfferCatalog",
  name: "Consulting services",
  itemListElement: siteContent.services.map((service, index) => ({
    "@type": "Offer",
    position: index + 1,
    itemOffered: {
      "@type": "Service",
      name: service.title,
      description: service.description,
      serviceType: service.eyebrow,
    },
  })),
};

export function getHomePageStructuredData() {
  return [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: siteConfig.siteName,
      description: siteConfig.description,
      inLanguage: "en",
      publisher: {
        "@id": `${siteUrl}/#professional-service`,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      "@id": `${siteUrl}/#professional-service`,
      name: siteConfig.companyName,
      description: siteConfig.description,
      url: siteUrl,
      image: ogImageUrl,
      email: siteContent.email,
      founder: {
        "@type": "Person",
        name: siteConfig.personName,
      },
      areaServed: {
        "@type": "Place",
        name: "Remote",
      },
      knowsAbout: siteConfig.keywords,
      hasOfferCatalog: serviceCatalog,
    },
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${siteUrl}/#webpage`,
      url: siteUrl,
      name: siteConfig.title,
      description: siteConfig.description,
      isPartOf: {
        "@id": `${siteUrl}/#website`,
      },
      about: {
        "@id": `${siteUrl}/#professional-service`,
      },
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: ogImageUrl,
      },
    },
  ];
}

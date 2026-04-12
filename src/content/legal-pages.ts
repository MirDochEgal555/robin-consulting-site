import type { Metadata } from "next";
import type { SiteLocale } from "@/content/site-content";
import { getPagePath } from "@/content/site-pages";

type LegalSection = {
  id: string;
  title: string;
  paragraphs?: string[];
  items?: string[];
};

type LegalPageContent = {
  eyebrow: string;
  title: string;
  description: string;
  sections: LegalSection[];
};

export type LegalPageKind = "legalNotice" | "privacy";

const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
).replace(/\/$/, "");

const legalIdentity = {
  name: "Robin Keim",
  legalFormEn: "Freelance IT consultant",
  legalFormDe: "Freiberufliche IT-Beratung",
  street: "Meistersingerstrasse 1",
  city: "68199 Mannheim",
  country: "Germany",
  email: "robin@keim-consulting.com",
  phone: "+49 176 51971186",
  editoriallyResponsible: "Robin Keim",
  hostingProvider: "GitHub Pages",
  emailProvider: "IONOS",
  bookingProvider: "Cal.eu / Cal.com",
  analyticsProvider: "Google Analytics 4",
} as const;

const legalContent: Record<SiteLocale, Record<LegalPageKind, LegalPageContent>> = {
  en: {
    legalNotice: {
      eyebrow: "Legal",
      title: "Legal Notice",
      description:
        "Provider identification and mandatory disclosures for this website.",
      sections: [
        {
          id: "provider",
          title: "Provider Information",
          paragraphs: [
            `${legalIdentity.name}`,
            legalIdentity.legalFormEn,
            `${legalIdentity.street}, ${legalIdentity.city}, ${legalIdentity.country}`,
            `Email: ${legalIdentity.email}`,
            `Phone: ${legalIdentity.phone}`,
          ],
        },
        {
          id: "status",
          title: "Professional Status",
          items: [
            "Independent freelancer",
            "No entry in a commercial register",
            "No VAT ID currently issued",
          ],
        },
        {
          id: "editorial",
          title: "Responsible For Editorial Content",
          paragraphs: [
            `Responsible for content according to Section 18(2) MStV: ${legalIdentity.editoriallyResponsible}, ${legalIdentity.street}, ${legalIdentity.city}, ${legalIdentity.country}.`,
          ],
        },
        {
          id: "dispute",
          title: "Consumer Dispute Resolution",
          paragraphs: [
            "The provider is not willing and not obliged to participate in dispute resolution proceedings before a consumer arbitration board.",
          ],
        },
      ],
    },
    privacy: {
      eyebrow: "Privacy",
      title: "Privacy Policy",
      description:
        "Information about how personal data is processed on this website, in direct contact, and in the booking flow.",
      sections: [
        {
          id: "controller",
          title: "Controller",
          paragraphs: [
            `${legalIdentity.name}`,
            `${legalIdentity.street}, ${legalIdentity.city}, ${legalIdentity.country}`,
            `Email: ${legalIdentity.email}`,
            `Phone: ${legalIdentity.phone}`,
          ],
        },
        {
          id: "hosting",
          title: "Website Delivery And Hosting",
          paragraphs: [
            `This website is published via ${legalIdentity.hostingProvider}. When you visit the site, technical access data may be processed to deliver the page, maintain availability, and protect the service from misuse.`,
            "This can include IP address, date and time of access, requested URL, referrer, browser information, and device metadata.",
            "The legal basis is Article 6(1)(f) GDPR. The legitimate interest is the secure and reliable delivery of the website.",
          ],
        },
        {
          id: "contact",
          title: "Contact By Email",
          paragraphs: [
            `If you contact me by email or by clicking a mailto link, I process the information you provide to handle your request. This usually includes your name, email address, message contents, and any follow-up communication.`,
            `The email infrastructure is provided through ${legalIdentity.emailProvider}.`,
            "The legal basis is Article 6(1)(b) GDPR when the contact relates to a potential contract or pre-contractual steps, and otherwise Article 6(1)(f) GDPR for efficient communication.",
            "The data is retained for as long as needed to process the request and for any additional period required by law.",
          ],
        },
        {
          id: "booking",
          title: "Booking Appointments Via Cal.eu",
          paragraphs: [
            `The website links to an external booking service provided through ${legalIdentity.bookingProvider}. When you follow that link, you leave this website and submit appointment data directly to that provider.`,
            "The booking flow currently asks for name, email address, and additional notes.",
            "The legal basis is Article 6(1)(b) GDPR for pre-contractual communication and appointment scheduling, and Article 6(1)(f) GDPR for an efficient booking process.",
            "Please also review the provider's own privacy information before submitting a booking request: https://cal.com/privacy",
          ],
        },
        {
          id: "consent",
          title: "Consent Banner And Storage Of Your Choice",
          paragraphs: [
            "This website uses a consent banner to ask whether optional analytics may be activated. Your decision is stored in your browser so the website can remember and respect it on later visits.",
            "This storage is limited to the consent preference itself and is used to manage your privacy choice.",
          ],
        },
        {
          id: "analytics",
          title: "Optional Analytics",
          paragraphs: [
            `If you consent, the site stores first-party analytics data in your browser and may forward analytics events to ${legalIdentity.analyticsProvider}. Without consent, these analytics features remain disabled.`,
            "The locally stored analytics can include visited paths, page titles, CTA clicks, outbound link clicks, email clicks, language switches, and basic performance metrics such as TTFB, FCP, LCP, and CLS.",
            "The legal basis is your consent under Article 6(1)(a) GDPR together with Section 25(1) TDDDG.",
            "You can withdraw or change your choice at any time through the cookie settings control in the footer.",
          ],
        },
        {
          id: "google-analytics",
          title: "Google Analytics 4",
          paragraphs: [
            "If consent is granted and Google Analytics is configured, analytics data is also forwarded to Google Analytics 4.",
            "This may include information about pages viewed, interactions on the site, browser and device details, and identifiers used by Google Analytics to recognize returning browsers. According to Google's documentation, Google Analytics may also process data in third countries, especially the United States.",
            "The legal basis is your consent under Article 6(1)(a) GDPR together with Section 25(1) TDDDG.",
            "More information from Google: https://support.google.com/analytics/answer/6004245 and https://policies.google.com/privacy",
          ],
        },
        {
          id: "rights",
          title: "Your Rights",
          items: [
            "Right of access to your stored personal data",
            "Right to rectification of inaccurate data",
            "Right to erasure where the legal requirements are met",
            "Right to restriction of processing",
            "Right to data portability",
            "Right to object to processing based on Article 6(1)(f) GDPR",
            "Right to withdraw consent at any time with future effect",
            "Right to lodge a complaint with a supervisory authority",
          ],
        },
        {
          id: "misc",
          title: "Additional Information",
          paragraphs: [
            "Providing contact or booking data is voluntary. However, without the required information it may not be possible to answer your request or schedule an appointment.",
            "This website does not use automated decision-making or profiling within the meaning of Article 22 GDPR.",
          ],
        },
      ],
    },
  },
  de: {
    legalNotice: {
      eyebrow: "Rechtliches",
      title: "Impressum",
      description:
        "Anbieterkennzeichnung und Pflichtangaben fuer diese Website.",
      sections: [
        {
          id: "anbieter",
          title: "Angaben gemaess Paragraf 5 DDG",
          paragraphs: [
            legalIdentity.name,
            legalIdentity.legalFormDe,
            `${legalIdentity.street}, ${legalIdentity.city}, ${legalIdentity.country}`,
            `E-Mail: ${legalIdentity.email}`,
            `Telefon: ${legalIdentity.phone}`,
          ],
        },
        {
          id: "status",
          title: "Beruflicher Status",
          items: [
            "Freiberufliche Taetigkeit",
            "Keine Eintragung im Handelsregister",
            "Derzeit keine USt-IdNr. vorhanden",
          ],
        },
        {
          id: "redaktion",
          title: "Verantwortlich Fuer Redaktionelle Inhalte",
          paragraphs: [
            `Verantwortlich fuer journalistisch-redaktionelle Inhalte gemaess Paragraf 18 Abs. 2 MStV: ${legalIdentity.editoriallyResponsible}, ${legalIdentity.street}, ${legalIdentity.city}, ${legalIdentity.country}.`,
          ],
        },
        {
          id: "streitbeilegung",
          title: "Verbraucherstreitbeilegung",
          paragraphs: [
            "Ich bin nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.",
          ],
        },
      ],
    },
    privacy: {
      eyebrow: "Datenschutz",
      title: "Datenschutzerklaerung",
      description:
        "Informationen zur Verarbeitung personenbezogener Daten auf dieser Website sowie bei Kontakt und Terminbuchung.",
      sections: [
        {
          id: "verantwortlicher",
          title: "Verantwortlicher",
          paragraphs: [
            legalIdentity.name,
            `${legalIdentity.street}, ${legalIdentity.city}, ${legalIdentity.country}`,
            `E-Mail: ${legalIdentity.email}`,
            `Telefon: ${legalIdentity.phone}`,
          ],
        },
        {
          id: "hosting",
          title: "Bereitstellung Der Website Und Hosting",
          paragraphs: [
            `Diese Website wird ueber ${legalIdentity.hostingProvider} veroeffentlicht. Beim Aufruf der Seite koennen technische Zugriffsdaten verarbeitet werden, um die Seite auszuliefern, die Verfuegbarkeit sicherzustellen und Missbrauch zu verhindern.`,
            "Dazu koennen insbesondere IP-Adresse, Datum und Uhrzeit des Zugriffs, angeforderte URL, Referrer, Browserangaben und Geraetemerkmale gehoeren.",
            "Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO. Das berechtigte Interesse liegt in der sicheren und zuverlaessigen Bereitstellung der Website.",
          ],
        },
        {
          id: "kontakt",
          title: "Kontakt Per E-Mail",
          paragraphs: [
            "Wenn Sie mich per E-Mail kontaktieren oder einen mailto-Link nutzen, verarbeite ich die von Ihnen uebermittelten Daten zur Bearbeitung Ihrer Anfrage. Dazu gehoeren regelmaessig Name, E-Mail-Adresse, Nachrichteninhalt und die weitere Korrespondenz.",
            `Die E-Mail-Infrastruktur wird ueber ${legalIdentity.emailProvider} bereitgestellt.`,
            "Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, soweit es um vorvertragliche Anfragen geht, und im Uebrigen Art. 6 Abs. 1 lit. f DSGVO fuer eine effiziente Kommunikation.",
            "Die Daten werden gespeichert, solange dies fuer die Bearbeitung der Anfrage erforderlich ist und soweit gesetzliche Aufbewahrungspflichten bestehen.",
          ],
        },
        {
          id: "buchung",
          title: "Terminbuchung Ueber Cal.eu",
          paragraphs: [
            `Diese Website verlinkt auf einen externen Buchungsdienst von ${legalIdentity.bookingProvider}. Wenn Sie den Link nutzen, verlassen Sie diese Website und uebermitteln Ihre Termindaten direkt an den Anbieter.`,
            "Im Buchungsprozess werden derzeit Name, E-Mail-Adresse und zusaetzliche Notizen abgefragt.",
            "Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO fuer vorvertragliche Kommunikation und Terminvereinbarung sowie Art. 6 Abs. 1 lit. f DSGVO fuer eine effiziente Terminorganisation.",
            "Bitte beachten Sie ausserdem die Datenschutzhinweise des Anbieters: https://cal.com/privacy",
          ],
        },
        {
          id: "einwilligung",
          title: "Cookie-Banner Und Speicherung Ihrer Auswahl",
          paragraphs: [
            "Diese Website verwendet ein Consent-Banner, um Sie nach Ihrer Einwilligung fuer optionale Analytics-Funktionen zu fragen. Ihre Auswahl wird im Browser gespeichert, damit sie bei spaeteren Besuchen beachtet werden kann.",
            "Gespeichert wird dabei nur die Consent-Entscheidung selbst, um Ihre Datenschutz-Auswahl zu verwalten.",
          ],
        },
        {
          id: "analytics",
          title: "Optionale Analytics",
          paragraphs: [
            `Wenn Sie einwilligen, speichert die Website First-Party-Analytics lokal in Ihrem Browser und kann Events an ${legalIdentity.analyticsProvider} weiterleiten. Ohne Einwilligung bleiben diese Funktionen deaktiviert.`,
            "Zu den lokal gespeicherten Analytics-Daten koennen besuchte Pfade, Seitentitel, CTA-Klicks, externe Link-Klicks, E-Mail-Klicks, Sprachwechsel und grundlegende Performance-Metriken wie TTFB, FCP, LCP und CLS gehoeren.",
            "Rechtsgrundlage ist Ihre Einwilligung gemaess Art. 6 Abs. 1 lit. a DSGVO in Verbindung mit Section 25 Abs. 1 TDDDG.",
            "Sie koennen Ihre Auswahl jederzeit ueber die Cookie-Einstellungen im Footer aendern oder widerrufen.",
          ],
        },
        {
          id: "ga4",
          title: "Google Analytics 4",
          paragraphs: [
            "Sofern eine Einwilligung vorliegt und Google Analytics konfiguriert ist, werden Analytics-Daten auch an Google Analytics 4 uebermittelt.",
            "Dabei koennen Informationen ueber Seitenaufrufe, Interaktionen auf der Website, Browser- und Geraeteinformationen sowie Kennungen verarbeitet werden, mit denen wiederkehrende Browser erkannt werden. Nach den Angaben von Google kann es dabei auch zu Verarbeitungen in Drittstaaten, insbesondere in den USA, kommen.",
            "Rechtsgrundlage ist Ihre Einwilligung gemaess Art. 6 Abs. 1 lit. a DSGVO in Verbindung mit Section 25 Abs. 1 TDDDG.",
            "Weitere Informationen von Google: https://support.google.com/analytics/answer/6004245 und https://policies.google.com/privacy",
          ],
        },
        {
          id: "rechte",
          title: "Ihre Rechte",
          items: [
            "Recht auf Auskunft ueber Ihre gespeicherten personenbezogenen Daten",
            "Recht auf Berichtigung unrichtiger Daten",
            "Recht auf Loeschung, soweit die gesetzlichen Voraussetzungen vorliegen",
            "Recht auf Einschraenkung der Verarbeitung",
            "Recht auf Datenuebertragbarkeit",
            "Recht auf Widerspruch gegen Verarbeitungen auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO",
            "Recht, eine erteilte Einwilligung jederzeit mit Wirkung fuer die Zukunft zu widerrufen",
            "Recht auf Beschwerde bei einer Aufsichtsbehoerde",
          ],
        },
        {
          id: "sonstiges",
          title: "Weitere Hinweise",
          paragraphs: [
            "Die Bereitstellung von Kontakt- oder Buchungsdaten erfolgt freiwillig. Ohne die erforderlichen Angaben kann eine Anfrage jedoch moeglicherweise nicht beantwortet oder ein Termin nicht geplant werden.",
            "Eine automatisierte Entscheidungsfindung oder ein Profiling im Sinne des Art. 22 DSGVO findet nicht statt.",
          ],
        },
      ],
    },
  },
};

export function getLegalPageContent(locale: SiteLocale, pageKey: LegalPageKind) {
  return legalContent[locale][pageKey];
}

export function getLegalPageMetadata(
  locale: SiteLocale,
  pageKey: LegalPageKind,
): Metadata {
  const content = getLegalPageContent(locale, pageKey);
  const path = getPagePath(locale, pageKey);
  const alternateLocale = locale === "de" ? "en" : "de";

  return {
    title: content.title,
    description: content.description,
    alternates: {
      canonical: path,
      languages: {
        en: getPagePath("en", pageKey),
        de: getPagePath("de", pageKey),
      },
    },
    openGraph: {
      title: content.title,
      description: content.description,
      url: path === "/" ? siteUrl : `${siteUrl}${path}`,
      siteName: "Robin Consulting",
      type: "website",
      locale: locale === "de" ? "de_DE" : "en_US",
      alternateLocale: alternateLocale === "de" ? "de_DE" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: content.title,
      description: content.description,
    },
  };
}

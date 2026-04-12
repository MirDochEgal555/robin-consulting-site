"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ConsentBanner } from "@/components/consent-banner";
import { getPagePath } from "@/content/site-pages";
import { trackAnalyticsEvent, trackMetric, trackPageView } from "@/lib/site-analytics";
import {
  SITE_CONSENT_UPDATE_EVENT,
  getSiteConsentStatus,
  type SiteConsentStatus,
} from "@/lib/site-consent";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (
      command: "js" | "config" | "event",
      targetId: string | Date,
      params?: Record<string, string | number | boolean>,
    ) => void;
  }
}

const analyticsId = process.env.NEXT_PUBLIC_ANALYTICS_ID?.trim();
const GA_READY_EVENT = "rk-site-ga:ready";

function getLocaleFromPath(pathname: string) {
  return pathname.startsWith("/de") ? "de" : "en";
}

function isExternalUrl(url: URL) {
  return url.origin !== window.location.origin;
}

export function SiteAnalytics() {
  const pathname = usePathname() ?? "/";
  const initialPathnameRef = useRef(pathname);
  const [consentStatus, setConsentStatus] = useState<SiteConsentStatus>("pending");
  const [gaReady, setGaReady] = useState(false);
  const locale = getLocaleFromPath(pathname);

  useEffect(() => {
    const syncConsent = () => {
      const nextStatus = getSiteConsentStatus();
      setConsentStatus(nextStatus);

      if (nextStatus !== "accepted") {
        setGaReady(false);
      }
    };

    syncConsent();
    window.addEventListener(SITE_CONSENT_UPDATE_EVENT, syncConsent);

    return () => {
      window.removeEventListener(SITE_CONSENT_UPDATE_EVENT, syncConsent);
    };
  }, []);

  useEffect(() => {
    if (consentStatus !== "accepted") {
      return;
    }

    trackPageView({
      path: pathname,
      title: document.title,
      locale,
    });
  }, [consentStatus, locale, pathname]);

  useEffect(() => {
    if (consentStatus !== "accepted" || !analyticsId || !gaReady || !window.gtag) {
      return;
    }

    window.gtag("event", "page_view", {
      page_path: pathname,
      page_title: document.title,
      page_location: window.location.href,
      send_to: analyticsId,
    });
  }, [consentStatus, gaReady, pathname]);

  useEffect(() => {
    const markGaReady = () => {
      setGaReady(true);
    };

    window.addEventListener(GA_READY_EVENT, markGaReady);

    return () => {
      window.removeEventListener(GA_READY_EVENT, markGaReady);
    };
  }, []);

  useEffect(() => {
    if (consentStatus !== "accepted") {
      return;
    }

    const flushNavigationMetrics = () => {
      const navigationEntry = performance.getEntriesByType(
        "navigation",
      )[0] as PerformanceNavigationTiming | undefined;

      if (navigationEntry) {
        trackMetric({
          name: "TTFB",
          path: initialPathnameRef.current,
          value: navigationEntry.responseStart,
        });
      }

      const paintEntries = performance.getEntriesByType(
        "paint",
      ) as PerformanceEntry[];
      const fcpEntry = paintEntries.find(
        (entry) => entry.name === "first-contentful-paint",
      );

      if (fcpEntry) {
        trackMetric({
          name: "FCP",
          path: initialPathnameRef.current,
          value: fcpEntry.startTime,
        });
      }
    };

    flushNavigationMetrics();

    let lcpValue = 0;
    let clsValue = 0;

    const lcpObserver =
      typeof PerformanceObserver === "undefined"
        ? null
        : new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            const lastEntry = entries[entries.length - 1];

            if (lastEntry) {
              lcpValue = lastEntry.startTime;
            }
          });

    const clsObserver =
      typeof PerformanceObserver === "undefined"
        ? null
        : new PerformanceObserver((entryList) => {
            for (const entry of entryList.getEntries()) {
              const layoutShift = entry as PerformanceEntry & {
                hadRecentInput?: boolean;
                value?: number;
              };

              if (!layoutShift.hadRecentInput) {
                clsValue += layoutShift.value ?? 0;
              }
            }
          });

    try {
      lcpObserver?.observe({ type: "largest-contentful-paint", buffered: true });
      clsObserver?.observe({ type: "layout-shift", buffered: true });
    } catch {
      return;
    }

    const flushBufferedMetrics = () => {
      if (lcpValue > 0) {
        trackMetric({
          name: "LCP",
          path: initialPathnameRef.current,
          value: lcpValue,
        });
      }

      if (clsValue > 0) {
        trackMetric({
          name: "CLS",
          path: initialPathnameRef.current,
          value: clsValue,
        });
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        flushBufferedMetrics();
        lcpObserver?.disconnect();
        clsObserver?.disconnect();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      flushBufferedMetrics();
      lcpObserver?.disconnect();
      clsObserver?.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [consentStatus]);

  useEffect(() => {
    if (consentStatus !== "accepted") {
      return;
    }

    const handleDocumentClick = (event: MouseEvent) => {
      const target = event.target;

      if (!(target instanceof Element)) {
        return;
      }

      const link = target.closest("a");

      if (!link) {
        return;
      }

      const href = link.getAttribute("href");

      if (!href) {
        return;
      }

      const dataEvent = link.getAttribute("data-analytics-event");
      const dataLabel = link.getAttribute("data-analytics-label") ?? link.textContent?.trim() ?? href;
      if (dataEvent === "cta_click") {
        trackAnalyticsEvent({
          type: "cta_click",
          label: dataLabel,
          path: pathname,
          href,
          locale,
        });

        return;
      }

      if (dataEvent === "locale_switch") {
        trackAnalyticsEvent({
          type: "locale_switch",
          label: dataLabel,
          path: pathname,
          href,
          locale,
        });

        return;
      }

      if (href.startsWith("mailto:")) {
        trackAnalyticsEvent({
          type: "email_click",
          label: dataLabel,
          path: pathname,
          href,
          locale,
        });

        return;
      }

      if (href.startsWith("http://") || href.startsWith("https://")) {
        try {
          const url = new URL(href);

          if (isExternalUrl(url)) {
            trackAnalyticsEvent({
              type: "outbound_click",
              label: dataLabel,
              path: pathname,
              href,
              locale,
            });
          }
        } catch {
          return;
        }
      }
    };

    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [consentStatus, locale, pathname]);

  return (
    <>
      <ConsentBanner
        locale={locale}
        legalNoticeHref={getPagePath(locale, "legalNotice")}
        privacyHref={getPagePath(locale, "privacy")}
      />
      {consentStatus === "accepted" && analyticsId ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${analyticsId}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              window.gtag = gtag;
              gtag('js', new Date());
              gtag('config', '${analyticsId}', { send_page_view: false });
              window.dispatchEvent(new Event('${GA_READY_EVENT}'));
            `}
          </Script>
        </>
      ) : null}
    </>
  );
}

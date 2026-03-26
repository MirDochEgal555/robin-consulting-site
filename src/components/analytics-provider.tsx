"use client";

import { useReportWebVitals } from "next/web-vitals";
import Script from "next/script";
import { getPerformanceTarget, trackEvent } from "@/lib/analytics";
import { siteConfig } from "@/lib/site-config";

type WebVitalMetric = {
  delta: number;
  id: string;
  name: string;
  navigationType: string;
  rating: string;
  value: number;
};

function roundMetricValue(metric: WebVitalMetric) {
  if (metric.name === "CLS") {
    return Number(metric.value.toFixed(3));
  }

  return Math.round(metric.value);
}

function WebVitalsReporter() {
  useReportWebVitals((metric) => {
    const target = getPerformanceTarget(metric.name);
    const value = roundMetricValue(metric as WebVitalMetric);

    trackEvent("web_vital", {
      metric_id: metric.id,
      metric_name: metric.name,
      metric_value: value,
      metric_delta:
        metric.name === "CLS" ? Number(metric.delta.toFixed(3)) : Math.round(metric.delta),
      metric_rating: metric.rating,
      navigation_type: metric.navigationType,
    });

    if (target === undefined || metric.value <= target) {
      return;
    }

    trackEvent("performance_target_miss", {
      metric_name: metric.name,
      metric_value: value,
      metric_target: target,
      metric_rating: metric.rating,
    });
  });

  return null;
}

export function AnalyticsProvider() {
  if (!siteConfig.analyticsId) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${siteConfig.analyticsId}`}
        strategy="afterInteractive"
      />
      <Script id="google-tag-manager" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${siteConfig.analyticsId}', {
            page_path: window.location.pathname,
            send_page_view: true
          });
        `}
      </Script>
      <WebVitalsReporter />
    </>
  );
}

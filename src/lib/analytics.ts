import { siteConfig } from "@/lib/site-config";

type AnalyticsValue = boolean | number | string | undefined;
type AnalyticsParams = Record<string, AnalyticsValue>;
type ConversionKind = "booking" | "email";
type SupportedVitalName = "CLS" | "FCP" | "INP" | "LCP" | "TTFB";

type AnalyticsWindow = Window & {
  dataLayer?: Array<Record<string, AnalyticsValue>>;
  gtag?: (
    command: "config" | "event" | "js",
    target: Date | string,
    params?: AnalyticsParams,
  ) => void;
};

const conversionTargets: Record<ConversionKind, string | undefined> = {
  booking: siteConfig.bookingConversionId,
  email: siteConfig.emailConversionId,
};

export const performanceTargets: Record<SupportedVitalName, number> = {
  CLS: 0.1,
  FCP: 1800,
  INP: 200,
  LCP: 2500,
  TTFB: 800,
};

function getWindow(): AnalyticsWindow | undefined {
  if (typeof window === "undefined") {
    return undefined;
  }

  return window as AnalyticsWindow;
}

function withDefaults(params: AnalyticsParams = {}) {
  const analyticsWindow = getWindow();

  return {
    page_location: analyticsWindow?.location.href ?? siteConfig.siteUrl,
    page_title: analyticsWindow?.document.title ?? siteConfig.title,
    transport_type: "beacon",
    ...params,
  };
}

export function trackEvent(eventName: string, params: AnalyticsParams = {}) {
  const analyticsWindow = getWindow();

  if (!analyticsWindow) {
    return;
  }

  const normalizedParams = withDefaults(params);

  analyticsWindow.dataLayer = analyticsWindow.dataLayer ?? [];
  analyticsWindow.dataLayer.push({
    event: eventName,
    ...normalizedParams,
  });

  analyticsWindow.gtag?.("event", eventName, normalizedParams);
}

export function trackConversion(
  conversionKind: ConversionKind,
  params: AnalyticsParams = {},
) {
  trackEvent("cta_conversion", {
    conversion_kind: conversionKind,
    ...params,
  });

  const analyticsWindow = getWindow();
  const sendTo = conversionTargets[conversionKind];

  if (!analyticsWindow?.gtag || !sendTo) {
    return;
  }

  analyticsWindow.gtag(
    "event",
    "conversion",
    withDefaults({
      send_to: sendTo,
      conversion_kind: conversionKind,
      ...params,
    }),
  );
}

export function getPerformanceTarget(metricName: string) {
  if (!(metricName in performanceTargets)) {
    return undefined;
  }

  return performanceTargets[metricName as SupportedVitalName];
}

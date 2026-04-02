"use client";

export const ANALYTICS_STORAGE_KEY = "rk-site-pulse";
export const ANALYTICS_UPDATE_EVENT = "rk-site-pulse:update";
const MAX_STORED_EVENTS = 80;

export type AnalyticsEventType =
  | "page_view"
  | "cta_click"
  | "outbound_click"
  | "email_click"
  | "locale_switch";

export type AnalyticsMetricName = "TTFB" | "FCP" | "LCP" | "CLS";
export type AnalyticsMetricRating = "good" | "needs-improvement" | "poor";

export type AnalyticsEvent = {
  id: string;
  type: AnalyticsEventType;
  label: string;
  path: string;
  href?: string;
  locale?: "en" | "de";
  timestamp: string;
};

export type AnalyticsMetric = {
  id: string;
  name: AnalyticsMetricName;
  path: string;
  value: number;
  unit: "ms" | "score";
  rating: AnalyticsMetricRating;
  timestamp: string;
};

export type AnalyticsSnapshot = {
  version: 1;
  sessionId: string;
  firstSeenAt: string;
  lastUpdatedAt: string;
  pageViews: number;
  ctaClicks: number;
  outboundClicks: number;
  emailClicks: number;
  localeSwitches: number;
  pageViewsByPath: Record<string, number>;
  events: AnalyticsEvent[];
  metrics: AnalyticsMetric[];
};

function createId(prefix: string) {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}`;
}

function createInitialSnapshot(): AnalyticsSnapshot {
  const now = new Date().toISOString();

  return {
    version: 1,
    sessionId: createId("session"),
    firstSeenAt: now,
    lastUpdatedAt: now,
    pageViews: 0,
    ctaClicks: 0,
    outboundClicks: 0,
    emailClicks: 0,
    localeSwitches: 0,
    pageViewsByPath: {},
    events: [],
    metrics: [],
  };
}

function isBrowser() {
  return typeof window !== "undefined";
}

function readSnapshotInternal(): AnalyticsSnapshot {
  if (!isBrowser()) {
    return createInitialSnapshot();
  }

  const raw = window.localStorage.getItem(ANALYTICS_STORAGE_KEY);

  if (!raw) {
    return createInitialSnapshot();
  }

  try {
    const parsed = JSON.parse(raw) as AnalyticsSnapshot;

    if (parsed?.version !== 1) {
      return createInitialSnapshot();
    }

    return {
      ...createInitialSnapshot(),
      ...parsed,
      pageViewsByPath: parsed.pageViewsByPath ?? {},
      events: parsed.events ?? [],
      metrics: parsed.metrics ?? [],
    };
  } catch {
    return createInitialSnapshot();
  }
}

function saveSnapshot(snapshot: AnalyticsSnapshot) {
  if (!isBrowser()) {
    return;
  }

  window.localStorage.setItem(ANALYTICS_STORAGE_KEY, JSON.stringify(snapshot));
  window.dispatchEvent(new CustomEvent(ANALYTICS_UPDATE_EVENT, {
    detail: snapshot,
  }));
}

function updateSnapshot(
  updater: (current: AnalyticsSnapshot) => AnalyticsSnapshot,
): AnalyticsSnapshot {
  const nextSnapshot = updater(readSnapshotInternal());
  saveSnapshot(nextSnapshot);

  return nextSnapshot;
}

function isExternalHref(href?: string) {
  return Boolean(href?.startsWith("http://") || href?.startsWith("https://"));
}

export function getAnalyticsSnapshot(): AnalyticsSnapshot {
  return readSnapshotInternal();
}

export function trackAnalyticsEvent(input: {
  type: AnalyticsEventType;
  label: string;
  path: string;
  href?: string;
  locale?: "en" | "de";
}) {
  const timestamp = new Date().toISOString();

  return updateSnapshot((current) => {
    const nextEvent: AnalyticsEvent = {
      id: createId("event"),
      type: input.type,
      label: input.label,
      path: input.path,
      href: input.href,
      locale: input.locale,
      timestamp,
    };

    return {
      ...current,
      lastUpdatedAt: timestamp,
      pageViews:
        input.type === "page_view" ? current.pageViews + 1 : current.pageViews,
      ctaClicks:
        input.type === "cta_click" ? current.ctaClicks + 1 : current.ctaClicks,
      outboundClicks:
        input.type === "outbound_click" ||
        (input.type === "cta_click" && isExternalHref(input.href))
          ? current.outboundClicks + 1
          : current.outboundClicks,
      emailClicks:
        input.type === "email_click" ||
        (input.type === "cta_click" && input.href?.startsWith("mailto:"))
          ? current.emailClicks + 1
          : current.emailClicks,
      localeSwitches:
        input.type === "locale_switch"
          ? current.localeSwitches + 1
          : current.localeSwitches,
      pageViewsByPath:
        input.type === "page_view"
          ? {
              ...current.pageViewsByPath,
              [input.path]: (current.pageViewsByPath[input.path] ?? 0) + 1,
            }
          : current.pageViewsByPath,
      events: [nextEvent, ...current.events].slice(0, MAX_STORED_EVENTS),
    };
  });
}

export function trackPageView(input: {
  path: string;
  title: string;
  locale: "en" | "de";
}) {
  return trackAnalyticsEvent({
    type: "page_view",
    label: input.title,
    path: input.path,
    locale: input.locale,
  });
}

function getMetricThresholds(name: AnalyticsMetricName) {
  switch (name) {
    case "TTFB":
      return { good: 800, poor: 1800 };
    case "FCP":
      return { good: 1800, poor: 3000 };
    case "LCP":
      return { good: 2500, poor: 4000 };
    case "CLS":
      return { good: 0.1, poor: 0.25 };
  }
}

export function getMetricRating(
  name: AnalyticsMetricName,
  value: number,
): AnalyticsMetricRating {
  const thresholds = getMetricThresholds(name);

  if (value <= thresholds.good) {
    return "good";
  }

  if (value <= thresholds.poor) {
    return "needs-improvement";
  }

  return "poor";
}

export function trackMetric(input: {
  name: AnalyticsMetricName;
  path: string;
  value: number;
}) {
  const timestamp = new Date().toISOString();
  const nextMetric: AnalyticsMetric = {
    id: createId("metric"),
    name: input.name,
    path: input.path,
    value: input.value,
    unit: input.name === "CLS" ? "score" : "ms",
    rating: getMetricRating(input.name, input.value),
    timestamp,
  };

  return updateSnapshot((current) => ({
    ...current,
    lastUpdatedAt: timestamp,
    metrics: [
      nextMetric,
      ...current.metrics.filter(
        (metric) =>
          !(metric.name === nextMetric.name && metric.path === nextMetric.path),
      ),
    ].slice(0, 24),
  }));
}

export function formatMetricValue(metric: AnalyticsMetric) {
  if (metric.unit === "score") {
    return metric.value.toFixed(3);
  }

  return `${Math.round(metric.value)} ms`;
}

export function getEventTypeLabel(type: AnalyticsEventType, locale: "en" | "de") {
  const labels = {
    en: {
      page_view: "Page view",
      cta_click: "CTA click",
      outbound_click: "Outbound link",
      email_click: "Email click",
      locale_switch: "Language switch",
    },
    de: {
      page_view: "Seitenaufruf",
      cta_click: "CTA-Klick",
      outbound_click: "Externer Link",
      email_click: "E-Mail-Klick",
      locale_switch: "Sprachwechsel",
    },
  } as const;

  return labels[locale][type];
}

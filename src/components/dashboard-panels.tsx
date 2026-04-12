"use client";

import { useEffect, useState } from "react";
import type { SiteLocale } from "@/content/site-content";
import {
  ANALYTICS_UPDATE_EVENT,
  formatMetricValue,
  getAnalyticsSnapshot,
  getEventTypeLabel,
  type AnalyticsMetric,
  type AnalyticsSnapshot,
} from "@/lib/site-analytics";
import {
  SITE_CONSENT_UPDATE_EVENT,
  getSiteConsentStatus,
  type SiteConsentStatus,
} from "@/lib/site-consent";

type DashboardPanelsProps = {
  locale: SiteLocale;
  siteUrl: string;
  analyticsEnabled: boolean;
  indexablePageCount: number;
  blogPostCount: number;
  localizedRouteCount: number;
  robotsUrl: string;
  sitemapUrl: string;
};

const copy = {
  en: {
    overview: "Overview",
    overviewTitle: "What the deployed site can confirm from the browser",
    overviewDescription:
      "This page reads the current browser session, so it works on the static deployment without a server.",
    analytics: "Analytics",
    analyticsTitle: "Traffic and activity signals",
    analyticsDescription:
      "Page views and meaningful interactions are stored locally only after consent, and they are forwarded to GA4 only when consent exists and the analytics ID is configured.",
    performance: "Performance",
    performanceTitle: "Recent browser load metrics",
    performanceDescription:
      "These metrics reflect the latest full page load captured in this browser session.",
    seo: "SEO",
    seoTitle: "Indexing and discoverability checks",
    seoDescription:
      "The exported site already emits crawlable files and route metadata. These cards show the current configured surface.",
    deployment: "Deployment",
    trackingStatus: "Tracking status",
    trackingModeValueBlocked: "Blocked until consent",
    trackingModeValueLocal: "Local dashboard only",
    trackingModeValueGa: "Local dashboard + GA4 forwarding",
    gaStatusLabel: "GA4",
    gaStatusEnabled: "Configured",
    gaStatusDisabled: "Missing analytics ID",
    gaStatusAwaitingConsent: "Waiting for consent",
    localStatusLabel: "First-party tracker",
    localStatusValue: "Active in this browser",
    localStatusBlocked: "Blocked until consent",
    pageViews: "Page views",
    ctaClicks: "CTA clicks",
    outboundClicks: "Outbound clicks",
    emailClicks: "Email clicks",
    localeSwitches: "Language switches",
    sessionStarted: "Session started",
    lastUpdate: "Last update",
    topPaths: "Top paths",
    recentActivity: "Recent activity",
    noEvents: "No tracked events yet in this browser.",
    noMetrics: "No performance metrics captured yet for this session.",
    robots: "robots.txt",
    sitemap: "sitemap.xml",
    canonicalBase: "Canonical base URL",
    indexedRoutes: "Localized static routes",
    blogPosts: "Localized blog posts",
    crawlSurface: "Known indexable URLs",
    exportMode: "Build output",
    exportModeValue: "Next.js static export",
    hostingFit: "Deployment fit",
    hostingFitValue: "GitHub Pages compatible",
    metricPath: "Captured on",
  },
  de: {
    overview: "Uebersicht",
    overviewTitle: "Was die Deployment-Version direkt im Browser bestaetigen kann",
    overviewDescription:
      "Diese Seite liest die aktuelle Browser-Session aus und funktioniert daher auch auf der statischen GitHub-Pages-Deployment.",
    analytics: "Analytics",
    analyticsTitle: "Traffic- und Aktivitaetssignale",
    analyticsDescription:
      "Seitenaufrufe und relevante Interaktionen werden erst nach Einwilligung lokal gespeichert und nur dann an GA4 weitergeleitet, wenn zusaetzlich eine Analytics-ID gesetzt ist.",
    performance: "Performance",
    performanceTitle: "Aktuelle Browser-Lade-Metriken",
    performanceDescription:
      "Diese Metriken zeigen den letzten vollstaendigen Seitenaufruf in dieser Browser-Session.",
    seo: "SEO",
    seoTitle: "Checks fuer Indexierung und Sichtbarkeit",
    seoDescription:
      "Die exportierte Seite liefert bereits crawlbare Dateien und Routen-Metadaten aus. Diese Karten zeigen den aktuell konfigurierten Surface.",
    deployment: "Deployment",
    trackingStatus: "Tracking-Status",
    trackingModeValueBlocked: "Bis zur Einwilligung blockiert",
    trackingModeValueLocal: "Nur lokales Dashboard",
    trackingModeValueGa: "Lokales Dashboard + GA4-Weiterleitung",
    gaStatusLabel: "GA4",
    gaStatusEnabled: "Konfiguriert",
    gaStatusDisabled: "Analytics-ID fehlt",
    gaStatusAwaitingConsent: "Wartet auf Einwilligung",
    localStatusLabel: "First-Party-Tracker",
    localStatusValue: "In diesem Browser aktiv",
    localStatusBlocked: "Bis zur Einwilligung blockiert",
    pageViews: "Seitenaufrufe",
    ctaClicks: "CTA-Klicks",
    outboundClicks: "Externe Klicks",
    emailClicks: "E-Mail-Klicks",
    localeSwitches: "Sprachwechsel",
    sessionStarted: "Session gestartet",
    lastUpdate: "Letztes Update",
    topPaths: "Top-Pfade",
    recentActivity: "Letzte Aktivitaeten",
    noEvents: "In diesem Browser wurden noch keine Events erfasst.",
    noMetrics: "Fuer diese Session wurden noch keine Performance-Metriken erfasst.",
    robots: "robots.txt",
    sitemap: "sitemap.xml",
    canonicalBase: "Kanonische Basis-URL",
    indexedRoutes: "Lokalisierte statische Routen",
    blogPosts: "Lokalisierte Blog-Posts",
    crawlSurface: "Bekannte indexierbare URLs",
    exportMode: "Build-Ausgabe",
    exportModeValue: "Next.js Static Export",
    hostingFit: "Deployment-Fit",
    hostingFitValue: "GitHub Pages kompatibel",
    metricPath: "Erfasst auf",
  },
} as const;

function getRelativeFormatter(locale: SiteLocale) {
  return new Intl.RelativeTimeFormat(locale === "de" ? "de-DE" : "en-US", {
    numeric: "auto",
  });
}

function formatRelativeTime(locale: SiteLocale, isoValue: string) {
  const formatter = getRelativeFormatter(locale);
  const diffMs = new Date(isoValue).getTime() - Date.now();
  const diffMinutes = Math.round(diffMs / 60000);

  if (Math.abs(diffMinutes) < 60) {
    return formatter.format(diffMinutes, "minute");
  }

  const diffHours = Math.round(diffMinutes / 60);

  if (Math.abs(diffHours) < 24) {
    return formatter.format(diffHours, "hour");
  }

  const diffDays = Math.round(diffHours / 24);
  return formatter.format(diffDays, "day");
}

function getMetricTone(metric: AnalyticsMetric["rating"]) {
  if (metric === "good") {
    return "border-emerald-400/30 bg-emerald-400/10 text-emerald-200";
  }

  if (metric === "needs-improvement") {
    return "border-amber-400/30 bg-amber-400/10 text-amber-200";
  }

  return "border-rose-400/30 bg-rose-400/10 text-rose-200";
}

function readSnapshot(): AnalyticsSnapshot {
  return getAnalyticsSnapshot();
}

export function DashboardPanels({
  locale,
  siteUrl,
  analyticsEnabled,
  indexablePageCount,
  blogPostCount,
  localizedRouteCount,
  robotsUrl,
  sitemapUrl,
}: DashboardPanelsProps) {
  const labels = copy[locale];
  const [snapshot, setSnapshot] = useState<AnalyticsSnapshot>(readSnapshot);
  const [consentStatus, setConsentStatus] = useState<SiteConsentStatus>(
    getSiteConsentStatus,
  );

  useEffect(() => {
    const refresh = () => {
      setSnapshot(readSnapshot());
      setConsentStatus(getSiteConsentStatus());
    };

    refresh();
    window.addEventListener(ANALYTICS_UPDATE_EVENT, refresh);
    window.addEventListener(SITE_CONSENT_UPDATE_EVENT, refresh);
    window.addEventListener("storage", refresh);

    return () => {
      window.removeEventListener(ANALYTICS_UPDATE_EVENT, refresh);
      window.removeEventListener(SITE_CONSENT_UPDATE_EVENT, refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  const topPaths = Object.entries(snapshot.pageViewsByPath)
    .sort((left, right) => right[1] - left[1])
    .slice(0, 5);
  const metrics = [...snapshot.metrics].sort(
    (left, right) =>
      new Date(right.timestamp).getTime() - new Date(left.timestamp).getTime(),
  );
  const consentGranted = consentStatus === "accepted";
  const gaStatusClassName = consentGranted
    ? analyticsEnabled
      ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-200"
      : "border-amber-400/30 bg-amber-400/10 text-amber-200"
    : "border-slate-400/30 bg-slate-400/10 text-slate-300";
  const gaStatusLabel = consentGranted
    ? analyticsEnabled
      ? labels.gaStatusEnabled
      : labels.gaStatusDisabled
    : labels.gaStatusAwaitingConsent;
  const trackingMode = consentGranted
    ? analyticsEnabled
      ? labels.trackingModeValueGa
      : labels.trackingModeValueLocal
    : labels.trackingModeValueBlocked;

  return (
    <div className="container-shell space-y-12 pb-20">
      <section
        id="overview"
        className="anchor-offset grid gap-6 lg:grid-cols-[1.2fr_0.8fr]"
      >
        <div className="glass-panel rounded-[2rem] p-7 sm:p-8">
          <div className="section-label eyebrow-line">{labels.overview}</div>
          <h2 className="mt-5 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            {labels.overviewTitle}
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300">
            {labels.overviewDescription}
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/45 p-5">
              <div className="text-xs uppercase tracking-[0.18em] text-slate-500">
                {labels.trackingStatus}
              </div>
              <div className="mt-3 text-xl font-semibold text-white">
                {trackingMode}
              </div>
              <div className="mt-4 space-y-2 text-sm text-slate-300">
                <div className="flex items-center justify-between gap-3">
                  <span>{labels.gaStatusLabel}</span>
                  <span
                    className={`rounded-full border px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] ${gaStatusClassName}`}
                  >
                    {gaStatusLabel}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span>{labels.localStatusLabel}</span>
                  <span className="text-sky-200">
                    {consentGranted
                      ? labels.localStatusValue
                      : labels.localStatusBlocked}
                  </span>
                </div>
              </div>
            </div>
            <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/45 p-5">
              <div className="text-xs uppercase tracking-[0.18em] text-slate-500">
                {labels.deployment}
              </div>
              <div className="mt-4 space-y-3 text-sm text-slate-300">
                <div className="flex items-center justify-between gap-3">
                  <span>{labels.exportMode}</span>
                  <span className="text-sky-200">{labels.exportModeValue}</span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span>{labels.hostingFit}</span>
                  <span className="text-sky-200">{labels.hostingFitValue}</span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span>{labels.canonicalBase}</span>
                  <span className="truncate text-slate-200">{siteUrl}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
          {[
            { label: labels.pageViews, value: snapshot.pageViews },
            { label: labels.ctaClicks, value: snapshot.ctaClicks },
            { label: labels.outboundClicks, value: snapshot.outboundClicks },
            { label: labels.emailClicks, value: snapshot.emailClicks },
          ].map((item) => (
            <div
              key={item.label}
              className="glass-panel rounded-[1.5rem] border border-sky-300/12 p-5"
            >
              <div className="text-xs uppercase tracking-[0.18em] text-slate-500">
                {item.label}
              </div>
              <div className="mt-3 text-4xl font-semibold tracking-tight text-white">
                {item.value}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section
        id="analytics"
        className="anchor-offset grid gap-6 lg:grid-cols-[0.95fr_1.05fr]"
      >
        <div className="glass-panel rounded-[2rem] p-7 sm:p-8">
          <div className="section-label eyebrow-line">{labels.analytics}</div>
          <h2 className="mt-5 text-3xl font-semibold tracking-tight text-white">
            {labels.analyticsTitle}
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300">
            {labels.analyticsDescription}
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {[
              { label: labels.pageViews, value: snapshot.pageViews },
              { label: labels.ctaClicks, value: snapshot.ctaClicks },
              { label: labels.localeSwitches, value: snapshot.localeSwitches },
              {
                label: labels.sessionStarted,
                value: formatRelativeTime(locale, snapshot.firstSeenAt),
              },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-[1.4rem] border border-white/10 bg-white/[0.03] p-4"
              >
                <div className="text-xs uppercase tracking-[0.18em] text-slate-500">
                  {item.label}
                </div>
                <div className="mt-3 text-lg font-semibold text-white">
                  {item.value}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 rounded-[1.5rem] border border-white/10 bg-slate-950/40 p-5">
            <div className="flex items-center justify-between gap-3">
              <div className="text-xs uppercase tracking-[0.18em] text-slate-500">
                {labels.topPaths}
              </div>
              <div className="text-xs text-slate-500">
                {labels.lastUpdate}: {formatRelativeTime(locale, snapshot.lastUpdatedAt)}
              </div>
            </div>
            <div className="mt-4 space-y-3">
              {topPaths.length > 0 ? (
                topPaths.map(([path, count]) => (
                  <div
                    key={path}
                    className="flex items-center justify-between gap-4 rounded-[1.2rem] border border-white/8 bg-white/[0.03] px-4 py-3 text-sm"
                  >
                    <span className="font-mono text-slate-300">{path}</span>
                    <span className="rounded-full bg-sky-400/15 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-sky-200">
                      {count}
                    </span>
                  </div>
                ))
              ) : (
                <div className="text-sm text-slate-400">{labels.noEvents}</div>
              )}
            </div>
          </div>
        </div>
        <div className="glass-panel rounded-[2rem] p-7 sm:p-8">
          <div className="flex items-center justify-between gap-4">
            <div className="section-label eyebrow-line">{labels.recentActivity}</div>
            <div className="text-xs text-slate-500">
              {labels.lastUpdate}: {formatRelativeTime(locale, snapshot.lastUpdatedAt)}
            </div>
          </div>
          <div className="mt-6 space-y-3">
            {snapshot.events.length > 0 ? (
              snapshot.events.slice(0, 10).map((event) => (
                <div
                  key={event.id}
                  className="rounded-[1.4rem] border border-white/10 bg-white/[0.03] p-4"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="text-sm font-medium text-white">
                      {getEventTypeLabel(event.type, locale)}
                    </div>
                    <div className="text-xs uppercase tracking-[0.16em] text-slate-500">
                      {formatRelativeTime(locale, event.timestamp)}
                    </div>
                  </div>
                  <div className="mt-2 text-sm text-slate-300">{event.label}</div>
                  <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-500">
                    <span className="rounded-full border border-white/10 px-3 py-1">
                      {event.path}
                    </span>
                    {event.href ? (
                      <span className="rounded-full border border-white/10 px-3 py-1">
                        {event.href}
                      </span>
                    ) : null}
                  </div>
                </div>
              ))
            ) : (
              <div className="rounded-[1.4rem] border border-white/10 bg-white/[0.03] p-4 text-sm text-slate-400">
                {labels.noEvents}
              </div>
            )}
          </div>
        </div>
      </section>

      <section
        id="performance"
        className="anchor-offset grid gap-6 lg:grid-cols-[1fr_1fr]"
      >
        <div className="glass-panel rounded-[2rem] p-7 sm:p-8">
          <div className="section-label eyebrow-line">{labels.performance}</div>
          <h2 className="mt-5 text-3xl font-semibold tracking-tight text-white">
            {labels.performanceTitle}
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300">
            {labels.performanceDescription}
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {metrics.length > 0 ? (
              metrics.slice(0, 4).map((metric) => (
                <div
                  key={metric.id}
                  className="rounded-[1.5rem] border border-white/10 bg-slate-950/45 p-5"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-xs uppercase tracking-[0.18em] text-slate-500">
                      {metric.name}
                    </div>
                    <span
                      className={`rounded-full border px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] ${getMetricTone(
                        metric.rating,
                      )}`}
                    >
                      {metric.rating}
                    </span>
                  </div>
                  <div className="mt-3 text-2xl font-semibold text-white">
                    {formatMetricValue(metric)}
                  </div>
                  <div className="mt-3 text-xs text-slate-500">
                    {labels.metricPath}: {metric.path}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-sm text-slate-400">{labels.noMetrics}</div>
            )}
          </div>
        </div>
        <div className="glass-panel rounded-[2rem] p-7 sm:p-8">
          <div className="section-label eyebrow-line">{labels.seo}</div>
          <h2 className="mt-5 text-3xl font-semibold tracking-tight text-white">
            {labels.seoTitle}
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300">
            {labels.seoDescription}
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {[
              {
                label: labels.indexedRoutes,
                value: localizedRouteCount,
              },
              {
                label: labels.blogPosts,
                value: blogPostCount,
              },
              {
                label: labels.crawlSurface,
                value: indexablePageCount,
              },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-[1.5rem] border border-white/10 bg-slate-950/45 p-5"
              >
                <div className="text-xs uppercase tracking-[0.18em] text-slate-500">
                  {item.label}
                </div>
                <div className="mt-3 text-3xl font-semibold text-white">
                  {item.value}
                </div>
              </div>
            ))}
            <a
              href={robotsUrl}
              className="rounded-[1.5rem] border border-white/10 bg-slate-950/45 p-5 transition hover:border-sky-300/35 hover:bg-white/[0.05]"
            >
              <div className="text-xs uppercase tracking-[0.18em] text-slate-500">
                {labels.robots}
              </div>
              <div className="mt-3 font-mono text-sm text-sky-200">{robotsUrl}</div>
            </a>
            <a
              href={sitemapUrl}
              className="rounded-[1.5rem] border border-white/10 bg-slate-950/45 p-5 transition hover:border-sky-300/35 hover:bg-white/[0.05]"
            >
              <div className="text-xs uppercase tracking-[0.18em] text-slate-500">
                {labels.sitemap}
              </div>
              <div className="mt-3 font-mono text-sm text-sky-200">{sitemapUrl}</div>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

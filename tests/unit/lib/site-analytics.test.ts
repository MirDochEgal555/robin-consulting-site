import {
  ANALYTICS_STORAGE_KEY,
  clearAnalyticsData,
  getAnalyticsSnapshot,
  getMetricRating,
  trackAnalyticsEvent,
  trackMetric,
  trackPageView,
} from "@/lib/site-analytics";
import { setSiteConsentStatus } from "@/lib/site-consent";

describe("site-analytics", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("does not store analytics before consent is granted", () => {
    const snapshot = trackPageView({
      path: "/",
      title: "Home",
      locale: "en",
    });

    expect(snapshot.pageViews).toBe(0);
    expect(window.localStorage.getItem(ANALYTICS_STORAGE_KEY)).toBeNull();
  });

  it("stores page views and CTA counters after consent", () => {
    setSiteConsentStatus("accepted");

    trackPageView({
      path: "/services",
      title: "Services",
      locale: "en",
    });
    trackAnalyticsEvent({
      type: "cta_click",
      label: "Book a free consultation",
      path: "/services",
      href: "https://www.cal.eu/robin-keim-consulting",
      locale: "en",
    });

    const snapshot = getAnalyticsSnapshot();

    expect(snapshot.pageViews).toBe(1);
    expect(snapshot.ctaClicks).toBe(1);
    expect(snapshot.outboundClicks).toBe(1);
    expect(snapshot.pageViewsByPath["/services"]).toBe(1);
    expect(snapshot.events[0]).toMatchObject({
      type: "cta_click",
      href: "https://www.cal.eu/robin-keim-consulting",
    });
  });

  it("stores metrics and clears analytics state on demand", () => {
    setSiteConsentStatus("accepted");

    const snapshot = trackMetric({
      name: "LCP",
      path: "/",
      value: 2600,
    });

    expect(snapshot.metrics[0]).toMatchObject({
      name: "LCP",
      path: "/",
      rating: "needs-improvement",
      unit: "ms",
    });
    expect(getMetricRating("CLS", 0.3)).toBe("poor");

    clearAnalyticsData();

    expect(window.localStorage.getItem(ANALYTICS_STORAGE_KEY)).toBeNull();
    expect(getAnalyticsSnapshot().pageViews).toBe(0);
  });
});

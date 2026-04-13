import {
  SITE_CONSENT_OPEN_EVENT,
  SITE_CONSENT_STORAGE_KEY,
  SITE_CONSENT_UPDATE_EVENT,
  getSiteConsentStatus,
  openSiteConsentPreferences,
  setSiteConsentStatus,
} from "@/lib/site-consent";

describe("site-consent", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("defaults to pending until a decision is stored", () => {
    expect(getSiteConsentStatus()).toBe("pending");
  });

  it("persists the consent decision and emits an update event", () => {
    const handler = vi.fn();

    window.addEventListener(SITE_CONSENT_UPDATE_EVENT, handler);
    setSiteConsentStatus("accepted");

    expect(window.localStorage.getItem(SITE_CONSENT_STORAGE_KEY)).toBe(
      "accepted",
    );
    expect(getSiteConsentStatus()).toBe("accepted");
    expect(handler).toHaveBeenCalledTimes(1);
    expect((handler.mock.calls[0][0] as CustomEvent).detail).toBe("accepted");
  });

  it("emits the open preferences event", () => {
    const handler = vi.fn();

    window.addEventListener(SITE_CONSENT_OPEN_EVENT, handler);
    openSiteConsentPreferences();

    expect(handler).toHaveBeenCalledTimes(1);
  });
});

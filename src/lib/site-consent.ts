"use client";

export const SITE_CONSENT_STORAGE_KEY = "rk-site-consent";
export const SITE_CONSENT_UPDATE_EVENT = "rk-site-consent:update";
export const SITE_CONSENT_OPEN_EVENT = "rk-site-consent:open";

export type SiteConsentStatus = "accepted" | "rejected" | "pending";

function isBrowser() {
  return typeof window !== "undefined";
}

export function getSiteConsentStatus(): SiteConsentStatus {
  if (!isBrowser()) {
    return "pending";
  }

  const value = window.localStorage.getItem(SITE_CONSENT_STORAGE_KEY);

  if (value === "accepted" || value === "rejected") {
    return value;
  }

  return "pending";
}

export function hasSiteConsent() {
  return getSiteConsentStatus() === "accepted";
}

export function setSiteConsentStatus(status: Exclude<SiteConsentStatus, "pending">) {
  if (!isBrowser()) {
    return;
  }

  window.localStorage.setItem(SITE_CONSENT_STORAGE_KEY, status);
  window.dispatchEvent(
    new CustomEvent<SiteConsentStatus>(SITE_CONSENT_UPDATE_EVENT, {
      detail: status,
    }),
  );
}

export function openSiteConsentPreferences() {
  if (!isBrowser()) {
    return;
  }

  window.dispatchEvent(new Event(SITE_CONSENT_OPEN_EVENT));
}

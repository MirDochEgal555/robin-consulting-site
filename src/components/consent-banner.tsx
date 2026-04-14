"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { clearAnalyticsData } from "@/lib/site-analytics";
import {
  SITE_CONSENT_OPEN_EVENT,
  SITE_CONSENT_UPDATE_EVENT,
  getSiteConsentStatus,
  setSiteConsentStatus,
  type SiteConsentStatus,
} from "@/lib/site-consent";

type ConsentBannerProps = {
  locale: "en" | "de";
  legalNoticeHref: string;
  privacyHref: string;
};

const copy = {
  en: {
    title: "Optional analytics",
    description:
      "This site can store optional analytics in your browser and send analytics data to Google Analytics only after you consent.",
    accept: "Accept analytics",
    reject: "Reject",
    privacy: "Privacy",
    legalNotice: "Legal notice",
    manage:
      "You can change this choice at any time through the cookie settings control in the footer.",
  },
  de: {
    title: "Optionale Analytics",
    description:
      "Diese Website speichert optionale Analytics nur nach Ihrer Einwilligung im Browser und sendet Daten erst dann an Google Analytics.",
    accept: "Analytics erlauben",
    reject: "Ablehnen",
    privacy: "Datenschutz",
    legalNotice: "Impressum",
    manage:
      "Sie können diese Auswahl jederzeit über die Cookie-Einstellungen im Footer ändern.",
  },
} as const;

function isOpenByDefault(status: SiteConsentStatus) {
  return status === "pending";
}

function clearGoogleAnalyticsCookies() {
  const cookieNames = document.cookie
    .split(";")
    .map((entry) => entry.trim().split("=")[0])
    .filter((name) => name.startsWith("_ga"));

  for (const name of cookieNames) {
    document.cookie = `${name}=; Max-Age=0; path=/`;
  }
}

export function ConsentBanner({
  locale,
  legalNoticeHref,
  privacyHref,
}: ConsentBannerProps) {
  const labels = copy[locale];
  const [status, setStatus] = useState<SiteConsentStatus>("pending");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const syncStatus = () => {
      const nextStatus = getSiteConsentStatus();
      setStatus(nextStatus);
      setOpen(isOpenByDefault(nextStatus));
    };

    const openPreferences = () => {
      setOpen(true);
    };

    syncStatus();
    window.addEventListener(SITE_CONSENT_UPDATE_EVENT, syncStatus);
    window.addEventListener(SITE_CONSENT_OPEN_EVENT, openPreferences);

    return () => {
      window.removeEventListener(SITE_CONSENT_UPDATE_EVENT, syncStatus);
      window.removeEventListener(SITE_CONSENT_OPEN_EVENT, openPreferences);
    };
  }, []);

  const handleDecision = (decision: Exclude<SiteConsentStatus, "pending">) => {
    const previousStatus = status;
    setSiteConsentStatus(decision);
    setStatus(decision);
    setOpen(false);

    if (decision === "rejected") {
      clearAnalyticsData();
      clearGoogleAnalyticsCookies();

      if (previousStatus === "accepted") {
        window.location.reload();
      }
    }
  };

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-[60] p-4 sm:p-6">
      <div className="mx-auto max-w-4xl rounded-[2rem] border border-white/10 bg-slate-950/96 p-6 shadow-[0_30px_90px_rgba(2,8,23,0.45)] backdrop-blur-xl">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="font-mono text-xs uppercase tracking-[0.2em] text-sky-300">
              {labels.title}
            </div>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              {labels.description}
            </p>
            <p className="mt-3 text-xs leading-6 text-slate-500">
              {labels.manage}
            </p>
            <div className="mt-4 flex flex-wrap gap-3 text-sm text-slate-300">
              <Link
                href={privacyHref}
                className="rounded-full border border-white/10 px-3 py-1 transition hover:border-sky-300/35 hover:text-sky-200"
              >
                {labels.privacy}
              </Link>
              <Link
                href={legalNoticeHref}
                className="rounded-full border border-white/10 px-3 py-1 transition hover:border-sky-300/35 hover:text-sky-200"
              >
                {labels.legalNotice}
              </Link>
            </div>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => handleDecision("rejected")}
              className="rounded-full border border-white/15 bg-white/[0.05] px-5 py-3 text-sm font-medium text-white transition hover:border-sky-300/50 hover:bg-white/[0.08]"
            >
              {labels.reject}
            </button>
            <button
              type="button"
              onClick={() => handleDecision("accepted")}
              className="rounded-full bg-sky-400 px-5 py-3 text-sm font-medium text-slate-950 transition hover:bg-sky-300"
            >
              {labels.accept}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { openSiteConsentPreferences } from "@/lib/site-consent";

type ConsentPreferencesButtonProps = {
  label: string;
};

export function ConsentPreferencesButton({
  label,
}: ConsentPreferencesButtonProps) {
  return (
    <button
      type="button"
      onClick={openSiteConsentPreferences}
      className="rounded-full border border-white/10 px-3 py-1 font-mono text-xs uppercase tracking-[0.18em] text-slate-400 transition hover:border-sky-300/35 hover:text-sky-200"
    >
      {label}
    </button>
  );
}

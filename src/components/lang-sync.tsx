"use client";

import { useEffect } from "react";

type LangSyncProps = {
  lang: string;
};

export function LangSync({ lang }: LangSyncProps) {
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return null;
}

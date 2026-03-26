"use client";

import { startTransition, useEffect, useState } from "react";
import { siteContent } from "@/content/site-content";
import { ButtonLink } from "@/components/ui/button-link";

const sections = [
  { label: "Overview", href: "#top" },
  ...siteContent.navItems,
] as const;

export function SiteHeader() {
  const [activeHref, setActiveHref] = useState("#top");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const updateHeaderState = () => {
      const offset = 140;
      let currentHref = "#top";

      for (const section of sections) {
        const id = section.href.replace("#", "");
        const element = document.getElementById(id);

        if (!element) {
          continue;
        }

        const { top } = element.getBoundingClientRect();

        if (top - offset <= 0) {
          currentHref = section.href;
        }
      }

      const nextScrolled = window.scrollY > 12;

      startTransition(() => {
        setActiveHref((previous) =>
          previous === currentHref ? previous : currentHref,
        );
        setScrolled((previous) =>
          previous === nextScrolled ? previous : nextScrolled,
        );
      });
    };

    let ticking = false;

    const queueUpdate = () => {
      if (ticking) {
        return;
      }

      ticking = true;
      window.requestAnimationFrame(() => {
        updateHeaderState();
        ticking = false;
      });
    };

    updateHeaderState();
    window.addEventListener("scroll", queueUpdate, { passive: true });
    window.addEventListener("resize", queueUpdate);

    return () => {
      window.removeEventListener("scroll", queueUpdate);
      window.removeEventListener("resize", queueUpdate);
    };
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-sky-300/15 bg-slate-950/88 shadow-[0_18px_50px_rgba(2,8,23,0.38)] backdrop-blur-2xl"
          : "border-b border-white/10 bg-slate-950/65 backdrop-blur-xl"
      }`}
    >
      <div className="container-shell flex items-center justify-between gap-4 py-4">
        <a href="#top" className="flex flex-col">
          <span className="text-sm font-medium uppercase tracking-[0.16em] text-sky-300">
            Robin Keim
          </span>
          <span className="text-sm text-slate-400">IT Consulting</span>
        </a>
        <nav className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] p-1 text-sm text-slate-300 md:flex">
          {siteContent.navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              aria-current={activeHref === item.href ? "page" : undefined}
              className={`rounded-full px-4 py-2 transition ${
                activeHref === item.href
                  ? "bg-sky-400 text-slate-950 shadow-[0_12px_30px_rgba(56,189,248,0.24)]"
                  : "text-slate-300 hover:bg-white/[0.05] hover:text-white"
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <ButtonLink href={siteContent.bookingUrl}>Book a free consultation</ButtonLink>
      </div>
    </header>
  );
}

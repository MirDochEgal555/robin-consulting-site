"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { startTransition, useEffect, useState } from "react";
import { ButtonLink } from "@/components/ui/button-link";
import type { SiteContent } from "@/content/site-content";
import type {
  LanguageSwitchLink,
  SiteNavItem,
} from "@/content/site-pages";

type SiteHeaderProps = {
  content: SiteContent;
  brandHref: string;
  pageNavItems: SiteNavItem[];
  pageMenuItems: SiteNavItem[];
  languageSwitch: LanguageSwitchLink;
};

function normalizePath(path: string) {
  if (path === "/") {
    return path;
  }

  return path.replace(/\/+$/, "");
}

export function SiteHeader({
  content,
  brandHref,
  pageNavItems,
  pageMenuItems,
  languageSwitch,
}: SiteHeaderProps) {
  const menuLabel = content.locale === "de" ? "Seiten" : "Pages";
  const openMenuLabel =
    content.locale === "de" ? "Seitenmenue oeffnen" : "Open page menu";
  const closeMenuLabel =
    content.locale === "de" ? "Seitenmenue schliessen" : "Close page menu";
  const [activeHref, setActiveHref] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const activePath = normalizePath(pathname ?? "/");
  const hasAnchorNav = pageNavItems.some((item) => item.href.startsWith("#"));

  useEffect(() => {
    const updateHeaderState = () => {
      let currentHref: string | null = null;

      if (hasAnchorNav) {
        const offset = 140;

        for (const section of pageNavItems) {
          if (!section.href.startsWith("#")) {
            continue;
          }

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
  }, [hasAnchorNav, pageNavItems]);

  useEffect(() => {
    setMenuOpen(false);
  }, [activePath]);

  useEffect(() => {
    if (!menuOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  const renderNavLink = (item: SiteNavItem) => {
    const isAnchor = item.href.startsWith("#");
    const isActive = isAnchor
      ? activeHref === item.href
      : activePath === normalizePath(item.href);
    const className = `rounded-full px-4 py-2 transition ${
      isActive
        ? "bg-sky-400 text-slate-950 shadow-[0_12px_30px_rgba(56,189,248,0.24)]"
        : "text-slate-300 hover:bg-white/[0.05] hover:text-white"
    }`;

    if (isAnchor) {
      return (
        <a
          key={item.href}
          href={item.href}
          aria-current={isActive ? "page" : undefined}
          className={className}
        >
          {item.label}
        </a>
      );
    }

    return (
      <Link
        key={item.href}
        href={item.href}
        aria-current={isActive ? "page" : undefined}
        className={className}
      >
        {item.label}
      </Link>
    );
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "border-b border-sky-300/15 bg-slate-950/88 shadow-[0_18px_50px_rgba(2,8,23,0.38)] backdrop-blur-2xl"
            : "border-b border-white/10 bg-slate-950/65 backdrop-blur-xl"
        }`}
      >
        <div className="container-shell flex items-center justify-between gap-3 py-4">
          <div className="flex min-w-0 items-center gap-3">
            <button
              type="button"
              aria-label={openMenuLabel}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((previous) => !previous)}
              className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/[0.12] bg-white/[0.04] text-slate-200 transition hover:border-sky-300/50 hover:bg-white/[0.08] hover:text-white"
            >
              <span className="sr-only">{openMenuLabel}</span>
              <span className="flex h-4 w-4 flex-col justify-between">
                <span className="block h-0.5 rounded-full bg-current" />
                <span className="block h-0.5 rounded-full bg-current" />
                <span className="block h-0.5 rounded-full bg-current" />
              </span>
            </button>
            {brandHref.startsWith("#") ? (
              <a href={brandHref} className="flex min-w-0 flex-col">
                <span className="truncate text-sm font-medium uppercase tracking-[0.16em] text-sky-300">
                  {content.brand.primary}
                </span>
                <span className="truncate text-sm text-slate-400">
                  {content.brand.secondary}
                </span>
              </a>
            ) : (
              <Link href={brandHref} className="flex min-w-0 flex-col">
                <span className="truncate text-sm font-medium uppercase tracking-[0.16em] text-sky-300">
                  {content.brand.primary}
                </span>
                <span className="truncate text-sm text-slate-400">
                  {content.brand.secondary}
                </span>
              </Link>
            )}
          </div>
          <nav className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] p-1 text-sm text-slate-300 md:flex">
            {pageNavItems.map((item) => renderNavLink(item))}
          </nav>
          <div className="flex items-center gap-3">
            <Link
              href={languageSwitch.href}
              aria-label={languageSwitch.ariaLabel}
              className="inline-flex h-11 items-center justify-center rounded-full border border-white/[0.12] bg-white/[0.04] px-4 text-sm font-medium text-slate-200 transition hover:border-sky-300/50 hover:bg-white/[0.08] hover:text-white"
            >
              {languageSwitch.label}
            </Link>
            <div className="hidden sm:block">
              <ButtonLink href={content.bookingUrl}>
                {content.cta.bookConsultation}
              </ButtonLink>
            </div>
          </div>
        </div>
      </header>
      <div
        className={`fixed inset-0 z-40 transition ${
          menuOpen
            ? "pointer-events-auto bg-slate-950/50 backdrop-blur-sm"
            : "pointer-events-none bg-transparent"
        }`}
        onClick={() => setMenuOpen(false)}
      />
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-full max-w-sm border-r border-white/10 bg-slate-950/96 p-6 shadow-[0_30px_90px_rgba(2,8,23,0.5)] transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-hidden={!menuOpen}
      >
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="text-sm font-medium uppercase tracking-[0.16em] text-sky-300">
              {content.brand.primary}
            </div>
            <div className="mt-1 text-sm text-slate-400">{content.brand.secondary}</div>
          </div>
          <button
            type="button"
            aria-label={closeMenuLabel}
            onClick={() => setMenuOpen(false)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/[0.12] bg-white/[0.04] text-slate-200 transition hover:border-sky-300/50 hover:bg-white/[0.08] hover:text-white"
          >
            <span className="text-xl leading-none">X</span>
          </button>
        </div>
        <div className="mt-10">
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-slate-500">
            {menuLabel}
          </div>
          <nav className="mt-4 flex flex-col gap-2">
            {pageMenuItems.map((item) => {
              const isActive = activePath === normalizePath(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  onClick={() => setMenuOpen(false)}
                  className={`rounded-[1.5rem] border px-4 py-4 text-base transition ${
                    isActive
                      ? "border-sky-300/40 bg-sky-400 text-slate-950 shadow-[0_12px_30px_rgba(56,189,248,0.24)]"
                      : "border-white/10 bg-white/[0.04] text-slate-200 hover:border-sky-300/40 hover:bg-white/[0.08] hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>
    </>
  );
}

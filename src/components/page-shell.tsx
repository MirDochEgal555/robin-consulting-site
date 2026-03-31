import { LangSync } from "@/components/lang-sync";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getSiteContent, type SiteLocale } from "@/content/site-content";
import {
  getLanguageSwitch,
  getPrimaryNavItems,
  type SiteNavItem,
  type SitePageKey,
} from "@/content/site-pages";

type PageShellProps = {
  locale: SiteLocale;
  pageKey: SitePageKey;
  brandHref: string;
  pageNavItems: SiteNavItem[];
  children: React.ReactNode;
  mainClassName?: string;
};

export function PageShell({
  locale,
  pageKey,
  brandHref,
  pageNavItems,
  children,
  mainClassName = "pt-24",
}: PageShellProps) {
  const content = getSiteContent(locale);

  return (
    <div className="relative overflow-x-hidden">
      <LangSync lang={content.lang} />
      <SiteHeader
        content={content}
        brandHref={brandHref}
        pageNavItems={pageNavItems}
        pageMenuItems={getPrimaryNavItems(locale)}
        languageSwitch={getLanguageSwitch(locale, pageKey)}
      />
      <main className={mainClassName}>{children}</main>
      <SiteFooter content={content} />
    </div>
  );
}

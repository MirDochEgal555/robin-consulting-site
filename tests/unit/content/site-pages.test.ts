import {
  getLanguageSwitch,
  getPageMetadata,
  getPagePath,
  getPrimaryNavItems,
} from "@/content/site-pages";

describe("site-pages", () => {
  it("builds localized page paths", () => {
    expect(getPagePath("en", "home")).toBe("/");
    expect(getPagePath("en", "projects")).toBe("/projects");
    expect(getPagePath("de", "home")).toBe("/de");
    expect(getPagePath("de", "projects")).toBe("/de/projekte");
    expect(getPagePath("de", "legalNotice")).toBe("/de/impressum");
  });

  it("returns the localized primary navigation and language switch target", () => {
    expect(getPrimaryNavItems("en")).toEqual([
      { label: "Home", href: "/" },
      { label: "Services", href: "/services" },
      { label: "Projects", href: "/projects" },
      { label: "Blog", href: "/blog" },
    ]);

    expect(getLanguageSwitch("en", "blog")).toMatchObject({
      label: "DE",
      href: "/de/blog",
      ariaLabel: "Switch to the German version",
    });
  });

  it("generates canonical and alternate metadata for localized pages", () => {
    const metadata = getPageMetadata("de", "projects");

    expect(metadata.title).toBe("Fruehere Projekte | Robin Keim IT-Beratung");
    expect(metadata.alternates).toEqual({
      canonical: "/de/projekte",
      languages: {
        en: "/projects",
        de: "/de/projekte",
      },
    });
    expect(metadata.openGraph).toMatchObject({
      url: "https://www.keim-consulting.com/de/projekte",
      locale: "de_DE",
      type: "website",
    });
  });
});

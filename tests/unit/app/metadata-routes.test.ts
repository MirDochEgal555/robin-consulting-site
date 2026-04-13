import robots from "@/app/robots";
import sitemap from "@/app/sitemap";

describe("metadata routes", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-04-13T10:00:00.000Z"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("generates the production robots sitemap reference", () => {
    expect(robots()).toEqual({
      rules: {
        userAgent: "*",
        allow: "/",
      },
      sitemap: "https://www.keim-consulting.com/sitemap.xml",
    });
  });

  it("includes localized pages and only currently published blog posts in the sitemap", () => {
    const entries = sitemap();
    const urls = entries.map((entry) => entry.url);

    expect(urls).toContain("https://www.keim-consulting.com/de/projekte");
    expect(urls).toContain(
      "https://www.keim-consulting.com/blog/ai-use-cases-every-business-should-use",
    );
    expect(urls).not.toContain(
      "https://www.keim-consulting.com/blog/build-vs-buy-custom-software",
    );
  });
});

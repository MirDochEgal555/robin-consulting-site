import {
  formatBlogDate,
  getBlogIndexStructuredData,
  getBlogPost,
  getBlogPostMetadata,
  getBlogPostPath,
  getBlogPosts,
  getFeaturedBlogPosts,
  getReadingTimeLabel,
  getRelatedBlogPosts,
} from "@/content/blog-posts";

describe("blog-posts", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-04-13T10:00:00.000Z"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("filters unpublished posts and sorts published posts newest first", () => {
    const posts = getBlogPosts("en");

    expect(posts.map((post) => post.id)).toEqual([
      "ai-use-cases-business",
      "ai-changing-websites",
      "what-i-do-it-consultant-ai",
    ]);
    expect(posts.some((post) => post.id === "build-vs-buy-software")).toBe(
      false,
    );
  });

  it("returns localized paths, metadata, and structured data for a published post", () => {
    const post = getBlogPost("en", "ai-use-cases-every-business-should-use");

    expect(post).toBeDefined();
    expect(post?.path).toBe("/blog/ai-use-cases-every-business-should-use");
    expect(post?.alternate.path).toBe("/de/blog/ki-anwendungsfaelle-unternehmen");
    expect(getBlogPostPath("de", "ki-anwendungsfaelle-unternehmen")).toBe(
      "/de/blog/ki-anwendungsfaelle-unternehmen",
    );

    const metadata = getBlogPostMetadata(
      "en",
      "ai-use-cases-every-business-should-use",
    );

    expect(metadata).toBeDefined();
    expect(metadata?.alternates).toEqual({
      canonical: "/blog/ai-use-cases-every-business-should-use",
      languages: {
        en: "/blog/ai-use-cases-every-business-should-use",
        de: "/de/blog/ki-anwendungsfaelle-unternehmen",
      },
    });
    expect(metadata?.openGraph).toMatchObject({
      type: "article",
      locale: "en_US",
      url: "https://www.keim-consulting.com/blog/ai-use-cases-every-business-should-use",
    });

    const structuredData = getBlogIndexStructuredData("de");

    expect(structuredData.blogPost).toHaveLength(3);
    expect(structuredData.blogPost[0].url).toBe(
      "https://www.keim-consulting.com/de/blog/ki-anwendungsfaelle-unternehmen",
    );
  });

  it("returns featured and related posts based on currently published content", () => {
    const featured = getFeaturedBlogPosts("en");
    const related = getRelatedBlogPosts("en", "ai-use-cases-business");

    expect(featured.map((post) => post.id)).toEqual([
      "ai-use-cases-business",
      "ai-changing-websites",
      "what-i-do-it-consultant-ai",
    ]);
    expect(related.map((post) => post.id)).toEqual([
      "ai-changing-websites",
      "what-i-do-it-consultant-ai",
    ]);
  });

  it("formats reader-facing blog labels", () => {
    expect(formatBlogDate("en", "2026-04-13")).toBe("April 13, 2026");
    expect(getReadingTimeLabel("de", 5)).toBe("5 Min. Lesezeit");
  });
});

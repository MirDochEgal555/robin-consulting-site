import Link from "next/link";
import type { CSSProperties } from "react";
import { ContactSection } from "@/components/sections/contact-section";
import { PageShell } from "@/components/page-shell";
import {
  formatBlogDate,
  getBlogPost,
  getBlogPostStructuredData,
  getReadingTimeLabel,
  getRelatedBlogPosts,
} from "@/content/blog-posts";
import { getSiteContent, type SiteLocale } from "@/content/site-content";
import { getPagePath } from "@/content/site-pages";

type BlogPostPageProps = {
  locale: SiteLocale;
  slug: string;
};

export function BlogPostPage({ locale, slug }: BlogPostPageProps) {
  const content = getSiteContent(locale);
  const post = getBlogPost(locale, slug);

  if (!post) {
    return null;
  }

  const relatedPosts = getRelatedBlogPosts(locale, post.id, 2);
  const pageNavItems = [
    { label: content.sections.overviewLabel, href: "#overview" },
    { label: content.blog.relatedPostsLabel, href: "#related" },
    { label: content.sections.contact.eyebrow, href: "#contact" },
  ];

  return (
    <PageShell
      locale={locale}
      pageKey="blog"
      brandHref={getPagePath(locale, "blog")}
      pageNavItems={pageNavItems}
      languageSwitchOverride={{
        label: content.languageSwitch.label,
        ariaLabel: content.languageSwitch.ariaLabel,
        href: post.alternate.path,
      }}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getBlogPostStructuredData(post, locale)),
        }}
      />
      <section id="overview" className="anchor-offset py-20 sm:py-24">
        <div className="container-shell">
          <div
            className="reveal-up scroll-reveal-up"
            style={{ "--delay": "80ms" } as CSSProperties}
          >
            <Link
              href={getPagePath(locale, "blog")}
              className="inline-flex items-center gap-2 text-sm text-sky-300 transition hover:text-sky-200"
            >
              <span aria-hidden="true">&larr;</span>
              <span>{content.blog.backToBlogLabel}</span>
            </Link>
          </div>
          <div className="mt-8 max-w-4xl">
            <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.18em] text-slate-400">
              <span className="rounded-full border border-sky-300/20 bg-sky-300/10 px-3 py-1 text-sky-200">
                {post.category}
              </span>
              <span>{formatBlogDate(locale, post.publishedAt)}</span>
              <span className="h-1 w-1 rounded-full bg-slate-600" />
              <span>{getReadingTimeLabel(locale, post.readingTimeMinutes)}</span>
            </div>
            <h1
              className="mt-5 text-4xl font-semibold tracking-tight text-white sm:text-5xl reveal-up scroll-reveal-up"
              style={{ "--delay": "120ms" } as CSSProperties}
            >
              {post.title}
            </h1>
            <p
              className="mt-6 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg reveal-up scroll-reveal-up"
              style={{ "--delay": "180ms" } as CSSProperties}
            >
              {post.excerpt}
            </p>
            <div
              className="mt-8 flex flex-wrap gap-2 reveal-up scroll-reveal-up"
              style={{ "--delay": "220ms" } as CSSProperties}
            >
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs uppercase tracking-[0.14em] text-slate-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="pb-20 sm:pb-24">
        <div className="container-shell">
          <article className="glass-panel reveal-up scroll-tilt-in rounded-[2rem] p-8 sm:p-10 lg:p-12">
            <div className="mx-auto max-w-3xl">
              {post.sections.map((section, index) => (
                <section
                  key={section.title}
                  className={index === 0 ? "" : "mt-12"}
                >
                  <h2 className="text-2xl font-semibold text-white">
                    {section.title}
                  </h2>
                  <div className="mt-5 space-y-5 text-base leading-8 text-slate-300">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                  {section.bullets ? (
                    <ul className="mt-6 space-y-3 text-base leading-7 text-slate-300">
                      {section.bullets.map((bullet) => (
                        <li
                          key={bullet}
                          className="rounded-[1.25rem] border border-white/10 bg-white/[0.03] px-4 py-4"
                        >
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </section>
              ))}
            </div>
          </article>
        </div>
      </section>
      <section id="related" className="anchor-offset pb-20 sm:pb-24">
        <div className="container-shell">
          <div className="mb-8 font-mono text-xs uppercase tracking-[0.2em] text-slate-400">
            {content.blog.relatedPostsLabel}
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {relatedPosts.map((relatedPost, index) => (
              <Link
                key={relatedPost.id}
                href={relatedPost.path}
                className="glass-panel card-lift reveal-up scroll-reveal-up rounded-[2rem] p-7"
                style={{ "--delay": `${120 + index * 80}ms` } as CSSProperties}
              >
                <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.16em] text-slate-400">
                  <span>{relatedPost.category}</span>
                  <span className="h-1 w-1 rounded-full bg-slate-600" />
                  <span>{formatBlogDate(locale, relatedPost.publishedAt)}</span>
                </div>
                <h2 className="mt-4 text-2xl font-semibold text-white">
                  {relatedPost.title}
                </h2>
                <p className="mt-4 text-sm leading-7 text-slate-300">
                  {relatedPost.excerpt}
                </p>
                <div className="mt-6 text-sm font-medium text-sky-300">
                  {content.blog.readArticleLabel}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <ContactSection content={content} />
    </PageShell>
  );
}

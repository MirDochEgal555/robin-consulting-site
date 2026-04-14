import Link from "next/link";
import type { CSSProperties } from "react";
import { ContactSection } from "@/components/sections/contact-section";
import { PageIntro } from "@/components/page-intro";
import { PageShell } from "@/components/page-shell";
import {
  formatBlogDate,
  getBlogIndexStructuredData,
  getBlogPosts,
  getReadingTimeLabel,
} from "@/content/blog-posts";
import { getSiteContent, type SiteLocale } from "@/content/site-content";
import { getPageDefinition } from "@/content/site-pages";

type BlogPageProps = {
  locale: SiteLocale;
};

type BlogSectionHeaderProps = {
  eyebrow: string;
  title?: string;
  description?: string;
};

function BlogSectionHeader({
  eyebrow,
  title,
  description,
}: BlogSectionHeaderProps) {
  return (
    <div className="mb-10 max-w-3xl">
      <div className="eyebrow-line section-label reveal-up scroll-reveal-up">
        {eyebrow}
      </div>
      {title ? (
        <h2
          className="mt-4 text-3xl font-semibold tracking-tight text-white reveal-up scroll-reveal-up sm:text-4xl"
          style={{ "--delay": "90ms" } as CSSProperties}
        >
          {title}
        </h2>
      ) : null}
      {description ? (
        <p
          className="mt-4 text-base leading-7 text-slate-300 reveal-up scroll-reveal-up sm:text-lg"
          style={{ "--delay": "160ms" } as CSSProperties}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}

export function BlogPage({ locale }: BlogPageProps) {
  const content = getSiteContent(locale);
  const page = getPageDefinition(locale, "blog");
  const posts = getBlogPosts(locale);
  const pageNavItems = [
    { label: content.sections.overviewLabel, href: "#overview" },
    { label: content.blog.latestLabel, href: "#latest" },
    { label: content.blog.archiveLabel, href: "#archive" },
    { label: content.sections.contact.eyebrow, href: "#contact" },
  ];

  if (!page.intro || posts.length === 0) {
    return null;
  }

  const [latestPost, ...archivePosts] = posts;

  return (
    <PageShell
      locale={locale}
      pageKey="blog"
      brandHref="#overview"
      pageNavItems={pageNavItems}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getBlogIndexStructuredData(locale)),
        }}
      />
      <PageIntro
        id="overview"
        eyebrow={page.intro.eyebrow}
        title={page.intro.title}
        description={page.intro.description}
      />
      <section id="latest" className="anchor-offset pb-16 sm:pb-20">
        <div className="container-shell">
          <BlogSectionHeader
            eyebrow={content.blog.latestLabel}
            title={content.sections.blog.title}
            description={content.sections.blog.description}
          />
          <Link
            href={latestPost.path}
            className="glass-panel card-lift reveal-up scroll-tilt-in grid gap-8 rounded-[2rem] p-8 sm:p-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]"
            style={{ "--delay": "120ms" } as CSSProperties}
          >
            <div>
              <div className="font-mono text-xs uppercase tracking-[0.2em] text-slate-400">
                {latestPost.category}
              </div>
              <h2 className="mt-4 max-w-3xl text-3xl font-semibold text-white sm:text-4xl">
                {latestPost.title}
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300">
                {latestPost.excerpt}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {latestPost.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-sky-300/20 bg-sky-300/10 px-3 py-1 text-xs uppercase tracking-[0.14em] text-sky-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex flex-col justify-between gap-8 rounded-[1.75rem] border border-white/10 bg-slate-950/35 p-6">
              <div className="space-y-4 text-sm text-slate-300">
                <div>
                  <div className="font-mono text-xs uppercase tracking-[0.18em] text-slate-500">
                    {formatBlogDate(locale, latestPost.publishedAt)}
                  </div>
                </div>
                <div className="text-base text-white">
                  {getReadingTimeLabel(locale, latestPost.readingTimeMinutes)}
                </div>
                <p className="text-sm leading-7 text-slate-400">
                  {latestPost.seoDescription}
                </p>
              </div>
              <div className="text-sm font-medium text-sky-300">
                {content.blog.readArticleLabel}
              </div>
            </div>
          </Link>
        </div>
      </section>
      <section id="archive" className="anchor-offset pb-16 sm:pb-20">
        <div className="container-shell">
          <BlogSectionHeader eyebrow={content.blog.archiveLabel} />
          <div className="grid gap-6 md:grid-cols-2">
            {archivePosts.map((post, index) => (
              <Link
                key={post.id}
                href={post.path}
                className="glass-panel card-lift reveal-up scroll-reveal-up rounded-[2rem] p-7"
                style={{ "--delay": `${140 + index * 80}ms` } as CSSProperties}
              >
                <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.16em] text-slate-400">
                  <span>{post.category}</span>
                  <span className="h-1 w-1 rounded-full bg-slate-600" />
                  <span>{formatBlogDate(locale, post.publishedAt)}</span>
                </div>
                <h2 className="mt-4 text-2xl font-semibold text-white">
                  {post.title}
                </h2>
                <p className="mt-4 text-sm leading-7 text-slate-300">
                  {post.excerpt}
                </p>
                <div className="mt-6 flex items-center justify-between gap-4 text-sm">
                  <span className="text-slate-400">
                    {getReadingTimeLabel(locale, post.readingTimeMinutes)}
                  </span>
                  <span className="font-medium text-sky-300">
                    {content.blog.readArticleLabel}
                  </span>
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

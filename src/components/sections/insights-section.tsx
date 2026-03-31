import Link from "next/link";
import type { CSSProperties } from "react";
import { ButtonLink } from "@/components/ui/button-link";
import { SectionShell } from "@/components/section-shell";
import {
  formatBlogDate,
  getFeaturedBlogPosts,
  getReadingTimeLabel,
} from "@/content/blog-posts";
import type { SiteContent } from "@/content/site-content";
import { getPagePath } from "@/content/site-pages";

type InsightsSectionProps = {
  content: SiteContent;
};

export function InsightsSection({ content }: InsightsSectionProps) {
  const posts = getFeaturedBlogPosts(content.locale, 3);
  const blogPath = getPagePath(content.locale, "blog");

  if (posts.length === 0) {
    return null;
  }

  return (
    <SectionShell
      id="insights"
      eyebrow={content.sections.blog.eyebrow}
      title={content.sections.blog.title}
      description={content.sections.blog.description}
    >
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <article
          className="glass-panel card-lift reveal-left scroll-reveal-left rounded-[2rem] p-8 sm:p-10"
          style={{ "--delay": "100ms" } as CSSProperties}
        >
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-sky-300">
            {content.blog.featuredLabel}
          </div>
          <h3 className="mt-4 max-w-2xl text-3xl font-semibold text-white">
            {posts[0]?.title}
          </h3>
          <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300">
            {posts[0]?.excerpt}
          </p>
          {posts[0] ? (
            <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-slate-400">
              <span>{posts[0].category}</span>
              <span className="h-1 w-1 rounded-full bg-slate-600" />
              <span>{formatBlogDate(content.locale, posts[0].publishedAt)}</span>
              <span className="h-1 w-1 rounded-full bg-slate-600" />
              <span>
                {getReadingTimeLabel(content.locale, posts[0].readingTimeMinutes)}
              </span>
            </div>
          ) : null}
          {posts[0] ? (
            <div className="mt-8">
              <ButtonLink href={posts[0].path}>
                {content.blog.readArticleLabel}
              </ButtonLink>
            </div>
          ) : null}
        </article>
        <div className="grid gap-6">
          {posts.slice(1).map((post, index) => (
            <Link
              key={post.id}
              href={post.path}
              className="glass-panel card-lift reveal-right scroll-reveal-right rounded-[2rem] p-6"
              style={{ "--delay": `${160 + index * 80}ms` } as CSSProperties}
            >
              <div className="flex items-center justify-between gap-4 text-xs uppercase tracking-[0.18em] text-slate-400">
                <span>{post.category}</span>
                <span>{formatBlogDate(content.locale, post.publishedAt)}</span>
              </div>
              <h3 className="mt-4 text-2xl font-semibold text-white">
                {post.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-300">
                {post.excerpt}
              </p>
              <div className="mt-5 text-sm font-medium text-sky-300">
                {content.blog.readArticleLabel}
              </div>
            </Link>
          ))}
          <div
            className="reveal-up scroll-reveal-up pt-2"
            style={{ "--delay": "280ms" } as CSSProperties}
          >
            <ButtonLink href={blogPath} variant="secondary">
              {content.blog.browseAllLabel}
            </ButtonLink>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}

import { notFound } from "next/navigation";
import { BlogPostPage } from "@/components/blog-post-page";
import {
  getBlogPost,
  getBlogPostMetadata,
  getBlogPosts,
} from "@/content/blog-posts";

type BlogPostRouteProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return getBlogPosts("de").map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostRouteProps) {
  const { slug } = await params;

  return getBlogPostMetadata("de", slug);
}

export default async function Page({ params }: BlogPostRouteProps) {
  const { slug } = await params;

  if (!getBlogPost("de", slug)) {
    notFound();
  }

  return <BlogPostPage locale="de" slug={slug} />;
}

import { BlogPage } from "@/components/blog-page";
import { getPageMetadata } from "@/content/site-pages";

export const metadata = getPageMetadata("de", "blog");

export default function Page() {
  return <BlogPage locale="de" />;
}

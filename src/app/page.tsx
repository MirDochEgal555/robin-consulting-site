import { HomePage } from "@/components/home-page";
import { getPageMetadata } from "@/content/site-pages";

export const metadata = getPageMetadata("en");

export default function Page() {
  return <HomePage locale="en" />;
}

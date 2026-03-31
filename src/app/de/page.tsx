import { HomePage } from "@/components/home-page";
import { getPageMetadata } from "@/content/site-pages";

export const metadata = getPageMetadata("de");

export default function Page() {
  return <HomePage locale="de" />;
}

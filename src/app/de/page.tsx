import { HomePage } from "@/components/home-page";
import { getSiteMetadata } from "@/content/site-content";

export const metadata = getSiteMetadata("de");

export default function Page() {
  return <HomePage locale="de" />;
}

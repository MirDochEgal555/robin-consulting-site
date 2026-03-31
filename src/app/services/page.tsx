import { ServicesPage } from "@/components/services-page";
import { getPageMetadata } from "@/content/site-pages";

export const metadata = getPageMetadata("en", "services");

export default function Page() {
  return <ServicesPage locale="en" />;
}

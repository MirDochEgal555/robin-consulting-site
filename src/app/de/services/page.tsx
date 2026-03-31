import { ServicesPage } from "@/components/services-page";
import { getPageMetadata } from "@/content/site-pages";

export const metadata = getPageMetadata("de", "services");

export default function Page() {
  return <ServicesPage locale="de" />;
}

import { DashboardPage } from "@/components/dashboard-page";
import { getPageMetadata } from "@/content/site-pages";

export const metadata = getPageMetadata("de", "dashboard");

export default function Page() {
  return <DashboardPage locale="de" />;
}

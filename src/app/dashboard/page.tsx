import { DashboardPage } from "@/components/dashboard-page";
import { getPageMetadata } from "@/content/site-pages";

export const metadata = getPageMetadata("en", "dashboard");

export default function Page() {
  return <DashboardPage locale="en" />;
}

import { ProjectsPage } from "@/components/projects-page";
import { getPageMetadata } from "@/content/site-pages";

export const metadata = getPageMetadata("en", "projects");

export default function Page() {
  return <ProjectsPage locale="en" />;
}

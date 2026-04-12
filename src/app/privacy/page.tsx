import { LegalPage } from "@/components/legal-page";
import { getLegalPageMetadata } from "@/content/legal-pages";

export const metadata = getLegalPageMetadata("en", "privacy");

export default function Page() {
  return <LegalPage locale="en" pageKey="privacy" />;
}

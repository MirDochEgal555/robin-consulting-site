import { LegalPage } from "@/components/legal-page";
import { getLegalPageMetadata } from "@/content/legal-pages";

export const metadata = getLegalPageMetadata("en", "legalNotice");

export default function Page() {
  return <LegalPage locale="en" pageKey="legalNotice" />;
}

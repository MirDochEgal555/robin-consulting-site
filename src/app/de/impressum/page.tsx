import { LegalPage } from "@/components/legal-page";
import { getLegalPageMetadata } from "@/content/legal-pages";

export const metadata = getLegalPageMetadata("de", "legalNotice");

export default function Page() {
  return <LegalPage locale="de" pageKey="legalNotice" />;
}

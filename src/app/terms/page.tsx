import { LegalDocument } from "@/components/legal/legal-document";
import { termsOfUse } from "@content/legal";

export const metadata = {
  title: "Terms",
  description:
    "The terms for this site. A form or a booked call is a request, not a contract, until both sides agree in writing.",
};

export default function TermsPage() {
  return (
    <LegalDocument
      label="Terms"
      title={termsOfUse.title}
      updated={termsOfUse.updated}
      intro={termsOfUse.intro}
      sections={termsOfUse.sections}
    />
  );
}

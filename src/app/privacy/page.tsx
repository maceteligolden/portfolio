import { LegalDocument } from "@/components/legal/legal-document";
import { privacyPolicy } from "@content/legal";

export const metadata = {
  title: "Privacy",
  description:
    "What Golden Mac-Eteli collects from the contact form, a booked call, and analytics after you accept.",
};

export default function PrivacyPage() {
  return (
    <LegalDocument
      label="Privacy"
      title={privacyPolicy.title}
      updated={privacyPolicy.updated}
      intro={privacyPolicy.intro}
      sections={privacyPolicy.sections}
    />
  );
}

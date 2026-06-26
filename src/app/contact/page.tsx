import { ContactCtaPanel } from "@/components/contact/contact-cta-panel";
import { PageContainer } from "@/components/layout/page-container";
import { getSiteConfig } from "@/lib/content";

const site = getSiteConfig();

export const metadata = {
  title: `Contact | ${site.name}`,
  description:
    "Reach out via email, LinkedIn, or book a Calendly call for AI engineering and backend roles.",
};

export default function ContactPage() {
  return (
    <PageContainer>
      <p className="text-sm font-medium tracking-widest text-blue-400 uppercase">
        Contact
      </p>
      <h1 className="mt-2 text-4xl font-bold tracking-tight">
        Let&apos;s Work Together
      </h1>
      <p className="text-muted-foreground mt-4 max-w-2xl">
        Looking for an AI engineer or backend engineer? Reach out directly — I respond
        fastest on email and LinkedIn, or book a call if you prefer.
      </p>
      <ContactCtaPanel />
    </PageContainer>
  );
}

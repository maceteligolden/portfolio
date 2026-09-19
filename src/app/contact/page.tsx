import { ContactCtaPanel } from "@/components/contact/contact-cta-panel";
import { PageContainer } from "@/components/layout/page-container";
import { getSiteConfig } from "@/lib/content";

const site = getSiteConfig();

export const metadata = {
  title: `Contact | ${site.name}`,
  description:
    "Set up a 30-minute intro call, or reach out via email or LinkedIn for AI engineering and backend roles.",
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
        Set up a 30-minute intro, or email me if you prefer. I also respond on LinkedIn
        for role inquiries.
      </p>
      <ContactCtaPanel />
    </PageContainer>
  );
}

import { ContactCtaPanel } from "@/components/contact/contact-cta-panel";
import { ContactForm } from "@/components/contact/contact-form";
import { PageContainer } from "@/components/layout/page-container";
import { serviceOptions } from "@/lib/contact/options";

export const metadata = {
  title: "Start a project",
  description:
    "Tell me what you need built. I take on AI products, backend systems, and MVPs for founders and teams.",
};

interface ContactPageProps {
  searchParams: Promise<{ service?: string | string[] }>;
}

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const params = await searchParams;
  const slug = Array.isArray(params.service) ? params.service[0] : params.service;
  const initialService = serviceOptions.find((option) => option.slug === slug)?.value;

  return (
    <PageContainer>
      <p className="text-sm font-medium tracking-widest text-blue-400 uppercase">
        Start a project
      </p>
      <h1 className="mt-2 text-4xl font-bold tracking-tight">
        Tell me what you need built
      </h1>
      <p className="text-muted-foreground mt-4 max-w-2xl">
        A short brief is enough. I read every one and reply by email. If you already
        know you want to talk, book the 30-minute intro below.
      </p>
      <div className="mt-12">
        <ContactForm initialService={initialService} />
      </div>
      <ContactCtaPanel />
    </PageContainer>
  );
}

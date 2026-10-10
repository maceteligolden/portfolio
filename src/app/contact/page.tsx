import type { Metadata } from "next";

import { ContactCtaPanel } from "@/components/contact/contact-cta-panel";
import { ContactForm } from "@/components/contact/contact-form";
import { PageContainer } from "@/components/layout/page-container";
import { serviceOptions } from "@/lib/contact/options";
import { isContactIntent, type ContactIntent } from "@/lib/contact/schema";

const copy: Record<
  ContactIntent,
  { eyebrow: string; title: string; description: string; meta: string }
> = {
  project: {
    eyebrow: "Start a project",
    title: "Tell me what you need built",
    description:
      "A short brief is enough. I read every one and reply by email. If you already know you want to talk, book the 30-minute intro below.",
    meta: "Tell me what you need built. Workflow automation, custom fullstack software, or AI on a site you already run.",
  },
  hiring: {
    eyebrow: "Share a role",
    title: "Send the job description",
    description:
      "Share the role title and either a link or the description. I read every one and reply by email. If you would rather talk first, book a 30-minute call below.",
    meta: "Share an AI, AI product, software, full-stack, or backend role with Golden Mac-Eteli.",
  },
  product: {
    eyebrow: "The company",
    title: "Ask about the products",
    description: "A short note is enough for a question about Bloggr or WatchNode.",
    meta: "Ask about Bloggr or WatchNode.",
  },
};

interface ContactPageProps {
  searchParams: Promise<{ service?: string | string[]; intent?: string | string[] }>;
}

function firstParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function resolveIntent(value: string | string[] | undefined): ContactIntent {
  const raw = firstParam(value);
  return isContactIntent(raw) ? raw : "project";
}

export async function generateMetadata({
  searchParams,
}: ContactPageProps): Promise<Metadata> {
  const params = await searchParams;
  const page = copy[resolveIntent(params.intent)];
  return { title: page.eyebrow, description: page.meta };
}

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const params = await searchParams;
  const intent = resolveIntent(params.intent);
  const slug = firstParam(params.service);
  const initialService = serviceOptions.find((option) => option.slug === slug)?.value;
  const page = copy[intent];

  return (
    <PageContainer>
      <p className="text-sm font-medium tracking-widest text-blue-400 uppercase">
        {page.eyebrow}
      </p>
      <h1 className="mt-2 text-4xl font-bold tracking-tight">{page.title}</h1>
      <p className="text-muted-foreground mt-4 max-w-2xl">{page.description}</p>
      <div className="mt-12">
        <ContactForm intent={intent} initialService={initialService} />
      </div>
      <ContactCtaPanel showSchedule={intent === "project" || intent === "hiring"} />
    </PageContainer>
  );
}

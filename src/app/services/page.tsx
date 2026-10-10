import Link from "next/link";

import { TrackedLinkButton } from "@/components/analytics/tracked-link-button";
import { PageContainer } from "@/components/layout/page-container";
import { FaqSection } from "@/components/sections/faq-section";
import { PageCtaBand } from "@/components/sections/page-cta-band";
import { ServiceCards } from "@/components/services/service-cards";
import { TestimonialList } from "@/components/testimonials/testimonial-list";
import { getClientTestimonials, getHomeFaqs, getSiteConfig } from "@/lib/content";
import { getFaqJsonLd, getProfessionalServiceJsonLd } from "@/lib/seo/json-ld";

const site = getSiteConfig();
const faqs = getHomeFaqs();
const quotes = getClientTestimonials();

export const metadata = {
  title: "For clients",
  description: site.positioning,
};

export default function ServicesPage() {
  const jsonLd = getProfessionalServiceJsonLd();
  const faqJsonLd = getFaqJsonLd(faqs);

  return (
    <PageContainer>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <p className="text-sm font-medium tracking-widest text-blue-400 uppercase">
        For clients
      </p>
      <h1 className="mt-2 max-w-3xl text-4xl font-bold tracking-tight md:text-5xl">
        If you need something built, I can work with you
      </h1>
      <p className="text-muted-foreground mt-4 max-w-2xl text-lg">
        Tell me the problem. I will tell you what I can take on, and what you leave
        with: a workflow, a product, or an AI feature on a site you already run.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <TrackedLinkButton
          href="/contact?intent=project"
          intent="project"
          location="services-hub"
          size="lg"
        >
          Start a project
        </TrackedLinkButton>
        <TrackedLinkButton
          href="/contact?intent=project#schedule"
          intent="project"
          location="services-hub-schedule"
          variant="outline"
          size="lg"
        >
          Schedule a call
        </TrackedLinkButton>
      </div>
      <div className="mt-12">
        <ServiceCards />
      </div>
      <p className="text-muted-foreground mt-8 max-w-2xl text-sm">
        If you only need the API, the data, and the cloud, see{" "}
        <Link
          href="/services/backend-engineering"
          className="text-blue-400 hover:underline"
        >
          backend systems and APIs
        </Link>
        .
      </p>
      <h2 className="mt-16 text-2xl font-bold">
        What people say about working with me
      </h2>
      <div className="mt-8">
        <TestimonialList testimonials={quotes} />
      </div>
      <FaqSection embedded faqs={faqs} title="Questions you might have" />
      <PageCtaBand
        title="If this is the work you need, start here"
        description="Send a short brief, or book a 30-minute call if you would rather talk first. I read every note and reply by email."
      >
        <TrackedLinkButton
          href="/contact?intent=project"
          intent="project"
          location="services-close"
          size="lg"
        >
          Start a project
        </TrackedLinkButton>
        <TrackedLinkButton
          href="/contact?intent=project#schedule"
          intent="project"
          location="services-close-schedule"
          variant="outline"
          size="lg"
        >
          Schedule a call
        </TrackedLinkButton>
      </PageCtaBand>
    </PageContainer>
  );
}

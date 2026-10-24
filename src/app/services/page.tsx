import { TrackedLinkButton } from "@/components/analytics/tracked-link-button";
import { PageContainer } from "@/components/layout/page-container";
import { SquareLabel } from "@/components/layout/square-label";
import { PageCtaBand } from "@/components/sections/page-cta-band";
import { ServiceCards } from "@/components/services/service-cards";
import { TestimonialList } from "@/components/testimonials/testimonial-list";
import { getClientTestimonials, getSiteConfig } from "@/lib/content";
import { getProfessionalServiceJsonLd } from "@/lib/seo/json-ld";

const site = getSiteConfig();
const quotes = getClientTestimonials();

export const metadata = {
  title: "Services",
  description: site.positioning,
};

export default function ServicesPage() {
  const jsonLd = getProfessionalServiceJsonLd();

  return (
    <PageContainer>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SquareLabel>Services</SquareLabel>
      <h1 className="mt-4 max-w-3xl text-4xl leading-[1.1] font-normal tracking-tight md:text-5xl">
        Two ways to start
      </h1>
      <p className="text-muted-foreground mt-4 max-w-2xl text-lg">
        I build AI software for businesses. A chatbot answers the questions your team
        repeats. A workflow handles the lead, the routine email, and the follow-up.
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
          href="/schedule"
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
      <h2 className="mt-16 text-2xl font-bold">
        What people say about working with me
      </h2>
      <div className="mt-8">
        <TestimonialList testimonials={quotes} />
      </div>
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
          href="/schedule"
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

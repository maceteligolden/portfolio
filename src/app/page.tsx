import { ContactCtaSection } from "@/components/sections/contact-cta-section";
import { FaqSection } from "@/components/sections/faq-section";
import { FeaturedProjectsSection } from "@/components/sections/featured-projects-section";
import { HeroSection } from "@/components/sections/hero-section";
import { ServicesSection } from "@/components/sections/services-section";
import { TestimonialsPreviewSection } from "@/components/sections/testimonials-preview-section";
import { getHomeFaqs, getSiteConfig } from "@/lib/content";
import { getFaqJsonLd } from "@/lib/seo/json-ld";

const site = getSiteConfig();
const faqs = getHomeFaqs();

export const metadata = {
  title: { absolute: `${site.name} | ${site.title}` },
  description: site.tagline,
};

export default function HomePage() {
  const faqJsonLd = getFaqJsonLd(faqs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <HeroSection />
      <ServicesSection />
      <FeaturedProjectsSection />
      <TestimonialsPreviewSection />
      <FaqSection faqs={faqs} />
      <ContactCtaSection />
    </>
  );
}

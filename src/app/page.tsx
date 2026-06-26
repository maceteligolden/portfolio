import { ContactCtaSection } from "@/components/sections/contact-cta-section";
import { ExpertiseSection } from "@/components/sections/expertise-section";
import { FeaturedProjectsSection } from "@/components/sections/featured-projects-section";
import { HeroSection } from "@/components/sections/hero-section";
import { ImpactSection } from "@/components/sections/impact-section";
import { LatestBlogSection } from "@/components/sections/latest-blog-section";
import { TestimonialsPreviewSection } from "@/components/sections/testimonials-preview-section";
import { getSiteConfig } from "@/lib/content";

const site = getSiteConfig();

export const metadata = {
  title: `${site.name} | ${site.title}`,
  description: site.tagline,
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ExpertiseSection />
      <ImpactSection />
      <FeaturedProjectsSection />
      <TestimonialsPreviewSection />
      <LatestBlogSection />
      <ContactCtaSection />
    </>
  );
}

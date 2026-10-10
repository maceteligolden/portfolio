import { CapabilitySection } from "@/components/sections/capability-section";
import { FeaturedProjectsSection } from "@/components/sections/featured-projects-section";
import { HeroSection } from "@/components/sections/hero-section";
import { HomeClosingSection } from "@/components/sections/home-closing-section";
import { LatestBlogSection } from "@/components/sections/latest-blog-section";
import { OffersSection } from "@/components/sections/offers-section";
import { TestimonialsPreviewSection } from "@/components/sections/testimonials-preview-section";
import { getSiteConfig } from "@/lib/content";

const site = getSiteConfig();

export const metadata = {
  title: { absolute: `${site.name} | ${site.title}` },
  description: site.tagline,
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CapabilitySection />
      <FeaturedProjectsSection />
      <OffersSection />
      <TestimonialsPreviewSection />
      <LatestBlogSection />
      <HomeClosingSection />
    </>
  );
}

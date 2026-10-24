import { TrackedLinkButton } from "@/components/analytics/tracked-link-button";
import { FadeIn } from "@/components/layout/fade-in";
import { getSiteConfig } from "@/lib/content";

const site = getSiteConfig();

export function HeroSection() {
  return (
    <section className="bg-white py-24 md:py-32 lg:py-40">
      <div className="max-w-padding">
        <FadeIn className="max-w-4xl">
          <h1 className="text-5xl leading-[1.1] font-normal tracking-tight md:text-6xl lg:text-7xl">
            {site.headline}
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed md:text-xl">
            {site.headlineSecondary}
          </p>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed md:text-xl">
            {site.heroBoundary}
          </p>
          <div className="mt-10">
            <TrackedLinkButton
              href="/schedule"
              intent="project"
              location="home-schedule"
              size="lg"
              className="h-12 bg-black px-6 text-white hover:bg-black/80"
            >
              Schedule a call
            </TrackedLinkButton>
          </div>
          <p className="mt-8 text-base text-black/70">{site.frame}</p>
        </FadeIn>
      </div>
    </section>
  );
}

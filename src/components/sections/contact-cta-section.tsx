import { SectionHeading } from "@/components/layout/section-heading";
import { TrackedLinkButton } from "@/components/analytics/tracked-link-button";
import { getSiteConfig } from "@/lib/content";

const site = getSiteConfig();

export function ContactCtaSection() {
  return (
    <section className="relative overflow-hidden py-24">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10" />
      <div className="max-w-padding relative text-center">
        <SectionHeading
          label="Next"
          title="Where to go from here"
          description="If you need something built, if you are hiring, or if you want to try a product, pick the page that fits."
          align="center"
        />
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {site.offers.map((offer) => (
            <TrackedLinkButton
              key={offer.href}
              href={offer.href}
              intent={offer.intent}
              location={`blog-${offer.intent}`}
              variant={offer.intent === "project" ? "default" : "outline"}
              size="lg"
            >
              {offer.cta}
            </TrackedLinkButton>
          ))}
        </div>
      </div>
    </section>
  );
}

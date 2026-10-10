import { TrackedLinkButton } from "@/components/analytics/tracked-link-button";
import { SectionHeading } from "@/components/layout/section-heading";
import { getSiteConfig } from "@/lib/content";

const site = getSiteConfig();

function scheduleHref(intent: "project" | "hiring") {
  return `/contact?intent=${intent}#schedule`;
}

export function OffersSection() {
  return (
    <section className="border-border/40 bg-card/20 border-y py-20">
      <div className="max-w-padding">
        <SectionHeading
          label="Choose a path"
          title="Tell me what you came here for"
          description="If you already know, pick the one that fits. If you do not, read them. Each one tells you what you get."
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {site.offers.map((offer) => (
            <article
              key={offer.href}
              className="border-border/50 bg-card/50 flex h-full flex-col rounded-xl border p-8 md:p-10"
            >
              <h3 className="text-2xl font-semibold">{offer.title}</h3>
              <p className="text-muted-foreground mt-4 text-lg leading-relaxed">
                {offer.body}
              </p>
              <div className="mt-6 flex flex-wrap gap-3 lg:mt-auto lg:pt-6">
                <TrackedLinkButton
                  href={offer.href}
                  intent={offer.intent}
                  location={`home-offer-${offer.intent}`}
                  size="lg"
                >
                  {offer.cta}
                </TrackedLinkButton>
                {offer.schedule ? (
                  <TrackedLinkButton
                    href={scheduleHref(offer.intent)}
                    intent={offer.intent}
                    location={`home-offer-${offer.intent}-schedule`}
                    variant="outline"
                    size="lg"
                  >
                    Schedule a call
                  </TrackedLinkButton>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

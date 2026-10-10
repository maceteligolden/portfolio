import {
  TrackedAnchorButton,
  TrackedLinkButton,
} from "@/components/analytics/tracked-link-button";
import { getSiteConfig } from "@/lib/content";

const site = getSiteConfig();

export function HomeClosingSection() {
  return (
    <section className="py-20">
      <div className="max-w-padding">
        <div className="rounded-xl border border-blue-500/20 bg-gradient-to-br from-blue-500/10 to-purple-500/5 p-8 text-center md:p-12">
          <p className="text-sm font-medium tracking-widest text-blue-400 uppercase">
            Talk to me
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
            If you want to talk, I am here
          </h2>
          <p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-lg">
            Book a call, or go to the page that matches what you need. I read every
            note, and I reply by email at {site.email}.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <TrackedAnchorButton
              href={site.calendlyUrl}
              intent="project"
              location="home-close-schedule"
              size="lg"
              target="_blank"
              rel="noopener noreferrer"
            >
              Schedule a call
            </TrackedAnchorButton>
            {site.offers.map((offer) => (
              <TrackedLinkButton
                key={offer.href}
                href={offer.href}
                intent={offer.intent}
                location={`home-close-${offer.intent}`}
                variant="outline"
                size="lg"
              >
                {offer.title}
              </TrackedLinkButton>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

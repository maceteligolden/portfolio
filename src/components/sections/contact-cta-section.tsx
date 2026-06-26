import { SectionHeading } from "@/components/layout/section-heading";
import { AnchorButton, LinkButton } from "@/components/ui/link-button";
import { getSiteConfig } from "@/lib/content";

const site = getSiteConfig();
const linkedIn = site.social.find((s) => s.label === "LinkedIn");

export function ContactCtaSection() {
  return (
    <section className="relative overflow-hidden py-24">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10" />
      <div className="max-w-padding relative text-center">
        <SectionHeading
          label="Contact"
          title="Looking for an AI Engineer or Backend Engineer?"
          description="Let's discuss how I can help build production-grade systems for your team."
          align="center"
        />
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <AnchorButton href={`mailto:${site.email}`} size="lg">
            Email Me
          </AnchorButton>
          {linkedIn && (
            <AnchorButton
              href={linkedIn.href}
              variant="outline"
              size="lg"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </AnchorButton>
          )}
          {site.calendlyUrl && (
            <AnchorButton
              href={site.calendlyUrl}
              variant="outline"
              size="lg"
              target="_blank"
              rel="noopener noreferrer"
            >
              Book a Call
            </AnchorButton>
          )}
          <LinkButton href="/contact" variant="ghost" size="lg">
            Contact Page
          </LinkButton>
        </div>
      </div>
    </section>
  );
}

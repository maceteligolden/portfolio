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
          title="Have a problem worth building?"
          description="I'm open to AI and backend roles, consulting, and startup work. A 30-minute intro call is the easiest start."
          align="center"
        />
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <LinkButton href="/contact#schedule" size="lg">
            Set up a meeting
          </LinkButton>
          <AnchorButton href={`mailto:${site.email}`} variant="outline" size="lg">
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
        </div>
      </div>
    </section>
  );
}

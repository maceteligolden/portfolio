import { Code2, ExternalLink, Mail } from "lucide-react";

import { CalendlyInlineEmbed } from "@/components/contact/calendly-inline-embed";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { AnchorButton } from "@/components/ui/link-button";
import { getSiteConfig } from "@/lib/content";

const site = getSiteConfig();

export function ContactCtaPanel() {
  const linkedIn = site.social.find((s) => s.label === "LinkedIn");
  const github = site.social.find((s) => s.label === "GitHub");

  return (
    <div className="mt-12 space-y-10">
      {site.calendlyUrl && (
        <Card
          id="schedule"
          className="scroll-mt-24 border-blue-500/20 bg-gradient-to-br from-blue-500/10 to-purple-500/5"
        >
          <CardContent className="p-8 md:p-10">
            <p className="text-sm font-medium tracking-widest text-blue-400 uppercase">
              Schedule
            </p>
            <h2 className="mt-2 text-2xl font-semibold">Book a 30-minute intro</h2>
            <p className="text-muted-foreground mt-2 max-w-lg text-sm leading-relaxed">
              Use this if you would rather talk first. The brief above is enough if you
              want to write instead.
            </p>
            <div className="mt-8 overflow-hidden rounded-lg">
              <CalendlyInlineEmbed url={site.calendlyUrl} />
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="border-border/50 bg-card/50">
        <CardContent className="p-8 text-center md:p-10">
          <h2 className="text-xl font-semibold">Or reach out directly</h2>
          <p className="text-muted-foreground mx-auto mt-3 max-w-lg text-sm leading-relaxed">
            Email and LinkedIn work well if a live call is not the right fit.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <AnchorButton href={`mailto:${site.email}`} size="lg">
              <Mail className="mr-2 size-4" />
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
                <ExternalLink className="mr-2 size-4" />
                LinkedIn
              </AnchorButton>
            )}
            {github && (
              <AnchorButton
                href={github.href}
                variant="outline"
                size="lg"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Code2 className="mr-2 size-4" />
                GitHub
              </AnchorButton>
            )}
          </div>
        </CardContent>
      </Card>

      <div>
        <h2 className="text-xl font-semibold">Availability</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {site.availability.map((item) => (
            <Badge key={item.label} variant={item.active ? "default" : "secondary"}>
              {item.label}
            </Badge>
          ))}
        </div>
      </div>

      <div className="border-border/50 bg-card/30 rounded-xl border p-6">
        <p className="text-sm font-medium">Direct email</p>
        <a
          href={`mailto:${site.email}`}
          className="mt-1 inline-block text-blue-400 hover:underline"
        >
          {site.email}
        </a>
      </div>
    </div>
  );
}

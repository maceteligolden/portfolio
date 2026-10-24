import { Code2, ExternalLink, Mail } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { AnchorButton } from "@/components/ui/link-button";
import { getSiteConfig } from "@/lib/content";

const site = getSiteConfig();

export function ContactCtaPanel({ showSchedule = true }: { showSchedule?: boolean }) {
  const linkedIn = site.social.find((s) => s.label === "LinkedIn");
  const github = site.social.find((s) => s.label === "GitHub");

  return (
    <div className="mt-12 space-y-10">
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

      {showSchedule ? (
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
      ) : null}

      <div className="border-border/50 bg-card/30 rounded-xl border p-6">
        <p className="text-sm font-medium">Direct email</p>
        <a
          href={`mailto:${site.email}`}
          className="mt-1 inline-block underline underline-offset-4"
        >
          {site.email}
        </a>
      </div>
    </div>
  );
}

import { Calendar, Code2, ExternalLink, Mail, MessageCircle } from "lucide-react";

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
      <Card className="border-blue-500/20 bg-gradient-to-br from-blue-500/10 to-purple-500/5">
        <CardContent className="p-8 text-center md:p-10">
          <MessageCircle className="mx-auto size-10 text-blue-400" />
          <h2 className="mt-4 text-2xl font-semibold">Want a faster reply?</h2>
          <p className="text-muted-foreground mx-auto mt-3 max-w-lg text-sm leading-relaxed">
            Skip the back-and-forth. Email or LinkedIn are fastest for role inquiries.
            Prefer a live conversation? Book a short intro call below.
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

      {site.calendlyUrl && (
        <Card className="border-border/50 bg-card/50">
          <CardContent className="p-8 md:p-10">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm font-medium tracking-widest text-blue-400 uppercase">
                  Schedule
                </p>
                <h2 className="mt-2 text-xl font-semibold">Book a Calendly call</h2>
                <p className="text-muted-foreground mt-2 max-w-md text-sm">
                  Pick a time that works for you — great for interviews, consulting
                  chats, or project discussions.
                </p>
              </div>
              <AnchorButton
                href={site.calendlyUrl}
                size="lg"
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0"
              >
                <Calendar className="mr-2 size-4" />
                Book a Meeting
              </AnchorButton>
            </div>
          </CardContent>
        </Card>
      )}

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

import Link from "next/link";

import { CalendlyInlineEmbed } from "@/components/contact/calendly-inline-embed";
import { PageContainer } from "@/components/layout/page-container";
import { SquareLabel } from "@/components/layout/square-label";
import { getSiteConfig } from "@/lib/content";

const site = getSiteConfig();

export const metadata = {
  title: "Schedule a call",
  description: "Book a 30-minute intro with Golden Mac-Eteli.",
};

export default function SchedulePage() {
  return (
    <PageContainer>
      <SquareLabel>Schedule</SquareLabel>
      <h1 className="mt-4 max-w-3xl text-4xl leading-[1.1] font-normal tracking-tight md:text-5xl">
        Book a 30-minute intro
      </h1>
      <p className="text-muted-foreground mt-4 max-w-2xl">
        Use this if you would rather talk first. If you want to write instead,{" "}
        <Link href="/contact" className="underline underline-offset-4">
          send a note
        </Link>
        .
      </p>
      {site.calendlyUrl ? (
        <div className="mt-10">
          <CalendlyInlineEmbed url={site.calendlyUrl} />
        </div>
      ) : (
        <p className="mt-10">
          The calendar is not available. Email{" "}
          <a href={`mailto:${site.email}`} className="underline underline-offset-4">
            {site.email}
          </a>
          .
        </p>
      )}
    </PageContainer>
  );
}

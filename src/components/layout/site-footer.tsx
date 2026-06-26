import Link from "next/link";

import { Separator } from "@/components/ui/separator";
import { getSiteConfig } from "@/lib/content";

const site = getSiteConfig();
const year = new Date().getFullYear();

export function SiteFooter() {
  return (
    <footer className="border-border/40 bg-card/30 border-t">
      <div className="max-w-padding py-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="font-semibold">{site.name}</p>
            <p className="text-muted-foreground mt-2 max-w-sm text-sm">
              {site.tagline}
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            {site.social.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground text-sm transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        <Separator className="my-8" />
        <p className="text-muted-foreground text-center text-sm">
          © {year} {site.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

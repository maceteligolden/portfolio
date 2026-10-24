import Link from "next/link";

import { CookieSettingsButton } from "@/components/consent/cookie-banner";
import { getSiteConfig } from "@/lib/content";

const site = getSiteConfig();
const year = new Date().getFullYear();

export function SiteFooter() {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-padding py-16 md:py-24">
        <div className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between">
          <div>
            <a href={`mailto:${site.email}`} className="text-lg hover:opacity-70">
              {site.email}
            </a>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/70">
              {site.tagline}
            </p>
          </div>
          <div className="flex flex-col gap-10 sm:flex-row sm:gap-16">
            <div className="flex flex-col gap-3">
              {site.footerNav.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm hover:opacity-70"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="flex flex-col gap-3">
              {site.social.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm hover:opacity-70"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-16 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/60">
          <p>
            © {year} {site.name}
          </p>
          <Link href="/privacy" className="hover:text-white">
            Privacy
          </Link>
          <Link href="/terms" className="hover:text-white">
            Terms
          </Link>
          <CookieSettingsButton />
        </div>
      </div>
    </footer>
  );
}

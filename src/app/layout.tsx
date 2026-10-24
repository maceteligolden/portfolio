import type { Metadata } from "next";
import { JetBrains_Mono, Schibsted_Grotesk } from "next/font/google";
import { Toaster } from "sonner";

import { CookieBanner } from "@/components/consent/cookie-banner";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { getSiteConfig } from "@/lib/content";
import { env } from "@/lib/env";
import { QueryProvider } from "@/lib/providers/query-provider";
import { ThemeProvider } from "@/lib/providers/theme-provider";
import { getPersonJsonLd, getWebsiteJsonLd } from "@/lib/seo/json-ld";

import "./globals.css";

const schibsted = Schibsted_Grotesk({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

const site = getSiteConfig();

export const metadata: Metadata = {
  metadataBase: new URL(env.siteUrl),
  title: {
    default: `${site.name} | ${site.title}`,
    template: `%s | ${site.name}`,
  },
  description: site.tagline,
  keywords: [
    "Golden Mac-Eteli",
    "software engineer",
    "AI engineer",
    "AI product engineer",
    "backend engineer",
    "full-stack engineer",
    "Bloggr",
    "TypeScript",
    "Node.js",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: env.siteUrl,
    siteName: `${site.name} Portfolio`,
    title: `${site.name} | ${site.title}`,
    description: site.tagline,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | ${site.title}`,
    description: site.tagline,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const personJsonLd = getPersonJsonLd();
  const websiteJsonLd = getWebsiteJsonLd();

  return (
    <html
      lang="en"
      className={`${schibsted.variable} ${jetbrainsMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body className="flex min-h-full flex-col">
        <ThemeProvider>
          <QueryProvider>
            <SiteHeader />
            <main className="flex-1 pt-16">{children}</main>
            <SiteFooter />
            <CookieBanner />
            <Toaster richColors position="top-right" />
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

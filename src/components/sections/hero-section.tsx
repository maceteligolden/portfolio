"use client";

import { motion } from "framer-motion";

import { TrackedAnchorButton } from "@/components/analytics/tracked-link-button";
import { GlowBackground } from "@/components/layout/glow-background";
import { Badge } from "@/components/ui/badge";
import { getSiteConfig } from "@/lib/content";

const site = getSiteConfig();

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <GlowBackground />
      <div className="max-w-padding relative">
        <motion.div
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
            {site.headline}
            <span className="text-muted-foreground mt-2 block text-2xl font-semibold tracking-tight md:text-3xl lg:text-4xl">
              {site.headlineSecondary}
            </span>
          </h1>
          <div className="mt-8">
            <TrackedAnchorButton
              href={site.calendlyUrl}
              intent="project"
              location="home-schedule"
              size="lg"
              target="_blank"
              rel="noopener noreferrer"
            >
              Schedule a call
            </TrackedAnchorButton>
          </div>
          <ul className="mt-8 flex flex-wrap items-center gap-2">
            {site.stack.map((item) => (
              <li key={item}>
                <Badge variant="secondary" className="h-auto px-3 py-1">
                  {item}
                </Badge>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}

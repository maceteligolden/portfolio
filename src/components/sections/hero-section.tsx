"use client";

import { motion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";

import { GlowBackground } from "@/components/layout/glow-background";
import { Badge } from "@/components/ui/badge";
import { AnchorButton, LinkButton } from "@/components/ui/link-button";
import { getSiteConfig } from "@/lib/content";

const site = getSiteConfig();

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <GlowBackground />
      <div className="max-w-padding relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-3xl text-center md:mx-0 md:text-left"
        >
          <Badge
            variant="outline"
            className="h-auto border-blue-400/30 bg-blue-500/10 px-3 py-1 text-blue-400"
          >
            Open to AI Engineer roles
          </Badge>
          <h1 className="mt-6 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
            {site.headline}
            <span className="text-muted-foreground mt-2 block text-2xl font-semibold tracking-tight md:text-3xl lg:text-4xl">
              {site.headlineSecondary}
            </span>
          </h1>
          <p className="text-muted-foreground mt-6 max-w-xl text-lg md:mx-0">
            {site.tagline}
          </p>
          <ul className="mt-6 flex flex-wrap items-center justify-center gap-2 md:justify-start">
            {site.stack.map((item) => (
              <li key={item}>
                <Badge variant="secondary" className="h-auto px-3 py-1">
                  {item}
                </Badge>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 md:justify-start">
            <LinkButton href="/projects" size="lg">
              View Projects
              <ArrowRight className="ml-1 size-4" />
            </LinkButton>
            <LinkButton href="/contact" variant="outline" size="lg">
              Contact Me
            </LinkButton>
            <AnchorButton href={site.resumePath} variant="ghost" size="lg" download>
              <Download className="mr-1 size-4" />
              Download Resume
            </AnchorButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

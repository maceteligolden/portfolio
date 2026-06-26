"use client";

import { motion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import Image from "next/image";

import { GlowBackground } from "@/components/layout/glow-background";
import { AnchorButton, LinkButton } from "@/components/ui/link-button";
import { getSiteConfig } from "@/lib/content";

const site = getSiteConfig();

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <GlowBackground />
      <div className="max-w-padding relative flex flex-col items-center gap-12 lg:flex-row lg:items-center lg:justify-between">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex-1 text-center lg:text-left"
        >
          <p className="text-sm font-medium tracking-widest text-blue-400 uppercase">
            {site.name}
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
            {site.title}
          </h1>
          <p className="text-muted-foreground mt-6 max-w-xl text-lg">{site.tagline}</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
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
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="relative"
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 blur-2xl" />
          <div className="border-border/50 bg-card/50 relative rounded-2xl border p-2 backdrop-blur-sm">
            <Image
              src={site.headshot}
              alt={site.name}
              width={280}
              height={280}
              className="rounded-xl"
              priority
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

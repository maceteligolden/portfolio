"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

import { SectionHeading } from "@/components/layout/section-heading";
import { ProjectCard } from "@/components/projects/project-card";
import { LinkButton } from "@/components/ui/link-button";
import { getFeaturedProjects } from "@/lib/content";

const featuredOrder = ["bloggr", "watchnode", "repore"];
const projects = getFeaturedProjects().sort(
  (a, b) => featuredOrder.indexOf(a.slug) - featuredOrder.indexOf(b.slug),
);

export function FeaturedProjectsSection() {
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionQuery.matches) return;

    let frame = 0;
    let paused = false;
    let direction = 1;

    const tick = () => {
      const max = scroller.scrollWidth - scroller.clientWidth;
      if (!paused && max > 1) {
        const next = scroller.scrollLeft + direction * 0.4;
        if (next >= max) {
          scroller.scrollLeft = max;
          direction = -1;
        } else if (next <= 0) {
          scroller.scrollLeft = 0;
          direction = 1;
        } else {
          scroller.scrollLeft = next;
        }
      }
      frame = window.requestAnimationFrame(tick);
    };

    const pause = () => {
      paused = true;
    };
    const resume = () => {
      paused = false;
    };

    scroller.addEventListener("mouseenter", pause);
    scroller.addEventListener("mouseleave", resume);
    scroller.addEventListener("focusin", pause);
    scroller.addEventListener("focusout", resume);
    frame = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(frame);
      scroller.removeEventListener("mouseenter", pause);
      scroller.removeEventListener("mouseleave", resume);
      scroller.removeEventListener("focusin", pause);
      scroller.removeEventListener("focusout", resume);
    };
  }, []);

  return (
    <section className="py-20">
      <div className="max-w-padding">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            label="Work"
            title="Selected work"
            description="An AI content product, an anomaly-detection system, and a product I took from the web version through the API and the cloud."
          />
          <LinkButton href="/projects" variant="outline">
            All work
          </LinkButton>
        </div>
        <div
          ref={scrollerRef}
          className="mt-12 flex gap-8 overflow-x-scroll pb-4"
          tabIndex={0}
          aria-label="Selected work"
        >
          {projects.map((project) => (
            <motion.div
              key={project.slug}
              initial={false}
              className="w-[min(32rem,85vw)] shrink-0"
            >
              <ProjectCard
                project={project}
                relaxed
                className="h-full hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/5"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

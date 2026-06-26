"use client";

import { motion } from "framer-motion";

import { SectionHeading } from "@/components/layout/section-heading";
import { ProjectCard } from "@/components/projects/project-card";
import { LinkButton } from "@/components/ui/link-button";
import { getFeaturedProjects } from "@/lib/content";

const projects = getFeaturedProjects();

export function FeaturedProjectsSection() {
  return (
    <section className="py-20">
      <div className="max-w-padding">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading label="Recent" title="Projects" />
          <LinkButton href="/projects" variant="outline">
            View All Projects
          </LinkButton>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <ProjectCard
                project={project}
                className="h-full hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/5"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";

import { ProjectCard } from "@/components/projects/project-card";
import { getAllProjects } from "@/lib/content";

const projects = getAllProjects();

export function ProjectsGrid() {
  return (
    <div className="mt-10 grid gap-6 md:grid-cols-2">
      {projects.map((project, i) => (
        <motion.div
          key={project.slug}
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
        >
          <ProjectCard project={project} />
        </motion.div>
      ))}
    </div>
  );
}

"use client";

import { motion } from "framer-motion";
import { useMemo, useState } from "react";

import { ProjectCard } from "@/components/projects/project-card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getAllProjects, type ProjectCategory, type ProjectType } from "@/lib/content";
import { isProjectType } from "@/lib/projects/project-type";

type ProjectFilter = "all" | ProjectType | ProjectCategory;

const filters: { value: ProjectFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "product", label: "Product" },
  { value: "open-source", label: "Open Source" },
  { value: "contract", label: "Contract" },
  { value: "ai", label: "AI" },
  { value: "backend", label: "Backend" },
  { value: "full-stack", label: "Full Stack" },
];

function filterProjects(filter: ProjectFilter) {
  const all = getAllProjects();
  if (filter === "all") return all;
  if (isProjectType(filter)) return all.filter((p) => p.type === filter);
  return all.filter((p) => p.categories.includes(filter));
}

export function ProjectsGrid() {
  const [filter, setFilter] = useState<ProjectFilter>("all");
  const projects = useMemo(() => filterProjects(filter), [filter]);

  return (
    <>
      <Tabs
        value={filter}
        onValueChange={(v) => setFilter(v as ProjectFilter)}
        className="mt-8"
      >
        <TabsList className="h-auto flex-wrap">
          {filters.map((item) => (
            <TabsTrigger key={item.value} value={item.value}>
              {item.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {projects.map((project, i) => (
          <motion.div
            key={project.slug}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <ProjectCard
              project={project}
              className="hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/5"
            />
          </motion.div>
        ))}
      </div>
    </>
  );
}

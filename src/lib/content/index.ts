import { expertiseAreas } from "@content/expertise";
import { metrics } from "@content/metrics";
import { aboutContent, philosophyItems, techStack } from "@content/philosophy";
import {
  projects,
  type ArchitectureDecisionsInterface,
  type ProjectCategory,
  type ProjectInterface,
  type ProjectType,
  type StarFeatureInterface,
} from "@content/projects";
import { resumeContent } from "@content/resume";
import { siteConfig } from "@content/site";
import { testimonials } from "@content/testimonials";
import { env } from "@/lib/env";

export type {
  ArchitectureDecisionsInterface,
  ProjectCategory,
  ProjectInterface,
  ProjectType,
  StarFeatureInterface,
};

export function getSiteConfig() {
  return {
    ...siteConfig,
    calendlyUrl: env.calendlyUrl || siteConfig.calendlyUrl,
  };
}

export function getMetrics() {
  return metrics;
}

export function getExpertiseAreas() {
  return expertiseAreas;
}

export function getPhilosophyItems() {
  return philosophyItems;
}

export function getTechStack() {
  return techStack;
}

export function getAboutContent() {
  return aboutContent;
}

export function getAllProjects(): ProjectInterface[] {
  return projects;
}

export function getFeaturedProjects(): ProjectInterface[] {
  return projects.filter((p) => p.featured);
}

export function getProjectBySlug(slug: string): ProjectInterface | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getProjectsByCategory(
  category: ProjectCategory | "all",
): ProjectInterface[] {
  if (category === "all") return projects;
  return projects.filter((p) => p.categories.includes(category));
}

export function getProjectsByType(type: ProjectType | "all") {
  if (type === "all") return projects;
  return projects.filter((p) => p.type === type);
}

export function getTestimonials() {
  return testimonials;
}

export function getFeaturedTestimonials() {
  return testimonials.filter((t) => t.featured).slice(0, 3);
}

export function getResumeContent() {
  return resumeContent;
}

export function getCertifications() {
  return resumeContent.certifications;
}

export function getProjectSlugs(): string[] {
  return projects.map((p) => p.slug);
}

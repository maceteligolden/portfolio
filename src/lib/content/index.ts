import {
  careerContent,
  careerEducation,
  careerExperience,
  careerFaqs,
  careerRoles,
  careerStack,
} from "@content/career";
import { expertiseAreas } from "@content/expertise";
import { aboutFaqs, blogFaqs, homeFaqs } from "@content/faqs";
import { metrics } from "@content/metrics";
import { aboutContent, philosophyItems, techStack } from "@content/philosophy";
import { productSpotlights, productsContent } from "@content/products";
import {
  projects,
  type ArchitectureDecisionsInterface,
  type ProjectCategory,
  type ProjectInterface,
  type ProjectMediaInterface,
  type ProjectType,
} from "@content/projects";
import { resumeContent } from "@content/resume";
import { services, type ServiceInterface } from "@content/services";
import { siteConfig } from "@content/site";
import { testimonials } from "@content/testimonials";
import { env } from "@/lib/env";

export type { ServiceInterface };

export type {
  ArchitectureDecisionsInterface,
  ProjectCategory,
  ProjectInterface,
  ProjectMediaInterface,
  ProjectType,
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

export function getHomeFaqs() {
  return homeFaqs;
}

export function getAboutFaqs() {
  return aboutFaqs;
}

export function getBlogFaqs() {
  return blogFaqs;
}

export function getServices(): ServiceInterface[] {
  return services;
}

export function getHubServices(): ServiceInterface[] {
  return services.filter((service) => service.hub);
}

export function getCareerContent() {
  return careerContent;
}

export function getCareerRoles() {
  return careerRoles;
}

export function getCareerFaqs() {
  return careerFaqs;
}

export function getCareerStack() {
  return careerStack;
}

export function getCareerExperience() {
  return careerExperience;
}

export function getCareerEducation() {
  return careerEducation;
}

export function getProductsContent() {
  return productsContent;
}

export function getProductSpotlights() {
  return productSpotlights;
}

export function getServiceBySlug(slug: string): ServiceInterface | undefined {
  return services.find((service) => service.slug === slug);
}

export function getServiceSlugs(): string[] {
  return services.map((service) => service.slug);
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

export function getClientTestimonials() {
  return testimonials.filter((testimonial) => testimonial.audience === "client");
}

export function getRecruiterTestimonials() {
  return testimonials.filter((testimonial) => testimonial.audience === "recruiter");
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

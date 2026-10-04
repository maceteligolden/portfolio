import type { ProjectType } from "@content/projects";

export const PROJECT_TYPE_LABELS: Record<ProjectType, string> = {
  product: "Product I built",
  "open-source": "Product I built",
  contract: "Client engagement",
};

export function isProjectType(value: string): value is ProjectType {
  return value === "product" || value === "open-source" || value === "contract";
}

export function formatProjectType(type: ProjectType): string {
  return PROJECT_TYPE_LABELS[type];
}

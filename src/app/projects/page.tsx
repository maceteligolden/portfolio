import { PageContainer } from "@/components/layout/page-container";
import { ProjectsGrid } from "@/components/projects/projects-grid";
import { getSiteConfig } from "@/lib/content";

const site = getSiteConfig();

export const metadata = {
  title: `Projects | ${site.name}`,
  description: "AI systems, backend platforms, and full-stack products.",
};

export default function ProjectsPage() {
  return (
    <PageContainer>
      <p className="text-sm font-medium tracking-widest text-blue-400 uppercase">
        Projects
      </p>
      <h1 className="mt-2 text-4xl font-bold tracking-tight">Selected Work</h1>
      <p className="text-muted-foreground mt-4 max-w-2xl">
        Production systems, AI platforms, and full-stack products with measurable
        impact.
      </p>
      <ProjectsGrid />
    </PageContainer>
  );
}

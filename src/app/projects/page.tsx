import { PageContainer } from "@/components/layout/page-container";
import { ProjectsGrid } from "@/components/projects/projects-grid";
import { getSiteConfig } from "@/lib/content";

const site = getSiteConfig();

export const metadata = {
  title: "Work",
  description: `Case studies from ${site.name}: client engagements and products, with the problem, what shipped, and the technology.`,
};

export default function ProjectsPage() {
  return (
    <PageContainer>
      <p className="text-sm font-medium tracking-widest text-blue-400 uppercase">
        Work
      </p>
      <h1 className="mt-2 text-4xl font-bold tracking-tight">Selected work</h1>
      <p className="text-muted-foreground mt-4 max-w-2xl">
        Client engagements and products I built. Each case study covers the problem,
        what shipped, and the technology behind it.
      </p>
      <ProjectsGrid />
    </PageContainer>
  );
}

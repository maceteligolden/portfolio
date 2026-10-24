import { PageContainer } from "@/components/layout/page-container";
import { SquareLabel } from "@/components/layout/square-label";
import { ProjectsGrid } from "@/components/projects/projects-grid";
import { getSiteConfig } from "@/lib/content";

const site = getSiteConfig();

export const metadata = {
  title: "Work",
  description: `Case studies from ${site.name}: the problem, the solution, the part he handled, and the impact when it is known.`,
};

export default function ProjectsPage() {
  return (
    <PageContainer>
      <SquareLabel>Work</SquareLabel>
      <h1 className="mt-4 text-4xl leading-[1.1] font-normal tracking-tight md:text-5xl">
        Selected work
      </h1>
      <p className="text-muted-foreground mt-4 max-w-2xl">
        Each case study covers the problem, the solution, the part I handled, and the
        impact when that impact is known.
      </p>
      <ProjectsGrid />
    </PageContainer>
  );
}

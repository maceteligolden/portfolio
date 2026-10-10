import { PageContainer } from "@/components/layout/page-container";
import { ProjectsGrid } from "@/components/projects/projects-grid";
import { getSiteConfig } from "@/lib/content";
import { parseProjectFilter } from "@/lib/projects/project-type";

const site = getSiteConfig();

export const metadata = {
  title: "Work",
  description: `Case studies from ${site.name}: the problem, the solution, the part he handled, and the impact when it is known.`,
};

interface ProjectsPageProps {
  searchParams: Promise<{ type?: string | string[] }>;
}

export default async function ProjectsPage({ searchParams }: ProjectsPageProps) {
  const params = await searchParams;
  const type = Array.isArray(params.type) ? params.type[0] : params.type;

  return (
    <PageContainer>
      <p className="text-sm font-medium tracking-widest text-blue-400 uppercase">
        Work
      </p>
      <h1 className="mt-2 text-4xl font-bold tracking-tight">Selected work</h1>
      <p className="text-muted-foreground mt-4 max-w-2xl">
        Each case study covers the problem, the solution, the part I handled, and the
        impact when that impact is known.
      </p>
      <ProjectsGrid key={type ?? "all"} initialFilter={parseProjectFilter(type)} />
    </PageContainer>
  );
}

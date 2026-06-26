import { ArrowLeft, Code2, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ProjectArchitectureSection } from "@/components/projects/project-architecture-section";
import { ProjectStarFeature } from "@/components/projects/project-star-feature";
import { Badge } from "@/components/ui/badge";
import { AnchorButton, buttonLinkClassName } from "@/components/ui/link-button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getProjectBySlug, getProjectSlugs, getSiteConfig } from "@/lib/content";
import { formatProjectType } from "@/lib/projects/project-type";
import { getCreativeWorkJsonLd } from "@/lib/seo/json-ld";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  const site = getSiteConfig();
  if (!project) return { title: "Project Not Found" };
  return {
    title: `${project.title} | ${site.name}`,
    description: project.summary,
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const jsonLd = getCreativeWorkJsonLd(project);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="max-w-padding py-16">
        <Link
          href="/projects"
          className={buttonLinkClassName({
            variant: "ghost",
            size: "sm",
            className: "mb-8 inline-flex",
          })}
        >
          <ArrowLeft className="mr-1 size-4" />
          Back to Projects
        </Link>

        <div className="bg-muted/30 relative mb-8 aspect-video overflow-hidden rounded-xl">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-contain p-12"
            priority
          />
        </div>

        <div className="mb-4 flex flex-wrap gap-2">
          <Badge variant="default">{formatProjectType(project.type)}</Badge>
          <Badge variant="outline" className="capitalize">
            {project.category.replace("-", " ")}
          </Badge>
        </div>
        <h1 className="text-4xl font-bold tracking-tight">{project.title}</h1>
        <p className="text-muted-foreground mt-4 text-lg">{project.summary}</p>

        <div className="mt-6 flex flex-wrap gap-3">
          {project.links.live && (
            <AnchorButton
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="mr-1 size-4" />
              View
            </AnchorButton>
          )}
          {project.links.github && (
            <AnchorButton
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Code2 className="mr-1 size-4" />
              GitHub
            </AnchorButton>
          )}
        </div>

        <Separator className="my-12" />

        <div className="grid gap-12 lg:grid-cols-3">
          <div className="space-y-12 lg:col-span-2">
            <section>
              <h2 className="text-xl font-semibold">About the Project</h2>
              <p className="text-muted-foreground mt-3 leading-relaxed">
                {project.about}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold">Problem</h2>
              <p className="text-muted-foreground mt-3 leading-relaxed">
                {project.problem}
              </p>
            </section>

            <section>
              <div className="mb-6">
                <h2 className="text-xl font-semibold">Features I Handled</h2>
                <p className="text-muted-foreground mt-2 text-sm">
                  Described using the STAR method — Situation, Task, Action, Result.
                </p>
              </div>
              <div className="space-y-6">
                {project.features.map((feature, index) => (
                  <ProjectStarFeature
                    key={feature.title}
                    feature={feature}
                    index={index}
                  />
                ))}
              </div>
            </section>

            <ProjectArchitectureSection architecture={project.architecture} />
          </div>

          <aside className="space-y-6">
            <Card className="border-border/50 bg-card/50">
              <CardContent className="p-6">
                <h3 className="font-semibold">Technologies</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="secondary">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card className="border-border/50 bg-card/50">
              <CardContent className="p-6">
                <h3 className="font-semibold">Key Outcomes</h3>
                <ul className="text-muted-foreground mt-3 space-y-2 text-sm">
                  {project.outcomes.map((outcome) => (
                    <li key={outcome}>• {outcome}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Card className="border-border/50 bg-card/50">
              <CardContent className="p-6">
                <h3 className="font-semibold">At a Glance</h3>
                <dl className="mt-3 space-y-3 text-sm">
                  {project.architecture.highlights.map((item) => (
                    <div key={item.label}>
                      <dt className="text-muted-foreground">{item.label}</dt>
                      <dd className="font-medium">{item.value}</dd>
                    </div>
                  ))}
                </dl>
              </CardContent>
            </Card>
          </aside>
        </div>
      </article>
    </>
  );
}

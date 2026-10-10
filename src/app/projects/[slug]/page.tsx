import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
  TrackedAnchorButton,
  TrackedLinkButton,
} from "@/components/analytics/tracked-link-button";
import { ProjectArchitectureSection } from "@/components/projects/project-architecture-section";
import { ProjectMediaCarousel } from "@/components/projects/project-media-carousel";
import { Badge } from "@/components/ui/badge";
import { buttonLinkClassName } from "@/components/ui/link-button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  getProjectBySlug,
  getProjectSlugs,
  type ProjectInterface,
} from "@/lib/content";
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
  if (!project) return { title: "Project Not Found" };
  return {
    title: project.seoTitle,
    description: project.summary,
  };
}

function ProjectActions({
  project,
  location,
}: {
  project: ProjectInterface;
  location: string;
}) {
  if (project.type === "contract") {
    return (
      <>
        <TrackedLinkButton
          href="/contact?intent=project"
          intent="project"
          location={location}
          size="lg"
        >
          Start a project
        </TrackedLinkButton>
        <TrackedLinkButton
          href="/contact?intent=project#schedule"
          intent="project"
          location={`${location}-schedule`}
          variant="outline"
          size="lg"
        >
          Schedule a call
        </TrackedLinkButton>
      </>
    );
  }

  if (project.links.live) {
    return (
      <>
        <TrackedAnchorButton
          href={project.links.live}
          intent="product"
          location={location}
          size="lg"
          target="_blank"
          rel="noopener noreferrer"
        >
          Open the product
        </TrackedAnchorButton>
        {project.links.github ? (
          <TrackedAnchorButton
            href={project.links.github}
            intent="product"
            location={`${location}-github`}
            variant="outline"
            size="lg"
            target="_blank"
            rel="noopener noreferrer"
          >
            View the code
          </TrackedAnchorButton>
        ) : null}
      </>
    );
  }

  return (
    <>
      <TrackedLinkButton
        href="/contact?intent=product"
        intent="product"
        location={location}
        size="lg"
      >
        Talk about a system like this
      </TrackedLinkButton>
      {project.links.github ? (
        <TrackedAnchorButton
          href={project.links.github}
          intent="product"
          location={`${location}-github`}
          variant="outline"
          size="lg"
          target="_blank"
          rel="noopener noreferrer"
        >
          View the code
        </TrackedAnchorButton>
      ) : null}
    </>
  );
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const jsonLd = getCreativeWorkJsonLd(project);
  const sections = [
    { title: "Problem", body: project.problem },
    { title: "Solution", body: project.solution },
    { title: "What I handled", body: project.contribution },
    ...(project.impact ? [{ title: "Impact", body: project.impact }] : []),
    ...(project.direction
      ? [{ title: "Where it is going", body: project.direction }]
      : []),
  ];

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
          Back to work
        </Link>

        <ProjectMediaCarousel media={project.media} title={project.title} />

        <Badge variant="default">{formatProjectType(project.type)}</Badge>
        <p className="text-muted-foreground mt-4 text-sm">{project.title}</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight">{project.seoTitle}</h1>
        <p className="mt-4 max-w-3xl text-lg">{project.audience}</p>

        <div className="mt-6 flex flex-wrap gap-3">
          <ProjectActions project={project} location={`project-${project.slug}-top`} />
        </div>

        <Separator className="my-12" />

        <div className="grid gap-12 lg:grid-cols-3">
          <div className="space-y-12 lg:col-span-2">
            {sections.map((section) => (
              <section key={section.title}>
                <h2 className="text-xl font-semibold">{section.title}</h2>
                <p className="text-muted-foreground mt-3 leading-relaxed">
                  {section.body}
                </p>
              </section>
            ))}

            <ProjectArchitectureSection architecture={project.architecture} />
          </div>

          <aside className="space-y-6">
            <Card className="border-border/50 bg-card/50">
              <CardContent className="p-6">
                <h3 className="font-semibold">Technology</h3>
                <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
                  {project.architecture.summary}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
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
                <h3 className="font-semibold">At a glance</h3>
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

        <section className="border-border/50 mt-16 rounded-xl border bg-gradient-to-br from-blue-500/10 to-purple-500/5 p-8 md:p-10">
          {project.type === "contract" ? (
            <>
              <h2 className="text-2xl font-semibold">Start a project like this</h2>
              <p className="text-muted-foreground mt-3 max-w-xl">
                If this is close to what you need, send a short brief or book a
                30-minute intro.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <ProjectActions
                  project={project}
                  location={`project-${project.slug}`}
                />
              </div>
            </>
          ) : project.links.live ? (
            <>
              <h2 className="text-2xl font-semibold">This product is online</h2>
              <p className="text-muted-foreground mt-3 max-w-xl">
                You can try it, or read the other case studies.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <ProjectActions
                  project={project}
                  location={`project-${project.slug}-live`}
                />
              </div>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-semibold">Talk about a system like this</h2>
              <p className="text-muted-foreground mt-3 max-w-xl">
                The write-up above is the record. If you want a system like it, send a
                note.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <ProjectActions
                  project={project}
                  location={`project-${project.slug}`}
                />
              </div>
            </>
          )}
        </section>
      </article>
    </>
  );
}

import { ArrowLeft, Code2, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ProjectArchitectureSection } from "@/components/projects/project-architecture-section";
import { ProjectStarFeature } from "@/components/projects/project-star-feature";
import { Badge } from "@/components/ui/badge";
import {
  AnchorButton,
  LinkButton,
  buttonLinkClassName,
} from "@/components/ui/link-button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getProjectBySlug, getProjectSlugs } from "@/lib/content";
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

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const jsonLd = getCreativeWorkJsonLd(project);
  const isLogo = project.image.endsWith(".svg");
  const gallery = project.gallery.filter((src) => src !== project.image);

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

        <div className="bg-muted/30 relative mb-8 aspect-video overflow-hidden rounded-xl">
          <Image
            src={project.image}
            alt={project.seoTitle}
            fill
            className={isLogo ? "object-contain p-12" : "object-cover"}
            priority
          />
        </div>

        {gallery.length > 0 && (
          <div className="mb-8 grid gap-4 sm:grid-cols-2">
            {gallery.map((src) => (
              <div
                key={src}
                className="bg-muted/30 relative aspect-video overflow-hidden rounded-xl"
              >
                <Image
                  src={src}
                  alt={`${project.title} screenshot`}
                  fill
                  className={
                    src.endsWith(".svg") ? "object-contain p-8" : "object-cover"
                  }
                />
              </div>
            ))}
          </div>
        )}

        <Badge variant="default">{formatProjectType(project.type)}</Badge>
        <p className="text-muted-foreground mt-4 text-sm">{project.title}</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight">{project.seoTitle}</h1>
        <p className="mt-4 max-w-3xl text-lg">{project.audience}</p>
        <p className="text-muted-foreground mt-4 max-w-3xl text-lg">
          {project.summary}
        </p>

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
              <h2 className="text-xl font-semibold">Problem</h2>
              <p className="text-muted-foreground mt-3 leading-relaxed">
                {project.problem}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold">What shipped</h2>
              <p className="text-muted-foreground mt-3 leading-relaxed">
                {project.shipped}
              </p>
              <ul className="text-muted-foreground mt-4 space-y-2 text-sm">
                {project.outcomes.map((outcome) => (
                  <li key={outcome}>• {outcome}</li>
                ))}
              </ul>
            </section>

            <section>
              <div className="mb-6">
                <h2 className="text-xl font-semibold">How it was built</h2>
                <p className="text-muted-foreground mt-2 text-sm">{project.about}</p>
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
          <h2 className="text-2xl font-semibold">Start a project like this</h2>
          <p className="text-muted-foreground mt-3 max-w-xl">
            If this is close to what you need, send a short brief or book a 30-minute
            intro.
          </p>
          <div className="mt-6">
            <LinkButton href="/contact" size="lg">
              Start a project
            </LinkButton>
          </div>
        </section>
      </article>
    </>
  );
}

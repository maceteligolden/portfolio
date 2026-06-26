"use client";

import { Code2, ExternalLink } from "lucide-react";
import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { AnchorButton, LinkButton } from "@/components/ui/link-button";
import type { ProjectInterface } from "@/lib/content";
import { formatProjectType } from "@/lib/projects/project-type";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: ProjectInterface;
  className?: string;
}

export function ProjectCard({ project, className }: ProjectCardProps) {
  const detailHref = `/projects/${project.slug}`;

  return (
    <Card
      className={cn(
        "border-border/50 bg-card/50 flex h-full flex-col overflow-hidden transition-all hover:border-blue-500/30",
        className,
      )}
    >
      <div className="bg-muted/30 relative aspect-video">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-contain p-8"
        />
      </div>

      <CardContent className="flex flex-1 flex-col p-6">
        <div className="mb-2 flex flex-wrap gap-2">
          <Badge variant="default" className="capitalize">
            {formatProjectType(project.type)}
          </Badge>
          <Badge variant="outline" className="capitalize">
            {project.category.replace("-", " ")}
          </Badge>
        </div>

        <h2 className="text-xl font-semibold">{project.title}</h2>
        <p className="text-muted-foreground mt-2 flex-1 text-sm">{project.summary}</p>

        <div className="mt-4 flex flex-wrap gap-1">
          {project.technologies.slice(0, 5).map((tech) => (
            <Badge key={tech} variant="secondary" className="text-xs">
              {tech}
            </Badge>
          ))}
        </div>

        {project.outcomes[0] && (
          <p className="mt-3 text-xs text-blue-400">{project.outcomes[0]}</p>
        )}

        <div className="mt-6 flex flex-wrap gap-2">
          {project.type === "contract" ? (
            <LinkButton href={detailHref} size="sm">
              View Details
            </LinkButton>
          ) : (
            <>
              <LinkButton href={detailHref} variant="outline" size="sm">
                View Details
              </LinkButton>

              {project.type === "open-source" && project.links.github && (
                <AnchorButton
                  href={project.links.github}
                  size="sm"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Code2 className="mr-1 size-4" />
                  GitHub
                </AnchorButton>
              )}

              {project.type === "product" && project.links.live && (
                <AnchorButton
                  href={project.links.live}
                  size="sm"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="mr-1 size-4" />
                  View
                </AnchorButton>
              )}
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

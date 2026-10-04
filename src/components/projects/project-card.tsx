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
  const isLogo = project.image.endsWith(".svg");

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
          alt={project.seoTitle}
          fill
          className={isLogo ? "object-contain p-8" : "object-cover"}
        />
      </div>

      <CardContent className="flex flex-1 flex-col p-6">
        <Badge variant="default" className="w-fit">
          {formatProjectType(project.type)}
        </Badge>

        <h2 className="mt-3 text-xl font-semibold">{project.title}</h2>
        <p className="text-muted-foreground mt-2 text-sm">{project.cardProblem}</p>
        <p className="mt-3 text-sm">
          <span className="font-medium">Shipped. </span>
          {project.shipped}
        </p>

        <div className="mt-4 flex flex-wrap gap-1">
          {project.technologies.slice(0, 5).map((tech) => (
            <Badge key={tech} variant="secondary" className="text-xs">
              {tech}
            </Badge>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          <LinkButton href={detailHref} size="sm">
            Read the case study
          </LinkButton>
          {project.links.live && (
            <AnchorButton
              href={project.links.live}
              variant="outline"
              size="sm"
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
              variant="outline"
              size="sm"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Code2 className="mr-1 size-4" />
              GitHub
            </AnchorButton>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

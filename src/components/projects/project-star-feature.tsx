"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export interface StarFeatureInterface {
  title: string;
  situation: string;
  task: string;
  action: string;
  result: string;
}

interface ProjectStarFeatureProps {
  feature: StarFeatureInterface;
  index: number;
}

const starLabels = [
  { key: "situation" as const, label: "Situation" },
  { key: "task" as const, label: "Task" },
  { key: "action" as const, label: "Action" },
  { key: "result" as const, label: "Result" },
];

export function ProjectStarFeature({ feature, index }: ProjectStarFeatureProps) {
  return (
    <Card className="border-border/50 bg-card/50">
      <CardHeader className="pb-3">
        <p className="text-xs font-medium tracking-widest text-blue-400 uppercase">
          Feature {index + 1}
        </p>
        <CardTitle className="text-lg">{feature.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {starLabels.map(({ key, label }) => (
          <div key={key}>
            <p className="text-foreground text-xs font-semibold tracking-wide uppercase">
              {label}
            </p>
            <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
              {feature[key]}
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

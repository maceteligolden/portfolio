"use client";

import { motion } from "framer-motion";

import { SectionHeading } from "@/components/layout/section-heading";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getExpertiseAreas } from "@/lib/content";

const areas = getExpertiseAreas();

export function ExpertiseSection() {
  return (
    <section className="py-20">
      <div className="max-w-padding">
        <SectionHeading label="Expertise" title="What I Build" />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {areas.map((area, i) => (
            <motion.div
              key={area.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="border-border/50 bg-card/50 h-full transition-colors hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/5">
                <CardHeader>
                  <CardTitle className="text-xl">{area.title}</CardTitle>
                  <p className="text-muted-foreground text-sm">{area.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {area.topics.map((topic) => (
                      <Badge key={topic} variant="secondary">
                        {topic}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

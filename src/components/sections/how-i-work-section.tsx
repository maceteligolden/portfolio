"use client";

import { motion } from "framer-motion";

import { SectionHeading } from "@/components/layout/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { getPhilosophyItems } from "@/lib/content";

const principles = getPhilosophyItems();

export function HowIWorkSection() {
  return (
    <section className="py-20">
      <div className="max-w-padding">
        <SectionHeading label="How I work" title="What I optimize for" />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {principles.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="border-border/50 bg-card/50 h-full transition-colors hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/5">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-muted-foreground mt-2 text-sm">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

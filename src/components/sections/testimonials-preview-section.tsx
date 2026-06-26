"use client";

import { motion } from "framer-motion";

import { SectionHeading } from "@/components/layout/section-heading";
import { LinkButton } from "@/components/ui/link-button";
import { Card, CardContent } from "@/components/ui/card";
import { getFeaturedTestimonials } from "@/lib/content";

const featured = getFeaturedTestimonials();

export function TestimonialsPreviewSection() {
  return (
    <section className="border-border/40 bg-card/20 border-y py-20">
      <div className="max-w-padding">
        <SectionHeading label="Testimonials" title="What Clients Say" />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {featured.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="border-border/50 bg-card/50 h-full">
                <CardContent className="p-6">
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="mt-4">
                    <p className="font-semibold">{t.name}</p>
                    <p className="text-muted-foreground text-sm">
                      {t.position}, {t.company}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <LinkButton href="/testimonials" variant="outline">
            View All Testimonials
          </LinkButton>
        </div>
      </div>
    </section>
  );
}

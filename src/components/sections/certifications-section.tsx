"use client";

import { motion } from "framer-motion";
import Image from "next/image";

import { SectionHeading } from "@/components/layout/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { getCertifications } from "@/lib/content";

const certifications = getCertifications();

export function CertificationsSection() {
  return (
    <section className="py-20">
      <div className="max-w-padding">
        <SectionHeading label="Credentials" title="Certifications" align="center" />
        <div className="mx-auto mt-12 grid max-w-3xl gap-6 sm:grid-cols-2">
          {certifications.map((cert, i) => (
            <motion.div
              key={cert.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="border-border/50 bg-card/50 h-full transition-colors hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/5">
                <CardContent className="flex flex-col items-center p-8 text-center">
                  <Image
                    src={cert.logo}
                    alt={cert.name}
                    width={160}
                    height={160}
                    className="size-32 object-contain md:size-40"
                  />
                  <h3 className="mt-6 text-lg font-semibold">{cert.name}</h3>
                  <p className="text-muted-foreground mt-1 text-sm">{cert.issuer}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

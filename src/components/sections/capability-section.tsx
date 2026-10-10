import { SectionHeading } from "@/components/layout/section-heading";
import { getSiteConfig } from "@/lib/content";

const capability = getSiteConfig().capability;

export function CapabilitySection() {
  return (
    <section className="py-20">
      <div className="max-w-padding">
        <SectionHeading label={capability.label} title={capability.title} />
        <div className="mt-8 max-w-3xl space-y-4">
          {capability.body.map((paragraph) => (
            <p
              key={paragraph}
              className="text-muted-foreground text-lg leading-relaxed"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}

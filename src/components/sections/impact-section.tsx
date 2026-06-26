import { AnimatedCounter } from "@/components/layout/animated-counter";
import { SectionHeading } from "@/components/layout/section-heading";
import { getMetrics } from "@/lib/content";

const metrics = getMetrics();

export function ImpactSection() {
  return (
    <section className="border-border/40 bg-card/20 border-y py-20">
      <div className="max-w-padding">
        <SectionHeading
          label="Impact"
          title="Measurable Engineering Outcomes"
          align="center"
        />
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric) => (
            <AnimatedCounter
              key={metric.label}
              value={metric.value}
              suffix={metric.suffix}
              label={metric.label}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

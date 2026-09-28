import type { TestimonialInterface } from "@content/testimonials";

import { Badge } from "@/components/ui/badge";

interface TestimonialAttributionProps {
  testimonial: TestimonialInterface;
}

export function TestimonialAttribution({ testimonial }: TestimonialAttributionProps) {
  const name = testimonial.anonymous ? "Anonymous" : testimonial.name;
  const details = testimonial.anonymous
    ? testimonial.position
    : [testimonial.position, testimonial.company].filter(Boolean).join(", ");

  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div>
        <p className="font-semibold">{name}</p>
        {details ? <p className="text-muted-foreground text-sm">{details}</p> : null}
      </div>
      <Badge variant="outline" className="h-auto px-2.5 py-1">
        {testimonial.relationship}
      </Badge>
    </div>
  );
}

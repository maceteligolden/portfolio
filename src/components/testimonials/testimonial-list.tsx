import type { TestimonialInterface } from "@content/testimonials";

import { TestimonialAttribution } from "@/components/testimonials/testimonial-attribution";
import { Card, CardContent } from "@/components/ui/card";

export function TestimonialList({
  testimonials,
}: {
  testimonials: TestimonialInterface[];
}) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {testimonials.map((quote) => (
        <Card key={quote.id} className="border-border/50 bg-card/50">
          <CardContent className="p-6">
            <p className="text-sm leading-relaxed">{quote.quote}</p>
            <div className="mt-6">
              <TestimonialAttribution testimonial={quote} />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

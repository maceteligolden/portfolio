import type { TestimonialInterface } from "@content/testimonials";

import { PageContainer } from "@/components/layout/page-container";
import { TestimonialAttribution } from "@/components/testimonials/testimonial-attribution";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { getSiteConfig, getTestimonials } from "@/lib/content";

const site = getSiteConfig();
const allTestimonials = getTestimonials();
const featured = allTestimonials.find((t) => t.featured) ?? allTestimonials[0];

export const metadata = {
  title: `Testimonials | ${site.name}`,
  description: "Testimonials from people Golden has worked with.",
};

function TestimonialBody({
  testimonial,
  prominent = false,
}: {
  testimonial: TestimonialInterface;
  prominent?: boolean;
}) {
  return (
    <>
      <Badge
        variant="outline"
        className="h-auto border-blue-400/30 bg-blue-500/10 px-3 py-1 text-blue-400"
      >
        {testimonial.theme}
      </Badge>
      <p
        className={
          prominent
            ? "mt-4 text-xl leading-relaxed md:text-2xl"
            : "text-muted-foreground mt-4 text-sm leading-relaxed"
        }
      >
        &ldquo;{testimonial.quote}&rdquo;
      </p>
      <div className={prominent ? "mt-6" : "mt-auto pt-6"}>
        <TestimonialAttribution testimonial={testimonial} />
      </div>
    </>
  );
}

export default function TestimonialsPage() {
  return (
    <PageContainer>
      <p className="text-sm font-medium tracking-widest text-blue-400 uppercase">
        Testimonials
      </p>
      <h1 className="mt-2 text-4xl font-bold tracking-tight">
        What people I’ve worked with say
      </h1>

      {featured && (
        <Card className="mt-12 border-blue-500/20 bg-gradient-to-br from-blue-500/5 to-purple-500/5">
          <CardContent className="p-8 md:p-12">
            <TestimonialBody testimonial={featured} prominent />
          </CardContent>
        </Card>
      )}

      <div className="mt-16 md:hidden">
        <Carousel>
          <CarouselContent>
            {allTestimonials.map((testimonial) => (
              <CarouselItem key={testimonial.id}>
                <Card className="border-border/50 bg-card/50 h-full">
                  <CardContent className="p-6">
                    <TestimonialBody testimonial={testimonial} />
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>

      <div className="mt-16 hidden gap-6 md:grid md:grid-cols-2 lg:grid-cols-3">
        {allTestimonials.map((testimonial) => (
          <Card key={testimonial.id} className="border-border/50 bg-card/50 h-full">
            <CardContent className="flex h-full flex-col p-6">
              <TestimonialBody testimonial={testimonial} />
            </CardContent>
          </Card>
        ))}
      </div>
    </PageContainer>
  );
}

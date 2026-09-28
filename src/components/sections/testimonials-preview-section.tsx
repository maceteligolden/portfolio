"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { SectionHeading } from "@/components/layout/section-heading";
import { TestimonialAttribution } from "@/components/testimonials/testimonial-attribution";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { LinkButton } from "@/components/ui/link-button";
import { getTestimonials } from "@/lib/content";
import { cn } from "@/lib/utils";

const testimonials = getTestimonials();
const AUTOPLAY_MS = 7000;
const SWIPE_THRESHOLD = 48;

export function TestimonialsPreviewSection() {
  const [selected, setSelected] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduceMotion = useReducedMotion() === true;
  const pointerStart = useRef<number | null>(null);
  const testimonial = testimonials[selected];

  const show = (index: number) => {
    const count = testimonials.length;
    setSelected((index + count) % count);
  };

  useEffect(() => {
    if (paused || reduceMotion) return;
    const timer = window.setInterval(() => {
      setSelected((current) => (current + 1) % testimonials.length);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(timer);
  }, [paused, reduceMotion, selected]);

  return (
    <section
      aria-label="Testimonials"
      aria-roledescription="carousel"
      className="border-border/40 bg-card/20 border-y py-20"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        const next = event.relatedTarget;
        if (!(next instanceof Node) || !event.currentTarget.contains(next)) {
          setPaused(false);
        }
      }}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          show(selected - 1);
        } else if (event.key === "ArrowRight") {
          event.preventDefault();
          show(selected + 1);
        }
      }}
    >
      <div className="max-w-padding">
        <SectionHeading label="Testimonials" title="What people I’ve worked with say" />
        <div className="relative mt-12 px-11">
          <Button
            type="button"
            variant="outline"
            size="icon-sm"
            className="absolute top-1/2 left-0 -translate-y-1/2 rounded-full"
            aria-label="Previous slide"
            onClick={() => show(selected - 1)}
          >
            <ChevronLeft />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="icon-sm"
            className="absolute top-1/2 right-0 -translate-y-1/2 rounded-full"
            aria-label="Next slide"
            onClick={() => show(selected + 1)}
          >
            <ChevronRight />
          </Button>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={testimonial.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`${selected + 1} of ${testimonials.length}`}
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : { duration: 0.35, ease: [0.22, 1, 0.36, 1] }
              }
              onPointerDown={(event) => {
                pointerStart.current = event.clientX;
              }}
              onPointerUp={(event) => {
                if (pointerStart.current == null) return;
                const delta = event.clientX - pointerStart.current;
                pointerStart.current = null;
                if (delta > SWIPE_THRESHOLD) show(selected - 1);
                else if (delta < -SWIPE_THRESHOLD) show(selected + 1);
              }}
              onPointerCancel={() => {
                pointerStart.current = null;
              }}
            >
              <Card className="border-border/50 bg-card/50">
                <CardContent className="relative p-8 md:p-10">
                  <span
                    aria-hidden
                    className="pointer-events-none absolute top-2 left-6 font-serif text-7xl leading-none text-blue-400/25 select-none md:text-8xl"
                  >
                    &ldquo;
                  </span>
                  <Badge
                    variant="outline"
                    className="relative h-auto w-fit border-blue-400/30 bg-blue-500/10 px-3 py-1 text-blue-400"
                  >
                    {testimonial.theme}
                  </Badge>
                  <blockquote className="relative mt-6 text-xl leading-relaxed md:text-2xl">
                    {testimonial.quote}
                  </blockquote>
                  <div className="relative mt-6">
                    <TestimonialAttribution testimonial={testimonial} />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="mt-4 flex items-center justify-center gap-2">
          {testimonials.map((item, index) => (
            <button
              key={item.id}
              type="button"
              aria-label={`Show testimonial from ${item.anonymous ? "Anonymous" : item.name}`}
              aria-current={selected === index ? "true" : undefined}
              className={cn(
                "h-2 rounded-full transition-all",
                selected === index ? "w-6 bg-blue-400" : "bg-muted-foreground/40 w-2",
              )}
              onClick={() => show(index)}
            />
          ))}
        </div>
        <div className="mt-6 text-center">
          <LinkButton href="/testimonials" variant="outline">
            View all testimonials
          </LinkButton>
        </div>
      </div>
    </section>
  );
}

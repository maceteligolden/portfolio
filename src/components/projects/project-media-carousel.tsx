"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import type { ProjectMediaInterface } from "@/lib/content";
import { cn } from "@/lib/utils";

interface ProjectMediaCarouselProps {
  media: ProjectMediaInterface[];
  title: string;
}

export function ProjectMediaCarousel({ media, title }: ProjectMediaCarouselProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const multiple = media.length > 1;

  useEffect(() => {
    if (!api) return;
    const onSelect = () => setCurrent(api.selectedScrollSnap());
    onSelect();
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  return (
    <div className="mb-8">
      <Carousel setApi={setApi} opts={{ align: "start" }} className="px-0">
        <CarouselContent>
          {media.map((item) => (
            <CarouselItem key={`${item.type}-${item.src}`}>
              <div className="bg-muted/30 relative aspect-video overflow-hidden rounded-xl">
                {item.type === "video" ? (
                  <video
                    className="h-full w-full object-contain"
                    controls
                    playsInline
                    preload="metadata"
                    aria-label={item.alt}
                  >
                    <source src={item.src} />
                  </video>
                ) : (
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className={
                      item.src.endsWith(".svg") ? "object-contain p-12" : "object-cover"
                    }
                    priority
                  />
                )}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {multiple ? (
          <>
            <CarouselPrevious className="left-3" />
            <CarouselNext className="right-3" />
          </>
        ) : null}
      </Carousel>
      {multiple ? (
        <div className="mt-4 flex items-center justify-center gap-2">
          {media.map((item, index) => (
            <button
              key={`${item.src}-dot`}
              type="button"
              aria-label={`${title} media ${index + 1}`}
              aria-current={current === index ? "true" : undefined}
              className={cn(
                "h-2 rounded-full transition-all",
                current === index ? "w-6 bg-blue-400" : "bg-muted-foreground/40 w-2",
              )}
              onClick={() => api?.scrollTo(index)}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

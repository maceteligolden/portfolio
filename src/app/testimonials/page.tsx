import { PageContainer } from "@/components/layout/page-container";
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
  description: "Client testimonials and feedback.",
};

export default function TestimonialsPage() {
  return (
    <PageContainer>
      <p className="text-sm font-medium tracking-widest text-blue-400 uppercase">
        Testimonials
      </p>
      <h1 className="mt-2 text-4xl font-bold tracking-tight">Client Feedback</h1>

      {featured && (
        <Card className="mt-12 border-blue-500/20 bg-gradient-to-br from-blue-500/5 to-purple-500/5">
          <CardContent className="p-8 md:p-12">
            <p className="text-xl leading-relaxed md:text-2xl">
              &ldquo;{featured.quote}&rdquo;
            </p>
            <div className="mt-6">
              <p className="font-semibold">{featured.name}</p>
              <p className="text-muted-foreground text-sm">
                {featured.position}, {featured.company}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="mt-16 md:hidden">
        <Carousel>
          <CarouselContent>
            {allTestimonials.map((t) => (
              <CarouselItem key={t.id}>
                <Card className="border-border/50 bg-card/50">
                  <CardContent className="p-6">
                    <p className="text-muted-foreground text-sm">
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
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>

      <div className="mt-16 hidden gap-6 md:grid md:grid-cols-2 lg:grid-cols-3">
        {allTestimonials.map((t) => (
          <Card key={t.id} className="border-border/50 bg-card/50">
            <CardContent className="p-6">
              <p className="text-muted-foreground text-sm">&ldquo;{t.quote}&rdquo;</p>
              <div className="mt-4">
                <p className="font-semibold">{t.name}</p>
                <p className="text-muted-foreground text-sm">
                  {t.position}, {t.company}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </PageContainer>
  );
}

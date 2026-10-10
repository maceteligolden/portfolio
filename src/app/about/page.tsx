import { TrackedLinkButton } from "@/components/analytics/tracked-link-button";
import { PageContainer } from "@/components/layout/page-container";
import { FaqSection } from "@/components/sections/faq-section";
import { PageCtaBand } from "@/components/sections/page-cta-band";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  getAboutContent,
  getAboutFaqs,
  getPhilosophyItems,
  getTechStack,
} from "@/lib/content";
import { getFaqJsonLd } from "@/lib/seo/json-ld";

const about = getAboutContent();
const philosophy = getPhilosophyItems();
const tech = getTechStack();
const faqs = getAboutFaqs();

export const metadata = {
  title: "About",
  description: about.intro,
};

export default function AboutPage() {
  const faqJsonLd = getFaqJsonLd(faqs);

  return (
    <PageContainer>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <p className="text-sm font-medium tracking-widest text-blue-400 uppercase">
        About
      </p>
      <h1 className="mt-2 max-w-3xl text-4xl font-bold tracking-tight md:text-5xl">
        I like building a system for a particular problem
      </h1>
      <p className="text-muted-foreground mt-6 max-w-3xl text-lg">{about.intro}</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <TrackedLinkButton href="/services" intent="project" location="about-build">
          Start a project
        </TrackedLinkButton>
        <TrackedLinkButton
          href="/career"
          intent="hiring"
          location="about-career"
          variant="outline"
        >
          Share a job description
        </TrackedLinkButton>
        <TrackedLinkButton
          href="/products"
          intent="product"
          location="about-products"
          variant="outline"
        >
          See the products
        </TrackedLinkButton>
      </div>
      {about.story.map((paragraph) => (
        <p key={paragraph} className="text-muted-foreground mt-4 max-w-3xl">
          {paragraph}
        </p>
      ))}
      <p className="mt-4 max-w-3xl">{about.close}</p>

      <Separator className="my-16" />

      <h2 className="text-2xl font-bold">Engineering Philosophy</h2>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {philosophy.map((item) => (
          <Card key={item.title} className="border-border/50 bg-card/50">
            <CardContent className="p-6">
              <h3 className="font-semibold">{item.title}</h3>
              <p className="text-muted-foreground mt-2 text-sm">{item.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Separator className="my-16" />

      <h2 className="text-2xl font-bold">Technology Stack</h2>
      <p className="text-muted-foreground mt-3 max-w-3xl text-sm">
        These are the tools I use day to day. They are not the only tools I will use.
        The case studies show where each one was used.
      </p>
      <div className="mt-8 grid gap-8 md:grid-cols-2">
        {Object.entries(tech).map(([category, items]) => (
          <div key={category}>
            <h3 className="mb-3 text-sm font-medium tracking-wider text-blue-400 uppercase">
              {category}
            </h3>
            <div className="flex flex-wrap gap-2">
              {items.map((item) => (
                <Badge key={item} variant="secondary">
                  {item}
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </div>

      <FaqSection embedded faqs={faqs} title="A question you might have" />
      <PageCtaBand
        title="If you know what you came for, start there"
        description="A client project, a role, or a product I own. The case studies are the results."
      >
        <TrackedLinkButton
          href="/services"
          intent="project"
          location="about-close"
          size="lg"
        >
          Start a project
        </TrackedLinkButton>
        <TrackedLinkButton
          href="/career"
          intent="hiring"
          location="about-close-career"
          variant="outline"
          size="lg"
        >
          Share a job description
        </TrackedLinkButton>
        <TrackedLinkButton
          href="/products"
          intent="product"
          location="about-close-products"
          variant="outline"
          size="lg"
        >
          See the products
        </TrackedLinkButton>
      </PageCtaBand>
    </PageContainer>
  );
}

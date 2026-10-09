import Link from "next/link";
import { notFound } from "next/navigation";

import { FaqSection } from "@/components/sections/faq-section";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { LinkButton } from "@/components/ui/link-button";
import {
  getProjectBySlug,
  getServiceBySlug,
  getServiceSlugs,
  getServices,
} from "@/lib/content";
import { formatProjectType } from "@/lib/projects/project-type";
import { getFaqJsonLd, getServiceJsonLd } from "@/lib/seo/json-ld";

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getServiceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return { title: "Service not found" };
  return {
    title: service.seoTitle,
    description: service.metaDescription,
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const related = service.relatedProjectSlugs
    .map((projectSlug) => getProjectBySlug(projectSlug))
    .filter((project) => project !== undefined);
  const others = getServices().filter((item) => item.slug !== service.slug);
  const faqJsonLd = getFaqJsonLd(service.faqs);
  const serviceJsonLd = getServiceJsonLd(service);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <article className="max-w-padding py-16">
        <p className="text-sm font-medium tracking-widest text-blue-400 uppercase">
          Services
        </p>
        <h1 className="mt-2 max-w-3xl text-4xl font-bold tracking-tight md:text-5xl">
          {service.h1}
        </h1>
        <p className="text-muted-foreground mt-6 max-w-3xl text-lg">
          {service.opening}
        </p>
        <div className="mt-8">
          <LinkButton href={`/contact?service=${service.slug}`} size="lg">
            Start a project
          </LinkButton>
        </div>

        <div className="mt-16 grid gap-12 lg:grid-cols-2">
          <section>
            <h2 className="text-2xl font-semibold">What is included</h2>
            <ul className="text-muted-foreground mt-4 space-y-3">
              {service.includes.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </section>
          <section>
            <h2 className="text-2xl font-semibold">How it is delivered</h2>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              {service.delivery}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {service.stack.map((item) => (
                <Badge key={item} variant="secondary">
                  {item}
                </Badge>
              ))}
            </div>
          </section>
        </div>

        {related.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-semibold">Related work</h2>
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              {related.map((project) => (
                <Link
                  key={project.slug}
                  href={`/projects/${project.slug}`}
                  className="group"
                >
                  <Card className="border-border/50 bg-card/50 h-full transition-colors group-hover:border-blue-500/30">
                    <CardContent className="p-6">
                      <Badge variant="default">{formatProjectType(project.type)}</Badge>
                      <h3 className="mt-3 text-xl font-semibold">{project.title}</h3>
                      <p className="text-muted-foreground mt-2 text-sm">
                        {project.cardProblem}
                      </p>
                      <p className="mt-4 text-sm text-blue-400">Read the case study</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        )}

        <FaqSection faqs={service.faqs} title="Questions about this work" />

        <section className="border-border/50 rounded-xl border bg-gradient-to-br from-blue-500/10 to-purple-500/5 p-8 md:p-10">
          <h2 className="text-2xl font-semibold">Start a project</h2>
          <p className="text-muted-foreground mt-3 max-w-xl">
            Tell me what you need built. A short brief is enough, and you can book a
            30-minute intro if you would rather talk first.
          </p>
          <div className="mt-6">
            <LinkButton href={`/contact?service=${service.slug}`} size="lg">
              Start a project
            </LinkButton>
          </div>
        </section>

        <section className="mt-16">
          <h2 className="text-xl font-semibold">Other services</h2>
          <div className="mt-4 flex flex-col gap-2">
            {others.map((item) => (
              <Link
                key={item.slug}
                href={`/services/${item.slug}`}
                className="text-blue-400 hover:underline"
              >
                {item.title}
              </Link>
            ))}
          </div>
        </section>
      </article>
    </>
  );
}

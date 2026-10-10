import {
  TrackedAnchorButton,
  TrackedLinkButton,
} from "@/components/analytics/tracked-link-button";
import { PageContainer } from "@/components/layout/page-container";
import { PageCtaBand } from "@/components/sections/page-cta-band";
import { Card, CardContent } from "@/components/ui/card";
import {
  getProductSpotlights,
  getProductsContent,
  getProjectBySlug,
} from "@/lib/content";
import { getSoftwareApplicationJsonLd } from "@/lib/seo/json-ld";

const products = getProductsContent();
const spotlights = getProductSpotlights();

export const metadata = {
  title: products.seoTitle,
  description: products.metaDescription,
};

function ProductCta({
  href,
  external,
  label,
  location,
  size,
  variant,
}: {
  href: string;
  external: boolean;
  label: string;
  location: string;
  size?: "lg";
  variant?: "default" | "outline";
}) {
  if (external) {
    return (
      <TrackedAnchorButton
        href={href}
        intent="product"
        location={location}
        size={size}
        variant={variant}
        target="_blank"
        rel="noopener noreferrer"
      >
        {label}
      </TrackedAnchorButton>
    );
  }

  return (
    <TrackedLinkButton
      href={href}
      intent="product"
      location={location}
      size={size}
      variant={variant}
    >
      {label}
    </TrackedLinkButton>
  );
}

export default function ProductsPage() {
  const entries = spotlights
    .map((spotlight) => {
      const project = getProjectBySlug(spotlight.slug);
      if (!project) return undefined;
      const href =
        spotlight.hrefKind === "live"
          ? project.links.live
          : `/projects/${project.slug}`;
      if (!href) return undefined;
      return {
        spotlight,
        project,
        href,
        external: spotlight.hrefKind === "live",
      };
    })
    .filter((entry) => entry !== undefined);
  const applications = entries
    .filter((entry) => entry.external)
    .map((entry) =>
      getSoftwareApplicationJsonLd({
        name: entry.project.title,
        description: entry.spotlight.solution,
        url: entry.href,
      }),
    );

  return (
    <PageContainer>
      {applications.map((application) => (
        <script
          key={application.name}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(application) }}
        />
      ))}
      <p className="text-sm font-medium tracking-widest text-blue-400 uppercase">
        Products
      </p>
      <h1 className="mt-2 max-w-3xl text-4xl font-bold tracking-tight md:text-5xl">
        {products.h1}
      </h1>
      <p className="text-muted-foreground mt-6 max-w-3xl text-lg">{products.opening}</p>
      <div className="mt-8 flex flex-wrap gap-3">
        {entries.map((entry) => (
          <ProductCta
            key={entry.project.slug}
            href={entry.href}
            external={entry.external}
            label={entry.spotlight.ctaLabel}
            location={`products-${entry.project.slug}-top`}
            size="lg"
            variant={entry.project.slug === "bloggr" ? "default" : "outline"}
          />
        ))}
      </div>

      <div className="mt-16 grid gap-6">
        {entries.map(({ spotlight, project, href, external }) => (
          <Card key={project.slug} className="border-border/50 bg-card/50">
            <CardContent className="p-6 md:p-8">
              <h2 className="text-2xl font-semibold">{project.title}</h2>
              <h3 className="mt-6 text-sm font-medium tracking-wider text-blue-400 uppercase">
                The problem
              </h3>
              <p className="mt-2 max-w-3xl leading-relaxed">{spotlight.problem}</p>
              <h3 className="mt-6 text-sm font-medium tracking-wider text-blue-400 uppercase">
                What it does
              </h3>
              <p className="text-muted-foreground mt-2 max-w-3xl leading-relaxed">
                {spotlight.solution}
              </p>
              {spotlight.direction ? (
                <>
                  <h3 className="mt-6 text-sm font-medium tracking-wider text-blue-400 uppercase">
                    Where it is going
                  </h3>
                  <p className="text-muted-foreground mt-2 max-w-3xl leading-relaxed">
                    {spotlight.direction}
                  </p>
                </>
              ) : null}
              <h3 className="mt-6 text-sm font-medium tracking-wider text-blue-400 uppercase">
                Where other tools fall short
              </h3>
              <p className="text-muted-foreground mt-2 max-w-3xl leading-relaxed">
                {spotlight.gap}
              </p>
              <div className="mt-6">
                <ProductCta
                  href={href}
                  external={external}
                  label={spotlight.ctaLabel}
                  location={`products-${project.slug}-card`}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <PageCtaBand
        title="Bloggr is the one you can try"
        description="WatchNode is no longer online. Its button opens the case study, not a signup."
      >
        {entries.map((entry) => (
          <ProductCta
            key={entry.project.slug}
            href={entry.href}
            external={entry.external}
            label={entry.spotlight.ctaLabel}
            location={`products-${entry.project.slug}-close`}
            size="lg"
            variant={entry.project.slug === "bloggr" ? "default" : "outline"}
          />
        ))}
      </PageCtaBand>
    </PageContainer>
  );
}

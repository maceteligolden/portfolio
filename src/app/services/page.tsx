import { PageContainer } from "@/components/layout/page-container";
import { ServiceCards } from "@/components/services/service-cards";
import { LinkButton } from "@/components/ui/link-button";
import { getSiteConfig } from "@/lib/content";
import { getProfessionalServiceJsonLd } from "@/lib/seo/json-ld";

const site = getSiteConfig();

export const metadata = {
  title: "Services",
  description: `${site.positioning} AI products, backend systems, and MVPs.`,
};

export default function ServicesPage() {
  const jsonLd = getProfessionalServiceJsonLd();

  return (
    <PageContainer>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <p className="text-sm font-medium tracking-widest text-blue-400 uppercase">
        Services
      </p>
      <h1 className="mt-2 text-4xl font-bold tracking-tight md:text-5xl">
        What I take on
      </h1>
      <p className="text-muted-foreground mt-4 max-w-2xl text-lg">
        Three kinds of client work. Founders and small teams first, and companies that
        already have a product and need an AI or backend project.
      </p>
      <div className="mt-12">
        <ServiceCards />
      </div>
      <div className="mt-12">
        <LinkButton href="/contact" size="lg">
          Start a project
        </LinkButton>
      </div>
    </PageContainer>
  );
}

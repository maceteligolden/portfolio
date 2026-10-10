import type { FaqInterface } from "@content/faqs";

import { getServices, getSiteConfig } from "@/lib/content";
import { env } from "@/lib/env";

const site = getSiteConfig();

export function getPersonJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    jobTitle: site.title,
    email: site.email,
    url: env.siteUrl,
    sameAs: site.social.map((s) => s.href),
    description: site.tagline,
  };
}

export function getFaqJsonLd(faqs: FaqInterface[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function getProfessionalServiceJsonLd() {
  const practiceServices = getServices();

  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: site.name,
    url: `${env.siteUrl}/services`,
    description: site.positioning,
    email: site.email,
    areaServed: "Worldwide",
    founder: {
      "@type": "Person",
      name: site.name,
    },
    makesOffer: practiceServices.map((service) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: service.title,
        description: service.metaDescription,
        url: `${env.siteUrl}/services/${service.slug}`,
      },
    })),
  };
}

export function getServiceJsonLd(service: {
  title: string;
  metaDescription: string;
  slug: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.metaDescription,
    url: `${env.siteUrl}/services/${service.slug}`,
    provider: {
      "@type": "Person",
      name: site.name,
      url: env.siteUrl,
    },
    areaServed: "Worldwide",
  };
}

export function getWebsiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: `${site.name} Portfolio`,
    url: env.siteUrl,
    description: site.tagline,
  };
}

export function getCreativeWorkJsonLd(project: {
  title: string;
  summary: string;
  slug: string;
  technologies: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.summary,
    url: `${env.siteUrl}/projects/${project.slug}`,
    keywords: project.technologies.join(", "),
  };
}

export function getCareerPersonJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    jobTitle: [
      "AI Engineer",
      "AI Product Engineer",
      "Software Engineer",
      "Full-stack Engineer",
      "Backend Engineer",
    ],
    description:
      "Open to AI engineer, AI product engineer, software engineer, full-stack, and backend roles, including backend-only. Based in the UK.",
    email: site.email,
    url: `${env.siteUrl}/career`,
    sameAs: site.social.map((item) => item.href),
  };
}

export function getSoftwareApplicationJsonLd(app: {
  name: string;
  description: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: app.name,
    description: app.description,
    url: app.url,
    applicationCategory: "BusinessApplication",
    author: {
      "@type": "Person",
      name: site.name,
      url: env.siteUrl,
    },
  };
}

export function getBlogPostingJsonLd(post: {
  title: string;
  excerpt?: string;
  slug: string;
  publishedAt?: string;
  authorName?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    url: `${env.siteUrl}/blog/${post.slug}`,
    datePublished: post.publishedAt,
    author: {
      "@type": "Person",
      name: post.authorName || site.name,
    },
  };
}

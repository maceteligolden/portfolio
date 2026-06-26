import { getSiteConfig } from "@/lib/content";
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

export function getBlogPostingJsonLd(post: {
  title: string;
  excerpt?: string;
  slug: string;
  publishedAt?: string;
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
      name: site.name,
    },
  };
}

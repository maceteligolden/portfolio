import type { MetadataRoute } from "next";

import { fetchBlogs } from "@/lib/blog/blog-client";
import type { BlogPostInterface } from "@/lib/blog/blog.types";
import { getProjectSlugs, getServiceSlugs } from "@/lib/content";
import { env } from "@/lib/env";

function modifiedAt(iso?: string): Date {
  if (!iso) return new Date();
  const date = new Date(iso);
  return Number.isNaN(date.getTime()) ? new Date() : date;
}

/** Walk published pages so individual posts are included in the sitemap. */
async function publishedPosts(): Promise<BlogPostInterface[]> {
  try {
    const first = await fetchBlogs({ page: 1, limit: 100 });
    const posts = [...first.data];

    for (let page = 2; page <= first.pagination.totalPages; page += 1) {
      const nextPage = await fetchBlogs({ page, limit: 100 });
      posts.push(...nextPage.data);
    }

    return posts;
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = env.siteUrl;
  const staticRoutes = [
    "",
    "/about",
    "/services",
    "/projects",
    "/blog",
    "/testimonials",
    "/contact",
    "/career",
    "/products",
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : path === "/career" || path === "/products" ? 0.9 : 0.8,
  }));

  const serviceRoutes = getServiceSlugs().map((slug) => ({
    url: `${baseUrl}/services/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  const projectRoutes = getProjectSlugs().map((slug) => ({
    url: `${baseUrl}/projects/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const posts = await publishedPosts();
  const postRoutes = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: modifiedAt(post.publishedAt ?? post.createdAt),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...serviceRoutes, ...projectRoutes, ...postRoutes];
}

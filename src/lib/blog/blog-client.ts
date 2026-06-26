import { env, isBlogConfigured } from "@/lib/env";

import type {
  BlogCategoryInterface,
  BlogListResponseInterface,
  BlogPostInterface,
} from "./blog.types";

function authHeaders(): Record<string, string> {
  return {
    "x-access-key-id": env.blogAccessKeyId,
    "x-secret-key": env.blogSecretKey,
    "Content-Type": "application/json",
  };
}

async function parseErrorMessage(response: Response): Promise<string> {
  const text = await response.text();
  try {
    const data = JSON.parse(text) as { message?: string };
    return data.message ?? `Request failed: ${response.status}`;
  } catch {
    return text || `Request failed: ${response.status}`;
  }
}

export async function fetchBlogs(
  params: {
    page?: number;
    limit?: number;
    search?: string;
    category?: string;
  } = {},
): Promise<BlogListResponseInterface> {
  if (!isBlogConfigured()) {
    return {
      data: [],
      pagination: { page: 1, limit: 10, total: 0, totalPages: 0 },
    };
  }

  const query = new URLSearchParams();
  query.set("site_id", env.blogSiteId);
  query.set("page", String(params.page ?? 1));
  query.set("limit", String(params.limit ?? 10));
  if (params.search?.trim()) query.set("search", params.search.trim());
  if (params.category?.trim()) query.set("category", params.category.trim());

  const response = await fetch(
    `${env.blogApiBaseUrl}/public/blogs?${query.toString()}`,
    { headers: authHeaders(), next: { revalidate: 3600 } },
  );

  if (!response.ok) {
    throw new Error(await parseErrorMessage(response));
  }

  const json = (await response.json()) as {
    data: {
      data: BlogPostInterface[];
      pagination: BlogListResponseInterface["pagination"];
    };
  };

  return json.data;
}

export async function fetchBlogBySlug(slug: string): Promise<BlogPostInterface | null> {
  if (!isBlogConfigured()) return null;

  const query = new URLSearchParams({ site_id: env.blogSiteId });
  const response = await fetch(
    `${env.blogApiBaseUrl}/public/blogs/slug/${slug}?${query.toString()}`,
    { headers: authHeaders(), next: { revalidate: 3600 } },
  );

  if (response.status === 404) return null;
  if (!response.ok) {
    throw new Error(await parseErrorMessage(response));
  }

  const json = (await response.json()) as { data: BlogPostInterface };
  return json.data;
}

export async function fetchCategories(): Promise<BlogCategoryInterface[]> {
  if (!isBlogConfigured()) return [];

  const response = await fetch(
    `${env.blogApiBaseUrl}/public/blogs/categories?tree=true`,
    { headers: authHeaders(), next: { revalidate: 3600 } },
  );

  if (!response.ok) return [];

  const json = (await response.json()) as { data: BlogCategoryInterface[] };
  return json.data ?? [];
}

import { env, isBlogConfigured } from "@/lib/env";

import {
  categoryNameMap,
  emptyBlogList,
  mapBlogCategories,
  mapBlogList,
  mapBlogPost,
} from "./blog.mapper";
import type {
  BlogCategoryInterface,
  BlogCategoryWireInterface,
  BloggrEnvelopeInterface,
  BlogListResponseInterface,
  BlogListWireInterface,
  BlogPostInterface,
  BlogPostWireInterface,
  BlogQueryParamsInterface,
} from "./blog.types";

const REVALIDATE_SECONDS = 3600;
const MAX_LIMIT = 100;

/**
 * Server-only Bloggr client.
 * Callers must be Server Components or route handlers so the secret key stays off the browser.
 */
export class BlogClientError extends Error {
  readonly status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "BlogClientError";
    this.status = status;
  }
}

function clampPage(page?: number): number {
  if (page === undefined || !Number.isFinite(page) || page < 1) return 1;
  return Math.floor(page);
}

function clampLimit(limit?: number): number {
  if (limit === undefined || !Number.isFinite(limit) || limit < 1) return 10;
  return Math.min(Math.floor(limit), MAX_LIMIT);
}

function authHeaders(): HeadersInit {
  return {
    "x-access-key-id": env.blogAccessKeyId,
    "x-secret-key": env.blogSecretKey,
  };
}

function blogUrl(path: string, query?: URLSearchParams): string {
  const base = env.blogApiBaseUrl.replace(/\/$/, "");
  const suffix = path.startsWith("/") ? path : `/${path}`;
  const search = query?.toString();
  return search ? `${base}${suffix}?${search}` : `${base}${suffix}`;
}

async function readErrorMessage(response: Response): Promise<string> {
  const text = await response.text();
  try {
    const body = JSON.parse(text) as {
      message?: string;
      error?: { details?: string };
    };
    if (body.message && body.error?.details) {
      return `${body.message}: ${body.error.details}`;
    }
    return body.message ?? `Request failed: ${response.status}`;
  } catch {
    return text || `Request failed: ${response.status}`;
  }
}

/**
 * Authenticated GET against Bloggr. Returns the envelope `data` field.
 * The workspace is inferred from the key, so requests do not send `site_id`.
 */
async function blogFetch<T>(path: string, query?: URLSearchParams): Promise<T> {
  const response = await fetch(blogUrl(path, query), {
    headers: authHeaders(),
    next: { revalidate: REVALIDATE_SECONDS },
  });

  if (!response.ok) {
    throw new BlogClientError(await readErrorMessage(response), response.status);
  }

  const json = (await response.json()) as BloggrEnvelopeInterface<T>;
  if (json.success === false) {
    const details = json.error?.details;
    const message = details ? `${json.message}: ${details}` : json.message;
    throw new BlogClientError(message || "Bloggr request failed", response.status);
  }

  return json.data;
}

function listQuery(
  params: BlogQueryParamsInterface,
  page: number,
  limit: number,
): URLSearchParams {
  const query = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });
  if (params.search?.trim()) query.set("search", params.search.trim());
  if (params.category?.trim()) query.set("category", params.category.trim());
  return query;
}

async function loadCategoryNames(): Promise<Map<string, string>> {
  try {
    return categoryNameMap(await fetchCategories());
  } catch {
    return new Map();
  }
}

/**
 * Published posts for the key's workspace.
 * `GET /public/blogs`
 */
export async function fetchBlogs(
  params: BlogQueryParamsInterface = {},
): Promise<BlogListResponseInterface> {
  const page = clampPage(params.page);
  const limit = clampLimit(params.limit);
  if (!isBlogConfigured()) return emptyBlogList(limit);

  const [wire, names] = await Promise.all([
    blogFetch<BlogListWireInterface | BlogPostWireInterface[]>(
      "/public/blogs",
      listQuery(params, page, limit),
    ),
    loadCategoryNames(),
  ]);

  return mapBlogList(wire, names, { page, limit });
}

/**
 * One published post by slug.
 * `GET /public/blogs/slug/:slug`
 * Returns null when Bloggr responds 404 or credentials are missing.
 */
export async function fetchBlogBySlug(slug: string): Promise<BlogPostInterface | null> {
  if (!isBlogConfigured()) return null;

  try {
    const [wire, names] = await Promise.all([
      blogFetch<BlogPostWireInterface>(
        `/public/blogs/slug/${encodeURIComponent(slug)}`,
      ),
      loadCategoryNames(),
    ]);
    return mapBlogPost(wire, names);
  } catch (error) {
    if (error instanceof BlogClientError && error.status === 404) return null;
    throw error;
  }
}

/**
 * One published post by id.
 * `GET /public/blogs/:id`
 * Returns null when Bloggr responds 404 or credentials are missing.
 */
export async function fetchBlogById(id: string): Promise<BlogPostInterface | null> {
  if (!isBlogConfigured()) return null;

  try {
    const [wire, names] = await Promise.all([
      blogFetch<BlogPostWireInterface>(`/public/blogs/${encodeURIComponent(id)}`),
      loadCategoryNames(),
    ]);
    return mapBlogPost(wire, names);
  } catch (error) {
    if (error instanceof BlogClientError && error.status === 404) return null;
    throw error;
  }
}

/**
 * Categories for the workspace. `tree=true` asks Bloggr for nested children.
 * `GET /public/blogs/categories`
 */
export async function fetchCategories(): Promise<BlogCategoryInterface[]> {
  if (!isBlogConfigured()) return [];

  const query = new URLSearchParams({ tree: "true" });
  const data = await blogFetch<
    BlogCategoryWireInterface[] | { data?: BlogCategoryWireInterface[] }
  >("/public/blogs/categories", query);
  const wires = Array.isArray(data) ? data : (data?.data ?? []);
  return mapBlogCategories(wires);
}

/**
 * Published posts in one category.
 * `GET /public/blogs/categories/:categoryId`
 */
export async function fetchBlogsByCategory(
  categoryId: string,
  params: BlogQueryParamsInterface = {},
): Promise<BlogListResponseInterface> {
  const page = clampPage(params.page);
  const limit = clampLimit(params.limit);
  if (!isBlogConfigured()) return emptyBlogList(limit);

  const query = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });
  if (params.search?.trim()) query.set("search", params.search.trim());

  const [wire, names] = await Promise.all([
    blogFetch<BlogListWireInterface | BlogPostWireInterface[]>(
      `/public/blogs/categories/${encodeURIComponent(categoryId)}`,
      query,
    ),
    loadCategoryNames(),
  ]);

  return mapBlogList(wire, names, { page, limit });
}

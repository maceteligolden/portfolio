"use client";

import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import type {
  BlogCategoryInterface,
  BlogListResponseInterface,
  BlogQueryParamsInterface,
} from "./blog.types";

/**
 * Delay a fast-changing value such as a search field before it hits the API.
 */
export function useDebouncedValue<T>(value: T, delayMs = 500): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delayMs);
    return () => clearTimeout(timer);
  }, [value, delayMs]);

  return debounced;
}

/**
 * Drive the reading-progress bar by writing its width as the page scrolls.
 * The bar element must use `barId`.
 */
export function useReadingProgress(barId = "reading-progress"): void {
  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      const bar = document.getElementById(barId);
      if (bar) bar.style.width = `${progress}%`;
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [barId]);
}

function appendQuery(params: BlogQueryParamsInterface): string {
  const query = new URLSearchParams();
  if (params.page) query.set("page", String(params.page));
  if (params.limit) query.set("limit", String(params.limit));
  if (params.search) query.set("search", params.search);
  if (params.category) query.set("category", params.category);
  return query.toString();
}

function isSeededList(
  params: BlogQueryParamsInterface,
  seed?: BlogListResponseInterface,
): seed is BlogListResponseInterface {
  if (!seed) return false;
  const page = params.page ?? 1;
  const limit = params.limit ?? seed.pagination.limit;
  return (
    page === seed.pagination.page &&
    limit === seed.pagination.limit &&
    !params.search &&
    !params.category
  );
}

/**
 * Published posts from `GET /api/blog`. The route calls Bloggr on the server.
 * `initialData` is the server-rendered first page, used only for that same query.
 */
export function useBlogPosts(
  params: BlogQueryParamsInterface = {},
  initialData?: BlogListResponseInterface,
) {
  return useQuery<BlogListResponseInterface>({
    queryKey: ["blog-posts", params],
    queryFn: async () => {
      const search = appendQuery(params);
      const response = await fetch(search ? `/api/blog?${search}` : "/api/blog");
      if (!response.ok) throw new Error("Failed to fetch blog posts");
      return response.json() as Promise<BlogListResponseInterface>;
    },
    initialData: isSeededList(params, initialData) ? initialData : undefined,
  });
}

/** Categories from `GET /api/blog/categories`. An error resolves to an empty list. */
export function useBlogCategories(initialData?: BlogCategoryInterface[]) {
  return useQuery<BlogCategoryInterface[]>({
    queryKey: ["blog-categories"],
    queryFn: async () => {
      const response = await fetch("/api/blog/categories");
      if (!response.ok) return [];
      return response.json() as Promise<BlogCategoryInterface[]>;
    },
    initialData,
  });
}

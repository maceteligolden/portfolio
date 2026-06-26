"use client";

import { useQuery } from "@tanstack/react-query";

interface BlogQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
}

export function useBlogPosts(params: BlogQueryParams = {}) {
  return useQuery({
    queryKey: ["blog-posts", params],
    queryFn: async () => {
      const query = new URLSearchParams();
      if (params.page) query.set("page", String(params.page));
      if (params.limit) query.set("limit", String(params.limit));
      if (params.search) query.set("search", params.search);
      if (params.category) query.set("category", params.category);

      const response = await fetch(`/api/blog?${query.toString()}`);
      if (!response.ok) throw new Error("Failed to fetch blog posts");
      return response.json();
    },
  });
}

export function useBlogCategories() {
  return useQuery({
    queryKey: ["blog-categories"],
    queryFn: async () => {
      const response = await fetch("/api/blog/categories");
      if (!response.ok) return [];
      return response.json();
    },
  });
}

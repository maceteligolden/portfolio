"use client";

import { useState } from "react";

import { BlogCard, BlogCardSkeletonGrid } from "@/components/blog/blog-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { flattenCategories } from "@/lib/blog/blog.mapper";
import {
  useBlogCategories,
  useBlogPosts,
  useDebouncedValue,
} from "@/lib/blog/blog.queries";
import type {
  BlogCategoryInterface,
  BlogListResponseInterface,
} from "@/lib/blog/blog.types";

const PAGE_SIZE = 9;

interface BlogListingProps {
  initialPosts: BlogListResponseInterface;
  initialCategories: BlogCategoryInterface[];
}

/**
 * Searchable, filterable grid of published posts.
 * The first page is rendered on the server and passed in as `initialPosts`.
 */
export function BlogListing({ initialPosts, initialCategories }: BlogListingProps) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const debouncedSearch = useDebouncedValue(search);

  const { data, isLoading, isError } = useBlogPosts(
    {
      page,
      limit: PAGE_SIZE,
      search: debouncedSearch || undefined,
      category: category || undefined,
    },
    initialPosts,
  );
  const { data: categories = [] } = useBlogCategories(initialCategories);
  const options = flattenCategories(categories);
  const posts = data?.data ?? [];
  const pagination = data?.pagination;

  return (
    <>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
        <Input
          placeholder="Search articles..."
          value={search}
          aria-label="Search articles"
          onChange={(event) => {
            setSearch(event.target.value);
            setPage(1);
          }}
          className="max-w-md"
        />
        {options.length > 0 ? (
          <select
            aria-label="Filter by category"
            value={category}
            onChange={(event) => {
              setCategory(event.target.value);
              setPage(1);
            }}
            className="border-input focus-visible:border-ring focus-visible:ring-ring/50 h-8 max-w-xs rounded-lg border bg-transparent px-2.5 text-sm outline-none focus-visible:ring-3"
          >
            <option value="">All categories</option>
            {options.map((item) => (
              <option key={item._id} value={item._id}>
                {item.name}
              </option>
            ))}
          </select>
        ) : null}
      </div>

      {isLoading ? <BlogCardSkeletonGrid /> : null}

      {isError ? (
        <p className="text-muted-foreground mt-10">
          Unable to load articles right now.
        </p>
      ) : null}

      {!isLoading && !isError && posts.length === 0 ? (
        <p className="text-muted-foreground mt-10">No articles found.</p>
      ) : null}

      {!isLoading && !isError && posts.length > 0 ? (
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {posts.map((post) => (
            <BlogCard key={post._id} post={post} />
          ))}
        </div>
      ) : null}

      {pagination && pagination.totalPages > 1 ? (
        <div className="mt-10 flex items-center justify-center gap-4">
          <Button
            variant="outline"
            disabled={page <= 1}
            onClick={() => setPage((current) => current - 1)}
          >
            Previous
          </Button>
          <span className="text-muted-foreground text-sm">
            Page {page} of {pagination.totalPages}
          </span>
          <Button
            variant="outline"
            disabled={page >= pagination.totalPages}
            onClick={() => setPage((current) => current + 1)}
          >
            Next
          </Button>
        </div>
      ) : null}
    </>
  );
}

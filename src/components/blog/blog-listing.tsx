"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useBlogPosts } from "@/lib/blog/blog.queries";
import type { BlogPostInterface } from "@/lib/blog/blog.types";

export function BlogListing() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 500);
    return () => clearTimeout(timer);
  }, [search]);

  const { data, isLoading, isError } = useBlogPosts({
    page,
    limit: 9,
    search: debouncedSearch || undefined,
  });

  const posts: BlogPostInterface[] = data?.data ?? [];
  const pagination = data?.pagination;

  return (
    <>
      <div className="mt-8">
        <Input
          placeholder="Search articles..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="max-w-md"
        />
      </div>

      {isLoading && (
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-48 rounded-xl" />
          ))}
        </div>
      )}

      {isError && (
        <p className="text-muted-foreground mt-10">
          Unable to load blog posts. Check BlogForAll configuration.
        </p>
      )}

      {!isLoading && posts.length === 0 && (
        <p className="text-muted-foreground mt-10">No blog posts found.</p>
      )}

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {posts.map((post) => (
          <Link key={post._id} href={`/blog/${post.slug}`}>
            <Card className="border-border/50 bg-card/50 h-full transition-all hover:border-blue-500/30">
              <CardContent className="p-6">
                {post.category && (
                  <Badge variant="outline" className="mb-3">
                    {post.category}
                  </Badge>
                )}
                <h2 className="text-lg font-semibold">{post.title}</h2>
                {post.excerpt && (
                  <p className="text-muted-foreground mt-2 line-clamp-3 text-sm">
                    {post.excerpt}
                  </p>
                )}
                <div className="text-muted-foreground mt-4 flex gap-3 text-xs">
                  {post.publishedAt && (
                    <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                  )}
                  {post.readTime && <span>{post.readTime} min read</span>}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {pagination && pagination.totalPages > 1 && (
        <div className="mt-10 flex items-center justify-center gap-4">
          <Button
            variant="outline"
            disabled={page <= 1}
            onClick={() => setPage((p) => p - 1)}
          >
            Previous
          </Button>
          <span className="text-muted-foreground text-sm">
            Page {page} of {pagination.totalPages}
          </span>
          <Button
            variant="outline"
            disabled={page >= pagination.totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </Button>
        </div>
      )}
    </>
  );
}

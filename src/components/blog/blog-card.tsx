"use client";

import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { formatBlogDate } from "@/lib/blog/blog-format";
import type { BlogPostInterface } from "@/lib/blog/blog.types";

interface BlogCardProps {
  post: BlogPostInterface;
  /** Listing pages sit under an `h1`. The homepage section already has an `h2`. */
  heading?: "h2" | "h3";
}

/**
 * Shared post preview used by the listing grid and the homepage section.
 * Featured images stay as native images because Bloggr hosts are not known at build time.
 */
export function BlogCard({ post, heading = "h2" }: BlogCardProps) {
  const published = formatBlogDate(post.publishedAt);
  const Title = heading;

  return (
    <Link href={`/blog/${post.slug}`} className="block h-full">
      <Card className="border-border/50 bg-card/50 h-full transition-all hover:border-blue-500/30">
        {post.featuredImage ? (
          // eslint-disable-next-line @next/next/no-img-element -- remote Bloggr URLs are not in image remotePatterns
          <img
            src={post.featuredImage}
            alt=""
            className="aspect-video w-full object-cover"
          />
        ) : null}
        <CardContent className="p-6">
          {post.categoryName ? (
            <Badge variant="outline" className="mb-3">
              {post.categoryName}
            </Badge>
          ) : null}
          <Title className="text-lg font-semibold">{post.title}</Title>
          {post.excerpt ? (
            <p className="text-muted-foreground mt-2 line-clamp-3 text-sm">
              {post.excerpt}
            </p>
          ) : null}
          <div className="text-muted-foreground mt-4 flex flex-wrap gap-3 text-xs">
            {published ? <span>{published}</span> : null}
            {post.readTime ? <span>{post.readTime} min read</span> : null}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

/** Placeholder grid shown while the listing query is in flight. */
export function BlogCardSkeletonGrid({ count = 6 }: { count?: number }) {
  return (
    <div className="mt-10 grid gap-6 md:grid-cols-3">
      {Array.from({ length: count }, (_, index) => (
        <Skeleton key={index} className="h-48 rounded-xl" />
      ))}
    </div>
  );
}

import { NextResponse } from "next/server";

import { fetchBlogBySlug } from "@/lib/blog/blog-client";
import type { BlogPostInterface } from "@/lib/blog/blog.types";

interface RouteParams {
  params: Promise<{ slug: string }>;
}

/** `GET /api/blog/:slug` — one published post as {@link BlogPostInterface}. */
export async function GET(_request: Request, { params }: RouteParams) {
  const { slug } = await params;

  try {
    const post: BlogPostInterface | null = await fetchBlogBySlug(slug);
    if (!post) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }
    return NextResponse.json(post);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch blog post";
    return NextResponse.json({ message }, { status: 500 });
  }
}

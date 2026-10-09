import { NextResponse } from "next/server";

import { fetchBlogs } from "@/lib/blog/blog-client";
import type { BlogListResponseInterface } from "@/lib/blog/blog.types";

function readPositiveInt(value: string | null, fallback: number): number {
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed < 1) return fallback;
  return Math.floor(parsed);
}

/** `GET /api/blog` — published posts as {@link BlogListResponseInterface}. */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = readPositiveInt(searchParams.get("page"), 1);
  const limit = readPositiveInt(searchParams.get("limit"), 10);
  const search = searchParams.get("search") ?? undefined;
  const category = searchParams.get("category") ?? undefined;

  try {
    const data: BlogListResponseInterface = await fetchBlogs({
      page,
      limit,
      search,
      category,
    });
    return NextResponse.json(data);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch blogs";
    return NextResponse.json({ message }, { status: 500 });
  }
}

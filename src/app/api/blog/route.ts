import { NextResponse } from "next/server";

import { fetchBlogs } from "@/lib/blog/blog-client";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get("page") ?? 1);
  const limit = Number(searchParams.get("limit") ?? 10);
  const search = searchParams.get("search") ?? undefined;
  const category = searchParams.get("category") ?? undefined;

  try {
    const data = await fetchBlogs({ page, limit, search, category });
    return NextResponse.json(data);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch blogs";
    return NextResponse.json({ message }, { status: 500 });
  }
}

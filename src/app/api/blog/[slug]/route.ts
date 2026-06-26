import { NextResponse } from "next/server";

import { fetchBlogBySlug } from "@/lib/blog/blog-client";

interface RouteParams {
  params: Promise<{ slug: string }>;
}

export async function GET(_request: Request, { params }: RouteParams) {
  const { slug } = await params;

  try {
    const post = await fetchBlogBySlug(slug);
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

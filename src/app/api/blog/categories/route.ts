import { NextResponse } from "next/server";

import { fetchCategories } from "@/lib/blog/blog-client";
import type { BlogCategoryInterface } from "@/lib/blog/blog.types";

/** `GET /api/blog/categories` — category tree as {@link BlogCategoryInterface}. */
export async function GET() {
  try {
    const categories: BlogCategoryInterface[] = await fetchCategories();
    return NextResponse.json(categories);
  } catch {
    return NextResponse.json([]);
  }
}

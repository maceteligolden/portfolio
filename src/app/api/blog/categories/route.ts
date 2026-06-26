import { NextResponse } from "next/server";

import { fetchCategories } from "@/lib/blog/blog-client";

export async function GET() {
  try {
    const categories = await fetchCategories();
    return NextResponse.json(categories);
  } catch {
    return NextResponse.json([]);
  }
}

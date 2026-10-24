import Link from "next/link";

import { BlogCard } from "@/components/blog/blog-card";
import { FadeIn } from "@/components/layout/fade-in";
import { SectionHeading } from "@/components/layout/section-heading";
import { fetchBlogs } from "@/lib/blog/blog-client";
import type { BlogPostInterface } from "@/lib/blog/blog.types";
import { isBlogConfigured } from "@/lib/env";

/** Homepage preview of the three most recently requested published posts. */
export async function LatestBlogSection() {
  let posts: BlogPostInterface[] = [];

  try {
    const result = await fetchBlogs({ limit: 3 });
    posts = result.data;
  } catch {
    posts = [];
  }

  return (
    <section className="bg-white py-20 md:py-28">
      <div className="max-w-padding">
        <FadeIn>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              label="Writing"
              title="What I’ve been writing"
              description="Notes on engineering, products, and the systems I keep coming back to."
            />
            <Link href="/blog" className="text-sm underline underline-offset-4">
              All posts
            </Link>
          </div>

          {posts.length === 0 ? (
            <p className="text-muted-foreground mt-12 text-center">
              {isBlogConfigured()
                ? "No articles published yet."
                : "Articles will appear here once Bloggr is configured."}
            </p>
          ) : (
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {posts.map((post) => (
                <BlogCard key={post._id} post={post} heading="h3" />
              ))}
            </div>
          )}
        </FadeIn>
      </div>
    </section>
  );
}

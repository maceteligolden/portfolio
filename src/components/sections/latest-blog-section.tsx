import { SectionHeading } from "@/components/layout/section-heading";
import { BlogCard } from "@/components/blog/blog-card";
import { LinkButton } from "@/components/ui/link-button";
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
    <section className="py-20">
      <div className="max-w-padding">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            label="Blog"
            title="Design Thoughts"
            description="Thoughts on AI engineering, backend systems, and building products."
          />
          <LinkButton href="/blog" variant="outline">
            View All Posts
          </LinkButton>
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
      </div>
    </section>
  );
}

import Link from "next/link";

import { SectionHeading } from "@/components/layout/section-heading";
import { Badge } from "@/components/ui/badge";
import { LinkButton } from "@/components/ui/link-button";
import { Card, CardContent } from "@/components/ui/card";
import { fetchBlogs } from "@/lib/blog/blog-client";

export async function LatestBlogSection() {
  let posts: Awaited<ReturnType<typeof fetchBlogs>>["data"] = [];

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
            Blog posts will appear here once BlogForAll is configured.
          </p>
        ) : (
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {posts.map((post) => (
              <Link key={post._id} href={`/blog/${post.slug}`}>
                <Card className="border-border/50 bg-card/50 h-full transition-all hover:border-blue-500/30">
                  <CardContent className="p-6">
                    {post.category && (
                      <Badge variant="outline" className="mb-3">
                        {post.category}
                      </Badge>
                    )}
                    <h3 className="text-lg font-semibold">{post.title}</h3>
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
        )}
      </div>
    </section>
  );
}

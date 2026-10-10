"use client";

import DOMPurify from "isomorphic-dompurify";

import { TrackedLinkButton } from "@/components/analytics/tracked-link-button";
import { PageCtaBand } from "@/components/sections/page-cta-band";
import { Badge } from "@/components/ui/badge";
import { LinkButton } from "@/components/ui/link-button";
import { Separator } from "@/components/ui/separator";
import { formatBlogDate } from "@/lib/blog/blog-format";
import { useReadingProgress } from "@/lib/blog/blog.queries";
import type { BlogPostInterface } from "@/lib/blog/blog.types";

interface BlogArticleProps {
  post: BlogPostInterface;
}

/**
 * Renders one published post. The page fetches the post on the server and passes it in.
 */
export function BlogArticle({ post }: BlogArticleProps) {
  useReadingProgress();

  const sanitized = post.content
    ? DOMPurify.sanitize(post.content)
    : "<p>Content unavailable.</p>";
  const published = formatBlogDate(post.publishedAt);

  return (
    <>
      <div
        id="reading-progress"
        className="fixed top-16 left-0 z-40 h-0.5 bg-blue-500 transition-all"
        style={{ width: "0%" }}
      />
      <article className="max-w-padding py-16">
        <LinkButton href="/blog" variant="ghost" size="sm" className="mb-8">
          ← Back to Blog
        </LinkButton>

        {post.categoryName ? (
          <Badge variant="outline" className="mb-4">
            {post.categoryName}
          </Badge>
        ) : null}
        <h1 className="text-4xl font-bold tracking-tight">{post.title}</h1>
        {post.excerpt ? (
          <p className="text-muted-foreground mt-4 max-w-3xl text-lg">{post.excerpt}</p>
        ) : null}
        <div className="text-muted-foreground mt-4 flex flex-wrap gap-4 text-sm">
          {post.author?.name ? <span>{post.author.name}</span> : null}
          {published ? <span>{published}</span> : null}
          {post.readTime ? <span>{post.readTime} min read</span> : null}
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <TrackedLinkButton
            href="/contact?intent=project"
            intent="project"
            location="blog-article"
            size="lg"
          >
            Start a project
          </TrackedLinkButton>
          <TrackedLinkButton
            href="/contact?intent=hiring"
            intent="hiring"
            location="blog-article-hiring"
            variant="outline"
            size="lg"
          >
            Share a job description
          </TrackedLinkButton>
        </div>

        {post.tags && post.tags.length > 0 ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        ) : null}

        {post.featuredImage ? (
          // eslint-disable-next-line @next/next/no-img-element -- remote Bloggr URLs are not in image remotePatterns
          <img
            src={post.featuredImage}
            alt=""
            className="mt-8 aspect-video w-full rounded-xl object-cover"
          />
        ) : null}

        <Separator className="my-8" />

        <div className="prose-blog" dangerouslySetInnerHTML={{ __html: sanitized }} />

        <Separator className="my-12" />
        <PageCtaBand
          title="If the notes are useful, the next step is a note back"
          description="Tell me what you need built, or send a job description. I read every one and reply by email."
        >
          <TrackedLinkButton
            href="/contact?intent=project"
            intent="project"
            location="blog-article-close"
            size="lg"
          >
            Start a project
          </TrackedLinkButton>
          <TrackedLinkButton
            href="/contact?intent=hiring"
            intent="hiring"
            location="blog-article-close-hiring"
            variant="outline"
            size="lg"
          >
            Share a job description
          </TrackedLinkButton>
        </PageCtaBand>
      </article>
    </>
  );
}

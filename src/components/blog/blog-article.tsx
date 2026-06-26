"use client";

import DOMPurify from "isomorphic-dompurify";
import { useEffect } from "react";

import { ContactCtaSection } from "@/components/sections/contact-cta-section";
import { Badge } from "@/components/ui/badge";
import { LinkButton } from "@/components/ui/link-button";
import { Separator } from "@/components/ui/separator";
import type { BlogPostInterface } from "@/lib/blog/blog.types";

interface BlogArticleProps {
  post: BlogPostInterface;
}

export function BlogArticle({ post }: BlogArticleProps) {
  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      const bar = document.getElementById("reading-progress");
      if (bar) bar.style.width = `${progress}%`;
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const sanitized = post.content
    ? DOMPurify.sanitize(post.content)
    : "<p>Content unavailable.</p>";

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

        {post.category && (
          <Badge variant="outline" className="mb-4">
            {post.category}
          </Badge>
        )}
        <h1 className="text-4xl font-bold tracking-tight">{post.title}</h1>
        <div className="text-muted-foreground mt-4 flex flex-wrap gap-4 text-sm">
          {post.publishedAt && (
            <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
          )}
          {post.readTime && <span>{post.readTime} min read</span>}
          {post.views !== undefined && <span>{post.views} views</span>}
        </div>

        {post.tags && post.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        <Separator className="my-8" />

        <div className="prose-blog" dangerouslySetInnerHTML={{ __html: sanitized }} />

        <Separator className="my-12" />
        <ContactCtaSection />
      </article>
    </>
  );
}

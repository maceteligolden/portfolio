import { notFound } from "next/navigation";

import { BlogArticle } from "@/components/blog/blog-article";
import { fetchBlogBySlug } from "@/lib/blog/blog-client";
import { getSiteConfig } from "@/lib/content";
import { getBlogPostingJsonLd } from "@/lib/seo/json-ld";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await fetchBlogBySlug(slug);
  const site = getSiteConfig();
  if (!post) return { title: "Post Not Found" };
  return {
    title: `${post.title} | ${site.name}`,
    description: post.excerpt,
  };
}

export const revalidate = 3600;

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await fetchBlogBySlug(slug);
  if (!post) notFound();

  const jsonLd = getBlogPostingJsonLd({
    title: post.title,
    excerpt: post.excerpt,
    slug: post.slug,
    publishedAt: post.publishedAt,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogArticle post={post} />
    </>
  );
}

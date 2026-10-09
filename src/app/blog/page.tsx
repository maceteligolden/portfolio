import { BlogListing } from "@/components/blog/blog-listing";
import { PageContainer } from "@/components/layout/page-container";
import { fetchBlogs, fetchCategories } from "@/lib/blog/blog-client";
import { emptyBlogList } from "@/lib/blog/blog.mapper";
import type { BlogCategoryInterface } from "@/lib/blog/blog.types";
import { getSiteConfig } from "@/lib/content";

const site = getSiteConfig();
const PAGE_SIZE = 9;

export const metadata = {
  title: `Blog | ${site.name}`,
  description: "Thoughts on AI engineering, backend systems, and building products.",
};

export default async function BlogPage() {
  const [initialPosts, initialCategories] = await Promise.all([
    fetchBlogs({ page: 1, limit: PAGE_SIZE }).catch(() => emptyBlogList(PAGE_SIZE)),
    fetchCategories().catch(() => [] as BlogCategoryInterface[]),
  ]);

  return (
    <PageContainer>
      <p className="text-sm font-medium tracking-widest text-blue-400 uppercase">
        Blog
      </p>
      <h1 className="mt-2 text-4xl font-bold tracking-tight">Design Thoughts</h1>
      <p className="text-muted-foreground mt-4 max-w-2xl">
        Articles on AI engineering, backend architecture, system design, and shipping
        production systems.
      </p>
      <BlogListing initialPosts={initialPosts} initialCategories={initialCategories} />
    </PageContainer>
  );
}

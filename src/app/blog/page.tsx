import { TrackedLinkButton } from "@/components/analytics/tracked-link-button";
import { BlogListing } from "@/components/blog/blog-listing";
import { PageContainer } from "@/components/layout/page-container";
import { PageCtaBand } from "@/components/sections/page-cta-band";
import { fetchBlogs, fetchCategories } from "@/lib/blog/blog-client";
import { emptyBlogList } from "@/lib/blog/blog.mapper";
import type { BlogCategoryInterface } from "@/lib/blog/blog.types";
import { getSiteConfig } from "@/lib/content";

const site = getSiteConfig();
const PAGE_SIZE = 9;

export const metadata = {
  title: `Blog | ${site.name}`,
  description:
    "Notes on AI, backend systems, and what it takes to ship them. The case studies are on the work page.",
};

export default async function BlogPage() {
  const [initialPosts, initialCategories] = await Promise.all([
    fetchBlogs({ page: 1, limit: PAGE_SIZE }).catch(() => emptyBlogList(PAGE_SIZE)),
    fetchCategories().catch(() => [] as BlogCategoryInterface[]),
  ]);

  return (
    <PageContainer>
      <p className="flex items-center gap-2 text-sm font-bold tracking-[0.02em] uppercase">
        <span aria-hidden className="inline-block size-3 bg-black" />
        Blog
      </p>
      <h1 className="mt-2 text-4xl font-bold tracking-tight">
        Notes on building systems
      </h1>
      <p className="text-muted-foreground mt-4 max-w-2xl text-lg">
        Writing on AI, backend systems, and what it takes to ship them.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <TrackedLinkButton
          href="/contact?intent=project"
          intent="project"
          location="blog-index"
          size="lg"
        >
          Start a project
        </TrackedLinkButton>
        <TrackedLinkButton
          href="/contact?intent=hiring"
          intent="hiring"
          location="blog-index-hiring"
          variant="outline"
          size="lg"
        >
          Share a job description
        </TrackedLinkButton>
      </div>
      <BlogListing initialPosts={initialPosts} initialCategories={initialCategories} />
      <PageCtaBand
        title="If the notes are useful, the next step is a note back"
        description="Tell me what you need built, or send a job description. I read every one and reply by email."
      >
        <TrackedLinkButton
          href="/contact?intent=project"
          intent="project"
          location="blog-index-close"
          size="lg"
        >
          Start a project
        </TrackedLinkButton>
        <TrackedLinkButton
          href="/contact?intent=hiring"
          intent="hiring"
          location="blog-index-close-hiring"
          variant="outline"
          size="lg"
        >
          Share a job description
        </TrackedLinkButton>
      </PageCtaBand>
    </PageContainer>
  );
}

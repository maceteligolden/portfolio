import type {
  BlogCategoryInterface,
  BlogCategoryWireInterface,
  BlogListResponseInterface,
  BlogListWireInterface,
  BlogPaginationInterface,
  BlogPostInterface,
  BlogPostWireInterface,
} from "./blog.types";

const EMPTY_PAGINATION: BlogPaginationInterface = {
  page: 1,
  limit: 10,
  total: 0,
  totalPages: 0,
};

/** Empty list used when Bloggr credentials are missing. */
export function emptyBlogList(limit = 10): BlogListResponseInterface {
  return {
    data: [],
    pagination: { ...EMPTY_PAGINATION, limit },
  };
}

function readParentId(wire: BlogCategoryWireInterface): string | undefined {
  if (typeof wire.parent_id === "string" && wire.parent_id) return wire.parent_id;
  if (typeof wire.parent === "string" && wire.parent) return wire.parent;
  if (wire.parent && typeof wire.parent === "object" && wire.parent._id) {
    return wire.parent._id;
  }
  return undefined;
}

/** Map one Bloggr category, preserving nested `children` from `tree=true`. */
export function mapBlogCategory(
  wire: BlogCategoryWireInterface,
): BlogCategoryInterface {
  const children = wire.children?.map(mapBlogCategory);
  return {
    _id: wire._id,
    name: wire.name,
    slug: wire.slug,
    parentId: readParentId(wire),
    children: children?.length ? children : undefined,
  };
}

/** Map a category array. Non-arrays become an empty list. */
export function mapBlogCategories(
  wires: BlogCategoryWireInterface[],
): BlogCategoryInterface[] {
  if (!Array.isArray(wires)) return [];
  return wires.map(mapBlogCategory);
}

/** Depth-first list of a category tree, used for name lookup and the filter. */
export function flattenCategories(
  categories: BlogCategoryInterface[],
): BlogCategoryInterface[] {
  return categories.flatMap((category) => [
    category,
    ...flattenCategories(category.children ?? []),
  ]);
}

/** `_id` to display name, including nested categories. */
export function categoryNameMap(
  categories: BlogCategoryInterface[],
): Map<string, string> {
  return new Map(
    flattenCategories(categories).map((category) => [category._id, category.name]),
  );
}

function resolveCategory(
  category: BlogPostWireInterface["category"],
  names: Map<string, string>,
): Pick<BlogPostInterface, "categoryId" | "categoryName"> {
  if (!category) return {};
  if (typeof category === "string") {
    return { categoryId: category, categoryName: names.get(category) };
  }
  return {
    categoryId: category._id,
    categoryName: category.name || names.get(category._id),
  };
}

/** Bloggr sometimes sends an account id where a display name belongs. */
const OPAQUE_ID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function displayName(value: string | undefined): string | undefined {
  const name = value?.trim();
  if (!name || OPAQUE_ID.test(name)) return undefined;
  return name;
}

function mapAuthor(
  author: BlogPostWireInterface["author"],
): BlogPostInterface["author"] {
  if (!author) return undefined;
  if (typeof author === "string") {
    const name = displayName(author);
    return name ? { name } : undefined;
  }
  const name = displayName(author.name);
  if (!name) return undefined;
  return { name, email: author.email };
}

/**
 * Map a Bloggr post onto {@link BlogPostInterface}.
 * `likes` is dropped here and never reaches the UI.
 * `author` may be a name string or `{ name, email }`. Account ids are dropped.
 */
export function mapBlogPost(
  wire: BlogPostWireInterface,
  names: Map<string, string> = new Map(),
): BlogPostInterface {
  return {
    _id: wire._id,
    title: wire.title,
    slug: wire.slug,
    excerpt: wire.excerpt ?? undefined,
    content: wire.content ?? undefined,
    featuredImage: wire.featured_image ?? undefined,
    author: mapAuthor(wire.author),
    ...resolveCategory(wire.category, names),
    views: wire.views ?? undefined,
    publishedAt: wire.published_at ?? undefined,
    createdAt: wire.created_at ?? undefined,
    tags: wire.tags,
    readTime: wire.read_time ?? wire.readTime,
  };
}

/** Map a list payload, filling category names from `names` when the post only has an id. */
export function mapBlogList(
  wire: BlogListWireInterface | BlogPostWireInterface[] | undefined,
  names: Map<string, string>,
  fallback: { page: number; limit: number },
): BlogListResponseInterface {
  const list = Array.isArray(wire) ? { data: wire } : wire;
  const posts = (list?.data ?? []).map((post) => mapBlogPost(post, names));
  const pagination = list?.pagination;

  return {
    data: posts,
    pagination: {
      page: pagination?.page ?? fallback.page,
      limit: pagination?.limit ?? fallback.limit,
      total: pagination?.total ?? posts.length,
      totalPages: pagination?.totalPages ?? (posts.length > 0 ? 1 : 0),
    },
  };
}

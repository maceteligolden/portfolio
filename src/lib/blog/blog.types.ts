/**
 * Bloggr JSON shapes and the domain interfaces components consume.
 * Wire types stay snake_case. Domain types are camelCase.
 * Likes and comments are intentionally absent.
 */

/** Error object from a failed Bloggr envelope. */
export interface BloggrErrorInterface {
  code: string;
  details?: string;
}

/** Standard Bloggr response wrapper. `data` is the payload. */
export interface BloggrEnvelopeInterface<T> {
  success: boolean;
  message: string;
  data: T;
  error?: BloggrErrorInterface;
}

/** Author object as Bloggr returns it when the field is populated. */
export interface BlogAuthorWireInterface {
  name: string;
  email?: string;
}

/** Category node as Bloggr returns it, including an optional tree. */
export interface BlogCategoryWireInterface {
  _id: string;
  name: string;
  slug?: string;
  parent?: string | { _id?: string } | null;
  parent_id?: string | null;
  children?: BlogCategoryWireInterface[];
}

/**
 * Published post as Bloggr returns it.
 * `likes` is part of the upstream payload and is not mapped into the domain.
 */
export interface BlogPostWireInterface {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content?: string;
  featured_image?: string;
  /** A display name, or a populated author object. */
  author?: BlogAuthorWireInterface | string;
  category?: string | BlogCategoryWireInterface;
  tags?: string[];
  likes?: number;
  views?: number;
  published_at?: string;
  created_at?: string;
  read_time?: number;
  readTime?: number;
}

/** List payload nested under the Bloggr envelope `data` field. */
export interface BlogListWireInterface {
  data?: BlogPostWireInterface[];
  pagination?: Partial<BlogPaginationInterface>;
}

/** Author shown on cards and articles. */
export interface BlogAuthorInterface {
  name: string;
  email?: string;
}

/** Published post after mapping. Components should depend on this type only. */
export interface BlogPostInterface {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content?: string;
  featuredImage?: string;
  author?: BlogAuthorInterface;
  categoryId?: string;
  categoryName?: string;
  views?: number;
  publishedAt?: string;
  createdAt?: string;
  tags?: string[];
  readTime?: number;
}

/** Page window returned with a post list. */
export interface BlogPaginationInterface {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

/** Domain list returned by `fetchBlogs` and `GET /api/blog`. */
export interface BlogListResponseInterface {
  data: BlogPostInterface[];
  pagination: BlogPaginationInterface;
}

/** Category used by the listing filter. `children` is set when the API returns a tree. */
export interface BlogCategoryInterface {
  _id: string;
  name: string;
  slug?: string;
  parentId?: string;
  children?: BlogCategoryInterface[];
}

/** Query accepted by the list endpoint and `useBlogPosts`. */
export interface BlogQueryParamsInterface {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
}

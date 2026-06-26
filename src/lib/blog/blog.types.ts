export interface BlogPostInterface {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content?: string;
  featuredImage?: string;
  tags?: string[];
  category?: string;
  publishedAt?: string;
  readTime?: number;
  views?: number;
  likes?: number;
}

export interface BlogPaginationInterface {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface BlogListResponseInterface {
  data: BlogPostInterface[];
  pagination: BlogPaginationInterface;
}

export interface BlogCategoryInterface {
  _id: string;
  name: string;
  slug?: string;
}

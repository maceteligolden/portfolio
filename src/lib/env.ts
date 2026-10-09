function requireValue(name: string, value: string | undefined): string {
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

/**
 * Each variable is read with a static `process.env.NAME` access.
 * Next.js only inlines those. A dynamic `process.env[name]` stays empty in the server bundle.
 */
export const env = {
  /** Bloggr public API origin, including `/api/v1`. Server-only. */
  blogApiBaseUrl: process.env.BLOG_API_BASE_URL ?? "",
  /** Bloggr access key id. Server-only. */
  blogAccessKeyId: process.env.BLOG_ACCESS_KEY_ID ?? "",
  /** Bloggr secret key. Server-only. Never expose this to the browser. */
  blogSecretKey: process.env.BLOG_SECRET_KEY ?? "",
  brevoApiKey: process.env.BREVO_API_KEY ?? "",
  brevoSenderEmail: process.env.BREVO_SENDER_EMAIL ?? "",
  brevoSenderName: process.env.BREVO_SENDER_NAME ?? "Golden Mac-Eteli",
  contactEmail: process.env.CONTACT_EMAIL ?? "maceteligolden@gmail.com",
  notionApiKey: process.env.NOTION_API_KEY ?? "",
  notionLeadsDatabaseId: process.env.NOTION_LEADS_DATABASE_ID ?? "",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://maceteligolden.com",
  calendlyUrl: process.env.NEXT_PUBLIC_CALENDLY_URL ?? "",
  logLevel: process.env.LOG_LEVEL ?? "info",
};

/** Throws when a Bloggr read is required and credentials are missing. */
export function assertBlogEnv(): void {
  requireValue("BLOG_API_BASE_URL", process.env.BLOG_API_BASE_URL);
  requireValue("BLOG_ACCESS_KEY_ID", process.env.BLOG_ACCESS_KEY_ID);
  requireValue("BLOG_SECRET_KEY", process.env.BLOG_SECRET_KEY);
}

/**
 * True when the server can call Bloggr.
 * The workspace comes from the key, so a site id is not required.
 */
export function isBlogConfigured(): boolean {
  return Boolean(env.blogApiBaseUrl && env.blogAccessKeyId && env.blogSecretKey);
}

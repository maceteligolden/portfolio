function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

function optionalEnv(name: string, fallback = ""): string {
  return process.env[name] ?? fallback;
}

export const env = {
  blogApiBaseUrl: optionalEnv("BLOG_API_BASE_URL"),
  blogAccessKeyId: optionalEnv("BLOG_ACCESS_KEY_ID"),
  blogSecretKey: optionalEnv("BLOG_SECRET_KEY"),
  blogSiteId: optionalEnv("BLOG_SITE_ID"),
  resendApiKey: optionalEnv("RESEND_API_KEY"),
  contactEmail: optionalEnv("CONTACT_EMAIL", "maceteligolden@gmail.com"),
  siteUrl: optionalEnv("NEXT_PUBLIC_SITE_URL", "https://maceteligolden.com"),
  calendlyUrl: optionalEnv("NEXT_PUBLIC_CALENDLY_URL"),
  logLevel: optionalEnv("LOG_LEVEL", "info"),
};

export function assertBlogEnv(): void {
  requireEnv("BLOG_API_BASE_URL");
  requireEnv("BLOG_ACCESS_KEY_ID");
  requireEnv("BLOG_SECRET_KEY");
  requireEnv("BLOG_SITE_ID");
}

export function isBlogConfigured(): boolean {
  return Boolean(
    env.blogApiBaseUrl && env.blogAccessKeyId && env.blogSecretKey && env.blogSiteId,
  );
}

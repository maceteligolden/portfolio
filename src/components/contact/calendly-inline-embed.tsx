"use client";

function calendlyEmbedUrl(url: string) {
  const embed = new URL(url);
  embed.searchParams.set("hide_gdpr_banner", "1");
  embed.searchParams.set("embed_type", "Inline");
  embed.searchParams.set("background_color", "1f1f1f");
  embed.searchParams.set("text_color", "fafafa");
  embed.searchParams.set("primary_color", "60a5fa");
  return embed.toString();
}

export function CalendlyInlineEmbed({ url }: { url: string }) {
  return (
    <iframe
      src={calendlyEmbedUrl(url)}
      title="Set up a meeting"
      className="h-[700px] min-h-[700px] w-full rounded-lg border-0 bg-[#1f1f1f]"
    />
  );
}

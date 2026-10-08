"use client";

import { useEffect } from "react";

import { trackLeadConversion } from "@/lib/analytics/google-ads";

function calendlyEmbedUrl(url: string) {
  const embed = new URL(url);
  embed.searchParams.set("hide_gdpr_banner", "1");
  embed.searchParams.set("embed_type", "Inline");
  embed.searchParams.set("background_color", "1f1f1f");
  embed.searchParams.set("text_color", "fafafa");
  embed.searchParams.set("primary_color", "60a5fa");
  return embed.toString();
}

function isCalendlyScheduledEvent(event: MessageEvent) {
  if (event.origin !== "https://calendly.com") return false;
  const data = event.data as { event?: unknown } | null;
  return data?.event === "calendly.event_scheduled";
}

export function CalendlyInlineEmbed({ url }: { url: string }) {
  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (!isCalendlyScheduledEvent(event)) return;
      trackLeadConversion();
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  return (
    <iframe
      src={calendlyEmbedUrl(url)}
      title="Set up a meeting"
      className="h-[700px] min-h-[700px] w-full rounded-lg border-0 bg-[#1f1f1f]"
    />
  );
}

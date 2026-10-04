import type { ContactFormValues } from "@/lib/contact/schema";
import { env } from "@/lib/env";
import { createChildLogger } from "@/lib/logger";

const log = createChildLogger("notion-leads");

function richText(content: string) {
  return {
    rich_text: [{ text: { content: content.slice(0, 2000) } }],
  };
}

function select(name: string) {
  return { select: { name } };
}

export function isNotionConfigured(): boolean {
  return Boolean(env.notionApiKey && env.notionLeadsDatabaseId);
}

export async function createNotionLead(lead: ContactFormValues): Promise<boolean> {
  if (!isNotionConfigured()) {
    log.warn("Notion leads database is not configured");
    return false;
  }

  const response = await fetch("https://api.notion.com/v1/pages", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.notionApiKey}`,
      "Content-Type": "application/json",
      "Notion-Version": "2022-06-28",
    },
    body: JSON.stringify({
      parent: { database_id: env.notionLeadsDatabaseId },
      properties: {
        Name: { title: [{ text: { content: lead.name } }] },
        Email: { email: lead.email },
        Company: richText(lead.company ?? ""),
        Audience: select(lead.audience),
        Service: select(lead.service),
        Timeline: select(lead.timeline),
        Budget: select(lead.budget),
        Message: richText(lead.message),
        Status: select("New"),
        Source: select("website"),
      },
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    log.error({ status: response.status, body }, "Notion lead create failed");
    return false;
  }

  log.info({ email: lead.email }, "Notion lead created");
  return true;
}

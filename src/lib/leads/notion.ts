import { leadSummary, type ContactFormValues } from "@/lib/contact/schema";
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

async function createPage(properties: Record<string, unknown>): Promise<Response> {
  return fetch("https://api.notion.com/v1/pages", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.notionApiKey}`,
      "Content-Type": "application/json",
      "Notion-Version": "2022-06-28",
    },
    body: JSON.stringify({
      parent: { database_id: env.notionLeadsDatabaseId },
      properties,
    }),
  });
}

function baseProperties(lead: ContactFormValues) {
  return {
    Name: { title: [{ text: { content: lead.name } }] },
    Email: { email: lead.email },
    Company: richText(lead.company ?? ""),
    Message: richText(leadSummary(lead)),
    Status: select("New"),
    Source: select("website"),
  };
}

export async function createNotionLead(lead: ContactFormValues): Promise<boolean> {
  if (!isNotionConfigured()) {
    log.warn("Notion leads database is not configured");
    return false;
  }

  const properties =
    lead.intent === "project"
      ? {
          ...baseProperties(lead),
          Audience: select(lead.audience),
          Service: select(lead.service),
          Timeline: select(lead.timeline),
          Budget: select(lead.budget),
        }
      : baseProperties(lead);

  let response = await createPage(properties);

  if (!response.ok && lead.intent === "project") {
    const failed = await response.text();
    log.warn(
      { status: response.status, body: failed },
      "Notion lead retrying without selects",
    );
    response = await createPage(baseProperties(lead));
  }

  if (!response.ok) {
    const body = await response.text();
    log.error({ status: response.status, body }, "Notion lead create failed");
    return false;
  }

  log.info({ email: lead.email, intent: lead.intent }, "Notion lead created");
  return true;
}

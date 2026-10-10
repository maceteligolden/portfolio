import { leadSummary, type ContactFormValues } from "@/lib/contact/schema";
import { env } from "@/lib/env";

export function isBrevoConfigured(): boolean {
  return Boolean(env.brevoApiKey && env.brevoSenderEmail);
}

function briefText(lead: ContactFormValues): string {
  if (lead.intent === "hiring") {
    return [
      `Name: ${lead.name}`,
      `Email: ${lead.email}`,
      `Company: ${lead.company}`,
      `Role: ${lead.roleTitle}`,
      lead.jobLink?.trim() ? `Link: ${lead.jobLink.trim()}` : "",
      "",
      lead.message?.trim() ?? "",
    ]
      .filter((line) => line !== "")
      .join("\n");
  }

  if (lead.intent === "product") {
    return [
      `Name: ${lead.name}`,
      `Email: ${lead.email}`,
      lead.company ? `Company: ${lead.company}` : "",
      "",
      lead.message,
    ]
      .filter((line) => line !== "")
      .join("\n");
  }

  return [
    `Name: ${lead.name}`,
    `Email: ${lead.email}`,
    lead.company ? `Company: ${lead.company}` : "",
    `Who: ${lead.audience}`,
    `Service: ${lead.service}`,
    `Timeline: ${lead.timeline}`,
    `Budget: ${lead.budget}`,
    "",
    lead.message,
  ]
    .filter((line) => line !== "")
    .join("\n");
}

function subject(lead: ContactFormValues): string {
  if (lead.intent === "hiring") return `[Hiring] ${lead.roleTitle} — ${lead.name}`;
  if (lead.intent === "product") return `[Product] ${lead.name}`;
  return `[Project] ${lead.service} — ${lead.name}`;
}

export async function sendProjectBrief(lead: ContactFormValues): Promise<void> {
  const response = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      accept: "application/json",
      "api-key": env.brevoApiKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      sender: {
        email: env.brevoSenderEmail,
        name: env.brevoSenderName || "Golden Mac-Eteli",
      },
      to: [{ email: env.contactEmail }],
      replyTo: { email: lead.email, name: lead.name },
      subject: subject(lead),
      textContent: briefText(lead),
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Brevo send failed (${response.status}): ${body}`);
  }
}

export function leadLogFields(lead: ContactFormValues) {
  return {
    email: lead.email,
    intent: lead.intent,
    detail: lead.intent === "project" ? lead.service : leadSummary(lead).slice(0, 120),
  };
}

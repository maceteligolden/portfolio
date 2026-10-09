import type { ContactFormValues } from "@/lib/contact/schema";
import { env } from "@/lib/env";

export function isBrevoConfigured(): boolean {
  return Boolean(env.brevoApiKey && env.brevoSenderEmail);
}

function briefText(lead: ContactFormValues): string {
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
    .filter(Boolean)
    .join("\n");
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
      subject: `[Project] ${lead.service} — ${lead.name}`,
      textContent: briefText(lead),
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Brevo send failed (${response.status}): ${body}`);
  }
}

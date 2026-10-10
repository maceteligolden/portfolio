import { NextResponse } from "next/server";
import { ZodError } from "zod";

import {
  isBrevoConfigured,
  leadLogFields,
  sendProjectBrief,
} from "@/lib/contact/brevo";
import { contactSchema } from "@/lib/contact/schema";
import { createNotionLead, isNotionConfigured } from "@/lib/leads/notion";
import { createChildLogger } from "@/lib/logger";

const log = createChildLogger("contact-api");

export async function POST(request: Request) {
  try {
    const body = contactSchema.parse(await request.json());

    if (body.honeypot) {
      log.warn("Honeypot triggered — likely spam");
      return NextResponse.json({ message: "Message sent" });
    }

    const emailConfigured = isBrevoConfigured();
    const notionConfigured = isNotionConfigured();

    if (!emailConfigured && !notionConfigured) {
      log.error("Neither Brevo nor Notion is configured");
      return NextResponse.json(
        { message: "Contact service not configured" },
        { status: 503 },
      );
    }

    let emailSent = false;
    if (emailConfigured) {
      try {
        await sendProjectBrief(body);
        emailSent = true;
        log.info(leadLogFields(body), "Contact form submitted");
      } catch (error) {
        log.error({ error }, "Brevo send failed");
      }
    }

    let notionSaved = false;
    try {
      notionSaved = await createNotionLead(body);
    } catch (error) {
      log.error({ error }, "Notion lead failed");
    }

    if (!emailSent && !notionSaved) {
      return NextResponse.json({ message: "Failed to send message" }, { status: 500 });
    }

    return NextResponse.json({ message: "Message sent successfully" });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ message: "Invalid form data" }, { status: 400 });
    }
    log.error({ error }, "Contact form failed");
    return NextResponse.json({ message: "Failed to send message" }, { status: 500 });
  }
}

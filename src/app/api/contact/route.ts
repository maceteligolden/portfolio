import { NextResponse } from "next/server";
import { Resend } from "resend";
import { ZodError } from "zod";

import { contactSchema } from "@/lib/contact/schema";
import { env } from "@/lib/env";
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

    const emailConfigured = Boolean(env.resendApiKey);
    const notionConfigured = isNotionConfigured();

    if (!emailConfigured && !notionConfigured) {
      log.error("Neither Resend nor Notion is configured");
      return NextResponse.json(
        { message: "Contact service not configured" },
        { status: 503 },
      );
    }

    let emailSent = false;
    if (emailConfigured) {
      try {
        const resend = new Resend(env.resendApiKey);
        await resend.emails.send({
          from: "Portfolio Contact <onboarding@resend.dev>",
          to: env.contactEmail,
          replyTo: body.email,
          subject: `[Project] ${body.service} — ${body.name}`,
          text: [
            `Name: ${body.name}`,
            `Email: ${body.email}`,
            body.company ? `Company: ${body.company}` : "",
            `Who: ${body.audience}`,
            `Service: ${body.service}`,
            `Timeline: ${body.timeline}`,
            `Budget: ${body.budget}`,
            "",
            body.message,
          ]
            .filter(Boolean)
            .join("\n"),
        });
        emailSent = true;
        log.info(
          { email: body.email, service: body.service },
          "Contact form submitted",
        );
      } catch (error) {
        log.error({ error }, "Resend send failed");
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

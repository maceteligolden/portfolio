import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

import { env } from "@/lib/env";
import { createChildLogger } from "@/lib/logger";

const log = createChildLogger("contact-api");

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  company: z.string().optional(),
  subject: z.string().min(3),
  message: z.string().min(10),
  honeypot: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const body = contactSchema.parse(await request.json());

    if (body.honeypot) {
      log.warn("Honeypot triggered — likely spam");
      return NextResponse.json({ message: "Message sent" });
    }

    if (!env.resendApiKey) {
      log.error("RESEND_API_KEY not configured");
      return NextResponse.json(
        { message: "Email service not configured" },
        { status: 503 },
      );
    }

    const resend = new Resend(env.resendApiKey);

    await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: env.contactEmail,
      replyTo: body.email,
      subject: `[Portfolio] ${body.subject}`,
      text: [
        `Name: ${body.name}`,
        `Email: ${body.email}`,
        body.company ? `Company: ${body.company}` : "",
        "",
        body.message,
      ]
        .filter(Boolean)
        .join("\n"),
    });

    log.info({ email: body.email, subject: body.subject }, "Contact form submitted");

    return NextResponse.json({ message: "Message sent successfully" });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Invalid form data", errors: error.flatten() },
        { status: 400 },
      );
    }
    log.error({ error }, "Contact form failed");
    return NextResponse.json({ message: "Failed to send message" }, { status: 500 });
  }
}

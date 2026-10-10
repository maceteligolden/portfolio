import { z } from "zod";

import {
  audienceValues,
  budgetValues,
  serviceValues,
  timelineValues,
} from "@/lib/contact/options";

const name = z.string().min(2, "Name is required");
const email = z.string().email("Valid email required");
const honeypot = z.string().optional();

export const projectContactSchema = z.object({
  intent: z.literal("project"),
  name,
  email,
  company: z.string().optional(),
  audience: z.enum(audienceValues, "Tell me who this is for"),
  service: z.enum(serviceValues, "Choose a service"),
  timeline: z.enum(timelineValues, "Choose a timeline"),
  budget: z.enum(budgetValues, "Choose a budget range"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  honeypot,
});

export const hiringContactSchema = z
  .object({
    intent: z.literal("hiring"),
    name,
    email,
    company: z.string().min(2, "Company is required"),
    roleTitle: z.string().min(2, "Role title is required"),
    jobLink: z.string().optional(),
    message: z.string().optional(),
    honeypot,
  })
  .superRefine((value, ctx) => {
    const link = value.jobLink?.trim() ?? "";
    const note = value.message?.trim() ?? "";
    if (link.length > 0 && !z.url().safeParse(link).success) {
      ctx.addIssue({
        code: "custom",
        path: ["jobLink"],
        message: "Enter a valid link",
      });
    }
    if (link.length === 0 && note.length < 10) {
      ctx.addIssue({
        code: "custom",
        path: ["message"],
        message: "Paste the job description or add a link",
      });
    }
  });

export const productContactSchema = z.object({
  intent: z.literal("product"),
  name,
  email,
  company: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
  honeypot,
});

export const contactSchema = z.discriminatedUnion("intent", [
  projectContactSchema,
  hiringContactSchema,
  productContactSchema,
]);

export type ContactIntent = "project" | "hiring" | "product";
export type ProjectContactValues = z.infer<typeof projectContactSchema>;
export type HiringContactValues = z.infer<typeof hiringContactSchema>;
export type ProductContactValues = z.infer<typeof productContactSchema>;
export type ContactFormValues = z.infer<typeof contactSchema>;

export function isContactIntent(value: string | undefined): value is ContactIntent {
  return value === "project" || value === "hiring" || value === "product";
}

export function leadSummary(lead: ContactFormValues): string {
  if (lead.intent === "hiring") {
    return [lead.roleTitle, lead.jobLink?.trim(), lead.message?.trim()]
      .filter((part) => part && part.length > 0)
      .join("\n\n");
  }
  return lead.message;
}

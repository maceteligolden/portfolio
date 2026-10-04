import { z } from "zod";

import {
  audienceValues,
  budgetValues,
  serviceValues,
  timelineValues,
} from "@/lib/contact/options";

export const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
  company: z.string().optional(),
  audience: z.enum(audienceValues, "Tell me who this is for"),
  service: z.enum(serviceValues, "Choose a service"),
  timeline: z.enum(timelineValues, "Choose a timeline"),
  budget: z.enum(budgetValues, "Choose a budget range"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  honeypot: z.string().optional(),
});

export type ContactFormValues = z.infer<typeof contactSchema>;

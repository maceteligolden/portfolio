"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getSiteConfig } from "@/lib/content";

const site = getSiteConfig();

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
  company: z.string().optional(),
  subject: z.string().min(3, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  honeypot: z.string().max(0).optional(),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export function ContactForm() {
  const [submitting, setSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (values: ContactFormValues) => {
    setSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = (await response.json()) as { message?: string };
      if (!response.ok) throw new Error(data.message ?? "Failed to send");
      toast.success("Message sent successfully!");
      reset();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to send message");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="grid gap-12 lg:grid-cols-2">
      <div>
        <Card className="border-border/50 bg-card/50">
          <CardContent className="p-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <input
                type="text"
                {...register("honeypot")}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" {...register("name")} className="mt-1" />
                {errors.name && (
                  <p className="text-destructive mt-1 text-xs">{errors.name.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  {...register("email")}
                  className="mt-1"
                />
                {errors.email && (
                  <p className="text-destructive mt-1 text-xs">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="company">Company</Label>
                <Input id="company" {...register("company")} className="mt-1" />
              </div>
              <div>
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" {...register("subject")} className="mt-1" />
                {errors.subject && (
                  <p className="text-destructive mt-1 text-xs">
                    {errors.subject.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  rows={5}
                  {...register("message")}
                  className="mt-1"
                />
                {errors.message && (
                  <p className="text-destructive mt-1 text-xs">
                    {errors.message.message}
                  </p>
                )}
              </div>
              <Button type="submit" disabled={submitting} className="w-full">
                {submitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-8">
        <div>
          <h2 className="text-xl font-semibold">Contact Methods</h2>
          <div className="mt-4 space-y-3">
            <p>
              <span className="text-muted-foreground">Email: </span>
              <a
                href={`mailto:${site.email}`}
                className="text-blue-400 hover:underline"
              >
                {site.email}
              </a>
            </p>
            {site.social.map((link) => (
              <p key={link.href}>
                <Link
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline"
                >
                  {link.label}
                </Link>
              </p>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold">Availability</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {site.availability.map((item) => (
              <Badge key={item.label} variant={item.active ? "default" : "secondary"}>
                {item.label}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LinkButton } from "@/components/ui/link-button";
import { Textarea } from "@/components/ui/textarea";
import {
  audienceOptions,
  budgetOptions,
  serviceOptions,
  timelineOptions,
} from "@/lib/contact/options";
import { trackLeadConversion } from "@/lib/analytics/google-ads";
import { contactSchema, type ContactFormValues } from "@/lib/contact/schema";

const selectClassName =
  "border-input focus-visible:border-ring focus-visible:ring-ring/50 dark:bg-input/30 h-8 w-full rounded-lg border bg-transparent px-2.5 text-sm outline-none focus-visible:ring-3";

const choiceClassName =
  "border-border/50 hover:border-blue-500/40 peer-checked:border-blue-500 peer-checked:bg-blue-500/10 block cursor-pointer rounded-lg border px-3 py-2.5 transition-colors";

export function ContactForm({ initialService }: { initialService?: string }) {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const defaultService = serviceOptions.find(
    (option) => option.value === initialService,
  )?.value;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: defaultService ? { service: defaultService } : undefined,
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
      if (!values.honeypot) trackLeadConversion();
      setSubmitted(true);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to send message");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <Card className="border-blue-500/20 bg-gradient-to-br from-blue-500/10 to-purple-500/5">
        <CardContent className="p-6 md:p-8">
          <h2 className="text-xl font-semibold">Brief received</h2>
          <p className="text-muted-foreground mt-2 max-w-lg text-sm leading-relaxed">
            I will reply by email. If you want to talk it through now, book a 30-minute
            intro.
          </p>
          <div className="mt-6">
            <LinkButton href="/contact#schedule">Book the intro</LinkButton>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
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
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" {...register("name")} className="mt-1" />
              {errors.name && (
                <p className="text-destructive mt-1 text-xs">{errors.name.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" {...register("email")} className="mt-1" />
              {errors.email && (
                <p className="text-destructive mt-1 text-xs">{errors.email.message}</p>
              )}
            </div>
          </div>
          <div>
            <Label htmlFor="company">Company</Label>
            <Input id="company" {...register("company")} className="mt-1" />
          </div>
          <fieldset>
            <legend className="text-sm font-medium">Who you are</legend>
            <div className="mt-2 grid gap-2 sm:grid-cols-2">
              {audienceOptions.map((option) => (
                <label key={option.value}>
                  <input
                    type="radio"
                    value={option.value}
                    className="peer sr-only"
                    {...register("audience")}
                  />
                  <span className={choiceClassName}>{option.label}</span>
                </label>
              ))}
            </div>
            {errors.audience && (
              <p className="text-destructive mt-1 text-xs">{errors.audience.message}</p>
            )}
          </fieldset>
          <fieldset>
            <legend className="text-sm font-medium">Service</legend>
            <div className="mt-2 grid gap-2">
              {serviceOptions.map((option) => (
                <label key={option.slug}>
                  <input
                    type="radio"
                    value={option.value}
                    className="peer sr-only"
                    {...register("service")}
                  />
                  <span className={choiceClassName}>
                    <span className="block text-sm font-medium">{option.label}</span>
                    <span className="text-muted-foreground mt-0.5 block text-xs">
                      {option.description}
                    </span>
                  </span>
                </label>
              ))}
            </div>
            {errors.service && (
              <p className="text-destructive mt-1 text-xs">{errors.service.message}</p>
            )}
          </fieldset>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="timeline">Timeline</Label>
              <select
                id="timeline"
                {...register("timeline")}
                className={`${selectClassName} mt-1`}
                defaultValue=""
              >
                <option value="" disabled>
                  Select
                </option>
                {timelineOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.timeline && (
                <p className="text-destructive mt-1 text-xs">
                  {errors.timeline.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="budget">Budget</Label>
              <select
                id="budget"
                {...register("budget")}
                className={`${selectClassName} mt-1`}
                defaultValue=""
              >
                <option value="" disabled>
                  Select
                </option>
                {budgetOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.budget && (
                <p className="text-destructive mt-1 text-xs">{errors.budget.message}</p>
              )}
            </div>
          </div>
          <div>
            <Label htmlFor="message">What do you need built?</Label>
            <Textarea id="message" rows={5} {...register("message")} className="mt-1" />
            {errors.message && (
              <p className="text-destructive mt-1 text-xs">{errors.message.message}</p>
            )}
          </div>
          <Button type="submit" disabled={submitting} className="w-full">
            {submitting ? "Sending..." : "Send brief"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

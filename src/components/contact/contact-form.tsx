"use client";

import { Dialog } from "@base-ui/react/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { XIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AnchorButton } from "@/components/ui/link-button";
import { Textarea } from "@/components/ui/textarea";
import { siteConfig } from "@content/site";
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

const clearedBrief = {
  name: "",
  email: "",
  company: "",
  audience: "",
  service: "",
  timeline: "",
  budget: "",
  message: "",
  honeypot: "",
} as unknown as ContactFormValues;

export function ContactForm({ initialService }: { initialService?: string }) {
  const [submitting, setSubmitting] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const defaultService = serviceOptions.find(
    (option) => option.value === initialService,
  )?.value;
  const {
    register,
    handleSubmit,
    reset,
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
      reset(clearedBrief);
      setSuccessOpen(true);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to send message");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
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
                <p className="text-destructive mt-1 text-xs">
                  {errors.audience.message}
                </p>
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
                <p className="text-destructive mt-1 text-xs">
                  {errors.service.message}
                </p>
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
                  <p className="text-destructive mt-1 text-xs">
                    {errors.budget.message}
                  </p>
                )}
              </div>
            </div>
            <div>
              <Label htmlFor="message">What do you need built?</Label>
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
              {submitting ? "Sending..." : "Send brief"}
            </Button>
          </form>
        </CardContent>
      </Card>
      <Dialog.Root open={successOpen} onOpenChange={setSuccessOpen}>
        <Dialog.Portal>
          <Dialog.Backdrop className="fixed inset-0 z-50 bg-black/60 supports-backdrop-filter:backdrop-blur-xs" />
          <Dialog.Popup className="bg-popover text-popover-foreground fixed top-1/2 left-1/2 z-50 w-[min(100%-2rem,28rem)] -translate-x-1/2 -translate-y-1/2 rounded-xl border p-6 shadow-lg">
            <Dialog.Title className="pr-8 text-xl font-semibold">
              Brief received
            </Dialog.Title>
            <Dialog.Description className="text-muted-foreground mt-2 text-sm leading-relaxed">
              I will reply by email. Follow me if you want to talk to me faster.
            </Dialog.Description>
            <div className="mt-6 flex flex-wrap gap-2">
              {siteConfig.social.map((link) => (
                <AnchorButton
                  key={link.label}
                  href={link.href}
                  variant="outline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.label}
                </AnchorButton>
              ))}
            </div>
            <Dialog.Close
              className="absolute top-3 right-3"
              render={<Button variant="ghost" size="icon-sm" aria-label="Close" />}
            >
              <XIcon />
            </Dialog.Close>
          </Dialog.Popup>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}

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
import { trackGenerateLead } from "@/lib/analytics/google-ads";
import {
  audienceOptions,
  budgetOptions,
  serviceOptions,
  timelineOptions,
} from "@/lib/contact/options";
import {
  hiringContactSchema,
  productContactSchema,
  projectContactSchema,
  type ContactIntent,
  type HiringContactValues,
  type ProductContactValues,
  type ProjectContactValues,
} from "@/lib/contact/schema";

const selectClassName =
  "border-input focus-visible:border-ring focus-visible:ring-ring/50 dark:bg-input/30 h-8 w-full rounded-lg border bg-transparent px-2.5 text-sm outline-none focus-visible:ring-3";

const choiceClassName =
  "border-border/50 hover:border-blue-500/40 peer-checked:border-blue-500 peer-checked:bg-blue-500/10 block cursor-pointer rounded-lg border px-3 py-2.5 transition-colors";

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="text-destructive mt-1 text-xs">{message}</p>;
}

function SuccessDialog({
  open,
  onOpenChange,
  title,
  description,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
}) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-50 bg-black/60 supports-backdrop-filter:backdrop-blur-xs" />
        <Dialog.Popup className="bg-popover text-popover-foreground fixed top-1/2 left-1/2 z-50 w-[min(100%-2rem,28rem)] -translate-x-1/2 -translate-y-1/2 rounded-xl border p-6 shadow-lg">
          <Dialog.Title className="pr-8 text-xl font-semibold">{title}</Dialog.Title>
          <Dialog.Description className="text-muted-foreground mt-2 text-sm leading-relaxed">
            {description}
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
  );
}

async function submitLead(values: { honeypot?: string; intent: ContactIntent }) {
  const response = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
  });
  const data = (await response.json()) as { message?: string };
  if (!response.ok) throw new Error(data.message ?? "Failed to send");
  if (!values.honeypot) trackGenerateLead(values.intent);
}

export function ContactForm({
  intent,
  initialService,
}: {
  intent: ContactIntent;
  initialService?: string;
}) {
  if (intent === "hiring") return <HiringContactForm />;
  if (intent === "product") return <ProductContactForm />;
  return <ProjectContactForm initialService={initialService} />;
}

function ProjectContactForm({ initialService }: { initialService?: string }) {
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
  } = useForm<ProjectContactValues>({
    resolver: zodResolver(projectContactSchema),
    defaultValues: {
      intent: "project",
      ...(defaultService ? { service: defaultService } : {}),
    },
  });

  const onSubmit = async (values: ProjectContactValues) => {
    setSubmitting(true);
    try {
      await submitLead(values);
      reset({
        intent: "project",
        name: "",
        email: "",
        company: "",
        audience: undefined,
        service: undefined,
        timeline: undefined,
        budget: undefined,
        message: "",
        honeypot: "",
      });
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
            <input type="hidden" value="project" {...register("intent")} />
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
                <FieldError message={errors.name?.message} />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  {...register("email")}
                  className="mt-1"
                />
                <FieldError message={errors.email?.message} />
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
              <FieldError message={errors.audience?.message} />
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
              <FieldError message={errors.service?.message} />
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
                <FieldError message={errors.timeline?.message} />
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
                <FieldError message={errors.budget?.message} />
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
              <FieldError message={errors.message?.message} />
            </div>
            <Button type="submit" disabled={submitting} className="w-full">
              {submitting ? "Sending..." : "Send brief"}
            </Button>
          </form>
        </CardContent>
      </Card>
      <SuccessDialog
        open={successOpen}
        onOpenChange={setSuccessOpen}
        title="Brief received"
        description="I will reply by email. Follow me if you want to talk to me faster."
      />
    </>
  );
}

function HiringContactForm() {
  const [submitting, setSubmitting] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<HiringContactValues>({
    resolver: zodResolver(hiringContactSchema),
    defaultValues: { intent: "hiring" },
  });

  const onSubmit = async (values: HiringContactValues) => {
    setSubmitting(true);
    try {
      await submitLead(values);
      reset({
        intent: "hiring",
        name: "",
        email: "",
        company: "",
        roleTitle: "",
        jobLink: "",
        message: "",
        honeypot: "",
      });
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
            <input type="hidden" value="hiring" {...register("intent")} />
            <input
              type="text"
              {...register("honeypot")}
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
            />
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="hiring-name">Name</Label>
                <Input id="hiring-name" {...register("name")} className="mt-1" />
                <FieldError message={errors.name?.message} />
              </div>
              <div>
                <Label htmlFor="hiring-email">Work email</Label>
                <Input
                  id="hiring-email"
                  type="email"
                  {...register("email")}
                  className="mt-1"
                />
                <FieldError message={errors.email?.message} />
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="hiring-company">Company</Label>
                <Input id="hiring-company" {...register("company")} className="mt-1" />
                <FieldError message={errors.company?.message} />
              </div>
              <div>
                <Label htmlFor="role-title">Role title</Label>
                <Input id="role-title" {...register("roleTitle")} className="mt-1" />
                <FieldError message={errors.roleTitle?.message} />
              </div>
            </div>
            <div>
              <Label htmlFor="job-link">Job description link</Label>
              <Input
                id="job-link"
                type="url"
                placeholder="https://"
                {...register("jobLink")}
                className="mt-1"
              />
              <FieldError message={errors.jobLink?.message} />
            </div>
            <div>
              <Label htmlFor="job-description">Job description</Label>
              <Textarea
                id="job-description"
                rows={6}
                placeholder="Paste the description, or leave this blank if the link above has it."
                {...register("message")}
                className="mt-1"
              />
              <FieldError message={errors.message?.message} />
            </div>
            <Button type="submit" disabled={submitting} className="w-full">
              {submitting ? "Sending..." : "Share this role"}
            </Button>
          </form>
        </CardContent>
      </Card>
      <SuccessDialog
        open={successOpen}
        onOpenChange={setSuccessOpen}
        title="Role received"
        description="I will read the description and reply by email."
      />
    </>
  );
}

function ProductContactForm() {
  const [submitting, setSubmitting] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductContactValues>({
    resolver: zodResolver(productContactSchema),
    defaultValues: { intent: "product" },
  });

  const onSubmit = async (values: ProductContactValues) => {
    setSubmitting(true);
    try {
      await submitLead(values);
      reset({
        intent: "product",
        name: "",
        email: "",
        company: "",
        message: "",
        honeypot: "",
      });
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
            <input type="hidden" value="product" {...register("intent")} />
            <input
              type="text"
              {...register("honeypot")}
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
            />
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="product-name">Name</Label>
                <Input id="product-name" {...register("name")} className="mt-1" />
                <FieldError message={errors.name?.message} />
              </div>
              <div>
                <Label htmlFor="product-email">Email</Label>
                <Input
                  id="product-email"
                  type="email"
                  {...register("email")}
                  className="mt-1"
                />
                <FieldError message={errors.email?.message} />
              </div>
            </div>
            <div>
              <Label htmlFor="product-company">Company</Label>
              <Input id="product-company" {...register("company")} className="mt-1" />
            </div>
            <div>
              <Label htmlFor="product-message">What do you want to know?</Label>
              <Textarea
                id="product-message"
                rows={5}
                {...register("message")}
                className="mt-1"
              />
              <FieldError message={errors.message?.message} />
            </div>
            <Button type="submit" disabled={submitting} className="w-full">
              {submitting ? "Sending..." : "Send message"}
            </Button>
          </form>
        </CardContent>
      </Card>
      <SuccessDialog
        open={successOpen}
        onOpenChange={setSuccessOpen}
        title="Message received"
        description="I will reply by email."
      />
    </>
  );
}

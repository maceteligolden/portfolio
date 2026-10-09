import { services } from "@content/services";

export const audienceOptions = [
  { value: "Founder", label: "Founder or small team" },
  { value: "Existing team", label: "Company with an existing product" },
] as const;

export const serviceOptions = [
  ...services.map((service) => ({
    value: service.title,
    label: service.title,
    description: service.outcome,
    slug: service.slug,
  })),
  {
    value: "Not sure yet",
    label: "Not sure yet",
    description: "We can decide the fit from the brief.",
    slug: "not-sure",
  },
];

export const timelineOptions = [
  { value: "As soon as possible", label: "As soon as possible" },
  { value: "1–3 months", label: "1–3 months" },
  { value: "3–6 months", label: "3–6 months" },
  { value: "Exploring", label: "Exploring" },
] as const;

export const budgetOptions = [
  { value: "Under £5k", label: "Under £5k" },
  { value: "£5k–£15k", label: "£5k–£15k" },
  { value: "£15k–£40k", label: "£15k–£40k" },
  { value: "£40k+", label: "£40k+" },
  { value: "Not sure yet", label: "Not sure yet" },
] as const;

export const audienceValues = audienceOptions.map((option) => option.value);
export const serviceValues = serviceOptions.map((option) => option.value) as [
  string,
  ...string[],
];
export const timelineValues = timelineOptions.map((option) => option.value);
export const budgetValues = budgetOptions.map((option) => option.value);

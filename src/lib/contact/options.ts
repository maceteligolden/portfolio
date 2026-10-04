export const audienceOptions = [
  { value: "Founder", label: "Founder or small team" },
  { value: "Existing team", label: "Company with an existing product" },
] as const;

export const serviceOptions = [
  { value: "AI products and agents", label: "AI products and agents" },
  { value: "Backend systems and APIs", label: "Backend systems and APIs" },
  { value: "MVPs and product builds", label: "MVPs and product builds" },
  { value: "Not sure yet", label: "Not sure yet" },
] as const;

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
export const serviceValues = serviceOptions.map((option) => option.value);
export const timelineValues = timelineOptions.map((option) => option.value);
export const budgetValues = budgetOptions.map((option) => option.value);

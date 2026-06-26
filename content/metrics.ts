export interface MetricInterface {
  value: string;
  label: string;
  suffix?: string;
}

export const metrics: MetricInterface[] = [
  { value: "10", suffix: "+", label: "Production Applications Built" },
  { value: "Millions", label: "API Requests Processed" },
  { value: "Multiple", label: "AI Systems Deployed to Production" },
  { value: "5", suffix: "+", label: "Startup Products Shipped" },
];

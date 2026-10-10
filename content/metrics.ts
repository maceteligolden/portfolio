export interface MetricInterface {
  value: string;
  label: string;
  suffix?: string;
}

/** Unsupported counts were removed. Do not restore a figure without a source. */
export const metrics: MetricInterface[] = [];

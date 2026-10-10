import type { ContactIntent } from "@/lib/contact/schema";

const LEAD_CONVERSION_SEND_TO = "AW-18493923457/vcOLCN2z2pAdEIHBy_JE";

type Gtag = (...args: unknown[]) => void;

declare global {
  interface Window {
    gtag?: Gtag;
  }
}

function gtagReady(): Gtag | undefined {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  return window.gtag;
}

export function trackCtaClick(intent: ContactIntent, location: string) {
  const gtag = gtagReady();
  if (!gtag) return;
  gtag("event", "cta_click", { intent, location });
}

export function trackGenerateLead(intent: ContactIntent) {
  const gtag = gtagReady();
  if (!gtag) return;
  gtag("event", "generate_lead", { intent });
  if (intent === "project") {
    gtag("event", "conversion", { send_to: LEAD_CONVERSION_SEND_TO });
  }
}

export function trackLeadConversion() {
  trackGenerateLead("project");
}

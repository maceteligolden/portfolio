const LEAD_CONVERSION_SEND_TO = "AW-18493923457/vcOLCN2z2pAdEIHBy_JE";

type Gtag = (...args: unknown[]) => void;

declare global {
  interface Window {
    gtag?: Gtag;
  }
}

export function trackLeadConversion() {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", "conversion", { send_to: LEAD_CONVERSION_SEND_TO });
}

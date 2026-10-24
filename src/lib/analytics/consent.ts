const STORAGE_KEY = "portfolio-consent";
const GA_ID = "G-SYYJK7SCWV";
const ADS_ID = "AW-18493923457";

export type ConsentChoice = "accepted" | "declined";

declare global {
  interface Window {
    dataLayer?: unknown[];
    __analyticsLoaded?: boolean;
  }
}

let forceOpen = false;
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((listener) => listener());
}

export function readConsent(): ConsentChoice | null {
  if (typeof window === "undefined") return null;
  const value = window.localStorage.getItem(STORAGE_KEY);
  if (value === "accepted" || value === "declined") return value;
  return null;
}

export function writeConsent(choice: ConsentChoice) {
  window.localStorage.setItem(STORAGE_KEY, choice);
  forceOpen = false;
  emit();
}

export function openCookieChoice() {
  forceOpen = true;
  emit();
}

export function closeCookieChoice() {
  if (!forceOpen) return;
  forceOpen = false;
  emit();
}

export function subscribeConsent(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function consentSnapshot() {
  const choice = readConsent() ?? "unset";
  return `${choice}:${forceOpen ? "open" : "closed"}`;
}

export function loadAnalytics() {
  if (typeof window === "undefined" || window.__analyticsLoaded) return;
  window.__analyticsLoaded = true;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer?.push(args);
  };
  window.gtag("js", new Date());
  window.gtag("config", GA_ID);
  window.gtag("config", ADS_ID);

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);
}

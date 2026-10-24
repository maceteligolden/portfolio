"use client";

import Link from "next/link";
import { useEffect, useRef, useSyncExternalStore } from "react";

import { Button } from "@/components/ui/button";
import {
  closeCookieChoice,
  consentSnapshot,
  loadAnalytics,
  openCookieChoice,
  readConsent,
  subscribeConsent,
  writeConsent,
  type ConsentChoice,
} from "@/lib/analytics/consent";

export function CookieSettingsButton() {
  return (
    <button type="button" className="hover:text-white" onClick={openCookieChoice}>
      Cookies
    </button>
  );
}

export function CookieBanner() {
  const snapshot = useSyncExternalStore(
    subscribeConsent,
    consentSnapshot,
    () => "pending:closed",
  );
  const [choice, panel] = snapshot.split(":");
  const stored = choice === "accepted" || choice === "declined";
  const visible = choice === "unset" || panel === "open";
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (readConsent() === "accepted") loadAnalytics();
  }, []);

  useEffect(() => {
    if (!visible) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape" || !readConsent()) return;
      closeCookieChoice();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [visible]);

  if (!visible) return null;

  const choose = (next: ConsentChoice) => {
    writeConsent(next);
    if (next === "accepted") loadAnalytics();
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-6"
      onClick={() => {
        if (stored) closeCookieChoice();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cookie-gate-title"
        tabIndex={-1}
        className="w-full max-w-lg border border-black bg-white p-6 outline-none"
        onClick={(event) => event.stopPropagation()}
      >
        <h2 id="cookie-gate-title" className="text-2xl font-normal">
          Cookies
        </h2>
        <p className="mt-4 text-sm leading-relaxed">
          Accepting lets Google Analytics and Google Ads record how you use this site.
          The contact form and a booked call only happen when you send them. Read the{" "}
          <Link href="/privacy" className="underline underline-offset-4">
            Privacy
          </Link>{" "}
          and{" "}
          <Link href="/terms" className="underline underline-offset-4">
            Terms
          </Link>
          .
        </p>
        <div className="mt-6 flex gap-2">
          <Button type="button" variant="outline" onClick={() => choose("declined")}>
            Decline
          </Button>
          <Button type="button" onClick={() => choose("accepted")}>
            Accept
          </Button>
        </div>
      </div>
    </div>
  );
}

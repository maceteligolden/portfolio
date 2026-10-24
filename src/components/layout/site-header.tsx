"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

import { TrackedLinkButton } from "@/components/analytics/tracked-link-button";
import { getSiteConfig } from "@/lib/content";
import { cn } from "@/lib/utils";

const site = getSiteConfig();

function isNavActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-40 bg-white">
      <div className="max-w-padding flex h-16 items-center justify-between">
        <Link href="/" className="text-lg leading-none font-normal tracking-tight">
          Golden
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm transition-opacity hover:opacity-60",
                isNavActive(pathname, item.href) ? "text-black" : "text-black/70",
              )}
            >
              {item.label}
            </Link>
          ))}
          <TrackedLinkButton
            href="/schedule"
            intent="project"
            location="header-schedule"
            size="sm"
            className="bg-black text-white hover:bg-black/80"
          >
            Schedule a call
          </TrackedLinkButton>
        </nav>

        <button
          type="button"
          className="text-sm md:hidden"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen(true)}
        >
          Menu
        </button>
      </div>

      {open ? (
        <>
          <motion.button
            type="button"
            aria-label="Close menu"
            className="fixed inset-0 z-50 bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
            onClick={() => setOpen(false)}
          />
          <motion.div
            className="fixed inset-y-0 right-0 z-50 flex w-full flex-col bg-black px-8 py-8 text-white md:w-1/2"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              type="button"
              className="self-end text-sm tracking-[0.02em] uppercase"
              onClick={() => setOpen(false)}
            >
              Close
            </button>
            <nav className="mt-16 flex flex-col gap-6">
              {site.nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="text-3xl leading-none font-normal tracking-[0.02em] uppercase"
                >
                  {item.label}
                </Link>
              ))}
              <TrackedLinkButton
                href="/schedule"
                intent="project"
                location="header-schedule-mobile"
                className="mt-4 w-fit border border-white bg-white text-black hover:bg-white/90"
                onClick={() => setOpen(false)}
              >
                Schedule a call
              </TrackedLinkButton>
            </nav>
          </motion.div>
        </>
      ) : null}
    </header>
  );
}

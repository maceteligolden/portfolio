"use client";

import type { ReactNode } from "react";

import { AnchorButton, LinkButton } from "@/components/ui/link-button";
import { trackCtaClick } from "@/lib/analytics/google-ads";
import type { ContactIntent } from "@/lib/contact/schema";

interface TrackedLinkButtonProps {
  href: string;
  intent: ContactIntent;
  location: string;
  children: ReactNode;
  variant?: "default" | "outline" | "secondary" | "ghost" | "destructive" | "link";
  size?: "default" | "xs" | "sm" | "lg" | "icon" | "icon-xs" | "icon-sm" | "icon-lg";
  className?: string;
}

export function TrackedLinkButton({
  href,
  intent,
  location,
  children,
  variant,
  size,
  className,
}: TrackedLinkButtonProps) {
  return (
    <LinkButton
      href={href}
      variant={variant}
      size={size}
      className={className}
      onClick={() => trackCtaClick(intent, location)}
    >
      {children}
    </LinkButton>
  );
}

interface TrackedAnchorButtonProps extends TrackedLinkButtonProps {
  target?: string;
  rel?: string;
  download?: boolean;
}

export function TrackedAnchorButton({
  href,
  intent,
  location,
  children,
  variant,
  size,
  className,
  target,
  rel,
  download,
}: TrackedAnchorButtonProps) {
  return (
    <AnchorButton
      href={href}
      variant={variant}
      size={size}
      className={className}
      target={target}
      rel={rel}
      download={download}
      onClick={() => trackCtaClick(intent, location)}
    >
      {children}
    </AnchorButton>
  );
}

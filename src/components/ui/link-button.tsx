import Link from "next/link";
import type { ReactNode } from "react";

import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { VariantProps } from "class-variance-authority";

type ButtonVariantProps = VariantProps<typeof buttonVariants>;

interface LinkButtonProps extends ButtonVariantProps {
  href: string;
  children: ReactNode;
  className?: string;
}

export function LinkButton({
  href,
  children,
  variant,
  size,
  className,
}: LinkButtonProps) {
  return (
    <Button
      variant={variant}
      size={size}
      className={className}
      nativeButton={false}
      render={<Link href={href} />}
    >
      {children}
    </Button>
  );
}

interface AnchorButtonProps extends ButtonVariantProps {
  href: string;
  children: ReactNode;
  className?: string;
  target?: string;
  rel?: string;
  download?: boolean;
}

export function AnchorButton({
  href,
  children,
  variant,
  size,
  className,
  target,
  rel,
  download,
}: AnchorButtonProps) {
  return (
    <Button
      variant={variant}
      size={size}
      className={className}
      nativeButton={false}
      render={<a href={href} target={target} rel={rel} download={download} />}
    >
      {children}
    </Button>
  );
}

export function buttonLinkClassName(
  props?: ButtonVariantProps & { className?: string },
): string {
  const { className, ...variants } = props ?? {};
  return cn(buttonVariants(variants), className);
}

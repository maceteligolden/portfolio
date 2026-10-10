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
  onClick?: () => void;
}

export function LinkButton({
  href,
  children,
  variant,
  size,
  className,
  onClick,
}: LinkButtonProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(buttonVariants({ variant, size }), className)}
    >
      {children}
    </Link>
  );
}

interface AnchorButtonProps extends ButtonVariantProps {
  href: string;
  children: ReactNode;
  className?: string;
  target?: string;
  rel?: string;
  download?: boolean;
  onClick?: () => void;
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
  onClick,
}: AnchorButtonProps) {
  return (
    <Button
      variant={variant}
      size={size}
      className={className}
      nativeButton={false}
      render={
        <a
          href={href}
          target={target}
          rel={rel}
          download={download}
          onClick={onClick}
        />
      }
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

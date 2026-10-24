import { cn } from "@/lib/utils";

export function SquareLabel({
  children,
  className,
  light = false,
}: {
  children: React.ReactNode;
  className?: string;
  light?: boolean;
}) {
  return (
    <p
      className={cn(
        "flex items-center gap-2 text-sm font-bold tracking-[0.02em] uppercase",
        light ? "text-white" : "text-black",
        className,
      )}
    >
      <span
        aria-hidden
        className={cn("inline-block size-3 shrink-0", light ? "bg-white" : "bg-black")}
      />
      {children}
    </p>
  );
}

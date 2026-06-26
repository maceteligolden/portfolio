import { cn } from "@/lib/utils";

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "article" | "section";
}

export function PageContainer({
  children,
  className,
  as: Tag = "div",
}: PageContainerProps) {
  return <Tag className={cn("max-w-padding py-16", className)}>{children}</Tag>;
}

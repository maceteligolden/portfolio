import type { ReactNode } from "react";

interface PageCtaBandProps {
  title: string;
  description: string;
  children: ReactNode;
}

export function PageCtaBand({ title, description, children }: PageCtaBandProps) {
  return (
    <section className="border-border/50 mt-16 rounded-xl border bg-gradient-to-br from-blue-500/10 to-purple-500/5 p-8 md:p-10">
      <h2 className="text-2xl font-semibold">{title}</h2>
      <p className="text-muted-foreground mt-3 max-w-xl">{description}</p>
      <div className="mt-6 flex flex-wrap gap-3">{children}</div>
    </section>
  );
}

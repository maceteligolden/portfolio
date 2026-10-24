import type { ReactNode } from "react";

interface PageCtaBandProps {
  title: string;
  description: string;
  children: ReactNode;
}

export function PageCtaBand({ title, description, children }: PageCtaBandProps) {
  return (
    <section className="mt-16 border-t border-black py-10">
      <h2 className="text-3xl leading-[1.1] font-normal md:text-4xl">{title}</h2>
      <p className="text-muted-foreground mt-3 max-w-xl">{description}</p>
      <div className="mt-6 flex flex-wrap gap-3">{children}</div>
    </section>
  );
}

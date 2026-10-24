import { PageContainer } from "@/components/layout/page-container";
import { SquareLabel } from "@/components/layout/square-label";
import type { LegalSection } from "@content/legal";

export function LegalDocument({
  label,
  title,
  updated,
  intro,
  sections,
}: {
  label: string;
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
}) {
  return (
    <PageContainer>
      <SquareLabel>{label}</SquareLabel>
      <h1 className="mt-4 max-w-3xl text-4xl leading-[1.1] font-normal tracking-tight md:text-5xl">
        {title}
      </h1>
      <p className="text-muted-foreground mt-4 text-sm">Updated {updated}</p>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed">{intro}</p>
      <div className="mt-12 max-w-2xl space-y-10">
        {sections.map((section) => (
          <section key={section.heading}>
            <h2 className="text-2xl font-normal">{section.heading}</h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph} className="mt-4 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </section>
        ))}
      </div>
    </PageContainer>
  );
}

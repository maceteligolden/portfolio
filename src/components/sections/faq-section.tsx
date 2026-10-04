import type { FaqInterface } from "@content/faqs";

import { SectionHeading } from "@/components/layout/section-heading";

interface FaqSectionProps {
  faqs: FaqInterface[];
  label?: string;
  title?: string;
}

export function FaqSection({
  faqs,
  label = "Questions",
  title = "Before you write",
}: FaqSectionProps) {
  return (
    <section className="py-20">
      <div className="max-w-padding">
        <SectionHeading label={label} title={title} />
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {faqs.map((faq) => (
            <div key={faq.question}>
              <h3 className="text-lg font-semibold">{faq.question}</h3>
              <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

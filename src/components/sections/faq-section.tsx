import type { FaqInterface } from "@content/faqs";

import { SectionHeading } from "@/components/layout/section-heading";

interface FaqSectionProps {
  faqs: FaqInterface[];
  label?: string;
  title?: string;
  embedded?: boolean;
}

export function FaqSection({
  faqs,
  label = "Questions",
  title = "Before you write",
  embedded = false,
}: FaqSectionProps) {
  const body = (
    <>
      <SectionHeading label={label} title={title} />
      <div className={embedded ? "mt-8 space-y-8" : "mt-12 space-y-8"}>
        {faqs.map((faq) => (
          <section key={faq.question}>
            <h3 className="text-lg font-semibold">{faq.question}</h3>
            <p className="text-muted-foreground mt-2 max-w-3xl leading-relaxed">
              {faq.answer}
            </p>
          </section>
        ))}
      </div>
    </>
  );

  if (embedded) {
    return <div className="mt-16">{body}</div>;
  }

  return (
    <section className="py-20">
      <div className="max-w-padding">{body}</div>
    </section>
  );
}

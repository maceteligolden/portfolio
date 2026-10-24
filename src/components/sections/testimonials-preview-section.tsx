import { FadeIn } from "@/components/layout/fade-in";
import { SquareLabel } from "@/components/layout/square-label";
import { getTestimonials } from "@/lib/content";

const shortQuotes: Record<string, string> = {
  "kadisi-mitee": "He is especially knowledgeable in AI tooling and implementation.",
  "demilade-adeyemo":
    "His work ethic and customer-centric approach to problem solving is second to none.",
};

const testimonials = ["ewa-adeyemo", "kadisi-mitee", "demilade-adeyemo"].flatMap(
  (id) => {
    const item = getTestimonials().find((testimonial) => testimonial.id === id);
    if (!item) return [];
    return [{ ...item, quote: shortQuotes[id] ?? item.quote }];
  },
);

export function TestimonialsPreviewSection() {
  return (
    <section className="bg-white py-20 md:py-28" aria-label="Testimonials">
      <div className="max-w-padding">
        <FadeIn>
          <SquareLabel>Proof</SquareLabel>
          <h2 className="mt-4 text-4xl leading-[1.1] font-normal md:text-5xl">
            What people say
          </h2>
          <ul className="mt-12 border-t border-black">
            {testimonials.map((testimonial) => (
              <li key={testimonial.id} className="border-b border-black py-8 md:py-10">
                <p className="max-w-3xl text-2xl leading-snug font-normal md:text-3xl">
                  {testimonial.quote}
                </p>
                <p className="mt-6 text-sm font-bold">{testimonial.name}</p>
                <p className="text-sm text-black/60">
                  {[testimonial.position, testimonial.company]
                    .filter(Boolean)
                    .join(", ")}
                </p>
              </li>
            ))}
          </ul>
        </FadeIn>
      </div>
    </section>
  );
}

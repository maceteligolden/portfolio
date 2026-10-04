import { SectionHeading } from "@/components/layout/section-heading";
import { ServiceCards } from "@/components/services/service-cards";

export function ServicesSection() {
  return (
    <section className="py-20">
      <div className="max-w-padding">
        <SectionHeading label="Services" title="What I take on" />
        <div className="mt-12">
          <ServiceCards />
        </div>
      </div>
    </section>
  );
}

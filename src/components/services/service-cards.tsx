import Link from "next/link";

import { ServiceIllustration } from "@/components/services/service-illustration";
import { getHubServices } from "@/lib/content";

export function ServiceCards() {
  const services = getHubServices();

  return (
    <div className="flex flex-col gap-8">
      {services.map((service) => (
        <article
          key={service.slug}
          className="border-border/50 bg-card/50 grid gap-8 rounded-xl border p-6 md:p-10 lg:grid-cols-[16rem_1fr] lg:items-center"
        >
          <ServiceIllustration slug={service.slug} />
          <div>
            <h2 className="text-2xl font-semibold">{service.title}</h2>
            <p className="text-muted-foreground mt-3 max-w-2xl text-lg leading-relaxed">
              {service.outcome}
            </p>
            <p className="mt-3 max-w-2xl leading-relaxed">{service.audience}</p>
            <h3 className="mt-6 text-sm font-medium tracking-wider text-blue-400 uppercase">
              What you get
            </h3>
            <ul className="text-muted-foreground mt-3 max-w-2xl space-y-2">
              {service.includes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <Link
              href={`/services/${service.slug}`}
              className="mt-6 inline-block text-sm text-blue-400 hover:underline"
            >
              See how this works
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}

import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getServices } from "@/lib/content";

export function ServiceCards() {
  const services = getServices();

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {services.map((service) => (
        <Link
          key={service.slug}
          href={`/services/${service.slug}`}
          className="group block h-full"
        >
          <Card className="border-border/50 bg-card/50 h-full transition-colors group-hover:border-blue-500/30 group-hover:shadow-lg group-hover:shadow-blue-500/5">
            <CardHeader>
              <CardTitle className="text-xl">{service.title}</CardTitle>
              <p className="text-muted-foreground text-sm">{service.outcome}</p>
            </CardHeader>
            <CardContent>
              <p className="text-sm">{service.audience}</p>
              <p className="mt-4 text-sm text-blue-400">View service</p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}

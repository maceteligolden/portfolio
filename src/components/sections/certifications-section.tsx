import { Card, CardContent } from "@/components/ui/card";
import { getCertifications } from "@/lib/content";

const certifications = getCertifications();

export function CertificationsSection() {
  return (
    <section className="mt-16">
      <h2 className="text-2xl font-bold">Certifications</h2>
      <p className="text-muted-foreground mt-2 max-w-2xl text-sm">
        Current AWS certifications. Badge images are not on this site.
      </p>
      <div className="mt-8 grid max-w-3xl gap-6 sm:grid-cols-2">
        {certifications.map((cert) => (
          <Card key={cert.name} className="border-border/50 bg-card/50">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold">{cert.name}</h3>
              <p className="text-muted-foreground mt-1 text-sm">{cert.issuer}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

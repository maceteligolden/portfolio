import { Card, CardContent } from "@/components/ui/card";

export interface ArchitectureDecisionsInterface {
  summary: string;
  pattern: string;
  hosting: string;
  dataLayer: string;
  integrations: string;
  diagram?: string;
  highlights: { label: string; value: string }[];
}

interface ProjectArchitectureSectionProps {
  architecture: ArchitectureDecisionsInterface;
}

export function ProjectArchitectureSection({
  architecture,
}: ProjectArchitectureSectionProps) {
  return (
    <section>
      <h2 className="text-xl font-semibold">Architecture &amp; Technical Decisions</h2>
      <p className="text-muted-foreground mt-3 leading-relaxed">
        {architecture.summary}
      </p>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {architecture.highlights.map((item) => (
          <Card key={item.label} className="border-border/50 bg-card/50">
            <CardContent className="p-4">
              <p className="text-xs font-medium tracking-wide text-blue-400 uppercase">
                {item.label}
              </p>
              <p className="mt-1 text-sm font-medium">{item.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <dl className="border-border/50 bg-card/30 mt-6 space-y-4 rounded-xl border p-6">
        <div>
          <dt className="text-sm font-semibold">Architecture pattern</dt>
          <dd className="text-muted-foreground mt-1 text-sm">{architecture.pattern}</dd>
        </div>
        <div>
          <dt className="text-sm font-semibold">Hosting &amp; deployment</dt>
          <dd className="text-muted-foreground mt-1 text-sm">{architecture.hosting}</dd>
        </div>
        <div>
          <dt className="text-sm font-semibold">Data layer</dt>
          <dd className="text-muted-foreground mt-1 text-sm">
            {architecture.dataLayer}
          </dd>
        </div>
        <div>
          <dt className="text-sm font-semibold">Integrations &amp; services</dt>
          <dd className="text-muted-foreground mt-1 text-sm">
            {architecture.integrations}
          </dd>
        </div>
      </dl>

      {architecture.diagram && (
        <pre className="border-border/50 bg-card/50 text-muted-foreground mt-6 overflow-x-auto rounded-lg border p-4 text-xs leading-relaxed">
          {architecture.diagram}
        </pre>
      )}
    </section>
  );
}

import { PageContainer } from "@/components/layout/page-container";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  getAboutContent,
  getPhilosophyItems,
  getSiteConfig,
  getTechStack,
} from "@/lib/content";

const site = getSiteConfig();
const about = getAboutContent();
const philosophy = getPhilosophyItems();
const tech = getTechStack();

export const metadata = {
  title: `About | ${site.name}`,
  description: about.intro,
};

export default function AboutPage() {
  return (
    <PageContainer>
      <p className="text-sm font-medium tracking-widest text-blue-400 uppercase">
        About
      </p>
      <h1 className="mt-2 text-4xl font-bold tracking-tight md:text-5xl">
        {site.name}
      </h1>
      <p className="text-muted-foreground mt-6 max-w-3xl text-lg">{about.intro}</p>
      <p className="text-muted-foreground mt-4 max-w-3xl">{about.background}</p>
      <p className="text-muted-foreground mt-4 max-w-3xl">{about.focus}</p>

      <Separator className="my-16" />

      <h2 className="text-2xl font-bold">Engineering Philosophy</h2>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {philosophy.map((item) => (
          <Card key={item.title} className="border-border/50 bg-card/50">
            <CardContent className="p-6">
              <h3 className="font-semibold">{item.title}</h3>
              <p className="text-muted-foreground mt-2 text-sm">{item.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Separator className="my-16" />

      <h2 className="text-2xl font-bold">Technology Stack</h2>
      <div className="mt-8 grid gap-8 md:grid-cols-2">
        {Object.entries(tech).map(([category, items]) => (
          <div key={category}>
            <h3 className="mb-3 text-sm font-medium tracking-wider text-blue-400 uppercase">
              {category}
            </h3>
            <div className="flex flex-wrap gap-2">
              {items.map((item) => (
                <Badge key={item} variant="secondary">
                  {item}
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </div>
    </PageContainer>
  );
}

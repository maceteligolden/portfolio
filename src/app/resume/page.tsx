import { Download } from "lucide-react";

import { PageContainer } from "@/components/layout/page-container";
import { Badge } from "@/components/ui/badge";
import { AnchorButton } from "@/components/ui/link-button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getResumeContent, getSiteConfig } from "@/lib/content";

const site = getSiteConfig();
const resume = getResumeContent();

export const metadata = {
  title: `Resume | ${site.name}`,
  description: resume.summary,
};

export default function ResumePage() {
  return (
    <PageContainer>
      <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-sm font-medium tracking-widest text-blue-400 uppercase">
            Resume
          </p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight">{site.name}</h1>
          <p className="text-muted-foreground mt-2 text-lg">{site.title}</p>
        </div>
        <AnchorButton href={site.resumePath} size="lg" download>
          <Download className="mr-2 size-4" />
          Download Resume
        </AnchorButton>
      </div>

      <Separator className="my-12" />

      <section>
        <h2 className="text-xl font-semibold">Professional Summary</h2>
        <p className="text-muted-foreground mt-3 max-w-3xl">{resume.summary}</p>
      </section>

      <Separator className="my-12" />

      <section>
        <h2 className="text-xl font-semibold">Skills</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {Object.entries(resume.skills).map(([category, skills]) => (
            <Card key={category} className="border-border/50 bg-card/50">
              <CardContent className="p-6">
                <h3 className="mb-3 text-sm font-medium tracking-wider text-blue-400 uppercase">
                  {category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Separator className="my-12" />

      <section>
        <h2 className="text-xl font-semibold">Experience</h2>
        <div className="mt-6 space-y-6">
          {resume.experience.map((exp) => (
            <Card key={exp.company} className="border-border/50 bg-card/50">
              <CardContent className="p-6">
                <div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
                  <h3 className="font-semibold">{exp.role}</h3>
                  <span className="text-muted-foreground text-sm">{exp.period}</span>
                </div>
                <p className="mt-1 text-sm text-blue-400">{exp.company}</p>
                <p className="text-muted-foreground mt-3 text-sm">{exp.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Separator className="my-12" />

      <section>
        <h2 className="text-xl font-semibold">Education</h2>
        <div className="mt-6 space-y-4">
          {resume.education.map((edu) => (
            <div key={edu.institution}>
              <p className="font-semibold">{edu.degree}</p>
              <p className="text-muted-foreground text-sm">
                {edu.institution} · {edu.period}
              </p>
            </div>
          ))}
        </div>
      </section>

      {resume.certifications.length > 0 && (
        <>
          <Separator className="my-12" />
          <section>
            <h2 className="text-xl font-semibold">Certifications</h2>
            <ul className="text-muted-foreground mt-4 list-inside list-disc">
              {resume.certifications.map((cert) => (
                <li key={cert}>{cert}</li>
              ))}
            </ul>
          </section>
        </>
      )}

      {resume.awards.length > 0 && (
        <>
          <Separator className="my-12" />
          <section>
            <h2 className="text-xl font-semibold">Awards</h2>
            <ul className="text-muted-foreground mt-4 list-inside list-disc">
              {resume.awards.map((award) => (
                <li key={award}>{award}</li>
              ))}
            </ul>
          </section>
        </>
      )}
    </PageContainer>
  );
}

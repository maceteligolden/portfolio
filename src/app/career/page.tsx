import {
  TrackedAnchorButton,
  TrackedLinkButton,
} from "@/components/analytics/tracked-link-button";
import { PageContainer } from "@/components/layout/page-container";
import { CertificationsSection } from "@/components/sections/certifications-section";
import { FaqSection } from "@/components/sections/faq-section";
import { PageCtaBand } from "@/components/sections/page-cta-band";
import { TestimonialList } from "@/components/testimonials/testimonial-list";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  getCareerContent,
  getCareerEducation,
  getCareerExperience,
  getCareerFaqs,
  getCareerRoles,
  getCareerStack,
  getRecruiterTestimonials,
  getSiteConfig,
} from "@/lib/content";
import { getCareerPersonJsonLd, getFaqJsonLd } from "@/lib/seo/json-ld";

const site = getSiteConfig();
const career = getCareerContent();
const roles = getCareerRoles();
const experience = getCareerExperience();
const education = getCareerEducation();
const faqs = getCareerFaqs();
const quotes = getRecruiterTestimonials();
const tech = getCareerStack();
const linkedIn = site.social.find((item) => item.label === "LinkedIn");

export const metadata = {
  title: career.seoTitle,
  description: career.metaDescription,
};

export default function CareerPage() {
  const personJsonLd = getCareerPersonJsonLd();
  const faqJsonLd = getFaqJsonLd(faqs);

  return (
    <PageContainer>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <p className="text-sm font-medium tracking-widest text-blue-400 uppercase">
        For recruiters
      </p>
      <h1 className="mt-2 max-w-3xl text-4xl font-bold tracking-tight md:text-5xl">
        {career.h1}
      </h1>
      <p className="text-muted-foreground mt-6 max-w-3xl text-lg leading-relaxed">
        {career.letter[0]}
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <TrackedLinkButton
          href="/contact?intent=hiring"
          intent="hiring"
          location="career"
          size="lg"
        >
          Share a job description
        </TrackedLinkButton>
        <TrackedLinkButton
          href="/contact?intent=hiring#schedule"
          intent="hiring"
          location="career-schedule"
          variant="outline"
          size="lg"
        >
          Schedule a call
        </TrackedLinkButton>
        {linkedIn ? (
          <TrackedAnchorButton
            href={linkedIn.href}
            intent="hiring"
            location="career-linkedin"
            variant="outline"
            size="lg"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </TrackedAnchorButton>
        ) : null}
      </div>
      <div className="mt-6 max-w-3xl space-y-4">
        {career.letter.slice(1).map((paragraph) => (
          <p key={paragraph} className="text-muted-foreground text-lg leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>

      <h2 className="mt-16 text-2xl font-bold">Experience</h2>
      <div className="mt-8 grid gap-6">
        {experience.map((item) => (
          <Card key={item.company} className="border-border/50 bg-card/50">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold">{item.role}</h3>
              <p className="text-muted-foreground mt-1 text-sm">{item.company}</p>
              <p className="mt-4 leading-relaxed">{item.summary}</p>
              <p className="text-muted-foreground mt-3 leading-relaxed">
                {item.detail}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <h2 className="mt-16 text-2xl font-bold">Education</h2>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {education.map((item) => (
          <Card key={item.degree} className="border-border/50 bg-card/50">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold">{item.degree}</h3>
              {item.institution ? (
                <p className="text-muted-foreground mt-1 text-sm">{item.institution}</p>
              ) : null}
              <p className="text-muted-foreground mt-2 text-sm">{item.period}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <h2 className="mt-16 text-2xl font-bold">Roles I want</h2>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {roles.map((role) => (
          <Card key={role.title} className="border-border/50 bg-card/50">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold">{role.title}</h3>
              <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                {role.detail}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <h2 className="mt-16 text-2xl font-bold">How I build</h2>
      <p className="text-muted-foreground mt-3 max-w-3xl">{career.stackNote}</p>
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

      <CertificationsSection />

      <h2 className="mt-16 text-2xl font-bold">People I have worked with</h2>
      <div className="mt-8">
        <TestimonialList testimonials={quotes} />
      </div>

      <FaqSection embedded faqs={faqs} title="What you may want to know" />
      <PageCtaBand
        title="If the role fits, send it"
        description="Share the job description, or book a 30-minute call. I read every one and reply by email."
      >
        <TrackedLinkButton
          href="/contact?intent=hiring"
          intent="hiring"
          location="career-close"
          size="lg"
        >
          Share a job description
        </TrackedLinkButton>
        <TrackedLinkButton
          href="/contact?intent=hiring#schedule"
          intent="hiring"
          location="career-close-schedule"
          variant="outline"
          size="lg"
        >
          Schedule a call
        </TrackedLinkButton>
      </PageCtaBand>
    </PageContainer>
  );
}

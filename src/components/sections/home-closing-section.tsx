import { TrackedLinkButton } from "@/components/analytics/tracked-link-button";
import { FadeIn } from "@/components/layout/fade-in";

export function HomeClosingSection() {
  return (
    <section className="bg-white py-24 md:py-32">
      <div className="max-w-padding">
        <FadeIn>
          <h2 className="max-w-3xl text-4xl leading-[1.1] font-normal md:text-6xl">
            If this is the work, start here
          </h2>
          <p className="mt-6 max-w-xl text-lg">
            Schedule a call, or send a short note. I read every one and reply by email.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <TrackedLinkButton
              href="/schedule"
              intent="project"
              location="home-close-schedule"
              size="lg"
              className="h-12 bg-black px-6 text-white hover:bg-black/80"
            >
              Schedule a call
            </TrackedLinkButton>
            <TrackedLinkButton
              href="/contact?intent=project"
              intent="project"
              location="home-close-form"
              variant="outline"
              size="lg"
              className="h-12 border-black px-6 text-black hover:bg-black hover:text-white"
            >
              Send a note
            </TrackedLinkButton>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

import Image from "next/image";
import Link from "next/link";

import { FadeIn } from "@/components/layout/fade-in";
import { SquareLabel } from "@/components/layout/square-label";
import { getProjectBySlug } from "@/lib/content";

const projects = ["bloggr", "supply-chain-platform"]
  .map((slug) => getProjectBySlug(slug))
  .filter((project) => project !== undefined);

export function FeaturedProjectsSection() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="max-w-padding">
        <FadeIn>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <SquareLabel>Work</SquareLabel>
              <h2 className="mt-4 max-w-3xl text-4xl leading-[1.1] font-normal md:text-5xl">
                Systems I have shipped
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-relaxed">
                Bloggr keeps a business profile and uses it before it writes. The
                supply-chain platform is a system a client at Maturis GmbH used. They
                are the record of shipped work, not a signup for the chatbot.
              </p>
            </div>
            <Link href="/projects" className="text-sm underline underline-offset-4">
              All work
            </Link>
          </div>
        </FadeIn>
      </div>
      <div className="mt-12 flex flex-col">
        {projects.map((project) => {
          const isLogo = project.image.endsWith(".svg");
          const lightMark = project.image.includes("white");
          return (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="group relative block"
            >
              <div
                className={
                  lightMark
                    ? "relative aspect-[335/418] overflow-hidden bg-black md:aspect-[1440/607]"
                    : "relative aspect-[335/418] overflow-hidden bg-neutral-100 md:aspect-[1440/607]"
                }
              >
                <Image
                  src={project.image}
                  alt={project.seoTitle}
                  fill
                  className={
                    isLogo
                      ? "object-contain p-16 transition duration-700 group-hover:scale-110 md:p-24"
                      : "object-cover transition duration-700 group-hover:scale-110"
                  }
                />
              </div>
              <div className="absolute bottom-6 left-6 max-w-sm bg-white px-5 py-4 md:bottom-10 md:left-10">
                <p className="text-sm font-bold tracking-[0.02em] uppercase">
                  {project.title}
                </p>
                <p className="mt-1 text-sm leading-relaxed">{project.cardProblem}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

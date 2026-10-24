import type { ComponentType } from "react";
import Link from "next/link";

import { FadeIn } from "@/components/layout/fade-in";
import { SquareLabel } from "@/components/layout/square-label";
import { ChatbotScene } from "@/components/offers/chatbot-scene";
import { WorkflowScene } from "@/components/offers/workflow-scene";
import { getSiteConfig } from "@/lib/content";

const site = getSiteConfig();

const scenes: Record<string, ComponentType> = {
  "/services/ai-product-development": ChatbotScene,
  "/services/workflow-automation": WorkflowScene,
};

export function OffersSection() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="max-w-padding">
        <FadeIn>
          <div className="md:grid md:grid-cols-12 md:gap-x-16">
            <div className="md:col-span-4">
              <SquareLabel>What you can get</SquareLabel>
            </div>
            <div className="mt-8 flex flex-col gap-4 md:col-span-8 md:mt-0">
              {site.offers.map((offer) => {
                const Scene = scenes[offer.href];
                return (
                  <Link
                    key={offer.href}
                    href={offer.href}
                    className="laser-border block border border-black px-4 py-6 md:px-6 md:py-8"
                  >
                    <h2 className="text-3xl leading-[1.1] font-normal md:text-4xl">
                      {offer.title}
                    </h2>
                    <p className="mt-3 max-w-xl text-base leading-relaxed">
                      {offer.body}
                    </p>
                    {Scene ? (
                      <div className="mt-6">
                        <Scene />
                      </div>
                    ) : null}
                  </Link>
                );
              })}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

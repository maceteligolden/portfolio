"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

import { ChatbotScene } from "@/components/offers/chatbot-scene";
import { WorkflowScene } from "@/components/offers/workflow-scene";

function Frame({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-56 items-center justify-center border border-black bg-white">
      {children}
    </div>
  );
}

function Stack({ reduce }: { reduce: boolean }) {
  const layers = [
    { y: 78, delay: 0 },
    { y: 52, delay: 0.15 },
    { y: 26, delay: 0.3 },
  ];

  return (
    <Frame>
      <svg viewBox="0 0 240 120" className="h-32 w-56" aria-hidden>
        {layers.map((layer) => (
          <motion.rect
            key={layer.y}
            x="48"
            y={layer.y}
            width="144"
            height="22"
            rx="6"
            className="fill-black/10 stroke-black"
            strokeWidth="2"
            initial={false}
            animate={reduce ? undefined : { y: [layer.y + 6, layer.y] }}
            transition={
              reduce
                ? undefined
                : { duration: 0.8, delay: layer.delay, ease: [0.22, 1, 0.36, 1] }
            }
          />
        ))}
      </svg>
    </Frame>
  );
}

export function ServiceIllustration({ slug }: { slug: string }) {
  const reduce = useReducedMotion() === true;

  if (slug === "workflow-automation") return <WorkflowScene />;
  if (slug === "ai-product-development") return <ChatbotScene />;
  return <Stack reduce={reduce} />;
}

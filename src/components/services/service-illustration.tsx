"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

function Frame({ children }: { children: ReactNode }) {
  return (
    <div className="border-border/50 bg-card/40 flex h-56 items-center justify-center rounded-2xl border">
      {children}
    </div>
  );
}

function Workflow({ reduce }: { reduce: boolean }) {
  return (
    <Frame>
      <svg viewBox="0 0 240 120" className="h-32 w-56" aria-hidden>
        <motion.path
          d="M36 60 H204"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="text-blue-400/50"
          strokeDasharray="6 6"
          initial={false}
          animate={reduce ? undefined : { strokeDashoffset: [0, -24] }}
          transition={
            reduce ? undefined : { duration: 2.4, repeat: Infinity, ease: "linear" }
          }
        />
        {[36, 120, 204].map((x, index) => (
          <motion.circle
            key={x}
            cx={x}
            cy="60"
            r="14"
            className="fill-blue-500/20 stroke-blue-400"
            strokeWidth="2"
            initial={false}
            animate={reduce ? undefined : { scale: [1, 1.08, 1] }}
            transition={
              reduce
                ? undefined
                : {
                    duration: 2.2,
                    repeat: Infinity,
                    delay: index * 0.25,
                    ease: "easeInOut",
                  }
            }
          />
        ))}
      </svg>
    </Frame>
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
            className="fill-blue-500/15 stroke-blue-400"
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

function Agent({ reduce }: { reduce: boolean }) {
  return (
    <Frame>
      <svg viewBox="0 0 240 120" className="h-32 w-56" aria-hidden>
        <motion.g
          initial={false}
          animate={reduce ? undefined : { rotate: 360 }}
          transition={
            reduce ? undefined : { duration: 10, repeat: Infinity, ease: "linear" }
          }
          style={{ transformOrigin: "120px 60px" }}
        >
          <circle
            cx="120"
            cy="60"
            r="34"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-blue-400/70"
            strokeDasharray="8 10"
          />
        </motion.g>
        <circle cx="120" cy="60" r="10" className="fill-blue-400" />
        <circle cx="120" cy="26" r="5" className="fill-blue-300" />
      </svg>
    </Frame>
  );
}

export function ServiceIllustration({ slug }: { slug: string }) {
  const reduce = useReducedMotion() === true;

  if (slug === "workflow-automation") return <Workflow reduce={reduce} />;
  if (slug === "ai-product-development") return <Agent reduce={reduce} />;
  return <Stack reduce={reduce} />;
}

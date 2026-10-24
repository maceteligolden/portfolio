"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type Phase = "lead" | "travel" | "written" | "held";

const steps: Array<{ phase: Phase; ms: number }> = [
  { phase: "lead", ms: 1000 },
  { phase: "travel", ms: 800 },
  { phase: "written", ms: 700 },
  { phase: "held", ms: 2400 },
];

type Move = { left: number; top: number; width: number; x: number; y: number };

function EmailCard({ label, body }: { label: string; body: string }) {
  return (
    <div className="border border-black bg-white px-3 py-2 text-sm">
      <p className="text-xs font-bold tracking-[0.02em] uppercase">{label}</p>
      <p className="mt-1">{body}</p>
    </div>
  );
}

function SheetRow({ filled }: { filled: boolean }) {
  return (
    <div className="border border-black text-xs">
      <div className="grid grid-cols-3 border-b border-black font-bold">
        <span className="px-2 py-1.5">Name</span>
        <span className="border-l border-black px-2 py-1.5">Company</span>
        <span className="border-l border-black px-2 py-1.5">Status</span>
      </div>
      <div className={filled ? "grid grid-cols-3" : "grid grid-cols-3 text-black/40"}>
        <span className="px-2 py-1.5">{filled ? "Ada" : "—"}</span>
        <span className="border-l border-black px-2 py-1.5">
          {filled ? "Northwind" : "—"}
        </span>
        <span className="border-l border-black px-2 py-1.5">
          {filled ? "New" : "—"}
        </span>
      </div>
    </div>
  );
}

export function WorkflowScene() {
  const reduce = useReducedMotion() === true;
  const [phase, setPhase] = useState<Phase>("lead");
  const [move, setMove] = useState<Move | null>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const fromRef = useRef<HTMLDivElement>(null);
  const toRef = useRef<HTMLDivElement>(null);
  const shown: Phase = reduce ? "held" : phase;

  useEffect(() => {
    if (reduce) return;
    let index = 0;
    let timer = 0;
    let cancelled = false;

    const tick = () => {
      if (cancelled) return;
      const step = steps[index];
      if (step.phase === "travel") {
        const scene = sceneRef.current?.getBoundingClientRect();
        const from = fromRef.current?.getBoundingClientRect();
        const to = toRef.current?.getBoundingClientRect();
        if (scene && from && to) {
          setMove({
            left: from.left - scene.left,
            top: from.top - scene.top,
            width: from.width,
            x: to.left - from.left,
            y: to.top - from.top,
          });
        }
      }
      setPhase(step.phase);
      timer = window.setTimeout(() => {
        index = (index + 1) % steps.length;
        tick();
      }, step.ms);
    };

    tick();
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [reduce]);

  const traveling = shown === "travel" && move !== null;
  const rowIn = shown === "written" || shown === "held";
  const held = shown === "held";
  const showLead = shown === "lead" || shown === "travel";

  return (
    <div
      ref={sceneRef}
      className="@container relative border border-black bg-white p-4"
      aria-hidden
    >
      <div className="flex flex-col gap-3 @min-[28rem]:grid @min-[28rem]:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] @min-[28rem]:items-center @min-[28rem]:gap-8">
        <div className="flex flex-col gap-2">
          <div ref={fromRef}>
            {showLead ? (
              <div className={traveling ? "invisible" : undefined}>
                <EmailCard label="Email" body="New lead — Ada, Northwind" />
              </div>
            ) : null}
          </div>
          {held ? (
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduce ? 0 : 0.4 }}
            >
              <EmailCard
                label="Unusual — waiting"
                body="A question this reply does not cover."
              />
            </motion.div>
          ) : null}
        </div>
        <div ref={toRef}>
          <SheetRow filled={rowIn} />
        </div>
      </div>
      {traveling ? (
        <motion.div
          className="absolute z-10"
          style={{ left: move.left, top: move.top, width: move.width }}
          initial={{ x: 0, y: 0 }}
          animate={{ x: move.x, y: move.y }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <EmailCard label="Email" body="New lead — Ada, Northwind" />
        </motion.div>
      ) : null}
    </div>
  );
}

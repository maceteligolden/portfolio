"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

type Phase = "ask" | "think" | "answer" | "reset";

const steps: Array<{ phase: Phase; ms: number }> = [
  { phase: "ask", ms: 1000 },
  { phase: "think", ms: 2000 },
  { phase: "answer", ms: 2500 },
  { phase: "reset", ms: 800 },
];

function Person() {
  return (
    <svg viewBox="0 0 64 80" className="h-16 w-14 shrink-0 text-black" aria-hidden>
      <circle
        cx="32"
        cy="18"
        r="12"
        fill="white"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M10 74c2-18 12-26 22-26s20 8 22 26"
        fill="white"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}

function Robot({ blink }: { blink: boolean }) {
  return (
    <svg viewBox="0 0 64 80" className="h-16 w-14 shrink-0 text-black" aria-hidden>
      <circle cx="32" cy="4" r="2" fill="currentColor" />
      <rect
        x="30"
        y="6"
        width="4"
        height="8"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <rect
        x="8"
        y="14"
        width="48"
        height="36"
        fill="white"
        stroke="currentColor"
        strokeWidth="2"
      />
      <motion.rect
        x="18"
        y="26"
        width="8"
        height="8"
        fill="currentColor"
        animate={{ scaleY: blink ? 0.15 : 1 }}
        style={{ transformOrigin: "22px 30px" }}
        transition={{ duration: 0.12 }}
      />
      <motion.rect
        x="38"
        y="26"
        width="8"
        height="8"
        fill="currentColor"
        animate={{ scaleY: blink ? 0.15 : 1 }}
        style={{ transformOrigin: "42px 30px" }}
        transition={{ duration: 0.12 }}
      />
      <rect
        x="16"
        y="54"
        width="32"
        height="18"
        fill="white"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}

function Dots() {
  return (
    <span className="flex h-5 items-center gap-1" aria-hidden>
      {[0, 1, 2].map((index) => (
        <motion.span
          key={index}
          className="size-1.5 bg-white"
          animate={{ opacity: [0.25, 1, 0.25] }}
          transition={{ duration: 0.9, repeat: Infinity, delay: index * 0.15 }}
        />
      ))}
    </span>
  );
}

export function ChatbotScene() {
  const reduce = useReducedMotion() === true;
  const [phase, setPhase] = useState<Phase>("ask");
  const [blink, setBlink] = useState(false);
  const shown: Phase = reduce ? "answer" : phase;

  useEffect(() => {
    if (reduce) return;
    let index = 0;
    let timer = 0;
    let cancelled = false;

    const tick = () => {
      if (cancelled) return;
      const step = steps[index];
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

  useEffect(() => {
    if (reduce || shown !== "think") return;
    const start = window.setTimeout(() => setBlink(true), 500);
    const end = window.setTimeout(() => setBlink(false), 700);
    return () => {
      window.clearTimeout(start);
      window.clearTimeout(end);
      setBlink(false);
    };
  }, [shown, reduce]);

  const showQuestion = shown !== "reset";
  const showAnswer = shown === "answer";
  const showThink = shown === "think";

  return (
    <div className="border border-black bg-white p-4" aria-hidden>
      <div className="flex min-h-24 flex-col gap-3 text-sm">
        {showQuestion ? (
          <div className="flex items-start gap-4">
            <Person />
            <p className="w-fit max-w-full border border-black px-3 py-2">
              What’s our company policy on working from home?
            </p>
          </div>
        ) : null}
        {showThink || showAnswer ? (
          <div className="flex items-start gap-4">
            <Robot blink={blink} />
            {showThink ? (
              <p className="w-fit bg-black px-3 py-2 text-white">
                <Dots />
              </p>
            ) : (
              <p className="w-fit max-w-full bg-black px-3 py-2 text-white">
                Tell me what you want to know about company policy.
              </p>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
}

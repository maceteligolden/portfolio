"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface AnimatedCounterProps {
  value: string;
  suffix?: string;
  label: string;
}

export function AnimatedCounter({ value, suffix = "", label }: AnimatedCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [display, setDisplay] = useState("0");
  const isNumeric = /^\d+$/.test(value);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting && isNumeric) {
          const target = parseInt(value, 10);
          let current = 0;
          const step = Math.max(1, Math.floor(target / 30));
          const interval = setInterval(() => {
            current += step;
            if (current >= target) {
              setDisplay(String(target));
              clearInterval(interval);
            } else {
              setDisplay(String(current));
            }
          }, 30);
          observer.disconnect();
        } else if (entry?.isIntersecting) {
          setDisplay(value);
          observer.disconnect();
        }
      },
      { threshold: 0.5 },
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, isNumeric]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center"
    >
      <div className="text-4xl font-bold tracking-tight md:text-5xl">
        <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          {display}
          {suffix}
        </span>
      </div>
      <p className="text-muted-foreground mt-2 text-sm tracking-wider uppercase">
        {label}
      </p>
    </motion.div>
  );
}

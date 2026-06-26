import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        glow: {
          blue: "#3b82f6",
          purple: "#8b5cf6",
        },
      },
      maxWidth: {
        content: "52rem",
        prose: "60ch",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "hero-glow":
          "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(59,130,246,0.15), transparent)",
      },
    },
  },
};

export default config;

export interface SocialLinkInterface {
  label: string;
  href: string;
}

export interface AvailabilityInterface {
  label: string;
  active: boolean;
}

export const siteConfig = {
  name: "Golden Mac-Eteli",
  title: "Software Engineer and AI Builder",
  headline: "I build software and AI systems",
  headlineSecondary: "that turn ideas into products.",
  tagline:
    "Software engineer and AI builder. Six years of production applications, backend systems, cloud infrastructure, and the products around them.",
  stack: ["TypeScript", "Node.js", "AWS", "LangGraph"],
  positioning: "I build software, AI systems, and products from idea to production.",
  email: "maceteligolden@gmail.com",
  calendlyUrl: "https://calendly.com/maceteligolden/intro-call-with-golden",
  headshot: "/images/golden-logo-icon.svg",
  resumePath: "/resume/golden-mac-eteli-resume.pdf",
  social: [
    { label: "GitHub", href: "https://github.com/maceteligolden" },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/golden-mac-eteli-08a379222/",
    },
    { label: "X", href: "https://twitter.com/golden_eteli" },
    { label: "Instagram", href: "https://www.instagram.com/golden_eteli/" },
  ] satisfies SocialLinkInterface[],
  availability: [
    { label: "Open to AI Engineer Roles", active: true },
    { label: "Open to Backend Engineer Roles", active: true },
    { label: "Available for Consulting", active: true },
    { label: "Available for Startup Collaborations", active: true },
  ] satisfies AvailabilityInterface[],
  nav: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Projects", href: "/projects" },
  ],
} as const;

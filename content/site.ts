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
  title: "AI Engineer & Backend-Focused Software Engineer",
  headline: "AI Software Engineer",
  headlineSecondary: "Backend-focused specialist",
  tagline:
    "I build production-grade AI systems, scalable backend infrastructure, and full-stack products that solve real business problems.",
  stack: ["LangGraph", "LangChain", "TypeScript", "Node.js"],
  positioning:
    "This engineer specializes in building production-grade AI systems, scalable backend architectures, and full-stack products that create measurable business impact.",
  email: "maceteligolden@gmail.com",
  calendlyUrl: "",
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

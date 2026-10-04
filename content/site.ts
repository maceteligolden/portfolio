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
  title: "AI products and backend systems for founders",
  headline: "I build AI products and backend systems for founders and teams.",
  headlineSecondary: "From a first version through to something you can run.",
  tagline:
    "Six years shipping production software. TypeScript, Node.js, AWS, and the systems around language models.",
  availabilityBadge: "Based in the UK · taking client projects",
  stack: ["TypeScript", "Node.js", "AWS", "LangGraph"],
  positioning: "I build AI products, backend systems, and MVPs for founders and teams.",
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
    { label: "Taking client projects", active: true },
    { label: "AI products and agents", active: true },
    { label: "Backend systems and APIs", active: true },
    { label: "MVPs and product builds", active: true },
  ] satisfies AvailabilityInterface[],
  nav: [
    { label: "Services", href: "/services" },
    { label: "Work", href: "/projects" },
    { label: "About", href: "/about" },
  ],
  footerNav: [
    { label: "Services", href: "/services" },
    { label: "Work", href: "/projects" },
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Start a project", href: "/contact" },
  ],
} as const;

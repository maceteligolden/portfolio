export interface SocialLinkInterface {
  label: string;
  href: string;
}

export interface AvailabilityInterface {
  label: string;
  active: boolean;
}

export interface OfferInterface {
  title: string;
  body: string;
  href: string;
  cta: string;
  intent: "project" | "hiring" | "product";
  schedule: boolean;
}

export const siteConfig = {
  name: "Golden Mac-Eteli",
  title: "Software engineer",
  headline: "I build application, cloud, and AI systems.",
  headlineSecondary: "Six years, from the interface to the deployment.",
  tagline: "Software engineer, six years, from the interface to the deployment.",
  stack: ["TypeScript", "Node.js", "AWS", "LangGraph"],
  positioning:
    "I can automate a process you repeat, build the software around it, or add AI to a site you already run.",
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
    { label: "Workflow automation", active: true },
    { label: "Custom fullstack software", active: true },
    { label: "AI on an existing website", active: true },
  ] satisfies AvailabilityInterface[],
  capability: {
    label: "About me",
    title: "Software engineer",
    body: [
      "I build the systems a product runs on: the interface, the API and data behind it, and the cloud that keeps it up. Where a language model helps, I build the context, the workflow, and the part a person still controls.",
      "I have about six years of that work. At Prompt Computers I was a co-founder and led the technical work, with the project manager, interns, design, mobile development, and the client conversations.",
      "I am looking for an AI engineer, AI product engineer, full-stack, or backend role. I also take client work when the problem is a product, a workflow, or an AI feature on a system you already run.",
    ],
  },
  offers: [
    {
      title: "For clients",
      body: "If you need a workflow automated, a product built, or AI added to a site you already run, I can work with you on it. You leave with software you can put in front of people.",
      href: "/services",
      cta: "See how I work with clients",
      intent: "project",
      schedule: true,
    },
    {
      title: "For recruiters",
      body: "If you are hiring, I am looking for an AI engineer, AI product engineer, software engineer, full-stack, or backend role, including backend-only. The career page has the work and the stack.",
      href: "/career",
      cta: "See if I am a fit",
      intent: "hiring",
      schedule: true,
    },
    {
      title: "Products",
      body: "Bloggr is a product you can try. WatchNode is a system I built that is no longer online. The case study is the record of it.",
      href: "/products",
      cta: "See the products",
      intent: "product",
      schedule: false,
    },
  ] satisfies OfferInterface[],
  nav: [
    { label: "Work", href: "/projects" },
    { label: "About", href: "/about" },
    { label: "For clients", href: "/services" },
    { label: "Products", href: "/products" },
    { label: "For recruiters", href: "/career" },
    { label: "Blog", href: "/blog" },
  ],
  footerNav: [
    { label: "Work", href: "/projects" },
    { label: "About", href: "/about" },
    { label: "For clients", href: "/services" },
    { label: "Products", href: "/products" },
    { label: "For recruiters", href: "/career" },
    { label: "Blog", href: "/blog" },
  ],
} as const;

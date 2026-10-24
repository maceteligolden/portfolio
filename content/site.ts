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
  title: "AI software for businesses",
  headline: "People on your team answer the same questions all day.",
  headlineSecondary:
    "I build a chatbot that answers those from your documents. You upload the files, or connect a folder in cloud storage such as Google Cloud Storage. Staff or customers ask in chat.",
  heroBoundary:
    "Repetitive questions get an answer without a person. A unique case still goes to a person.",
  frame: "I build AI software for businesses. These are the two you can start with.",
  tagline:
    "A chatbot that answers repetitive questions from your documents, and workflows for leads, routine email, and follow-up.",
  stack: ["TypeScript", "Node.js", "AWS", "LangGraph"],
  positioning:
    "I build AI software for businesses. Start with a chatbot that answers from your documents, or a workflow for the repeated step.",
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
    { label: "Chatbot for repetitive questions", active: true },
    { label: "Workflow automation", active: true },
  ] satisfies AvailabilityInterface[],
  capability: {
    label: "The work",
    title: "AI software for businesses",
    body: [
      "I build AI software for businesses. The two places to start are a chatbot that answers from your documents, and a workflow for the repeated step.",
    ],
  },
  offers: [
    {
      title: "A chatbot for the questions you answer twice",
      body: "Upload documents, or connect cloud storage such as Google Cloud Storage. People ask in chat. The repetitive answers go out. A unique case comes to a person.",
      href: "/services/ai-product-development",
      cta: "See the chatbot",
      intent: "project",
      schedule: false,
    },
    {
      title: "The repeated work, running without you",
      body: "A new lead lands in a spreadsheet. A routine email gets a reply, and an unusual one waits. The right person is told when a message actually needs them.",
      href: "/services/workflow-automation",
      cta: "See the workflows",
      intent: "project",
      schedule: false,
    },
  ] satisfies OfferInterface[],
  nav: [
    { label: "Work", href: "/projects" },
    { label: "Services", href: "/services" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],
  footerNav: [
    { label: "Work", href: "/projects" },
    { label: "Services", href: "/services" },
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],
} as const;

export interface PhilosophyItemInterface {
  title: string;
  description: string;
}

export const philosophyItems: PhilosophyItemInterface[] = [
  {
    title: "Build before overthinking",
    description:
      "Real understanding comes from building, shipping, and seeing what people actually do with it.",
  },
  {
    title: "Simple systems first",
    description:
      "Complexity should be earned. The system a team can operate beats the one that only looks complete on a diagram.",
  },
  {
    title: "Production matters",
    description:
      "A demo that works once is not a production system. Reliability, cost, and what happens when it breaks are part of the design.",
  },
  {
    title: "AI needs engineering",
    description:
      "Connecting a model to an API is easy. A useful product needs context, retrieval, tools, evaluation, and infrastructure around that model.",
  },
];

export const techStack = {
  ai: [
    "OpenAI",
    "Claude",
    "LangChain",
    "LangGraph",
    "LangSmith",
    "RAG",
    "Agents",
    "MCP",
  ],
  backend: ["TypeScript", "Node.js", "Express", "PostgreSQL", "Redis", "REST APIs"],
  cloud: ["AWS", "Terraform", "Docker", "GitHub Actions"],
  frontend: ["React", "Next.js", "TypeScript"],
} as const;

export const aboutContent = {
  intro:
    "I've always been a builder. I'm a software engineer based in the UK, and the work I care about now sits where backend systems, cloud infrastructure, and AI products meet.",
  story: [
    "My dad introduced me to computers when I was young. I started with Microsoft Office and helping with tasks around his office. I didn't know that was the start of a career. I just liked figuring out how things worked.",
    "That curiosity turned into building things of my own. As a teenager I made a small mobile site on Wapka called Wisdom into Bisi — Nigerian news, technology tips, and discussion. About 1,000 people used it. It was also hacked twice. That was an early lesson that putting something on the internet means learning more than how to make it work.",
    "I studied Mechatronics Engineering, which mixed software with electronics, automation, and engineering thinking. One project I enjoyed used autonomous UAVs, Python, and computer vision for agricultural and electrical inspection. It was the first time software felt like it could leave the screen.",
    "Since then I've spent about six years building software professionally. Frontend first, then full-stack, backend systems, cloud infrastructure, and about two years as a technical lead. Leadership, for me, is making the problem clearer and helping the team move.",
    "I've also built outside a job title: freelance work, startups, MVPs, internal tools, marketplaces, and my own products. One consulting stretch generated roughly $200k in revenue. When you own the product, the questions change. Does it solve the problem? Will someone use it? Can we afford to run it? What happens when it breaks?",
    "These days I'm most interested in AI engineering. Not putting a model behind a button. Building the systems around it: context, retrieval, agents, tools, memory, APIs, evaluation, and the experience that makes it useful. I'm building Bloggr, an AI content system meant to feel more like a collaborator than a prompt form. WatchNode is the same instinct on a different problem: anomaly detection that does not keep the raw data, turned into something a team can actually use.",
    "The instinct hasn't changed. Give me a problem, and I'll want to build something.",
  ],
  close:
    "That is the work I take on with clients. If you have a product to build, or a system that needs to hold up in production, start with a short brief.",
};

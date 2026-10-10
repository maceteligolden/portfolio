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
    "I stay with it until there is a result. That system is the software, the cloud it runs on, and AI when the problem needs it.",
  story: [
    "My dad introduced me to computers when I was young. I started with Microsoft Office and helping with tasks around his office. I liked figuring out how a computer could be used to make something.",
    "As a teenager I made a small mobile site on Wapka called Wisdom into Bisi. About 1,000 people used it, and it was hacked more than once. Putting something in front of people taught me more than how to make it work.",
    "I studied Mechatronics Engineering, a five-year degree I finished in 2023. One project used autonomous UAVs, Python, and computer vision for agricultural and electrical inspection. The team had to learn flight and computer vision for that work. We won a state-level competition and placed fourth nationally. That project is where I learned to take on a problem that was not only software. My work now is software, cloud, and AI systems.",
    "Since then I have spent about six years building software. I build the application, and I also work on the cloud it runs on and the AI around it when the problem needs that. From April 2024 to August 2025 I did an MSc in Data Science and Computational Intelligence at Coventry University. It is the foundation under the AI work, not a research credential.",
  ],
  close:
    "That is the same approach in a role I was hired into, on contract work, and on products I own. The case studies on the work page are the results.",
};

export interface PhilosophyItemInterface {
  title: string;
  description: string;
}

export const philosophyItems: PhilosophyItemInterface[] = [
  {
    title: "Build for Reliability",
    description:
      "Focus on maintainable systems with clear boundaries, observability, and predictable failure modes.",
  },
  {
    title: "Business First",
    description:
      "Technology should solve real problems. Every architectural decision ties back to user and business outcomes.",
  },
  {
    title: "Production-Ready AI",
    description:
      "AI systems should be measurable, reliable, and scalable — not demos. Evaluation and monitoring are first-class.",
  },
  {
    title: "Simplicity Over Complexity",
    description:
      "Prefer practical solutions over unnecessary complexity. The best system is the one the team can operate confidently.",
  },
];

export const techStack = {
  ai: [
    "OpenAI",
    "Anthropic",
    "LangChain",
    "LangGraph",
    "LlamaIndex",
    "Pinecone",
    "Weaviate",
    "RAG Systems",
  ],
  backend: [
    "Python",
    "FastAPI",
    "Node.js",
    "NestJS",
    "Go",
    "PostgreSQL",
    "Redis",
    "Kafka",
  ],
  cloud: ["AWS", "Docker", "Kubernetes", "Terraform", "CI/CD"],
  frontend: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
} as const;

export const aboutContent = {
  intro:
    "I specialize in AI engineering and backend systems. While I can build complete full-stack products, my strongest expertise lies in designing scalable backend architectures and production-ready AI applications.",
  background:
    "From concept to production, I take ideas through architecture, implementation, and deployment. I have built open-source tools, commercial platforms, and AI-powered products across observability, supply chain, and assessment domains.",
  focus:
    "Currently focused on LLM applications, RAG pipelines, agent workflows, and the backend infrastructure that makes AI systems reliable at scale.",
};

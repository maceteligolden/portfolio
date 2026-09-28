export interface ExpertiseAreaInterface {
  title: string;
  description: string;
  topics: string[];
}

export const expertiseAreas: ExpertiseAreaInterface[] = [
  {
    title: "AI Engineering",
    description:
      "The systems around the model: context, retrieval, agents, tools, memory, evaluation, and the product experience that makes them useful.",
    topics: [
      "LLM applications",
      "AI agents",
      "RAG",
      "LangGraph",
      "Evaluation",
      "Vector search",
      "Orchestration",
      "Observability",
    ],
  },
  {
    title: "Backend Engineering",
    description:
      "APIs, data, and cloud infrastructure a product can actually run on. TypeScript and Node.js are home base.",
    topics: [
      "API design",
      "Node.js",
      "TypeScript",
      "PostgreSQL",
      "Authentication",
      "Event-driven systems",
      "AWS",
      "Observability",
    ],
  },
  {
    title: "Product Engineering",
    description:
      "Taking an idea through the interface, the API, and deployment — including products I build myself.",
    topics: [
      "React",
      "Next.js",
      "TypeScript",
      "SaaS products",
      "Cloud deployment",
      "Developer experience",
    ],
  },
];

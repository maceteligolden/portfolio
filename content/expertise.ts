export interface ExpertiseAreaInterface {
  title: string;
  description: string;
  topics: string[];
}

export const expertiseAreas: ExpertiseAreaInterface[] = [
  {
    title: "AI Engineering",
    description:
      "Production-ready AI systems with measurable outcomes and reliable evaluation.",
    topics: [
      "LLM Applications",
      "AI Agents",
      "RAG Systems",
      "Python",
      "Prompt Engineering",
      "Fine-Tuning",
      "Evaluation Frameworks",
      "Vector Databases",
    ],
  },
  {
    title: "Backend Engineering",
    description:
      "Scalable APIs and distributed systems designed for reliability and performance.",
    topics: [
      "API Design",
      "Microservices",
      "Event-Driven Systems",
      "Distributed Systems",
      "Python",
      "Database Architecture",
      "Authentication",
      "Performance Optimization",
    ],
  },
  {
    title: "Full Stack Development",
    description: "End-to-end product delivery from frontend UX to cloud deployment.",
    topics: [
      "React",
      "Next.js",
      "TypeScript",
      "Python",
      "Product Development",
      "Cloud Deployment",
    ],
  },
];

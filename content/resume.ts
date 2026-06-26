export interface ResumeExperienceInterface {
  company: string;
  role: string;
  period: string;
  description: string;
}

export interface ResumeEducationInterface {
  institution: string;
  degree: string;
  period: string;
}

export const resumeContent = {
  summary:
    "AI Engineer and Backend-Focused Software Engineer with experience building production-grade AI systems, scalable backend infrastructure, and full-stack products. Proven track record shipping SaaS platforms, ML-powered observability tools, and enterprise supply chain systems.",
  skills: {
    ai: [
      "LLM Applications",
      "RAG Systems",
      "AI Agents",
      "LangChain",
      "LangGraph",
      "Python",
      "Vector Databases",
      "Prompt Engineering",
      "ML Anomaly Detection",
    ],
    backend: [
      "Node.js",
      "Python",
      "FastAPI",
      "PostgreSQL",
      "MongoDB",
      "Redis",
      "Kafka",
      "REST APIs",
      "Microservices",
    ],
    frontend: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    cloud: ["AWS", "Docker", "Kubernetes", "Terraform", "CI/CD"],
  },
  experience: [
    {
      company: "Independent / Freelance",
      role: "AI & Backend Engineer",
      period: "2022 — Present",
      description:
        "Building production AI systems, SaaS platforms, and backend infrastructure for startups and enterprise clients. Shipped WatchNode (ML observability), Simple Assessment (open-source), and supply chain traceability platform.",
    },
    {
      company: "Various Clients",
      role: "Full Stack Engineer",
      period: "2020 — 2022",
      description:
        "Delivered end-to-end products from concept to production. Frontend interfaces, backend APIs, database design, and cloud deployment.",
    },
  ] satisfies ResumeExperienceInterface[],
  education: [
    {
      institution: "University",
      degree: "Computer Science / Engineering",
      period: "—",
    },
  ] satisfies ResumeEducationInterface[],
  certifications: ["AWS Cloud Practitioner (placeholder — update with real certs)"],
  awards: ["Open source contributor — Simple Assessment platform"],
};

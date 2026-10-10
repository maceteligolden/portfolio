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

export interface CertificationInterface {
  name: string;
  issuer: string;
}

export const resumeContent = {
  summary:
    "Software engineer with about six years building production software across the interface, the API, and the cloud, including AI products and technical leadership at Prompt Computers.",
  skills: {
    ai: [
      "LLM applications",
      "RAG",
      "AI agents",
      "LangChain",
      "LangGraph",
      "Python",
      "FastAPI",
      "Hugging Face",
    ],
    backend: [
      "Node.js",
      "Python",
      "PostgreSQL",
      "MongoDB",
      "Redis",
      "Kafka",
      "REST APIs",
    ],
    frontend: ["React", "Next.js", "TypeScript"],
    cloud: [
      "AWS",
      "Docker",
      "Kubernetes",
      "Terraform",
      "CloudFormation",
      "CodePipeline",
      "CI/CD",
    ],
  },
  experience: [
    {
      company: "Prompt Computers",
      role: "Co-founder",
      period: "",
      description:
        "Led the technical work, including a project manager, interns, UI/UX, and mobile development. Met clients directly and worked with other technical teams. Built the first web version of Repore, led the mobile team, and maintained the API and cloud infrastructure. Prompt Computers did about $200k in revenue. That figure is company revenue, not profit.",
    },
  ] satisfies ResumeExperienceInterface[],
  education: [
    {
      institution: "Coventry University",
      degree: "MSc Data Science and Computational Intelligence",
      period: "April 2024 — August 2025",
    },
    {
      institution: "",
      degree: "Mechatronics Engineering",
      period: "Five-year degree, graduated 2023",
    },
  ] satisfies ResumeEducationInterface[],
  certifications: [
    {
      name: "AWS Certified Cloud Practitioner",
      issuer: "Amazon Web Services",
    },
    {
      name: "AWS Certified Developer – Associate",
      issuer: "Amazon Web Services",
    },
  ] satisfies CertificationInterface[],
};

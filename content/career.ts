import type { FaqInterface } from "@content/faqs";

export const careerRoles = [
  {
    title: "AI Engineer",
    detail:
      "If you need someone who can put an agent, retrieval, and evaluation into a product people actually use, that is the work I want. LangGraph and TypeScript are home base.",
  },
  {
    title: "AI Product Engineer",
    detail:
      "If the role is an AI feature with a job inside a product — context, workflow, and a result a person can use — that is the work I want.",
  },
  {
    title: "Software Engineer",
    detail:
      "If the role is production software across the interface and the API, I want it. Under this title I am looking at full-stack and backend.",
  },
  {
    title: "Full-stack Engineer",
    detail:
      "If you need Next.js and React on the interface, and Node.js with PostgreSQL behind it, through to a deployment your team can run, I can do that with you.",
  },
  {
    title: "Backend Engineer",
    detail:
      "If the role is the API, the data, auth, and the cloud, I want that too, including a backend-only role. TypeScript and Python are where I work, with AWS.",
  },
] as const;

export const careerContent = {
  seoTitle: "For recruiters",
  metaDescription:
    "Golden Mac-Eteli is a software engineer open to AI engineer, AI product engineer, full-stack, and backend roles, including backend-only. Based in the UK, and looking for visa sponsorship.",
  h1: "If you are hiring, here is the work and the roles I want",
  letter: [
    "I am a software engineer. If you have a job description, I want to read it. If you would rather talk first, you can book a call with me.",
    "The titles I want are AI Engineer, AI Product Engineer, Software Engineer, Full-stack Engineer, and Backend Engineer. I take full-stack and backend roles, including backend-only.",
    "I have spent about six years building production software. I write the backend in TypeScript and Python. On the frontend I use React, Next.js, and TypeScript. I have worked with PostgreSQL, MongoDB, S3, Docker, and Kubernetes.",
    "On AWS I have worked with SQS, SNS, ECS, CloudWatch, CloudFormation, and IAM, and with Terraform and CodePipeline. For AI work I have used LangChain, LangGraph, LangSmith, Hugging Face, OpenAI, Claude, and Ollama, and I have also worked with FastAPI, Kafka, and MCP. These are tools I have used. The case studies show where. I test with Vitest.",
    "I am based in the UK, and I want a role that can sponsor a visa.",
  ],
  stackNote:
    "Tools I have worked with. This is not a claim of equal depth in every one. The case studies show the ones I use to ship.",
};

export const careerExperience = [
  {
    company: "Prompt Computers",
    role: "Co-founder",
    summary:
      "I led the technical work. That included a project manager, interns, UI/UX, and mobile development. I met clients to discuss the work directly, and I managed the relationship with other technical teams we collaborated with.",
    detail:
      "Prompt Computers did about $200k in revenue. That figure is company revenue, not profit. Repore is one product from that work: I built the first web version, led the team that built the mobile app, and kept the API and the cloud infrastructure.",
  },
] as const;

export const careerEducation = [
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
] as const;

export const careerStack = {
  Backend: ["TypeScript", "Python"],
  Frontend: ["React", "Next.js", "TypeScript"],
  Storage: ["S3", "RDS", "PostgreSQL", "MongoDB"],
  Containers: ["Docker", "Kubernetes"],
  "AWS and delivery": [
    "SQS",
    "SNS",
    "ECS",
    "CloudWatch",
    "CloudFormation",
    "IAM",
    "Terraform",
    "CodePipeline",
  ],
  AI: [
    "LangChain",
    "LangGraph",
    "LangSmith",
    "Hugging Face",
    "OpenAI",
    "Claude",
    "Ollama",
  ],
  "Also used": ["FastAPI", "Kafka", "MCP"],
  Testing: ["Vitest"],
  Observability: ["PostHog", "Google Analytics", "CloudWatch"],
  Practice: ["Documentation", "Git"],
} as const;

export const careerFaqs: FaqInterface[] = [
  {
    question: "Which roles are you looking for?",
    answer:
      "AI Engineer, AI Product Engineer, Software Engineer, Full-stack Engineer, and Backend Engineer. I take full-stack and backend roles, including backend-only.",
  },
  {
    question: "Do you need visa sponsorship?",
    answer:
      "Yes. I am based in the UK, and I want a role that can sponsor a visa. If your company can do that, I want to hear about the role.",
  },
  {
    question: "Where are you based?",
    answer:
      "The UK. I am open to roles that can hire here, including remote roles set up for the UK, when visa sponsorship is part of the offer.",
  },
  {
    question: "Is this page for a client project?",
    answer:
      "No. This page is for a role. If you need something built as a client, start on the client page and I will work with you there.",
  },
  {
    question: "How should I reach you?",
    answer:
      "Send the job description, or book a 30-minute call. I read every note and reply by email. LinkedIn is on this page if you want it first.",
  },
];

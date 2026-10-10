export type ProjectCategory = "ai" | "backend" | "full-stack";

export type ProjectType = "open-source" | "product" | "contract";

export interface ProjectMediaInterface {
  type: "image" | "video";
  src: string;
  alt: string;
}

export interface ArchitectureDecisionsInterface {
  summary: string;
  pattern: string;
  hosting: string;
  dataLayer: string;
  integrations: string;
  diagram?: string;
  highlights: { label: string; value: string }[];
}

export interface ProjectInterface {
  slug: string;
  title: string;
  type: ProjectType;
  category: ProjectCategory;
  categories: ProjectCategory[];
  featured: boolean;
  audience: string;
  seoTitle: string;
  cardProblem: string;
  shipped: string;
  summary: string;
  image: string;
  media: ProjectMediaInterface[];
  technologies: string[];
  problem: string;
  solution: string;
  contribution: string;
  impact?: string;
  direction?: string;
  architecture: ArchitectureDecisionsInterface;
  links: {
    live?: string;
    github?: string;
    caseStudy?: string;
  };
}

export const projects: ProjectInterface[] = [
  {
    slug: "bloggr",
    title: "Bloggr",
    type: "product",
    category: "ai",
    categories: ["ai", "full-stack", "backend"],
    featured: true,
    audience:
      "My product, for people who need writing that already knows the business.",
    seoTitle: "An AI that writes from a business it already understands",
    cardProblem:
      "A chat session forgets the business, and most AI writers still leave you to publish somewhere else.",
    shipped:
      "Learns the business from the site and the conversation, then suggests topics, outlines, research, and posts.",
    summary:
      "Bloggr learns a business from its website and from the conversation, then uses that to suggest topics, outlines, research, and personalized posts. You approve anything that goes live.",
    image: "/images/bloggr-logo-white.svg",
    media: [
      {
        type: "image",
        src: "/images/bloggr-logo-white.svg",
        alt: "Bloggr logo",
      },
    ],
    technologies: [
      "LangGraph",
      "LangChain",
      "OpenAI",
      "TypeScript",
      "Next.js",
      "React",
      "Node.js",
      "Express",
      "PostgreSQL",
      "MongoDB",
      "Redis",
      "Tavily",
    ],
    problem:
      "The blank page is not the hard part. A general chat forgets the business after the session, and a writer that only generates text still leaves you to brief it again and publish somewhere else.",
    solution:
      "You give Bloggr a website. It keeps a profile of the audience, voice, goals, and guardrails, and it uses that as the guide for the text. From what you write, or from a call with the AI, it suggests topics, an outline, and research, then drafts posts for that business. Nothing goes live until you approve it. Destinations today are Bloggr, Framer, and a workspace API.",
    contribution:
      "I built Bloggr. The application is an Express API and a Next.js dashboard. LangGraph runs the research and writing flow. PostgreSQL holds the product data, MongoDB holds conversation threads and memory, and Redis runs background work.",
    direction:
      "The direction is a system that understands the business identity, turns goals into marketing KPIs and content goals, reads how the content is received, and adjusts the strategy until the content is meeting those KPIs. That loop is not what Bloggr does today.",
    architecture: {
      summary:
        "Bloggr is a modular monolith: an Express API and a separate Next.js dashboard. The dashboard is the conversation. Custom frontends read published posts through a workspace API, not through admin credentials.",
      pattern: "Modular monolith plus a LangGraph agent runtime",
      hosting: "Long-running Node API with Redis workers, and a Next.js dashboard",
      dataLayer:
        "PostgreSQL for users, workspaces, posts, and billing; MongoDB for threads and memory",
      integrations: "OpenAI, Tavily, Framer, Stripe, and a public REST API",
      highlights: [
        { label: "What is live", value: "Profile, research, writing, and approval" },
        { label: "What is not live", value: "Learning from content performance" },
        { label: "Publish destinations", value: "Bloggr, Framer, and the API" },
      ],
    },
    links: { live: "https://bloggr.io" },
  },
  {
    slug: "watchnode",
    title: "WatchNode",
    type: "open-source",
    category: "ai",
    categories: ["ai", "full-stack", "backend"],
    featured: true,
    audience:
      "A system I built for teams that need more than a threshold on logs or spreadsheets.",
    seoTitle: "Anomaly detection for logs and spreadsheets",
    cardProblem:
      "Rules catch the failures you already named. They miss patterns in logs and spreadsheets you have not written a rule for.",
    shipped:
      "Scores logs and spreadsheet data for semantic, sequential, statistical, and temporal anomalies.",
    summary:
      "WatchNode scores application logs and spreadsheet data for semantic, sequential, statistical, and temporal anomalies. Scoring runs on a queue so it does not block ingestion. The hosted product is no longer online.",
    image: "/images/watchnode.svg",
    media: [
      {
        type: "image",
        src: "/images/watchnode.svg",
        alt: "WatchNode logo",
      },
    ],
    technologies: [
      "Node.js",
      "TypeScript",
      "MongoDB",
      "Redis",
      "BullMQ",
      "Hugging Face",
      "Next.js",
    ],
    problem:
      "Rule-based alerts catch the failures you already named. They miss patterns in application logs, and in spreadsheets, that nobody has written a rule for. A detection on its own still leaves someone to decide what changed and what to do.",
    solution:
      "WatchNode scores logs and spreadsheet data from four perspectives: semantic, sequential, statistical, and temporal. Hugging Face inference runs in worker processes. A BullMQ queue on Redis keeps that scoring off the ingestion request. CSV uploads and bank-statement checks use the same idea. The hosted product is no longer online. The repository is the record of the system.",
    contribution:
      "I built WatchNode: the ingestion API, the workers, the detection flow, and the Next.js dashboard.",
    architecture: {
      summary:
        "An event-driven Node API and BullMQ workers. The workers call Hugging Face for anomaly scoring. MongoDB stores the application data. Redis holds the queues.",
      pattern: "Event-driven API plus background workers",
      hosting: "Containerized Node services. The public site is no longer online.",
      dataLayer: "MongoDB for application data; Redis for queues",
      integrations: "Hugging Face inference, BullMQ, CSV and bank-statement analysis",
      highlights: [
        { label: "Detection", value: "Semantic, sequential, statistical, temporal" },
        { label: "Queue", value: "Redis and BullMQ" },
        { label: "Status", value: "Not online. Code is public." },
      ],
    },
    links: { github: "https://github.com/maceteligolden/bigeye_server" },
  },
  {
    slug: "repore",
    title: "Repore",
    type: "product",
    category: "full-stack",
    categories: ["full-stack", "backend"],
    featured: true,
    audience:
      "A Prompt Computers product. I built the web version and kept the API and cloud.",
    seoTitle: "Web product, mobile app, and the API behind both",
    cardProblem:
      "The product needed a web version, a mobile app, and an API and deployment the team could keep running.",
    shipped:
      "I built the first web version, led the mobile team, and maintained the API on ECS.",
    summary:
      "Repore is a Prompt Computers product. I built the first web version, led the team that built the mobile app, and maintained the API and AWS deployment.",
    image: "/images/golden-logo-icon.svg",
    media: [
      {
        type: "image",
        src: "/images/golden-logo-icon.svg",
        alt: "Placeholder mark. Repore has no product image on this site.",
      },
    ],
    technologies: [
      "TypeScript",
      "Node.js",
      "Express",
      "MongoDB",
      "AWS ECS",
      "S3",
      "SQS",
      "SNS",
      "SES",
    ],
    problem:
      "Prompt Computers needed Repore on the web and on mobile, with one API and a deployment the team could operate after the first version.",
    solution:
      "The API behind the product handles accounts, roles, content, uploads, and Stripe purchases. It deploys as an ECS service. Files go to S3. Email is queued on SQS and sent with SES. Mobile push uses an SNS platform application.",
    contribution:
      "I built the first web version myself. I led the team that built the mobile app. I maintained the API and the cloud infrastructure.",
    architecture: {
      summary:
        "The Repore API is an Express service on ECS, backed by MongoDB. The deployment task is the repore-staging service. I am not describing WebSockets or an external identity provider here, because this API does not show them.",
      pattern: "Express API with role-based authentication",
      hosting: "AWS ECS, with the container image in ECR",
      dataLayer: "MongoDB",
      integrations: "S3, SQS, SES, SNS platform application, Stripe",
      highlights: [
        { label: "Web", value: "I built the first version" },
        { label: "Mobile", value: "I led the team that built it" },
        { label: "API and cloud", value: "I maintained both" },
      ],
    },
    links: {},
  },
  {
    slug: "simple-assessment",
    title: "Simple Assessment",
    type: "open-source",
    category: "full-stack",
    categories: ["full-stack"],
    featured: false,
    audience:
      "An open-source exam product I built for timed tests and server-side grading.",
    seoTitle: "Timed online exams with server-side grading",
    cardProblem:
      "Small teams need online exams and grading without a full learning platform.",
    shipped:
      "Timed exams, question banks, and grading on the server. The browser polls. It does not use WebSockets.",
    summary:
      "An open-source examination product for timed exams, question banks, and server-side grading. Session timing comes from the server. The client polls for updates.",
    image: "/images/simple-assessment.svg",
    media: [
      {
        type: "image",
        src: "/images/simple-assessment.svg",
        alt: "Simple Assessment logo",
      },
    ],
    technologies: ["React", "Node.js", "MongoDB", "Express", "Netlify"],
    problem:
      "Educators and small teams need online exams and grading without taking on a full learning platform.",
    solution:
      "Simple Assessment is an open-source product for question banks, participant lists, and timed exams. The server stores the start and end timestamps, so a refresh does not reset the clock. Grading for standard question types runs in the Express API. The browser polls for updates. It does not use WebSockets.",
    contribution:
      "I built the React application, the Express API, and the grading flow.",
    architecture: {
      summary:
        "One Express API and a React application. The frontend is a static site. The API is a Node process.",
      pattern: "Monolith: Express API and React application",
      hosting: "Netlify for the frontend. The API is a Node server.",
      dataLayer: "MongoDB for exams, questions, participants, and submissions",
      integrations: "JWT authentication and server-side grading",
      highlights: [
        { label: "Timing", value: "Server timestamps" },
        { label: "Updates", value: "Polling, not WebSockets" },
        { label: "Grading", value: "On the server" },
      ],
    },
    links: {
      live: "https://simpleassessments.netlify.app/dashboard",
      github: "https://github.com/maceteligolden/simple-assessment",
    },
  },
  {
    slug: "supply-chain-platform",
    title: "Supply Chain Traceability Platform",
    type: "contract",
    category: "full-stack",
    categories: ["full-stack", "backend"],
    featured: false,
    audience: "A client system for a supplier, used by Ewa Adeyemo at Maturis GmbH.",
    seoTitle: "Farm traceability and EUDR vegetation assessments",
    cardProblem:
      "A supplier needed one system for farms, commodities, and EUDR checks on farmer land.",
    shipped:
      "Farms, commodities, batches, and supply-chain events, with deforestation and afforestation assessments.",
    summary:
      "A traceability system for a supplier. It connects farms, commodities, batches, and supply-chain events, and runs EUDR deforestation and afforestation assessments on selected farmer land. The client used it.",
    image: "/images/golden-logo-icon.svg",
    media: [
      {
        type: "image",
        src: "/images/golden-logo-icon.svg",
        alt: "Placeholder mark. This project has no product image on this site.",
      },
    ],
    technologies: [
      "Next.js",
      "Node.js",
      "TypeScript",
      "Prisma",
      "PostgreSQL",
      "Docker",
      "Global Forest Watch",
    ],
    problem:
      "A supplier had no single system for farms, commodities, and the EUDR requirement to assess deforestation and afforestation on selected farmer land. The parties in the chain also needed a way to follow a commodity through the supply chain.",
    solution:
      "The platform connects farms, commodities, batches, and supply-chain events, so a commodity can be followed through the chain. On selected farmer land it runs deforestation and afforestation assessments for EUDR. The API sends farm boundaries to Open Foris WHISP and Global Forest Watch. If a provider key is missing, the assessment is marked as a fallback rather than live evidence.",
    contribution:
      "I built the system for the client: the Next.js application, the Express API, and the assessment flow.",
    impact:
      "Ewa Adeyemo, Director of Operations at Maturis GmbH, was the client and used the system.",
    architecture: {
      summary:
        "A Next.js application in front of an Express API and PostgreSQL. Assessments call WHISP and Global Forest Watch. Docker is used so the API and database can run together.",
      pattern: "Modular Express API and a Next.js application",
      hosting:
        "Docker for the API and PostgreSQL. The Next.js app is deployed separately.",
      dataLayer: "PostgreSQL via Prisma",
      integrations:
        "Open Foris WHISP, Global Forest Watch, Turf.js for farm boundaries",
      highlights: [
        { label: "Client", value: "Maturis GmbH" },
        { label: "Assessment", value: "EUDR vegetation checks, not a trained model" },
        { label: "Database", value: "PostgreSQL" },
      ],
    },
    links: {},
  },
];

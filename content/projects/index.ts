export type ProjectCategory = "ai" | "backend" | "full-stack";

export type ProjectType = "open-source" | "product" | "contract";

export interface StarFeatureInterface {
  title: string;
  situation: string;
  task: string;
  action: string;
  result: string;
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
  summary: string;
  image: string;
  technologies: string[];
  outcomes: string[];
  about: string;
  problem: string;
  features: StarFeatureInterface[];
  architecture: ArchitectureDecisionsInterface;
  gallery: string[];
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
    category: "full-stack",
    categories: ["ai", "full-stack", "backend"],
    featured: true,
    summary:
      "Private-beta AI content strategist: ingest a website into a living Business Profile, then write by chatting with a LangGraph agent that researches, remembers the business, and publishes to Bloggr, Framer, or any frontend via a public API.",
    image: "/images/bloggr-logo-white.svg",
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
      "Drizzle",
      "MongoDB",
      "Tavily",
      "Redis",
      "Stripe",
      "Tailwind CSS",
      "tsyringe",
    ],
    outcomes: [
      "Website ingest to a Business Profile so every draft is already on-brand",
      "LangGraph strategist with Tavily research, HITL publish, and SEO/GAO scoring",
      "Workspace-scoped public API plus live Framer CMS publish",
    ],
    about:
      "Bloggr is a private-beta AI content strategist, not a ChatGPT wrapper or a CMS with AI bolted on. You paste a website; it becomes the brief. The dashboard opens to the strategist chat — not a post list — and every draft is bound by a living Business Profile: audience, voice, goals, and guardrails. Workspaces keep each brand isolated. Published posts leave through Bloggr, Framer CMS, or a workspace-scoped public API — the same API this portfolio is built to consume.",
    problem:
      "The blank page is not the problem. The workflow is. ChatGPT forgets the business after every session. Typical AI writers still export somewhere else. Teams either embed a heavy CMS or rebuild auth, drafts, search, and publishing from scratch. Founders and small teams need a strategist that already knows the business and a publish path that does not start over on every post.",
    features: [
      {
        title: "Website Ingest and Business Profile",
        situation:
          "Onboarding a content tool usually means a 20-field wizard that still forgets the brand by the next session.",
        task: "Turn a public website into a living profile the agent can read, correct, and reuse across every post.",
        action:
          "Built website ingest via Tavily extract or HTTP fetch, then an LLM proposal for industries, audience, voice, goals, competitors, and guardrails. The profile is the workspace constitution; chat can correct it, and memory keeps preferences so the next post is not a re-brief.",
        result:
          "Setup is a URL, not a form. Drafts start on-brand, and off-brief topics get a warning before the agent writes.",
      },
      {
        title: "Orchestratorv2 Strategist",
        situation:
          "Generic chat UIs generate text without research provenance, quality gates, or control over what goes live.",
        task: "Ship a conversation-first agent that researches, writes, scores, and only publishes with explicit approval.",
        action:
          "Implemented Conversation Intelligence into a LangGraph orchestrator with research, writing, and content-optimization skills. Writing consumes a persisted Tavily research package instead of searching ad hoc. SEO/GAO scoring gates drafts. Destructive publish and schedule actions interrupt for human confirmation.",
        result:
          "Users steer in natural language and stay in control of what ships. The AI feels like a strategist, not a text generator with a chat skin.",
      },
      {
        title: "Headless API and Framer Publish",
        situation:
          "Custom sites and Framer properties needed published content without exposing admin credentials or claiming destinations that were not built.",
        task: "Give each workspace a read-only public API and a real CMS publish path, plus schedule and calendar.",
        action:
          "Shipped workspace-scoped API keys (x-access-key-id / x-secret-key) for published posts and categories, Next.js BFF proxies so secrets never reach the browser, and live publish to Bloggr and Framer CMS with scheduling and a publishing calendar.",
        result:
          "Frontends consume the same published catalog. WordPress, Webflow, and Ghost are not claimed — live destinations today are Bloggr and Framer.",
      },
    ],
    architecture: {
      summary:
        "Bloggr is a modular monolith: an Express API with tsyringe DI and a separate Next.js dashboard. The dashboard is chat-first (orchestratorv2). Custom frontends never talk to admin credentials — they hit a public REST API through a BFF.",
      pattern:
        "Modular monolith (Repository → Service → Controller, tsyringe DI) plus LangGraph agent runtime",
      hosting:
        "Long-running Node API with Redis/Bull workers; Next.js dashboard on Netlify/Vercel-style SSR. Not serverless.",
      dataLayer:
        "PostgreSQL (Drizzle) for users, workspaces, posts, API keys, and billing; MongoDB for orchestrator threads, checkpoints, and long-term memory artifacts",
      integrations: "OpenAI, Tavily, Brevo, Stripe, Framer CMS, public REST API",
      highlights: [
        { label: "Microservices?", value: "No — modular monolith" },
        { label: "Serverless?", value: "No — long-running Node API + workers" },
        { label: "Auth model", value: "JWT (dashboard) + workspace-scoped API keys" },
        {
          label: "Frontend pattern",
          value: "Chat-first dashboard + headless public API",
        },
      ],
      diagram: `flowchart LR
  dashboard[NextjsDashboard] --> orchestrator[Orchestratorv2]
  orchestrator --> skills[ResearchWritingOptimize]
  orchestrator --> api[ExpressModularMonolith]
  skills --> tavily[Tavily]
  skills --> openai[OpenAI]
  portfolio[CustomFrontends] --> proxy[NextjsBFFProxy]
  proxy --> publicApi[PublicBlogAPI]
  publicApi --> api
  framer[FramerCMS] --> api
  api --> postgres[(PostgreSQL)]
  api --> mongo[(MongoDB)]
  api --> redis[(Redis)]`,
    },
    gallery: ["/images/bloggr-logo-white.svg"],
    links: { live: "https://bloggr.io" },
  },
  {
    slug: "watchnode",
    title: "WatchNode",
    type: "open-source",
    category: "ai",
    categories: ["ai", "full-stack", "backend"],
    featured: true,
    summary:
      "Open-source full-stack log monitoring with Hugging Face models detecting sequential, semantic, and statistical anomalies in production logs.",
    image: "/images/watchnode.svg",
    technologies: [
      "Node.js",
      "TypeScript",
      "MongoDB",
      "Redis",
      "BullMQ",
      "Hugging Face",
      "Next.js",
      "AWS",
    ],
    outcomes: [
      "Sequential, semantic, and statistical anomaly detection via Hugging Face",
      "Real-time log ingestion and alerting",
      "Open-source full-stack observability platform",
    ],
    about:
      "WatchNode is an open-source observability platform that ingests application logs and surfaces sequential, semantic, and statistical anomalies using Hugging Face inference — helping teams catch issues before they become incidents.",
    problem:
      "Rule-based alerting drowns teams in noise and misses subtle patterns in high-volume log streams. Manual triage does not scale as systems grow.",
    features: [
      {
        title: "Log Ingestion Pipeline",
        situation:
          "Customers emit high-volume, heterogeneous logs from multiple services with inconsistent formats.",
        task: "Build a reliable ingestion path that normalizes events and never blocks the write path.",
        action:
          "Designed an event-driven pipeline: ingestion API → BullMQ workers on Redis → persistence in MongoDB with tenant-scoped collections.",
        result:
          "Sustained ingestion under load with async processing decoupled from the API response cycle.",
      },
      {
        title: "Hugging Face Anomaly Detection",
        situation:
          "Static thresholds failed to catch emerging failure patterns across different workloads and log semantics.",
        task: "Detect sequential, semantic, and statistical anomalies in log streams using production-grade ML inference.",
        action:
          "Integrated Hugging Face models via @huggingface/inference in worker processes — scoring temporal sequences, semantic embeddings, and statistical deviations before alert emission.",
        result:
          "Reduced false positives versus pure threshold rules and improved mean time to detect subtle log anomalies.",
      },
      {
        title: "Multi-Tenant Dashboard",
        situation:
          "Multiple organizations needed isolated data, auth, and alerting configs on shared infrastructure.",
        task: "Deliver a secure multi-tenant product surface with JWT auth and per-tenant configuration.",
        action:
          "Built a Next.js dashboard with tenant-aware API routes, role-based access, and real-time alert views.",
        result:
          "Production-ready open-source observability at watchnode.io with isolated data and self-serve workflows.",
      },
    ],
    architecture: {
      summary:
        "WatchNode is an open-source, event-driven full-stack platform with async workers — API and BullMQ workers share deployment units on AWS.",
      pattern: "Event-driven modular backend (API + BullMQ workers)",
      hosting: "AWS (containerized services, not fully serverless)",
      dataLayer: "MongoDB for metadata and log indexes; Redis for queues and caching",
      integrations:
        "BullMQ job queues; Hugging Face inference for anomaly detection; email/webhook alerting",
      highlights: [
        { label: "Open source?", value: "Yes — full-stack on GitHub" },
        { label: "Serverless?", value: "No — persistent workers for ML + queues" },
        { label: "Messaging", value: "Redis + BullMQ" },
        { label: "AI/ML", value: "Hugging Face — sequential, semantic, statistical" },
      ],
      diagram: `flowchart LR
  ingest[LogIngestionAPI] --> queue[BullMQWorkers]
  queue --> ml[HuggingFaceInference]
  ml --> store[(MongoDB)]
  store --> api[RESTAPI]
  api --> dashboard[NextjsDashboard]
  api --> alerts[AlertService]`,
    },
    gallery: ["/images/watchnode.svg"],
    links: {
      live: "https://watchnode.io",
      github: "https://github.com/maceteligolden/bigeye_server",
    },
  },
  {
    slug: "simple-assessment",
    title: "Simple Assessment",
    type: "open-source",
    category: "full-stack",
    categories: ["full-stack"],
    featured: false,
    summary:
      "Online examination platform with auto-grading, participant management, and real-time exam delivery.",
    image: "/images/simple-assessment.svg",
    technologies: ["React", "Node.js", "MongoDB", "Express", "Netlify"],
    outcomes: [
      "Auto-grading engine for multiple question types",
      "Real-time exam delivery",
      "Open-source full-stack product",
    ],
    about:
      "Simple Assessment is an open-source examination platform for creating timed assessments, managing participants, and auto-grading submissions without enterprise LMS overhead.",
    problem:
      "Educators and small teams need online exams with grading automation but cannot justify complex LMS platforms or manual marking at scale.",
    features: [
      {
        title: "Auto-Grading Engine",
        situation:
          "Manual grading did not scale once assessments included mixed question types and larger cohorts.",
        task: "Support multiple choice, short answer, and structured formats with consistent server-side scoring.",
        action:
          "Built a grading module in the Express API that evaluates submissions against answer keys and returns scored results atomically.",
        result:
          "Instant feedback for participants and eliminated manual marking for standard question types.",
      },
      {
        title: "Timed Exam Delivery",
        situation:
          "Exams needed hard time limits and a controlled participant experience in the browser.",
        task: "Deliver exams with countdown timers, session persistence, and submission locking at expiry.",
        action:
          "Implemented timed sessions in the React SPA with server-authoritative start/end timestamps stored in MongoDB.",
        result:
          "Reliable exam delivery with consistent timing even if clients refresh mid-session.",
      },
      {
        title: "Participant & Question Bank Management",
        situation:
          "Organizers reused questions across exams and tracked who sat each assessment.",
        task: "Provide CRUD for question banks, exam assembly, and participant enrollment.",
        action:
          "Shipped admin flows for bank management, exam publishing, and participant dashboards with JWT-protected routes.",
        result:
          "End-to-end exam lifecycle from authoring to graded results in a single open-source product.",
      },
    ],
    architecture: {
      summary:
        "Simple Assessment is a classic monolithic Express API paired with a React SPA — intentionally simple, not microservices or serverless backend.",
      pattern: "Monolith (Express API + React SPA)",
      hosting: "Netlify for frontend static hosting; Node API on PaaS/server",
      dataLayer: "MongoDB for exams, questions, participants, and submissions",
      integrations: "JWT authentication; server-side grading engine",
      highlights: [
        { label: "Microservices?", value: "No — single API codebase" },
        { label: "Serverless?", value: "Frontend on Netlify; API is Node monolith" },
        { label: "Real-time", value: "Polling + server timestamps (not WebSockets)" },
        { label: "Open source", value: "Yes — full-stack reference implementation" },
      ],
    },
    gallery: ["/images/simple-assessment.svg"],
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
    categories: ["ai", "full-stack", "backend"],
    featured: true,
    summary:
      "Full-stack enterprise traceability platform with AI-driven farm assessments tracking the rate of change of deforestation and afforestation in vegetation cover.",
    image: "/images/golden-logo-icon.svg",
    technologies: [
      "Next.js",
      "Node.js",
      "Prisma",
      "PostgreSQL",
      "Global Forest Watch",
      "Docker",
      "TypeScript",
      "Python",
    ],
    outcomes: [
      "AI-assisted deforestation and afforestation rate tracking per farm boundary",
      "Multi-module supply chain management with geospatial data",
      "Role-based access control across compliance workflows",
    ],
    about:
      "An enterprise traceability platform connecting farms, commodities, batches, and compliance assessments — with AI-powered vegetation analysis that tracks how deforestation or afforestation rates change over time at farm boundaries.",
    problem:
      "Operators lacked a single system to trace products across farms, quantify vegetation loss or gain over time, and enforce role-based workflows with geospatial farm data.",
    features: [
      {
        title: "Modular Domain Backend",
        situation:
          "Supply chain logic spanned commodities, farms, batches, assessments, and boundaries — each with distinct rules.",
        task: "Organize the backend into isolated modules without deploying separate microservices prematurely.",
        action:
          "Implemented a modular monolith with tsyringe DI, repository pattern, and per-domain controllers/services under Express.",
        result:
          "Clear module boundaries and testable services while keeping operational complexity of a single deployable API.",
      },
      {
        title: "Vegetation Change & Deforestation Assessments",
        situation:
          "Compliance teams needed to track how deforestation or afforestation rates change over time within farm vegetation boundaries — not just static boundary maps.",
        task: "Integrate geospatial farm data with vegetation metrics and compute year-over-year deforestation and afforestation rate of change.",
        action:
          "Built farm assessment modules with Global Forest Watch API integration (GfwClient), yearly loss metrics, and risk scoring tied to farm boundary polygons via Turf.js.",
        result:
          "Auditable vegetation change assessments linked to supply chain entities for compliance and export reporting.",
      },
      {
        title: "Next.js BFF & RBAC",
        situation:
          "The frontend needed typed API access without exposing backend URLs or auth tokens to the browser.",
        task: "Provide a secure BFF layer and role-based permissions across supply chain modules.",
        action:
          "Built Next.js route handlers as a BFF proxy to the Express API with session/JWT forwarding and module-level RBAC checks.",
        result:
          "Unified frontend experience with centralized auth and no direct client-to-backend credential exposure.",
      },
    ],
    architecture: {
      summary:
        "The platform splits Next.js (BFF + UI) from an Express modular monolith backed by PostgreSQL — Docker-compose for local/prod parity, not serverless functions.",
      pattern: "Modular monolith backend + Next.js BFF frontend",
      hosting:
        "Docker containers (backend + Postgres); Next.js app separately deployed",
      dataLayer: "PostgreSQL via Prisma ORM with relational supply chain models",
      integrations:
        "Global Forest Watch Data API; geospatial (Turf.js); Docker Compose orchestration",
      highlights: [
        { label: "Microservices?", value: "No — modular monolith" },
        {
          label: "AI / analytics?",
          value: "Vegetation change & deforestation rate tracking",
        },
        { label: "Database", value: "PostgreSQL (relational)" },
        { label: "Frontend pattern", value: "BFF proxy via Next.js route handlers" },
      ],
      diagram: `flowchart LR
  next[NextjsBFF] --> express[ExpressModularMonolith]
  express --> prisma[PrismaORM]
  prisma --> postgres[(PostgreSQL)]
  next --> ui[SupplyChainUI]`,
    },
    gallery: ["/images/golden-logo-icon.svg"],
    links: {},
  },
];

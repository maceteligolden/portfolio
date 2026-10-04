import type { FaqInterface } from "@content/faqs";

export interface ServiceInterface {
  slug: string;
  title: string;
  outcome: string;
  audience: string;
  seoTitle: string;
  metaDescription: string;
  h1: string;
  opening: string;
  includes: string[];
  delivery: string;
  stack: string[];
  relatedProjectSlugs: string[];
  faqs: FaqInterface[];
}

export const services: ServiceInterface[] = [
  {
    slug: "ai-product-development",
    title: "AI products and agents",
    outcome: "An agent, retrieval system, or LLM feature that holds up past a demo.",
    audience:
      "Founders adding AI to a product, and teams that need the system around the model.",
    seoTitle: "AI product development for founders",
    metaDescription:
      "AI product development for founders and teams. Agents, retrieval, and the product around the model, built through to something you can run.",
    h1: "AI product development for founders and teams",
    opening:
      "Founders come to me when a model demo is not enough and the product still has to remember context, retrieve the right information, and stay useful after launch. Companies that already have a product come for the same reason: an agent or LLM feature that has to live inside a real system.",
    includes: [
      "Agents with tools, memory, and a defined job",
      "Retrieval over your own content",
      "Evaluation so you can tell when answers get worse",
      "The interface and API around the model",
      "Production hosting, not a notebook",
    ],
    delivery:
      "We start from the job the model has to do, then I build the context, retrieval, and product around it. You get a system you can run, with the code and a clear path for what happens when it breaks.",
    stack: ["LangGraph", "TypeScript", "Node.js", "PostgreSQL", "OpenAI"],
    relatedProjectSlugs: ["bloggr"],
    faqs: [
      {
        question: "Is this a ChatGPT wrapper?",
        answer:
          "No. Connecting a model to an API is the small part. The work is context, retrieval, tools, evaluation, and the product experience that makes the model useful.",
      },
      {
        question: "Can you add AI to a product we already have?",
        answer:
          "Yes. The same build applies inside an existing product: an agent or retrieval feature that uses your data and fits the system you already run.",
      },
      {
        question: "What does a first version include?",
        answer:
          "A narrow job for the model, the data it is allowed to use, a way to tell if the answers are getting worse, and an interface someone can actually use.",
      },
    ],
  },
  {
    slug: "backend-engineering",
    title: "Backend systems and APIs",
    outcome: "APIs, data, and cloud a product can actually run on.",
    audience: "Teams that need TypeScript and Node.js systems they can operate.",
    seoTitle: "Backend and API development",
    metaDescription:
      "Backend and API development in TypeScript and Node.js. APIs, PostgreSQL, authentication, and AWS for founders and teams with a product to run.",
    h1: "Backend and API development",
    opening:
      "Teams come to me when the product needs APIs, data, authentication, and cloud they can operate. That includes founders building a first version and companies that already have a product and need the backend to hold up.",
    includes: [
      "API design in TypeScript and Node.js",
      "PostgreSQL data models and access patterns",
      "Authentication and role-based access",
      "AWS, containers, and a deploy you can repeat",
      "Logging and the path for when something fails",
    ],
    delivery:
      "I design the API and data model around the product, then build the service, auth, and deployment. You leave with a system your team can run, not a diagram that only works once.",
    stack: ["TypeScript", "Node.js", "PostgreSQL", "AWS", "Docker"],
    relatedProjectSlugs: ["supply-chain-platform", "watchnode"],
    faqs: [
      {
        question: "Do you work in an existing codebase?",
        answer:
          "Yes. A lot of this work is inside a product that already has users: new APIs, a clearer data model, auth, or the infrastructure the current system has outgrown.",
      },
      {
        question: "Which stack do you build on?",
        answer:
          "TypeScript and Node.js are home base, with PostgreSQL and AWS. I will say so early if the project needs a different runtime.",
      },
      {
        question: "Will we be able to operate it?",
        answer:
          "Yes. Handover includes the code, how it is deployed, and what to check when it breaks. A backend nobody else can run is not finished.",
      },
    ],
  },
  {
    slug: "mvp-development",
    title: "MVPs and product builds",
    outcome: "The interface, the API, and a deployment you can put in front of users.",
    audience: "Founders who have the problem and need the product built.",
    seoTitle: "MVP development for founders",
    metaDescription:
      "MVP development for founders. I build the interface, API, and deployment so a first version can go in front of users.",
    h1: "MVP development for founders",
    opening:
      "You have the problem and the user. I build the interface, the API, and the deployment so you can put a first version in front of people. This is for founders and small teams who need a product, not a slide deck.",
    includes: [
      "A Next.js interface for the core workflow",
      "The API and data model behind it",
      "Authentication for the people who will use it",
      "Deployment you can put a real user on",
      "A scope small enough to ship",
    ],
    delivery:
      "We cut the product to the workflow that proves the idea, then I build that slice through the interface, API, and deployment. You can show it to users without waiting on a second team to wire it up.",
    stack: ["Next.js", "React", "TypeScript", "Node.js"],
    relatedProjectSlugs: ["bloggr", "simple-assessment"],
    faqs: [
      {
        question: "How small should the first version be?",
        answer:
          "Small enough that one workflow works end to end. If the brief needs accounts, billing, admin, and three user types before anyone can try it, we cut it back before building.",
      },
      {
        question: "Do you design as well as build?",
        answer:
          "I design the product flow and the interface that ships with the build. If you already have a designer, I implement from that work.",
      },
      {
        question: "Can this include AI?",
        answer:
          "Yes, when the product needs it. The AI work is the same as a dedicated AI build: context, retrieval, and a feature someone can use, not a prompt box on the homepage.",
      },
    ],
  },
];

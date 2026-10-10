import type { FaqInterface } from "@content/faqs";

export interface ServiceInterface {
  slug: string;
  hub: boolean;
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
  supportingServiceSlug?: string;
  faqs: FaqInterface[];
}

export const services: ServiceInterface[] = [
  {
    slug: "workflow-automation",
    hub: true,
    title: "Workflow automation",
    outcome:
      "A repeated process that runs, with a person approving anything that goes out.",
    audience:
      "You, if you answer clients, follow up, or repeat the same operational step by hand.",
    seoTitle: "Workflow automation for client follow-up and business processes",
    metaDescription:
      "Workflow automation for a repeated business process. Answering clients, follow-up, and the steps in between, with a person approving anything that goes out.",
    h1: "I can automate a process you keep repeating",
    opening:
      "You have a step you do over and over. I build the trigger, the system that does the step, and a place for you to approve anything that leaves. That includes answering clients and following up with them. I have shipped this shape of system for publishing, exams, and alerts.",
    includes: [
      "A named process: reply, follow-up, publish, grade, or alert",
      "The trigger and the data the step is allowed to use",
      "A human checkpoint before anything is sent or published",
      "The interface for the person who runs it",
      "A deployment you can put a real queue of work on",
    ],
    delivery:
      "We name the process and the step you must approve. I build the trigger, the work the system does, and the screen for that approval. You can run it on a real queue of clients, drafts, or alerts.",
    stack: ["TypeScript", "Node.js", "Next.js", "PostgreSQL"],
    relatedProjectSlugs: ["bloggr", "simple-assessment", "watchnode"],
    faqs: [
      {
        question: "Can this answer clients and follow up with them?",
        answer:
          "Yes. Replying and following up are the usual jobs. The system drafts or sends the step, and you approve anything that goes out.",
      },
      {
        question: "What have you already shipped that works this way?",
        answer:
          "Bloggr researches and drafts, then publishes only after approval. Simple Assessment delivers a timed exam and grades it on the server. WatchNode ingested logs and spreadsheets, scored them, and raised an alert. That product is no longer online.",
      },
      {
        question: "Will it email people with no review?",
        answer:
          "Anything that leaves is held for you to approve. A workflow that sends on its own, with no checkpoint, is a different brief, and we would scope that on purpose.",
      },
    ],
  },
  {
    slug: "mvp-development",
    hub: true,
    title: "Custom fullstack software",
    outcome:
      "The interface, the API, the data, and a deployment you can put in front of users.",
    audience:
      "You, if you need a product built, including a first version small enough to ship.",
    seoTitle: "Custom fullstack software and MVP development",
    metaDescription:
      "Custom fullstack software and MVP development. I build the interface, API, data model, authentication, and deployment, including a first version small enough to ship.",
    h1: "I can build the software, from the screen to the deployment",
    opening:
      "You have the problem and the person who will use it. I build the interface, the API, the data model, authentication, and the deployment, so you can put a first version in front of people. The same build is how I take custom software further when it needs to run past that first release.",
    includes: [
      "A Next.js interface for the core workflow",
      "The API and data model behind it",
      "Authentication and role-based access for the people who will use it",
      "Deployment you can put a real user on",
      "A scope small enough to ship",
    ],
    delivery:
      "We cut the product to the workflow that proves the idea, then I build that slice through the interface, API, and deployment. You can show it to people without waiting on a second team to wire it up.",
    stack: ["Next.js", "React", "TypeScript", "Node.js", "PostgreSQL"],
    relatedProjectSlugs: ["supply-chain-platform", "watchnode", "simple-assessment"],
    supportingServiceSlug: "backend-engineering",
    faqs: [
      {
        question: "How small should the first version be?",
        answer:
          "Small enough that one workflow works end to end. If the brief needs accounts, billing, admin, and three user types before anyone can try it, I will cut it back with you before I build.",
      },
      {
        question: "Do you design as well as build?",
        answer:
          "I design the product flow and the interface that ships with the build. If you already have a designer, I implement from their work.",
      },
      {
        question: "Can this include AI?",
        answer:
          "Yes, when your product needs it. Adding a chat agent, retrieval, or scoring to a site you already run is a separate offer, and the same engineering applies inside a new build.",
      },
    ],
  },
  {
    slug: "ai-product-development",
    hub: true,
    title: "AI on an existing website",
    outcome:
      "A chat agent, retrieval, or scoring model inside a product you already run.",
    audience:
      "You, if you already have a website or product and you want an AI feature in it.",
    seoTitle: "Add a chatbot or AI feature to an existing website",
    metaDescription:
      "Add a chatbot or AI feature to an existing website. Chat agents with a defined job, retrieval over your content, and scoring inside a product you already run.",
    h1: "I can add a chatbot or an AI feature to a site you already have",
    opening:
      "You already have a website or a product. I add the model where it has a job: a chat agent that can use your content, or retrieval over what you already published. Bloggr keeps a business profile and drafts from it. WatchNode is a separate system I built to score logs and spreadsheets. It is not online now.",
    includes: [
      "A chat agent with a defined job, tools, and memory",
      "Retrieval over content the business already has",
      "Scoring inside the product, such as anomalies in logs or spreadsheets",
      "The interface and API around the model",
      "Production hosting, not a notebook",
    ],
    delivery:
      "We start from the job the model has to do inside the system you already run. I build the context, the retrieval or scoring, and the surface around it. You get a feature you can operate, with the code and a path for when it breaks.",
    stack: ["LangGraph", "TypeScript", "Node.js", "PostgreSQL", "OpenAI"],
    relatedProjectSlugs: ["bloggr", "watchnode"],
    faqs: [
      {
        question: "Is this a ChatGPT wrapper?",
        answer:
          "No. Connecting a model to an API is the small part. The work is the job, the content it is allowed to use, the tools, and the experience that makes the answer useful to you. A chatbot is the interface. The system behind it is what I build.",
      },
      {
        question: "Can you add this to a site we already run?",
        answer:
          "Yes. That is this offer. The agent, the retrieval, or the score has to fit the product and the data you already have.",
      },
      {
        question: "What does a first version include?",
        answer:
          "A narrow job for the model, the data it is allowed to use, a way to tell if the answers or scores are getting worse, and an interface someone can actually use.",
      },
    ],
  },
  {
    slug: "backend-engineering",
    hub: false,
    title: "Backend systems and APIs",
    outcome: "APIs, data, and cloud a product can actually run on.",
    audience: "You, if you need the API and the data layer, in TypeScript and Node.js.",
    seoTitle: "Node.js and TypeScript backend and API development",
    metaDescription:
      "Node.js and TypeScript backend development. APIs, PostgreSQL, authentication, and AWS for a product that already has a direction.",
    h1: "I can build the API, the data, and the cloud behind your product",
    opening:
      "If you only need the back of the product, I build that: TypeScript, Node.js, PostgreSQL, authentication, and AWS. It fits a product you already run, and it is the back half of a fullstack build when the interface is already in hand.",
    includes: [
      "API design in TypeScript and Node.js",
      "PostgreSQL data models and access patterns",
      "Authentication and role-based access",
      "AWS, containers, and a deploy you can repeat",
      "Logging and the path for when something fails",
    ],
    delivery:
      "I design the API and data model around your product, then build the service, auth, and deployment. You leave with a system your team can run, not a diagram that only works once.",
    stack: ["TypeScript", "Node.js", "PostgreSQL", "AWS", "Docker"],
    relatedProjectSlugs: ["supply-chain-platform", "watchnode"],
    faqs: [
      {
        question: "Do you work in an existing codebase?",
        answer:
          "Yes. A lot of this work is inside a product you already have users on: new APIs, a clearer data model, auth, or the infrastructure the current system has outgrown.",
      },
      {
        question: "Which stack do you build on?",
        answer:
          "TypeScript and Node.js are home base, with PostgreSQL and AWS. I will tell you early if your project needs a different runtime.",
      },
      {
        question: "Will we be able to operate it?",
        answer:
          "Yes. I hand you the code, how it is deployed, and what to check when it breaks. A backend your team cannot run is not finished.",
      },
    ],
  },
];

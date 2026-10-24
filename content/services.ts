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
      "A new lead lands in a spreadsheet. A routine email gets a reply. The right person hears when a message needs them.",
    audience:
      "You, if someone on your team retypes enquiries, answers the same email, or chases a follow-up by hand.",
    seoTitle: "Workflow automation for leads, email, and follow-up",
    metaDescription:
      "Workflow automation for a new lead in a spreadsheet, a routine email reply, and a note to the right person when a message needs them.",
    h1: "The repeated work, running without you",
    opening:
      "Three jobs show up again and again. A new enquiry has to be written into a spreadsheet. A routine email needs the answer you already give. Someone has to be told when a message actually needs a person. I build that workflow. A different repeated step can be scoped the same way on a call.",
    includes: [
      "A new enquiry written into a spreadsheet, with the columns you already use. Nobody retypes the form.",
      "A reply to a routine email, from answers you already give. An unusual email waits for a person.",
      "A note to the right person when a lead or a message needs them, and a follow-up if nobody answered.",
    ],
    delivery:
      "We name the step, the trigger, and what still needs a person. What counts as a routine email is agreed before anything sends on its own. This is a new build for your process. Bloggr, WatchNode, and the supply-chain platform are not this workflow. I have shipped software a client used. That is the record that the work gets delivered, not a signup for this one.",
    stack: ["TypeScript", "Spreadsheets", "Email"],
    relatedProjectSlugs: [],
    faqs: [
      {
        question: "Will it email people with no review?",
        answer:
          "A routine email can go out. An unusual one waits for a person. We agree what counts as routine before anything sends on its own.",
      },
      {
        question: "Can the lead go into the spreadsheet we already use?",
        answer:
          "Yes. The workflow writes into the columns you already use. Nobody retypes the form.",
      },
      {
        question: "What if the step is not a lead or an email?",
        answer:
          "Say what the step is on the call. If it is the same action every time, we can scope it the same way. It does not need its own page.",
      },
    ],
  },
  {
    slug: "mvp-development",
    hub: false,
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
    title: "A chatbot for repetitive questions",
    outcome:
      "Staff or customers ask in chat. The questions you answer twice get an answer from your documents. A unique case still comes to a person.",
    audience:
      "You, if your team keeps answering the same questions from documents you already have.",
    seoTitle: "A chatbot that answers from your documents",
    metaDescription:
      "Upload documents or connect cloud storage such as Google Cloud Storage. People ask in chat. Repetitive questions are answered. A unique case goes to a person.",
    h1: "A chatbot for the questions you answer twice",
    opening:
      "Your team already has the answer, in a document or a folder. People still ask a person. I build a chatbot that answers the repetitive ones from those files. You upload the documents, or connect a folder in cloud storage such as Google Cloud Storage. Staff or customers ask in chat. A unique case is handed to a person, with the question attached. It is not a ChatGPT window with your logo. An answer should be able to show the document it used.",
    includes: [
      "A place to upload documents, or a connection to a folder in cloud storage such as Google Cloud Storage",
      "A chat where staff or customers ask",
      "Answers for the questions that come up again and again, with the document the answer came from",
      "A handoff when the question is a unique case, with the question attached",
    ],
    delivery:
      "We name the repetitive questions and what counts as unique. I connect the documents, build the chat, and the handoff. Bloggr is the closest system I have shipped. It keeps a business profile and uses that knowledge in a conversation. It does not upload a document folder, and it does not connect to Google Cloud Storage. This chatbot is that kind of system, built for answers instead of posts.",
    stack: ["TypeScript"],
    relatedProjectSlugs: ["bloggr"],
    faqs: [
      {
        question: "Where do the files live?",
        answer:
          "You upload documents, or connect a folder in cloud storage such as Google Cloud Storage. The chatbot answers from those files. It does not invent a policy you do not have.",
      },
      {
        question: "What counts as a unique case?",
        answer:
          "A question your team does not already answer the same way. That one is handed to a person, with the question attached. The repetitive ones are answered in chat.",
      },
      {
        question: "Can people ask from where they already are?",
        answer:
          "Yes. Staff or customers ask in chat. We put that chat where they already work, or on a site you already run.",
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

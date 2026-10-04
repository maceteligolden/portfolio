export interface FaqInterface {
  question: string;
  answer: string;
}

export const homeFaqs: FaqInterface[] = [
  {
    question: "Who is this for?",
    answer:
      "Founders and small teams who need a product, an AI system, or a backend built. Companies that already have a product and need an AI or backend project are a fit too.",
  },
  {
    question: "What does an engagement look like?",
    answer:
      "It starts with a short brief or a 30-minute intro. If the work is a fit, I scope it in writing, build in short cycles, and hand over the code with how to run it.",
  },
  {
    question: "What do you not take on?",
    answer:
      "Staff augmentation with no defined outcome, work outside software and AI products, and projects that need a large team on day one. If the problem is still unclear, the intro call is where we find out.",
  },
  {
    question: "How do I start?",
    answer:
      "Send a short brief through Start a project, or book the 30-minute intro. I reply by email.",
  },
];

export interface FaqInterface {
  question: string;
  answer: string;
}

export const aboutFaqs: FaqInterface[] = [
  {
    question: "Are these the only tools you use?",
    answer:
      "No. The list on this page is what I use day to day. I use what the problem needs. The case studies show where a tool was used.",
  },
];

export const blogFaqs: FaqInterface[] = [
  {
    question: "Are these the case studies?",
    answer:
      "No. These are notes on the engineering. The case studies are on the work page. If you need something built, or you are hiring, the buttons on this page go to the contact form.",
  },
];

export const homeFaqs: FaqInterface[] = [
  {
    question: "Who is this for?",
    answer:
      "You, if you need a repeated process automated, a product built, or AI added to a site you already run. If you are shipping a first version, that fits too.",
  },
  {
    question: "What does working with me look like?",
    answer:
      "You send a short brief, or we talk for 30 minutes. If the work is a fit, I scope it in writing, build in short cycles, and hand you the code with how to run it.",
  },
  {
    question: "What do you not take on?",
    answer:
      "I do not take staff augmentation with no defined outcome, work outside software and AI products, or a project that needs a large team on day one. If the problem is still unclear, the intro call is where we find that out.",
  },
  {
    question: "How do I start?",
    answer:
      "Send me a short brief, or book the 30-minute intro. I read it and reply by email.",
  },
  {
    question: "Can we start with a call?",
    answer:
      "Yes. Book the 30-minute intro if you would rather talk before you write a brief. I use that call to see whether I am the right person for the work.",
  },
  {
    question: "Do you work inside a codebase we already have?",
    answer:
      "Yes. A lot of the work is inside a product you already run: a new workflow, a clearer API, or an AI feature that has to fit what you have.",
  },
];

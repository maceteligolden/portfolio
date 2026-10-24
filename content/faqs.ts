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
    question: "Where do the chatbot's files live?",
    answer:
      "You upload documents, or connect a folder in cloud storage such as Google Cloud Storage. The chatbot answers from those files.",
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
  {
    question: "Will a workflow email people on its own?",
    answer:
      "A routine email can. An unusual one waits. We agree what counts as routine before anything sends on its own.",
  },
  {
    question: "How do I start?",
    answer:
      "Send a short note, or book the 30-minute intro. Budget and timing can wait for the call.",
  },
];

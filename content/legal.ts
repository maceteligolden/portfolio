export interface LegalSection {
  heading: string;
  paragraphs: string[];
}

export const privacyPolicy = {
  title: "Privacy",
  updated: "24 October 2026",
  intro:
    "This page says what I collect when you use this site, and what I do with it. I am Golden Mac-Eteli. I am based in the UK. Email maceteligolden@gmail.com if you want a copy of what you sent, a correction, or for it to be deleted.",
  sections: [
    {
      heading: "The contact form",
      paragraphs: [
        "If you send the form, I receive your name, your email, your company, and either the service you want, the role you are hiring for, or your note. A note is optional except where the form says it is required.",
        "That message is emailed to me through Brevo, and the same fields are stored in Notion so I can reply. I keep them for the conversation. I delete them if you ask.",
      ],
    },
    {
      heading: "Booking a call",
      paragraphs: [
        "The schedule page loads Calendly. Calendly collects the details of the booking under its own privacy policy. I see the name, email, and time you book so I can hold the call.",
      ],
    },
    {
      heading: "Analytics, only if you accept",
      paragraphs: [
        "Until you press Accept, this site does not load Google Analytics or Google Ads. Accept lets Google Analytics (G-SYYJK7SCWV) and Google Ads (AW-18493923457) record pages you open, clicks on Schedule and contact, and a conversion when a project lead is sent or a call is booked.",
        "Decline stores that refusal in this browser and those scripts stay unloaded. The form and the booking still work. I do not sell this data.",
      ],
    },
    {
      heading: "The choice itself",
      paragraphs: [
        "Accept or Decline is stored in local storage on your browser, not in a cookie I set. Cookies in the footer opens the bar again so you can change it.",
      ],
    },
  ] satisfies LegalSection[],
};

export const termsOfUse = {
  title: "Terms",
  updated: "24 October 2026",
  intro:
    "These are the terms for this website. I am Golden Mac-Eteli, based in the UK. Questions go to maceteligolden@gmail.com.",
  sections: [
    {
      heading: "What this site is",
      paragraphs: [
        "The pages describe the work I take on: a chatbot that answers repetitive questions from documents, and workflows for a lead, a routine email, and a follow-up. Reading them does not hire me.",
      ],
    },
    {
      heading: "A form or a booking is not a contract",
      paragraphs: [
        "Sending the contact form, or booking the 30-minute intro, is a request. Paid work starts only when both sides agree in writing. An email that names the work, the price, and the timing is enough. Until that exists, neither side owes the other the work or the fee.",
      ],
    },
    {
      heading: "What the pages do not promise",
      paragraphs: [
        "Nothing on this site is a quote, a delivery date, or a promise of a particular result. Case studies describe work that already shipped. They are not an offer to repeat that outcome.",
      ],
    },
    {
      heading: "What you send",
      paragraphs: [
        "Do not send unlawful material through the form or the booking. You are responsible for what you write there, including a job description or a client brief.",
      ],
    },
    {
      heading: "The writing on this site",
      paragraphs: [
        "The text, the case studies, and the blog posts are mine, except where a case study says the client owns the product that was built. You can link to a page. Do not copy a case study or a post and present it as your own.",
      ],
    },
    {
      heading: "Liability",
      paragraphs: [
        "The site is information. I am not liable for a decision you make from these pages, or for a booking that never becomes a project. Nothing here limits liability that the law does not allow me to limit.",
      ],
    },
    {
      heading: "The law",
      paragraphs: [
        "These terms are governed by the laws of England and Wales. The courts of England and Wales hear disputes about them.",
      ],
    },
  ] satisfies LegalSection[],
};

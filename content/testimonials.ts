export interface TestimonialInterface {
  id: string;
  quote: string;
  name: string;
  company: string;
  position: string;
  relationship: string;
  theme: string;
  photo?: string;
  logo?: string;
  featured?: boolean;
  anonymous?: boolean;
}

export const testimonials: TestimonialInterface[] = [
  {
    id: "kadisi-mitee",
    quote:
      "Golden is very hardworking and knowledgeable in the developer space. His passion for building great products shows up in the quality of his output. He is especially knowledgeable in AI tooling and implementation.",
    name: "Kadisi Mitee",
    company: "Sonar",
    position: "Solutions Engineer",
    relationship: "Co-founder",
    theme: "AI tooling",
    featured: true,
  },
  {
    id: "aisha-muhammad",
    quote:
      "Working with Golden was a great experience. As a Project Manager, I worked closely with him in his role as CTO and Tech Lead. He was highly collaborative, hardworking, and dependable, and he consistently supported the team in delivering projects effectively. He also took on responsibilities as a Senior Developer, contributing directly to software applications, websites, and blogs. What stood out most was his ability to combine strong technical leadership with hands-on development. He worked effectively with the development team and with design, marketing, and sales. He was approachable, committed to getting the work done, and easy to work with.",
    name: "Aisha Muhammad",
    company: "Prompt Computers IO LLC",
    position: "Project Manager",
    relationship: "Colleague",
    theme: "Technical leadership",
  },
  {
    id: "demilade-adeyemo",
    quote:
      "I have had a great working relationship with Golden for over 10 years. He is one of the best problem solvers I have come across. His work ethic and customer-centric approach to problem solving is second to none. In all my time working with Golden, there hasn’t been a problem he hasn’t been able to solve or find a workaround to. I can personally attest to his grit, hard work, and determination.",
    name: "Demilade Adeyemo",
    company: "Sodexo",
    position: "Tech Project Manager",
    relationship: "Co-founder of two startups",
    theme: "Problem solving",
  },
  {
    id: "ewa-adeyemo",
    quote:
      "Golden was always very professional and reliable. What stood out was his willingness to support, all the time.",
    name: "Ewa Adeyemo",
    company: "Maturis GmbH",
    position: "Director of Operations",
    relationship: "Client",
    theme: "Reliable support",
  },
  {
    id: "anonymous-colleague",
    quote: "Very professional. What stood out was his leadership.",
    name: "Anonymous",
    company: "",
    position: "Mobile Developer",
    relationship: "Colleague",
    theme: "Leadership",
    anonymous: true,
  },
];

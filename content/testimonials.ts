export interface TestimonialInterface {
  id: string;
  quote: string;
  name: string;
  company: string;
  position: string;
  photo?: string;
  logo?: string;
  featured?: boolean;
}

export const testimonials: TestimonialInterface[] = [
  {
    id: "1",
    quote:
      "Golden delivered a production-ready AI pipeline that exceeded our expectations. His backend architecture was clean, scalable, and well-documented.",
    name: "Alex Chen",
    company: "TechVentures Inc.",
    position: "CTO",
    featured: true,
  },
  {
    id: "2",
    quote:
      "From system design to deployment, Golden handled our entire backend rebuild. The API performance improvements were measurable within weeks.",
    name: "Sarah Mitchell",
    company: "DataFlow Systems",
    position: "Engineering Lead",
    featured: true,
  },
  {
    id: "3",
    quote:
      "Working with Golden on our RAG implementation saved us months of trial and error. He brought production-grade evaluation and monitoring from day one.",
    name: "James Okonkwo",
    company: "AI Labs",
    position: "Product Manager",
    featured: true,
  },
  {
    id: "4",
    quote:
      "Golden shipped our MVP faster than any contractor we've worked with, without cutting corners on code quality or architecture.",
    name: "Maria Santos",
    company: "StartupForge",
    position: "Founder",
  },
  {
    id: "5",
    quote:
      "His ability to bridge AI research concepts with practical backend engineering made him invaluable to our team.",
    name: "David Park",
    company: "CloudScale",
    position: "VP Engineering",
  },
];

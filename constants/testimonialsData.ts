import { ClientTestimonial } from "@/types/testimonial";

export const TESTIMONIALS_DATA: ClientTestimonial[] = [
  {
    id: "adp-testimonial",
    companyName: "ADP Enterprise",
    companyLogo: "ADP",
    quote:
      "When our data engineering teams were transitioning to real-time analytics, generic online courses weren't working. Accredian co-designed a curriculum using our actual data pipelines. Within 6 weeks, our engineers reduced dashboard query latency by 42%.",
    authorName: "Sarah Jenkins",
    authorTitle: "VP of Learning & Capability, ADP",
    authorAvatar: "SJ",
    impactMetrics: "42% Query Speedup & 35% Faster Reporting",
  },
  {
    id: "bayer-testimonial",
    companyName: "Bayer Lifesciences",
    companyLogo: "Bayer",
    quote:
      "Accredian didn't just give us recorded lectures — their instructors ran live code reviews on our internal RAG pipelines. Our clinical analysts learned how to pass SOC-2 infosec audits while building LLM applications.",
    authorName: "Dr. Vikram Kulkarni",
    authorTitle: "Global Head of Digital Health, Bayer",
    authorAvatar: "VK",
    impactMetrics: "92% Completion Rate across 450 Engineers",
  },
  {
    id: "reliance-testimonial",
    companyName: "Reliance Industries",
    companyLogo: "Reliance",
    quote:
      "Scaling AI skills across 500+ managers seemed daunting until Accredian stepped in. Their 1-on-1 mentor check-ins and practical capstone projects gave our leaders the exact confidence needed to ship AI tools.",
    authorName: "Rajesh Malhotra",
    authorTitle: "Group General Manager, Talent & Skill Building, Reliance",
    authorAvatar: "RM",
    impactMetrics: "500+ Leaders Certified in Enterprise AI",
  },
  {
    id: "genpact-testimonial",
    companyName: "Genpact Enterprise",
    companyLogo: "Genpact",
    quote:
      "The customized curriculum co-authored by Accredian aligned perfectly with our client deliverables. Our managers immediately applied their sprint learnings to active client accounts, saving over $1.8M in external consulting fees.",
    authorName: "Amanda Torres",
    authorTitle: "Associate Director of Digital Capabilities, Genpact",
    authorAvatar: "AT",
    impactMetrics: "4.9 / 5.0 Cohort Satisfaction Rating",
  },
];

export const TRUSTED_CLIENTS = [
  { name: "ADP", logo: "ADP" },
  { name: "Bayer", logo: "BAYER" },
  { name: "Reliance Industries", logo: "RELIANCE" },
  { name: "Genpact", logo: "GENPACT" },
  { name: "Pramerica", logo: "PRAMERICA" },
  { name: "Insplore", logo: "INSPLORE" },
  { name: "Tech Mahindra", logo: "TECHM" },
  { name: "Wipro Enterprise", logo: "WIPRO" },
];

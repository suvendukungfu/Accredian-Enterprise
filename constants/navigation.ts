export interface NavItem {
  label: string;
  href: string;
}

export const NAV_ITEMS: NavItem[] = [
  { label: "Programs", href: "#programs" },
  { label: "Accredian Edge", href: "#edge" },
  { label: "ROI Calculator", href: "#roi-calculator" },
  { label: "Why Us", href: "#comparison" },
  { label: "Case Studies", href: "#case-studies" },
  { label: "CAT Framework", href: "#cat" },
  { label: "FAQs", href: "#faqs" },
];

export const FOOTER_LINKS = {
  solutions: [
    { label: "Generative AI for Leaders", href: "#programs" },
    { label: "Tech & Data Upskilling", href: "#programs" },
    { label: "Leadership Development", href: "#programs" },
    { label: "Operations Management", href: "#programs" },
    { label: "Product Innovation", href: "#programs" },
  ],
  company: [
    { label: "About Accredian", href: "#edge" },
    { label: "Why Partner", href: "#edge" },
    { label: "CAT Framework", href: "#cat" },
    { label: "Client Success Stories", href: "#testimonials" },
    { label: "Corporate Careers", href: "#hero" },
  ],
  resources: [
    { label: "Skill Gap Analysis", href: "#how-it-works" },
    { label: "Executive FAQs", href: "#faqs" },
    { label: "Enterprise Brochure", href: "#hero" },
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
  ],
};

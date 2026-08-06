export interface NavItem {
  label: string;
  href: string;
}

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "#hero" },
  { label: "Stats", href: "#stats" },
  { label: "Clients", href: "#clients" },
  { label: "Accredian Edge", href: "#edge" },
  { label: "CAT Framework", href: "#cat" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "FAQs", href: "#faqs" },
  { label: "Testimonials", href: "#testimonials" },
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

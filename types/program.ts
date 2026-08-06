export type ProgramCategory =
  | "All"
  | "Generative AI"
  | "Leadership Development"
  | "Tech & Data"
  | "Operations Management"
  | "Product Innovation"
  | "Digital Business"
  | "Fintech";

export interface ExecutiveProgram {
  id: string;
  title: string;
  category: ProgramCategory;
  description: string;
  duration: string;
  format: "Live Online" | "In-Person" | "Hybrid Cohort";
  targetAudience: string;
  keyOutcomes: string[];
  featuredBadge?: string;
  accentColor: string;
}

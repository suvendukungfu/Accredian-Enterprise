export type ProgramCategory =
  | "All"
  | "Generative AI"
  | "Leadership Development"
  | "Tech & Data"
  | "Operations Management"
  | "Product Innovation"
  | "Digital Business"
  | "Fintech";

export interface ProgramModule {
  week: string;
  title: string;
  topics: string[];
}

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
  modules?: ProgramModule[];
  techStack?: string[];
  capstoneProject?: {
    title: string;
    description: string;
  };
  prerequisites?: string;
  certificationPartner?: string;
}


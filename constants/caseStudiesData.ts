export interface CaseStudy {
  id: string;
  clientName: string;
  industry: string;
  companySize: string;
  logoInitial: string;
  headline: string;
  metrics: {
    label: string;
    value: string;
    sublabel: string;
  }[];
  challenge: string;
  solution: string;
  results: string[];
  quote: {
    text: string;
    author: string;
    title: string;
  };
}

export const CASE_STUDIES_DATA: CaseStudy[] = [
  {
    id: "global-banking-genai",
    clientName: "Tier 1 Global Investment Bank",
    industry: "Banking & Financial Services",
    companySize: "45,000+ Employees",
    logoInitial: "B",
    headline: "Accelerated LLM & RAG Deployment Across 1,200 Financial Analysts",
    metrics: [
      { label: "Productivity Lift", value: "42%", sublabel: "Faster research reports" },
      { label: "Engineers Upskilled", value: "1,200+", sublabel: "Across 4 global hubs" },
      { label: "Deployment Speed", value: "3x", sublabel: "Faster model production" },
    ],
    challenge: "The bank needed to securely transition from legacy internal research tools to enterprise-grade RAG and generative AI models while adhering to stringent FINRA and SOC-2 security protocols.",
    solution: "Accredian co-created an intensive 8-week 'Generative AI & LLM Engineering' track tailored with hands-on labs using sanitized financial datasets and local vector databases.",
    results: [
      "Built 14 internal RAG tools for automated equity research synthesis",
      "Achieved 100% security compliance sign-off on first audit pass",
      "Reduced external consultant dependence by $2.4M annually",
    ],
    quote: {
      text: "Accredian didn't just teach theory — they helped our engineering cohorts build production-ready RAG pipelines that passed our rigid infosec audits.",
      author: "Marcus Vance",
      title: "Global Head of Engineering & AI, Financial Services",
    },
  },
  {
    id: "healthcare-tech-data",
    clientName: "Fortune 500 Healthcare Enterprise",
    industry: "HealthTech & Lifesciences",
    companySize: "28,000+ Employees",
    logoInitial: "H",
    headline: "Modernized Data Analytics & ML Governance for Clinical Intelligence",
    metrics: [
      { label: "Time-to-Insight", value: "-65%", sublabel: "Query latency reduction" },
      { label: "Cohort Completion", value: "98.2%", sublabel: "Highest internal rating" },
      { label: "Cost Efficiency", value: "$3.8M", sublabel: "Annual cloud savings" },
    ],
    challenge: "Disparate data silos across hospital management systems slowed down clinical trial analytics and increased Snowflake query costs.",
    solution: "Custom 'Executive Data Science & Cloud Analytics' curriculum focused on Snowflake optimization, dbt modeling, and automated ML pipelines.",
    results: [
      "Streamlined 400+ clinical datasets into unified Databricks lakehouse",
      "Cut redundant cloud queries, saving $3.8M in annual compute",
      "Promoted 85 internal analysts to Senior Data Engineer roles",
    ],
    quote: {
      text: "The ROI was evident within 6 weeks. Our team optimized our cloud data architecture and delivered critical clinical insights twice as fast.",
      author: "Dr. Elena Rostova",
      title: "VP of Data & Digital Health",
    },
  },
  {
    id: "retail-saas-leadership",
    clientName: "Omnichannel Retail SaaS Leader",
    industry: "E-Commerce & Retail Tech",
    companySize: "12,000+ Employees",
    logoInitial: "R",
    headline: "Agile Leadership & Digital Mindset Shift for 250+ Directors",
    metrics: [
      { label: "Employee Retention", value: "+34%", sublabel: "In tech leadership" },
      { label: "GTM Velocity", value: "2.4x", sublabel: "Faster feature launches" },
      { label: "NPS Rating", value: "94/100", sublabel: "Executive feedback" },
    ],
    challenge: "Rapid expansion created departmental friction between traditional retail operations and cloud software product engineering squads.",
    solution: "Implemented Accredian's 'Strategic Digital Transformation & Leadership' cohort series, featuring cross-functional OKR alignment and strategic execution blueprints.",
    results: [
      "Synchronized 32 product squads under unified OKR frameworks",
      "Accelerated Q3 feature delivery by 2.4x with zero downtime",
      "Significantly improved leadership cohesion and retention",
    ],
    quote: {
      text: "Accredian's CAT framework provided the exact strategic bridge our legacy managers needed to become agile digital leaders.",
      author: "David Chen",
      title: "Chief Human Resources Officer",
    },
  },
];

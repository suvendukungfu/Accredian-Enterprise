import { ExecutiveProgram } from "@/types/program";

export const PROGRAMS_DATA: ExecutiveProgram[] = [
  {
    id: "gen-ai-enterprise",
    title: "Generative AI & LLM Engineering for Enterprise",
    category: "Generative AI",
    image: "/images/programs/genai.png",
    description: "Master modern AI architecture, RAG systems, fine-tuning open-source models, and operationalizing generative AI for enterprise workflows.",
    duration: "8-12 Weeks",
    format: "Live Online",
    targetAudience: "Engineering Managers, Tech Leads, AI & Software Engineers",
    keyOutcomes: [
      "Deploy production RAG architectures",
      "LLM fine-tuning & prompt engineering",
      "Enterprise AI safety & governance framework",
    ],
    featuredBadge: "High Demand",
    accentColor: "from-blue-600 to-indigo-600",
    techStack: ["PyTorch", "LangChain", "LlamaIndex", "VectorDB (Pinecone/Milvus)", "Ollama", "Hugging Face", "vLLM"],
    prerequisites: "Proficiency in Python and basic understanding of Deep Learning fundamentals.",
    certificationPartner: "Accredian AI Institute & Global Tech Standards Board",
    capstoneProject: {
      title: "Enterprise Multi-Agent Knowledge Engine",
      description: "Architect and deploy an enterprise-ready retrieval-augmented generation pipeline with RBAC security, vector search, and local LLM fallback.",
    },
    modules: [
      {
        week: "Weeks 1-2",
        title: "LLM Foundations & Prompt Engineering Architecture",
        topics: [
          "Transformer Neural Architectures & Attention Mechanisms",
          "Advanced Prompt Techniques: CoT, ReAct, System Prompting",
          "Tokenizer Mechanics & Embedding Spaces",
          "Evaluating LLM Benchmarks (MMLU, HumanEval)",
        ],
      },
      {
        week: "Weeks 3-4",
        title: "Enterprise Retrieval-Augmented Generation (RAG)",
        topics: [
          "Chunking Strategies & Hybrid Vector-Keyword Search",
          "Vector Databases: Milvus, Qdrant, Pinecone Integration",
          "Re-Ranking Models (Cohere, Cross-Encoder)",
          "Hallucination Reduction & Guardrails (NeMo, Guardrails AI)",
        ],
      },
      {
        week: "Weeks 5-6",
        title: "Model Fine-Tuning & Quantization",
        topics: [
          "LoRA, QLoRA, and Parameter-Efficient Fine-Tuning (PEFT)",
          "Dataset Curation & Synthetic Data Generation",
          "Quantization Frameworks (bitsandbytes, GGUF, AWQ)",
          "Model Evaluation & Distillation Techniques",
        ],
      },
      {
        week: "Weeks 7-8",
        title: "Autonomous Agents & Enterprise Production Deployment",
        topics: [
          "Multi-Agent Orchestration with AutoGen & CrewAI",
          "vLLM & TensorRT-LLM High-Throughput Serving",
          "AI Safety, Audit Trails, and SOC-2 Compliance",
          "Capstone Deployment & Performance Benchmarking",
        ],
      },
    ],
  },
  {
    id: "tech-data-leadership",
    title: "Executive Data Science & Big Data Analytics",
    category: "Tech & Data",
    image: "/images/programs/cloud.png",
    description: "Transform raw organization data into strategic business leverage with advanced predictive analytics, ML pipelines, and data governance.",
    duration: "10 Weeks",
    format: "Hybrid Cohort",
    targetAudience: "Data Analysts, Product Managers, BI Directors",
    keyOutcomes: [
      "End-to-end Machine Learning pipelines",
      "Executive data visualization & storytelling",
      "Cloud data infrastructure strategy",
    ],
    featuredBadge: "Co-Created",
    accentColor: "from-cyan-600 to-blue-600",
    techStack: ["Python", "Snowflake", "Databricks", "Apache Spark", "scikit-learn", "Tableau", "dbt"],
    prerequisites: "Basic knowledge of SQL and statistics.",
    certificationPartner: "Data Science Council & Enterprise Analytics Alliance",
    capstoneProject: {
      title: "Real-Time Churn & Lifetime Value Prediction Pipeline",
      description: "Build an automated machine learning pipeline on Databricks/Snowflake that predicts customer churn probability and triggers automated retention workflows.",
    },
    modules: [
      {
        week: "Weeks 1-3",
        title: "Data Engineering & Cloud Data Warehousing",
        topics: [
          "Modern Data Stack: Snowflake, Databricks, and dbt",
          "Data Modeling (Kimball, Data Vault) & ETL Pipeline Design",
          "Data Governance, Lineage, and Cataloging",
        ],
      },
      {
        week: "Weeks 4-6",
        title: "Predictive Analytics & Applied Machine Learning",
        topics: [
          "Regression, Classification, and Ensembles (XGBoost)",
          "Feature Engineering & Automated Feature Stores",
          "Model Evaluation Metrics (AUC-ROC, Precision/Recall)",
        ],
      },
      {
        week: "Weeks 7-10",
        title: "MLOps & Executive Decision Support",
        topics: [
          "MLflow & Model Lifecycle Management",
          "A/B Testing Frameworks & Causal Inference",
          "Executive Dashboarding & ROI Storytelling",
        ],
      },
    ],
  },
  {
    id: "strategic-leadership",
    title: "Strategic Digital Transformation & Leadership",
    category: "Leadership Development",
    image: "/images/programs/leadership.png",
    description: "Equip senior leaders with the mindset, tools, and change management strategies to lead digital-first enterprise organizations.",
    duration: "6 Weeks",
    format: "In-Person",
    targetAudience: "VPs, Directors, CXOs, L&D Heads",
    keyOutcomes: [
      "Digital business model innovation",
      "Agile transformation frameworks",
      "Cross-functional strategic execution",
    ],
    featuredBadge: "Executive Level",
    accentColor: "from-indigo-600 to-purple-600",
    techStack: ["Jira Enterprise", "Miro", "OKR Software", "Strategic Canvas", "Scenario Planning Tools"],
    prerequisites: "5+ years of managerial or cross-functional leadership experience.",
    certificationPartner: "Global Executive Leadership Forum",
    capstoneProject: {
      title: "Enterprise Digital Roadmap & Organizational Change Blueprint",
      description: "Develop a 3-year digital transformation strategy and change adoption matrix for a multi-business unit enterprise.",
    },
    modules: [
      {
        week: "Weeks 1-2",
        title: "Digital Business Models & Platform Strategy",
        topics: [
          "Disruptive Digital Platform Ecosystems",
          "Evaluating Emerging Tech: GenAI, Cloud, IoT",
          "Customer Experience (CX) Architecture",
        ],
      },
      {
        week: "Weeks 3-4",
        title: "Agile Leadership & Organizational Culture",
        topics: [
          "Building High-Velocity Cross-Functional Squads",
          "Leading Through Ambiguity & Resistance",
          "Data-Driven Decision Making & OKRs",
        ],
      },
      {
        week: "Weeks 5-6",
        title: "Governance, Risk & Strategic Execution",
        topics: [
          "Cybersecurity Governance for Boardrooms",
          "Capital Allocation for Digital Initiatives",
          "Presenting the Transformation Blueprint",
        ],
      },
    ],
  },
  {
    id: "product-innovation",
    title: "AI-Powered Enterprise Product Management",
    category: "Product Innovation",
    description: "Build, launch, and scale market-leading products integrating AI capabilities, user-centric discovery, and data-backed roadmaps.",
    duration: "8 Weeks",
    format: "Live Online",
    targetAudience: "Product Managers, Growth Leads, Strategy Managers",
    keyOutcomes: [
      "AI product lifecycle strategy",
      "User research & rapid prototyping",
      "Product metrics & growth loops",
    ],
    accentColor: "from-emerald-600 to-teal-600",
    techStack: ["Productboard", "Figma", "Mixpanel", "Amplitude", "OpenAI API", "Postman"],
    prerequisites: "Prior product management or tech project lead experience recommended.",
    certificationPartner: "Product Management Institute for Enterprise",
    capstoneProject: {
      title: "AI Copilot Feature Launch & Product Growth Strategy",
      description: "Design an end-to-end product requirements document (PRD), interactive prototype, and GTM launch plan for an AI copilot feature.",
    },
    modules: [
      {
        week: "Weeks 1-2",
        title: "Product Discovery & AI Opportunity Identification",
        topics: [
          "Jobs-to-be-Done (JTBD) Framework for Enterprise UX",
          "Identifying Deterministic vs Generative AI Features",
          "Technical Feasibility & ROI Assessment",
        ],
      },
      {
        week: "Weeks 3-5",
        title: "Prototyping, Telemetry & Product Analytics",
        topics: [
          "Figma Prototyping for AI Interactions",
          "Defining Product North Star Metrics",
          "Event Tracking & Mixpanel/Amplitude Integration",
        ],
      },
      {
        week: "Weeks 6-8",
        title: "GTM Strategy & Product Scaling",
        topics: [
          "Product-Led Growth (PLG) for B2B Enterprise",
          "Pricing Strategy & Usage-Based Monetization",
          "Capstone PRD Defense & Launch Roadmap",
        ],
      },
    ],
  },
  {
    id: "operations-excellence",
    title: "Operational Excellence & Agile Logistics",
    category: "Operations Management",
    description: "Streamline cross-enterprise supply chains, automate routine workflows, and foster continuous process optimization across departments.",
    duration: "6 Weeks",
    format: "Live Online",
    targetAudience: "Operations Directors, Supply Chain Leads, Process Owners",
    keyOutcomes: [
      "Lean & Agile operations framework",
      "RPA & process automation strategy",
      "Cost-efficiency & KPI tracking",
    ],
    accentColor: "from-amber-600 to-orange-600",
    techStack: ["UiPath", "Celonis (Process Mining)", "SAP S/4HANA", "Python", "PowerBI"],
    prerequisites: "Familiarity with corporate operational workflows.",
    certificationPartner: "Institute for Supply Chain & Operational Resilience",
    capstoneProject: {
      title: "Enterprise Process Automation & Cost-Reduction Audit",
      description: "Analyze an end-to-end enterprise operational workflow using Celonis process mining and implement a UiPath bot automation plan.",
    },
    modules: [
      {
        week: "Weeks 1-2",
        title: "Process Mining & Bottleneck Identification",
        topics: [
          "Celonis & Automated Process Discovery",
          "Value Stream Mapping & Cycle Time Reduction",
          "Root Cause Analysis & Six Sigma Principles",
        ],
      },
      {
        week: "Weeks 3-4",
        title: "Robotic Process Automation (RPA) & Intelligent Workflows",
        topics: [
          "UiPath Architecture & Bot Development",
          "Document Understanding & Intelligent OCR",
          "Human-in-the-Loop Workflow Automation",
        ],
      },
      {
        week: "Weeks 5-6",
        title: "Agile Supply Chain Resilience & KPI Management",
        topics: [
          "Predictive Maintenance & Demand Forecasting",
          "Vendor Risk & ESG Supply Chain Compliance",
          "Final Operational Excellence Defense",
        ],
      },
    ],
  },
  {
    id: "fintech-innovation",
    title: "Fintech, Blockchain & Enterprise Payments",
    category: "Fintech",
    description: "Navigate global financial technology disruptions, open banking APIs, compliance technology, and digital ledger architectures.",
    duration: "8 Weeks",
    format: "Hybrid Cohort",
    targetAudience: "Finance Managers, Banking Innovation Teams, Risk Officers",
    keyOutcomes: [
      "Open API & Embedded Finance models",
      "RegTech compliance & security",
      "Digital payment infrastructure strategy",
    ],
    accentColor: "from-violet-600 to-blue-600",
    techStack: ["Stripe API", "Plaid", "Ethereum/Hyperledger", "Postman", "AWS Financial Services"],
    prerequisites: "Basic financial services or software understanding.",
    certificationPartner: "Global Fintech & Digital Banking Council",
    capstoneProject: {
      title: "Embedded Payment Architecture & Automated Compliance Engine",
      description: "Architect an open banking API payload and automated AML/KYC risk-scoring microservice.",
    },
    modules: [
      {
        week: "Weeks 1-3",
        title: "Open Banking & API Ecosystems",
        topics: [
          "PSD2 & Open Banking Standards",
          "Plaid & Stripe API Integrations",
          "Real-Time Cross-Border Settlement",
        ],
      },
      {
        week: "Weeks 4-6",
        title: "RegTech, AML & AI Fraud Detection",
        topics: [
          "Machine Learning for Transaction Monitoring",
          "Automated KYC & Digital Identity Protocols",
          "Regulatory Sandbox Testing",
        ],
      },
      {
        week: "Weeks 7-8",
        title: "Enterprise Blockchain & Digital Assets",
        topics: [
          "Permissioned Ledgers (Hyperledger Fabric)",
          "Smart Contracts & Settlement Automation",
          "Capstone Fintech Product Architecture",
        ],
      },
    ],
  },
];

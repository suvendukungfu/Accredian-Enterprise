"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Building2, Stethoscope, Cpu, Factory, ArrowRight, CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Button } from "@/components/ui/Button";

interface IndustryTab {
  id: string;
  label: string;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  metrics: {
    label: string;
    value: string;
  }[];
}

const INDUSTRIES: IndustryTab[] = [
  {
    id: "it-software",
    label: "IT & Software",
    icon: <Cpu className="w-5 h-5" />,
    title: "Software Engineering & Cloud Scale",
    subtitle: "Accelerating DevSecOps, Microservices, and GenAI Tooling",
    description:
      "Modernize legacy monolithic codebases by upskilling engineering squads in cloud-native microservices, automated CI/CD pipelines, and LLM code completion tools.",
    highlights: [
      "100% cloud migration readiness",
      "Automated code review & security linting",
      "Accelerated sprint velocity by 2.4x",
    ],
    metrics: [
      { label: "Sprint Speed", value: "+42%" },
      { label: "Engineers Trained", value: "15,000+" },
    ],
  },
  {
    id: "banking-finance",
    label: "Banking & Financial Services",
    icon: <Building2 className="w-5 h-5" />,
    title: "Fintech & Algorithmic Intelligence",
    subtitle: "SOC-2 & FINRA Compliant RAG Pipelines",
    description:
      "Empower financial analysts and quantitative developers to build secure, audited retrieval-augmented generation engines for instant market research synthesis.",
    highlights: [
      "FINRA & SOC-2 compliance sign-off",
      "Sanitized internal vector databases",
      "Saved 14 hours/week per analyst",
    ],
    metrics: [
      { label: "Research Speed", value: "3.2x" },
      { label: "Audit Pass Rate", value: "100%" },
    ],
  },
  {
    id: "healthcare",
    label: "Healthcare & Lifesciences",
    icon: <Stethoscope className="w-5 h-5" />,
    title: "Clinical Data Science & Governance",
    subtitle: "HIPAA Compliant Analytics & Predictive Modeling",
    description:
      "Consolidate fragmented patient records and clinical trial datasets into unified Snowflake/Databricks lakehouses to accelerate drug discovery pipelines.",
    highlights: [
      "HIPAA-compliant data governance",
      "Reduced cloud query costs by $3.8M",
      "Promoted 85 internal data analysts",
    ],
    metrics: [
      { label: "Query Latency", value: "-65%" },
      { label: "Cloud Savings", value: "$3.8M" },
    ],
  },
  {
    id: "manufacturing",
    label: "Manufacturing & Industrial",
    icon: <Factory className="w-5 h-5" />,
    title: "Industrial IoT & Predictive Maintenance",
    subtitle: "Smart Factory Automation & Supply Chain AI",
    description:
      "Train plant managers and industrial engineers in predictive equipment failure modeling, supply chain routing optimization, and digital twin analytics.",
    highlights: [
      "Reduced unplanned downtime by 38%",
      "Real-time sensor anomaly detection",
      "Optimized inventory turnover velocity",
    ],
    metrics: [
      { label: "Downtime Cut", value: "38%" },
      { label: "Factories Scaled", value: "45+" },
    ],
  },
];

interface UseCasesProps {
  onOpenEnquireModal?: (options?: { domain?: string; message?: string }) => void;
}

export const UseCasesSection: React.FC<UseCasesProps> = ({ onOpenEnquireModal }) => {
  const [activeTabId, setActiveTabId] = useState<string>("it-software");

  const activeTab = INDUSTRIES.find((tab) => tab.id === activeTabId) || INDUSTRIES[0];

  return (
    <section id="use-cases" className="py-20 sm:py-28 bg-white dark:bg-slate-950 transition-colors">
      <Container>
        <SectionHeading
          badgeText="Sectors Served"
          title="Tailored Solutions for"
          highlightText="Every Industry"
          subtitle="Discover how Accredian Enterprise customized curriculums address unique technical and compliance challenges across key global sectors."
        />

        {/* Tab Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {INDUSTRIES.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTabId(tab.id)}
              className={`px-5 py-3 rounded-2xl font-bold text-sm flex items-center gap-2.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                activeTabId === tab.id
                  ? "bg-blue-600 text-white shadow-xl shadow-blue-600/30 scale-105"
                  : "bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-800"
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content Display Card */}
        <div className="max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              {/* Left Details */}
              <div className="lg:col-span-7 flex flex-col items-start gap-4">
                <span className="text-xs uppercase font-bold tracking-widest text-blue-600 dark:text-blue-400">
                  {activeTab.subtitle}
                </span>

                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                  {activeTab.title}
                </h3>

                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                  {activeTab.description}
                </p>

                <div className="flex flex-col gap-2.5 pt-2 w-full">
                  {activeTab.highlights.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 text-sm font-semibold text-slate-800 dark:text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4">
                  <Button
                    variant="gradient"
                    size="md"
                    onClick={() =>
                      onOpenEnquireModal?.({
                        domain: activeTab.label,
                        message: `Enquiring for custom ${activeTab.label} enterprise solution.`,
                      })
                    }
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                  >
                    Request {activeTab.label} Blueprint
                  </Button>
                </div>
              </div>

              {/* Right Metrics Stat Display */}
              <div className="lg:col-span-5 flex flex-col gap-4 bg-white dark:bg-slate-950 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-lg">
                <h4 className="text-xs uppercase font-bold tracking-wider text-slate-400 dark:text-slate-500 border-b border-slate-100 dark:border-slate-900 pb-3">
                  Verified Industry Impact
                </h4>

                <div className="grid grid-cols-2 gap-4 pt-1">
                  {activeTab.metrics.map((m, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex flex-col">
                      <span className="text-2xl sm:text-3xl font-black text-blue-600 dark:text-blue-400">
                        {m.value}
                      </span>
                      <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1">
                        {m.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </Container>
    </section>
  );
};

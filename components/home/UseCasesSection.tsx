"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Building2, Stethoscope, Cpu, Factory, ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/Container";

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
    icon: <Cpu className="w-4 h-4" />,
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
    label: "Banking & Finance",
    icon: <Building2 className="w-4 h-4" />,
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
    id: "healthcare-lifesciences",
    label: "Healthcare & Life Sciences",
    icon: <Stethoscope className="w-4 h-4" />,
    title: "Clinical NLP & Genomic Data Science",
    subtitle: "HIPAA Compliant Medical Intelligence Systems",
    description:
      "Train clinical research cohorts to leverage deep learning for accelerated drug discovery pipelines, automated EHR synthesis, and HIPAA-compliant patient diagnostics.",
    highlights: [
      "HIPAA & GDPR data isolation",
      "Automated medical literature retrieval",
      "Accelerated trial screening by 65%",
    ],
    metrics: [
      { label: "Trial Screening", value: "+65%" },
      { label: "Analysts Upskilled", value: "8,500+" },
    ],
  },
  {
    id: "manufacturing-logistics",
    label: "Manufacturing & Logistics",
    icon: <Factory className="w-4 h-4" />,
    title: "Predictive Maintenance & Supply Chain AI",
    subtitle: "Real-Time Sensor Analytics & IoT Control Towers",
    description:
      "Transform plant management and supply chain operations through predictive maintenance machine learning models, reduced downtime, and inventory forecasting.",
    highlights: [
      "Reduced unplanned downtime by 38%",
      "Automated IoT sensor telemetry",
      "Optimized fleet routing efficiency",
    ],
    metrics: [
      { label: "Downtime Reduction", value: "-38%" },
      { label: "Plants Transformed", value: "120+" },
    ],
  },
];

interface UseCasesSectionProps {
  onOpenEnquireModal: (options?: { domain?: string; message?: string }) => void;
}

export const UseCasesSection: React.FC<UseCasesSectionProps> = ({ onOpenEnquireModal }) => {
  const [activeTab, setActiveTab] = useState<string>("it-software");

  const currentIndustry = INDUSTRIES.find((ind) => ind.id === activeTab) || INDUSTRIES[0];

  return (
    <section id="use-cases" className="py-20 sm:py-28 bg-[#FAFBFD] transition-colors">
      <Container>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[12px] font-semibold bg-blue-50 text-blue-600 border border-blue-100 mb-5">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Tailored Industry Blueprints</span>
          </span>
          <h2 className="text-[32px] sm:text-[40px] md:text-[48px] font-extrabold text-[#0F172A] tracking-[-0.03em] leading-[1.1]">
            Domain-Specific{" "}
            <span className="bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Transformation
            </span>
          </h2>
          <p className="mt-4 text-[16px] sm:text-[17px] text-[#64748B] leading-[1.65] max-w-xl mx-auto">
            Customized enterprise capability tracks engineered for complex compliance, regulatory, and technical requirements.
          </p>

          {/* Industry Tab Selectors */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 mt-8">
            {INDUSTRIES.map((ind) => (
              <button
                key={ind.id}
                onClick={() => setActiveTab(ind.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-[13px] font-semibold transition-all duration-200 focus:outline-none ${
                  activeTab === ind.id
                    ? "bg-[#0F172A] text-white shadow-md shadow-slate-900/15 scale-[1.02]"
                    : "bg-white text-[#475569] hover:bg-slate-50 hover:text-[#0F172A] border border-[#E5E7EB]"
                }`}
              >
                {ind.icon}
                <span>{ind.label}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Selected Sector Card Details */}
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndustry.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3 }}
              className="bg-white border border-[#E5E7EB] rounded-3xl p-8 sm:p-12 shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.06)] transition-all duration-300"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 flex flex-col gap-5">
                  <div>
                    <span className="text-[11px] uppercase font-bold tracking-wider text-blue-600">
                      {currentIndustry.subtitle}
                    </span>
                    <h3 className="text-[24px] sm:text-[28px] font-bold text-[#0F172A] tracking-[-0.02em] leading-tight mt-1">
                      {currentIndustry.title}
                    </h3>
                  </div>

                  <p className="text-[14px] text-[#64748B] leading-[1.7]">
                    {currentIndustry.description}
                  </p>

                  <div className="flex flex-col gap-2.5 pt-2">
                    {currentIndustry.highlights.map((item) => (
                      <div key={item} className="flex items-center gap-2.5 text-[13px] font-medium text-[#334155]">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4">
                    <button
                      onClick={() =>
                        onOpenEnquireModal({
                          domain: currentIndustry.label,
                          message: `Requesting enterprise blueprint for ${currentIndustry.label}.`,
                        })
                      }
                      className="inline-flex items-center justify-center gap-2 h-13 px-7 rounded-2xl bg-[#0F172A] hover:bg-[#1E293B] text-white font-bold text-[14px] transition-all duration-200 shadow-md active:scale-[0.98] cursor-pointer"
                    >
                      <span>Download {currentIndustry.label} Blueprint</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="lg:col-span-5 flex flex-col gap-4">
                  {currentIndustry.metrics.map((m) => (
                    <div
                      key={m.label}
                      className="p-6 rounded-2xl bg-[#FAFBFD] border border-[#E5E7EB] flex flex-col gap-1"
                    >
                      <span className="text-[32px] sm:text-[40px] font-extrabold text-[#0F172A] tracking-tight leading-none">
                        {m.value}
                      </span>
                      <span className="text-[12px] font-semibold text-[#64748B] uppercase tracking-wider">
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

"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2,
  TrendingUp,
  CheckCircle2,
  Quote,
  ArrowRight,
  ShieldCheck,
  FileText,
} from "lucide-react";
import { CASE_STUDIES_DATA } from "@/constants/caseStudiesData";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

interface CaseStudiesProps {
  onOpenEnquireModal: (options?: { domain?: string; message?: string }) => void;
}

export const CaseStudies: React.FC<CaseStudiesProps> = ({ onOpenEnquireModal }) => {
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const activeCase = CASE_STUDIES_DATA[activeIdx];

  return (
    <section id="case-studies" className="py-20 sm:py-28 bg-slate-50/70 border-y border-slate-200/60">
      <Container>
        <SectionHeading
          badgeText="Verified Outcomes"
          title="Enterprise Success"
          highlightText="Case Studies"
          subtitle="Explore how industry giants transformed their engineering and leadership capabilities with Accredian."
        />

        {/* Company Selector Pills */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {CASE_STUDIES_DATA.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => setActiveIdx(idx)}
              className={`px-5 py-2.5 rounded-2xl font-bold text-xs sm:text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center gap-2 ${
                activeIdx === idx
                  ? "bg-slate-900 text-white shadow-lg shadow-slate-900/20 scale-105"
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              <Building2 className="w-4 h-4 text-blue-500" />
              <span>{item.clientName}</span>
            </button>
          ))}
        </div>

        {/* Active Case Study Detail Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCase.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card
              variant="elevated"
              padding="lg"
              className="bg-white border-slate-200 shadow-2xl p-6 sm:p-10"
            >
              {/* Header Info */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-slate-100">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white font-black text-xl flex items-center justify-center shadow-md shadow-blue-600/30">
                      {activeCase.logoInitial}
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                        {activeCase.clientName}
                      </h3>
                      <div className="flex items-center gap-3 text-xs font-semibold text-slate-500">
                        <span>{activeCase.industry}</span>
                        <span>•</span>
                        <span>{activeCase.companySize}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-lg font-bold text-blue-600 pt-2">
                    {activeCase.headline}
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <button
                    onClick={() =>
                      onOpenEnquireModal({
                        message: `Requesting full detailed Case Study PDF for ${activeCase.clientName}.`,
                      })
                    }
                    className="px-4 py-2.5 rounded-xl border border-slate-300 hover:border-blue-600 bg-slate-50 text-slate-700 text-xs font-bold flex items-center gap-2 hover:bg-white hover:text-blue-600 transition-colors"
                  >
                    <FileText className="w-4 h-4" />
                    <span>Download Case Study PDF</span>
                  </button>
                </div>
              </div>

              {/* Metrics Highlights Bar */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-8">
                {activeCase.metrics.map((metric, mIdx) => (
                  <div
                    key={mIdx}
                    className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center gap-4"
                  >
                    <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-600">
                      <TrendingUp className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-2xl font-black text-slate-900">{metric.value}</div>
                      <div className="text-xs font-bold text-slate-700">{metric.label}</div>
                      <div className="text-[11px] text-slate-500">{metric.sublabel}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Challenge vs Solution Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-6 border-t border-slate-100">
                <div className="space-y-3">
                  <h4 className="text-xs uppercase font-bold text-slate-400 tracking-wider">
                    The Challenge
                  </h4>
                  <p className="text-sm text-slate-700 leading-relaxed font-medium">
                    {activeCase.challenge}
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="text-xs uppercase font-bold text-blue-600 tracking-wider">
                    The Accredian Solution
                  </h4>
                  <p className="text-sm text-slate-700 leading-relaxed font-medium">
                    {activeCase.solution}
                  </p>
                </div>
              </div>

              {/* Measured Results List */}
              <div className="pt-6 border-t border-slate-100 space-y-3">
                <h4 className="text-xs uppercase font-bold text-emerald-600 tracking-wider flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Key Verified Results</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {activeCase.results.map((res, rIdx) => (
                    <div
                      key={rIdx}
                      className="flex items-start gap-2 text-xs font-semibold text-slate-800 bg-emerald-50/50 border border-emerald-200/60 p-3 rounded-xl"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{res}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quote Block */}
              <div className="mt-8 p-6 rounded-2xl bg-slate-900 text-white relative flex flex-col gap-4">
                <Quote className="w-8 h-8 text-blue-500/40 absolute top-4 right-4" />
                <p className="text-sm sm:text-base italic text-slate-200 pr-8">
                  &quot;{activeCase.quote.text}&quot;
                </p>
                <div>
                  <div className="text-sm font-bold text-white">{activeCase.quote.author}</div>
                  <div className="text-xs text-blue-300">{activeCase.quote.title}</div>
                </div>
              </div>
            </Card>
          </motion.div>
        </AnimatePresence>
      </Container>
    </section>
  );
};

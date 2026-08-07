"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2,
  CheckCircle2,
  Quote,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import { CASE_STUDIES_DATA } from "@/constants/caseStudiesData";
import { Container } from "@/components/ui/Container";

interface CaseStudiesProps {
  onOpenEnquireModal: (options?: { domain?: string; message?: string }) => void;
}

export const CaseStudies: React.FC<CaseStudiesProps> = ({ onOpenEnquireModal }) => {
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const activeCase = CASE_STUDIES_DATA[activeIdx];

  return (
    <section id="case-studies" className="py-20 sm:py-28 bg-[#FAFBFD] transition-colors border-y border-[#E5E7EB]">
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
            <span>Verified Enterprise Outcomes</span>
          </span>
          <h2 className="text-[32px] sm:text-[40px] md:text-[48px] font-extrabold text-[#0F172A] tracking-[-0.03em] leading-[1.1]">
            Enterprise Success{" "}
            <span className="bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Case Studies
            </span>
          </h2>
          <p className="mt-4 text-[16px] sm:text-[17px] text-[#64748B] leading-[1.65] max-w-xl mx-auto">
            Explore how industry leaders transformed their engineering and leadership capabilities with Accredian.
          </p>

          {/* Company Selector Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 mt-8">
            {CASE_STUDIES_DATA.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => setActiveIdx(idx)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-[13px] font-semibold transition-all duration-200 focus:outline-none ${
                  activeIdx === idx
                    ? "bg-[#0F172A] text-white shadow-md shadow-slate-900/15 scale-[1.02]"
                    : "bg-white text-[#475569] hover:bg-slate-50 hover:text-[#0F172A] border border-[#E5E7EB]"
                }`}
              >
                <Building2 className="w-3.5 h-3.5 text-blue-500" />
                <span>{item.clientName}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Active Case Study Detail Card */}
        <div className="max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCase.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3 }}
              className="bg-white border border-[#E5E7EB] rounded-3xl p-8 sm:p-12 shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.06)] transition-all duration-300"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                {/* Left Overview & Results */}
                <div className="lg:col-span-7 flex flex-col justify-between gap-6">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-[11px] font-bold border border-blue-100">
                        {activeCase.industry}
                      </span>
                      <span className="text-[12px] font-semibold text-[#64748B]">
                        Scope: {activeCase.companySize}
                      </span>
                    </div>

                    <h3 className="text-[24px] sm:text-[28px] font-bold text-[#0F172A] tracking-[-0.02em] leading-tight">
                      {activeCase.headline}
                    </h3>

                    <p className="text-[14px] text-[#64748B] leading-[1.7] mt-3">
                      {activeCase.challenge}
                    </p>
                  </div>

                  {/* Highlights Checklist */}
                  <div className="flex flex-col gap-2.5 pt-2 border-t border-[#F1F5F9]">
                    <h4 className="text-[12px] uppercase font-bold tracking-wider text-[#94A3B8]">
                      Key Solution Delivery
                    </h4>
                    {activeCase.results.map((res) => (
                      <div key={res} className="flex items-center gap-2.5 text-[13px] font-semibold text-[#334155]">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span>{res}</span>
                      </div>
                    ))}
                  </div>

                  {/* Action CTA Button */}
                  <div className="pt-2">
                    <button
                      onClick={() =>
                        onOpenEnquireModal({
                          domain: activeCase.clientName,
                          message: `Requesting full case study PDF for ${activeCase.clientName}.`,
                        })
                      }
                      className="inline-flex items-center justify-center gap-2 h-13 px-7 rounded-2xl bg-[#0F172A] hover:bg-[#1E293B] text-white font-bold text-[14px] transition-all duration-200 shadow-md active:scale-[0.98] cursor-pointer"
                    >
                      <span>Read Full {activeCase.clientName} Study</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Right Impact Metrics & Executive Quote */}
                <div className="lg:col-span-5 flex flex-col justify-between gap-6 bg-[#FAFBFD] border border-[#E5E7EB] rounded-2xl p-6 sm:p-8">
                  {/* Executive Quote */}
                  <div className="relative">
                    <Quote className="w-8 h-8 text-blue-100 absolute -top-2 -left-2" />
                    <p className="text-[14px] text-[#334155] font-medium leading-[1.7] italic relative z-10">
                      &quot;{activeCase.quote.text}&quot;
                    </p>
                    <div className="mt-4 pt-3 border-t border-[#E5E7EB]">
                      <h4 className="text-[13px] font-bold text-[#0F172A]">
                        {activeCase.quote.author}
                      </h4>
                      <p className="text-[11px] font-semibold text-[#64748B]">
                        {activeCase.quote.title}
                      </p>
                    </div>
                  </div>

                  {/* Impact Stat Badge */}
                  <div className="p-4 rounded-xl bg-white border border-[#E5E7EB] flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-[14px]">
                      {activeCase.metrics[0]?.value || "42%"}
                    </div>
                    <div>
                      <h5 className="text-[13px] font-bold text-[#0F172A]">
                        {activeCase.metrics[0]?.label || "Productivity Impact"}
                      </h5>
                      <p className="text-[11px] font-semibold text-emerald-600">
                        {activeCase.metrics[0]?.sublabel || "Verified Metric"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </Container>
    </section>
  );
};

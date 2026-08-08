"use client";

import React from "react";
import { Check, X, ShieldCheck, Sparkles, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";

interface ComparisonItem {
  feature: string;
  accredian: boolean | string;
  moocs: boolean | string;
  internalLMS: boolean | string;
  workshops: boolean | string;
  highlight?: boolean;
}

const COMPARISON_DATA: ComparisonItem[] = [
  {
    feature: "Co-Created Tailored Curriculums",
    accredian: "100% Customized",
    moocs: "Generic Off-the-shelf",
    internalLMS: "Static Video Modules",
    workshops: "Standardized Slides",
    highlight: true,
  },
  {
    feature: "Live Hands-On Practitioner Mentorship",
    accredian: true,
    moocs: false,
    internalLMS: false,
    workshops: "Limited (2 Days)",
  },
  {
    feature: "Sanitized Enterprise Dataset Labs",
    accredian: true,
    moocs: false,
    internalLMS: false,
    workshops: false,
    highlight: true,
  },
  {
    feature: "Cohort Skill Growth Dashboard & Analytics",
    accredian: "Real-time Metrics",
    moocs: "Completion Only",
    internalLMS: "Basic Quiz Scores",
    workshops: "No Tracking",
  },
  {
    feature: "Measurable Capstone Business ROI",
    accredian: true,
    moocs: false,
    internalLMS: false,
    workshops: false,
    highlight: true,
  },
  {
    feature: "SOC-2 Type II & Security Compliance",
    accredian: true,
    moocs: "Varies",
    internalLMS: true,
    workshops: false,
  },
];

interface ComparisonMatrixProps {
  onOpenEnquireModal: () => void;
}

export const ComparisonMatrix: React.FC<ComparisonMatrixProps> = ({ onOpenEnquireModal }) => {
  const renderCellContent = (value: boolean | string, isAccredian = false) => {
    if (typeof value === "boolean") {
      return value ? (
        <div
          className={`w-7 h-7 rounded-full flex items-center justify-center mx-auto ${
            isAccredian ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-600"
          }`}
        >
          <Check className="w-4 h-4 stroke-3" />
        </div>
      ) : (
        <div className="w-7 h-7 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
          <X className="w-4 h-4" />
        </div>
      );
    }

    return (
      <span
        className={`text-[12px] font-bold ${
          isAccredian ? "text-blue-600" : "text-[#64748B]"
        }`}
      >
        {value}
      </span>
    );
  };

  return (
    <section id="comparison" className="py-20 sm:py-28 bg-transparent transition-colors border-t border-[#E5E7EB]/80 relative z-1">
      <Container>
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-16">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[12px] font-semibold bg-blue-50 text-blue-600 border border-blue-100 mb-5">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Why Accredian Stands Apart</span>
          </span>
          <h2 className="text-[32px] sm:text-[40px] md:text-[48px] font-extrabold text-[#0F172A] tracking-[-0.03em] leading-[1.1]">
            Enterprise Upskilling{" "}
            <span className="bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Comparison
            </span>
          </h2>
          <p className="mt-4 text-[16px] sm:text-[17px] text-[#64748B] leading-[1.65] max-w-xl mx-auto">
            See how Accredian co-created executive tracks outperform generic MOOCs, static LMS platforms, and legacy 2-day workshops.
          </p>
        </div>

        {/* Matrix Card Table */}
        <div className="max-w-5xl mx-auto">
          <div className="bg-white border border-[#E5E7EB] rounded-3xl overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.06)] transition-shadow duration-300">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-175">
                <thead>
                  <tr className="border-b border-[#E5E7EB] bg-[#FAFBFD]">
                    <th className="py-5 px-6 text-[13px] font-bold text-[#0F172A] w-1/3">
                      Capability Feature
                    </th>
                    <th className="py-5 px-6 text-[13px] font-extrabold text-blue-600 text-center bg-blue-50/60 border-x border-blue-100">
                      <div className="flex items-center justify-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-blue-600" />
                        <span>Accredian Enterprise</span>
                      </div>
                    </th>
                    <th className="py-5 px-4 text-[12px] font-semibold text-[#64748B] text-center">
                      Generic MOOCs
                    </th>
                    <th className="py-5 px-4 text-[12px] font-semibold text-[#64748B] text-center">
                      Internal LMS
                    </th>
                    <th className="py-5 px-4 text-[12px] font-semibold text-[#64748B] text-center">
                      2-Day Workshops
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F1F5F9]">
                  {COMPARISON_DATA.map((row) => (
                    <tr
                      key={row.feature}
                      className={`hover:bg-slate-50/80 transition-colors ${
                        row.highlight ? "bg-blue-50/20" : ""
                      }`}
                    >
                      <td className="py-4 px-6 text-[13px] font-semibold text-[#334155]">
                        {row.feature}
                      </td>
                      <td className="py-4 px-6 text-center bg-blue-50/30 border-x border-blue-100/60">
                        {renderCellContent(row.accredian, true)}
                      </td>
                      <td className="py-4 px-4 text-center">
                        {renderCellContent(row.moocs)}
                      </td>
                      <td className="py-4 px-4 text-center">
                        {renderCellContent(row.internalLMS)}
                      </td>
                      <td className="py-4 px-4 text-center">
                        {renderCellContent(row.workshops)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-6 bg-[#FAFBFD] border-t border-[#E5E7EB] flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-[13px] text-[#64748B] font-medium text-center sm:text-left">
                Ready to co-create a capability track tailored to your tech stack?
              </p>
              <button
                onClick={onOpenEnquireModal}
                className="h-12 px-6 rounded-xl bg-[#0F172A] hover:bg-[#1E293B] text-white font-bold text-[13px] inline-flex items-center gap-2 transition-all duration-200 shadow-sm active:scale-[0.98] cursor-pointer"
              >
                <span>Schedule Executive Audit</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

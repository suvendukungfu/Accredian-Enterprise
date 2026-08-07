"use client";

import React, { useState, useId } from "react";
import {
  Calculator,
  TrendingUp,
  Clock,
  DollarSign,
  Users,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { Container } from "@/components/ui/Container";

interface ROICalculatorProps {
  onOpenEnquireModal: (options?: { domain?: string; message?: string }) => void;
}

const DOMAIN_MULTIPLIERS: Record<
  string,
  { hoursSaved: number; prodBoost: number; label: string }
> = {
  "Generative AI": {
    hoursSaved: 260,
    prodBoost: 38,
    label: "Generative AI & LLM Automation",
  },
  "Tech & Data": {
    hoursSaved: 210,
    prodBoost: 31,
    label: "Data Science & Cloud Analytics",
  },
  "Leadership Development": {
    hoursSaved: 160,
    prodBoost: 24,
    label: "Agile Leadership & Digital Mindset",
  },
  "Operations Management": {
    hoursSaved: 230,
    prodBoost: 34,
    label: "Process Mining & Operations Automation",
  },
};

export const ROICalculator: React.FC<ROICalculatorProps> = ({ onOpenEnquireModal }) => {
  const teamSizeId = useId();
  const avgSalaryId = useId();
  const [teamSize, setTeamSize] = useState<number>(75);
  const [avgSalary, setAvgSalary] = useState<number>(110000);
  const [selectedDomain, setSelectedDomain] = useState<string>("Generative AI");

  const domainConfig = DOMAIN_MULTIPLIERS[selectedDomain] || DOMAIN_MULTIPLIERS["Generative AI"];

  const hourlyRate = avgSalary / 2000;
  const totalHoursSaved = teamSize * domainConfig.hoursSaved;
  const grossFinancialSavings = totalHoursSaved * hourlyRate;
  const estimatedTrainingInvestment = teamSize * 1800;
  const netROI = Math.max(0, Math.round(((grossFinancialSavings - estimatedTrainingInvestment) / estimatedTrainingInvestment) * 100));

  return (
    <section id="roi-calculator" className="py-20 sm:py-28 bg-[#FAFBFD] transition-colors border-y border-[#E5E7EB]">
      <Container>
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-16">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[12px] font-semibold bg-blue-50 text-blue-600 border border-blue-100 mb-5">
            <Calculator className="w-3.5 h-3.5 text-blue-600" />
            <span>Interactive Enterprise ROI Model</span>
          </span>
          <h2 className="text-[32px] sm:text-[40px] md:text-[48px] font-extrabold text-[#0F172A] tracking-[-0.03em] leading-[1.1]">
            Calculate Your Organization&apos;s{" "}
            <span className="bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Skill ROI
            </span>
          </h2>
          <p className="mt-4 text-[16px] sm:text-[17px] text-[#64748B] leading-[1.65] max-w-xl mx-auto">
            Model projected annual productivity gains, engineering hours saved, and financial ROI across enterprise cohorts.
          </p>
        </div>

        {/* Calculator Main Card */}
        <div className="max-w-5xl mx-auto">
          <div className="bg-white border border-[#E5E7EB] rounded-[24px] p-8 sm:p-12 shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.06)] transition-shadow duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
              {/* Left Column Controls */}
              <div className="lg:col-span-6 flex flex-col gap-6">
                <div>
                  <label className="text-[12px] font-bold text-[#94A3B8] uppercase tracking-wider block mb-2">
                    Select Capability Domain
                  </label>
                  <div className="grid grid-cols-2 gap-2.5">
                    {Object.keys(DOMAIN_MULTIPLIERS).map((domain) => (
                      <button
                        key={domain}
                        onClick={() => setSelectedDomain(domain)}
                        className={`px-3.5 py-2.5 rounded-xl text-[12px] font-bold transition-all duration-200 border text-left ${
                          selectedDomain === domain
                            ? "bg-[#0F172A] text-white border-[#0F172A] shadow-sm"
                            : "bg-white text-[#475569] border-[#E5E7EB] hover:bg-slate-50"
                        }`}
                      >
                        {domain}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Team Size Slider */}
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <label htmlFor={teamSizeId} className="text-[14px] font-medium text-[#374151] flex items-center gap-2">
                      <Users className="w-4 h-4 text-blue-600" />
                      <span>Cohort Team Size</span>
                    </label>
                    <span className="text-[14px] font-bold text-[#0F172A]">{teamSize} Employees</span>
                  </div>
                  <input
                    id={teamSizeId}
                    type="range"
                    min="10"
                    max="500"
                    step="5"
                    value={teamSize}
                    onChange={(e) => setTeamSize(Number(e.target.value))}
                    aria-label="Cohort team size slider"
                  />
                  <div className="flex justify-between text-[11px] text-[#94A3B8] font-semibold">
                    <span>10 Pilot</span>
                    <span>250 Division</span>
                    <span>500+ Global</span>
                  </div>
                </div>

                {/* Avg Salary Slider */}
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <label htmlFor={avgSalaryId} className="text-[14px] font-medium text-[#374151] flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-emerald-600" />
                      <span>Avg Annual Salary</span>
                    </label>
                    <span className="text-[14px] font-bold text-[#0F172A]">${avgSalary.toLocaleString()} USD</span>
                  </div>
                  <input
                    id={avgSalaryId}
                    type="range"
                    min="50000"
                    max="250000"
                    step="5000"
                    value={avgSalary}
                    onChange={(e) => setAvgSalary(Number(e.target.value))}
                    aria-label="Average annual salary slider"
                  />
                  <div className="flex justify-between text-[11px] text-[#94A3B8] font-semibold">
                    <span>$50k</span>
                    <span>$150k</span>
                    <span>$250k+</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-[#E5E7EB] text-[12px] text-[#64748B] flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span>
                    Projections are calculated based on benchmarked productivity data across 100+ enterprise cohorts.
                  </span>
                </div>
              </div>

              {/* Right Column Financial ROI Summary */}
              <div className="lg:col-span-6 flex flex-col justify-between gap-6 bg-[#FAFBFD] border border-[#E5E7EB] rounded-2xl p-6 sm:p-8">
                <div className="flex flex-col gap-5">
                  <span className="text-[11px] font-bold text-blue-600 uppercase tracking-widest">
                    Projected Annual Outcomes
                  </span>

                  <div>
                    <span className="text-[12px] font-semibold text-[#64748B] block">
                      Estimated Financial Productivity Savings
                    </span>
                    <span className="text-[36px] sm:text-[44px] font-extrabold text-[#0F172A] tracking-tight leading-none block mt-1">
                      ${Math.round(grossFinancialSavings).toLocaleString()}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#E5E7EB]">
                    <div className="p-3.5 rounded-xl bg-white border border-[#E5E7EB]">
                      <div className="flex items-center gap-1.5 text-emerald-600 font-bold text-[16px]">
                        <TrendingUp className="w-4 h-4" />
                        <span>+{domainConfig.prodBoost}%</span>
                      </div>
                      <span className="text-[11px] font-semibold text-[#64748B] mt-0.5 block">
                        Productivity Boost
                      </span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-white border border-[#E5E7EB]">
                      <div className="flex items-center gap-1.5 text-blue-600 font-bold text-[16px]">
                        <Clock className="w-4 h-4" />
                        <span>{totalHoursSaved.toLocaleString()} hrs</span>
                      </div>
                      <span className="text-[11px] font-semibold text-[#64748B] mt-0.5 block">
                        Annual Hours Saved
                      </span>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-between">
                    <span className="text-[13px] font-bold text-emerald-900">Projected Net ROI</span>
                    <span className="text-[20px] font-extrabold text-emerald-700">+{netROI}% ROI</span>
                  </div>

                  <div className="flex flex-col gap-2 pt-1 text-[12px] font-medium text-[#475569]">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>Custom Capstone ROI Assessment included</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>1-on-1 Executive Skill Gap Audit</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() =>
                    onOpenEnquireModal({
                      domain: selectedDomain,
                      message: `Requesting ROI audit for team of ${teamSize} employees in ${selectedDomain}.`,
                    })
                  }
                  className="w-full h-[56px] rounded-2xl bg-[#0F172A] hover:bg-[#1E293B] text-white font-bold text-[15px] inline-flex items-center justify-center gap-2 transition-all duration-200 shadow-md active:scale-[0.98] cursor-pointer"
                >
                  <span>Book Custom ROI Audit</span>
                  <ArrowRight className="w-4.5 h-4.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

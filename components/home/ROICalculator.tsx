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
  Sparkles,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Button } from "@/components/ui/Button";

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

  // Annual working hours assumed per employee = 2000
  const hourlyRate = avgSalary / 2000;
  const totalHoursSaved = teamSize * domainConfig.hoursSaved;
  const grossFinancialSavings = totalHoursSaved * hourlyRate;
  // Estimated Accredian Enterprise investment assumption (~$1,200 per seat per year)
  const estimatedCost = teamSize * 1200;
  const netFinancialImpact = Math.max(0, grossFinancialSavings - estimatedCost);
  const roiMultiple = ((grossFinancialSavings / (estimatedCost || 1))).toFixed(1);

  return (
    <section id="roi-calculator" className="py-20 sm:py-28 bg-slate-900 text-white relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-32 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />

      <Container>
        <SectionHeading
          badgeText="Enterprise Business Case"
          title="Calculate Your Organization's"
          highlightText="Capability ROI"
          subtitle="Estimate the quantifiable productivity gains, hours saved, and financial impact of upskilling your workforce with Accredian."
          light
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Controls Form Column */}
          <div className="lg:col-span-7 bg-slate-800/80 border border-slate-700/80 rounded-3xl p-6 sm:p-8 backdrop-blur-xl flex flex-col justify-between shadow-2xl">
            <div className="space-y-8">
              <div className="flex items-center gap-3 pb-4 border-b border-slate-700/60">
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">
                  <Calculator className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Workforce Parameters</h3>
                  <p className="text-xs text-slate-400">Adjust the parameters to mirror your team composition</p>
                </div>
              </div>

              {/* Domain Selection Buttons */}
              <div className="space-y-2.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Select Target Capability Domain:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {Object.keys(DOMAIN_MULTIPLIERS).map((domain) => (
                    <button
                      key={domain}
                      type="button"
                      onClick={() => setSelectedDomain(domain)}
                      className={`p-3 rounded-xl text-xs font-bold transition-all text-left border ${
                        selectedDomain === domain
                          ? "bg-blue-600 text-white border-blue-400 shadow-md shadow-blue-600/30"
                          : "bg-slate-900/60 text-slate-300 border-slate-700 hover:border-slate-500 hover:bg-slate-800"
                      }`}
                    >
                      {domain}
                    </button>
                  ))}
                </div>
              </div>

              {/* Team Size Slider */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <label htmlFor={teamSizeId} className="font-bold text-slate-200 flex items-center gap-2">
                    <Users className="w-4 h-4 text-blue-400" />
                    <span>Number of Employees To Upskill:</span>
                  </label>
                  <span className="text-lg font-black text-blue-400 bg-blue-500/10 px-3 py-1 rounded-lg border border-blue-500/20">
                    {teamSize} Seats
                  </span>
                </div>
                <input
                  id={teamSizeId}
                  type="range"
                  min={10}
                  max={500}
                  step={5}
                  value={teamSize}
                  onChange={(e) => setTeamSize(Number(e.target.value))}
                  className="w-full h-2.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
                <div className="flex justify-between text-[11px] text-slate-400 font-semibold">
                  <span>10 Cohort</span>
                  <span>100 Mid-Size</span>
                  <span>500 Enterprise</span>
                </div>
              </div>

              {/* Average Salary Slider */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <label htmlFor={avgSalaryId} className="font-bold text-slate-200 flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-emerald-400" />
                    <span>Average Annual Compensation / Employee:</span>
                  </label>
                  <span className="text-lg font-black text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-lg border border-emerald-500/20">
                    ${avgSalary.toLocaleString()}/yr
                  </span>
                </div>
                <input
                  id={avgSalaryId}
                  type="range"
                  min={50000}
                  max={250000}
                  step={5000}
                  value={avgSalary}
                  onChange={(e) => setAvgSalary(Number(e.target.value))}
                  className="w-full h-2.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
                <div className="flex justify-between text-[11px] text-slate-400 font-semibold">
                  <span>$50k</span>
                  <span>$150k</span>
                  <span>$250k+</span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-700/60 mt-8 text-xs text-slate-400 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Based on benchmark enterprise outcome metrics across 50+ corporate cohorts.</span>
            </div>
          </div>

          {/* Results Output Column */}
          <div className="lg:col-span-5 bg-linear-to-br from-blue-900/90 via-indigo-900/80 to-slate-900 border border-blue-500/30 rounded-3xl p-6 sm:p-8 backdrop-blur-xl flex flex-col justify-between shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-blue-400/10 rounded-full blur-2xl pointer-events-none" />

            <div className="space-y-6 relative z-10">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <span className="text-xs uppercase font-bold tracking-widest text-blue-300 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                  Estimated Impact Summary
                </span>
                <span className="text-xs font-bold bg-emerald-500/20 text-emerald-300 px-2.5 py-1 rounded-full border border-emerald-500/30">
                  {roiMultiple}x Projected ROI
                </span>
              </div>

              {/* Big Financial Result Card */}
              <div className="bg-white/10 p-5 rounded-2xl border border-white/10 backdrop-blur-md space-y-1">
                <span className="text-xs text-blue-200 font-medium">Estimated Gross Financial Value / Yr</span>
                <div className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                  ${Math.round(grossFinancialSavings).toLocaleString()}
                </div>
                <p className="text-[11px] text-emerald-300 font-semibold pt-1">
                  Net Financial Uplift: +${Math.round(netFinancialImpact).toLocaleString()}
                </p>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 p-4 rounded-xl border border-white/10 backdrop-blur-md flex flex-col gap-1">
                  <div className="flex items-center gap-1.5 text-blue-200 text-xs font-semibold">
                    <Clock className="w-3.5 h-3.5 text-blue-400" />
                    <span>Total Hours Saved</span>
                  </div>
                  <div className="text-2xl font-bold text-white">
                    {totalHoursSaved.toLocaleString()} hrs
                  </div>
                  <span className="text-[10px] text-slate-300">~{domainConfig.hoursSaved} hrs / employee</span>
                </div>

                <div className="bg-white/10 p-4 rounded-xl border border-white/10 backdrop-blur-md flex flex-col gap-1">
                  <div className="flex items-center gap-1.5 text-emerald-200 text-xs font-semibold">
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Productivity Boost</span>
                  </div>
                  <div className="text-2xl font-bold text-emerald-300">
                    +{domainConfig.prodBoost}%
                  </div>
                  <span className="text-[10px] text-slate-300">Workflow efficiency</span>
                </div>
              </div>
            </div>

            {/* CTA Box */}
            <div className="pt-6 mt-6 border-t border-white/10 relative z-10 space-y-3">
              <Button
                variant="gradient"
                size="lg"
                onClick={() =>
                  onOpenEnquireModal({
                    domain: selectedDomain,
                    message: `Requested ROI Audit for a team of ${teamSize} seats in ${selectedDomain}. Estimated ROI: ${roiMultiple}x ($${Math.round(grossFinancialSavings).toLocaleString()}/yr).`,
                  })
                }
                rightIcon={<ArrowRight className="w-4 h-4" />}
                className="w-full justify-center shadow-xl"
              >
                Schedule Custom ROI Audit
              </Button>
              <p className="text-[11px] text-center text-blue-200">
                Receive a detailed customized ROI report for your executive board presentation.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

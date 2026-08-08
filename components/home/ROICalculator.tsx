"use client";

import React, { useState, useId, useRef, useEffect } from "react";
import { motion } from "framer-motion";
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

/** Spotlighting Card wrapper with radial cursor highlight (<5% opacity) */
interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

const SpotlightCard: React.FC<SpotlightCardProps> = ({ children, className = "", ...props }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    };

    card.addEventListener("mousemove", handleMouseMove);
    return () => card.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={cardRef}
      className={`relative bg-white border border-[#E5E7EB] rounded-3xl shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_36px_rgba(0,0,0,0.07)] transition-all duration-300 group overflow-hidden ${className}`}
      {...props}
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"
        style={{
          background: "radial-gradient(350px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(59, 130, 246, 0.04), transparent 70%)",
        }}
      />
      {children}
    </div>
  );
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center max-w-2xl mx-auto mb-14 sm:mb-16"
        >
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[12px] font-semibold bg-blue-50 text-blue-600 border border-blue-100 mb-5">
            <Calculator className="w-3.5 h-3.5 text-blue-600" aria-hidden="true" />
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
        </motion.div>

        {/* Calculator Main Card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          className="max-w-5xl mx-auto"
        >
          <SpotlightCard className="p-8 sm:p-12">
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
                        className={`px-3.5 py-2.5 rounded-xl text-[12px] font-bold transition-all duration-200 border text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ${
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
                      <Users className="w-4 h-4 text-blue-600" aria-hidden="true" />
                      <span>Cohort Team Size</span>
                    </label>
                    <span className="text-[14px] font-bold text-[#0F172A] tabular-nums">{teamSize} Employees</span>
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
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
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
                      <DollarSign className="w-4 h-4 text-emerald-600" aria-hidden="true" />
                      <span>Avg Annual Salary</span>
                    </label>
                    <span className="text-[14px] font-bold text-[#0F172A] tabular-nums">${avgSalary.toLocaleString()}</span>
                  </div>
                  <input
                    id={avgSalaryId}
                    type="range"
                    min="60000"
                    max="220000"
                    step="5000"
                    value={avgSalary}
                    onChange={(e) => setAvgSalary(Number(e.target.value))}
                    aria-label="Average annual salary slider"
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
                  />
                  <div className="flex justify-between text-[11px] text-[#94A3B8] font-semibold">
                    <span>$60k Entry</span>
                    <span>$140k Senior</span>
                    <span>$220k Executive</span>
                  </div>
                </div>

                {/* Capability Summary Badge */}
                <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-100 flex items-start gap-3 mt-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" aria-hidden="true" />
                  <div className="text-[12px] text-[#334155] leading-relaxed font-medium">
                    <strong className="text-[#0F172A] font-bold">{domainConfig.label}:</strong> Projected +{domainConfig.prodBoost}% velocity acceleration per team member.
                  </div>
                </div>
              </div>

              {/* Right Column Calculated Outputs */}
              <div className="lg:col-span-6 flex flex-col justify-between p-6 sm:p-8 rounded-2xl bg-slate-900 text-white shadow-xl relative overflow-hidden">
                {/* Decorative background glow */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10 flex flex-col gap-6">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-5">
                    <span className="text-[13px] font-bold uppercase tracking-wider text-slate-400">
                      Calculated Enterprise Impact
                    </span>
                    <span className="inline-flex items-center gap-1 text-[12px] font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2.5 py-0.5 rounded-full">
                      <TrendingUp className="w-3.5 h-3.5" aria-hidden="true" />
                      +{netROI}% Net ROI
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60">
                      <div className="text-[11px] font-medium text-slate-400 flex items-center gap-1.5 mb-1">
                        <Clock className="w-3.5 h-3.5 text-blue-400" aria-hidden="true" />
                        <span>Annual Hours Saved</span>
                      </div>
                      <motion.div
                        key={totalHoursSaved}
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                        className="text-[24px] sm:text-[28px] font-extrabold text-white tracking-tight tabular-nums"
                      >
                        {totalHoursSaved.toLocaleString()} hrs
                      </motion.div>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60">
                      <div className="text-[11px] font-medium text-slate-400 flex items-center gap-1.5 mb-1">
                        <DollarSign className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
                        <span>Gross Value Created</span>
                      </div>
                      <motion.div
                        key={grossFinancialSavings}
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                        className="text-[24px] sm:text-[28px] font-extrabold text-white tracking-tight tabular-nums"
                      >
                        ${Math.round(grossFinancialSavings).toLocaleString()}
                      </motion.div>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-linear-to-r from-blue-900/40 to-indigo-900/40 border border-blue-800/50">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-[12px] font-semibold text-slate-300">
                          Estimated Program Investment
                        </div>
                        <div className="text-[11px] text-slate-400">
                          Based on custom cohort curriculum & live reviews
                        </div>
                      </div>
                      <div className="text-[18px] font-bold text-white tabular-nums">
                        ${estimatedTrainingInvestment.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative z-10 mt-8 pt-6 border-t border-slate-800 flex flex-col gap-4">
                  <div className="flex items-center gap-2 text-[12px] text-slate-400">
                    <ShieldCheck className="w-4 h-4 text-blue-400" aria-hidden="true" />
                    <span>Includes diagnostic tech audit & post-program ROI verification</span>
                  </div>

                  <motion.button
                    onClick={() =>
                      onOpenEnquireModal({
                        domain: selectedDomain,
                        message: `Requesting enterprise ROI model for ${teamSize} employees in ${selectedDomain}.`,
                      })
                    }
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring" as const, stiffness: 160, damping: 15 }}
                    className="w-full h-12 rounded-xl bg-white hover:bg-slate-100 text-[#0F172A] font-bold text-[14px] flex items-center justify-center gap-2 shadow-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 cursor-pointer"
                  >
                    <span>Request Custom ROI Proposal</span>
                    <ArrowRight className="w-4 h-4 text-blue-600" aria-hidden="true" />
                  </motion.button>
                </div>
              </div>
            </div>
          </SpotlightCard>
        </motion.div>
      </Container>
    </section>
  );
};

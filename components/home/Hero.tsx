"use client";

import React, { useState, useCallback, useMemo } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ShieldCheck, Lock, Building2 } from "lucide-react";
import { Container } from "@/components/ui/Container";

// Dynamically import Three.js Canvas to optimize initial load and page performance
const Hero3DCanvas = dynamic(
  () => import("./Hero3DCanvas").then((mod) => mod.Hero3DCanvas),
  {
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 flex items-center justify-center bg-slate-100/10 dark:bg-slate-900/10 rounded-3xl animate-pulse">
        <span className="text-xs text-slate-400 font-medium tracking-wider">Initializing WebGL Engine...</span>
      </div>
    ),
  }
);

interface HeroProps {
  onOpenEnquireModal: () => void;
  onOpenCommandPalette?: () => void;
}

const COMPLIANCE_BADGES = [
  {
    id: "soc2",
    icon: <ShieldCheck className="w-5 h-5" />,
    label: "SOC-2 Type II\nCertified",
    color: "bg-[#0F172A]",
  },
  {
    id: "iso",
    icon: null,
    label: "ISO 27001",
    color: "bg-[#0F172A]",
    text: "ISO",
  },
  {
    id: "gdpr",
    icon: <Lock className="w-5 h-5" />,
    label: "GDPR\nCompliant",
    color: "bg-[#0F172A]",
  },
  {
    id: "fortune",
    icon: <Building2 className="w-5 h-5" />,
    label: "Fortune 500\nReady",
    color: "bg-[#0F172A]",
    text: "FORTUNE\n500",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay },
  }),
};

export const Hero: React.FC<HeroProps> = ({ onOpenEnquireModal }) => {
  const [enterpriseSize, setEnterpriseSize] = useState(100);
  const [retentionRate, setRetentionRate] = useState(50);
  const [budget, setBudget] = useState(100);

  const calculatedSavings = useMemo(
    () => Math.round(enterpriseSize * 240 * (retentionRate / 100) + budget * 75),
    [enterpriseSize, retentionRate, budget]
  );

  const handleSizeChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setEnterpriseSize(Number(e.target.value)),
    []
  );
  const handleRetentionChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setRetentionRate(Number(e.target.value)),
    []
  );
  const handleBudgetChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setBudget(Number(e.target.value)),
    []
  );

  return (
    <section
      id="hero"
      className="relative pt-25 sm:pt-30 pb-16 sm:pb-24 page-bg-gradient transition-colors overflow-hidden"
    >
      {/* Hero Headline & 3D Canvas */}
      <Container className="relative z-10 mb-16 sm:mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-0 items-center min-h-85 sm:min-h-105">
          {/* Left: Headline */}
          <motion.div
            custom={0}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="lg:col-span-7 flex flex-col items-start"
          >
            <h1 className="text-[clamp(2.5rem,6vw,5rem)] font-extrabold text-[#0F172A] tracking-[-0.03em] leading-[1.05]">
              Transform Your{" "}
              <br className="hidden sm:block" />
              Enterprise Talent
            </h1>

            <p className="text-[17px] sm:text-[19px] text-[#64748B] font-normal leading-[1.65] max-w-130 mt-5">
              Bberd display typography
            </p>
          </motion.div>

          {/* Right: 3D Illustration */}
          <motion.div
            custom={0.15}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="lg:col-span-5 relative h-70 sm:h-100 w-full"
          >
            <Hero3DCanvas />
          </motion.div>
        </div>
      </Container>

      {/* Two-Column Cards Section */}
      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch">
          {/* Left Column */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            {/* Trust Card */}
            <motion.div
              custom={0.2}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="bg-white border border-[#E5E7EB] rounded-3xl p-7 sm:p-8 shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.06)] transition-shadow duration-300"
            >
              <h2 className="text-[22px] sm:text-[24px] font-bold text-[#0F172A] tracking-[-0.02em] leading-tight">
                Trusted by Industry Leaders
              </h2>
              <p className="text-[13px] text-[#94A3B8] mt-1 mb-7">
                Suggestes executive Trust signals
              </p>

              <div className="grid grid-cols-4 gap-3 sm:gap-4">
                {COMPLIANCE_BADGES.map((badge) => (
                  <div
                    key={badge.id}
                    className="flex flex-col items-center gap-2.5 text-center"
                  >
                    <div className={`w-11 h-11 rounded-xl ${badge.color} text-white flex items-center justify-center shadow-sm`}>
                      {badge.icon ? (
                        badge.icon
                      ) : badge.text ? (
                        <span className="text-[10px] font-black leading-[1.1] whitespace-pre-line text-center">
                          {badge.text}
                        </span>
                      ) : null}
                    </div>
                    <span className="text-[11px] font-semibold text-[#475569] leading-[1.3] whitespace-pre-line">
                      {badge.label}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* ROI Estimator Label Card */}
            <motion.div
              custom={0.3}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="bg-white border border-[#E5E7EB] rounded-3xl p-7 sm:p-8 shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.06)] transition-shadow duration-300 flex-1"
            >
              <h3 className="text-[22px] sm:text-[24px] font-bold text-[#0F172A] tracking-[-0.02em]">
                ROI estimator
              </h3>
              <p className="text-[14px] text-[#64748B] mt-3 leading-[1.65]">
                Adjust your dotious parameters to coitective your enterprise and evaluate ROI estimator.
              </p>
            </motion.div>
          </div>

          {/* Right Column: Interactive ROI Calculator */}
          <motion.div
            custom={0.25}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="lg:col-span-7 bg-white border border-[#E5E7EB] rounded-3xl p-7 sm:p-10 shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.06)] transition-shadow duration-300 flex flex-col justify-between"
          >
            <div className="flex flex-col gap-7">
              {/* Enterprise Size Slider */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-[14px] font-medium text-[#374151]">Enterprise Size</span>
                  <span className="text-[14px] font-bold text-[#0F172A]">{enterpriseSize}+ / Enterprise</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="500"
                  step="10"
                  value={enterpriseSize}
                  onChange={handleSizeChange}
                  aria-label="Enterprise size slider"
                />
              </div>

              {/* Retention Rate Slider */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-[14px] font-medium text-[#374151]">Current Retention Rate</span>
                  <span className="text-[14px] font-bold text-[#0F172A]">{retentionRate}%</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  step="5"
                  value={retentionRate}
                  onChange={handleRetentionChange}
                  aria-label="Current retention rate slider"
                />
              </div>

              {/* Training Budget Slider */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-[14px] font-medium text-[#374151]">Training Budget</span>
                  <span className="text-[14px] font-bold text-[#0F172A]">${budget}</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="500"
                  step="10"
                  value={budget}
                  onChange={handleBudgetChange}
                  aria-label="Training budget slider"
                />
              </div>
            </div>

            {/* Savings Output */}
            <div className="mt-8 pt-7 border-t border-[#F1F5F9] flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <span className="text-[14px] font-medium text-[#64748B]">
                  Estimated Annual Savings
                </span>
                <motion.span
                  key={calculatedSavings}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-[32px] sm:text-[36px] font-extrabold text-[#0F172A] tracking-[-0.02em] tabular-nums"
                >
                  ${calculatedSavings.toLocaleString()}
                </motion.span>
              </div>

              <button
                onClick={onOpenEnquireModal}
                className="w-full h-14 rounded-2xl bg-[#1E293B] hover:bg-[#0F172A] text-white font-bold text-[15px] transition-all duration-200 shadow-md hover:shadow-lg active:scale-[0.98] cursor-pointer"
              >
                Book Executive Audit
              </button>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

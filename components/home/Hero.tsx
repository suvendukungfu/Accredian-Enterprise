"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Lock,
  Building2,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Hero3DCanvas } from "./Hero3DCanvas";

interface HeroProps {
  onOpenEnquireModal: () => void;
  onOpenCommandPalette?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenEnquireModal }) => {
  // ROI Estimator Interactive Sliders State
  const [enterpriseSize, setEnterpriseSize] = useState<number>(100);
  const [retentionRate, setRetentionRate] = useState<number>(50);
  const [budget, setBudget] = useState<number>(100);

  // Dynamic Annual Savings Calculation formula
  const calculatedSavings = Math.round(enterpriseSize * 240 * (retentionRate / 100) + budget * 75);

  return (
    <section id="hero" className="relative pt-24 sm:pt-32 pb-16 sm:pb-24 bg-slate-50 dark:bg-slate-950 transition-colors">
      {/* Top Hero Headline & 3D Canvas Row */}
      <Container className="relative z-10 mb-12 sm:mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Keynote Headline & Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 flex flex-col items-start gap-4"
          >
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.05]">
              Transform Your <br />
              Enterprise Talent
            </h1>

            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 font-normal leading-relaxed max-w-xl mt-2">
              Co-created executive learning tracks designed to scale AI, Data Science, and Leadership capabilities.
            </p>
          </motion.div>

          {/* Right Column: 3D WebGL Mesh Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-5 relative h-72 sm:h-96 w-full flex items-center justify-center"
          >
            <Hero3DCanvas />
          </motion.div>
        </div>
      </Container>

      {/* Two-Column Enterprise Trust & ROI Estimator Section */}
      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
          
          {/* Left Stacked Column (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Card 1: Trusted by Industry Leaders */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col justify-between"
            >
              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                  Trusted by Industry Leaders
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 mb-6">
                  Enterprise compliance and security signals
                </p>
              </div>

              {/* 4 Compliance Badges Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                <div className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 dark:bg-blue-600 text-white flex items-center justify-center shadow-sm">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 leading-tight">
                    SOC-2 Type II Certified
                  </span>
                </div>

                <div className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 dark:bg-indigo-600 text-white flex items-center justify-center shadow-sm font-black text-xs">
                    ISO
                  </div>
                  <span className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 leading-tight">
                    ISO 27001
                  </span>
                </div>

                <div className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 dark:bg-purple-600 text-white flex items-center justify-center shadow-sm">
                    <Lock className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 leading-tight">
                    GDPR Compliant
                  </span>
                </div>

                <div className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 dark:bg-emerald-600 text-white flex items-center justify-center shadow-sm">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 leading-tight">
                    Fortune 500 Ready
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Card 2: ROI Estimator Overview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col justify-between grow"
            >
              <div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                  ROI estimator
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                  Adjust your parameters to calculate your enterprise talent transformation and evaluate projected ROI metrics.
                </p>
              </div>
            </motion.div>

          </div>

          {/* Right Column: Interactive ROI Calculator Module (7 Cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-sm flex flex-col justify-between"
          >
            <div className="flex flex-col gap-6">
              {/* Slider 1: Enterprise Size */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between text-sm font-medium text-slate-700 dark:text-slate-200">
                  <span>Enterprise Size</span>
                  <span className="font-bold text-slate-900 dark:text-white">{enterpriseSize}+ / Enterprise</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="500"
                  step="10"
                  value={enterpriseSize}
                  onChange={(e) => setEnterpriseSize(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>

              {/* Slider 2: Current Retention Rate */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between text-sm font-medium text-slate-700 dark:text-slate-200">
                  <span>Current Retention Rate</span>
                  <span className="font-bold text-slate-900 dark:text-white">{retentionRate}%</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  step="5"
                  value={retentionRate}
                  onChange={(e) => setRetentionRate(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>

              {/* Slider 3: Training Budget */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between text-sm font-medium text-slate-700 dark:text-slate-200">
                  <span>Training Budget</span>
                  <span className="font-bold text-slate-900 dark:text-white">${budget}K</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="500"
                  step="10"
                  value={budget}
                  onChange={(e) => setBudget(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>
            </div>

            {/* Savings Output & Action Button */}
            <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                  Estimated Annual Savings
                </span>
                <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  ${calculatedSavings.toLocaleString()}
                </span>
              </div>

              <button
                onClick={onOpenEnquireModal}
                className="w-full py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-500 text-white font-bold text-base transition-all shadow-md text-center"
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

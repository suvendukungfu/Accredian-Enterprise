"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  AreaChart,
  Area,
  CartesianGrid,
} from "recharts";
import { TrendingUp, Award, BarChart3, PieChart as PieIcon } from "lucide-react";
import { Container } from "@/components/ui/Container";

// Sample Data 1: Career Outcomes Before vs After Upskilling
const OUTCOMES_DATA = [
  { domain: "Generative AI", beforeSalary: 85, afterSalary: 142 },
  { domain: "Cloud Analytics", beforeSalary: 90, afterSalary: 138 },
  { domain: "Tech Leadership", beforeSalary: 110, afterSalary: 165 },
  { domain: "MLOps & DevOps", beforeSalary: 95, afterSalary: 148 },
  { domain: "Data Engineering", beforeSalary: 80, afterSalary: 130 },
];

// Sample Data 2: Annual Enterprise Learner Growth Year-over-Year
const GROWTH_DATA = [
  { year: "2022", learners: 12000, enterpriseClients: 45 },
  { year: "2023", learners: 24500, enterpriseClients: 85 },
  { year: "2024", learners: 41000, enterpriseClients: 140 },
  { year: "2025", learners: 68000, enterpriseClients: 220 },
  { year: "2026", learners: 105000, enterpriseClients: 350 },
];

export const DataVizSection: React.FC = () => {
  const [activeChart, setActiveChart] = useState<"outcomes" | "growth">("outcomes");

  return (
    <section id="analytics" className="py-20 sm:py-28 bg-slate-900 text-white relative overflow-hidden transition-colors">
      {/* Background Decor */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <Container>
        <div className="flex flex-col items-center text-center mb-12">
          <span className="px-3.5 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/30 mb-4 flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5 text-blue-400" />
            <span>Quantifiable Business Impact</span>
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
            Data-Driven <span className="bg-linear-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">Capability Growth</span>
          </h2>
          <p className="mt-4 text-slate-400 text-base sm:text-lg max-w-2xl">
            Real-time analytics showcasing average compensation growth and enterprise seat expansion across cohorts.
          </p>

          {/* Chart Toggle Buttons */}
          <div className="flex items-center gap-3 mt-8 p-1.5 rounded-2xl bg-slate-800/80 border border-slate-700/80 backdrop-blur-md">
            <button
              onClick={() => setActiveChart("outcomes")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
                activeChart === "outcomes"
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Salary Lift ($k/yr)</span>
            </button>

            <button
              onClick={() => setActiveChart("growth")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
                activeChart === "growth"
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <PieIcon className="w-4 h-4" />
              <span>Learner Growth (YoY)</span>
            </button>
          </div>
        </div>

        {/* Chart Card Wrapper */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-slate-800/90 border border-slate-700/80 rounded-3xl p-6 sm:p-10 backdrop-blur-xl shadow-2xl"
        >
          <AnimatePresence mode="wait">
            {activeChart === "outcomes" ? (
              <motion.div
                key="outcomes"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-6"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-700/80 pb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                      <Award className="w-5 h-5 text-amber-400" />
                      Average Annual Compensation Before vs After ($K)
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">
                      Based on verified placement and internal promotion metrics across 5,000+ enterprise alumni.
                    </p>
                  </div>
                  <div className="flex items-center gap-4 text-xs font-bold">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-slate-500" />
                      <span className="text-slate-300">Baseline Compensation</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-blue-500" />
                      <span className="text-blue-400">Post-Upskilling Compensation</span>
                    </div>
                  </div>
                </div>

                <div className="h-80 w-full pt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={OUTCOMES_DATA} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
                      <XAxis dataKey="domain" stroke="#94a3b8" tick={{ fontSize: 12 }} />
                      <YAxis stroke="#94a3b8" tick={{ fontSize: 12 }} unit="k" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#0f172a",
                          borderColor: "#334155",
                          borderRadius: "12px",
                          color: "#fff",
                        }}
                      />
                      <Bar dataKey="beforeSalary" name="Before ($K)" fill="#64748b" radius={[6, 6, 0, 0]} />
                      <Bar dataKey="afterSalary" name="After ($K)" fill="#3b82f6" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="growth"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-6"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-700/80 pb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-emerald-400" />
                      Active Enterprise Learner Volume Growth (YoY)
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">
                      Continuous expansion across Global Fortune 500 corporate training cohorts.
                    </p>
                  </div>
                  <div className="flex items-center gap-4 text-xs font-bold">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-indigo-500" />
                      <span className="text-indigo-300">Active Learners</span>
                    </div>
                  </div>
                </div>

                <div className="h-80 w-full pt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={GROWTH_DATA} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                      <defs>
                        <linearGradient id="colorLearners" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
                      <XAxis dataKey="year" stroke="#94a3b8" tick={{ fontSize: 12 }} />
                      <YAxis stroke="#94a3b8" tick={{ fontSize: 12 }} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#0f172a",
                          borderColor: "#334155",
                          borderRadius: "12px",
                          color: "#fff",
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="learners"
                        name="Active Learners"
                        stroke="#6366f1"
                        strokeWidth={3}
                        fillOpacity={1}
                        fill="url(#colorLearners)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </Container>
    </section>
  );
};

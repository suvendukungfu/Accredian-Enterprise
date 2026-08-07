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
import { TrendingUp, BarChart3, PieChart as PieIcon, Award } from "lucide-react";
import { Container } from "@/components/ui/Container";

const OUTCOMES_DATA = [
  { domain: "Generative AI", beforeSalary: 85, afterSalary: 142 },
  { domain: "Cloud Analytics", beforeSalary: 90, afterSalary: 138 },
  { domain: "Tech Leadership", beforeSalary: 110, afterSalary: 165 },
  { domain: "MLOps & DevOps", beforeSalary: 95, afterSalary: 148 },
  { domain: "Data Engineering", beforeSalary: 80, afterSalary: 130 },
];

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
    <section id="analytics" className="py-20 sm:py-28 bg-[#FAFBFD] transition-colors border-y border-[#E5E7EB]">
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
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Quantifiable Business Impact</span>
          </span>
          <h2 className="text-[32px] sm:text-[40px] md:text-[48px] font-extrabold text-[#0F172A] tracking-[-0.03em] leading-[1.1]">
            Data-Driven{" "}
            <span className="bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Capability Growth
            </span>
          </h2>
          <p className="mt-4 text-[16px] sm:text-[17px] text-[#64748B] leading-[1.65] max-w-xl mx-auto">
            Real-time analytics showcasing average compensation growth and enterprise seat expansion across cohorts.
          </p>

          {/* Chart Toggle Buttons */}
          <div className="flex items-center justify-center gap-2 mt-8 p-1.5 rounded-2xl bg-white border border-[#E5E7EB] shadow-sm w-fit mx-auto">
            <button
              onClick={() => setActiveChart("outcomes")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-[13px] font-semibold transition-all duration-200 focus:outline-none ${
                activeChart === "outcomes"
                  ? "bg-[#0F172A] text-white shadow-md shadow-slate-900/15"
                  : "text-[#64748B] hover:text-[#0F172A] hover:bg-slate-50"
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Salary Outcome Lift</span>
            </button>
            <button
              onClick={() => setActiveChart("growth")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-[13px] font-semibold transition-all duration-200 focus:outline-none ${
                activeChart === "growth"
                  ? "bg-[#0F172A] text-white shadow-md shadow-slate-900/15"
                  : "text-[#64748B] hover:text-[#0F172A] hover:bg-slate-50"
              }`}
            >
              <PieIcon className="w-4 h-4" />
              <span>YoY Enterprise Growth</span>
            </button>
          </div>
        </motion.div>

        {/* Interactive Chart Card Container */}
        <div className="max-w-5xl mx-auto">
          <div className="bg-white border border-[#E5E7EB] rounded-[24px] p-6 sm:p-10 shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.06)] transition-shadow duration-300">
            <AnimatePresence mode="wait">
              {activeChart === "outcomes" ? (
                <motion.div
                  key="outcomes"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col gap-6"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#F1F5F9]">
                    <div>
                      <h3 className="text-[18px] font-bold text-[#0F172A]">
                        Average Compensation Lift (USD in $k)
                      </h3>
                      <p className="text-[13px] text-[#64748B]">
                        Pre-cohort baseline vs Post-cohort salary benchmarks across enterprise domains
                      </p>
                    </div>

                    <div className="flex items-center gap-6 text-[12px] font-semibold">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-slate-300" />
                        <span className="text-[#64748B]">Pre-Upskill Base</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-blue-600" />
                        <span className="text-[#0F172A]">Post-Upskill Lift</span>
                      </div>
                    </div>
                  </div>

                  <div className="h-[320px] sm:h-[380px] w-full pt-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={OUTCOMES_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                        <XAxis
                          dataKey="domain"
                          stroke="#64748B"
                          fontSize={12}
                          tickLine={false}
                          axisLine={{ stroke: "#E5E7EB" }}
                        />
                        <YAxis
                          stroke="#64748B"
                          fontSize={12}
                          tickLine={false}
                          axisLine={{ stroke: "#E5E7EB" }}
                          tickFormatter={(val) => `$${val}k`}
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#0F172A",
                            borderColor: "#334155",
                            borderRadius: "12px",
                            color: "#fff",
                            fontSize: "13px",
                            boxShadow: "0 10px 25px -5px rgba(0,0,0,0.3)",
                          }}
                          formatter={(value) => [`$${value},000 USD`, ""]}
                        />
                        <Bar dataKey="beforeSalary" fill="#94A3B8" radius={[6, 6, 0, 0]} maxBarSize={36} />
                        <Bar dataKey="afterSalary" fill="#2563EB" radius={[6, 6, 0, 0]} maxBarSize={36} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="growth"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col gap-6"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#F1F5F9]">
                    <div>
                      <h3 className="text-[18px] font-bold text-[#0F172A]">
                        Enterprise Adoption & Learner Expansion
                      </h3>
                      <p className="text-[13px] text-[#64748B]">
                        Cumulative certified engineers and active enterprise client logos (2022 - 2026)
                      </p>
                    </div>

                    <div className="flex items-center gap-6 text-[12px] font-semibold">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-blue-600" />
                        <span className="text-[#0F172A]">Active Learners</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-indigo-500" />
                        <span className="text-[#64748B]">Enterprise Accounts</span>
                      </div>
                    </div>
                  </div>

                  <div className="h-[320px] sm:h-[380px] w-full pt-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={GROWTH_DATA} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                        <defs>
                          <linearGradient id="learnersGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#2563EB" stopOpacity={0.35} />
                            <stop offset="95%" stopColor="#2563EB" stopOpacity={0.0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                        <XAxis
                          dataKey="year"
                          stroke="#64748B"
                          fontSize={12}
                          tickLine={false}
                          axisLine={{ stroke: "#E5E7EB" }}
                        />
                        <YAxis
                          stroke="#64748B"
                          fontSize={12}
                          tickLine={false}
                          axisLine={{ stroke: "#E5E7EB" }}
                          tickFormatter={(val) => `${val / 1000}k`}
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#0F172A",
                            borderColor: "#334155",
                            borderRadius: "12px",
                            color: "#fff",
                            fontSize: "13px",
                          }}
                        />
                        <Area
                          type="monotone"
                          dataKey="learners"
                          stroke="#2563EB"
                          strokeWidth={3}
                          fillOpacity={1}
                          fill="url(#learnersGradient)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Bottom Key Metric Stat Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 mt-6 border-t border-[#F1F5F9]">
              <div className="p-4 rounded-xl bg-slate-50 border border-[#E5E7EB] flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                  +62%
                </div>
                <div>
                  <h4 className="text-[13px] font-bold text-[#0F172A]">Avg Salary Lift</h4>
                  <p className="text-[11px] text-[#64748B]">Post 12-week program completion</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-[#E5E7EB] flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                  94%
                </div>
                <div>
                  <h4 className="text-[13px] font-bold text-[#0F172A]">Cohort Retention</h4>
                  <p className="text-[11px] text-[#64748B]">Across Fortune 500 engineering teams</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-[#E5E7EB] flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-[13px] font-bold text-[#0F172A]">ISO 27001 Certified</h4>
                  <p className="text-[11px] text-[#64748B]">Enterprise infosec & data privacy</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

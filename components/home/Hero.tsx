"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Users,
  Award,
  ShieldCheck,
  Activity,
  Cpu,
  Star,
  Command,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/common/Badge";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Hero3DCanvas } from "./Hero3DCanvas";

interface HeroProps {
  onOpenEnquireModal: () => void;
  onOpenCommandPalette: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenEnquireModal, onOpenCommandPalette }) => {
  const [activeDashboardTab, setActiveDashboardTab] = useState<"growth" | "analytics" | "security">("growth");

  return (
    <section id="hero" className="relative pt-28 sm:pt-36 pb-20 sm:pb-28 overflow-hidden bg-slate-50 dark:bg-slate-950 transition-colors">
      {/* 3D WebGL Canvas Background */}
      <Hero3DCanvas />

      {/* Ambient Gradient Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-linear-to-b from-blue-500/10 via-indigo-500/5 to-transparent blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 -right-32 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <Container className="relative z-10">
        <div className="relative rounded-3xl bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/80 p-6 sm:p-10 lg:p-14 shadow-2xl shadow-slate-200/40 dark:shadow-slate-950/60 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            
            {/* Left Content Column */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="lg:col-span-7 flex flex-col items-start gap-6 z-10"
            >
              <div className="flex items-center gap-3">
                <Badge variant="primary" icon={<Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />}>
                  Enterprise Capability Engine
                </Badge>

                <button
                  onClick={onOpenCommandPalette}
                  className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-bold flex items-center gap-1.5 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors border border-slate-200 dark:border-slate-700"
                >
                  <Command className="w-3 h-3 text-slate-400" />
                  <span>Spotlight ⌘K</span>
                </button>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.08]">
                Next-Gen Expertise <br />
                <span className="text-blue-600 dark:text-blue-400">
                  For Your Enterprise
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 font-medium leading-relaxed max-w-xl">
                Cultivate high-performance teams through expert learning. Co-created curriculums designed to scale AI, Data Science, and Leadership capabilities.
              </p>

              {/* Bullet Features */}
              <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-1">
                {[
                  "Tailored Solutions",
                  "Industry Insights",
                  "Expert Guidance",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm font-bold text-slate-800 dark:text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Action CTA */}
              <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
                <MagneticButton strength={25} onClick={onOpenEnquireModal}>
                  <Button
                    variant="gradient"
                    size="lg"
                    rightIcon={<ArrowRight className="w-5 h-5" />}
                    className="shadow-xl w-full sm:w-auto"
                  >
                    Enquire Now
                  </Button>
                </MagneticButton>

                <a
                  href="#edge"
                  className="px-6 py-3.5 rounded-2xl border border-slate-300 dark:border-slate-700 hover:border-blue-600 dark:hover:border-blue-400 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 font-semibold text-center hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm sm:text-base shadow-sm"
                >
                  Explore Accredian Edge
                </a>
              </div>
            </motion.div>

            {/* Right Graphic Illustration Column */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, x: 30 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
              className="lg:col-span-5 relative flex items-center justify-center z-10"
            >
              {/* Graphic Card Illustration */}
              <div className="relative w-full aspect-4/3 rounded-2xl bg-slate-900/90 dark:bg-slate-900/90 p-5 sm:p-7 text-white shadow-xl flex flex-col justify-between overflow-hidden border border-slate-800">
                <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/5 rounded-full blur-2xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-36 h-36 bg-indigo-500/5 rounded-full blur-xl pointer-events-none" />

                {/* Dashboard Window Header */}
                <div className="flex items-center justify-between z-10 border-b border-white/10 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-amber-400" />
                    <div className="w-3 h-3 rounded-full bg-emerald-400" />
                  </div>
                  <div className="flex items-center gap-1 bg-white/10 p-1 rounded-lg backdrop-blur-sm text-[11px] font-bold">
                    <button
                      onClick={() => setActiveDashboardTab("growth")}
                      className={`px-2 py-0.5 rounded-md transition-colors ${
                        activeDashboardTab === "growth" ? "bg-white text-slate-900" : "text-blue-200 hover:text-white"
                      }`}
                    >
                      Growth
                    </button>
                    <button
                      onClick={() => setActiveDashboardTab("analytics")}
                      className={`px-2 py-0.5 rounded-md transition-colors ${
                        activeDashboardTab === "analytics" ? "bg-white text-slate-900" : "text-blue-200 hover:text-white"
                      }`}
                    >
                      Analytics
                    </button>
                    <button
                      onClick={() => setActiveDashboardTab("security")}
                      className={`px-2 py-0.5 rounded-md transition-colors ${
                        activeDashboardTab === "security" ? "bg-white text-slate-900" : "text-blue-200 hover:text-white"
                      }`}
                    >
                      Infosec
                    </button>
                  </div>
                </div>

                {/* Dashboard Mockup Content Switcher */}
                <div className="my-auto py-4 z-10 min-h-40 flex flex-col justify-center">
                  <AnimatePresence mode="wait">
                    {activeDashboardTab === "growth" && (
                      <motion.div
                        key="growth"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex flex-col gap-3"
                      >
                        <div className="flex items-center justify-between bg-white/10 p-3.5 rounded-xl backdrop-blur-md border border-white/10">
                          <div className="flex items-center gap-3">
                            <div className="p-2.5 rounded-lg bg-emerald-500/20 text-emerald-300">
                              <TrendingUp className="w-5 h-5" />
                            </div>
                            <div>
                              <div className="text-xs text-blue-200 font-medium">Skill Proficiency Index</div>
                              <div className="text-xl font-bold text-white">+48% Growth</div>
                            </div>
                          </div>
                          <span className="text-xs font-bold bg-emerald-500/30 text-emerald-200 px-2.5 py-1 rounded-md">Q3 Benchmark</span>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div className="bg-white/10 p-3 rounded-xl backdrop-blur-md border border-white/10 flex items-center gap-2.5">
                            <Users className="w-4 h-4 text-blue-300 shrink-0" />
                            <div>
                              <div className="text-[11px] text-blue-200">Active Learners</div>
                              <div className="text-xs font-bold text-white">10,000+ Seats</div>
                            </div>
                          </div>
                          <div className="bg-white/10 p-3 rounded-xl backdrop-blur-md border border-white/10 flex items-center gap-2.5">
                            <Award className="w-4 h-4 text-amber-300 shrink-0" />
                            <div>
                              <div className="text-[11px] text-blue-200">Completion</div>
                              <div className="text-xs font-bold text-white">96.4% Rate</div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {activeDashboardTab === "analytics" && (
                      <motion.div
                        key="analytics"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex flex-col gap-3"
                      >
                        <div className="flex items-center justify-between bg-white/10 p-3.5 rounded-xl backdrop-blur-md border border-white/10">
                          <div className="flex items-center gap-3">
                            <div className="p-2.5 rounded-lg bg-blue-500/20 text-blue-300">
                              <Activity className="w-5 h-5" />
                            </div>
                            <div>
                              <div className="text-xs text-blue-200 font-medium">Cohort Engagement Velocity</div>
                              <div className="text-xl font-bold text-white">9.4 / 10 Score</div>
                            </div>
                          </div>
                          <span className="text-xs font-bold bg-blue-500/30 text-blue-200 px-2.5 py-1 rounded-md">Live Cohort</span>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div className="bg-white/10 p-3 rounded-xl backdrop-blur-md border border-white/10 flex items-center gap-2.5">
                            <Cpu className="w-4 h-4 text-cyan-300 shrink-0" />
                            <div>
                              <div className="text-[11px] text-blue-200">Hands-on Labs</div>
                              <div className="text-xs font-bold text-white">450+ Completed</div>
                            </div>
                          </div>
                          <div className="bg-white/10 p-3 rounded-xl backdrop-blur-md border border-white/10 flex items-center gap-2.5">
                            <TrendingUp className="w-4 h-4 text-emerald-300 shrink-0" />
                            <div>
                              <div className="text-[11px] text-blue-200">Proj Deployment</div>
                              <div className="text-xs font-bold text-white">3.2x Faster</div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {activeDashboardTab === "security" && (
                      <motion.div
                        key="security"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex flex-col gap-3"
                      >
                        <div className="flex items-center justify-between bg-white/10 p-3.5 rounded-xl backdrop-blur-md border border-white/10">
                          <div className="flex items-center gap-3">
                            <div className="p-2.5 rounded-lg bg-emerald-500/20 text-emerald-300">
                              <ShieldCheck className="w-5 h-5" />
                            </div>
                            <div>
                              <div className="text-xs text-blue-200 font-medium">Enterprise Security & Compliance</div>
                              <div className="text-xl font-bold text-emerald-300">SOC-2 Certified</div>
                            </div>
                          </div>
                          <span className="text-xs font-bold bg-emerald-500/30 text-emerald-200 px-2.5 py-1 rounded-md">Audit Passed</span>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div className="bg-white/10 p-3 rounded-xl backdrop-blur-md border border-white/10 flex items-center gap-2.5">
                            <ShieldCheck className="w-4 h-4 text-blue-300 shrink-0" />
                            <div>
                              <div className="text-[11px] text-blue-200">SAML SSO</div>
                              <div className="text-xs font-bold text-white">Okta / Azure AD</div>
                            </div>
                          </div>
                          <div className="bg-white/10 p-3 rounded-xl backdrop-blur-md border border-white/10 flex items-center gap-2.5">
                            <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
                            <div>
                              <div className="text-[11px] text-blue-200">Data Isolation</div>
                              <div className="text-xs font-bold text-white">VPC Compliant</div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="z-10 flex items-center justify-between pt-2 border-t border-white/10 text-xs text-blue-200">
                  <span>Co-Created Corporate Curriculums</span>
                  <span className="font-semibold text-white">Fortune 500 Ready</span>
                </div>
              </div>

              {/* Floating Accent Badge 1 */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -left-4 bg-white dark:bg-slate-900 p-3.5 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 flex items-center gap-3 z-20"
              >
                <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-xs gap-1">
                  <Star className="w-3.5 h-3.5 fill-blue-600 text-blue-600" />
                  <span>4.7</span>
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">Top Rated Programs</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">Corporate Cohort Feedback</div>
                </div>
              </motion.div>

              {/* Floating Accent Badge 2 */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-4 -right-4 bg-white dark:bg-slate-900 p-3.5 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 flex items-center gap-3 z-20"
              >
                <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                  50+
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">Customized Programs</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">Across Tech & AI</div>
                </div>
              </motion.div>
            </motion.div>

          </div>
        </div>
      </Container>
    </section>
  );
};

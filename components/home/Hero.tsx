"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight, Sparkles, TrendingUp, Users, Award } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/common/Badge";

interface HeroProps {
  onOpenEnquireModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenEnquireModal }) => {
  return (
    <section id="hero" className="relative pt-28 sm:pt-36 pb-16 sm:pb-24 overflow-hidden bg-slate-50/50">
      {/* Background Decor Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-blue-100/50 via-indigo-50/30 to-transparent blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 -right-32 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <Container>
        <div className="relative rounded-3xl bg-gradient-to-br from-slate-100/90 via-blue-50/50 to-indigo-50/60 border border-slate-200/80 p-6 sm:p-10 lg:p-14 shadow-xl shadow-slate-200/50 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            
            {/* Left Content Column */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="lg:col-span-7 flex flex-col items-start gap-6 z-10"
            >
              <Badge variant="primary" icon={<Sparkles className="w-3.5 h-3.5 text-blue-600" />}>
                Enterprise Capability Building
              </Badge>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.1]">
                Next-Gen{" "}
                <span className="bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
                  Expertise
                </span>{" "}
                <br />
                For Your{" "}
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Enterprise
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-slate-600 font-medium leading-relaxed max-w-xl">
                Cultivate high-performance teams through expert learning. Co-created curriculums designed to scale AI, Data Science, and Leadership capabilities.
              </p>

              {/* Bullet Features */}
              <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-1">
                {[
                  "Tailored Solutions",
                  "Industry Insights",
                  "Expert Guidance",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm font-bold text-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Action CTA */}
              <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
                <Button
                  variant="gradient"
                  size="lg"
                  onClick={onOpenEnquireModal}
                  rightIcon={<ArrowRight className="w-5 h-5" />}
                  className="shadow-xl"
                >
                  Enquire Now
                </Button>
                <a
                  href="#edge"
                  className="px-6 py-3.5 rounded-2xl border border-slate-300 hover:border-blue-600 bg-white text-slate-700 font-semibold text-center hover:text-blue-600 transition-colors text-sm sm:text-base"
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
              className="lg:col-span-5 relative flex items-center justify-center"
            >
              {/* Graphic Card Illustration */}
              <div className="relative w-full aspect-[4/3] rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-700 to-blue-900 p-6 sm:p-8 text-white shadow-2xl flex flex-col justify-between overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-36 h-36 bg-blue-400/20 rounded-full blur-xl pointer-events-none" />

                <div className="flex items-center justify-between z-10">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-amber-400" />
                    <div className="w-3 h-3 rounded-full bg-emerald-400" />
                  </div>
                  <span className="text-xs uppercase tracking-wider font-bold bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm">
                    Live Enterprise Dashboard
                  </span>
                </div>

                {/* Dashboard Mockup Content */}
                <div className="my-auto py-6 z-10 flex flex-col gap-4">
                  <div className="flex items-center justify-between bg-white/10 p-4 rounded-xl backdrop-blur-md border border-white/10">
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
                    <div className="bg-white/10 p-3.5 rounded-xl backdrop-blur-md border border-white/10 flex items-center gap-3">
                      <Users className="w-4 h-4 text-blue-300" />
                      <div>
                        <div className="text-[11px] text-blue-200">Active Learners</div>
                        <div className="text-sm font-bold text-white">10,000+</div>
                      </div>
                    </div>
                    <div className="bg-white/10 p-3.5 rounded-xl backdrop-blur-md border border-white/10 flex items-center gap-3">
                      <Award className="w-4 h-4 text-amber-300" />
                      <div>
                        <div className="text-[11px] text-blue-200">Completion</div>
                        <div className="text-sm font-bold text-white">96.4%</div>
                      </div>
                    </div>
                  </div>
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
                className="absolute -top-4 -left-4 bg-white p-3.5 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3 z-20"
              >
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                  ★ 4.7
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Top Rated Programs</div>
                  <div className="text-[11px] text-slate-500">Corporate Cohort Feedback</div>
                </div>
              </motion.div>

              {/* Floating Accent Badge 2 */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-4 -right-4 bg-white p-3.5 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3 z-20"
              >
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                  50+
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Customized Programs</div>
                  <div className="text-[11px] text-slate-500">Across Tech & AI</div>
                </div>
              </motion.div>
            </motion.div>

          </div>
        </div>
      </Container>
    </section>
  );
};

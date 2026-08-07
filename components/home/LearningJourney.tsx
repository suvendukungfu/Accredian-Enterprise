"use client";

import React from "react";
import { motion } from "framer-motion";
import { Search, PenTool, PlayCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";

const JOURNEY_STEPS = [
  {
    number: "1",
    title: "Skill Gap Analysis",
    subtitle: "Identify Needs & Objectives",
    description:
      "Our solution architects meet with your HR & L&D teams to map out technical skill benchmarks, assess workforce baseline capabilities, and set key outcome metrics.",
    icon: <Search className="w-6 h-6 text-blue-600" />,
  },
  {
    number: "2",
    title: "Customized Training Plan",
    subtitle: "Co-Create Curriculum & Schedule",
    description:
      "We design bespoke course modules, case studies, hands-on labs, and schedule cohorts to minimize work disruption while maximizing employee engagement.",
    icon: <PenTool className="w-6 h-6 text-indigo-600" />,
  },
  {
    number: "3",
    title: "Flexible Program Delivery",
    subtitle: "Execute & Measure ROI",
    description:
      "Cohorts undergo immersive training led by industry mentors, build capstone enterprise solutions, and receive post-program tracking and certification.",
    icon: <PlayCircle className="w-6 h-6 text-emerald-600" />,
  },
];

export const LearningJourney: React.FC = () => {
  return (
    <section id="how-it-works" className="py-20 sm:py-28 bg-slate-900 text-white relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <Container>
        <div className="text-center flex flex-col items-center mb-16">
          <span className="px-3.5 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/30 mb-4">
            Seamless Engagement
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
            How It Works: Our <span className="text-blue-400">3-Step Journey</span>
          </h2>
          <p className="mt-4 text-slate-400 text-base sm:text-lg max-w-2xl">
            From diagnostic assessment to enterprise deployment, we ensure a smooth, high-impact learning experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {JOURNEY_STEPS.map((step, idx) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="bg-slate-800/80 border border-slate-700/80 backdrop-blur-xl p-8 rounded-3xl relative flex flex-col justify-between hover:border-blue-500/50 transition-all duration-300 group"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-slate-700/80 border border-slate-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                    {step.icon}
                  </div>
                  <span className="w-10 h-10 rounded-full bg-blue-600/20 border border-blue-500/40 text-blue-400 font-bold flex items-center justify-center text-sm">
                    0{step.number}
                  </span>
                </div>

                <div className="text-xs uppercase font-bold tracking-widest text-blue-400 mb-1">
                  {step.subtitle}
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors">
                  {step.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};

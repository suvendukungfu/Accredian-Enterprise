"use client";

import React from "react";
import { motion } from "framer-motion";
import { Users, PenTool, Award, MessageSquare } from "lucide-react";
import { Container } from "@/components/ui/Container";

const JOURNEY_STEPS = [
  {
    number: "01",
    title: "1-on-1 Diagnostic Audit",
    subtitle: "Human Solution Architects",
    description:
      "Our senior tech leads meet with your engineering directors and L&D teams to audit your current tech stack, review production codebases, and map out realistic skill targets.",
    icon: <Users className="w-5 h-5" />,
    iconColor: "text-blue-400 bg-slate-800 border-slate-700",
  },
  {
    number: "02",
    title: "Co-Authored Curriculum",
    subtitle: "Tailored to Your Production Stack",
    description:
      "We build custom course modules using your company's actual datasets, internal SDKs, and workflow protocols — ensuring 100% relevance from Day 1.",
    icon: <PenTool className="w-5 h-5" />,
    iconColor: "text-indigo-400 bg-slate-800 border-slate-700",
  },
  {
    number: "03",
    title: "Live Mentorship & Code Reviews",
    subtitle: "Agile Sprints & Certification",
    description:
      "Cohorts work in live masterclasses with industry practitioners, receive 1-on-1 code reviews on capstone builds, and get post-program outcome reports.",
    icon: <Award className="w-5 h-5" />,
    iconColor: "text-emerald-400 bg-slate-800 border-slate-700",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.15 },
  }),
};

export const LearningJourney: React.FC = () => {
  return (
    <section id="how-it-works" className="py-20 sm:py-28 bg-[#0F172A] text-white relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/8 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-600/8 rounded-full blur-[120px] pointer-events-none" />

      <Container className="relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center flex flex-col items-center mb-16"
        >
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[12px] font-semibold bg-blue-500/15 text-blue-300 border border-blue-500/25 mb-5">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Human-Centric Methodology</span>
          </span>
          <h2 className="text-[32px] sm:text-[40px] md:text-[48px] font-extrabold text-white tracking-[-0.03em] leading-[1.1]">
            How We Partner:{" "}
            <span className="bg-linear-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Human-Led Growth
            </span>
          </h2>
          <p className="mt-4 text-[16px] sm:text-[17px] text-slate-400 max-w-2xl leading-[1.65]">
            Real engineers, real mentors, and customized production projects. No pre-recorded videos or automated bot grading.
          </p>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {JOURNEY_STEPS.map((step, idx) => (
            <motion.div
              key={step.number}
              custom={idx}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="bg-slate-900/60 border border-slate-800 backdrop-blur-xl p-8 rounded-[24px] flex flex-col justify-between hover:border-blue-500/40 transition-all duration-300 group shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between mb-7">
                  <div className={`w-11 h-11 rounded-xl border flex items-center justify-center group-hover:scale-110 transition-transform duration-200 ${step.iconColor}`}>
                    {step.icon}
                  </div>
                  <span className="w-10 h-10 rounded-full bg-blue-600/15 border border-blue-500/30 text-blue-400 font-bold flex items-center justify-center text-[13px]">
                    {step.number}
                  </span>
                </div>

                <div className="text-[11px] uppercase font-bold tracking-[0.12em] text-blue-400 mb-1.5">
                  {step.subtitle}
                </div>
                <h3 className="text-[18px] font-bold text-white mb-3 group-hover:text-blue-300 transition-colors leading-snug">
                  {step.title}
                </h3>
                <p className="text-[13px] text-slate-400 leading-[1.65]">
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

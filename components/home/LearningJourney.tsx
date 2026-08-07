"use client";

import React from "react";
import { motion } from "framer-motion";
import { Users, PenTool, Award, MessageSquare, ArrowRight } from "lucide-react";
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

interface LearningJourneyProps {
  onOpenEnquireModal: (options?: { domain?: string; message?: string }) => void;
}

export const LearningJourney: React.FC<LearningJourneyProps> = ({ onOpenEnquireModal }) => {
  return (
    <section id="how-it-works" className="py-20 sm:py-28 bg-[#0F172A] text-white relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 right-0 w-125 h-125 bg-blue-600/8 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-125 h-125 bg-indigo-600/8 rounded-full blur-[120px] pointer-events-none" />

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

        {/* Steps Grid Wrapper with connecting line */}
        <div className="relative">
          {/* Connecting dashed line (Desktop Only) */}
          <div className="hidden md:block absolute top-14 left-[15%] right-[15%] h-px border-t border-dashed border-slate-700/60 z-0 pointer-events-none" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 relative z-10">
            {JOURNEY_STEPS.map((step, idx) => (
              <motion.div
                key={step.number}
                custom={idx}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="bg-slate-900/60 border border-slate-800 backdrop-blur-xl p-8 rounded-3xl flex flex-col justify-between hover:border-blue-500/40 transition-all duration-300 group shadow-xl hover:shadow-2xl"
              >
                <div>
                  <div className="flex items-center justify-between mb-7">
                    <div className={`w-11 h-11 rounded-xl border flex items-center justify-center group-hover:scale-110 transition-transform duration-200 ${step.iconColor}`}>
                      {step.icon}
                    </div>
                    <span className="w-10 h-10 rounded-full bg-blue-600/15 border border-blue-500/30 text-blue-400 font-bold flex items-center justify-center text-[13px] group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
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
        </div>

        {/* Section bottom CTA actions */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-4 text-center"
        >
          <p className="text-[14px] text-slate-400 font-semibold">
            Ready to design your bespoke organization-wide cohort?
          </p>
          <button
            onClick={() => onOpenEnquireModal({ message: "Inquiring about diagnostic audits and co-authored curriculum options." })}
            className="inline-flex items-center gap-2 h-11 px-5 rounded-xl bg-white text-[#0F172A] font-bold text-[13px] shadow-lg hover:shadow-xl hover:bg-slate-50 transition-all active:scale-[0.98] group cursor-pointer"
          >
            <span>Book Diagnostic Audit</span>
            <ArrowRight className="w-4 h-4 text-blue-600 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </motion.div>
      </Container>
    </section>
  );
};

"use client";

import React from "react";
import { motion } from "framer-motion";
import { Users, PenTool, Award, MessageSquare } from "lucide-react";
import { Container } from "@/components/ui/Container";

const JOURNEY_STEPS = [
  {
    number: "1",
    title: "1-on-1 Diagnostic Audit",
    subtitle: "Human Solution Architects",
    description:
      "Our senior tech leads meet with your engineering directors and L&D teams to audit your current tech stack, review production codebases, and map out realistic skill targets.",
    icon: <Users className="w-6 h-6 text-blue-400" />,
  },
  {
    number: "2",
    title: "Co-Authored Curriculum",
    subtitle: "Tailored to Your Production Stack",
    description:
      "We build custom course modules using your company's actual datasets, internal SDKs, and workflow protocols — ensuring 100% relevance from Day 1.",
    icon: <PenTool className="w-6 h-6 text-indigo-400" />,
  },
  {
    number: "3",
    title: "Live Mentorship & Code Reviews",
    subtitle: "Agile Sprints & Certification",
    description:
      "Cohorts work in live masterclasses with industry practitioners, receive 1-on-1 code reviews on capstone builds, and get post-program outcome reports.",
    icon: <Award className="w-6 h-6 text-emerald-400" />,
  },
];

export const LearningJourney: React.FC = () => {
  return (
    <section id="how-it-works" className="py-20 sm:py-28 bg-slate-950 text-white relative overflow-hidden transition-colors">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <Container>
        <div className="text-center flex flex-col items-center mb-16">
          <span className="px-3.5 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/30 mb-4 flex items-center gap-1.5">
            <MessageSquare className="w-3.5 h-3.5 text-blue-400" />
            <span>Human-Centric Methodology</span>
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
            How We Partner: <span className="bg-linear-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">Human-Led Growth</span>
          </h2>
          <p className="mt-4 text-slate-400 text-base sm:text-lg max-w-2xl">
            Real engineers, real mentors, and customized production projects. No pre-recorded videos or automated bot grading.
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
              className="bg-slate-900/80 border border-slate-800 backdrop-blur-xl p-8 rounded-3xl relative flex flex-col justify-between hover:border-blue-500/50 transition-all duration-300 group shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center group-hover:scale-110 transition-transform">
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

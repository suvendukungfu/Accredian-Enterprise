"use client";

import React from "react";
import { motion } from "framer-motion";
import { Cpu, Target, Rocket, Award, ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/Container";

const CAT_STEPS = [
  {
    step: "01",
    title: "Competency Diagnostic",
    description: "In-depth skill audit across employee cohorts to pinpoint specific domain gaps and capability benchmarks.",
    icon: <Target className="w-5 h-5 text-blue-600" />,
    iconBg: "bg-blue-50 border-blue-100",
  },
  {
    step: "02",
    title: "Curriculum Customization",
    description: "Co-authoring modular learning tracks aligned to enterprise tech stack, security policies, and internal goals.",
    icon: <Cpu className="w-5 h-5 text-indigo-600" />,
    iconBg: "bg-indigo-50 border-indigo-100",
  },
  {
    step: "03",
    title: "Agile Project Execution",
    description: "Interactive live masterclasses, sprint-based capstone builds, and code review by top industry practitioners.",
    icon: <Rocket className="w-5 h-5 text-emerald-600" />,
    iconBg: "bg-emerald-50 border-emerald-100",
  },
  {
    step: "04",
    title: "Outcome Certification",
    description: "Post-program assessment, skill uplift reporting, and enterprise credentialing for certified professionals.",
    icon: <Award className="w-5 h-5 text-amber-600" />,
    iconBg: "bg-amber-50 border-amber-100",
  },
];

export const CATFramework: React.FC = () => {
  return (
    <section id="cat" className="py-20 sm:py-28 bg-white border-y border-[#E5E7EB]">
      <Container>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-14 sm:mb-16"
        >
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[12px] font-semibold bg-blue-50 text-blue-600 border border-blue-100 mb-5">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Proprietary Methodology</span>
          </span>
          <h2 className="text-[32px] sm:text-[40px] md:text-[48px] font-extrabold text-[#0F172A] tracking-[-0.03em] leading-[1.1]">
            The Accredian{" "}
            <span className="bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              CAT Framework
            </span>
          </h2>
          <p className="mt-4 text-[16px] sm:text-[17px] text-[#64748B] leading-[1.65] max-w-xl mx-auto">
            Our systematic 4-stage Capability Assessment & Transformation Framework engineered for measurable enterprise skill expansion.
          </p>
        </motion.div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {CAT_STEPS.map((item, idx) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white border border-[#E5E7EB] rounded-[24px] p-7 sm:p-8 shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.06)] hover:border-blue-200 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className={`w-11 h-11 rounded-xl border flex items-center justify-center group-hover:scale-110 transition-transform duration-200 ${item.iconBg}`}>
                    {item.icon}
                  </div>
                  <span className="text-[28px] font-extrabold text-slate-200 group-hover:text-blue-600 transition-colors">
                    {item.step}
                  </span>
                </div>

                <h3 className="text-[17px] font-bold text-[#0F172A] mb-3 group-hover:text-blue-600 transition-colors leading-snug">
                  {item.title}
                </h3>

                <p className="text-[13px] text-[#64748B] leading-[1.65]">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};

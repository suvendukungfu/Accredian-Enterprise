"use client";

import React from "react";
import { motion } from "framer-motion";
import { Cpu, Target, Rocket, Award } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Card } from "@/components/ui/Card";

const CAT_STEPS = [
  {
    step: "01",
    title: "Competency Diagnostic",
    description: "In-depth skill audit across employee cohorts to pinpoint specific domain gaps and capability benchmarks.",
    icon: <Target className="w-6 h-6 text-blue-600" />,
  },
  {
    step: "02",
    title: "Curriculum Customization",
    description: "Co-authoring modular learning tracks aligned to enterprise tech stack, security policies, and internal goals.",
    icon: <Cpu className="w-6 h-6 text-indigo-600" />,
  },
  {
    step: "03",
    title: "Agile Project Execution",
    description: "Interactive live masterclasses, sprint-based capstone builds, and code review by top industry practitioners.",
    icon: <Rocket className="w-6 h-6 text-emerald-600" />,
  },
  {
    step: "04",
    title: "Outcome Certification",
    description: "Post-program assessment, skill uplift reporting, and enterprise credentialing for certified professionals.",
    icon: <Award className="w-6 h-6 text-amber-600" />,
  },
];

export const CATFramework: React.FC = () => {
  return (
    <section id="cat" className="py-20 sm:py-28 bg-white relative overflow-hidden">
      <Container>
        <SectionHeading
          badgeText="Proprietary Methodology"
          title="The Accredian"
          highlightText="CAT Framework"
          subtitle="Our systematic 4-stage Capability Assessment & Transformation Framework engineered for measurable enterprise skill expansion."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {CAT_STEPS.map((item, idx) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <Card
                variant="bordered"
                padding="lg"
                className="h-full flex flex-col justify-between relative group hover:border-blue-500 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <span className="text-3xl font-black text-slate-200 group-hover:text-blue-200 transition-colors">
                    {item.step}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-1 text-xs font-bold text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Phase {item.step} Benchmark</span>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};

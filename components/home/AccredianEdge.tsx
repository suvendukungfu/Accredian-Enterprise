"use client";

import React from "react";
import { motion } from "framer-motion";
import { SlidersHorizontal, Laptop2, CalendarCheck, ShieldAlert } from "lucide-react";
import { Container } from "@/components/ui/Container";

const PILLARS = [
  {
    id: "customized-curriculums",
    icon: <SlidersHorizontal className="w-5 h-5" />,
    iconColor: "text-blue-600 bg-blue-50 border-blue-100",
    title: "Customized Curriculums",
    description:
      "Every program is tailored to your organization's specific technical ecosystem, internal datasets, business objectives, and competency frameworks.",
  },
  {
    id: "practical-learning",
    icon: <Laptop2 className="w-5 h-5" />,
    iconColor: "text-indigo-600 bg-indigo-50 border-indigo-100",
    title: "Hands-on Practical Learning",
    description:
      "Employees build production-ready projects, work through real-world case studies, and apply industry best practices directly to active enterprise initiatives.",
  },
  {
    id: "flexible-delivery",
    icon: <CalendarCheck className="w-5 h-5" />,
    iconColor: "text-emerald-600 bg-emerald-50 border-emerald-100",
    title: "Flexible Delivery Formats",
    description:
      "Choose live interactive online cohorts, immersive on-premise executive workshops, or self-paced blended learning paths tailored to your global workforce schedules.",
  },
  {
    id: "post-program-support",
    icon: <ShieldAlert className="w-5 h-5" />,
    iconColor: "text-amber-600 bg-amber-50 border-amber-100",
    title: "Post-Program Support",
    description:
      "Continuous learning resources, mentorship access, cohort skill gap tracking, and capstone evaluation dashboards ensure long-term knowledge retention.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1 },
  }),
};

export const AccredianEdge: React.FC = () => {
  return (
    <section id="edge" className="py-20 sm:py-28 bg-white transition-colors">
      <Container>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-14 sm:mb-16"
        >
          <span className="inline-flex items-center px-3.5 py-1 rounded-full text-[12px] font-semibold bg-blue-50 text-blue-600 border border-blue-100 mb-5">
            Why Partner With Us
          </span>
          <h2 className="text-[32px] sm:text-[40px] md:text-[48px] font-extrabold text-[#0F172A] tracking-[-0.03em] leading-[1.1]">
            The{" "}
            <span className="bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Accredian Edge
            </span>
          </h2>
          <p className="mt-4 text-[16px] sm:text-[17px] text-[#64748B] leading-[1.65] max-w-xl mx-auto">
            Our enterprise capability building methodology combines rigorous academic fundamentals with agile industry practice.
          </p>
        </motion.div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {PILLARS.map((pillar, idx) => (
            <motion.div
              key={pillar.id}
              custom={idx}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="bg-white border border-[#E5E7EB] rounded-3xl p-7 sm:p-8 shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.06)] transition-all duration-300 group hover:border-blue-200 flex flex-col"
            >
              <div className={`w-11 h-11 rounded-xl border flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-200 ${pillar.iconColor}`}>
                {pillar.icon}
              </div>

              <h3 className="text-[17px] font-bold text-[#0F172A] mb-3 group-hover:text-blue-600 transition-colors leading-snug">
                {pillar.title}
              </h3>

              <p className="text-[13px] text-[#64748B] leading-[1.65] flex-1">
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};

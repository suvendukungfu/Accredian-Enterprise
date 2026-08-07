"use client";

import React from "react";
import { motion } from "framer-motion";
import { SlidersHorizontal, Laptop2, CalendarCheck, ShieldAlert } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Card } from "@/components/ui/Card";

const PILLARS = [
  {
    id: "customized-curriculums",
    icon: <SlidersHorizontal className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
    title: "Customized Curriculums",
    description:
      "Every program is tailored to your organization's specific technical ecosystem, internal datasets, business objectives, and competency frameworks.",
  },
  {
    id: "practical-learning",
    icon: <Laptop2 className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />,
    title: "Hands-on Practical Learning",
    description:
      "Employees build production-ready projects, work through real-world case studies, and apply industry best practices directly to active enterprise initiatives.",
  },
  {
    id: "flexible-delivery",
    icon: <CalendarCheck className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />,
    title: "Flexible Delivery Formats",
    description:
      "Choose live interactive online cohorts, immersive on-premise executive workshops, or self-paced blended learning paths tailored to your global workforce schedules.",
  },
  {
    id: "post-program-support",
    icon: <ShieldAlert className="w-6 h-6 text-amber-600 dark:text-amber-400" />,
    title: "Post-Program Support",
    description:
      "Continuous learning resources, mentorship access, cohort skill gap tracking, and capstone evaluation dashboards ensure long-term knowledge retention.",
  },
];

export const AccredianEdge: React.FC = () => {
  return (
    <section id="edge" className="py-20 sm:py-28 bg-white dark:bg-slate-950 transition-colors">
      <Container>
        <SectionHeading
          badgeText="Why Partner With Us"
          title="The"
          highlightText="Accredian Edge"
          subtitle="Our enterprise capability building methodology combines rigorous academic fundamentals with agile industry practice."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {PILLARS.map((pillar, idx) => (
            <motion.div
              key={pillar.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <Card
                variant="elevated"
                padding="lg"
                className="h-full flex flex-col justify-start group hover:shadow-2xl hover:shadow-blue-500/10 border-slate-100 dark:border-slate-800 dark:bg-slate-900/60 hover:border-blue-200 dark:hover:border-blue-500 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-blue-50 dark:group-hover:bg-blue-950 transition-all">
                  {pillar.icon}
                </div>

                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {pillar.title}
                </h3>

                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {pillar.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};

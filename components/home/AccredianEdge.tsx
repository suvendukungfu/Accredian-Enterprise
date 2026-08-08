"use client";

import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { SlidersHorizontal, Laptop2, CalendarCheck, ShieldAlert } from "lucide-react";
import { Container } from "@/components/ui/Container";

const PILLARS = [
  {
    id: "customized-curriculums",
    icon: <SlidersHorizontal className="w-5 h-5" aria-hidden="true" />,
    iconColor: "text-blue-600 bg-blue-50 border-blue-100",
    title: "Customized Curriculums",
    description:
      "Every program is tailored to your organization's specific technical ecosystem, internal datasets, business objectives, and competency frameworks.",
  },
  {
    id: "practical-learning",
    icon: <Laptop2 className="w-5 h-5" aria-hidden="true" />,
    iconColor: "text-indigo-600 bg-indigo-50 border-indigo-100",
    title: "Hands-on Practical Learning",
    description:
      "Employees build production-ready projects, work through real-world case studies, and apply industry best practices directly to active enterprise initiatives.",
  },
  {
    id: "flexible-delivery",
    icon: <CalendarCheck className="w-5 h-5" aria-hidden="true" />,
    iconColor: "text-emerald-600 bg-emerald-50 border-emerald-100",
    title: "Flexible Delivery Formats",
    description:
      "Choose live interactive online cohorts, immersive on-premise executive workshops, or self-paced blended learning paths tailored to your global workforce schedules.",
  },
  {
    id: "post-program-support",
    icon: <ShieldAlert className="w-5 h-5" aria-hidden="true" />,
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
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      delay: i * 0.1,
    },
  }),
};

interface PillarCardProps {
  pillar: typeof PILLARS[0];
  index: number;
}

const PillarCard: React.FC<PillarCardProps> = ({ pillar, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    };

    card.addEventListener("mousemove", handleMouseMove);
    return () => card.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <motion.div
      ref={cardRef}
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={fadeUp}
      whileHover={{ y: -4, transition: { duration: 0.25, ease: "easeOut" } }}
      className="relative bg-white border border-[#E5E7EB] rounded-3xl p-7 sm:p-8 shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.07)] transition-all duration-300 group hover:border-blue-200 flex flex-col overflow-hidden"
    >
      {/* Subtle cursor light highlight (<5% opacity) */}
      <div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"
        style={{
          background: "radial-gradient(300px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(59, 130, 246, 0.04), transparent 70%)",
        }}
      />

      <div className={`w-11 h-11 rounded-xl border flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 ${pillar.iconColor}`}>
        {pillar.icon}
      </div>

      <h3 className="text-[17px] font-bold text-[#0F172A] mb-3 group-hover:text-blue-600 transition-colors leading-snug">
        {pillar.title}
      </h3>

      <p className="text-[13px] text-[#64748B] leading-[1.65] flex-1">
        {pillar.description}
      </p>
    </motion.div>
  );
};

export const AccredianEdge: React.FC = () => {
  return (
    <section id="edge" className="py-20 sm:py-28 bg-white transition-colors">
      <Container>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
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
            <PillarCard key={pillar.id} pillar={pillar} index={idx} />
          ))}
        </div>
      </Container>
    </section>
  );
};

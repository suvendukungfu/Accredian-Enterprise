"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Users, PenTool, Award, ArrowRight, MessageSquare } from "lucide-react";
import { Container } from "@/components/ui/Container";

const JOURNEY_STEPS = [
  {
    number: "01",
    title: "1-on-1 Diagnostic Audit",
    subtitle: "Human Solution Architects",
    description:
      "Our senior tech leads meet with your engineering directors and L&D teams to audit your current tech stack, review production codebases, and map out realistic skill targets.",
    icon: <Users className="w-5.5 h-5.5" aria-hidden="true" />,
    iconColor: "text-blue-400 bg-blue-950/40 border-blue-900/40 group-hover:border-blue-500/50 group-hover:bg-blue-950/70",
  },
  {
    number: "02",
    title: "Co-Authored Curriculum",
    subtitle: "Tailored to Your Production Stack",
    description:
      "We build custom course modules using your company's actual datasets, internal SDKs, and workflow protocols — ensuring 100% relevance from Day 1.",
    icon: <PenTool className="w-5.5 h-5.5" aria-hidden="true" />,
    iconColor: "text-indigo-400 bg-indigo-950/40 border-indigo-900/40 group-hover:border-indigo-500/50 group-hover:bg-indigo-950/70",
  },
  {
    number: "03",
    title: "Live Mentorship & Code Reviews",
    subtitle: "Agile Sprints & Certification",
    description:
      "Cohorts work in live masterclasses with industry practitioners, receive 1-on-1 code reviews on capstone builds, and get post-program outcome reports.",
    icon: <Award className="w-5.5 h-5.5" aria-hidden="true" />,
    iconColor: "text-emerald-400 bg-emerald-950/40 border-emerald-900/40 group-hover:border-emerald-500/50 group-hover:bg-emerald-950/70",
  },
];

// Header & Subtitle Animation Variants
const badgeVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
} as const;

const headingVariants = {
  hidden: { opacity: 0, y: 15, clipPath: "inset(100% 0% 0% 0%)" },
  visible: {
    opacity: 1,
    y: 0,
    clipPath: "inset(0% 0% 0% 0%)",
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: 0.1 },
  },
} as const;

const descVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut", delay: 0.25 },
  },
} as const;

// Card Animation Variants
const cardVariants = {
  hidden: { opacity: 0, y: 32, scale: 0.98, filter: "blur(8px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      delay: 0.3 + i * 0.12,
    },
  }),
};

const numberBadgeVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { type: "spring" as const, stiffness: 100, damping: 12, delay: 0.5 },
  },
} as const;

interface CardProps {
  step: typeof JOURNEY_STEPS[0];
  index: number;
}

const JourneyCard: React.FC<CardProps> = ({ step, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

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
    <motion.article
      ref={cardRef}
      custom={index}
      variants={cardVariants}
      whileHover={{
        y: -6,
        scale: 1.015,
        transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative bg-slate-900/50 border border-slate-800/80 backdrop-blur-xl p-8 rounded-3xl flex flex-col justify-between hover:border-slate-700/60 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] transition-all duration-300 group select-none"
    >
      {/* Subtle cursor-following radial highlight */}
      <div
        className="absolute inset-0 -z-10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: "radial-gradient(350px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(99, 102, 241, 0.07), transparent 70%)",
        }}
      />

      <div>
        <div className="flex items-center justify-between mb-7">
          {/* Gentle floating icon (pauses on hover) */}
          <motion.div
            animate={isHovered ? { y: 0 } : { y: [0, -3, 0] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            className={`w-12 h-12 rounded-xl border flex items-center justify-center transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_0_15px_rgba(99,102,241,0.1)] ${step.iconColor}`}
          >
            {step.icon}
          </motion.div>

          {/* Milestone Number Badge (spring animation once) */}
          <motion.span
            variants={numberBadgeVariants}
            className="w-10 h-10 rounded-full bg-slate-800/80 border border-slate-700/80 text-slate-400 font-bold flex items-center justify-center text-[13px] group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-500 transition-all duration-300 shadow-sm"
          >
            {step.number}
          </motion.span>
        </div>

        <div className="text-[11px] uppercase font-bold tracking-[0.12em] text-blue-400 mb-1.5 transition-colors group-hover:text-blue-300">
          {step.subtitle}
        </div>
        <h3 className="text-[18px] font-bold text-white mb-3 group-hover:text-blue-300 transition-colors leading-snug">
          {step.title}
        </h3>
        <p className="text-[13px] text-slate-400 leading-[1.65] group-hover:text-slate-300 transition-colors">
          {step.description}
        </p>
      </div>
    </motion.article>
  );
};

interface LearningJourneyProps {
  onOpenEnquireModal: (options?: { domain?: string; message?: string }) => void;
}

export const LearningJourney: React.FC<LearningJourneyProps> = ({ onOpenEnquireModal }) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  // Monitor scroll progress for parallax background breathing and path drawing
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Parallax translation offset for background blobs
  const blobY = useTransform(scrollYProgress, [0, 1], [-45, 45]);

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className="py-20 sm:py-28 bg-[#0F172A] text-white relative overflow-hidden transition-colors"
    >
      {/* Background Orbs with parallax scroll effect and slow breathing scale */}
      <motion.div
        style={{ y: blobY }}
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
        className="absolute top-0 right-0 w-125 h-125 bg-blue-600/8 rounded-full blur-[120px] pointer-events-none"
      />
      <motion.div
        style={{ y: blobY }}
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ repeat: Infinity, duration: 12, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-0 left-0 w-125 h-125 bg-indigo-600/8 rounded-full blur-[120px] pointer-events-none"
      />

      <Container className="relative z-10">
        {/* Header - Staggered viewport entrance */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="text-center flex flex-col items-center mb-20"
        >
          <motion.span
            variants={badgeVariants}
            className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[12px] font-semibold bg-blue-500/15 text-blue-300 border border-blue-500/25 mb-5"
          >
            <MessageSquare className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Human-Centric Methodology</span>
          </motion.span>

          <motion.h2
            variants={headingVariants}
            className="text-[32px] sm:text-[40px] md:text-[48px] font-extrabold text-white tracking-[-0.03em] leading-[1.1] relative group/title"
          >
            How We Partner:{" "}
            <span className="bg-linear-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent transition-all duration-700 hover:brightness-110">
              Human-Led Growth
            </span>
          </motion.h2>

          <motion.p
            variants={descVariants}
            className="mt-4 text-[16px] sm:text-[17px] text-slate-400 max-w-2xl leading-[1.65]"
          >
            Real engineers, real mentors, and customized production projects. No pre-recorded videos or automated bot grading.
          </motion.p>
        </motion.div>

        {/* Steps Grid Wrapper with connecting path */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="relative"
        >
          {/* Animated SVG Path Connecting Line (Desktop Only) */}
          <svg className="hidden md:block absolute top-14 left-0 w-full h-4 z-0 pointer-events-none" overflow="visible">
            {/* Background dashed route line */}
            <line
              x1="16.6%"
              y1="8"
              x2="83.3%"
              y2="8"
              stroke="#334155"
              strokeWidth="2"
              strokeDasharray="5 7"
            />
            {/* Animated drawing path line (runs once on view) */}
            <motion.line
              x1="16.6%"
              y1="8"
              x2="83.3%"
              y2="8"
              stroke="url(#journeyGradient)"
              strokeWidth="2.5"
              strokeDasharray="5 7"
              variants={{
                hidden: { pathLength: 0 },
                visible: {
                  pathLength: 1,
                  transition: { duration: 1.5, ease: "easeInOut", delay: 0.3 }
                }
              }}
            />
            {/* Travelling light pulse energy beam (runs once on view) */}
            <motion.circle
              r="4.5"
              fill="#818CF8"
              filter="drop-shadow(0 0 8px #6366F1)"
              variants={{
                hidden: { cx: "16.6%", opacity: 0 },
                visible: {
                  cx: "83.3%",
                  opacity: [0, 1, 1, 0],
                  transition: { duration: 1.8, ease: "easeInOut", delay: 0.4 }
                }
              }}
            />
            <defs>
              <linearGradient id="journeyGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#3B82F6" />
                <stop offset="50%" stopColor="#6366F1" />
                <stop offset="100%" stopColor="#10B981" />
              </linearGradient>
            </defs>
          </svg>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 relative z-10">
            {JOURNEY_STEPS.map((step, idx) => (
              <JourneyCard key={step.number} step={step} index={idx} />
            ))}
          </div>
        </motion.div>

        {/* Section bottom CTA actions */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.65 }}
          className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-4 text-center"
        >
          <p className="text-[14px] text-slate-400 font-semibold">
            Ready to design your bespoke organization-wide cohort?
          </p>
          <motion.button
            onClick={() => onOpenEnquireModal({ message: "Inquiring about diagnostic audits and co-authored curriculum options." })}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.985 }}
            transition={{ type: "spring", stiffness: 150, damping: 15 }}
            aria-label="Book a diagnostic audit for enterprise upskilling"
            className="inline-flex items-center gap-2 h-11 px-5 rounded-xl bg-white text-[#0F172A] font-bold text-[13px] shadow-lg hover:shadow-xl hover:bg-slate-50 transition-all group cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <span>Book Diagnostic Audit</span>
            <ArrowRight className="w-4 h-4 text-blue-600 group-hover:translate-x-1 transition-transform duration-300" />
          </motion.button>
        </motion.div>
      </Container>
    </section>
  );
};

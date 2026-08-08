"use client";

import React, { useState, useCallback, useMemo, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ShieldCheck, Lock, Building2 } from "lucide-react";
import { Container } from "@/components/ui/Container";

// Dynamically import Three.js Canvas to optimize initial load and page performance
const Hero3DCanvas = dynamic(
  () => import("./Hero3DCanvas").then((mod) => mod.Hero3DCanvas),
  {
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 flex items-center justify-center bg-slate-100/5 rounded-3xl animate-pulse">
        <span className="text-xs text-slate-400 font-medium tracking-wider">Initializing WebGL Engine...</span>
      </div>
    ),
  }
);

interface HeroProps {
  onOpenEnquireModal: () => void;
  onOpenCommandPalette?: () => void;
}

const COMPLIANCE_BADGES = [
  {
    id: "soc2",
    icon: <ShieldCheck className="w-5 h-5 text-blue-400" aria-hidden="true" />,
    label: "SOC-2 Type II\nCertified",
    color: "bg-[#0F172A]",
  },
  {
    id: "iso",
    icon: null,
    label: "ISO 27001",
    color: "bg-[#0F172A]",
    text: "ISO",
  },
  {
    id: "gdpr",
    icon: <Lock className="w-5 h-5 text-indigo-400" aria-hidden="true" />,
    label: "GDPR\nCompliant",
    color: "bg-[#0F172A]",
  },
  {
    id: "fortune",
    icon: <Building2 className="w-5 h-5 text-emerald-400" aria-hidden="true" />,
    label: "Fortune 500\nReady",
    color: "bg-[#0F172A]",
    text: "FORTUNE\n500",
  },
];

// Premium Apple-style Mask/Clip-path Headline Reveal
const headlineVariants = {
  hidden: { opacity: 0, y: 35, clipPath: "inset(100% 0% 0% 0%)" },
  visible: {
    opacity: 1,
    y: 0,
    clipPath: "inset(0% 0% 0% 0%)",
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const, delay },
  }),
};

const badgeContainerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.25 },
  },
};

const badgeItemVariants = {
  hidden: { opacity: 0, scale: 0.85, y: 12 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 100, damping: 14 },
  },
} as const;

export const Hero: React.FC<HeroProps> = ({ onOpenEnquireModal }) => {
  const [enterpriseSize, setEnterpriseSize] = useState(100);
  const [retentionRate, setRetentionRate] = useState(50);
  const [budget, setBudget] = useState(100);
  const [displaySavings, setDisplaySavings] = useState(0);

  const trustCardRef = useRef<HTMLDivElement>(null);
  const roiInfoCardRef = useRef<HTMLDivElement>(null);
  const calcCardRef = useRef<HTMLDivElement>(null);

  const calculatedSavings = useMemo(
    () => Math.round(enterpriseSize * 240 * (retentionRate / 100) + budget * 75),
    [enterpriseSize, retentionRate, budget]
  );

  // Smooth 60 FPS counter interpolation
  useEffect(() => {
    const start = displaySavings;
    const end = calculatedSavings;
    if (start === end) return;

    const duration = 350; // ms
    const startTime = performance.now();

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = progress * (2 - progress); // easeOutQuad
      const val = Math.round(start + (end - start) * ease);
      setDisplaySavings(val);

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [calculatedSavings]);

  // Setup cursor spotlight handler for cards
  useEffect(() => {
    const cards = [trustCardRef.current, roiInfoCardRef.current, calcCardRef.current];
    const listeners: Array<{ card: HTMLDivElement; handler: (e: MouseEvent) => void }> = [];

    cards.forEach((card) => {
      if (!card) return;
      const handler = (e: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);
      };
      card.addEventListener("mousemove", handler);
      listeners.push({ card, handler });
    });

    return () => {
      listeners.forEach(({ card, handler }) => {
        card.removeEventListener("mousemove", handler);
      });
    };
  }, []);

  const handleSizeChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setEnterpriseSize(Number(e.target.value)),
    []
  );
  const handleRetentionChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setRetentionRate(Number(e.target.value)),
    []
  );
  const handleBudgetChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setBudget(Number(e.target.value)),
    []
  );

  return (
    <section
      id="hero"
      className="relative pt-25 sm:pt-28 pb-16 sm:pb-24 page-bg-gradient transition-colors overflow-hidden"
    >
      {/* Hero Headline & 3D Canvas */}
      <Container className="relative z-10 mb-14 sm:mb-18">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-0 items-center min-h-85 sm:min-h-100">
          {/* Left: Headline with Smooth Mask Reveal */}
          <div className="lg:col-span-7 flex flex-col items-start">
            <motion.h1
              initial="hidden"
              animate="visible"
              variants={headlineVariants}
              className="text-[clamp(2.5rem,6vw,4.8rem)] font-extrabold text-[#0F172A] tracking-[-0.03em] leading-[1.05]"
            >
              Transform Your{" "}
              <br className="hidden sm:block" />
              Enterprise Talent
            </motion.h1>

            <motion.p
              custom={0.35}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="text-[16px] sm:text-[18px] text-[#475569] font-normal leading-[1.65] max-w-130 mt-5"
            >
              Build customized executive upskilling tracks with live 1-on-1 industry mentorship, diagnostic code audits, and tailored production stacks.
            </motion.p>
          </div>

          {/* Right: 3D Network Canvas */}
          <motion.div
            custom={0.15}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="lg:col-span-5 relative h-70 sm:h-100 w-full"
          >
            <Hero3DCanvas />
          </motion.div>
        </div>
      </Container>

      {/* Two-Column Cards Section */}
      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch">
          {/* Left Column */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            {/* Trust Card */}
            <motion.div
              ref={trustCardRef}
              custom={0.2}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={fadeUp}
              whileHover={{ y: -3 }}
              className="relative bg-white border border-[#E5E7EB] rounded-3xl p-7 sm:p-8 shadow-[0_1px_3px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_36px_rgba(0,0,0,0.04)] transition-all duration-300 group overflow-hidden"
            >
              {/* Radial Highlight */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: "radial-gradient(280px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(99, 102, 241, 0.04), transparent 70%)",
                }}
              />

              <h2 className="text-[20px] sm:text-[22px] font-bold text-[#0F172A] tracking-[-0.02em] leading-tight">
                Trusted by Industry Leaders
              </h2>
              <p className="text-[12.5px] text-[#94A3B8] mt-1 mb-6">
                Suggestive executive Trust signals
              </p>

              {/* Sequential badging layout */}
              <motion.div
                variants={badgeContainerVariants}
                className="grid grid-cols-4 gap-3 sm:gap-4"
              >
                {COMPLIANCE_BADGES.map((badge) => (
                  <motion.div
                    key={badge.id}
                    variants={badgeItemVariants}
                    className="flex flex-col items-center gap-2.5 text-center group/badge"
                  >
                    <div className={`w-11 h-11 rounded-xl ${badge.color} text-white flex items-center justify-center shadow-sm transition-all duration-300 group-hover/badge:scale-105 group-hover/badge:shadow-[0_0_12px_rgba(99,102,241,0.15)]`}>
                      {badge.icon ? (
                        badge.icon
                      ) : badge.text ? (
                        <span className="text-[10px] font-black leading-[1.1] whitespace-pre-line text-center text-slate-200 group-hover/badge:text-white">
                          {badge.text}
                        </span>
                      ) : null}
                    </div>
                    <span className="text-[11px] font-semibold text-[#475569] leading-[1.3] whitespace-pre-line group-hover/badge:text-[#0F172A] transition-colors">
                      {badge.label}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* ROI Estimator Info Card */}
            <motion.div
              ref={roiInfoCardRef}
              custom={0.3}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={fadeUp}
              whileHover={{ y: -3 }}
              className="relative bg-white border border-[#E5E7EB] rounded-3xl p-7 sm:p-8 shadow-[0_1px_3px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_36px_rgba(0,0,0,0.04)] transition-all duration-300 group flex-1 overflow-hidden"
            >
              {/* Radial Highlight */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: "radial-gradient(280px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(99, 102, 241, 0.04), transparent 70%)",
                }}
              />

              <h3 className="text-[20px] sm:text-[22px] font-bold text-[#0F172A] tracking-[-0.02em]">
                ROI Estimator
              </h3>
              <p className="text-[13.5px] text-[#475569] mt-3 leading-[1.65]">
                Adjust your training parameters to estimate capability enhancements and evaluate the financial return of customized engineering tracks.
              </p>
            </motion.div>
          </div>

          {/* Right Column: Interactive ROI Calculator */}
          <motion.div
            ref={calcCardRef}
            custom={0.25}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={fadeUp}
            whileHover={{ y: -3 }}
            className="relative lg:col-span-7 bg-white border border-[#E5E7EB] rounded-3xl p-7 sm:p-10 shadow-[0_1px_3px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_36px_rgba(0,0,0,0.04)] transition-all duration-300 group flex flex-col justify-between overflow-hidden"
          >
            {/* Radial Highlight */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                background: "radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(99, 102, 241, 0.04), transparent 70%)",
              }}
            />

            <div className="flex flex-col gap-6 relative z-10">
              {/* Enterprise Size Slider */}
              <div className="flex flex-col gap-2.5">
                <div className="flex items-center justify-between">
                  <label htmlFor="enterprise-size-slider" className="text-[13.5px] font-semibold text-[#475569]">
                    Enterprise Size
                  </label>
                  <span className="text-[13.5px] font-bold text-[#0F172A] tabular-nums">{enterpriseSize}+ / Enterprise</span>
                </div>
                <input
                  id="enterprise-size-slider"
                  type="range"
                  min="10"
                  max="500"
                  step="10"
                  value={enterpriseSize}
                  onChange={handleSizeChange}
                  className="w-full h-1.5 bg-slate-100 hover:bg-slate-200/80 rounded-lg appearance-none cursor-pointer accent-[#0F172A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                  aria-label="Enterprise size selector"
                />
              </div>

              {/* Retention Rate Slider */}
              <div className="flex flex-col gap-2.5">
                <div className="flex items-center justify-between">
                  <label htmlFor="retention-rate-slider" className="text-[13.5px] font-semibold text-[#475569]">
                    Current Retention Rate
                  </label>
                  <span className="text-[13.5px] font-bold text-[#0F172A] tabular-nums">{retentionRate}%</span>
                </div>
                <input
                  id="retention-rate-slider"
                  type="range"
                  min="10"
                  max="100"
                  step="5"
                  value={retentionRate}
                  onChange={handleRetentionChange}
                  className="w-full h-1.5 bg-slate-100 hover:bg-slate-200/80 rounded-lg appearance-none cursor-pointer accent-[#0F172A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                  aria-label="Current retention rate selector"
                />
              </div>

              {/* Training Budget Slider */}
              <div className="flex flex-col gap-2.5">
                <div className="flex items-center justify-between">
                  <label htmlFor="training-budget-slider" className="text-[13.5px] font-semibold text-[#475569]">
                    Training Budget
                  </label>
                  <span className="text-[13.5px] font-bold text-[#0F172A] tabular-nums">${budget}k</span>
                </div>
                <input
                  id="training-budget-slider"
                  type="range"
                  min="10"
                  max="500"
                  step="10"
                  value={budget}
                  onChange={handleBudgetChange}
                  className="w-full h-1.5 bg-slate-100 hover:bg-slate-200/80 rounded-lg appearance-none cursor-pointer accent-[#0F172A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                  aria-label="Training budget selector"
                />
              </div>
            </div>

            {/* Savings Output */}
            <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col gap-5 relative z-10">
              <div className="flex items-center justify-between">
                <span className="text-[13.5px] font-semibold text-[#64748B]">
                  Estimated Annual Savings
                </span>
                <span className="text-[30px] sm:text-[34px] font-extrabold text-[#0F172A] tracking-[-0.02em] tabular-nums leading-none">
                  ${displaySavings.toLocaleString()}
                </span>
              </div>

              <motion.button
                onClick={onOpenEnquireModal}
                whileHover={{ y: -1.5, boxShadow: "0 8px 24px rgba(15, 23, 42, 0.12)" }}
                whileTap={{ scale: 0.975 }}
                transition={{ type: "spring" as const, stiffness: 200, damping: 15 }}
                className="w-full h-12 rounded-xl bg-[#0F172A] text-white font-bold text-[14px] transition-colors hover:bg-[#1E293B] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              >
                Book Executive Audit
              </motion.button>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

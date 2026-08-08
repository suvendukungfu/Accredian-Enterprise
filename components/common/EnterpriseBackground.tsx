"use client";

import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export const EnterpriseBackground: React.FC = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.innerWidth < 768;
  });

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleMotionChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    motionQuery.addEventListener("change", handleMotionChange);

    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);

    return () => {
      motionQuery.removeEventListener("change", handleMotionChange);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Smooth scroll tracking across the entire landing page
  const { scrollYProgress } = useScroll();
  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 20,
    restDelta: 0.001,
  });

  // 3D Parallax Depth Layers (GPU-accelerated transforms only)
  // Layer 1: Large Atmospheric Gradient Lighting Shapes (Slowest ~0.1x)
  const layer1Y = useTransform(smoothScroll, [0, 1], ["0px", "120px"]);
  const heroRadialScale = useTransform(smoothScroll, [0, 0.35], [1, 1.2]);

  // Layer 2: Delicate Grid & Flowing Vector Tech Curves (Medium ~0.18x)
  const layer2Y = useTransform(smoothScroll, [0, 1], ["0px", "-180px"]);

  // Layer 3: Faint Micro Light Accent Points (Static/Ultra-Slow ~0.05x)
  const layer3Y = useTransform(smoothScroll, [0, 1], ["0px", "-60px"]);

  // Smooth Atmosphere Opacity Modulation across section scroll
  const atmosphereOpacity = useTransform(smoothScroll, [0, 0.3, 0.7, 1], [0.65, 0.85, 0.7, 0.55]);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
    >
      {/* LAYER 1: Large Blurred Atmospheric Gradient Lighting Shapes (Slowest Movement ~0.1x) */}
      <motion.div
        style={{
          y: prefersReducedMotion ? 0 : layer1Y,
          opacity: atmosphereOpacity,
        }}
        className="absolute inset-0 pointer-events-none"
      >
        {/* HERO SPECIFIC RIGHT-SIDE RADIAL GLOW: Positioned behind the 3D Three.js Network */}
        <motion.div
          style={{ scale: prefersReducedMotion ? 1 : heroRadialScale }}
          className="absolute -top-36 right-[-5%] w-180 h-180 rounded-full bg-linear-to-br from-blue-300/30 via-indigo-300/20 to-cyan-200/15 blur-[140px]"
        />

        {/* Hero Left Side Atmosphere: Soft, ultra-low opacity so headline remains crisp & readable */}
        <div className="absolute top-10 -left-40 w-140 h-140 rounded-full bg-blue-100/15 blur-[130px]" />

        {/* Mid-Page Enterprise Indigo/Cyan Atmospheric Blob (Accredian Edge / Programs) */}
        <div className="absolute top-[34%] -left-36 w-155 h-155 rounded-full bg-linear-to-tr from-indigo-100/25 via-blue-100/20 to-sky-100/20 blur-[135px]" />

        {/* ROI Calculator Concentrated Radial Glow Accent */}
        <div className="absolute top-[64%] right-[-2%] w-170 h-170 rounded-full bg-linear-to-bl from-violet-100/25 via-indigo-100/20 to-blue-100/15 blur-[150px]" />
      </motion.div>

      {/* LAYER 2: Delicate Grid Backdrop & Abstract Vector Technology Lines (Medium Movement ~0.18x) */}
      <motion.div
        style={{
          y: prefersReducedMotion ? 0 : layer2Y,
        }}
        className="absolute inset-0 pointer-events-none"
      >
        {/* Delicate dotted grid overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1.2px,transparent_1.2px)] bg-size-[48px_48px] opacity-35" />

        {/* Abstract Flowing Vector Technology Curves (Desktop Only) */}
        {!isMobile && (
          <svg className="absolute inset-0 w-full h-full opacity-25" overflow="visible">
            <defs>
              <linearGradient id="entLineGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.02" />
                <stop offset="50%" stopColor="#6366f1" stopOpacity="0.16" />
                <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.02" />
              </linearGradient>
              <linearGradient id="entLineGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#818cf8" stopOpacity="0.02" />
                <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.14" />
                <stop offset="100%" stopColor="#a855f7" stopOpacity="0.02" />
              </linearGradient>
            </defs>

            {/* Smooth organic wave path 1 */}
            <path
              d="M-100 220 C 350 120, 650 480, 1150 280 C 1450 140, 1750 400, 2150 240"
              fill="none"
              stroke="url(#entLineGrad1)"
              strokeWidth="1.5"
              strokeDasharray="8 12"
            />

            {/* Smooth organic wave path 2 */}
            <path
              d="M-100 780 C 420 920, 820 680, 1320 880 C 1620 1000, 1920 800, 2220 940"
              fill="none"
              stroke="url(#entLineGrad2)"
              strokeWidth="1.5"
              strokeDasharray="6 10"
            />
          </svg>
        )}
      </motion.div>

      {/* LAYER 3: Faint Particles & Micro Light Accent Points (Ultra-Slow ~0.05x) */}
      {!prefersReducedMotion && !isMobile && (
        <motion.div
          style={{
            y: layer3Y,
          }}
          className="absolute inset-0 pointer-events-none"
        >
          <svg className="absolute inset-0 w-full h-full opacity-40">
            {/* Distributed faint light points */}
            <circle cx="15%" cy="20%" r="1.6" fill="#3b82f6" opacity="0.35" />
            <circle cx="85%" cy="28%" r="2.0" fill="#6366f1" opacity="0.4" />
            <circle cx="22%" cy="50%" r="1.4" fill="#06b6d4" opacity="0.3" />
            <circle cx="78%" cy="65%" r="1.8" fill="#818cf8" opacity="0.35" />
            <circle cx="16%" cy="84%" r="1.6" fill="#3b82f6" opacity="0.25" />
            <circle cx="84%" cy="90%" r="2.2" fill="#a855f7" opacity="0.3" />
          </svg>
        </motion.div>
      )}
    </div>
  );
};

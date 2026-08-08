"use client";

import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export const AnimatedBackground: React.FC = () => {
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

  // Track global page scroll progress
  const { scrollYProgress } = useScroll();
  const smoothScroll = useSpring(scrollYProgress, { stiffness: 60, damping: 20, restDelta: 0.001 });

  // 3D Parallax Depth Layers (GPU accelerated transforms only)
  // Layer 1: Atmospheric Orbs (Slowest ~0.15x)
  const layer1Y = useTransform(smoothScroll, [0, 1], ["0px", "160px"]);
  const heroGlowScale = useTransform(smoothScroll, [0, 0.4], [1, 1.25]);

  // Layer 2: Grid & Abstract Lines (Medium ~0.25x)
  const layer2Y = useTransform(smoothScroll, [0, 1], ["0px", "-240px"]);

  // Layer 3: Floating Light Points (Faster ~0.35x opposite direction)
  const layer3Y = useTransform(smoothScroll, [0, 1], ["0px", "-360px"]);

  // Smooth Atmosphere Opacity Modulation across section scroll
  const atmosphereOpacity = useTransform(smoothScroll, [0, 0.35, 0.7, 1], [0.55, 0.8, 0.65, 0.5]);

  // Subtle Mouse Cursor Parallax (< 12px displacement with spring damping)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (prefersReducedMotion || isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      // Scale coordinates to -12px ... +12px
      const x = (e.clientX / window.innerWidth - 0.5) * 24;
      const y = (e.clientY / window.innerHeight - 0.5) * 24;
      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [prefersReducedMotion, isMobile]);

  const mouseXSpring = useSpring(mousePos.x, { stiffness: 35, damping: 25 });
  const mouseYSpring = useSpring(mousePos.y, { stiffness: 35, damping: 25 });

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
    >
      {/* LAYER 1: Large Atmospheric Gradient Lighting Orbs (Slowest Movement) */}
      <motion.div
        style={{
          y: prefersReducedMotion ? 0 : layer1Y,
          x: prefersReducedMotion ? 0 : mouseXSpring,
          opacity: atmosphereOpacity,
        }}
        className="absolute inset-0 pointer-events-none"
      >
        {/* Primary Hero Atmospheric Blue/Purple Lighting Glow */}
        <motion.div
          style={{ scale: prefersReducedMotion ? 1 : heroGlowScale }}
          className="absolute -top-32 right-[-5%] w-170 h-170 rounded-full bg-linear-to-br from-blue-200/35 via-indigo-200/25 to-purple-200/20 blur-[140px]"
        />

        {/* Mid-Page Enterprise Indigo/Cyan Atmospheric Blob */}
        <div className="absolute top-[32%] -left-32 w-150 h-150 rounded-full bg-linear-to-tr from-indigo-100/30 via-blue-100/20 to-sky-100/25 blur-[130px]" />

        {/* Lower Page Violet/Slate Atmospheric Lighting Accent */}
        <div className="absolute top-[68%] right-[5%] w-155 h-155 rounded-full bg-linear-to-bl from-violet-100/25 via-indigo-100/20 to-blue-100/15 blur-[140px]" />
      </motion.div>

      {/* LAYER 2: Delicate Dotted Grid & Abstract Vector Technology Lines (Medium Movement) */}
      <motion.div
        style={{
          y: prefersReducedMotion ? 0 : layer2Y,
          x: prefersReducedMotion ? 0 : mouseXSpring,
        }}
        className="absolute inset-0 pointer-events-none"
      >
        {/* Subtle radial dotted grid backdrop */}
        <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1.2px,transparent_1.2px)] bg-size-[48px_48px] opacity-40" />

        {/* Abstract Flowing Vector Lines (Desktop Only) */}
        {!isMobile && (
          <svg className="absolute inset-0 w-full h-full opacity-30" overflow="visible">
            <defs>
              <linearGradient id="bgLineGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.03" />
                <stop offset="50%" stopColor="#6366f1" stopOpacity="0.18" />
                <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.02" />
              </linearGradient>
              <linearGradient id="bgLineGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#818cf8" stopOpacity="0.02" />
                <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#a855f7" stopOpacity="0.02" />
              </linearGradient>
            </defs>

            {/* Smooth organic wave path 1 */}
            <path
              d="M-100 200 C 300 100, 600 450, 1100 250 C 1400 120, 1700 380, 2100 220"
              fill="none"
              stroke="url(#bgLineGrad1)"
              strokeWidth="1.5"
              strokeDasharray="8 12"
            />

            {/* Smooth organic wave path 2 */}
            <path
              d="M-100 750 C 400 900, 800 650, 1300 850 C 1600 980, 1900 780, 2200 920"
              fill="none"
              stroke="url(#bgLineGrad2)"
              strokeWidth="1.5"
              strokeDasharray="6 10"
            />
          </svg>
        )}
      </motion.div>

      {/* LAYER 3: Faint Particles & Micro Light Points (Faster Opposite Movement) */}
      {!prefersReducedMotion && !isMobile && (
        <motion.div
          style={{
            y: layer3Y,
            x: mouseYSpring,
          }}
          className="absolute inset-0 pointer-events-none"
        >
          <svg className="absolute inset-0 w-full h-full opacity-45">
            {/* Distributed faint light points */}
            <circle cx="12%" cy="18%" r="1.8" fill="#3b82f6" opacity="0.35" />
            <circle cx="88%" cy="25%" r="2.2" fill="#6366f1" opacity="0.4" />
            <circle cx="24%" cy="48%" r="1.5" fill="#06b6d4" opacity="0.3" />
            <circle cx="76%" cy="62%" r="2.0" fill="#818cf8" opacity="0.35" />
            <circle cx="18%" cy="82%" r="1.8" fill="#3b82f6" opacity="0.25" />
            <circle cx="82%" cy="88%" r="2.4" fill="#a855f7" opacity="0.3" />
          </svg>
        </motion.div>
      )}
    </div>
  );
};

"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

/**
 * EnterpriseBackground — Premium full-bleed cinematic background system.
 *
 * Architecture:
 *   Layer 0: CSS radial/conic atmospheric gradient base
 *   Layer 1: Large blurred organic gradient shapes (slowest parallax ~0.12x)
 *   Layer 2: Abstract SVG network lines + subtle dot grid (medium parallax ~0.22x)
 *   Layer 3: Soft radial light points + grain texture overlay (near-static)
 *
 * Scroll-reactive color shifting:
 *   Hero → soft blue/indigo
 *   Trust → cooler blue
 *   Programs → subtle purple/blue
 *   ROI → concentrated radial glow
 *   CTA → stronger premium gradient
 *
 * Accessibility: aria-hidden, pointer-events:none, prefers-reduced-motion
 * Performance: CSS gradients + SVG + GPU transforms only, no canvas/WebGL
 */

// Deterministic pseudo-random for consistent SSR/CSR
function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

// Generate network connection points (desktop only)
function generateNetworkPoints(count: number) {
  const points: Array<{ x: number; y: number; r: number; opacity: number }> = [];
  for (let i = 0; i < count; i++) {
    points.push({
      x: seededRandom(i * 7 + 3) * 100,
      y: seededRandom(i * 13 + 7) * 100,
      r: 1 + seededRandom(i * 17 + 11) * 1.5,
      opacity: 0.08 + seededRandom(i * 23 + 19) * 0.12,
    });
  }
  return points;
}

// Generate connection lines between nearby network points
function generateConnections(
  points: Array<{ x: number; y: number }>,
  maxDistance: number
) {
  const lines: Array<{ x1: number; y1: number; x2: number; y2: number; opacity: number }> = [];
  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      const dx = points[i].x - points[j].x;
      const dy = points[i].y - points[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < maxDistance) {
        lines.push({
          x1: points[i].x,
          y1: points[i].y,
          x2: points[j].x,
          y2: points[j].y,
          opacity: 0.03 + (1 - dist / maxDistance) * 0.07,
        });
      }
    }
  }
  return lines;
}

const NETWORK_POINTS = generateNetworkPoints(28);
const NETWORK_CONNECTIONS = generateConnections(NETWORK_POINTS, 28);

export const EnterpriseBackground: React.FC = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.innerWidth < 768;
  });
  const [isTablet, setIsTablet] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.innerWidth < 1024;
  });

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleMotionChange = (e: MediaQueryListEvent) =>
      setPrefersReducedMotion(e.matches);
    motionQuery.addEventListener("change", handleMotionChange);

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth < 1024);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      motionQuery.removeEventListener("change", handleMotionChange);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Mouse parallax tracking (desktop only, constrained to ±8px)
  const mouseRef = useRef({ x: 0, y: 0 });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (prefersReducedMotion || isMobile) return;
      mouseRef.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 16,
        y: (e.clientY / window.innerHeight - 0.5) * 16,
      };
      setMousePos(mouseRef.current);
    },
    [prefersReducedMotion, isMobile]
  );

  useEffect(() => {
    if (prefersReducedMotion || isMobile) return;
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove, prefersReducedMotion, isMobile]);

  const mouseXSpring = useSpring(mousePos.x, { stiffness: 30, damping: 28 });
  const mouseYSpring = useSpring(mousePos.y, { stiffness: 30, damping: 28 });

  // Scroll-driven transforms
  const { scrollYProgress } = useScroll();
  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 22,
    restDelta: 0.0005,
  });

  // Layer 1: Large atmospheric orbs (~0.12x parallax)
  const layer1Y = useTransform(smoothScroll, [0, 1], ["0px", "120px"]);

  // Layer 2: Grid & network lines (~0.22x parallax, opposite direction)
  const layer2Y = useTransform(smoothScroll, [0, 1], ["0px", "-200px"]);

  // Scroll-reactive color intensity for atmospheric layers
  const heroGlowOpacity = useTransform(smoothScroll, [0, 0.15, 0.35], [0.6, 0.45, 0.2]);
  const heroGlowScale = useTransform(smoothScroll, [0, 0.3], [1, 1.35]);
  const midGlowOpacity = useTransform(smoothScroll, [0.15, 0.4, 0.6], [0.15, 0.5, 0.3]);
  const lowerGlowOpacity = useTransform(smoothScroll, [0.45, 0.7, 0.9], [0.1, 0.45, 0.35]);
  const ctaGlowOpacity = useTransform(smoothScroll, [0.75, 0.95], [0.15, 0.5]);
  const gridOpacity = useTransform(smoothScroll, [0, 0.2, 0.5, 0.8, 1], [0.25, 0.35, 0.3, 0.25, 0.2]);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
    >
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* LAYER 0: Base Atmospheric CSS Gradient (no JS, pure CSS) */}
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div
        className="absolute inset-0"
        style={{
          background: [
            // Top-center: soft blue atmospheric wash (hero area, left side clean)
            "radial-gradient(ellipse 90% 55% at 65% 0%, rgba(219, 234, 254, 0.5) 0%, transparent 65%)",
            // Right side: indigo/purple atmosphere (behind 3D network)
            "radial-gradient(ellipse 45% 50% at 85% 18%, rgba(199, 210, 254, 0.35) 0%, transparent 55%)",
            // Center body: very subtle warm blue
            "radial-gradient(ellipse 70% 40% at 50% 45%, rgba(219, 234, 254, 0.18) 0%, transparent 50%)",
            // Lower-left: cool purple atmospheric transition
            "radial-gradient(ellipse 55% 35% at 25% 75%, rgba(224, 231, 255, 0.2) 0%, transparent 50%)",
            // Bottom-center: stronger premium gradient toward CTA
            "radial-gradient(ellipse 60% 30% at 55% 95%, rgba(199, 210, 254, 0.25) 0%, transparent 50%)",
            "#FAFBFD",
          ].join(", "),
        }}
      />

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* LAYER 1: Large Blurred Organic Gradient Shapes (Slowest ~0.12x) */}
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <motion.div
        style={{
          y: prefersReducedMotion ? 0 : layer1Y,
          x: prefersReducedMotion ? 0 : mouseXSpring,
        }}
        className="absolute inset-0"
      >
        {/* Hero radial glow — sits behind 3D network on right side */}
        <motion.div
          style={{
            opacity: prefersReducedMotion ? 0.45 : heroGlowOpacity,
            scale: prefersReducedMotion ? 1 : heroGlowScale,
          }}
          className="absolute -top-24 right-[-8%] rounded-full blur-[160px]"
        >
          <div
            className="rounded-full"
            style={{
              width: isMobile ? 320 : 720,
              height: isMobile ? 320 : 720,
              background:
                "radial-gradient(circle, rgba(59,130,246,0.18) 0%, rgba(99,102,241,0.12) 40%, rgba(139,92,246,0.06) 70%, transparent 100%)",
            }}
          />
        </motion.div>

        {/* Mid-page blue/indigo atmospheric blob — left side, behind trust/programs */}
        <motion.div
          style={{ opacity: prefersReducedMotion ? 0.25 : midGlowOpacity }}
          className="absolute top-[30%] -left-24 rounded-full blur-[140px]"
        >
          <div
            className="rounded-full"
            style={{
              width: isMobile ? 280 : isTablet ? 400 : 600,
              height: isMobile ? 280 : isTablet ? 400 : 600,
              background:
                "radial-gradient(circle, rgba(99,102,241,0.15) 0%, rgba(59,130,246,0.1) 45%, rgba(14,165,233,0.05) 70%, transparent 100%)",
            }}
          />
        </motion.div>

        {/* Lower-right — purple/violet atmospheric accent behind ROI/comparison */}
        <motion.div
          style={{ opacity: prefersReducedMotion ? 0.2 : lowerGlowOpacity }}
          className="absolute top-[60%] right-[-5%] rounded-full blur-[150px]"
        >
          <div
            className="rounded-full"
            style={{
              width: isMobile ? 260 : isTablet ? 380 : 580,
              height: isMobile ? 260 : isTablet ? 380 : 580,
              background:
                "radial-gradient(circle, rgba(139,92,246,0.12) 0%, rgba(99,102,241,0.08) 45%, rgba(59,130,246,0.04) 70%, transparent 100%)",
            }}
          />
        </motion.div>

        {/* CTA / bottom premium gradient — concentrated near footer CTA */}
        <motion.div
          style={{ opacity: prefersReducedMotion ? 0.2 : ctaGlowOpacity }}
          className="absolute bottom-[-5%] left-[20%] rounded-full blur-[130px]"
        >
          <div
            className="rounded-full"
            style={{
              width: isMobile ? 200 : 500,
              height: isMobile ? 200 : 500,
              background:
                "radial-gradient(circle, rgba(99,102,241,0.14) 0%, rgba(59,130,246,0.08) 50%, transparent 100%)",
            }}
          />
        </motion.div>
      </motion.div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* LAYER 2: Abstract Network Lines + Subtle Dot Grid (~0.22x) */}
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <motion.div
        style={{
          y: prefersReducedMotion ? 0 : layer2Y,
          x: prefersReducedMotion ? 0 : mouseYSpring,
          opacity: prefersReducedMotion ? 0.2 : gridOpacity,
        }}
        className="absolute inset-0"
      >
        {/* Subtle dot grid — slightly larger spacing for cleaner look */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(148, 163, 184, 0.45) 1px, transparent 1px)",
            backgroundSize: isMobile ? "36px 36px" : "52px 52px",
          }}
        />

        {/* Abstract flowing SVG network topology lines (desktop/tablet only) */}
        {!isMobile && (
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            overflow="visible"
          >
            <defs>
              {/* Gradient for flowing technology curves */}
              <linearGradient
                id="ebg-curve1"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
                <stop offset="20%" stopColor="#3b82f6" stopOpacity="0.08" />
                <stop offset="50%" stopColor="#6366f1" stopOpacity="0.12" />
                <stop offset="80%" stopColor="#8b5cf6" stopOpacity="0.06" />
                <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="ebg-curve2"
                x1="100%"
                y1="0%"
                x2="0%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#818cf8" stopOpacity="0" />
                <stop offset="30%" stopColor="#6366f1" stopOpacity="0.06" />
                <stop offset="60%" stopColor="#3b82f6" stopOpacity="0.1" />
                <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="ebg-curve3"
                x1="0%"
                y1="100%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#a855f7" stopOpacity="0" />
                <stop offset="40%" stopColor="#8b5cf6" stopOpacity="0.07" />
                <stop offset="70%" stopColor="#6366f1" stopOpacity="0.09" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Organic flowing curve — sweeps from left through right upper area */}
            <path
              d="M-5 15 C 15 8, 35 22, 55 14 C 72 7, 85 18, 105 12"
              fill="none"
              stroke="url(#ebg-curve1)"
              strokeWidth="0.15"
              vectorEffect="non-scaling-stroke"
              style={{ strokeWidth: 1.2 }}
            />

            {/* Mid-body flowing curve */}
            <path
              d="M-5 48 C 20 55, 40 38, 60 50 C 78 60, 90 42, 108 52"
              fill="none"
              stroke="url(#ebg-curve2)"
              strokeWidth="0.15"
              vectorEffect="non-scaling-stroke"
              style={{ strokeWidth: 1 }}
            />

            {/* Lower flowing curve */}
            <path
              d="M-5 78 C 18 72, 42 85, 62 76 C 80 68, 92 82, 108 74"
              fill="none"
              stroke="url(#ebg-curve3)"
              strokeWidth="0.15"
              vectorEffect="non-scaling-stroke"
              style={{ strokeWidth: 1 }}
            />

            {/* Faint network connection lines — right-biased (behind 3D network) */}
            {NETWORK_CONNECTIONS.map((line, i) => (
              <line
                key={`conn-${i}`}
                x1={`${line.x1}%`}
                y1={`${line.y1}%`}
                x2={`${line.x2}%`}
                y2={`${line.y2}%`}
                stroke="#6366f1"
                strokeWidth="0.5"
                opacity={line.opacity}
                vectorEffect="non-scaling-stroke"
              />
            ))}

            {/* Network node points */}
            {NETWORK_POINTS.map((pt, i) => (
              <circle
                key={`node-${i}`}
                cx={`${pt.x}%`}
                cy={`${pt.y}%`}
                r={pt.r}
                fill="#6366f1"
                opacity={pt.opacity}
              />
            ))}
          </svg>
        )}
      </motion.div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* LAYER 3: Soft Radial Light Points + Film Grain Overlay */}
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {!isMobile && (
        <div className="absolute inset-0">
          {/* Extremely subtle film grain overlay for premium texture */}
          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              backgroundSize: "128px 128px",
            }}
          />

          {/* Soft radial light accents — near-static, subtle ambient presence */}
          {!prefersReducedMotion && (
            <svg className="absolute inset-0 w-full h-full opacity-50">
              {/* Top-right — warm glow near hero 3D canvas */}
              <circle
                cx="78%"
                cy="12%"
                r="3"
                fill="#3b82f6"
                opacity="0.2"
              />
              <circle
                cx="85%"
                cy="22%"
                r="2"
                fill="#6366f1"
                opacity="0.15"
              />
              {/* Mid-left — subtle ambient */}
              <circle
                cx="15%"
                cy="45%"
                r="2.5"
                fill="#0ea5e9"
                opacity="0.12"
              />
              {/* Lower-right — accent near ROI section */}
              <circle
                cx="72%"
                cy="65%"
                r="2"
                fill="#8b5cf6"
                opacity="0.15"
              />
              {/* Bottom-center — near CTA */}
              <circle
                cx="45%"
                cy="88%"
                r="2.5"
                fill="#6366f1"
                opacity="0.12"
              />
            </svg>
          )}
        </div>
      )}
    </div>
  );
};

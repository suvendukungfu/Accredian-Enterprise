"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

/**
 * EnterpriseBackground — Google DeepMind / Gemini AI & Enterprise Flagship Background.
 *
 * Visual System:
 *   - Google DeepMind / Gemini AI Spectral Mesh Orbs (Electric Blue #4285F4, Cyan #00E5FF, Violet #7C4DFF, Subtle Coral #FF5252 glow accents)
 *   - Layer 0: High-definition atmospheric CSS mesh gradient
 *   - Layer 1: Parallax atmospheric spectral orbs (~0.12x parallax)
 *   - Layer 2: Precision geometric grid + interactive cross-hair node intersections (~0.22x opposite parallax)
 *   - Layer 3: Ambient DeepMind neural connections & micro light particles
 *
 * Performance: GPU accelerated CSS transforms & vector primitives, zero canvas overhead.
 * Accessibility: pointer-events-none, aria-hidden="true", respects prefers-reduced-motion.
 */

// Deterministic pseudo-random helper for consistent SSR/CSR rendering
function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

// Generate precision network nodes
function generateNetworkNodes(count: number) {
  const nodes: Array<{ x: number; y: number; r: number; color: string; opacity: number }> = [];
  const colors = ["#4285F4", "#00E5FF", "#7C4DFF", "#34A853"];

  for (let i = 0; i < count; i++) {
    nodes.push({
      x: seededRandom(i * 7 + 3) * 100,
      y: seededRandom(i * 13 + 7) * 100,
      r: 1.2 + seededRandom(i * 17 + 11) * 1.8,
      color: colors[Math.floor(seededRandom(i * 19 + 5) * colors.length)],
      opacity: 0.1 + seededRandom(i * 23 + 19) * 0.15,
    });
  }
  return nodes;
}

// Generate connection lines between neighboring nodes
function generateNodeConnections(
  nodes: Array<{ x: number; y: number }>,
  maxDistance: number
) {
  const lines: Array<{ x1: number; y1: number; x2: number; y2: number; opacity: number }> = [];
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dx = nodes[i].x - nodes[j].x;
      const dy = nodes[i].y - nodes[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < maxDistance) {
        lines.push({
          x1: nodes[i].x,
          y1: nodes[i].y,
          x2: nodes[j].x,
          y2: nodes[j].y,
          opacity: 0.04 + (1 - dist / maxDistance) * 0.08,
        });
      }
    }
  }
  return lines;
}

const GOOGLE_NODES = generateNetworkNodes(32);
const GOOGLE_CONNECTIONS = generateNodeConnections(GOOGLE_NODES, 25);

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

  // Smooth Cursor Parallax (±12px max displacement)
  const mouseRef = useRef({ x: 0, y: 0 });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (prefersReducedMotion || isMobile) return;
      mouseRef.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 24,
        y: (e.clientY / window.innerHeight - 0.5) * 24,
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

  const mouseXSpring = useSpring(mousePos.x, { stiffness: 28, damping: 26 });
  const mouseYSpring = useSpring(mousePos.y, { stiffness: 28, damping: 26 });

  // Scroll Progress Transforms
  const { scrollYProgress } = useScroll();
  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 45,
    damping: 20,
    restDelta: 0.0005,
  });

  // Layer 1 Parallax (Slow 0.12x)
  const layer1Y = useTransform(smoothScroll, [0, 1], ["0px", "140px"]);

  // Layer 2 Parallax (Opposite 0.22x)
  const layer2Y = useTransform(smoothScroll, [0, 1], ["0px", "-220px"]);

  // Dynamic Scroll Opacity Curves
  const heroSpectralOpacity = useTransform(smoothScroll, [0, 0.2, 0.4], [0.65, 0.5, 0.25]);
  const heroSpectralScale = useTransform(smoothScroll, [0, 0.3], [1, 1.3]);
  const midSpectralOpacity = useTransform(smoothScroll, [0.15, 0.45, 0.7], [0.15, 0.55, 0.3]);
  const lowerSpectralOpacity = useTransform(smoothScroll, [0.45, 0.75, 0.95], [0.15, 0.5, 0.35]);
  const gridOpacity = useTransform(smoothScroll, [0, 0.3, 0.6, 1], [0.35, 0.4, 0.3, 0.25]);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
    >
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* LAYER 0: Google DeepMind & Cloud Inspired Spectral Base Gradient */}
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div
        className="absolute inset-0"
        style={{
          background: [
            // Hero Right Spectral Aura (Google Blue #4285F4 + Cyan #00E5FF)
            "radial-gradient(ellipse 85% 55% at 72% 5%, rgba(66, 133, 244, 0.18) 0%, rgba(0, 229, 255, 0.08) 40%, transparent 70%)",
            // Hero Left Clean Atmospheric Wash
            "radial-gradient(ellipse 70% 45% at 20% 0%, rgba(219, 234, 254, 0.45) 0%, transparent 60%)",
            // Mid-Section Google Gemini Violet Wash (#7C4DFF)
            "radial-gradient(ellipse 65% 45% at 30% 42%, rgba(124, 77, 255, 0.09) 0%, rgba(66, 133, 244, 0.06) 50%, transparent 75%)",
            // Lower Section Vibrant Electric Cyan/Blue Horizon (#00E5FF)
            "radial-gradient(ellipse 60% 40% at 75% 72%, rgba(0, 229, 255, 0.08) 0%, rgba(99, 102, 241, 0.07) 50%, transparent 70%)",
            // Footer CTA Deep Aura Accent
            "radial-gradient(ellipse 70% 35% at 50% 96%, rgba(66, 133, 244, 0.15) 0%, rgba(124, 77, 255, 0.1) 60%, transparent 80%)",
            "#FAFBFD",
          ].join(", "),
        }}
      />

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* LAYER 1: Google AI Spectral Light Orbs (~0.12x Parallax) */}
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <motion.div
        style={{
          y: prefersReducedMotion ? 0 : layer1Y,
          x: prefersReducedMotion ? 0 : mouseXSpring,
        }}
        className="absolute inset-0"
      >
        {/* Primary Hero Google Gemini Spectral Light Orb (Top Right behind 3D Canvas) */}
        <motion.div
          style={{
            opacity: prefersReducedMotion ? 0.5 : heroSpectralOpacity,
            scale: prefersReducedMotion ? 1 : heroSpectralScale,
          }}
          className="absolute -top-28 right-[-6%] rounded-full blur-[150px]"
        >
          <div
            className="rounded-full"
            style={{
              width: isMobile ? 340 : 760,
              height: isMobile ? 340 : 760,
              background:
                "radial-gradient(circle, rgba(66, 133, 244, 0.22) 0%, rgba(0, 229, 255, 0.14) 35%, rgba(124, 77, 255, 0.08) 65%, transparent 100%)",
            }}
          />
        </motion.div>

        {/* Warm Subtle Google Amber Accent (<4% opacity for organic warmth) */}
        <div
          className="absolute top-[8%] right-[25%] rounded-full blur-[130px] opacity-40"
          style={{
            width: isMobile ? 180 : 380,
            height: isMobile ? 180 : 380,
            background:
              "radial-gradient(circle, rgba(255, 171, 0, 0.08) 0%, rgba(244, 81, 30, 0.04) 50%, transparent 100%)",
          }}
        />

        {/* Mid-Page Enterprise DeepMind Blue/Violet Aura (Left Side) */}
        <motion.div
          style={{ opacity: prefersReducedMotion ? 0.3 : midSpectralOpacity }}
          className="absolute top-[32%] -left-28 rounded-full blur-[140px]"
        >
          <div
            className="rounded-full"
            style={{
              width: isMobile ? 300 : isTablet ? 450 : 640,
              height: isMobile ? 300 : isTablet ? 450 : 640,
              background:
                "radial-gradient(circle, rgba(124, 77, 255, 0.16) 0%, rgba(66, 133, 244, 0.11) 45%, rgba(0, 229, 255, 0.06) 70%, transparent 100%)",
            }}
          />
        </motion.div>

        {/* Lower-Page Electric Cyan/Indigo Horizon Light (Right Side) */}
        <motion.div
          style={{ opacity: prefersReducedMotion ? 0.25 : lowerSpectralOpacity }}
          className="absolute top-[62%] right-[-6%] rounded-full blur-[150px]"
        >
          <div
            className="rounded-full"
            style={{
              width: isMobile ? 280 : isTablet ? 420 : 600,
              height: isMobile ? 280 : isTablet ? 420 : 600,
              background:
                "radial-gradient(circle, rgba(0, 229, 255, 0.14) 0%, rgba(66, 133, 244, 0.1) 45%, rgba(124, 77, 255, 0.05) 70%, transparent 100%)",
            }}
          />
        </motion.div>
      </motion.div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* LAYER 2: Precision Google Technical Grid & SVG Neural Lines (~0.22x) */}
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <motion.div
        style={{
          y: prefersReducedMotion ? 0 : layer2Y,
          x: prefersReducedMotion ? 0 : mouseYSpring,
          opacity: prefersReducedMotion ? 0.25 : gridOpacity,
        }}
        className="absolute inset-0"
      >
        {/* Fine-line precision technical grid overlay */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(148, 163, 184, 0.08) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(148, 163, 184, 0.08) 1px, transparent 1px)
            `,
            backgroundSize: isMobile ? "40px 40px" : "64px 64px",
          }}
        />

        {/* Floating Google DeepMind Vector Neural Curves (Desktop/Tablet) */}
        {!isMobile && (
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            overflow="visible"
          >
            <defs>
              <linearGradient id="googleGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#4285F4" stopOpacity="0" />
                <stop offset="30%" stopColor="#4285F4" stopOpacity="0.12" />
                <stop offset="60%" stopColor="#00E5FF" stopOpacity="0.15" />
                <stop offset="90%" stopColor="#7C4DFF" stopOpacity="0.08" />
                <stop offset="100%" stopColor="#7C4DFF" stopOpacity="0" />
              </linearGradient>

              <linearGradient id="googleGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#7C4DFF" stopOpacity="0" />
                <stop offset="35%" stopColor="#00E5FF" stopOpacity="0.12" />
                <stop offset="70%" stopColor="#4285F4" stopOpacity="0.14" />
                <stop offset="100%" stopColor="#34A853" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Neural curve 1: Upper hero sweep */}
            <path
              d="M-5 12 C 20 5, 40 24, 62 12 C 78 4, 92 18, 108 10"
              fill="none"
              stroke="url(#googleGrad1)"
              strokeWidth="0.2"
              vectorEffect="non-scaling-stroke"
              style={{ strokeWidth: 1.4 }}
            />

            {/* Neural curve 2: Mid page sweep */}
            <path
              d="M-5 46 C 22 56, 42 36, 64 48 C 80 58, 92 40, 108 50"
              fill="none"
              stroke="url(#googleGrad2)"
              strokeWidth="0.2"
              vectorEffect="non-scaling-stroke"
              style={{ strokeWidth: 1.2 }}
            />

            {/* Neural connection lines */}
            {GOOGLE_CONNECTIONS.map((line, i) => (
              <line
                key={`gconn-${i}`}
                x1={`${line.x1}%`}
                y1={`${line.y1}%`}
                x2={`${line.x2}%`}
                y2={`${line.y2}%`}
                stroke="#4285F4"
                strokeWidth="0.5"
                opacity={line.opacity}
                vectorEffect="non-scaling-stroke"
              />
            ))}

            {/* Neural nodes */}
            {GOOGLE_NODES.map((node, i) => (
              <circle
                key={`gnode-${i}`}
                cx={`${node.x}%`}
                cy={`${node.y}%`}
                r={node.r}
                fill={node.color}
                opacity={node.opacity}
              />
            ))}
          </svg>
        )}
      </motion.div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* LAYER 3: Google Technical Shimmer & Film Texture Overlay */}
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {!isMobile && (
        <div className="absolute inset-0">
          {/* Subtle noise texture */}
          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              backgroundSize: "128px 128px",
            }}
          />

          {/* Ambient Google Light Points */}
          {!prefersReducedMotion && (
            <svg className="absolute inset-0 w-full h-full opacity-60">
              <circle cx="76%" cy="14%" r="3.5" fill="#4285F4" opacity="0.3" />
              <circle cx="84%" cy="20%" r="2.5" fill="#00E5FF" opacity="0.35" />
              <circle cx="18%" cy="44%" r="2.8" fill="#7C4DFF" opacity="0.25" />
              <circle cx="74%" cy="68%" r="3.0" fill="#00E5FF" opacity="0.3" />
              <circle cx="48%" cy="90%" r="3.2" fill="#4285F4" opacity="0.25" />
            </svg>
          )}
        </div>
      )}
    </div>
  );
};

"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { METRICS_DATA } from "@/constants/metricsData";
import { Container } from "@/components/ui/Container";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

interface CounterProps {
  end: number;
  duration?: number;
  isVisible: boolean;
}

const Counter: React.FC<CounterProps> = ({ end, duration = 2, isVisible }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number | null = null;
    let animationFrameId: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
      const easeProgress = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeProgress * end));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [end, duration, isVisible]);

  return <span className="tabular-nums">{count.toLocaleString()}</span>;
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1 },
  }),
};

interface MetricCardProps {
  metric: typeof METRICS_DATA[0];
  index: number;
  isVisible: boolean;
}

const MetricCard: React.FC<MetricCardProps> = ({ metric, index, isVisible }) => {
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
      viewport={{ once: true }}
      variants={fadeUp}
      whileHover={{ y: -4, transition: { duration: 0.25, ease: "easeOut" } }}
      className="relative bg-white border border-[#E5E7EB] rounded-3xl p-7 sm:p-8 shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.06)] transition-all duration-300 group hover:border-blue-200 overflow-hidden"
    >
      {/* Cursor spotlight highlight */}
      <div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"
        style={{
          background:
            "radial-gradient(300px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(59, 130, 246, 0.04), transparent 70%)",
        }}
      />

      <div className="flex flex-col gap-2">
        <div className="text-[40px] sm:text-[48px] font-extrabold text-[#0F172A] tracking-[-0.03em] flex items-baseline leading-none">
          {metric.prefix}
          <Counter end={metric.value} isVisible={isVisible} />
          {metric.suffix}
        </div>
        <h3 className="text-[16px] font-bold text-[#0F172A]">{metric.label}</h3>
        <p className="text-[13px] text-[#64748B] leading-[1.6]">{metric.description}</p>
      </div>
    </motion.div>
  );
};

export const SuccessMetrics: React.FC = () => {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.2 });

  return (
    <section
      id="stats"
      ref={ref as React.RefObject<HTMLDivElement>}
      className="py-20 sm:py-28 bg-transparent transition-colors relative z-1"
    >
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
            Impact & Scale
          </span>
          <h2 className="text-[32px] sm:text-[40px] md:text-[48px] font-extrabold text-[#0F172A] tracking-[-0.03em] leading-[1.1]">
            Our{" "}
            <span className="bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Track Record
            </span>
          </h2>
          <p className="mt-4 text-[16px] sm:text-[17px] text-[#64748B] leading-[1.65] max-w-xl mx-auto">
            Delivering measurable talent transformation and business results for world-class organizations.
          </p>
        </motion.div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {METRICS_DATA.map((metric, idx) => (
            <MetricCard key={metric.id} metric={metric} index={idx} isVisible={isVisible} />
          ))}
        </div>
      </Container>
    </section>
  );
};

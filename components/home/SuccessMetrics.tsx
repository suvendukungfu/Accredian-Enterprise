"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { METRICS_DATA } from "@/constants/metricsData";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { Card } from "@/components/ui/Card";

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

      // EaseOutQuart function for smooth decelerating count-up
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

  return <span>{count.toLocaleString()}</span>;
};

export const SuccessMetrics: React.FC = () => {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.2 });

  return (
    <section id="stats" ref={ref as React.RefObject<HTMLDivElement>} className="py-20 sm:py-28 bg-slate-50/60">
      <Container>
        <SectionHeading
          badgeText="Impact & Scale"
          title="Our"
          highlightText="Track Record"
          subtitle="Delivering measurable talent transformation and business results for world-class organizations."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {METRICS_DATA.map((metric, idx) => (
            <motion.div
              key={metric.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <Card
                variant="elevated"
                padding="lg"
                className="h-full flex flex-col justify-between group hover:border-blue-300 transition-colors"
              >
                <div className="flex flex-col gap-2">
                  <div className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight flex items-center">
                    {metric.prefix}
                    <Counter end={metric.value} isVisible={isVisible} />
                    <span className="text-blue-600 ml-0.5">{metric.suffix}</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 pt-2 group-hover:text-blue-600 transition-colors">
                    {metric.label}
                  </h3>
                </div>

                <p className="text-sm text-slate-500 mt-4 leading-relaxed border-t border-slate-100 pt-4">
                  {metric.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};

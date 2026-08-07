"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight, TrendingUp, CheckCircle2 } from "lucide-react";
import { TESTIMONIALS_DATA } from "@/constants/testimonialsData";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Card } from "@/components/ui/Card";

export const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS_DATA.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === TESTIMONIALS_DATA.length - 1 ? 0 : prev + 1));
  };

  const activeTestimonial = TESTIMONIALS_DATA[currentIndex];

  return (
    <section id="testimonials" className="py-20 sm:py-28 bg-slate-50/50 dark:bg-slate-950 transition-colors">
      <Container>
        <SectionHeading
          badgeText="Client Voice"
          title="What Enterprise Leaders"
          highlightText="Say About Us"
          subtitle="Discover how Fortune 500 engineering and L&D executives drive capability transformation with Accredian."
        />

        {/* Company Selector Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          {TESTIMONIALS_DATA.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => setCurrentIndex(idx)}
              className={`px-5 py-2.5 rounded-2xl font-bold text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                currentIndex === idx
                  ? "bg-slate-900 dark:bg-blue-600 text-white shadow-lg shadow-slate-900/20 scale-105"
                  : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800"
              }`}
            >
              {item.companyName}
            </button>
          ))}
        </div>

        {/* Testimonial Active Display Card */}
        <div className="max-w-4xl mx-auto">
          <Card
            variant="glass"
            padding="lg"
            className="relative shadow-2xl border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/90"
          >
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white font-black text-xl flex items-center justify-center shadow-md shadow-blue-600/30">
                  {activeTestimonial.authorAvatar || activeTestimonial.companyLogo.charAt(0)}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    {activeTestimonial.companyName}
                    <CheckCircle2 className="w-4 h-4 text-blue-500" />
                  </h3>
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Verified Enterprise Partner
                  </span>
                </div>
              </div>

              {activeTestimonial.impactMetrics && (
                <div className="hidden sm:flex items-center gap-2 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800 px-3.5 py-1.5 rounded-xl text-xs font-bold">
                  <TrendingUp className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>{activeTestimonial.impactMetrics}</span>
                </div>
              )}
            </div>

            {/* Animated Quote Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-6"
              >
                <div className="relative">
                  <Quote className="w-10 h-10 text-blue-100 dark:text-slate-800 absolute -top-4 -left-3 -z-10" />
                  <p className="text-lg sm:text-xl text-slate-700 dark:text-slate-200 font-medium leading-relaxed italic">
                    &quot;{activeTestimonial.quote}&quot;
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 font-bold flex items-center justify-center text-sm border border-blue-200 dark:border-blue-800">
                      {activeTestimonial.authorAvatar || "EX"}
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-slate-900 dark:text-white">
                        {activeTestimonial.authorName}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold">
                        {activeTestimonial.authorTitle}
                      </p>
                    </div>
                  </div>

                  {/* Navigation Arrows */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handlePrev}
                      aria-label="Previous testimonial"
                      className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-600 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={handleNext}
                      aria-label="Next testimonial"
                      className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-600 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </Card>
        </div>
      </Container>
    </section>
  );
};

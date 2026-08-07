"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight, TrendingUp, CheckCircle2 } from "lucide-react";
import { TESTIMONIALS_DATA } from "@/constants/testimonialsData";
import { Container } from "@/components/ui/Container";

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
    <section id="testimonials" className="py-20 sm:py-28 bg-[#FAFBFD] transition-colors">
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
            Client Voice
          </span>
          <h2 className="text-[32px] sm:text-[40px] md:text-[48px] font-extrabold text-[#0F172A] tracking-[-0.03em] leading-[1.1]">
            What Enterprise Leaders{" "}
            <span className="bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Say About Us
            </span>
          </h2>
          <p className="mt-4 text-[16px] sm:text-[17px] text-[#64748B] leading-[1.65] max-w-xl mx-auto">
            Discover how Fortune 500 engineering and L&D executives drive capability transformation with Accredian.
          </p>
        </motion.div>

        {/* Company Selector */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          {TESTIMONIALS_DATA.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => setCurrentIndex(idx)}
              className={`px-5 py-2.5 rounded-xl font-semibold text-[13px] transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                currentIndex === idx
                  ? "bg-[#0F172A] text-white shadow-lg shadow-slate-900/15"
                  : "bg-white text-[#475569] hover:bg-slate-50 border border-[#E5E7EB]"
              }`}
            >
              {item.companyName}
            </button>
          ))}
        </div>

        {/* Testimonial Card */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white border border-[#E5E7EB] rounded-[24px] p-8 sm:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.06)]">
            {/* Header */}
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-[#F1F5F9]">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-blue-600 to-indigo-600 text-white font-black text-lg flex items-center justify-center shadow-md shadow-blue-600/25">
                  {activeTestimonial.authorAvatar || activeTestimonial.companyLogo.charAt(0)}
                </div>
                <div>
                  <h3 className="text-[18px] font-bold text-[#0F172A] flex items-center gap-2">
                    {activeTestimonial.companyName}
                    <CheckCircle2 className="w-4 h-4 text-blue-500" />
                  </h3>
                  <span className="text-[11px] font-semibold text-[#94A3B8] uppercase tracking-wider">
                    Verified Enterprise Partner
                  </span>
                </div>
              </div>

              {activeTestimonial.impactMetrics && (
                <div className="hidden sm:flex items-center gap-2 bg-emerald-50 text-emerald-700 border border-emerald-100 px-3.5 py-1.5 rounded-xl text-[12px] font-bold">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{activeTestimonial.impactMetrics}</span>
                </div>
              )}
            </div>

            {/* Quote Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial.id}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="flex flex-col gap-6"
              >
                <div className="relative">
                  <Quote className="w-10 h-10 text-blue-50 absolute -top-3 -left-2" />
                  <p className="text-[17px] sm:text-[18px] text-[#334155] font-medium leading-[1.75] italic relative z-10">
                    &quot;{activeTestimonial.quote}&quot;
                  </p>
                </div>

                <div className="pt-5 border-t border-[#F1F5F9] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-700 font-bold flex items-center justify-center text-[13px] border border-blue-100">
                      {activeTestimonial.authorAvatar || "EX"}
                    </div>
                    <div>
                      <h4 className="text-[15px] font-bold text-[#0F172A]">
                        {activeTestimonial.authorName}
                      </h4>
                      <p className="text-[12px] text-[#94A3B8] font-semibold">
                        {activeTestimonial.authorTitle}
                      </p>
                    </div>
                  </div>

                  {/* Navigation */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handlePrev}
                      aria-label="Previous testimonial"
                      className="w-10 h-10 rounded-xl border border-[#E5E7EB] hover:border-blue-300 bg-white text-[#475569] hover:text-blue-600 transition-all duration-200 flex items-center justify-center focus-visible:ring-2 focus-visible:ring-blue-500"
                    >
                      <ChevronLeft className="w-4.5 h-4.5" />
                    </button>
                    <button
                      onClick={handleNext}
                      aria-label="Next testimonial"
                      className="w-10 h-10 rounded-xl border border-[#E5E7EB] hover:border-blue-300 bg-white text-[#475569] hover:text-blue-600 transition-all duration-200 flex items-center justify-center focus-visible:ring-2 focus-visible:ring-blue-500"
                    >
                      <ChevronRight className="w-4.5 h-4.5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </Container>
    </section>
  );
};

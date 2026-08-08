"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FAQS_DATA } from "@/constants/faqsData";
import { FAQCategory } from "@/types/faq";
import { Container } from "@/components/ui/Container";
import { Accordion } from "@/components/ui/Accordion";

const FAQ_CATEGORIES: FAQCategory[] = [
  "About the Course",
  "About the Delivery",
  "Miscellaneous",
];

export const FAQs: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<FAQCategory>("About the Course");

  const filteredFaqs = FAQS_DATA.filter((faq) => faq.category === activeCategory);

  return (
    <section id="faqs" className="py-20 sm:py-28 bg-transparent border-t border-[#F1F5F9]/80 relative z-1">
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
            Got Questions?
          </span>
          <h2 className="text-[32px] sm:text-[40px] md:text-[48px] font-extrabold text-[#0F172A] tracking-[-0.03em] leading-[1.1]">
            Frequently Asked{" "}
            <span className="bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
          <p className="mt-4 text-[16px] sm:text-[17px] text-[#64748B] leading-[1.65] max-w-xl mx-auto">
            Everything you need to know about Accredian Enterprise program co-creation and execution.
          </p>
        </motion.div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {FAQ_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-xl text-[13px] font-semibold transition-all duration-200 focus-visible:ring-2 focus-visible:ring-blue-500 focus:outline-none ${
                activeCategory === cat
                  ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                  : "bg-white text-[#475569] hover:bg-slate-50 border border-[#E5E7EB]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Accordion */}
        <div className="max-w-3xl mx-auto">
          <Accordion items={filteredFaqs} />
        </div>
      </Container>
    </section>
  );
};

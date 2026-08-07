"use client";

import React, { useState } from "react";
import { FAQS_DATA } from "@/constants/faqsData";
import { FAQCategory } from "@/types/faq";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
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
    <section id="faqs" className="py-20 sm:py-28 bg-white border-t border-slate-100">
      <Container>
        <SectionHeading
          badgeText="Got Questions?"
          title="Frequently Asked"
          highlightText="Questions"
          subtitle="Everything you need to know about Accredian Enterprise program co-creation and execution."
        />

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {FAQ_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                activeCategory === cat
                  ? "bg-blue-600 text-white shadow-md shadow-blue-600/25"
                  : "bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Accordion Component */}
        <div className="max-w-3xl mx-auto">
          <Accordion items={filteredFaqs} />
        </div>
      </Container>
    </section>
  );
};

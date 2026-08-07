"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, CheckCircle2, ArrowRight, BookOpen, Search, X, Layers, Sparkles } from "lucide-react";
import { PROGRAMS_DATA } from "@/constants/programsData";
import { ExecutiveProgram, ProgramCategory } from "@/types/program";
import { Container } from "@/components/ui/Container";

const CATEGORIES: ProgramCategory[] = [
  "All",
  "Generative AI",
  "Tech & Data",
  "Leadership Development",
  "Product Innovation",
  "Operations Management",
  "Fintech",
];

interface ProgramsProps {
  onOpenEnquireModal: (options?: { domain?: string; message?: string }) => void;
  onSelectProgram: (program: ExecutiveProgram) => void;
}

export const Programs: React.FC<ProgramsProps> = ({ onOpenEnquireModal, onSelectProgram }) => {
  const [selectedCategory, setSelectedCategory] = useState<ProgramCategory>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredPrograms = PROGRAMS_DATA.filter((program) => {
    const matchesCategory =
      selectedCategory === "All" || program.category === selectedCategory;

    const matchesSearch =
      searchQuery.trim() === "" ||
      program.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      program.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      program.keyOutcomes.some((o) => o.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (program.techStack &&
        program.techStack.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())));

    return matchesCategory && matchesSearch;
  });

  return (
    <section id="programs" className="py-20 sm:py-28 bg-[#FAFBFD] transition-colors border-y border-[#E5E7EB]">
      <Container>
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[12px] font-semibold bg-blue-50 text-blue-600 border border-blue-100 mb-5">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Executive Education</span>
          </span>
          <h2 className="text-[32px] sm:text-[40px] md:text-[48px] font-extrabold text-[#0F172A] tracking-[-0.03em] leading-[1.1]">
            Co-Created{" "}
            <span className="bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Curriculums
            </span>
          </h2>
          <p className="mt-4 text-[16px] sm:text-[17px] text-[#64748B] leading-[1.65] max-w-xl mx-auto">
            Explore enterprise-grade learning tracks built in collaboration with Fortune 500 technology leaders.
          </p>
        </div>

        {/* Search & Category Filter Controls */}
        <div className="flex flex-col items-center gap-5 mb-14 max-w-3xl mx-auto">
          {/* Search Bar */}
          <div className="relative w-full">
            <Search className="w-4.5 h-4.5 text-[#94A3B8] absolute left-4.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search programs by skill, tech stack, or title (e.g. LLM, RAG, Python)..."
              className="w-full pl-12 pr-10 py-3.5 rounded-2xl bg-white border border-[#E5E7EB] shadow-sm text-[14px] text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all duration-200"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                aria-label="Clear search"
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#475569] p-1"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category Tabs Filter */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-xl text-[13px] font-semibold transition-all duration-200 focus:outline-none ${
                  selectedCategory === cat
                    ? "bg-[#0F172A] text-white shadow-md shadow-slate-900/15"
                    : "bg-white text-[#475569] hover:bg-slate-50 hover:text-[#0F172A] border border-[#E5E7EB]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Empty Search State */}
        {filteredPrograms.length === 0 && (
          <div className="py-16 text-center flex flex-col items-center justify-center bg-white rounded-[24px] border border-[#E5E7EB] max-w-xl mx-auto shadow-sm">
            <Search className="w-12 h-12 text-slate-300 mb-3" />
            <h3 className="text-lg font-bold text-[#0F172A]">No matching programs found</h3>
            <p className="text-sm text-slate-500 max-w-md mt-1 mb-6">
              Try searching for different keywords or reset your category filter. We also design custom enterprise curriculums on demand.
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                }}
                className="h-11 px-5 rounded-xl border border-[#E5E7EB] hover:bg-slate-50 text-[#374151] font-semibold text-[13px] transition-colors"
              >
                Reset Filters
              </button>
              <button
                onClick={() => onOpenEnquireModal({ message: "Enquiring for a custom enterprise curriculum." })}
                className="h-11 px-5 rounded-xl bg-[#0F172A] hover:bg-[#1E293B] text-white font-bold text-[13px] transition-all active:scale-[0.98]"
              >
                Request Custom Curriculum
              </button>
            </div>
          </div>
        )}

        {/* Program Cards Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <AnimatePresence>
            {filteredPrograms.map((program) => (
              <motion.div
                key={program.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="bg-white border border-[#E5E7EB] rounded-3xl overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.06)] transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Visual Card Image Banner */}
                  {program.image && (
                    <div className="relative w-full h-44 overflow-hidden bg-slate-950">
                      <Image
                        src={program.image}
                        alt={program.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority={program.id === "gen-ai-enterprise"}
                        className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
                    </div>
                  )}

                  <div className="p-6 sm:p-7 flex flex-col gap-4">
                    {/* Header Badges */}
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-50 text-blue-600 border border-blue-100">
                        {program.category}
                      </span>
                      {program.featuredBadge && (
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-indigo-50 text-indigo-600 border border-indigo-100">
                          {program.featuredBadge}
                        </span>
                      )}
                    </div>

                    <h3
                      onClick={() => onSelectProgram(program)}
                      className="text-[18px] sm:text-[20px] font-bold text-[#0F172A] leading-snug group-hover:text-blue-600 transition-colors cursor-pointer"
                    >
                      {program.title}
                    </h3>

                    <p className="text-[13px] text-[#64748B] leading-[1.65]">
                      {program.description}
                    </p>

                    {/* Tech Stack Highlights */}
                    {program.techStack && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {program.techStack.slice(0, 4).map((tech) => (
                          <span
                            key={tech}
                            className="text-[11px] font-semibold bg-slate-50 text-[#334155] px-2.5 py-0.5 rounded-lg border border-[#E5E7EB]"
                          >
                            {tech}
                          </span>
                        ))}
                        {program.techStack.length > 4 && (
                          <span className="text-[11px] font-bold bg-blue-50 text-blue-600 px-2 py-0.5 rounded-lg border border-blue-100">
                            +{program.techStack.length - 4} more
                          </span>
                        )}
                      </div>
                    )}

                    {/* Metadata Specs */}
                    <div className="flex items-center gap-4 text-[12px] font-semibold text-[#64748B] pt-3.5 border-t border-[#F1F5F9]">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-blue-600" />
                        <span>{program.duration}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
                        <span>{program.format}</span>
                      </div>
                    </div>

                    {/* Key Outcomes Checklist */}
                    <div className="pt-2 flex flex-col gap-2.5">
                      <span className="text-[11px] uppercase font-bold tracking-wider text-[#94A3B8]">
                        Key Outcomes:
                      </span>
                      {program.keyOutcomes.map((outcome, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 text-[12px] font-semibold text-[#334155]">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{outcome}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="px-6 pb-6 pt-4 border-t border-[#F1F5F9] flex items-center justify-between gap-3">
                  <button
                    onClick={() => onSelectProgram(program)}
                    className="text-[12px] font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1.5 group/btn cursor-pointer"
                  >
                    <Layers className="w-4 h-4" />
                    <span>View Syllabus</span>
                  </button>

                  <button
                    onClick={() => onSelectProgram(program)}
                    className="h-9 px-4 rounded-xl border border-[#E5E7EB] hover:bg-slate-50 text-[#374151] font-bold text-[12px] flex items-center gap-1 transition-all"
                  >
                    <span>Full Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </Container>
    </section>
  );
};

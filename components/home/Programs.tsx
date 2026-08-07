"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, CheckCircle2, ArrowRight, BookOpen, Search, X, Layers } from "lucide-react";
import { PROGRAMS_DATA } from "@/constants/programsData";
import { ExecutiveProgram, ProgramCategory } from "@/types/program";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/common/Badge";
import { Button } from "@/components/ui/Button";

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
    <section id="programs" className="py-20 sm:py-28 bg-slate-50/70 dark:bg-slate-950/70 border-y border-slate-200/60 dark:border-slate-800 transition-colors">
      <Container>
        <SectionHeading
          badgeText="Executive Education"
          title="Co-Created"
          highlightText="Curriculums"
          subtitle="Explore enterprise-grade learning tracks built in collaboration with Fortune 500 technology leaders."
        />

        {/* Search & Category Filter Controls */}
        <div className="flex flex-col items-center gap-6 mb-12 max-w-3xl mx-auto">
          {/* Instant Search Bar */}
          <div className="relative w-full">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search programs by skill, tech stack, or title (e.g. LLM, Snowflake, RAG, Python)..."
              className="w-full pl-12 pr-10 py-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                aria-label="Clear search"
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1"
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
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  selectedCategory === cat
                    ? "bg-blue-600 text-white shadow-md shadow-blue-600/25"
                    : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Empty Search State */}
        {filteredPrograms.length === 0 && (
          <div className="py-16 text-center flex flex-col items-center justify-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 max-w-xl mx-auto shadow-sm">
            <Search className="w-12 h-12 text-slate-300 dark:text-slate-600 mb-3" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">No matching programs found</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mt-1 mb-4">
              Try searching for different keywords or reset your category filter. We also design custom enterprise curriculums on demand.
            </p>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                }}
              >
                Reset Filters
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => onOpenEnquireModal({ message: "Enquiring for a custom enterprise curriculum." })}
              >
                Request Custom Curriculum
              </Button>
            </div>
          </div>
        )}

        {/* Program Cards Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredPrograms.map((program) => (
              <motion.div
                key={program.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <Card
                  variant="elevated"
                  padding="none"
                  className="h-full flex flex-col justify-between group hover:shadow-2xl hover:border-blue-300 dark:hover:border-blue-500 transition-all duration-300 bg-white dark:bg-slate-900 dark:border-slate-800 overflow-hidden"
                >
                  <div>
                    {/* Visual Card Image Banner */}
                    {program.image && (
                      <div className="relative w-full h-44 overflow-hidden bg-slate-950">
                        <Image
                          src={program.image}
                          alt={program.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-white dark:from-slate-900 via-transparent to-transparent" />
                      </div>
                    )}

                    <div className="p-6 flex flex-col gap-4">
                      {/* Header Badges */}
                      <div className="flex items-center justify-between gap-2">
                        <Badge variant="primary" size="sm">
                          {program.category}
                        </Badge>
                        {program.featuredBadge && (
                          <Badge variant="gradient" size="sm">
                            {program.featuredBadge}
                          </Badge>
                        )}
                      </div>

                      <h3
                        onClick={() => onSelectProgram(program)}
                        className="text-xl font-bold text-slate-900 dark:text-white leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors cursor-pointer"
                      >
                        {program.title}
                      </h3>

                      <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                        {program.description}
                      </p>

                      {/* Tech Stack Highlights */}
                      {program.techStack && (
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {program.techStack.slice(0, 4).map((tech) => (
                            <span
                              key={tech}
                              className="text-[11px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2.5 py-0.5 rounded-md border border-slate-200/80 dark:border-slate-700"
                            >
                              {tech}
                            </span>
                          ))}
                          {program.techStack.length > 4 && (
                            <span className="text-[11px] font-semibold bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 px-2 py-0.5 rounded-md">
                              +{program.techStack.length - 4} more
                            </span>
                          )}
                        </div>
                      )}

                      {/* Metadata Specs */}
                      <div className="flex items-center gap-4 text-xs font-medium text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                          <span>{program.duration}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <BookOpen className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                          <span>{program.format}</span>
                        </div>
                      </div>

                      {/* Key Outcomes Checklist */}
                      <div className="pt-2 flex flex-col gap-2">
                        <span className="text-xs uppercase font-bold tracking-wider text-slate-400 dark:text-slate-500">
                          Key Outcomes:
                        </span>
                        {program.keyOutcomes.map((outcome, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                            <span>{outcome}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Card Footer Actions */}
                  <div className="px-6 pb-6 pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
                    <button
                      onClick={() => onSelectProgram(program)}
                      className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 flex items-center gap-1 group/btn"
                    >
                      <Layers className="w-3.5 h-3.5" />
                      <span>View Syllabus</span>
                    </button>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onSelectProgram(program)}
                      rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                    >
                      Full Details
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </Container>
    </section>
  );
};

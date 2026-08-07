"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Users, CheckCircle2, ArrowRight, BookOpen, Search, X, Layers } from "lucide-react";
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
    <section id="programs" className="py-20 sm:py-28 bg-slate-50/70 border-y border-slate-200/60">
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
              className="w-full pl-12 pr-10 py-3.5 rounded-2xl bg-white border border-slate-200 shadow-sm text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                aria-label="Clear search"
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
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
                    : "bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Empty Search State */}
        {filteredPrograms.length === 0 && (
          <div className="py-16 text-center flex flex-col items-center justify-center bg-white rounded-3xl border border-slate-200 max-w-xl mx-auto shadow-sm">
            <Search className="w-12 h-12 text-slate-300 mb-3" />
            <h3 className="text-lg font-bold text-slate-900">No matching programs found</h3>
            <p className="text-sm text-slate-500 max-w-md mt-1 mb-4">
              Try searching for different keywords or reset your category filter. We also design custom enterprise curriculums on demand.
            </p>
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
                  padding="lg"
                  className="h-full flex flex-col justify-between group hover:shadow-2xl hover:border-blue-300 transition-all duration-300 bg-white"
                >
                  <div className="flex flex-col gap-4">
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
                      className="text-xl font-bold text-slate-900 leading-snug group-hover:text-blue-600 transition-colors cursor-pointer"
                    >
                      {program.title}
                    </h3>

                    <p className="text-sm text-slate-600 leading-relaxed">
                      {program.description}
                    </p>

                    {/* Tech Stack Highlights */}
                    {program.techStack && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {program.techStack.slice(0, 4).map((tech) => (
                          <span
                            key={tech}
                            className="text-[11px] font-semibold bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-md border border-slate-200/80"
                          >
                            {tech}
                          </span>
                        ))}
                        {program.techStack.length > 4 && (
                          <span className="text-[11px] font-semibold bg-blue-50 text-blue-600 px-2 py-0.5 rounded-md">
                            +{program.techStack.length - 4} more
                          </span>
                        )}
                      </div>
                    )}

                    {/* Metadata Specs */}
                    <div className="flex items-center gap-4 text-xs font-medium text-slate-500 pt-2 border-t border-slate-100">
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
                    <div className="pt-2 flex flex-col gap-2">
                      <span className="text-xs uppercase font-bold tracking-wider text-slate-400">
                        Key Outcomes:
                      </span>
                      {program.keyOutcomes.map((outcome, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs font-semibold text-slate-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{outcome}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Card Footer Actions */}
                  <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between gap-3">
                    <button
                      onClick={() => onSelectProgram(program)}
                      className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 group/btn"
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

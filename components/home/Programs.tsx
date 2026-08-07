"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Users, CheckCircle2, ArrowRight, BookOpen } from "lucide-react";
import { PROGRAMS_DATA } from "@/constants/programsData";
import { ProgramCategory } from "@/types/program";
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
  onOpenEnquireModal: () => void;
}

export const Programs: React.FC<ProgramsProps> = ({ onOpenEnquireModal }) => {
  const [selectedCategory, setSelectedCategory] = useState<ProgramCategory>("All");

  const filteredPrograms =
    selectedCategory === "All"
      ? PROGRAMS_DATA
      : PROGRAMS_DATA.filter((p) => p.category === selectedCategory);

  return (
    <section id="programs" className="py-20 sm:py-28 bg-slate-50/70 border-y border-slate-200/60">
      <Container>
        <SectionHeading
          badgeText="Executive Education"
          title="Co-Created"
          highlightText="Curriculums"
          subtitle="Explore enterprise-grade learning tracks built in collaboration with Fortune 500 technology leaders."
        />

        {/* Category Tabs Filter */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
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
                  className="h-full flex flex-col justify-between group hover:shadow-2xl hover:border-blue-200 transition-all"
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

                    <h3 className="text-xl font-bold text-slate-900 leading-snug group-hover:text-blue-600 transition-colors">
                      {program.title}
                    </h3>

                    <p className="text-sm text-slate-600 leading-relaxed">
                      {program.description}
                    </p>

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

                  {/* Card Footer CTA */}
                  <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-1 text-xs text-slate-500 font-medium">
                      <Users className="w-3.5 h-3.5 text-slate-400" />
                      <span className="truncate max-w-[120px]">{program.targetAudience.split(",")[0]}</span>
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={onOpenEnquireModal}
                      rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                    >
                      Request Syllabus
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

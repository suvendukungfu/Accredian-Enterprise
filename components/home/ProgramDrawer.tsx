"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Clock,
  BookOpen,
  Users,
  CheckCircle2,
  Award,
  Terminal,
  ArrowRight,
  Download,
  Layers,
  ShieldCheck,
  Briefcase,
} from "lucide-react";
import { ExecutiveProgram } from "@/types/program";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/common/Badge";

interface ProgramDrawerProps {
  program: ExecutiveProgram | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenEnquireModal: (options?: { domain?: string; message?: string }) => void;
}

export const ProgramDrawer: React.FC<ProgramDrawerProps> = ({
  program,
  isOpen,
  onClose,
  onOpenEnquireModal,
}) => {
  const [activeTab, setActiveTab] = useState<"modules" | "capstone" | "stack">("modules");

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!program) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
          />

          {/* Slide-over Drawer Panel */}
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="w-screen max-w-2xl bg-white shadow-2xl flex flex-col justify-between border-l border-slate-200"
            >
              {/* Drawer Header */}
              <div className="p-6 sm:p-8 bg-slate-900 text-white relative flex flex-col gap-4">
                <button
                  onClick={onClose}
                  aria-label="Close drawer"
                  className="absolute top-6 right-6 p-2 rounded-xl bg-white/10 text-slate-300 hover:text-white hover:bg-white/20 transition-all focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-2">
                  <Badge variant="primary" size="sm">
                    {program.category}
                  </Badge>
                  {program.featuredBadge && (
                    <Badge variant="gradient" size="sm">
                      {program.featuredBadge}
                    </Badge>
                  )}
                </div>

                <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight pr-8">
                  {program.title}
                </h2>

                <p className="text-sm text-slate-300 leading-relaxed">
                  {program.description}
                </p>

                {/* Metadata Pills */}
                <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-blue-200 pt-2 border-t border-slate-800">
                  <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg backdrop-blur-sm">
                    <Clock className="w-4 h-4 text-blue-400" />
                    <span>{program.duration}</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg backdrop-blur-sm">
                    <BookOpen className="w-4 h-4 text-indigo-400" />
                    <span>{program.format}</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg backdrop-blur-sm">
                    <Users className="w-4 h-4 text-emerald-400" />
                    <span>Target: {program.targetAudience.split(",")[0]}</span>
                  </div>
                </div>
              </div>

              {/* Navigation Tabs */}
              <div className="flex border-b border-slate-200 bg-slate-50 px-6 sm:px-8">
                <button
                  onClick={() => setActiveTab("modules")}
                  className={`py-3.5 px-4 font-bold text-sm border-b-2 transition-colors flex items-center gap-2 ${
                    activeTab === "modules"
                      ? "border-blue-600 text-blue-600"
                      : "border-transparent text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <Layers className="w-4 h-4" />
                  <span>Syllabus Modules ({program.modules?.length || 0})</span>
                </button>
                <button
                  onClick={() => setActiveTab("capstone")}
                  className={`py-3.5 px-4 font-bold text-sm border-b-2 transition-colors flex items-center gap-2 ${
                    activeTab === "capstone"
                      ? "border-blue-600 text-blue-600"
                      : "border-transparent text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <Award className="w-4 h-4" />
                  <span>Capstone Project</span>
                </button>
                <button
                  onClick={() => setActiveTab("stack")}
                  className={`py-3.5 px-4 font-bold text-sm border-b-2 transition-colors flex items-center gap-2 ${
                    activeTab === "stack"
                      ? "border-blue-600 text-blue-600"
                      : "border-transparent text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <Terminal className="w-4 h-4" />
                  <span>Tech Stack</span>
                </button>
              </div>

              {/* Drawer Scrollable Body Content */}
              <div className="grow overflow-y-auto p-6 sm:p-8 space-y-6">
                {activeTab === "modules" && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-bold text-slate-900 uppercase tracking-wider text-xs">
                        Curriculum Breakdown & Weekly Modules
                      </h3>
                      <span className="text-xs font-semibold text-slate-500">
                        Co-authored with Industry Experts
                      </span>
                    </div>

                    <div className="space-y-4">
                      {program.modules?.map((mod, idx) => (
                        <div
                          key={idx}
                          className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-blue-300 transition-colors"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-blue-100 text-blue-700">
                              {mod.week}
                            </span>
                            <span className="text-xs text-slate-400 font-medium">Module {idx + 1}</span>
                          </div>

                          <h4 className="text-base font-bold text-slate-900 mb-3">
                            {mod.title}
                          </h4>

                          <ul className="space-y-2">
                            {mod.topics.map((topic, tIdx) => (
                              <li key={tIdx} className="flex items-start gap-2.5 text-xs text-slate-700 font-medium">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                                <span>{topic}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === "capstone" && (
                  <div className="space-y-6">
                    {program.capstoneProject && (
                      <div className="p-6 rounded-2xl bg-linear-to-br from-blue-50 via-slate-50 to-indigo-50 border border-blue-200/80 space-y-4">
                        <div className="flex items-center gap-2 text-blue-700 font-bold text-sm uppercase tracking-wider">
                          <Award className="w-5 h-5 text-blue-600" />
                          <span>Enterprise Capstone Build</span>
                        </div>
                        <h3 className="text-xl font-bold text-slate-900">
                          {program.capstoneProject.title}
                        </h3>
                        <p className="text-sm text-slate-600 leading-relaxed">
                          {program.capstoneProject.description}
                        </p>
                      </div>
                    )}

                    {program.prerequisites && (
                      <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                        <h4 className="text-xs uppercase font-bold text-slate-700 tracking-wider flex items-center gap-2">
                          <Briefcase className="w-4 h-4 text-slate-500" />
                          <span>Recommended Prerequisites</span>
                        </h4>
                        <p className="text-sm text-slate-600">{program.prerequisites}</p>
                      </div>
                    )}

                    {program.certificationPartner && (
                      <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                        <h4 className="text-xs uppercase font-bold text-slate-700 tracking-wider flex items-center gap-2">
                          <ShieldCheck className="w-4 h-4 text-emerald-600" />
                          <span>Enterprise Certification</span>
                        </h4>
                        <p className="text-sm font-semibold text-slate-800">
                          {program.certificationPartner}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === "stack" && (
                  <div className="space-y-6">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                      Technologies, Libraries & Platforms Covered
                    </h3>

                    <div className="flex flex-wrap gap-2.5">
                      {program.techStack?.map((tech) => (
                        <div
                          key={tech}
                          className="px-4 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs shadow-sm flex items-center gap-2"
                        >
                          <Terminal className="w-3.5 h-3.5 text-blue-400" />
                          <span>{tech}</span>
                        </div>
                      ))}
                    </div>

                    <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200 text-xs text-blue-800 leading-relaxed">
                      <strong>Custom Tech Stack Integration:</strong> For enterprise cohorts, we can customize tools and datasets to match your internal security policies and proprietary software suite.
                    </div>
                  </div>
                )}
              </div>

              {/* Drawer Footer CTA */}
              <div className="p-6 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <button
                  onClick={() => {
                    onClose();
                    onOpenEnquireModal({
                      domain: program.category,
                      message: `Interested in receiving the detailed PDF syllabus for ${program.title}.`,
                    });
                  }}
                  className="w-full sm:w-auto px-5 py-3 rounded-xl border border-slate-300 hover:border-blue-600 bg-white text-slate-700 font-bold text-xs flex items-center justify-center gap-2 hover:text-blue-600 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Full Syllabus PDF</span>
                </button>

                <Button
                  variant="gradient"
                  size="md"
                  onClick={() => {
                    onClose();
                    onOpenEnquireModal({
                      domain: program.category,
                      message: `Enquiring for a corporate cohort in ${program.title}.`,
                    });
                  }}
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                  className="w-full sm:w-auto"
                >
                  Request Executive Proposal
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

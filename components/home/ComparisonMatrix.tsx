"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check, X, ShieldCheck, Sparkles, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Button } from "@/components/ui/Button";

interface ComparisonItem {
  feature: string;
  accredian: boolean | string;
  moocs: boolean | string;
  internalLMS: boolean | string;
  workshops: boolean | string;
  highlight?: boolean;
}

const COMPARISON_DATA: ComparisonItem[] = [
  {
    feature: "Co-Created Tailored Curriculums",
    accredian: "100% Customized",
    moocs: "Generic Off-the-shelf",
    internalLMS: "Static Video Modules",
    workshops: "Standardized Slides",
    highlight: true,
  },
  {
    feature: "Live Hands-On Practitioner Mentorship",
    accredian: true,
    moocs: false,
    internalLMS: false,
    workshops: "Limited (2 Days)",
  },
  {
    feature: "Sanitized Enterprise Dataset Labs",
    accredian: true,
    moocs: false,
    internalLMS: false,
    workshops: false,
    highlight: true,
  },
  {
    feature: "Cohort Skill Growth Dashboard & Analytics",
    accredian: "Real-time Metrics",
    moocs: "Completion Only",
    internalLMS: "Basic Quiz Scores",
    workshops: "No Tracking",
  },
  {
    feature: "Measurable Capstone Business ROI",
    accredian: true,
    moocs: false,
    internalLMS: false,
    workshops: false,
    highlight: true,
  },
  {
    feature: "SOC-2 Type II & Security Compliance",
    accredian: true,
    moocs: "Varies",
    internalLMS: true,
    workshops: false,
  },
];

interface ComparisonMatrixProps {
  onOpenEnquireModal: () => void;
}

export const ComparisonMatrix: React.FC<ComparisonMatrixProps> = ({ onOpenEnquireModal }) => {
  return (
    <section id="comparison" className="py-20 sm:py-28 bg-white relative overflow-hidden">
      <Container>
        <SectionHeading
          badgeText="Why Accredian Enterprise"
          title="How We Compare To"
          highlightText="Traditional Training"
          subtitle="Discover why global tech leaders choose Accredian over generic online courses and short-lived workshops."
        />

        <div className="overflow-x-auto rounded-3xl border border-slate-200 shadow-xl bg-white">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-slate-900 text-white border-b border-slate-800">
                <th className="py-5 px-6 text-sm font-bold w-2/5">Capability Metric</th>
                <th className="py-5 px-6 text-sm font-bold bg-blue-600/90 text-white w-1/4">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-blue-200" />
                    <span>Accredian Enterprise</span>
                  </div>
                </th>
                <th className="py-5 px-6 text-xs font-semibold text-slate-400">Traditional MOOCs</th>
                <th className="py-5 px-6 text-xs font-semibold text-slate-400">Internal LMS</th>
                <th className="py-5 px-6 text-xs font-semibold text-slate-400">2-Day Workshops</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {COMPARISON_DATA.map((row, idx) => (
                <tr
                  key={idx}
                  className={`hover:bg-slate-50 transition-colors ${
                    row.highlight ? "bg-slate-50/50" : ""
                  }`}
                >
                  <td className="py-4 px-6 font-bold text-slate-900 flex items-center gap-2">
                    {row.highlight && <Sparkles className="w-4 h-4 text-blue-600 shrink-0" />}
                    <span>{row.feature}</span>
                  </td>

                  {/* Accredian Column (Highlighted) */}
                  <td className="py-4 px-6 bg-blue-50/60 font-bold text-blue-900 border-x border-blue-100">
                    {typeof row.accredian === "boolean" ? (
                      <div className="flex items-center gap-1.5 text-emerald-700">
                        <Check className="w-5 h-5 text-emerald-600 shrink-0 stroke-[3]" />
                        <span>Included</span>
                      </div>
                    ) : (
                      <span className="text-blue-700 font-extrabold">{row.accredian}</span>
                    )}
                  </td>

                  {/* MOOCs */}
                  <td className="py-4 px-6 text-slate-600 font-medium">
                    {typeof row.moocs === "boolean" ? (
                      row.moocs ? (
                        <Check className="w-5 h-5 text-emerald-600" />
                      ) : (
                        <X className="w-5 h-5 text-slate-300" />
                      )
                    ) : (
                      <span>{row.moocs}</span>
                    )}
                  </td>

                  {/* Internal LMS */}
                  <td className="py-4 px-6 text-slate-600 font-medium">
                    {typeof row.internalLMS === "boolean" ? (
                      row.internalLMS ? (
                        <Check className="w-5 h-5 text-emerald-600" />
                      ) : (
                        <X className="w-5 h-5 text-slate-300" />
                      )
                    ) : (
                      <span>{row.internalLMS}</span>
                    )}
                  </td>

                  {/* Workshops */}
                  <td className="py-4 px-6 text-slate-600 font-medium">
                    {typeof row.workshops === "boolean" ? (
                      row.workshops ? (
                        <Check className="w-5 h-5 text-emerald-600" />
                      ) : (
                        <X className="w-5 h-5 text-slate-300" />
                      )
                    ) : (
                      <span>{row.workshops}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between p-6 rounded-2xl bg-slate-50 border border-slate-200 gap-4">
          <div className="text-slate-700 text-sm font-medium text-center sm:text-left">
            Ready to upgrade your enterprise learning infrastructure from passive videos to active capability building?
          </div>
          <Button
            variant="primary"
            size="md"
            onClick={onOpenEnquireModal}
            rightIcon={<ArrowRight className="w-4 h-4" />}
            className="shrink-0"
          >
            Request Enterprise Demo
          </Button>
        </div>
      </Container>
    </section>
  );
};

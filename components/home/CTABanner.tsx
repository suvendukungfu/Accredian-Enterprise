"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

interface CTABannerProps {
  onOpenEnquireModal: () => void;
}

export const CTABanner: React.FC<CTABannerProps> = ({ onOpenEnquireModal }) => {
  return (
    <section className="py-16 sm:py-24 bg-slate-50/50">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl bg-linear-to-r from-blue-700 via-blue-600 to-indigo-700 p-8 sm:p-12 lg:p-16 text-white shadow-2xl overflow-hidden"
        >
          {/* Background Ambient Orbs */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="flex flex-col gap-4 text-center lg:text-left max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold text-blue-100 w-fit mx-auto lg:mx-0">
                <ShieldCheck className="w-4 h-4 text-emerald-300" />
                <span>Enterprise Skill Transformation</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                Transform Your Organization Today
              </h2>

              <p className="text-blue-100 text-base sm:text-lg leading-relaxed">
                Partner with Accredian to design customized capability building tracks in Generative AI, Data Science, and Leadership.
              </p>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2 text-xs sm:text-sm font-semibold text-blue-100">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                  <span>Free Skill Audit</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                  <span>Custom Curriculum Design</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                  <span>Dedicated Advisor</span>
                </div>
              </div>
            </div>

            <div className="shrink-0 flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
              <Button
                variant="secondary"
                size="lg"
                onClick={onOpenEnquireModal}
                rightIcon={<ArrowRight className="w-5 h-5 text-blue-400" />}
                className="w-full sm:w-auto bg-white text-slate-900 hover:bg-slate-100 shadow-xl"
              >
                Enquire Now
              </Button>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

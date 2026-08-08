"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/Container";

interface CTABannerProps {
  onOpenEnquireModal: () => void;
}

export const CTABanner: React.FC<CTABannerProps> = ({ onOpenEnquireModal }) => {
  return (
    <section className="py-16 sm:py-24 bg-transparent relative z-1">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative rounded-[28px] bg-linear-to-r from-[#1E3A8A] via-[#2563EB] to-[#4F46E5] p-10 sm:p-14 lg:p-16 text-white shadow-2xl shadow-blue-900/20 overflow-hidden"
        >
          {/* Background Orbs */}
          <div className="absolute -top-32 -right-32 w-100 h-100 bg-white/8 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-32 -left-32 w-100 h-100 bg-indigo-400/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="flex flex-col gap-5 text-center lg:text-left max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[12px] font-semibold text-blue-100 w-fit mx-auto lg:mx-0">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
                <span>Enterprise Skill Transformation</span>
              </div>

              <h2 className="text-[32px] sm:text-[40px] lg:text-[48px] font-extrabold text-white tracking-[-0.03em] leading-[1.1]">
                Transform Your Organization Today
              </h2>

              <p className="text-blue-100/90 text-[16px] sm:text-[17px] leading-[1.65]">
                Partner with Accredian to design customized capability building tracks in Generative AI, Data Science, and Leadership.
              </p>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-5 pt-1 text-[13px] font-semibold text-blue-100/80">
                {["Free Skill Audit", "Custom Curriculum Design", "Dedicated Advisor"].map((item) => (
                  <div key={item} className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="shrink-0">
              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 18 }}
                onClick={onOpenEnquireModal}
                className="inline-flex items-center gap-2.5 h-14 px-8 rounded-2xl bg-white text-[#0F172A] font-bold text-[15px] shadow-xl hover:shadow-2xl hover:bg-slate-50 transition-all duration-200 active:scale-[0.98] group cursor-pointer"
              >
                <span>Enquire Now</span>
                <ArrowRight className="w-4.5 h-4.5 text-blue-600 group-hover:translate-x-0.5 transition-transform" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

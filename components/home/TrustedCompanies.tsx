"use client";

import React from "react";
import { motion } from "framer-motion";
import { TRUSTED_CLIENTS } from "@/constants/testimonialsData";
import { Container } from "@/components/ui/Container";

export const TrustedCompanies: React.FC = () => {
  return (
    <section id="clients" className="py-12 bg-white border-y border-slate-100">
      <Container>
        <div className="flex flex-col items-center gap-6">
          <p className="text-xs uppercase font-bold tracking-widest text-slate-500 text-center">
            Trusted by Leaders at Top Global Enterprises
          </p>

          <div className="w-full flex flex-wrap items-center justify-center gap-8 sm:gap-12 md:gap-16 opacity-80">
            {TRUSTED_CLIENTS.map((client, idx) => (
              <motion.div
                key={client.name}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="flex items-center justify-center px-4 py-2 hover:scale-105 transition-transform duration-200 cursor-pointer"
              >
                <span className="text-xl sm:text-2xl font-black text-slate-400 hover:text-slate-800 transition-colors tracking-tight">
                  {client.logo}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

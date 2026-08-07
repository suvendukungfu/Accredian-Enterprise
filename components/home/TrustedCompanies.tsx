"use client";

import React from "react";
import { TRUSTED_CLIENTS } from "@/constants/testimonialsData";
import { Container } from "@/components/ui/Container";
import { InfiniteMarquee } from "@/components/ui/InfiniteMarquee";

export const TrustedCompanies: React.FC = () => {
  return (
    <section id="clients" className="py-12 bg-white dark:bg-slate-950 border-y border-slate-100 dark:border-slate-800 transition-colors overflow-hidden">
      <Container className="mb-6">
        <p className="text-xs uppercase font-bold tracking-widest text-slate-400 dark:text-slate-500 text-center">
          Trusted by Engineering Leaders at Top Global Enterprises
        </p>
      </Container>

      <InfiniteMarquee speed={35} pauseOnHover>
        {TRUSTED_CLIENTS.map((client) => (
          <div
            key={client.name}
            className="flex items-center gap-3 px-6 py-2 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800 hover:border-blue-500 transition-all cursor-pointer group"
          >
            <span className="text-lg sm:text-xl font-black text-slate-700 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors tracking-tight">
              {client.logo}
            </span>
          </div>
        ))}
      </InfiniteMarquee>
    </section>
  );
};

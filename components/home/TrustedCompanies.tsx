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
            className="flex items-center gap-2 px-6 py-2 transition-all cursor-pointer group"
          >
            <span className="text-base sm:text-lg font-extrabold tracking-widest uppercase text-slate-400 dark:text-slate-500 group-hover:text-slate-900 dark:group-hover:text-slate-200 transition-colors">
              {client.logo}
            </span>
          </div>
        ))}
      </InfiniteMarquee>
    </section>
  );
};

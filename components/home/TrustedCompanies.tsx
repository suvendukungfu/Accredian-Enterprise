"use client";

import React from "react";
import { TRUSTED_CLIENTS } from "@/constants/testimonialsData";
import { Container } from "@/components/ui/Container";

export const TrustedCompanies: React.FC = () => {
  return (
    <section
      id="clients"
      className="py-10 sm:py-12 bg-white/70 backdrop-blur-md border-y border-[#E5E7EB]/80 transition-colors relative z-1"
    >
      <Container>
        <div className="flex items-center justify-between sm:justify-center gap-8 sm:gap-14 lg:gap-20 overflow-x-auto scrollbar-hide">
          {TRUSTED_CLIENTS.map((client) => (
            <span
              key={client.name}
              className="text-[16px] sm:text-[18px] font-bold text-[#94A3B8] hover:text-[#475569] transition-colors duration-300 whitespace-nowrap shrink-0 tracking-[-0.01em] cursor-default select-none"
              style={{
                fontWeight:
                  client.name === "Deloitte" || client.name === "IBM"
                    ? 900
                    : client.name === "Salesforce"
                    ? 700
                    : 800,
                fontStyle: client.name === "Salesforce" ? "italic" : "normal",
                letterSpacing:
                  client.name === "IBM"
                    ? "0.08em"
                    : client.name === "accenture"
                    ? "0.01em"
                    : "-0.01em",
              }}
            >
              {client.logo}
            </span>
          ))}
        </div>
      </Container>
    </section>
  );
};

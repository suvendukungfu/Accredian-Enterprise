"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";
import { FOOTER_LINKS } from "@/constants/navigation";
import { Container } from "@/components/ui/Container";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 pt-16 pb-12 border-t border-slate-800">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-slate-800">
          {/* Brand & Mission Column */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            <Link href="#hero" className="flex items-center gap-2.5 group w-fit">
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-600/30">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black text-white tracking-tight leading-none">
                  accredian<span className="text-blue-500">.</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400">
                  credentials that matter
                </span>
              </div>
            </Link>

            <p className="text-sm leading-relaxed text-slate-400 max-w-sm">
              Accredian Enterprise empowers Global Fortune 500 companies and high-growth organizations with co-created, high-impact executive learning programs in Generative AI, Data Science, and Leadership.
            </p>

            <div className="flex flex-col gap-2.5 pt-2 text-xs sm:text-sm">
              <div className="flex items-center gap-2.5 text-slate-300">
                <Mail className="w-4 h-4 text-blue-500 shrink-0" />
                <span>enterprise@accredian.com</span>
              </div>
              <div className="flex items-center gap-2.5 text-slate-300">
                <Phone className="w-4 h-4 text-blue-500 shrink-0" />
                <span>+91 98734 37381</span>
              </div>
              <div className="flex items-center gap-2.5 text-slate-300">
                <MapPin className="w-4 h-4 text-blue-500 shrink-0" />
                <span>Corporate HQ, Tech Hub, Cyber City, Gurugram</span>
              </div>
            </div>
          </div>

          {/* Solutions Links */}
          <div className="flex flex-col gap-4">
            <h4 className="text-xs uppercase font-bold tracking-wider text-slate-200">
              Enterprise Solutions
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm">
              {FOOTER_LINKS.solutions.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="hover:text-white transition-colors inline-flex items-center gap-1 group"
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all text-blue-400" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div className="flex flex-col gap-4">
            <h4 className="text-xs uppercase font-bold tracking-wider text-slate-200">
              Company
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm">
              {FOOTER_LINKS.company.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="hover:text-white transition-colors inline-flex items-center gap-1 group"
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all text-blue-400" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div className="flex flex-col gap-4">
            <h4 className="text-xs uppercase font-bold tracking-wider text-slate-200">
              Resources & Governance
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm">
              {FOOTER_LINKS.resources.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="hover:text-white transition-colors inline-flex items-center gap-1 group"
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all text-blue-400" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Accredian. All rights reserved. Enterprise Credentials.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-slate-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-400 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-slate-400 transition-colors">Security & SOC-2</a>
          </div>
        </div>
      </Container>
    </footer>
  );
};

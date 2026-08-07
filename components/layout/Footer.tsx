"use client";

import React from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, ArrowUpRight, Activity } from "lucide-react";
import { FOOTER_LINKS } from "@/constants/navigation";
import { Container } from "@/components/ui/Container";

const FOOTER_SECTIONS = [
  { title: "Enterprise Solutions", links: "solutions" as const },
  { title: "Company", links: "company" as const },
  { title: "Resources & Governance", links: "resources" as const },
];

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0F172A] text-slate-400 pt-16 pb-10 border-t border-slate-800 transition-colors">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-slate-800/60">
          {/* Brand & Contact Column */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            <Link href="#hero" className="flex items-center gap-2.5 group w-fit">
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black text-lg shadow-md shadow-blue-600/25">
                A
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-[22px] font-extrabold text-white tracking-[-0.02em]">
                  accredian<span className="text-blue-500">.</span>
                </span>
                <span className="text-[10px] uppercase font-semibold tracking-[0.12em] text-slate-500 mt-[1px]">
                  credentials that matter
                </span>
              </div>
            </Link>

            <p className="text-[14px] leading-[1.7] text-slate-400 max-w-sm">
              Accredian Enterprise empowers Global Fortune 500 companies and high-growth organizations with co-created, high-impact executive learning programs.
            </p>

            {/* System Status */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[12px] font-semibold w-fit">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <Activity className="w-3.5 h-3.5" />
              <span>All Enterprise Systems Operational</span>
            </div>

            {/* Contact Info */}
            <div className="flex flex-col gap-2.5 pt-1 text-[13px]">
              {[
                { icon: <Mail className="w-4 h-4 text-blue-500 shrink-0" />, text: "enterprise@accredian.com" },
                { icon: <Phone className="w-4 h-4 text-blue-500 shrink-0" />, text: "+91 98734 37381" },
                { icon: <MapPin className="w-4 h-4 text-blue-500 shrink-0" />, text: "Corporate HQ, Tech Hub, Cyber City, Gurugram" },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-2.5 text-slate-300">
                  {item.icon}
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {FOOTER_SECTIONS.map((section) => (
            <div key={section.title} className="flex flex-col gap-4">
              <h4 className="text-[11px] uppercase font-bold tracking-[0.12em] text-slate-300">
                {section.title}
              </h4>
              <ul className="flex flex-col gap-2.5 text-[14px]">
                {FOOTER_LINKS[section.links].map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="hover:text-white transition-colors inline-flex items-center gap-1 group"
                    >
                      <span>{link.label}</span>
                      <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-0.5 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 text-blue-400" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[12px] text-slate-500">
          <p>© {new Date().getFullYear()} Accredian. All rights reserved. Enterprise Credentials.</p>
          <div className="flex items-center gap-6">
            {["Privacy Policy", "Terms of Service", "Security & SOC-2"].map((label) => (
              <a key={label} href="#" className="hover:text-slate-300 transition-colors">
                {label}
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
};

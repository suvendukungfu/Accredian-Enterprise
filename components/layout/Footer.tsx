"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, ArrowUpRight, Activity, ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";
import { FOOTER_LINKS } from "@/constants/navigation";
import { Container } from "@/components/ui/Container";
import { useApp } from "@/app/providers";

const FOOTER_SECTIONS = [
  { title: "Enterprise Solutions", links: "solutions" as const },
  { title: "Company", links: "company" as const },
  { title: "Governance & Security", links: "resources" as const },
];

export const Footer: React.FC = () => {
  const { showToast } = useApp();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    setSubscribed(true);
    showToast("Subscribed to Accredian Enterprise Research & Briefings.", "success");
    setEmail("");
  };

  return (
    <footer className="bg-[#0F172A] text-slate-400 pt-16 sm:pt-20 pb-10 border-t border-slate-800 transition-colors relative overflow-hidden">
      {/* Background Glow Overlay */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

      <Container className="relative z-10">
        {/* Top Newsletter & Executive Briefing Card */}
        <div className="mb-16 p-8 sm:p-10 rounded-3xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-xl flex flex-col lg:flex-row lg:items-center justify-between gap-8 shadow-xl">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[12px] font-semibold mb-3">
              <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Executive Skill Intelligence</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Subscribe to Enterprise Talent Insights
            </h3>
            <p className="text-[14px] text-slate-400 mt-2 leading-relaxed">
              Get quarterly benchmarks, AI skill gap reports, and co-created curriculum frameworks delivered directly to your inbox.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto shrink-0">
            {subscribed ? (
              <div className="flex items-center gap-2 px-5 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[14px] font-bold">
                <CheckCircle2 className="w-4 h-4" />
                <span>Subscription Confirmed</span>
              </div>
            ) : (
              <>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter corporate email address..."
                  required
                  aria-label="Corporate email address"
                  className="w-full sm:w-80 h-12 px-4 rounded-xl bg-slate-800/90 border border-slate-700 text-white placeholder:text-slate-500 text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
                <button
                  type="submit"
                  className="w-full sm:w-auto h-12 px-6 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-[14px] flex items-center justify-center gap-2 transition-all shadow-md active:scale-98 cursor-pointer"
                >
                  <span>Subscribe</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </>
            )}
          </form>
        </div>

        {/* Main Footer Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-slate-800/80">
          {/* Brand Column */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            <Link
              href="#hero"
              className="flex items-center gap-2.5 group w-fit focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-lg"
            >
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black text-lg shadow-md shadow-blue-600/25 group-hover:scale-105 transition-transform">
                A
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-[20px] font-bold text-white tracking-[-0.02em]">
                  Accredian
                </span>
                <span className="text-[9px] uppercase font-semibold tracking-[0.15em] text-slate-400 mt-px">
                  ENTERPRISE
                </span>
              </div>
            </Link>

            <p className="text-[14px] leading-[1.7] text-slate-400 max-w-sm">
              Accredian Enterprise empowers Global Fortune 500 companies and high-growth technology leaders with co-created, high-impact executive learning programs.
            </p>

            {/* System Status Pill */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[12px] font-semibold w-fit">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <Activity className="w-3.5 h-3.5" aria-hidden="true" />
              <span>All Enterprise Systems Operational</span>
            </div>

            {/* Contact Details */}
            <div className="flex flex-col gap-3 pt-2 text-[13.5px]">
              {[
                { icon: <Mail className="w-4 h-4 text-blue-400 shrink-0" />, text: "enterprise@accredian.com" },
                { icon: <Phone className="w-4 h-4 text-blue-400 shrink-0" />, text: "+91 98734 37381" },
                { icon: <MapPin className="w-4 h-4 text-blue-400 shrink-0" />, text: "Corporate HQ, Tech Hub, Cyber City, Gurugram" },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-3 text-slate-300">
                  {item.icon}
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Link Columns */}
          {FOOTER_SECTIONS.map((section) => (
            <div key={section.title} className="flex flex-col gap-4">
              <h4 className="text-[11px] uppercase font-bold tracking-[0.12em] text-slate-200">
                {section.title}
              </h4>
              <ul className="flex flex-col gap-3 text-[14px]">
                {FOOTER_LINKS[section.links].map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="hover:text-white transition-colors inline-flex items-center gap-1 group focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-xs"
                    >
                      <span>{link.label}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-y-0.5 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 text-blue-400" aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar & Legal Footer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[12.5px] text-slate-400 font-medium">
          <p>© {new Date().getFullYear()} Accredian Enterprise. All rights reserved. SOC-2 Type II Certified.</p>
          <div className="flex items-center gap-6">
            {["Privacy Policy", "Terms of Service", "Security & Compliance"].map((label) => (
              <a
                key={label}
                href="#hero"
                className="hover:text-slate-200 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-xs"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
};

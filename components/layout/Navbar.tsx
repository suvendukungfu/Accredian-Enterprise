"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Sparkles, Building, BarChart3, Layers } from "lucide-react";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import { Container } from "@/components/ui/Container";

interface NavItem {
  label: string;
  href: string;
  hasDropdown?: boolean;
  dropdownContent?: { title: string; desc: string; icon: React.ReactNode }[];
}

const NAV_ITEMS: NavItem[] = [
  {
    label: "Solutions",
    href: "#programs",
    hasDropdown: true,
    dropdownContent: [
      { title: "Generative AI Cohorts", desc: "LLM engineering & enterprise AI automation", icon: <Sparkles className="w-4 h-4 text-blue-600" /> },
      { title: "Tech & Cloud Data", desc: "Full-stack cloud infrastructure & analytics", icon: <Layers className="w-4 h-4 text-indigo-600" /> },
    ],
  },
  {
    label: "Platform",
    href: "#edge",
    hasDropdown: true,
    dropdownContent: [
      { title: "CAT Framework", desc: "Capability Assessment & Talent analytics", icon: <BarChart3 className="w-4 h-4 text-emerald-600" /> },
      { title: "Enterprise Compliance", desc: "SOC-2 Type II & ISO 27001 accredited", icon: <Building className="w-4 h-4 text-slate-700" /> },
    ],
  },
  { label: "Resources", href: "#case-studies", hasDropdown: false },
  { label: "Enterprise", href: "#roi-calculator", hasDropdown: false },
];

interface NavbarProps {
  onOpenEnquireModal: () => void;
  onOpenCommandPalette: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenEnquireModal,
}) => {
  const { isScrolled } = useScrollPosition();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-white/80 backdrop-blur-xl shadow-[0_1px_3px_rgba(0,0,0,0.04)] border-b border-slate-200/60 py-0"
          : "bg-white/60 backdrop-blur-md py-0 border-b border-slate-200/40"
      }`}
    >
      <Container className="flex items-center justify-between h-18 lg:h-20">
        {/* Brand Logo */}
        <Link
          href="#hero"
          className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-lg shrink-0"
        >
          <div className="w-9 h-9 rounded-xl bg-[#0F172A] flex items-center justify-center text-white font-black text-lg shadow-sm group-hover:scale-105 transition-transform duration-200">
            A
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-[20px] font-bold text-[#0F172A] tracking-[-0.02em]">
              Accredian
            </span>
            <span className="text-[9px] uppercase font-semibold tracking-[0.15em] text-[#64748B] mt-px">
              ENTERPRISE
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links with Dropdowns */}
        <nav className="hidden lg:flex items-center gap-8 relative" role="navigation">
          {NAV_ITEMS.map((item) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => setActiveDropdown(item.hasDropdown ? item.label : null)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <a
                href={item.href}
                className="relative text-[14px] font-medium text-[#374151] hover:text-[#0F172A] transition-colors flex items-center gap-1.5 py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-md"
              >
                <span>{item.label}</span>
                {item.hasDropdown && (
                  <ChevronDown
                    className={`w-3.5 h-3.5 opacity-50 transition-transform duration-200 ${
                      activeDropdown === item.label ? "rotate-180 opacity-100" : ""
                    }`}
                  />
                )}
                {/* Active/Hover Underline Indicator */}
                {activeDropdown === item.label && (
                  <motion.span
                    layoutId="navUnderline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0F172A] rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </a>

              {/* Mega Dropdown Panel */}
              <AnimatePresence>
                {item.hasDropdown && activeDropdown === item.label && item.dropdownContent && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute top-full left-0 mt-2 w-72 bg-white/95 backdrop-blur-2xl border border-slate-200/80 rounded-2xl p-3 shadow-xl z-50 flex flex-col gap-1"
                  >
                    {item.dropdownContent.map((subItem) => (
                      <a
                        key={subItem.title}
                        href={item.href}
                        className="p-3 rounded-xl hover:bg-slate-50 transition-colors flex items-start gap-3 group/sub"
                      >
                        <div className="p-2 rounded-lg bg-slate-100 group-hover/sub:bg-blue-50 transition-colors shrink-0">
                          {subItem.icon}
                        </div>
                        <div>
                          <div className="text-[13px] font-bold text-[#0F172A] group-hover/sub:text-blue-600 transition-colors">
                            {subItem.title}
                          </div>
                          <div className="text-[11px] text-[#64748B] leading-tight mt-0.5">
                            {subItem.desc}
                          </div>
                        </div>
                      </a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* Request Demo CTA */}
          <motion.button
            onClick={onOpenEnquireModal}
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.975 }}
            transition={{ type: "spring" as const, stiffness: 180, damping: 14 }}
            className="hidden sm:inline-flex h-11 px-6 items-center justify-center rounded-xl bg-[#0F172A] hover:bg-[#1E293B] text-white font-semibold text-[14px] transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 cursor-pointer"
          >
            Request Demo
          </motion.button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="lg:hidden p-2 rounded-xl text-[#374151] hover:bg-slate-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </Container>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="lg:hidden bg-white/95 backdrop-blur-xl border-b border-slate-200 overflow-hidden"
          >
            <Container className="py-6 flex flex-col gap-1">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-[16px] font-semibold text-[#0F172A] py-3 px-4 rounded-xl hover:bg-slate-50 transition-colors flex items-center justify-between"
                >
                  <span>{item.label}</span>
                  {item.hasDropdown && <ChevronDown className="w-4 h-4 text-[#94A3B8]" />}
                </a>
              ))}
              <div className="pt-4 mt-2 border-t border-slate-100">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenEnquireModal();
                  }}
                  className="w-full h-12 rounded-xl bg-[#0F172A] text-white font-bold text-[14px] flex items-center justify-center shadow-md active:scale-98"
                >
                  Request Demo
                </button>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

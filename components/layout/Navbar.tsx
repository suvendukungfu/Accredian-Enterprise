"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import { Container } from "@/components/ui/Container";

interface NavItem {
  label: string;
  href: string;
  hasDropdown?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Solutions", href: "#programs", hasDropdown: true },
  { label: "Platform", href: "#edge", hasDropdown: true },
  { label: "Resources", href: "#case-studies", hasDropdown: true },
  { label: "Enterprise", href: "#roi-calculator" },
];

interface NavbarProps {
  onOpenEnquireModal: () => void;
  onOpenCommandPalette: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenEnquireModal,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onOpenCommandPalette,
}) => {
  const { isScrolled } = useScrollPosition();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-white/80 backdrop-blur-xl shadow-[0_1px_3px_rgba(0,0,0,0.04)] border-b border-slate-200/60 py-0"
          : "bg-white/60 backdrop-blur-sm py-0 border-b border-slate-200/40"
      }`}
    >
      <Container className="flex items-center justify-between h-[72px] lg:h-[84px]">
        {/* Brand Logo */}
        <Link
          href="#hero"
          className="flex items-center gap-2.5 group focus:outline-none rounded-lg shrink-0"
        >
          <div className="w-9 h-9 rounded-xl bg-[#0F172A] flex items-center justify-center text-white font-black text-lg shadow-sm">
            A
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-[20px] font-bold text-[#0F172A] tracking-[-0.02em]">
              Accredian
            </span>
            <span className="text-[9px] uppercase font-semibold tracking-[0.15em] text-[#64748B] mt-[1px]">
              ENTERPRISE
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-10">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="relative text-[14px] font-medium text-[#374151] hover:text-[#0F172A] transition-colors flex items-center gap-1 py-2"
              onMouseEnter={() => setHoveredItem(item.label)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <span>{item.label}</span>
              {item.hasDropdown && (
                <ChevronDown className={`w-3.5 h-3.5 opacity-50 transition-transform duration-200 ${
                  hoveredItem === item.label ? "rotate-180" : ""
                }`} />
              )}
              {/* Hover underline indicator */}
              <motion.span
                className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#0F172A] rounded-full"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: hoveredItem === item.label ? 1 : 0 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                style={{ originX: 0 }}
              />
            </a>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* Request Demo CTA */}
          <button
            onClick={onOpenEnquireModal}
            className="hidden sm:inline-flex h-[44px] px-6 items-center justify-center rounded-lg bg-[#0F172A] hover:bg-[#1E293B] text-white font-semibold text-[14px] transition-all duration-200 shadow-sm hover:shadow-md active:scale-[0.98]"
          >
            Request Demo
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="lg:hidden p-2 rounded-xl text-[#374151] hover:bg-slate-100 transition-colors"
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
                  className="w-full h-[52px] rounded-xl bg-[#0F172A] text-white font-semibold text-[15px] text-center active:scale-[0.98] transition-transform"
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

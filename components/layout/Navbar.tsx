"use client";

import React, { useState, useEffect } from "react";
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
  const [activeSection, setActiveSection] = useState<string>("");

  // Track active section on scroll using IntersectionObserver
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-25% 0px -70% 0px", // Focus on mid-viewport active section
      threshold: 0,
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    NAV_ITEMS.forEach((item) => {
      const id = item.href.replace("#", "");
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    // Also observe Hero section
    const heroEl = document.getElementById("hero");
    if (heroEl) observer.observe(heroEl);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/75 backdrop-blur-md shadow-[0_1px_3px_rgba(0,0,0,0.03)] border-b border-slate-200/50 py-0"
          : "bg-transparent py-0 border-b border-transparent"
      }`}
    >
      <Container className="flex items-center justify-between h-18 lg:h-20">
        {/* Brand Logo */}
        <Link
          href="#hero"
          className="flex items-center gap-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-lg shrink-0"
        >
          <div className="w-9 h-9 rounded-xl bg-[#0F172A] flex items-center justify-center text-white font-black text-lg shadow-sm transition-transform duration-300 group-hover:scale-105">
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

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-9">
          {NAV_ITEMS.map((item) => {
            const isItemActive = activeSection === item.href.replace("#", "");
            return (
              <a
                key={item.label}
                href={item.href}
                className={`relative text-[14px] font-medium transition-colors flex items-center gap-1.5 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-md ${
                  isItemActive ? "text-[#0F172A]" : "text-[#475569] hover:text-[#0F172A]"
                }`}
                onMouseEnter={() => setHoveredItem(item.label)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <span>{item.label}</span>
                {item.hasDropdown && (
                  <ChevronDown
                    className={`w-3.5 h-3.5 opacity-55 transition-transform duration-300 ${
                      hoveredItem === item.label ? "rotate-180" : ""
                    }`}
                  />
                )}
                {/* Active Indicator bar */}
                {isItemActive && (
                  <motion.span
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0F172A] rounded-full"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                {/* Hover line transition if not active */}
                {!isItemActive && (
                  <motion.span
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-300/80 rounded-full"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: hoveredItem === item.label ? 1 : 0 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    style={{ originX: 0 }}
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* Request Demo CTA with hover lift & active spring */}
          <motion.button
            onClick={onOpenEnquireModal}
            whileHover={{ y: -1.5, boxShadow: "0 6px 20px rgba(15, 23, 42, 0.12)" }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
            className="hidden sm:inline-flex h-10 px-5.5 items-center justify-center rounded-xl bg-[#0F172A] text-white font-semibold text-[13.5px] shadow-sm hover:bg-[#1E293B] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            Request Demo
          </motion.button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="lg:hidden p-2 rounded-xl text-[#374151] hover:bg-slate-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            {mobileMenuOpen ? <X className="w-5.5 h-5.5" /> : <Menu className="w-5.5 h-5.5" />}
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
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="lg:hidden bg-white border-b border-slate-200/60 overflow-hidden"
          >
            <Container className="py-5 flex flex-col gap-1">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-[15px] font-semibold text-[#0F172A] py-2.5 px-3.5 rounded-xl hover:bg-slate-50 transition-colors flex items-center justify-between"
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
                  className="w-full h-11 rounded-xl bg-[#0F172A] text-white font-semibold text-[14px] text-center active:scale-[0.98] transition-transform"
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

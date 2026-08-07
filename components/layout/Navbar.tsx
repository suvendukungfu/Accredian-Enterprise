"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Command, ChevronDown } from "lucide-react";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import { Container } from "@/components/ui/Container";
import { ThemeToggle } from "@/components/common/ThemeToggle";

interface NavbarProps {
  onOpenEnquireModal: () => void;
  onOpenCommandPalette: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenEnquireModal,
  onOpenCommandPalette,
}) => {
  const { isScrolled } = useScrollPosition();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 dark:bg-slate-950/90 backdrop-blur-md shadow-sm border-b border-slate-200/80 dark:border-slate-800/80 py-3"
          : "bg-white/70 dark:bg-slate-950/70 backdrop-blur-sm py-4 border-b border-slate-200/60 dark:border-slate-800/60"
      }`}
    >
      <Container className="flex items-center justify-between">
        {/* Brand Logo */}
        <Link
          href="#hero"
          className="flex items-center gap-2.5 group focus:outline-none rounded-lg p-1"
        >
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-black text-lg shadow-sm">
            A
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold text-slate-900 dark:text-white tracking-tight leading-none">
              Accredian
            </span>
            <span className="text-[9px] uppercase font-bold tracking-widest text-slate-500 dark:text-slate-400">
              ENTERPRISE
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8">
          <a
            href="#programs"
            className="text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-1"
          >
            Solutions <ChevronDown className="w-3.5 h-3.5 opacity-60" />
          </a>
          <a
            href="#edge"
            className="text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-1"
          >
            Platform <ChevronDown className="w-3.5 h-3.5 opacity-60" />
          </a>
          <a
            href="#case-studies"
            className="text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-1"
          >
            Resources <ChevronDown className="w-3.5 h-3.5 opacity-60" />
          </a>
          <a
            href="#roi-calculator"
            className="text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            Enterprise
          </a>
        </nav>

        {/* Action Controls: Spotlight Search, Theme Toggle, Request Demo CTA */}
        <div className="flex items-center gap-3">
          {/* Command Palette Trigger */}
          <button
            onClick={onOpenCommandPalette}
            aria-label="Open command palette (Cmd+K)"
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:border-blue-500 transition-colors text-xs font-semibold"
          >
            <Command className="w-3.5 h-3.5 text-slate-400" />
            <span>Search</span>
            <kbd className="text-[10px] font-bold bg-white dark:bg-slate-800 px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-700">
              ⌘K
            </kbd>
          </button>

          {/* Theme Toggle Button */}
          <ThemeToggle />

          {/* Request Demo CTA Button */}
          <button
            onClick={onOpenEnquireModal}
            className="hidden sm:inline-flex px-5 py-2 rounded-full bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 font-semibold text-sm transition-all shadow-sm"
          >
            Request Demo
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={toggleMobileMenu}
            aria-label="Toggle navigation menu"
            className="lg:hidden p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </Container>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden"
          >
            <Container className="py-6 flex flex-col gap-4">
              <nav className="flex flex-col gap-3">
                <a
                  href="#programs"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-semibold text-slate-800 dark:text-slate-200 py-2 border-b border-slate-100 dark:border-slate-900"
                >
                  Solutions
                </a>
                <a
                  href="#edge"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-semibold text-slate-800 dark:text-slate-200 py-2 border-b border-slate-100 dark:border-slate-900"
                >
                  Platform
                </a>
                <a
                  href="#case-studies"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-semibold text-slate-800 dark:text-slate-200 py-2 border-b border-slate-100 dark:border-slate-900"
                >
                  Resources
                </a>
                <a
                  href="#roi-calculator"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-semibold text-slate-800 dark:text-slate-200 py-2 border-b border-slate-100 dark:border-slate-900"
                >
                  Enterprise
                </a>
              </nav>

              <div className="pt-2 flex flex-col gap-3">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenEnquireModal();
                  }}
                  className="w-full py-3 rounded-full bg-slate-900 text-white font-semibold text-sm text-center"
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

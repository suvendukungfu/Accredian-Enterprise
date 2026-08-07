"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight, ShieldCheck } from "lucide-react";
import { NAV_ITEMS } from "@/constants/navigation";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

interface NavbarProps {
  onOpenEnquireModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenEnquireModal }) => {
  const { isScrolled } = useScrollPosition();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm border-b border-slate-200/80 py-3"
          : "bg-white/80 backdrop-blur-sm py-4 sm:py-5 border-b border-slate-100"
      }`}
    >
      <Container className="flex items-center justify-between">
        {/* Brand Logo */}
        <Link
          href="#hero"
          className="flex items-center gap-2.5 group focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg p-1"
        >
          <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-600/30 group-hover:scale-105 transition-transform">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-none group-hover:text-blue-600 transition-colors">
              accredian<span className="text-blue-600">.</span>
            </span>
            <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500">
              credentials that matter
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors py-1 relative group"
            >
              {item.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-200 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Action Button & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <Button
            variant="primary"
            size="md"
            onClick={onOpenEnquireModal}
            rightIcon={<ArrowRight className="w-4 h-4" />}
            className="hidden sm:inline-flex"
          >
            Enquire Now
          </Button>

          <button
            onClick={toggleMobileMenu}
            aria-label="Toggle navigation menu"
            className="lg:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </Container>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden bg-white border-b border-slate-200 shadow-xl overflow-hidden"
          >
            <Container className="py-6 flex flex-col gap-4">
              <nav className="flex flex-col gap-3">
                {NAV_ITEMS.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-base font-semibold text-slate-800 hover:text-blue-600 py-2 border-b border-slate-100"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>

              <div className="pt-2">
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenEnquireModal();
                  }}
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                  className="w-full justify-center"
                >
                  Enquire Now
                </Button>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

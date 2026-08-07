"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calculator,
  BookOpen,
  ShieldCheck,
  Building2,
  HelpCircle,
  Sun,
  Moon,
  ArrowRight,
  Sparkles,
  Command,
} from "lucide-react";
import { useTheme } from "./ThemeProvider";

interface CommandItem {
  id: string;
  label: string;
  category: "Navigation" | "Interactive Tools" | "Actions";
  icon: React.ReactNode;
  action: () => void;
  badge?: string;
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenEnquireModal: (options?: { domain?: string; message?: string }) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onOpenEnquireModal,
}) => {
  const [query, setQuery] = useState("");
  const { resolvedTheme, setTheme } = useTheme();

  // Listen to Cmd+K or Ctrl+K shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Trigger handled by parent or state
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const items: CommandItem[] = [
    {
      id: "roi-calc",
      label: "Open Enterprise ROI Calculator",
      category: "Interactive Tools",
      icon: <Calculator className="w-4 h-4 text-emerald-500" />,
      action: () => {
        onClose();
        const el = document.getElementById("roi-calculator");
        el?.scrollIntoView({ behavior: "smooth" });
      },
      badge: "Calculator",
    },
    {
      id: "genai-program",
      label: "Generative AI & LLM Engineering Syllabus",
      category: "Interactive Tools",
      icon: <BookOpen className="w-4 h-4 text-blue-500" />,
      action: () => {
        onClose();
        const el = document.getElementById("programs");
        el?.scrollIntoView({ behavior: "smooth" });
      },
      badge: "Program",
    },
    {
      id: "request-proposal",
      label: "Schedule Enterprise Discovery Audit",
      category: "Actions",
      icon: <Sparkles className="w-4 h-4 text-amber-500" />,
      action: () => {
        onClose();
        onOpenEnquireModal({ message: "Requested discovery audit via Command Palette." });
      },
      badge: "Lead Modal",
    },
    {
      id: "toggle-theme",
      label: `Switch to ${resolvedTheme === "dark" ? "Light" : "Dark"} Mode`,
      category: "Actions",
      icon: resolvedTheme === "dark" ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-400" />,
      action: () => {
        setTheme(resolvedTheme === "dark" ? "light" : "dark");
        onClose();
      },
      badge: "Theme",
    },
    {
      id: "nav-programs",
      label: "Browse All Executive Curriculums",
      category: "Navigation",
      icon: <BookOpen className="w-4 h-4 text-slate-400" />,
      action: () => {
        onClose();
        document.getElementById("programs")?.scrollIntoView({ behavior: "smooth" });
      },
    },
    {
      id: "nav-edge",
      label: "Why Partner With Accredian (The Edge)",
      category: "Navigation",
      icon: <ShieldCheck className="w-4 h-4 text-slate-400" />,
      action: () => {
        onClose();
        document.getElementById("edge")?.scrollIntoView({ behavior: "smooth" });
      },
    },
    {
      id: "nav-comparison",
      label: "Enterprise Capability Comparison Matrix",
      category: "Navigation",
      icon: <Building2 className="w-4 h-4 text-slate-400" />,
      action: () => {
        onClose();
        document.getElementById("comparison")?.scrollIntoView({ behavior: "smooth" });
      },
    },
    {
      id: "nav-case-studies",
      label: "Client Case Studies & Verified Metrics",
      category: "Navigation",
      icon: <Building2 className="w-4 h-4 text-slate-400" />,
      action: () => {
        onClose();
        document.getElementById("case-studies")?.scrollIntoView({ behavior: "smooth" });
      },
    },
    {
      id: "nav-faqs",
      label: "Frequently Asked Questions",
      category: "Navigation",
      icon: <HelpCircle className="w-4 h-4 text-slate-400" />,
      action: () => {
        onClose();
        document.getElementById("faqs")?.scrollIntoView({ behavior: "smooth" });
      },
    },
  ];

  const filteredItems = items.filter((item) =>
    item.label.toLowerCase().includes(query.toLowerCase()) ||
    item.category.toLowerCase().includes(query.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-28 px-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/70 backdrop-blur-md"
        />

        {/* Command Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: -10 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="relative w-full max-w-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden z-10"
        >
          {/* Search Header */}
          <div className="flex items-center px-4 py-3.5 border-b border-slate-100 dark:border-slate-800">
            <Command className="w-5 h-5 text-slate-400 mr-3 shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type a command or search... (e.g. ROI, AI, Theme, Syllabus)"
              className="w-full bg-transparent text-sm font-medium text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none"
              autoFocus
            />
            <span className="text-[11px] font-bold text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md border border-slate-200 dark:border-slate-700">
              ESC
            </span>
          </div>

          {/* Results List */}
          <div className="max-h-80 overflow-y-auto p-2 space-y-1">
            {filteredItems.length === 0 ? (
              <div className="py-8 text-center text-xs text-slate-400">
                No matching commands found for &quot;{query}&quot;
              </div>
            ) : (
              filteredItems.map((item) => (
                <button
                  key={item.id}
                  onClick={item.action}
                  className="w-full px-3.5 py-2.5 rounded-2xl flex items-center justify-between text-left hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      {item.icon}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {item.label}
                      </div>
                      <div className="text-[10px] text-slate-400 font-medium">{item.category}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {item.badge && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300">
                        {item.badge}
                      </span>
                    )}
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors opacity-0 group-hover:opacity-100" />
                  </div>
                </button>
              ))
            )}
          </div>

          {/* Footer Shortcuts Info */}
          <div className="px-4 py-2.5 bg-slate-50 dark:bg-slate-950/60 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Command className="w-3 h-3 text-slate-400" /> + K Spotlight Palette
            </span>
            <span>Accredian Enterprise OS</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

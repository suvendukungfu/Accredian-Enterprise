"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Command } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface FloatingCTAProps {
  onOpenEnquireModal: () => void;
  onOpenCommandPalette: () => void;
}

export const FloatingCTA: React.FC<FloatingCTAProps> = ({
  onOpenEnquireModal,
  onOpenCommandPalette,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-6 right-6 z-40 hidden sm:flex items-center gap-2 p-2 rounded-full bg-slate-900/90 dark:bg-slate-800/90 backdrop-blur-xl border border-slate-700/80 shadow-2xl text-white"
        >
          <button
            onClick={onOpenCommandPalette}
            className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors flex items-center gap-1.5 text-xs font-bold px-3"
            title="Open Spotlight Search (⌘K)"
          >
            <Command className="w-3.5 h-3.5" />
            <span>⌘K</span>
          </button>

          <div className="h-4 w-px bg-white/20" />

          <Button
            variant="gradient"
            size="sm"
            onClick={onOpenEnquireModal}
            rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
            className="rounded-full shadow-lg text-xs py-2 px-4"
          >
            Schedule Audit
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

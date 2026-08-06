"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ToastProps {
  isVisible: boolean;
  message: string;
  type?: "success" | "error";
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({
  isVisible,
  message,
  type = "success",
  onClose,
}) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          className="fixed bottom-6 right-6 z-50 max-w-md w-full px-4"
        >
          <div
            className={cn(
              "flex items-center gap-3 p-4 rounded-2xl shadow-xl border backdrop-blur-md text-sm font-medium",
              type === "success"
                ? "bg-slate-900/95 text-white border-emerald-500/30"
                : "bg-red-950/95 text-white border-red-500/30"
            )}
          >
            {type === "success" ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
            )}
            <span className="flex-1">{message}</span>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-white transition-colors"
              aria-label="Dismiss toast"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface CardProps extends HTMLMotionProps<"div"> {
  variant?: "flat" | "elevated" | "bordered" | "glass";
  hoverEffect?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  variant = "elevated",
  hoverEffect = true,
  padding = "md",
  ...props
}) => {
  const paddingStyles = {
    none: "p-0",
    sm: "p-4 sm:p-5",
    md: "p-6 sm:p-8",
    lg: "p-8 sm:p-10",
  };

  const variantStyles = {
    flat: "bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800",
    elevated:
      "bg-white dark:bg-slate-900 shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-200/80 dark:border-slate-800",
    bordered: "bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800",
    glass:
      "bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 shadow-xl shadow-slate-900/5 dark:shadow-none",
  };

  return (
    <motion.div
      whileHover={
        hoverEffect
          ? {
              y: -5,
              transition: { duration: 0.2, ease: "easeOut" },
            }
          : undefined
      }
      className={cn(
        "rounded-3xl transition-shadow duration-300 relative overflow-hidden",
        paddingStyles[padding],
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
};

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
    flat: "bg-slate-50/80 border border-slate-100",
    elevated:
      "bg-white shadow-xl shadow-slate-200/50 border border-slate-100/80",
    bordered: "bg-white border-2 border-slate-200/80",
    glass:
      "bg-white/80 backdrop-blur-xl border border-white/60 shadow-xl shadow-slate-900/5",
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

"use client";

import React from "react";
import { motion } from "framer-motion";
import { Badge } from "./Badge";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  badgeText?: string;
  title: string;
  highlightText?: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
  light?: boolean;
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  badgeText,
  title,
  highlightText,
  subtitle,
  align = "center",
  light = false,
  className,
}) => {
  const alignmentStyles = {
    left: "text-left items-start mx-0",
    center: "text-center items-center mx-auto",
    right: "text-right items-end ml-auto",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn("flex flex-col max-w-3xl mb-12 sm:mb-16", alignmentStyles[align], className)}
    >
      {badgeText && (
        <Badge variant={light ? "secondary" : "primary"} className="mb-4">
          {badgeText}
        </Badge>
      )}

      <h2
        className={cn(
          "text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight",
          light ? "text-white" : "text-slate-900"
        )}
      >
        {title}{" "}
        {highlightText && (
          <span
            className={cn(
              "bg-linear-to-r bg-clip-text text-transparent",
              light ? "from-blue-400 to-indigo-300" : "from-blue-600 to-indigo-600"
            )}
          >
            {highlightText}
          </span>
        )}
      </h2>

      {subtitle && (
        <p
          className={cn(
            "mt-4 text-base sm:text-lg leading-relaxed max-w-2xl",
            light ? "text-slate-300" : "text-slate-600"
          )}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
};

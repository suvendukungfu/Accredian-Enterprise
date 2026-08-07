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
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  badgeText,
  title,
  highlightText,
  subtitle,
  align = "center",
  className,
}) => {
  const alignmentStyles = {
    left: "text-left items-start",
    center: "text-center items-center",
    right: "text-right items-end",
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
        <Badge variant="primary" className="mb-4">
          {badgeText}
        </Badge>
      )}

      <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
        {title}{" "}
        {highlightText && (
          <span className="bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            {highlightText}
          </span>
        )}
      </h2>

      {subtitle && (
        <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
};

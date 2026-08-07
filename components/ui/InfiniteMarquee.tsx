"use client";

import React from "react";
import { motion, Variants } from "framer-motion";

interface InfiniteMarqueeProps {
  children: React.ReactNode;
  direction?: "left" | "right";
  speed?: number;
  pauseOnHover?: boolean;
  className?: string;
}

export const InfiniteMarquee: React.FC<InfiniteMarqueeProps> = ({
  children,
  direction = "left",
  speed = 30,
  pauseOnHover = true,
  className = "",
}) => {
  const marqueeVariants: Variants = {
    animate: {
      x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: speed,
          ease: "linear",
        },
      },
    },
  };

  return (
    <div className={`overflow-hidden whitespace-nowrap flex w-full relative ${className}`}>
      {/* Side Fade Masks */}
      <div className="absolute top-0 left-0 bottom-0 w-16 bg-gradient-to-r from-white dark:from-slate-950 to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 right-0 bottom-0 w-16 bg-gradient-to-l from-white dark:from-slate-950 to-transparent z-10 pointer-events-none" />

      <motion.div
        className={`flex shrink-0 items-center gap-12 sm:gap-16 ${
          pauseOnHover ? "hover:[animation-play-state:paused]" : ""
        }`}
        variants={marqueeVariants}
        animate="animate"
      >
        <div className="flex items-center gap-12 sm:gap-16 shrink-0">{children}</div>
        <div className="flex items-center gap-12 sm:gap-16 shrink-0" aria-hidden="true">
          {children}
        </div>
      </motion.div>
    </div>
  );
};

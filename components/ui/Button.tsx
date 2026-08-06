"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "gradient";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      type = "button",
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:shadow-none select-none rounded-xl active:scale-[0.98]";

    const sizeStyles = {
      sm: "px-4 py-2 text-xs md:text-sm gap-1.5",
      md: "px-5 py-2.5 text-sm md:text-base gap-2",
      lg: "px-7 py-3.5 text-base md:text-lg gap-2.5 rounded-2xl",
    };

    const variantStyles = {
      primary:
        "bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-600/20 focus:ring-blue-500 hover:shadow-lg hover:shadow-blue-600/30",
      secondary:
        "bg-slate-900 hover:bg-slate-800 text-white shadow-md shadow-slate-900/10 focus:ring-slate-800",
      outline:
        "border-2 border-slate-200 hover:border-blue-600 bg-white hover:bg-blue-50/50 text-slate-700 hover:text-blue-600 focus:ring-blue-500",
      ghost:
        "bg-transparent hover:bg-slate-100 text-slate-700 hover:text-slate-900 focus:ring-slate-400",
      gradient:
        "bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg shadow-blue-500/25 focus:ring-blue-500 hover:shadow-xl hover:shadow-blue-500/35",
    };

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || isLoading}
        className={cn(
          baseStyles,
          sizeStyles[size],
          variantStyles[variant],
          className
        )}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin shrink-0" />
        ) : (
          leftIcon && <span className="shrink-0">{leftIcon}</span>
        )}
        <span>{children}</span>
        {!isLoading && rightIcon && (
          <span className="shrink-0">{rightIcon}</span>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "primary" | "secondary" | "success" | "outline" | "gradient";
  size?: "sm" | "md";
  icon?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  className,
  variant = "primary",
  size = "md",
  icon,
  ...props
}) => {
  const sizeStyles = {
    sm: "px-2.5 py-0.5 text-xs font-semibold gap-1",
    md: "px-3.5 py-1 text-xs sm:text-sm font-semibold gap-1.5",
  };

  const variantStyles = {
    primary: "bg-blue-50 text-blue-700 border border-blue-200/60",
    secondary: "bg-slate-100 text-slate-700 border border-slate-200",
    success: "bg-emerald-50 text-emerald-700 border border-emerald-200/60",
    outline: "bg-transparent text-slate-700 border border-slate-300",
    gradient:
      "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-sm shadow-blue-500/20 border-none",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full tracking-wide select-none",
        sizeStyles[size],
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};

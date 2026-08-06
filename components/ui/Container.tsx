import React from "react";
import { cn } from "@/lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType;
  clean?: boolean;
}

export const Container: React.FC<ContainerProps> = ({
  as: Component = "div",
  children,
  className,
  clean = false,
  ...props
}) => {
  return (
    <Component
      className={cn(
        "w-full mx-auto",
        clean ? "" : "max-w-7xl px-4 sm:px-6 lg:px-8",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};

import React from "react";
import { cn } from "@/lib/utils";

/**
 * Simple, beautiful Badge component (pure JS)
 * Matches your existing Card.jsx style perfectly
 */
const Badge = ({ children, variant = "default", className = "", ...props }) => {
  // Tailwind classes for each variant – clean & consistent with your app
  const variants = {
    default: "bg-blue-100 text-blue-800 border border-blue-200",
    secondary: "bg-gray-100 text-gray-800 border border-gray-300",
    destructive: "bg-red-100 text-red-800 border border-red-200",
    success: "bg-green-100 text-green-800 border border-green-200",
    warning: "bg-yellow-100 text-yellow-800 border border-yellow-200",
    info: "bg-cyan-100 text-cyan-800 border border-cyan-200",
    outline: "bg-transparent text-gray-700 border border-gray-400",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition-all",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};

export { Badge };
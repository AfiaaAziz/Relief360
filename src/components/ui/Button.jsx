import React from "react";
import { cn } from "../../lib/utils";

const buttonVariants = {
  default:
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  variant: {
    default:
      "bg-primary text-primary-foreground hover:bg-primary/90 shadow-button transition-all duration-200",
    destructive:
      "bg-destructive text-destructive-foreground hover:bg-destructive/90",
    outline:
      "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
    secondary:
      "bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-button transition-all duration-200",
    ghost: "hover:bg-accent hover:text-accent-foreground",
    link: "text-primary underline-offset-4 hover:underline",
    emergency:
      "bg-emergency text-emergency-foreground hover:bg-emergency/90 shadow-emergency transition-all duration-200 font-semibold",
    hero: "bg-gradient-hero text-primary-foreground hover:scale-105 shadow-button transition-all duration-300 font-semibold",
    success:
      "bg-success text-success-foreground hover:bg-success/90 shadow-button transition-all duration-200",
    warning:
      "bg-warning text-warning-foreground hover:bg-warning/90 shadow-button transition-all duration-200",
    info: "bg-info text-info-foreground hover:bg-info/90 shadow-button transition-all duration-200",
  },
  size: {
    default: "h-10 px-4 py-2",
    sm: "h-9 rounded-md px-3",
    lg: "h-11 rounded-md px-8",
    icon: "h-10 w-10",
  },
};

const Button = React.forwardRef(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    const baseClasses = buttonVariants.default;
    const variantClasses =
      buttonVariants.variant[variant] || buttonVariants.variant.default;
    const sizeClasses =
      buttonVariants.size[size] || buttonVariants.size.default;

    return (
      <button
        className={cn(baseClasses, variantClasses, sizeClasses, className)}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };

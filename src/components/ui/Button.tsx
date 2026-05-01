import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-bougainvillea/50 disabled:opacity-50",
          {
            "bg-burgundy text-cream hover:bg-burgundy/90": variant === "primary",
            "bg-terracotta text-cream hover:bg-terracotta/90": variant === "secondary",
            "border-2 border-burgundy text-burgundy hover:bg-burgundy hover:text-cream": variant === "outline",
            "text-warm-brown hover:bg-warm-brown/10": variant === "ghost",
          },
          {
            "px-3 py-1.5 text-sm": size === "sm",
            "px-5 py-2.5 text-sm": size === "md",
            "px-7 py-3 text-base": size === "lg",
          },
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
export default Button;

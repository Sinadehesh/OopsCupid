import Link from "next/link";
import React from "react";

interface CTAProps {
  text: string;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline";
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export default function CTA({ text, href, onClick, variant = "primary", className = "", type = "button", disabled = false }: CTAProps) {
  const baseStyles = "inline-flex items-center justify-center rounded-xl px-6 py-3 text-base font-semibold shadow-sm transition-smooth focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-primary-600 text-white hover:bg-primary-500 focus-visible:outline-primary-600",
    secondary: "bg-accent-500 text-white hover:bg-accent-600 focus-visible:outline-accent-500",
    outline: "bg-transparent text-foreground border border-border hover:bg-surface-hover focus-visible:outline-foreground",
  };

  const currentStyles = `${baseStyles} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={currentStyles}>
        {text}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={currentStyles}
      disabled={disabled}
    >
      {text}
    </button>
  );
}

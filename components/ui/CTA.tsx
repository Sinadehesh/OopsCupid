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
  const baseStyles = "inline-flex items-center justify-center rounded-lg px-6 py-3 text-base font-bold transition-smooth focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-primary-base text-white hover:bg-primary-hover focus-visible:outline-primary-base border border-transparent shadow-sm hover:shadow-md",
    secondary: "bg-white text-secondary-base border-2 border-secondary-base hover:bg-secondary-base hover:text-white focus-visible:outline-secondary-base shadow-sm",
    outline: "bg-transparent text-foreground border border-border hover:bg-background-secondary focus-visible:outline-foreground",
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

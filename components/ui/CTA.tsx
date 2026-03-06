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
  const baseStyles = "inline-flex items-center justify-center rounded-xl px-6 py-3 text-base font-bold shadow-sm transition-smooth focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-[var(--primary-base)] text-white hover:bg-[var(--primary-hover)] focus-visible:outline-[var(--primary-base)] border border-transparent shadow-[0_0_20px_rgba(228,87,107,0.2)]",
    secondary: "bg-[var(--secondary-base)] text-white hover:bg-[var(--secondary-hover)] focus-visible:outline-[var(--secondary-base)] border border-transparent shadow-[0_0_20px_rgba(110,123,255,0.2)]",
    outline: "bg-surface text-foreground border border-border hover:bg-surface-elevated focus-visible:outline-foreground hover:border-[var(--foreground-muted)]",
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

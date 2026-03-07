import Link from "next/link";
import React from "react";
import { ArrowRight } from "lucide-react";

interface CTAProps {
  text: string;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "text";
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  showArrow?: boolean;
}

export default function CTA({
  text,
  href,
  onClick,
  variant = "primary",
  className = "",
  type = "button",
  disabled = false,
  showArrow = false,
}: CTAProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-8 py-3 text-base font-semibold transition-smooth focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-[#FFB8A1] text-black hover:bg-[#F0A090] focus-visible:outline-[#FFB8A1]",
    secondary:
      "border border-[#5A7492] text-[#5A7492] hover:bg-[#5A7492] hover:text-white focus-visible:outline-[#5A7492]",
    text:
      "bg-transparent text-[#5A7492] hover:underline underline-offset-4 px-0 py-0 rounded-none font-medium",
  };

  const styles = `${base} ${variants[variant]} ${className}`;

  const inner = (
    <>
      {text}
      {showArrow && variant !== "text" && (
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      )}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={`group ${styles}`}>
        {inner}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`group ${styles}`}
    >
      {inner}
    </button>
  );
}

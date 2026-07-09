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
      "bg-[#EC8A66] text-white shadow-[0_4px_16px_rgba(224,120,80,0.30)] hover:bg-[#E07850] hover:shadow-[0_8px_24px_rgba(224,120,80,0.38)] hover:-translate-y-0.5 focus-visible:outline-[#EC8A66]",
    secondary:
      "border-[1.5px] border-[#3A556C]/25 text-[#3A556C] bg-white/60 backdrop-blur-sm hover:border-[#3A556C] hover:bg-[#3A556C] hover:text-white focus-visible:outline-[#5A7492]",
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

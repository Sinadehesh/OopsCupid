import Link from "next/link";
import React from "react";
import { ArrowRight } from "lucide-react";

interface CardProps {
  title: string;
  description?: string;
  href: string;
  imageUrl?: string;
  accentColor?: string;
  textColor?: "text-black" | "text-white";
  category?: string;
  icon?: React.ReactNode;
}

export default function Card({
  title,
  description,
  href,
  imageUrl,
  accentColor = "bg-white",
  textColor = "text-black",
}: CardProps) {
  return (
    <Link
      href={href}
      className="group block overflow-hidden rounded-[18px] bg-white/70 shadow-[0_6px_24px_rgba(120,95,120,0.08)] ring-1 ring-black/5 backdrop-blur-[2px] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_38_8px_rgba(120,95,120,0.12)]"
    >
      <div className="relative aspect-[0.95/1] overflow-hidden bg-[#F3ECEF]">
        {imageUrl ? (
          <>
            <img
              src={imageUrl}
              alt={title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/12 via-transparent to-[rgba(255,220,235,0.08)]" />
          </>
        ) : (
          <div className="flex h-full w-full items-center justify-center italic text-[#B8AAB3] text-sm">
            Placeholder Image
          </div>
        )}
      </div>

      <div
        className={`${accentColor} ${textColor} relative flex min-h-[190px] flex-col items-center px-6 pt-7 pb-8 text-center md:px-7`}
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-white/30" />

        <h3 className="mb-3 text-[32px] md:text-[36px] font-semibold leading-[1.02] tracking-[-0.03em]">
          {title}
        </h3>

        {description && (
          <p className="mx-auto max-w-[250px] text-[17px] md:text-[18px] font-normal leading-[1.55] tracking-[-0.01em] opacity-95">
            {description}
            <ArrowRight className="ml-1 inline-block h-[18px] w-[18px] align-[-2px] transition-transform duration-300 group-hover:translate-x-1" />
          </p>
        )}
      </div>
    </Link>
  );
}

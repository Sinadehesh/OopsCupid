import Link from "next/link";
import React from "react";
import { ArrowRight } from "lucide-react";

interface CardProps {
  title: string;
  description?: string;
  href?: string;
  imageUrl?: string;
  accentColor?: string;
  textColor?: string;
  category?: string;
  icon?: React.ReactNode;
  tag?: string;
  buttonText?: string;
  variant?: "default" | "tool" | "quiz" | "proof" | "article";
}

export default function Card({
  title,
  description,
  href,
  imageUrl,
  accentColor = "bg-white",
  textColor = "text-[#334B63]",
  tag,
  buttonText,
  variant = "default",
}: CardProps) {
  if (variant === "tool") {
    return (
      <div className="flex flex-col rounded-[18px] bg-white p-8 md:p-10 shadow-sm border border-[rgba(51,75,99,0.05)] h-full">
        <h3 className="text-[24px] font-semibold leading-tight text-[#334B63] mb-4">
          {title}
        </h3>
        <p className="text-[17px] text-[#5E6E79] font-normal leading-relaxed mb-8 flex-grow">
          {description}
        </p>
        {href && buttonText && (
          <Link
            href={href}
            className="inline-block w-fit bg-[#FFB8A1] text-black rounded-full px-8 py-3 font-semibold hover:bg-[#F0A090] transition-colors duration-200"
          >
            {buttonText}
          </Link>
        )}
      </div>
    );
  }

  if (variant === "quiz") {
    return (
      <Link
        href={href ?? "#"}
        className={`group flex flex-col overflow-hidden rounded-[16px] ${accentColor} transition-transform duration-200 hover:-translate-y-1 h-full border border-[rgba(51,75,99,0.05)]`}
      >
        {imageUrl && (
          <div className="h-48 w-full overflow-hidden">
            <img 
              src={imageUrl} 
              alt={title} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
            />
          </div>
        )}
        <div className="p-8 md:p-10 flex flex-col flex-grow justify-between bg-white/40">
          <h3 className={`text-[22px] font-bold leading-[1.3] ${textColor}`}>
            {title}
          </h3>
          <span className="mt-4 flex items-center text-[15px] font-bold text-[#334B63]/80">
            Take Quiz <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </Link>
    );
  }

  if (variant === "proof") {
    return (
      <div className="flex flex-col rounded-[16px] bg-[#FFFDFC] p-8 border border-[rgba(51,75,99,0.10)] h-full">
        <h3 className="text-[20px] font-semibold leading-snug text-[#334B63] mb-4">
          {title}
        </h3>
        <p className="text-[16px] text-[#5E6E79] font-normal leading-relaxed">
          {description}
        </p>
      </div>
    );
  }

  if (variant === "article") {
    return (
      <article className="h-full">
        <Link
          href={href ?? "#"}
          className="group flex flex-col rounded-[16px] bg-white p-6 md:p-8 shadow-sm border border-[rgba(51,75,99,0.05)] transition-shadow hover:shadow-md h-full"
        >
          {tag && (
            <span className="mb-4 inline-block text-[13px] font-semibold tracking-wide uppercase text-[#8A6D85]">
              {tag}
            </span>
          )}
          <h3 className="text-[20px] font-semibold leading-[1.4] text-[#334B63] group-hover:text-[#5A7492] transition-colors">
            {title}
          </h3>
        </Link>
      </article>
    );
  }

  return (
    <Link
      href={href ?? "#"}
      className="group block overflow-hidden rounded-[18px] bg-white/70 shadow-[0_6px_24px_rgba(120,95,120,0.08)] ring-1 ring-black/5 backdrop-blur-[2px] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_38px_rgba(120,95,120,0.12)]"
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

import Link from "next/link";
import React from "react";
import { ArrowRight } from "lucide-react";


interface CardProps {
  title: string;
  description?: string;
  href: string;
  category?: string;
  imageUrl?: string;
  accentColor?: string; // e.g., 'bg-[#F8E9E4]'
  icon?: React.ReactNode;
}

export default function Card({ 
  title, 
  description, 
  href, 
  imageUrl, 
  accentColor = "bg-white",
  icon 
}: CardProps) {
  return (
    <Link
      href={href}
      className="group block overflow-hidden rounded-xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-border"
    >
      {/* Top Image Area */}
      <div className="aspect-[4/3] relative overflow-hidden bg-background-secondary">
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center opacity-20">
            {icon ? React.cloneElement(icon as React.ReactElement, { className: "w-20 h-20" }) : null}
          </div>
        )}
      </div>

      {/* Content Block with Specific Tint */}
      <div className={`${accentColor} p-10 flex flex-col h-full min-h-[220px]`}>
        <h3 className="mb-4 text-4xl font-bold text-[#0E0B0C] tracking-tight">
          {title}
        </h3>
        {description && (
          <p className="text-xl text-[#334B63] font-medium leading-tight mb-8">
            {description}
          </p>
        )}
        <div className="mt-auto flex items-center gap-3">
          <ArrowRight className="w-8 h-8 text-[#0E0B0C] transition-transform group-hover:translate-x-2" />
        </div>
      </div>
    </Link>
  );
}

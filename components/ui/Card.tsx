import Link from "next/link";
import React from "react";
import { ArrowRight } from "lucide-react";

interface CardProps {
  title: string;
  description?: string;
  href: string;
  imageUrl?: string;
  accentColor?: string; // e.g., 'bg-[#FFB8A1]'
  textColor?: "text-black" | "text-white";
  category?: string; // Backward compatibility
  icon?: React.ReactNode; // Backward compatibility
}

export default function Card({ 
  title, 
  description, 
  href, 
  imageUrl, 
  accentColor = "bg-white",
  textColor = "text-black"
}: CardProps) {
  return (
    <Link
      href={href}
      className="group block overflow-hidden rounded-[8px] bg-white shadow-sm hover:shadow-md transition-all duration-300"
    >
      {/* Top Half: Image */}
      <div className="aspect-square relative overflow-hidden bg-[#F0F0F0]">
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center italic text-[#B0B0B0] text-sm">
            Placeholder Image
          </div>
        )}
      </div>

      {/* Bottom Half: Solid color block */}
      <div className={`${accentColor} ${textColor} p-8 flex flex-col items-center text-center h-full min-h-[160px]`}>
        <h3 className="mb-2 text-xl font-bold tracking-tight uppercase">
          {title}
        </h3>
        {description && (
          <p className="text-sm font-normal leading-relaxed">
            {description}
            <ArrowRight className="inline-block ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" />
          </p>
        )}
      </div>
    </Link>
  );
}

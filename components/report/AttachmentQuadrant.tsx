import React from "react";

export type DomainPoint = {
  name: string;
  anxiety: number;
  avoidance: number;
};

interface AttachmentQuadrantProps {
  domains: DomainPoint[];
  isDarkTheme?: boolean;
}

// Exactly matching AP color palette
const DOMAIN_COLORS: Record<string, string> = {
  "General": "#a855f7",  // Purple
  "Romantic": "#ef4444", // Red
  "Mother": "#8b5cf6",   // Violet
  "Father": "#fb923c",   // Peach
  "Work": "#f97316",     // Orange
};

export default function AttachmentQuadrant({ domains, isDarkTheme }: AttachmentQuadrantProps) {
  return (
    <div className="w-full max-w-[620px] mx-auto flex flex-col items-center">
      
      {/* Container with fixed responsive height for better PC viewing */}
      <div className="relative w-full h-[350px] md:h-[450px] mb-6 bg-white border-2 border-slate-200 rounded-xl shadow-sm overflow-hidden">
        
        {/* HTML Overlays for perfect readability on all screen sizes */}
        <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 pointer-events-none z-0">
          <div className="flex items-center justify-center bg-blue-50/40 border-r border-b border-slate-200/50">
            <span className="font-extrabold text-blue-300 uppercase tracking-widest text-xs md:text-sm">Dismissing</span>
          </div>
          <div className="flex items-center justify-center bg-pink-50/40 border-b border-slate-200/50">
            <span className="font-extrabold text-pink-300 uppercase tracking-widest text-xs md:text-sm">Fearful-Avoidant</span>
          </div>
          <div className="flex items-center justify-center bg-teal-50/40 border-r border-slate-200/50">
            <span className="font-extrabold text-teal-300 uppercase tracking-widest text-xs md:text-sm">Secure</span>
          </div>
          <div className="flex items-center justify-center bg-orange-50/40">
            <span className="font-extrabold text-orange-300 uppercase tracking-widest text-xs md:text-sm">Preoccupied</span>
          </div>
        </div>

        {/* Axes Lines */}
        <div className="absolute inset-0 pointer-events-none z-10">
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-slate-300 border-dashed"></div>
          <div className="absolute top-1/2 left-0 right-0 h-px bg-slate-300 border-dashed"></div>
        </div>

        {/* Axes Labels */}
        <div className="absolute bottom-2 left-0 right-0 text-center pointer-events-none z-10">
          <span className="text-[10px] md:text-xs font-bold text-slate-400 tracking-widest uppercase">Low ← Anxiety → High</span>
        </div>
        <div className="absolute top-0 bottom-0 left-2 flex items-center justify-center pointer-events-none z-10" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
          <span className="text-[10px] md:text-xs font-bold text-slate-400 tracking-widest uppercase">Low ← Avoidance → High</span>
        </div>

        {/* SVG Data Points */}
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full z-20 overflow-visible">
          {domains.map((domain, i) => {
            const cx = Math.max(3, Math.min(97, domain.anxiety));
            const cy = Math.max(3, Math.min(97, 100 - domain.avoidance)); 
            const color = DOMAIN_COLORS[domain.name] || "#334B63";

            return (
              <g key={i} className="group transition-all">
                <circle cx={cx} cy={cy} r="4" fill={color} opacity="0.25" className="animate-pulse" />
                <circle cx={cx} cy={cy} r="1.8" fill={color} stroke="#ffffff" strokeWidth="0.5" />
              </g>
            );
          })}
        </svg>
      </div>

      {/* EXACT PDF LEGEND */}
      <div className="flex flex-wrap justify-center gap-3 md:gap-5 px-2 w-full">
        {domains.map((domain, i) => {
          const color = DOMAIN_COLORS[domain.name] || "#334B63";
          return (
            <div key={i} className="flex items-center gap-1.5 md:gap-2">
              <span className="w-3 h-3 md:w-4 md:h-4 rounded-full shadow-sm" style={{ backgroundColor: color }}></span>
              <span className="font-bold text-slate-600 text-xs md:text-sm uppercase tracking-wide">
                {domain.name === "Work" ? "At Work" : domain.name}
              </span>
            </div>
          );
        })}
      </div>
      
    </div>
  );
}

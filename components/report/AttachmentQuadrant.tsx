import React from "react";

export type DomainPoint = {
  name: string;
  anxiety: number;   // 0-100 scale
  avoidance: number; // 0-100 scale
};

interface AttachmentQuadrantProps {
  domains: DomainPoint[];
  isDarkTheme?: boolean; // <-- THIS IS THE MISSING FIX THAT WAS BREAKING YOUR BUILD
}

// Fixed distinct colors for the 5 standard ECR-RS domains
const DOMAIN_COLORS: Record<string, string> = {
  "General": "#8b5cf6",  // Violet
  "Romantic": "#ef4444", // Red
  "Mother": "#10b981",   // Emerald
  "Father": "#3b82f6",   // Blue
  "Work": "#f59e0b",     // Amber
};

export default function AttachmentQuadrant({ domains, isDarkTheme }: AttachmentQuadrantProps) {
  return (
    <div className="w-full max-w-xl mx-auto flex flex-col items-center">
      
      {/* Aspect Ratio Container for the SVG */}
      <div className="relative w-full aspect-square max-w-[500px] p-2">
        <svg 
          viewBox="0 0 100 100" 
          className={`w-full h-full rounded-2xl shadow-sm border-2 ${isDarkTheme ? "border-gray-700 bg-slate-900" : "border-gray-100 bg-white"} overflow-hidden`}
        >
          {/* --- QUADRANT BACKGROUNDS --- */}
          
          {/* Top-Left: Dismissing (High Avoidance, Low Anxiety) */}
          <rect x="0" y="0" width="50" height="50" fill={isDarkTheme ? "#1e293b" : "#eff6ff"} />
          <text x="25" y="25" textAnchor="middle" dominantBaseline="middle" className={`text-[3.5px] font-extrabold ${isDarkTheme ? "fill-blue-400/40" : "fill-blue-400/60"} uppercase tracking-widest`}>
            Dismissing
          </text>

          {/* Top-Right: Fearful-Avoidant (High Avoidance, High Anxiety) */}
          <rect x="50" y="0" width="50" height="50" fill={isDarkTheme ? "#331b26" : "#fdf2f8"} />
          <text x="75" y="25" textAnchor="middle" dominantBaseline="middle" className={`text-[3.5px] font-extrabold ${isDarkTheme ? "fill-pink-400/40" : "fill-pink-400/60"} uppercase tracking-widest`}>
            Fearful-Avoidant
          </text>

          {/* Bottom-Left: Secure (Low Avoidance, Low Anxiety) */}
          <rect x="0" y="50" width="50" height="50" fill={isDarkTheme ? "#132c2a" : "#f0fdfa"} />
          <text x="25" y="75" textAnchor="middle" dominantBaseline="middle" className={`text-[3.5px] font-extrabold ${isDarkTheme ? "fill-teal-400/40" : "fill-teal-400/60"} uppercase tracking-widest`}>
            Secure
          </text>

          {/* Bottom-Right: Preoccupied (Low Avoidance, High Anxiety) */}
          <rect x="50" y="50" width="50" height="50" fill={isDarkTheme ? "#332212" : "#fff7ed"} />
          <text x="75" y="75" textAnchor="middle" dominantBaseline="middle" className={`text-[3.5px] font-extrabold ${isDarkTheme ? "fill-orange-400/40" : "fill-orange-400/60"} uppercase tracking-widest`}>
            Preoccupied
          </text>

          {/* --- AXES & LABELS --- */}
          <line x1="50" y1="0" x2="50" y2="100" stroke={isDarkTheme ? "#475569" : "#cbd5e1"} strokeWidth="0.5" strokeDasharray="2 1" />
          <line x1="0" y1="50" x2="100" y2="50" stroke={isDarkTheme ? "#475569" : "#cbd5e1"} strokeWidth="0.5" strokeDasharray="2 1" />

          {/* X-Axis Label (Anxiety) */}
          <text x="50" y="98" textAnchor="middle" className={`text-[2.5px] ${isDarkTheme ? "fill-slate-400" : "fill-slate-500"} font-semibold tracking-widest`}>
            LOW ← ANXIETY → HIGH
          </text>

          {/* Y-Axis Label (Avoidance) - Rotated */}
          <text x="-50" y="3" transform="rotate(-90)" textAnchor="middle" className={`text-[2.5px] ${isDarkTheme ? "fill-slate-400" : "fill-slate-500"} font-semibold tracking-widest`}>
            LOW ← AVOIDANCE → HIGH
          </text>

          {/* --- PLOTTING DOMAINS --- */}
          {domains.map((domain, i) => {
            const cx = Math.max(2, Math.min(98, domain.anxiety));
            const cy = Math.max(2, Math.min(98, 100 - domain.avoidance)); 
            const color = DOMAIN_COLORS[domain.name] || "#334B63";

            return (
              <g key={i} className="group transition-all">
                <circle cx={cx} cy={cy} r="3.5" fill={color} opacity="0.2" className="animate-pulse" />
                <circle cx={cx} cy={cy} r="1.5" fill={color} stroke={isDarkTheme ? "#1e293b" : "#ffffff"} strokeWidth="0.4" />
                <text x={cx} y={cy - 2.5} textAnchor="middle" className={`text-[2.5px] font-bold ${isDarkTheme ? "fill-slate-200" : "fill-slate-700"} opacity-0 group-hover:opacity-100 transition-opacity`}>
                  {domain.name}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* --- LEGEND FOR MOBILE/DESKTOP READABILITY --- */}
      <div className="flex flex-wrap justify-center gap-3 mt-6 px-4">
        {domains.map((domain, i) => {
          const color = DOMAIN_COLORS[domain.name] || "#334B63";
          return (
            <div key={i} className={`flex items-center gap-2 ${isDarkTheme ? "bg-slate-800 border-slate-700" : "bg-white border-gray-200"} px-3 py-1.5 rounded-full border shadow-sm text-sm`}>
              <span className="w-3 h-3 rounded-full shadow-inner" style={{ backgroundColor: color }}></span>
              <span className={`font-semibold ${isDarkTheme ? "text-slate-200" : "text-slate-700"}`}>{domain.name}</span>
            </div>
          );
        })}
      </div>
      
    </div>
  );
}

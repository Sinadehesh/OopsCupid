import React from "react";

export type DomainPoint = {
  name: string;
  anxiety: number;   // 0-100 scale
  avoidance: number; // 0-100 scale
};

interface AttachmentQuadrantProps {
  domains: DomainPoint[];
}

// Fixed distinct colors for the 5 standard ECR-RS domains
const DOMAIN_COLORS: Record<string, string> = {
  "General": "#8b5cf6",  // Violet
  "Romantic": "#ef4444", // Red
  "Mother": "#10b981",   // Emerald
  "Father": "#3b82f6",   // Blue
  "Work": "#f59e0b",     // Amber
};

export default function AttachmentQuadrant({ domains }: AttachmentQuadrantProps) {
  return (
    <div className="w-full max-w-xl mx-auto flex flex-col items-center">
      
      {/* Aspect Ratio Container for the SVG */}
      <div className="relative w-full aspect-square max-w-[500px] p-2">
        <svg 
          viewBox="0 0 100 100" 
          className="w-full h-full rounded-2xl shadow-sm border-2 border-gray-100 overflow-hidden bg-white"
        >
          {/* --- QUADRANT BACKGROUNDS --- */}
          
          {/* Top-Left: Dismissing (High Avoidance, Low Anxiety) */}
          <rect x="0" y="0" width="50" height="50" fill="#eff6ff" />
          <text x="25" y="25" textAnchor="middle" dominantBaseline="middle" className="text-[3.5px] font-extrabold fill-blue-400/60 uppercase tracking-widest">
            Dismissing
          </text>

          {/* Top-Right: Fearful-Avoidant (High Avoidance, High Anxiety) */}
          <rect x="50" y="0" width="50" height="50" fill="#fdf2f8" />
          <text x="75" y="25" textAnchor="middle" dominantBaseline="middle" className="text-[3.5px] font-extrabold fill-pink-400/60 uppercase tracking-widest">
            Fearful-Avoidant
          </text>

          {/* Bottom-Left: Secure (Low Avoidance, Low Anxiety) */}
          <rect x="0" y="50" width="50" height="50" fill="#f0fdfa" />
          <text x="25" y="75" textAnchor="middle" dominantBaseline="middle" className="text-[3.5px] font-extrabold fill-teal-400/60 uppercase tracking-widest">
            Secure
          </text>

          {/* Bottom-Right: Preoccupied (Low Avoidance, High Anxiety) */}
          <rect x="50" y="50" width="50" height="50" fill="#fff7ed" />
          <text x="75" y="75" textAnchor="middle" dominantBaseline="middle" className="text-[3.5px] font-extrabold fill-orange-400/60 uppercase tracking-widest">
            Preoccupied
          </text>

          {/* --- AXES & LABELS --- */}
          <line x1="50" y1="0" x2="50" y2="100" stroke="#cbd5e1" strokeWidth="0.5" strokeDasharray="2 1" />
          <line x1="0" y1="50" x2="100" y2="50" stroke="#cbd5e1" strokeWidth="0.5" strokeDasharray="2 1" />

          {/* X-Axis Label (Anxiety) */}
          <text x="50" y="98" textAnchor="middle" className="text-[2.5px] fill-slate-500 font-semibold tracking-widest">
            LOW ← ANXIETY → HIGH
          </text>

          {/* Y-Axis Label (Avoidance) - Rotated */}
          <text x="-50" y="3" transform="rotate(-90)" textAnchor="middle" className="text-[2.5px] fill-slate-500 font-semibold tracking-widest">
            LOW ← AVOIDANCE → HIGH
          </text>

          {/* --- PLOTTING DOMAINS --- */}
          {domains.map((domain, i) => {
            // Constrain between 2% and 98% so dots don't clip off the SVG edges
            const cx = Math.max(2, Math.min(98, domain.anxiety));
            // Y-axis is inverted in SVG (0 is top). High Avoidance = Top.
            const cy = Math.max(2, Math.min(98, 100 - domain.avoidance)); 
            const color = DOMAIN_COLORS[domain.name] || "#334B63";

            return (
              <g key={i} className="group transition-all">
                {/* Connecting line to center (optional, creates a cool radar effect if desired, disabled here for clean look) */}
                {/* <line x1="50" y1="50" x2={cx} y2={cy} stroke={color} strokeWidth="0.2" strokeDasharray="1 1" opacity="0.4" /> */}
                
                {/* Outer glow/pulse ring */}
                <circle cx={cx} cy={cy} r="3.5" fill={color} opacity="0.2" className="animate-pulse" />
                
                {/* Core data point */}
                <circle cx={cx} cy={cy} r="1.5" fill={color} stroke="#ffffff" strokeWidth="0.4" />
                
                {/* Hover/Label text inside SVG */}
                <text x={cx} y={cy - 2.5} textAnchor="middle" className="text-[2.5px] font-bold fill-slate-700 opacity-0 group-hover:opacity-100 transition-opacity">
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
            <div key={i} className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border border-gray-200 shadow-sm text-sm">
              <span className="w-3 h-3 rounded-full shadow-inner" style={{ backgroundColor: color }}></span>
              <span className="font-semibold text-slate-700">{domain.name}</span>
            </div>
          );
        })}
      </div>
      
    </div>
  );
}

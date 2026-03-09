import React from "react";

export type DomainPoint = { name: string; anxiety: number; avoidance: number; };

interface AttachmentQuadrantProps { domains: DomainPoint[]; isDarkTheme?: boolean; }

const DOMAIN_COLORS: Record<string, string> = {
  "General": "#a855f7", "Romantic": "#ef4444", "Mother": "#8b5cf6", "Father": "#fb923c", "Work": "#f97316",
};

export default function AttachmentQuadrant({ domains, isDarkTheme }: AttachmentQuadrantProps) {
  return (
    <div className="w-full max-w-[500px] mx-auto flex flex-col items-center">
      
      {/* Perfect Square Aspect Ratio to prevent distortion */}
      <div className={`relative w-full aspect-square mb-6 border-2 rounded-xl shadow-sm overflow-hidden ${isDarkTheme ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-200'}`}>
        
        {/* Background Grid */}
        <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 pointer-events-none z-0">
          <div className={`flex items-center justify-center border-r border-b ${isDarkTheme ? 'bg-blue-900/20 border-slate-700' : 'bg-blue-50/40 border-slate-200/50'}`}>
            <span className={`font-extrabold uppercase tracking-widest text-[10px] md:text-sm ${isDarkTheme ? 'text-blue-500/50' : 'text-blue-300'}`}>Dismissing</span>
          </div>
          <div className={`flex items-center justify-center border-b ${isDarkTheme ? 'bg-pink-900/20 border-slate-700' : 'bg-pink-50/40 border-slate-200/50'}`}>
            <span className={`font-extrabold uppercase tracking-widest text-[10px] md:text-sm ${isDarkTheme ? 'text-pink-500/50' : 'text-pink-300'}`}>Fearful-Avoidant</span>
          </div>
          <div className={`flex items-center justify-center border-r ${isDarkTheme ? 'bg-teal-900/20 border-slate-700' : 'bg-teal-50/40 border-slate-200/50'}`}>
            <span className={`font-extrabold uppercase tracking-widest text-[10px] md:text-sm ${isDarkTheme ? 'text-teal-500/50' : 'text-teal-300'}`}>Secure</span>
          </div>
          <div className={`flex items-center justify-center ${isDarkTheme ? 'bg-orange-900/20' : 'bg-orange-50/40'}`}>
            <span className={`font-extrabold uppercase tracking-widest text-[10px] md:text-sm ${isDarkTheme ? 'text-orange-500/50' : 'text-orange-300'}`}>Preoccupied</span>
          </div>
        </div>

        {/* Axes */}
        <div className="absolute inset-0 pointer-events-none z-10">
          <div className={`absolute left-1/2 top-0 bottom-0 w-px border-dashed ${isDarkTheme ? 'bg-slate-700' : 'bg-slate-300'}`}></div>
          <div className={`absolute top-1/2 left-0 right-0 h-px border-dashed ${isDarkTheme ? 'bg-slate-700' : 'bg-slate-300'}`}></div>
        </div>

        {/* Labels */}
        <div className="absolute bottom-2 left-0 right-0 text-center pointer-events-none z-10">
          <span className="text-[9px] md:text-xs font-bold text-slate-400 tracking-widest uppercase">Low ← Anxiety → High</span>
        </div>
        <div className="absolute top-0 bottom-0 left-2 flex items-center justify-center pointer-events-none z-10" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
          <span className="text-[9px] md:text-xs font-bold text-slate-400 tracking-widest uppercase">Low ← Avoidance → High</span>
        </div>

        {/* Clean SVG Rendering (No preserveAspectRatio="none" distortion) */}
        <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full z-20 overflow-visible">
          {domains.map((domain, i) => {
            const cx = Math.max(4, Math.min(96, domain.anxiety));
            const cy = Math.max(4, Math.min(96, 100 - domain.avoidance)); 
            const color = DOMAIN_COLORS[domain.name] || "#334B63";
            return (
              <g key={i} className="group transition-all">
                <circle cx={cx} cy={cy} r="4.5" fill={color} opacity="0.25" className="animate-pulse" />
                <circle cx={cx} cy={cy} r="2" fill={color} stroke={isDarkTheme ? "#0f172a" : "#ffffff"} strokeWidth="0.5" />
              </g>
            );
          })}
        </svg>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-3 md:gap-5 px-2 w-full">
        {domains.map((domain, i) => {
          const color = DOMAIN_COLORS[domain.name] || "#334B63";
          return (
            <div key={i} className="flex items-center gap-1.5 md:gap-2">
              <span className="w-3 h-3 md:w-4 md:h-4 rounded-full shadow-sm" style={{ backgroundColor: color }}></span>
              <span className={`font-bold text-[11px] md:text-sm uppercase tracking-wide ${isDarkTheme ? 'text-slate-300' : 'text-slate-600'}`}>
                {domain.name === "Work" ? "At Work" : domain.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

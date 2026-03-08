import React from 'react';

interface ResultGaugeProps {
  score: number; // 0 to 100
  label: string;
}

export default function ResultGauge({ score, label }: ResultGaugeProps) {
  // Ensure score stays within bounds
  const clampedScore = Math.min(100, Math.max(0, score));
  
  // Calculate needle rotation: 0 score = 0 degrees (left), 100 score = 180 degrees (right)
  const angle = clampedScore * 1.8; 

  // SVG parameters for the arcs
  const radius = 80;
  const circumference = Math.PI * radius; // Half circle = ~251.32
  const segmentLength = circumference / 4; // 4 segments = ~62.83

  return (
    <div className="flex flex-col items-center justify-center bg-[#000000] p-8 rounded-[24px] shadow-2xl w-full max-w-sm mx-auto my-8 border border-gray-800">
      
      {/* 1200x628 Aspect Ratio Concept scaled down for web UI */}
      <svg viewBox="0 0 200 120" className="w-full h-auto drop-shadow-md overflow-visible">
        
        {/* Arc Segments (Rotated sequentially) */}
        <circle cx="100" cy="100" r={radius} fill="none" stroke="#00FF00" strokeWidth="16" strokeDasharray={`${segmentLength} 1000`} transform="rotate(180, 100, 100)" />
        <circle cx="100" cy="100" r={radius} fill="none" stroke="#FFFF00" strokeWidth="16" strokeDasharray={`${segmentLength} 1000`} transform="rotate(225, 100, 100)" />
        <circle cx="100" cy="100" r={radius} fill="none" stroke="#FFA500" strokeWidth="16" strokeDasharray={`${segmentLength} 1000`} transform="rotate(270, 100, 100)" />
        <circle cx="100" cy="100" r={radius} fill="none" stroke="#FF0000" strokeWidth="16" strokeDasharray={`${segmentLength} 1000`} transform="rotate(315, 100, 100)" />

        {/* Text Labels */}
        <text x="15" y="115" fill="#FFFFFF" fontSize="10" fontWeight="bold" fontFamily="sans-serif">← LOW</text>
        <text x="185" y="115" fill="#FFFFFF" fontSize="10" fontWeight="bold" fontFamily="sans-serif" textAnchor="end">HIGH →</text>

        {/* Pivot Needle */}
        <g transform={`rotate(${angle}, 100, 100)`}>
          <line x1="100" y1="100" x2="25" y2="100" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
        </g>
        
        {/* Center Dot */}
        <circle cx="100" cy="100" r="4" fill="#FFFFFF" />
      </svg>
      
      {/* Label & Readout */}
      <div className="mt-6 text-center">
        <span className="text-white font-extrabold text-[18px] tracking-[0.15em] uppercase sans-serif block mb-1">
          {label}
        </span>
        <span className="text-gray-400 font-mono text-[12px] uppercase tracking-widest">
          Risk Index: {Math.round(clampedScore)}
        </span>
      </div>
    </div>
  );
}

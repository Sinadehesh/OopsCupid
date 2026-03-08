import React from 'react';

export default function ResultGauge({ score, label }: { score: number, label: string }) {
  const clampedScore = Math.min(100, Math.max(0, score));
  const angle = clampedScore * 1.8; 
  const radius = 80;
  const circumference = Math.PI * radius; 
  const segmentLength = circumference / 4; 

  return (
    <div className="flex flex-col items-center justify-between bg-[#000000] p-8 rounded-[24px] shadow-2xl w-full border border-gray-800 h-full">
      <span className="text-white font-extrabold text-[16px] tracking-[0.15em] uppercase sans-serif block mb-4 text-center">
         {label}
      </span>
      
      <div className="w-full flex-grow flex items-center justify-center">
          <svg viewBox="0 0 200 120" className="w-full max-w-[250px] h-auto drop-shadow-md overflow-visible">
            <circle cx="100" cy="100" r={radius} fill="none" stroke="#00FF00" strokeWidth="16" strokeDasharray={`${segmentLength} 1000`} transform="rotate(180, 100, 100)" />
            <circle cx="100" cy="100" r={radius} fill="none" stroke="#FFFF00" strokeWidth="16" strokeDasharray={`${segmentLength} 1000`} transform="rotate(225, 100, 100)" />
            <circle cx="100" cy="100" r={radius} fill="none" stroke="#FFA500" strokeWidth="16" strokeDasharray={`${segmentLength} 1000`} transform="rotate(270, 100, 100)" />
            <circle cx="100" cy="100" r={radius} fill="none" stroke="#FF0000" strokeWidth="16" strokeDasharray={`${segmentLength} 1000`} transform="rotate(315, 100, 100)" />
            <text x="15" y="115" fill="#FFFFFF" fontSize="10" fontWeight="bold" fontFamily="sans-serif">← LOW</text>
            <text x="185" y="115" fill="#FFFFFF" fontSize="10" fontWeight="bold" fontFamily="sans-serif" textAnchor="end">HIGH →</text>
            <g transform={`rotate(${angle}, 100, 100)`}>
              <line x1="100" y1="100" x2="25" y2="100" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
            </g>
            <circle cx="100" cy="100" r="4" fill="#FFFFFF" />
          </svg>
      </div>
      
      <div className="mt-4 text-center">
        <span className="text-gray-400 font-mono text-[12px] uppercase tracking-widest">
          Risk Index: {Math.round(clampedScore)}/100
        </span>
      </div>
    </div>
  );
}

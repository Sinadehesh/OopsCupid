import React from 'react';

interface ResultGaugeProps {
  score: number;
  label: string;
  subLabel?: string;
  size?: 'normal' | 'small';
  reverseColors?: boolean;
}

export default function ResultGauge({ score, label, subLabel, size = 'normal', reverseColors = false }: ResultGaugeProps) {
  const clampedScore = Math.min(100, Math.max(0, score));
  const angle = clampedScore * 1.8; 
  const radius = 80;
  const circumference = Math.PI * radius; 
  const segmentLength = circumference / 4; 

  const padding = size === 'small' ? 'p-4' : 'p-8';
  const labelSize = size === 'small' ? 'text-[12px]' : 'text-[16px]';
  const subLabelSize = size === 'small' ? 'text-[10px]' : 'text-[12px]';

  // If reverseColors is true (like for the Secure dial), Green is on the right!
  const c1 = reverseColors ? "#FF0000" : "#00FF00";
  const c2 = reverseColors ? "#FFA500" : "#FFFF00";
  const c3 = reverseColors ? "#FFFF00" : "#FFA500";
  const c4 = reverseColors ? "#00FF00" : "#FF0000";

  return (
    <div className={`flex flex-col items-center justify-between bg-[#000000] ${padding} rounded-[24px] shadow-2xl w-full border border-gray-800 h-full`}>
      <span className={`text-white font-extrabold ${labelSize} tracking-[0.1em] uppercase sans-serif block mb-4 text-center leading-tight min-h-[36px] flex items-center justify-center`}>
         {label}
      </span>
      
      <div className="w-full flex-grow flex items-center justify-center">
          <svg viewBox="0 0 200 120" className="w-full max-w-[250px] h-auto drop-shadow-md overflow-visible">
            <circle cx="100" cy="100" r={radius} fill="none" stroke={c1} strokeWidth="16" strokeDasharray={`${segmentLength} 1000`} transform="rotate(180, 100, 100)" />
            <circle cx="100" cy="100" r={radius} fill="none" stroke={c2} strokeWidth="16" strokeDasharray={`${segmentLength} 1000`} transform="rotate(225, 100, 100)" />
            <circle cx="100" cy="100" r={radius} fill="none" stroke={c3} strokeWidth="16" strokeDasharray={`${segmentLength} 1000`} transform="rotate(270, 100, 100)" />
            <circle cx="100" cy="100" r={radius} fill="none" stroke={c4} strokeWidth="16" strokeDasharray={`${segmentLength} 1000`} transform="rotate(315, 100, 100)" />
            
            {size !== 'small' && (
              <>
                <text x="15" y="115" fill="#FFFFFF" fontSize="10" fontWeight="bold" fontFamily="sans-serif">← LOW</text>
                <text x="185" y="115" fill="#FFFFFF" fontSize="10" fontWeight="bold" fontFamily="sans-serif" textAnchor="end">HIGH →</text>
              </>
            )}

            <g transform={`rotate(${angle}, 100, 100)`}>
              <line x1="100" y1="100" x2="25" y2="100" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
            </g>
            <circle cx="100" cy="100" r="4" fill="#FFFFFF" />
          </svg>
      </div>
      
      <div className="mt-4 text-center">
        <span className={`text-gray-400 font-mono ${subLabelSize} uppercase tracking-widest`}>
          {subLabel ? subLabel : `Risk Index: ${Math.round(clampedScore)}/100`}
        </span>
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";

interface CircularScoreProps {
  title: string;
  value: number;
  max?: number;
  subtitle?: string;
  color?: string;
  isDarkTheme?: boolean;
}

export default function CircularScore({ 
  title, 
  value, 
  max = 100, 
  subtitle, 
  color = "#00A6ED",
  isDarkTheme = false
}: CircularScoreProps) {
  const [progress, setProgress] = useState(0);
  
  // Smoothly animate the circle filling up on load
  useEffect(() => {
    const timer = setTimeout(() => setProgress(value), 300);
    return () => clearTimeout(timer);
  }, [value]);

  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / max) * circumference;

  const tTitle = isDarkTheme ? "text-slate-100" : "text-[#0D2C54]";
  const tSub = isDarkTheme ? "text-slate-400" : "text-[#0D2C54]/60";
  const bgStroke = isDarkTheme ? "#1e293b" : "#f1f5f9";

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <h4 className={`text-base md:text-lg font-extrabold mb-4 tracking-wide text-center ${tTitle}`}>
        {title}
      </h4>
      
      <div className="relative flex items-center justify-center w-36 h-36 md:w-40 md:h-40">
        {/* Background Track */}
        <svg className="absolute inset-0 w-full h-full transform -rotate-90 drop-shadow-sm" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r={radius} stroke={bgStroke} strokeWidth="8" fill="transparent" />
          {/* Animated Progress Ring */}
          <circle
            cx="50" cy="50" r={radius}
            stroke={color}
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>

        {/* Center Text */}
        <div className="absolute flex flex-col items-center justify-center text-center mt-1">
          <span className="text-3xl md:text-4xl font-black" style={{ color }}>
            {value}
          </span>
          {subtitle && (
            <span className={`text-[9px] md:text-[10px] font-extrabold uppercase tracking-widest mt-1 ${tSub}`}>
              {subtitle}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

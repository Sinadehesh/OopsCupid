import React from 'react';

export default function RelativeStatus({ healthScore, subject }: { healthScore: number, subject: string }) {
  const isTop = healthScore >= 50;
  const percent = isTop ? 100 - healthScore : healthScore;
  const finalPercent = Math.max(1, percent);
  
  const rankText = isTop ? `TOP ${finalPercent}%` : `BOTTOM ${finalPercent}%`;
  const color = healthScore >= 70 ? '#00FF00' : healthScore >= 40 ? '#FFFF00' : '#FF0000';

  return (
    <div className="flex flex-col items-center justify-between bg-[#000000] p-8 rounded-[24px] shadow-2xl w-full border border-gray-800 h-full">
       <span className="text-white font-extrabold text-[16px] tracking-[0.15em] uppercase sans-serif block mb-4 text-center">
         POPULATION RANK
       </span>

       <div className="w-full flex-grow flex flex-col justify-center py-6">
         <div className="w-full relative">
           
           <div className="w-full h-4 bg-gray-800 rounded-full overflow-hidden flex shadow-inner">
             <div className="h-full bg-[#FF0000]/40 flex-1"></div>
             <div className="h-full bg-[#FFA500]/40 flex-1"></div>
             <div className="h-full bg-[#FFFF00]/40 flex-1"></div>
             <div className="h-full bg-[#00FF00]/40 flex-1"></div>
           </div>

           <div 
             className="absolute top-[-4px] bottom-[-4px] w-[3px] bg-white shadow-[0_0_10px_#fff] transition-all duration-1000 ease-out z-10 rounded-full"
             style={{ left: `calc(${healthScore}% - 1.5px)` }}
           >
              <div className="absolute top-[-10px] left-[50%] -translate-x-1/2 w-0 h-0 border-l-[5px] border-r-[5px] border-t-[6px] border-l-transparent border-r-transparent border-t-white"></div>
              <div className="absolute bottom-[-10px] left-[50%] -translate-x-1/2 w-0 h-0 border-l-[5px] border-r-[5px] border-b-[6px] border-l-transparent border-r-transparent border-b-white"></div>
           </div>
         </div>
         <div className="flex justify-between w-full mt-3 px-1 text-[10px] font-bold text-gray-500 tracking-wider">
           <span>TOXIC</span>
           <span>SECURE</span>
         </div>
       </div>

       <div className="mt-2 text-center">
         <span className="text-gray-400 font-mono text-[12px] uppercase tracking-widest block mb-1">
           {subject} Scored In The:
         </span>
         <span className="text-[32px] font-extrabold tracking-wider leading-none" style={{ color: color }}>
           {rankText}
         </span>
       </div>
    </div>
  );
}

import React from "react";
import { Lock } from "lucide-react";

interface LockedInsightCardProps {
  title: string;
  teaser: string;
}

export default function LockedInsightCard({ title, teaser }: LockedInsightCardProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm mb-4 group">
      {/* Background Fake Blurred Text Pattern */}
      <div className="absolute inset-0 p-6 opacity-30 select-none pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="w-3/4 h-3 bg-gray-300 rounded mb-3 blur-[2px]"></div>
        <div className="w-full h-3 bg-gray-300 rounded mb-3 blur-[2px]"></div>
        <div className="w-5/6 h-3 bg-gray-300 rounded mb-3 blur-[2px]"></div>
        <div className="w-full h-3 bg-gray-300 rounded mb-3 blur-[2px]"></div>
        <div className="w-2/3 h-3 bg-gray-300 rounded mb-3 blur-[2px]"></div>
      </div>

      {/* Gradient Overlay to obscure text */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/80 to-white z-10"></div>

      {/* Actual Content & CTA */}
      <div className="relative z-20 flex flex-col items-center text-center p-8">
        <div className="bg-[#ffbc42]/20 p-3 rounded-full mb-4 shadow-sm group-hover:scale-110 transition-transform duration-300">
          <Lock className="w-6 h-6 text-[#b08800]" />
        </div>
        <h4 className="text-xl font-bold text-[#334B63] mb-2">{title}</h4>
        <p className="text-[#5E6E79] font-medium mb-6 max-w-md mx-auto leading-relaxed">
          {teaser}
        </p>
        <button className="bg-[#ffbc42] text-black font-bold py-3 px-8 rounded-full shadow-[0_4px_14px_rgba(255,188,66,0.4)] hover:bg-[#e5a93c] transition-all transform hover:-translate-y-0.5 active:translate-y-0">
          Unlock full results
        </button>
      </div>
    </div>
  );
}

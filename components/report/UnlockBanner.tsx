import React from "react";
import { Sparkles } from "lucide-react";

export default function UnlockBanner() {
  return (
    <div className="bg-gradient-to-r from-[#006ba6] to-[#0496ff] rounded-2xl p-8 md:p-10 text-white text-center shadow-xl mt-12 mb-8 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white opacity-10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-32 h-32 bg-[#006ba6] opacity-50 rounded-full blur-2xl pointer-events-none"></div>

      <div className="relative z-10">
        <Sparkles className="w-10 h-10 mx-auto mb-4 text-[#ffbc42]" />
        <h3 className="text-2xl md:text-3xl font-extrabold mb-4 leading-tight">
          Get Your Complete Psychological Blueprint
        </h3>
        <p className="text-lg font-medium text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
          You've seen your surface patterns. Now uncover the root causes. Unlock 15+ pages of deep clinical insights, exact compatibility mapping, and personalized healing strategies designed just for your unique neurobiology.
        </p>
        <button className="bg-[#ffbc42] text-black text-[17px] font-extrabold py-4 px-12 rounded-xl shadow-[0_8px_20px_rgba(255,188,66,0.3)] hover:bg-[#e5a93c] hover:shadow-[0_12px_25px_rgba(255,188,66,0.4)] transition-all transform hover:-translate-y-1 active:translate-y-0">
          Unlock My Premium Report
        </button>
      </div>
    </div>
  );
}

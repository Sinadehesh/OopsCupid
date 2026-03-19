import React from "react";
import Link from "next/link";
import { Sparkles, ShieldCheck, Clock, FileText, MessageSquare, Map } from "lucide-react";

interface UnlockBannerProps {
  primaryStyle?: string;
}

export default function UnlockBanner({ primaryStyle = "Anxious Preoccupied" }: UnlockBannerProps) {
  return (
    <div className="bg-gradient-to-br from-[#0f172a] to-[#1e293b] rounded-[32px] p-8 md:p-12 text-white shadow-2xl mt-12 mb-8 relative overflow-hidden border border-slate-700/50">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 -mt-20 -mr-20 w-64 h-64 bg-blue-500 opacity-20 rounded-full blur-[80px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-64 h-64 bg-rose-500 opacity-10 rounded-full blur-[80px] pointer-events-none"></div>

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
        
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-widest mb-6 bg-rose-500/20 text-rose-400 border border-rose-500/30 uppercase">
          <Sparkles className="w-4 h-4" />
          The Ultimate Clarity Bundle
        </div>

        <h3 className="text-3xl md:text-5xl font-extrabold mb-6 text-center leading-tight tracking-tight">
          Don't Know What To Do Next?<br/>
          <span className="text-[#ffbc42]">Get The Tactical Playbook.</span>
        </h3>
        
        <p className="text-lg md:text-xl font-medium text-slate-300 mb-10 text-center max-w-2xl leading-relaxed">
          You've seen the surface-level scores. Now let us tell you exactly how to fix it without the stress. Unlock your personalized, step-by-step extraction plan right now.
        </p>

        {/* The Hormozi Value Stack */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full mb-10">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-left backdrop-blur-sm">
            <FileText className="w-8 h-8 text-blue-400 mb-4" />
            <h4 className="text-lg font-bold text-white mb-2">1. The Harsh Truth</h4>
            <p className="text-sm text-slate-400 font-medium">We name the exact mind games and behavioral loops being used against you right now.</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-left backdrop-blur-sm">
            <Map className="w-8 h-8 text-rose-400 mb-4" />
            <h4 className="text-lg font-bold text-white mb-2">2. The Playbook</h4>
            <p className="text-sm text-slate-400 font-medium">A simple, 3-step action plan on exactly what to do next to take your power back.</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-left backdrop-blur-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-[#ffbc42] text-black text-[10px] font-bold px-2 py-1 rounded-bl-lg">HIGHEST VALUE</div>
            <MessageSquare className="w-8 h-8 text-[#ffbc42] mb-4" />
            <h4 className="text-lg font-bold text-white mb-2">3. Text Scripts</h4>
            <p className="text-sm text-slate-400 font-medium">Don't know what to say? Get copy-paste texts that are polite, lethal, and impossible to argue with.</p>
          </div>
        </div>

        {/* Updated Button and Pricing Block */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 w-full max-w-2xl bg-black/30 p-4 rounded-2xl border border-white/5 mb-8">
           <Link 
             href={`/attachment-style-quiz/premium?style=${encodeURIComponent(primaryStyle)}`}
             className="w-full md:w-auto text-center bg-[#ffbc42] text-black text-xl font-extrabold py-5 px-10 rounded-xl shadow-[0_0_30px_rgba(255,188,66,0.3)] hover:bg-[#e5a93c] hover:scale-105 transition-all"
           >
             Unlock Everything Now
           </Link>
           <div className="text-center md:text-left">
             <div className="text-white text-3xl font-extrabold">$19.99</div>
             <div className="text-slate-400 text-sm font-bold uppercase tracking-widest mt-1">One-Time Payment</div>
           </div>
        </div>

        {/* Risk Reversal & Urgency */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-slate-400 font-medium">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-green-400" />
            <span><strong>7-Day Guarantee:</strong> 100% money back if it's not accurate.</span>
          </div>
          <div className="hidden sm:block w-1 h-1 bg-slate-600 rounded-full"></div>
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-rose-400" />
            <span><strong>Privacy:</strong> Data permanently deleted in 24 hrs.</span>
          </div>
        </div>

      </div>
    </div>
  );
}

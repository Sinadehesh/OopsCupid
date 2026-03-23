import React from "react";
import { Bomb, ShieldAlert, Activity, HeartCrack } from "lucide-react";
import Link from "next/link";

export default function SabotageReport({ result }: { result: any }) {
  return (
    <div className="max-w-4xl mx-auto w-full animate-in fade-in slide-in-from-bottom-8 duration-700">
      
      {/* Hero Result Card */}
      <div className="bg-[#0F172A] text-white rounded-[32px] p-8 md:p-12 mb-8 text-center shadow-2xl relative overflow-hidden border border-[#334155]">
         <div className="absolute top-0 right-0 w-64 h-64 bg-[#E11D48]/10 rounded-full blur-3xl -z-0"></div>
         <div className="relative z-10">
           <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-widest mb-6 bg-white/10 backdrop-blur-sm border border-white/20 uppercase text-rose-200">
             <Bomb className="w-4 h-4" /> Level {result.level}: {result.levelData.title}
           </div>
           <h2 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">Your Archetype: <span className="text-rose-400">{result.archetype}</span></h2>
           <p className="text-xl md:text-2xl text-slate-300 font-medium mb-8">"{result.levelData.subtitle}"</p>
           <p className="text-lg text-slate-200 max-w-2xl mx-auto leading-relaxed bg-white/5 p-6 rounded-2xl border border-white/10">
             {result.levelData.advice}
           </p>
         </div>
      </div>

      {/* Split Bars: Anxious vs Avoidant Composites */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-extrabold text-xl text-slate-800 flex items-center gap-2"><Activity className="text-rose-500" /> Anxious Pattern</h4>
            <span className="text-sm font-bold text-rose-600 bg-rose-50 px-3 py-1 rounded-full">{result.composites.anxiousPattern} / 80</span>
          </div>
          <p className="text-slate-500 text-sm mb-4">Driven by hypervigilance, testing, and fear of abandonment.</p>
          <div className="w-full bg-slate-100 rounded-full h-4 overflow-hidden">
             <div className="bg-rose-500 h-full rounded-full transition-all duration-1000" style={{ width: `${(result.composites.anxiousPattern/80)*100}%` }}></div>
          </div>
        </div>
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-extrabold text-xl text-slate-800 flex items-center gap-2"><ShieldAlert className="text-slate-500" /> Avoidant Pattern</h4>
            <span className="text-sm font-bold text-slate-600 bg-slate-100 px-3 py-1 rounded-full">{result.composites.avoidantPattern} / 80</span>
          </div>
          <p className="text-slate-500 text-sm mb-4">Driven by distancing, emotional shutdown, and fear of engulfment.</p>
          <div className="w-full bg-slate-100 rounded-full h-4 overflow-hidden">
             <div className="bg-slate-500 h-full rounded-full transition-all duration-1000" style={{ width: `${(result.composites.avoidantPattern/80)*100}%` }}></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Subscales Bar Chart */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
          <h4 className="font-extrabold text-2xl text-slate-800 mb-6">Your Behavioral Drivers</h4>
          <div className="space-y-5">
            {result.subscales.map((s: any) => (
              <div key={s.key}>
                 <div className="flex justify-between text-sm mb-2">
                   <span className="font-bold text-slate-700">{s.label}</span>
                   <span className="text-slate-500 font-medium">{Math.round(s.pct)}%</span>
                 </div>
                 <div className="w-full bg-slate-100 rounded-full h-3">
                   <div className="bg-rose-500 h-full rounded-full transition-all duration-1000 delay-300" style={{ width: `${s.pct}%` }}></div>
                 </div>
              </div>
            ))}
          </div>
        </div>

        {/* Core vs Defense Stack */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col justify-center">
          <h4 className="font-extrabold text-xl text-slate-800 mb-6">Internal vs External</h4>
          
          <div className="mb-6">
             <div className="flex justify-between text-sm mb-2">
                <span className="font-bold text-slate-600">Vulnerability (Internal)</span>
                <span className="text-slate-500">{Math.round((result.composites.vulnerabilityScore/80)*100)}%</span>
             </div>
             <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                <div className="bg-pink-400 h-full rounded-full" style={{ width: `${(result.composites.vulnerabilityScore/80)*100}%` }}></div>
             </div>
             <p className="text-xs text-slate-400 mt-2">Your sensitivity to rejection and unworthiness.</p>
          </div>

          <div>
             <div className="flex justify-between text-sm mb-2">
                <span className="font-bold text-slate-600">Defense (External Actions)</span>
                <span className="text-slate-500">{Math.round((result.composites.defenseScore/120)*100)}%</span>
             </div>
             <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                <div className="bg-slate-700 h-full rounded-full" style={{ width: `${(result.composites.defenseScore/120)*100}%` }}></div>
             </div>
             <p className="text-xs text-slate-400 mt-2">How much you act out, test, or withdraw.</p>
          </div>
        </div>
      </div>

      <div className="bg-rose-50 rounded-3xl p-8 border border-rose-100 shadow-sm text-center mb-8">
        <HeartCrack className="w-10 h-10 text-rose-500 mx-auto mb-4" />
        <h4 className="font-bold text-slate-800 mb-4 text-xl">The Bottom Line</h4>
        <p className="text-slate-600 text-lg leading-relaxed">
          The strongest signal in your results is not that you simply "don't care." Your primary triggers are <strong>{result.topDrivers?.[0]?.label?.toLowerCase() || "fear"}</strong> and <strong>{result.topDrivers?.[1]?.label?.toLowerCase() || "abandonment"}</strong>. You sabotage when closeness or uncertainty starts to feel fundamentally unsafe.
        </p>
      </div>

      {/* --- BEGIN SECOND-STAGE UPSELL FUNNEL --- */}
      <div className="mt-16 pt-16 border-t-2 border-slate-200/60 max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h3 className="text-3xl font-extrabold text-slate-900 mb-4 tracking-tight">Stop Reading. Start Rewiring.</h3>
          <p className="text-slate-600 text-lg">Insight without action is just entertainment. Your nervous system took years to wire this defense mechanism. Here is how we dismantle it.</p>
        </div>

        {/* The Bundle (Primary CTA) */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 md:p-10 mb-8 shadow-2xl relative overflow-hidden text-center border border-slate-700">
          <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2"></div>
          <div className="relative z-10">
            <span className="inline-block px-3 py-1 bg-rose-500/20 text-rose-300 font-bold text-xs uppercase tracking-widest rounded-full mb-4 border border-rose-500/30">
              Highly Recommended
            </span>
            <h4 className="text-3xl font-black text-white mb-3">The Complete Nervous System Rewire Bundle</h4>
            <p className="text-slate-300 mb-8 max-w-xl mx-auto">Get both the clinical Playbook and the 60-Day Shadow Work Journal. Learn the theory, then do the daily exercises to physically rewrite your automatic responses.</p>
            <div className="flex items-center justify-center gap-4 mb-8">
              <span className="text-slate-400 line-through font-bold text-lg">$46</span>
              <span className="text-4xl font-black text-rose-400">$37</span>
            </div>
            <button className="w-full md:w-auto px-10 py-4 bg-rose-600 hover:bg-rose-500 text-white font-black text-lg rounded-xl transition-all shadow-lg shadow-rose-600/30 active:scale-95">
              Unlock the Complete Bundle
            </button>
          </div>
        </div>

        {/* Individual Books */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-white rounded-3xl p-8 border border-slate-200 hover:border-slate-300 transition-colors shadow-sm flex flex-col justify-between">
            <div>
              <h5 className="font-extrabold text-xl text-slate-900 mb-2">The Secure Attachment Playbook</h5>
              <p className="text-sm text-slate-500 mb-6">120 pages of clinical frameworks and nervous system regulation techniques. Learn how to fix your pattern.</p>
            </div>
            <button className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl transition-colors">
              Download Playbook ($27)
            </button>
          </div>
          <div className="bg-white rounded-3xl p-8 border border-slate-200 hover:border-slate-300 transition-colors shadow-sm flex flex-col justify-between">
            <div>
              <h5 className="font-extrabold text-xl text-slate-900 mb-2">Shadow Work Integration Journal</h5>
              <p className="text-sm text-slate-500 mb-6">60 days of guided prompts to confront core wounds and map your bodily triggers.</p>
            </div>
            <button className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl transition-colors">
              Get the Workbook ($19)
            </button>
          </div>
        </div>

        {/* 1:1 Session (Tertiary) */}
        <div className="bg-[#FAF9F6] border border-[#E5E5E0] rounded-2xl p-6 text-center shadow-sm">
          <h6 className="font-bold text-slate-800 mb-2">Need private help?</h6>
          <p className="text-sm text-slate-500 mb-4 max-w-md mx-auto">Book a private, 45-minute clinical audit with an attachment specialist to review your data profile together.</p>
          <button className="text-rose-600 font-bold text-sm hover:underline underline-offset-4">
            Inquire About Private Availability →
          </button>
        </div>
      </div>
      {/* --- END SECOND-STAGE UPSELL FUNNEL --- */}

    </div>
  );
}

import React from "react";
import { CloudFog, ShieldAlert, Activity, BrainCircuit, Info, Lock, FileText, MessageSquare } from "lucide-react";

export default function GaslightingReport({ result }: { result: any }) {
  return (
    <div className="max-w-4xl mx-auto w-full animate-in fade-in slide-in-from-bottom-8 duration-700">
      
      {/* Hero Result Card (The Dream Outcome / Reality Check) */}
      <div className="bg-[#312E81] text-white rounded-[32px] p-8 md:p-12 mb-8 text-center shadow-2xl relative overflow-hidden border border-[#4F46E5]/30">
         <div className="absolute top-0 right-0 w-64 h-64 bg-[#4F46E5]/20 rounded-full blur-3xl -z-0"></div>
         <div className="relative z-10">
           <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-extrabold tracking-widest mb-6 bg-rose-500/20 backdrop-blur-sm border border-rose-500/30 uppercase text-rose-300">
             <CloudFog className="w-4 h-4" /> Instant Reality Check: Level {result.level}
           </div>
           
           <h2 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">Stop Doubting Yourself.</h2>
           <h3 className="text-2xl md:text-3xl font-bold text-indigo-300 mb-6">{result.levelData.title}</h3>
           
           <p className="text-xl md:text-2xl italic text-indigo-200 font-medium mb-8 leading-snug">
             "{result.levelData.subtitle.split('|')[1]?.trim() || result.levelData.subtitle}"
           </p>
           
           <div className="text-lg text-indigo-100 max-w-2xl mx-auto leading-relaxed bg-white/5 p-6 rounded-2xl border border-white/10 text-left">
             <p className="font-extrabold text-white mb-2 uppercase tracking-wide text-sm">The Brutal Truth:</p>
             {result.levelData.advice}
           </div>
         </div>
      </div>

      {/* Split Bars: Tactics vs Impact (Translated to low-effort terms) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-extrabold text-xl text-slate-800 flex items-center gap-2"><BrainCircuit className="text-indigo-600" /> The Mind Games</h4>
            <span className="text-sm font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">{result.tacticsScore} / 160</span>
          </div>
          <p className="text-slate-500 text-sm mb-6 flex-grow">This measures how often he denies facts, invalidates your feelings, and twists the story so it is always your fault.</p>
          <div className="w-full bg-slate-100 rounded-full h-4 overflow-hidden mt-auto">
             <div className="bg-indigo-600 h-full rounded-full transition-all duration-1000" style={{ width: `${(result.tacticsScore/160)*100}%` }}></div>
          </div>
        </div>
        
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-extrabold text-xl text-slate-800 flex items-center gap-2"><Activity className="text-violet-600" /> The Mental Erosion</h4>
            <span className="text-sm font-bold text-violet-600 bg-violet-50 px-3 py-1 rounded-full">{result.impactScore} / 40</span>
          </div>
          <p className="text-slate-500 text-sm mb-6 flex-grow">This measures the damage done to your confidence. A high score means you are constantly walking on eggshells and feeling like you are losing your mind.</p>
          <div className="w-full bg-slate-100 rounded-full h-4 overflow-hidden mt-auto">
             <div className="bg-violet-600 h-full rounded-full transition-all duration-1000" style={{ width: `${(result.impactScore/40)*100}%` }}></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Subscales Bar Chart */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
          <h4 className="font-extrabold text-2xl text-slate-800 mb-2">Specific Manipulation Tactics</h4>
          <p className="text-slate-500 text-sm mb-8">These are the exact methods he is using to control the narrative right now.</p>
          
          <div className="space-y-6">
            {result.subscales.map((s: any) => (
              <div key={s.key}>
                 <div className="flex justify-between text-sm mb-2">
                   <span className="font-bold text-slate-700">{s.label}</span>
                   <span className="text-slate-500 font-extrabold">{Math.round(s.pct)}% Risk</span>
                 </div>
                 <div className="w-full bg-slate-100 rounded-full h-3">
                   <div className="bg-indigo-500 h-full rounded-full transition-all duration-1000 delay-300" style={{ width: `${s.pct}%` }}></div>
                 </div>
              </div>
            ))}
          </div>
        </div>

        {/* Critical Flags Gauge */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 bg-rose-100 rounded-2xl flex items-center justify-center mb-6 text-rose-600 shadow-inner">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <h4 className="font-extrabold text-xl text-slate-800 mb-2">Danger Zone Markers</h4>
          <p className="text-slate-500 text-sm mb-6">If these blocks are red, it means he is exhibiting severe reality-denial.</p>
          
          <div className="flex flex-wrap justify-center gap-1.5 mb-6">
             {[...Array(10)].map((_, i) => (
               <div key={i} className={`w-5 h-12 rounded-[4px] ${i < result.criticalFlags ? 'bg-rose-500 shadow-sm' : 'bg-slate-100'}`}></div>
             ))}
          </div>
          <p className="text-sm font-extrabold text-rose-600 bg-rose-50 px-4 py-2 rounded-full">{result.criticalFlags} out of 10 red flags detected</p>
        </div>
      </div>

      {/* Top Drivers Chips */}
      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm text-center mb-12">
        <h4 className="font-bold text-slate-800 mb-4">Your Top 3 Behavioral Blind Spots</h4>
        <div className="flex flex-wrap justify-center gap-3">
           {result.topDrivers.map((driver: any, i: number) => (
             <div key={i} className="px-5 py-2 bg-indigo-50 text-indigo-700 border border-indigo-100 rounded-full font-bold text-sm">
               {i + 1}. {driver.label}
             </div>
           ))}
        </div>
        <div className="bg-slate-50 p-4 rounded-xl mt-6 border border-slate-100">
           <p className="text-slate-600 text-sm font-medium">The data is clear. What you are experiencing is not normal relationship conflict. It is <strong>{result.topDrivers[0].label}</strong>.</p>
        </div>
      </div>

      {/* HORMOZI GRAND SLAM OFFER UPSELL */}
      <div className="bg-[#0f172a] rounded-[32px] p-8 md:p-12 text-white shadow-2xl relative overflow-hidden border border-rose-500/30">
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-64 h-64 bg-rose-500 opacity-20 rounded-full blur-[80px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-64 h-64 bg-indigo-500 opacity-10 rounded-full blur-[80px] pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-widest mb-6 bg-white/10 text-white border border-white/20 uppercase">
            <Lock className="w-4 h-4" /> Premium Action Plan
          </div>

          <h3 className="text-3xl md:text-5xl font-extrabold mb-6 text-center leading-tight tracking-tight">
            Stop Feeling Crazy.<br/>
            <span className="text-[#ffbc42]">Get The Reality-Defense Playbook.</span>
          </h3>
          
          <p className="text-lg md:text-xl font-medium text-slate-300 mb-10 text-center leading-relaxed">
            You know the truth now. The next step is protecting yourself. Do not try to argue with him using logic—it will not work. Unlock the exact, step-by-step extraction plan right now.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mb-10">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-left backdrop-blur-sm">
              <FileText className="w-8 h-8 text-rose-400 mb-4" />
              <h4 className="text-lg font-bold text-white mb-2">The Defense Strategy</h4>
              <p className="text-sm text-slate-400 font-medium">A tactical, step-by-step guide on how to stop the mental erosion and safely anchor yourself in reality.</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-left backdrop-blur-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-[#ffbc42] text-black text-[10px] font-bold px-2 py-1 rounded-bl-lg">HIGHEST VALUE</div>
              <MessageSquare className="w-8 h-8 text-[#ffbc42] mb-4" />
              <h4 className="text-lg font-bold text-white mb-2">"Shut It Down" Texts</h4>
              <p className="text-sm text-slate-400 font-medium">Get polite, lethal, copy-paste text scripts that shut down his gaslighting instantly. Impossible to argue with.</p>
            </div>
          </div>

          <button className="w-full md:w-auto bg-[#ffbc42] text-black text-xl font-extrabold py-5 px-12 rounded-xl shadow-[0_0_30px_rgba(255,188,66,0.3)] hover:bg-[#e5a93c] hover:scale-105 transition-all">
            Unlock My Playbook & Scripts
          </button>
          
          <p className="text-slate-400 text-sm mt-6 font-medium">
            Backed by our 7-Day "Mind-Reader" Money-Back Guarantee.
          </p>
        </div>
      </div>

    </div>
  );
}

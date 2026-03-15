import React from "react";
import { CloudFog, ShieldAlert, Activity, BrainCircuit } from "lucide-react";

export default function GaslightingReport({ result }: { result: any }) {
  return (
    <div className="max-w-4xl mx-auto w-full animate-in fade-in slide-in-from-bottom-8 duration-700">
      
      {/* Hero Result Card */}
      <div className="bg-[#312E81] text-white rounded-[32px] p-8 md:p-12 mb-8 text-center shadow-2xl relative overflow-hidden border border-[#4F46E5]/30">
         <div className="absolute top-0 right-0 w-64 h-64 bg-[#4F46E5]/20 rounded-full blur-3xl -z-0"></div>
         <div className="relative z-10">
           <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-widest mb-6 bg-white/10 backdrop-blur-sm border border-white/20 uppercase text-indigo-200">
             <CloudFog className="w-4 h-4" /> Severity Level {result.level}
           </div>
           <h2 className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight">{result.levelData.title}</h2>
           <p className="text-xl md:text-2xl italic text-indigo-200 font-medium mb-8">"{result.levelData.subtitle.split('|')[1]?.trim() || result.levelData.subtitle}"</p>
           <p className="text-lg text-indigo-100 max-w-2xl mx-auto leading-relaxed bg-white/5 p-6 rounded-2xl border border-white/10">
             {result.levelData.advice}
           </p>
         </div>
      </div>

      {/* Split Bars: Tactics vs Impact */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-extrabold text-xl text-slate-800 flex items-center gap-2"><BrainCircuit className="text-indigo-600" /> His Tactics</h4>
            <span className="text-sm font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">{result.tacticsScore} / 160</span>
          </div>
          <p className="text-slate-500 text-sm mb-4">Measures his frequency of denial, invalidation, and blocking.</p>
          <div className="w-full bg-slate-100 rounded-full h-4 overflow-hidden">
             <div className="bg-indigo-600 h-full rounded-full transition-all duration-1000" style={{ width: `${(result.tacticsScore/160)*100}%` }}></div>
          </div>
        </div>
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-extrabold text-xl text-slate-800 flex items-center gap-2"><Activity className="text-violet-600" /> Your Impact</h4>
            <span className="text-sm font-bold text-violet-600 bg-violet-50 px-3 py-1 rounded-full">{result.impactScore} / 40</span>
          </div>
          <p className="text-slate-500 text-sm mb-4">Measures the internal erosion of your confidence and clarity.</p>
          <div className="w-full bg-slate-100 rounded-full h-4 overflow-hidden">
             <div className="bg-violet-600 h-full rounded-full transition-all duration-1000" style={{ width: `${(result.impactScore/40)*100}%` }}></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Subscales Bar Chart */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
          <h4 className="font-extrabold text-2xl text-slate-800 mb-6">Pattern Profile</h4>
          <div className="space-y-5">
            {result.subscales.map((s: any) => (
              <div key={s.key}>
                 <div className="flex justify-between text-sm mb-2">
                   <span className="font-bold text-slate-700">{s.label}</span>
                   <span className="text-slate-500 font-medium">{Math.round(s.pct)}%</span>
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
          <div className="w-16 h-16 bg-rose-100 rounded-2xl flex items-center justify-center mb-6 text-rose-600">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <h4 className="font-extrabold text-xl text-slate-800 mb-2">Critical Flags</h4>
          <p className="text-slate-500 text-sm mb-6">Specific markers for severe narrative control and reality denial.</p>
          
          <div className="flex flex-wrap justify-center gap-1.5 mb-6">
             {[...Array(10)].map((_, i) => (
               <div key={i} className={`w-5 h-12 rounded-[4px] ${i < result.criticalFlags ? 'bg-rose-500 shadow-sm' : 'bg-slate-100'}`}></div>
             ))}
          </div>
          <p className="text-sm font-bold text-rose-600">{result.criticalFlags} out of 10 detected</p>
        </div>
      </div>

      {/* Top Drivers Chips */}
      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm text-center mb-8">
        <h4 className="font-bold text-slate-800 mb-4">Your Top 3 Dominant Patterns</h4>
        <div className="flex flex-wrap justify-center gap-3">
           {result.topDrivers.map((driver: any, i: number) => (
             <div key={i} className="px-5 py-2 bg-indigo-50 text-indigo-700 border border-indigo-100 rounded-full font-bold text-sm">
               {i + 1}. {driver.label}
             </div>
           ))}
        </div>
        <p className="text-slate-500 text-sm mt-6 italic">The strongest signal in your results is not normal conflict. It is <strong>{result.topDrivers[0].label}</strong>.</p>
      </div>

    </div>
  );
}

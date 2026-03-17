"use client";
import React, { useState, useEffect } from "react";
import { Download, Share2, ShieldAlert, MessageSquare, Target, Loader2 } from "lucide-react";

export default function PremiumReport({ data, handleShare }: { data: any, handleShare: any }) {
  const [aiReport, setAiReport] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    async function fetchAiReport() {
      try {
        const res = await fetch('/api/friend-bad-report', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ data })
        });
        const aiData = await res.json();
        setAiReport(aiData);
      } catch (err) {
        console.error("Failed to fetch AI report:", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchAiReport();
  }, [data]);

  const getBarColor = (percentage: number) => {
    if (percentage >= 80) return "bg-[#e11d48]"; // High risk
    if (percentage >= 60) return "bg-[#f59e0b]"; // Active problem
    if (percentage >= 40) return "bg-[#086788]"; // Mild concern
    return "bg-slate-300"; // Healthy
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-6 animate-in fade-in duration-700">
      
      <div className="flex justify-end gap-3 mb-6 print:hidden">
        <button onClick={handleShare} className="flex items-center gap-2 bg-slate-100 text-slate-700 px-4 py-2 rounded-lg font-bold text-sm hover:bg-slate-200 transition-colors">
          <Share2 className="w-4 h-4" /> Share
        </button>
        <button onClick={() => window.print()} className="flex items-center gap-2 bg-slate-100 text-slate-700 px-4 py-2 rounded-lg font-bold text-sm hover:bg-slate-200 transition-colors">
          <Download className="w-4 h-4" /> Save PDF
        </button>
      </div>

      <div className="bg-slate-900 text-white rounded-[32px] p-10 md:p-14 mb-8 shadow-2xl text-center border-t-4 border-[#10b981]">
        <h2 className="text-3xl md:text-5xl font-extrabold mb-6 tracking-tight">The Brutal Truth.</h2>
        <div className="bg-white/10 p-6 rounded-2xl border border-white/20 backdrop-blur-sm">
          <p className="text-xl md:text-2xl font-bold leading-relaxed text-[#10b981]">
            "{data.customHeadline}"
          </p>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm mb-8">
        <h3 className="font-extrabold text-2xl text-slate-800 mb-2">Your 10-Point Friendship Audit</h3>
        <p className="text-slate-500 font-medium mb-8">This shows exactly where the damage is happening. Bars over 60% indicate an active toxicity problem.</p>
        
        <div className="space-y-5">
          {data.sortedSubcategories.map((sub: any, i: number) => (
            <div key={i}>
              <div className="flex justify-between text-sm mb-1.5">
                <span className="font-bold text-slate-700">{sub.name}</span>
                <span className="text-slate-500 font-extrabold">{sub.percentage}% Risk</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-3">
                <div className={`h-full rounded-full transition-all duration-1000 ${getBarColor(sub.percentage)}`} style={{ width: `${sub.percentage}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isLoading ? (
        <div className="bg-[#0f172a] text-white rounded-3xl p-12 shadow-lg flex flex-col items-center justify-center text-center min-h-[300px] mb-8">
           <Loader2 className="w-12 h-12 text-[#10b981] animate-spin mb-4" />
           <h3 className="text-2xl font-extrabold mb-2">Generating Your AI Playbook...</h3>
           <p className="text-slate-400 font-medium">Our AI is analyzing your exact vector scores to write your custom reality check and boundary scripts.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-[#0f172a] text-white rounded-3xl p-8 shadow-lg flex flex-col h-full">
            <ShieldAlert className="w-8 h-8 text-[#10b981] mb-4" />
            <h4 className="font-extrabold text-xl mb-3">How They Are Using You</h4>
            <div className="text-slate-300 font-medium leading-relaxed mb-6 whitespace-pre-wrap flex-grow">
              {aiReport?.howTheyUseYou || \`Because your highest pain point is \${data.top1}, your friends view you as a convenience.\`}
            </div>
            <div className="bg-white/5 p-4 rounded-xl border border-white/10 mt-auto">
              <p className="text-[#10b981] font-bold text-sm uppercase tracking-wider mb-1">What Keeps You Stuck</p>
              <p className="text-slate-300 text-sm font-medium leading-relaxed">
                 {aiReport?.whatKeepsYouStuck || "You suffer from extreme guilt when setting boundaries."}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col h-full">
            <MessageSquare className="w-8 h-8 text-[#f59e0b] mb-4" />
            <h4 className="font-extrabold text-xl text-slate-800 mb-3">Your Custom Boundary Scripts</h4>
            <p className="text-slate-600 font-medium mb-6">When they cross the line, do not over-explain. Copy and paste these exactly to shut it down:</p>
            
            <div className="space-y-4 mt-auto">
              <div className="bg-slate-50 p-5 rounded-xl font-mono text-[15px] text-slate-800 border-l-4 border-[#086788]">
                <span className="block text-xs text-slate-400 font-sans font-bold uppercase mb-2">Soft (Testing the waters):</span>
                "{aiReport?.softScript || "I don't have the capacity for this right now."}"
              </div>
              <div className="bg-slate-50 p-5 rounded-xl font-mono text-[15px] text-slate-800 border-l-4 border-[#f59e0b]">
                <span className="block text-xs text-slate-400 font-sans font-bold uppercase mb-2">Firm (When they push back):</span>
                "{aiReport?.firmScript || "My boundary isn't up for negotiation."}"
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-[#10b981]/10 rounded-3xl p-8 border border-[#10b981]/20 text-center">
        <Target className="w-8 h-8 text-[#10b981] mx-auto mb-4" />
        <h4 className="font-extrabold text-xl text-slate-800 mb-3">Your 14-Day Reset Plan</h4>
        <p className="text-slate-700 font-medium leading-relaxed max-w-2xl mx-auto">
          For the next 14 days, you are on an <strong>"Initiation Diet."</strong> Do not text them first. Do not make plans. Let the silence do the talking. The people who genuinely care about you will reach out just to see how you are. The ones who only needed favors will disappear. Let them.
        </p>
      </div>

    </div>
  );
}

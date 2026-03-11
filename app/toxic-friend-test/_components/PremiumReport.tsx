"use client";
import React from "react";
import { generatePremiumNarrative, extractRedFlags } from "../_lib/narrative";
import { ToxicResultRing } from "./ToxicDemoUI";

export default function PremiumReport({ data, rawAnswers }: { data: any, rawAnswers: Record<string, string> }) {
  const narrativeData = generatePremiumNarrative(data.archetype, data.tier, data.mods);
  const redFlags = extractRedFlags(rawAnswers);

  const handleDownload = () => {
    window.print();
  };

  const handleShare = async () => {
    const text = `I unlocked my Friendship Diagnostics Profile on OopsCupid. My dominant pattern is ${data.archetype}. Decode your friendships here:`;
    const url = "https://oopscupid.com/toxic-friend-test";
    
    if (navigator.share) {
      try {
        await navigator.share({ title: "My Friendship Profile", text, url });
      } catch (err) {
        console.log("Share canceled", err);
      }
    } else {
      navigator.clipboard.writeText(`${text} ${url}`);
      alert("Link and results copied to clipboard!");
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 animate-in fade-in duration-700">
      {/* Ensures colors print correctly in PDF */}
      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; background-color: white !important; }
          .print\\:hidden { display: none !important; }
          .print\\:shadow-none { box-shadow: none !important; border: 1px solid #e2e8f0 !important; }
          .print\\:break-inside-avoid { break-inside: avoid; }
        }
      `}} />

      {/* Premium Hero Block */}
      <div className="bg-[#0f172a] rounded-[24px] p-8 md:p-12 border border-slate-700 text-center shadow-2xl relative overflow-hidden print:bg-white print:text-black print:border-slate-200 print:shadow-none">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#d81159]/10 rounded-full blur-3xl pointer-events-none print:hidden"></div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-2 print:text-slate-900">Premium Profile Unlocked</h2>
        <p className="text-slate-400 text-lg mb-10 print:text-slate-600">Your comprehensive friendship diagnostics.</p>
        
        <div className="flex flex-wrap items-center justify-center gap-6">
          <ToxicResultRing score={data.mods.victimization} label="Victimization" color="#d81159" />
          <ToxicResultRing score={data.mods.aggression} label="Aggression" color="#ffbc42" />
          <ToxicResultRing score={data.mods.manipulation} label="Manipulation" color="#00A6ED" />
        </div>
      </div>

      {/* Narrative & Distortion Check */}
      <div className="bg-white rounded-[24px] shadow-sm border border-slate-200 p-8 md:p-10 space-y-8 print:shadow-none print:break-inside-avoid">
        <div>
          <h3 className="text-2xl font-extrabold text-[#0D2C54] mb-4">The Dynamic: {data.archetype}</h3>
          <p className="text-lg text-slate-700 leading-relaxed font-medium bg-slate-50 p-6 rounded-xl border border-slate-100">
            {narrativeData.narrative}
          </p>
        </div>

        <div>
          <h3 className="text-2xl font-extrabold text-[#0D2C54] mb-4 flex items-center gap-2">
            <span>🧠</span> Distortion Check: Am I Overreacting?
          </h3>
          <p className="text-lg text-slate-700 leading-relaxed font-medium bg-blue-50/50 p-6 rounded-xl border border-blue-100">
            {narrativeData.distortionCheck}
          </p>
        </div>
      </div>

      {/* Top Red Flags Extraction */}
      {redFlags.length > 0 && (
        <div className="bg-white rounded-[24px] shadow-sm border border-slate-200 p-8 md:p-10 print:shadow-none print:break-inside-avoid">
          <h3 className="text-2xl font-extrabold text-[#d81159] mb-6 border-b border-slate-100 pb-4">
            Critical Red Flags Detected
          </h3>
          <div className="space-y-4">
            {redFlags.map((flag, idx) => (
              <div key={idx} className="flex gap-4 items-start bg-rose-50/50 p-5 rounded-xl border border-rose-100 print:bg-white print:border-slate-300">
                <span className="text-xl">🚩</span>
                <div>
                  <p className="text-lg font-bold text-slate-800">{flag.q?.text}</p>
                  <p className="text-sm text-slate-500 font-medium mt-1">You answered: {flag.val}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action Plan & Scripts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 print:block print:space-y-8">
        <div className="bg-white rounded-[24px] shadow-sm border border-slate-200 p-8 print:shadow-none print:break-inside-avoid">
          <h3 className="text-xl font-extrabold text-[#0D2C54] mb-4">Immediate Actions</h3>
          <ul className="space-y-3">
            {narrativeData.actionPlan.immediate.map((action, i) => (
              <li key={i} className="flex gap-3 text-slate-700"><span className="text-[#00A6ED]">✓</span> {action}</li>
            ))}
          </ul>
        </div>
        <div className="bg-white rounded-[24px] shadow-sm border border-slate-200 p-8 print:shadow-none print:break-inside-avoid">
          <h3 className="text-xl font-extrabold text-[#0D2C54] mb-4">Copy-Paste Boundary Scripts</h3>
          <div className="space-y-4">
            {narrativeData.scripts.map((script, i) => (
              <div key={i} className="bg-slate-50 p-4 rounded-lg border border-slate-100 print:bg-white">
                <p className="text-xs font-bold text-slate-400 uppercase mb-2">{script.title}</p>
                <p className="text-slate-800 font-medium italic">"{script.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* PDF Export & Share Teaser */}
      <div className="py-6 flex flex-col sm:flex-row items-center justify-center gap-4 print:hidden">
        <button onClick={handleDownload} className="w-full sm:w-auto bg-slate-900 text-white font-bold py-4 px-8 rounded-xl hover:bg-slate-800 transition-all flex items-center justify-center gap-2 shadow-lg shadow-slate-900/20 focus:outline-none focus:ring-4 focus:ring-slate-300">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
          Save as PDF
        </button>
        <button onClick={handleShare} className="w-full sm:w-auto bg-[#00A6ED] text-white font-bold py-4 px-8 rounded-xl hover:bg-[#008fcc] transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#00A6ED]/30 focus:outline-none focus:ring-4 focus:ring-[#00A6ED]/40">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path></svg>
          Share Profile
        </button>
      </div>

    </div>
  );
}

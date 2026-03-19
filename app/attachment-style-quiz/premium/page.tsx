"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Lock, Shield, Sparkles, Activity, Target, AlertTriangle, ArrowRight, CheckCircle2 } from "lucide-react";

interface PremiumReportData {
  thePlaybook: string;
  attractionMagnets: string;
  traumaLoop: string;
  extractionPlan: string;
}

// 1. Move the actual logic into an inner component
function PremiumContent() {
  const searchParams = useSearchParams();
  const primaryArchetype = searchParams.get("style") || "Anxious Preoccupied";
  
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [reportData, setReportData] = useState<PremiumReportData | null>(null);

  const handleCheckout = async () => {
    setIsLoading(true);
    
    try {
      const response = await fetch("/api/premium-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          quizType: "attachment-style",
          primaryArchetype: primaryArchetype,
          loveStyle: "Unknown", 
          schema: "Subconscious Attachment Trigger" 
        }),
      });

      const data = await response.json();
      if (data.success) {
        setReportData(data.report);
        setIsUnlocked(true);
      } else {
        alert("Something went wrong generating your report.");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to connect to the server.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-50 px-4">
        <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-8 shadow-lg"></div>
        <h2 className="text-3xl font-extrabold text-zinc-900 mb-4 tracking-tight">Compiling Your Master Audit...</h2>
        <p className="text-zinc-500 text-center max-w-md text-lg leading-relaxed">
          Our elite behavioral AI is actively profiling your <span className="font-semibold text-indigo-600">{primaryArchetype}</span> patterns. 
          Generating your custom extraction plan takes about 10-15 seconds. Please don't close this window.
        </p>
      </div>
    );
  }

  if (isUnlocked && reportData) {
    return (
      <div className="min-h-screen bg-zinc-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
          
          <div className="text-center mb-16">
            <h1 className="text-4xl font-black text-zinc-900 sm:text-5xl tracking-tight mb-4">
              Your Ultimate Clarity Bundle
            </h1>
            <p className="text-xl text-zinc-600 font-medium">
              The tactical breakdown of your {primaryArchetype} attachment style.
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-sm border border-zinc-200 p-8 sm:p-10">
            <div className="flex items-center gap-4 mb-8 border-b border-zinc-100 pb-6">
              <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl"><Activity size={28} strokeWidth={2.5} /></div>
              <h2 className="text-2xl font-bold text-zinc-900">The Subconscious Playbook</h2>
            </div>
            <div 
              className="text-zinc-700 text-lg leading-relaxed space-y-6 [&>strong]:text-indigo-900 [&>strong]:font-semibold [&>strong]:bg-indigo-50 [&>strong]:px-1" 
              dangerouslySetInnerHTML={{ __html: reportData.thePlaybook }} 
            />
          </div>

          <div className="bg-white rounded-3xl shadow-sm border border-zinc-200 p-8 sm:p-10">
            <div className="flex items-center gap-4 mb-8 border-b border-zinc-100 pb-6">
              <div className="p-3 bg-rose-50 text-rose-600 rounded-xl"><Target size={28} strokeWidth={2.5} /></div>
              <h2 className="text-2xl font-bold text-zinc-900">Your Attraction Magnets</h2>
            </div>
            <div 
              className="text-zinc-700 text-lg leading-relaxed space-y-4 [&>ul]:list-disc [&>ul]:pl-6 [&>ul>li]:mb-4 [&>ul>li]:pl-2 [&>strong]:text-zinc-900" 
              dangerouslySetInnerHTML={{ __html: reportData.attractionMagnets }} 
            />
          </div>

          <div className="bg-white rounded-3xl shadow-sm border border-zinc-200 p-8 sm:p-10">
            <div className="flex items-center gap-4 mb-8 border-b border-zinc-100 pb-6">
              <div className="p-3 bg-amber-50 text-amber-600 rounded-xl"><AlertTriangle size={28} strokeWidth={2.5} /></div>
              <h2 className="text-2xl font-bold text-zinc-900">The Origin Loop</h2>
            </div>
            <div 
              className="text-zinc-700 text-lg leading-relaxed space-y-6 [&>strong]:text-zinc-900 [&>strong]:font-semibold" 
              dangerouslySetInnerHTML={{ __html: reportData.traumaLoop }} 
            />
          </div>

          <div className="bg-zinc-900 rounded-3xl shadow-2xl border border-zinc-800 p-8 sm:p-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-emerald-500 rounded-full blur-3xl opacity-20 pointer-events-none"></div>
            <div className="flex items-center gap-4 mb-8 border-b border-zinc-800 pb-6 relative z-10">
              <div className="p-3 bg-emerald-500/20 text-emerald-400 rounded-xl"><Sparkles size={28} strokeWidth={2.5} /></div>
              <h2 className="text-2xl font-bold text-white">The Extraction Plan</h2>
            </div>
            <div 
              className="text-zinc-300 text-lg leading-relaxed space-y-4 relative z-10 [&>ol]:list-decimal [&>ol]:pl-6 [&>ol>li]:mb-6 [&>ol>li]:pl-2 [&>strong]:text-white [&>strong]:font-semibold" 
              dangerouslySetInnerHTML={{ __html: reportData.extractionPlan }} 
            />
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-xl w-full bg-white rounded-3xl shadow-xl border border-zinc-200 overflow-hidden">
        
        <div className="bg-zinc-900 p-8 sm:p-10 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-indigo-500 rounded-full blur-3xl opacity-30 pointer-events-none"></div>
          <Lock className="w-12 h-12 text-indigo-400 mx-auto mb-6" />
          <h1 className="text-3xl font-extrabold text-white mb-3 tracking-tight">The Ultimate Clarity Bundle</h1>
          <p className="text-zinc-400 text-lg">
            Unlock your custom extraction plan for <span className="text-white font-semibold">{primaryArchetype}</span> patterns.
          </p>
        </div>
        
        <div className="p-8 sm:p-10">
          <ul className="space-y-5 mb-10">
            {[
              "Exactly how your brain self-sabotages (and how to stop it).",
              "The specific toxic profiles you naturally attract.",
              "The childhood origin of your emotional triggers.",
              "A 3-phase behavioral plan to rewire your attraction today.",
              "Copy-paste text scripts to set lethal, polite boundaries."
            ].map((feature, idx) => (
              <li key={idx} className="flex items-start gap-4">
                <CheckCircle2 className="w-6 h-6 text-indigo-600 flex-shrink-0 mt-0.5" />
                <span className="text-zinc-700 font-medium text-lg leading-snug">{feature}</span>
              </li>
            ))}
          </ul>

          <div className="border-t border-zinc-100 pt-8 mb-8 text-center">
            <div className="text-6xl font-black text-zinc-900 mb-2 tracking-tight">$19.99</div>
            <p className="text-sm text-zinc-500 font-bold uppercase tracking-widest">One-time payment • Lifetime access</p>
          </div>

          <button 
            onClick={handleCheckout}
            className="w-full py-5 px-6 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold text-xl shadow-xl shadow-indigo-200 transition-all flex items-center justify-center gap-3 group"
          >
            Unlock My Playbook 
            <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
          </button>
          
          <div className="flex items-center justify-center gap-2 mt-8 text-zinc-400 text-sm font-medium">
            <Shield size={18} />
            <span>Secure 256-bit encryption</span>
          </div>
        </div>
        
      </div>
    </div>
  );
}

// 2. Wrap it in a Suspense boundary for Vercel's build compiler
export default function PremiumAttachmentReport() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-50 px-4">
        <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-8 shadow-lg"></div>
        <h2 className="text-3xl font-extrabold text-zinc-900 mb-4 tracking-tight">Loading Secure Page...</h2>
      </div>
    }>
      <PremiumContent />
    </Suspense>
  );
}

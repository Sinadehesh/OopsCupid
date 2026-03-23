"use client";
import React, { useState } from "react";
import { ShieldCheck, ArrowRight, Loader2, Lock } from "lucide-react";

interface Props {
  result: any;
  onEmailSubmit: (email: string) => void;
}

export default function SabotageEmailGate({ result, onEmailSubmit }: Props) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const archetype = result?.archetype || "The Protector";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    setLoading(true);
    setError("");
    await new Promise((r) => setTimeout(r, 900));
    onEmailSubmit(email);
  };

  return (
    <div className="w-full animate-in fade-in slide-in-from-bottom-8 duration-700">

      {/* TOP REVEAL BADGE */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#086788] text-white text-xs font-bold uppercase tracking-widest mb-6">
          <ShieldCheck className="w-4 h-4" /> Analysis Complete
        </div>
        <h2 className="text-[32px] md:text-[44px] font-extrabold text-[#086788] leading-tight tracking-tight mb-4">
          Your Sabotage Archetype is Ready.
        </h2>
        <p className="text-[18px] md:text-[20px] text-[#086788]/80 font-medium max-w-xl mx-auto leading-relaxed">
          We ran your 50 answers through our behavioral model. Your private report — including your exact archetype, your top 3 triggers, and your sabotage loop — is waiting.
        </p>
      </div>

      {/* LOCKED PREVIEW CARD */}
      <div className="bg-[#086788] rounded-[24px] p-8 md:p-12 mb-8 text-white text-center relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#06AED5]/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10">
          <Lock className="w-10 h-10 text-[#F0C808] mx-auto mb-4" />
          <p className="text-[#F0C808] font-bold uppercase tracking-widest text-xs mb-3">Your Archetype</p>
          <h3 className="text-[28px] md:text-[36px] font-extrabold text-[#FFF1D0] blur-sm select-none mb-6">
            {archetype}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-lg mx-auto text-sm font-medium text-[#FFF1D0]/80">
            <div className="bg-white/10 rounded-xl p-3 backdrop-blur-sm border border-white/10">
              Your top 3 sabotage triggers
            </div>
            <div className="bg-white/10 rounded-xl p-3 backdrop-blur-sm border border-white/10">
              Your anxious vs avoidant split
            </div>
            <div className="bg-white/10 rounded-xl p-3 backdrop-blur-sm border border-white/10">
              Your self-protection loop
            </div>
          </div>
        </div>
      </div>

      {/* EMAIL FORM */}
      <div className="bg-white rounded-[24px] border border-slate-100 shadow-xl p-8 md:p-12 max-w-xl mx-auto">
        <h4 className="text-[22px] md:text-[26px] font-extrabold text-[#086788] mb-2 text-center">
          Enter your email to unlock your report
        </h4>
        <p className="text-[#5E6E79] text-[15px] font-medium text-center mb-8">
          Free. No credit card. No spam. Just your results.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="w-full px-5 py-4 rounded-2xl border-2 border-[#d6d2d2] text-[#334B63] font-medium text-[16px] focus:outline-none focus:border-[#06AED5] focus:ring-2 focus:ring-[#06AED5]/20 transition-all placeholder:text-slate-400"
          />
          {error && <p className="text-red-500 text-sm font-medium">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 bg-[#086788] hover:bg-[#06AED5] text-white font-extrabold text-[17px] py-4 rounded-2xl transition-all duration-200 shadow-md disabled:opacity-70"
          >
            {loading ? (
              <><Loader2 className="w-5 h-5 animate-spin" /> Unlocking your report...</>
            ) : (
              <>Reveal My Sabotage Report <ArrowRight className="w-5 h-5" /></>
            )}
          </button>
        </form>

        <p className="text-center text-xs text-[#5E6E79] mt-5">
          🔒 We never sell your data. Unsubscribe anytime.
        </p>
      </div>

    </div>
  );
}

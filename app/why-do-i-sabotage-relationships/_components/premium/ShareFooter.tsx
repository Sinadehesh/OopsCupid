"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Copy, CheckCheck, ArrowRight } from "lucide-react";

export default function ShareFooter({ result }: { result: any }) {
  const [copied, setCopied] = useState(false);
  const summary = `My relationship sabotage archetype: ${result.archetype ?? ""}\nLevel ${result.level ?? 0} — Score ${result.totalScore ?? 0}/200\nTop drivers: ${result.topDrivers?.map((d: any) => d.label).join(", ") ?? ""}\nvia oopscupid.com`;

  const handleCopy = async () => {
    try { await navigator.clipboard.writeText(summary); setCopied(true); setTimeout(() => setCopied(false), 2500); } catch (_) {}
  };

  return (
    <div className="bg-[#086788] rounded-[24px] p-6 md:p-10 text-center relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#06AED5]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="relative z-10">
        <p className="text-[#F0C808] font-extrabold uppercase tracking-widest text-xs mb-3">Your Result</p>
        <h3 className="text-[24px] md:text-[30px] font-extrabold text-[#FFF1D0] mb-2">{result.archetype}</h3>
        <p className="text-[#FFF1D0]/70 font-medium text-sm mb-8">Score {result.totalScore}/200 · Level {result.level} · {result.topDrivers?.[0]?.label}</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-8">
          <button onClick={handleCopy} className="flex items-center gap-2 px-5 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-[#FFF1D0] font-extrabold rounded-xl text-sm transition-all duration-200">
            {copied ? <><CheckCheck className="w-4 h-4 text-[#06AED5]" />Copied!</> : <><Copy className="w-4 h-4" />Copy My Results</>}
          </button>
          <Link href="/attraction-patterns" className="flex items-center gap-2 px-5 py-3 bg-[#F0C808] hover:bg-[#e0b800] text-[#086788] font-extrabold rounded-xl text-sm transition-all duration-200">
            Take Attraction Patterns Quiz <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <p className="text-[#FFF1D0]/50 text-xs font-medium">These results were generated from your 50 answers — not a generic bucket.</p>
      </div>
    </div>
  );
}

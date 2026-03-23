"use client";
import React, { useState } from "react";
import { CheckCircle2, Lock, ShieldCheck, Sparkles, BookOpen, ArrowRight } from "lucide-react";

interface Props {
  result: any;
}

export default function SabotagePremiumOffer({ result }: Props) {
  const [bumpAdded, setBumpAdded] = useState(true);
  const archetype = result?.archetype || "The Protector";

  const valueStack = [
    { item: "Full Sabotage Archetype Deep-Dive", value: "$67" },
    { item: "Your Complete Trigger Map (all 6 subscales)", value: "$47" },
    { item: "Anxious vs Avoidant Split Analysis", value: "$47" },
    { item: "The Self-Protection Loop Breakdown", value: "$67" },
    { item: "Personalized Rewiring Advice", value: "$97" },
  ];

  return (
    <div className="bg-[#FFF1D0] w-full rounded-t-[3rem] px-4 md:px-8 pt-14 pb-20 shadow-[0_-10px_40px_rgba(8,103,136,0.08)] mt-0">
      <div className="max-w-4xl mx-auto">

        {/* SECTION HEADER */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#086788] text-white text-xs font-bold uppercase tracking-widest mb-5">
            <Lock className="w-3.5 h-3.5" /> Private Premium File
          </div>
          <h3 className="text-[28px] md:text-[40px] font-extrabold text-[#086788] leading-tight tracking-tight mb-4">
            Unlock the Full"{archetype}" Blueprint
          </h3>
          <p className="text-[17px] text-[#086788]/80 font-medium max-w-2xl mx-auto leading-relaxed">
            Your free result shows you the pattern. The premium file shows you exactly why your brain is wired this way — and the precise steps to interrupt it.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* VALUE STACK */}
          <div className="lg:col-span-7 space-y-3 order-2 lg:order-1">
            <p className="text-xs font-bold text-[#5E6E79] uppercase tracking-widest mb-4">What's inside your private file:</p>
            {valueStack.map((item, i) => (
              <div key={i} className="flex items-center gap-4 p-4 bg-white rounded-2xl border-2 border-[#06AED5]/20 shadow-sm hover:border-[#06AED5] transition-all duration-200">
                <CheckCircle2 className="w-5 h-5 text-[#06AED5] shrink-0" />
                <span className="flex-1 font-bold text-[#334B63] text-[15px]">{item.item}</span>
                <span className="text-xs font-bold text-[#5E6E79] line-through shrink-0">{item.value}</span>
              </div>
            ))}
          </div>

          {/* CHECKOUT CARD */}
          <div className="lg:col-span-5 order-1 lg:order-2 lg:sticky lg:top-8">
            <div className="bg-white rounded-[24px] border-2 border-[#086788] shadow-xl p-6 md:p-8 relative">

              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#F0C808] text-[#086788] font-extrabold text-[10px] uppercase tracking-widest px-4 py-1.5 rounded-full whitespace-nowrap shadow-sm">
                <Sparkles className="w-3 h-3 inline mr-1 pb-0.5" /> 95% Off Today Only
              </div>

              <div className="text-center mt-3 mb-6">
                <p className="text-[#5E6E79] font-bold text-sm mb-1">Total Value: <span className="line-through">$325.00</span></p>
                <div className="flex items-baseline justify-center gap-1.5">
                  <span className="text-3xl font-extrabold text-[#086788]">Today:</span>
                  <span className="text-[56px] font-extrabold text-[#086788] tracking-tighter leading-none">$12.99</span>
                </div>
              </div>

              {/* ORDER BUMP */}
              <button
                type="button"
                onClick={() => setBumpAdded(!bumpAdded)}
                className={`w-full text-left flex gap-3 items-start p-4 rounded-xl border-2 transition-all duration-200 mb-6 focus:outline-none ${
                  bumpAdded
                    ? "bg-[#FFF1D0] border-[#F0C808]"
                    : "bg-slate-50 border-slate-200 hover:border-[#F0C808]"
                }`}
              >
                <div className={`w-6 h-6 rounded-md flex items-center justify-center border-2 shrink-0 mt-0.5 transition-colors ${
                  bumpAdded ? "bg-[#086788] border-[#086788] text-white" : "bg-white border-slate-300"
                }`}>
                  {bumpAdded && <CheckCircle2 className="w-4 h-4" />}
                </div>
                <div>
                  <p className="text-sm font-extrabold text-[#086788] mb-0.5">
                    <span className="text-[#DD1C1A]">Add:</span> The Sabotage Scripts Pack (+$7)
                  </p>
                  <p className="text-xs font-medium text-[#5E6E79] leading-snug">
                    Word-for-word texts and responses to use when you feel the urge to pull away, start a fight, or ghost someone good.
                  </p>
                </div>
              </button>

              {/* CTA */}
              <a
                href={`/why-do-i-sabotage-relationships/premium`}
                className="w-full flex items-center justify-center gap-2 bg-[#086788] hover:bg-[#06AED5] text-white font-extrabold text-[18px] py-4 rounded-2xl transition-all duration-200 shadow-lg"
              >
                <BookOpen className="w-5 h-5" /> Unlock My Private File <ArrowRight className="w-5 h-5" />
              </a>

              {/* GUARANTEE */}
              <div className="mt-5 flex items-start gap-3 bg-[#06AED5]/5 p-3.5 rounded-xl border border-[#06AED5]/20">
                <ShieldCheck className="w-7 h-7 text-[#086788] shrink-0 mt-0.5" />
                <p className="text-xs font-bold text-[#5E6E79] leading-snug">
                  <span className="text-[#086788] font-extrabold">100% Money-Back Guarantee.</span> If the report doesn't feel scarily accurate about your pattern, we'll refund you. No questions.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

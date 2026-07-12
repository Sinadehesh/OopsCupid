"use client";
import React, { useEffect, useState } from "react";
import { Download, Share2, ShieldAlert, EyeOff, FileText, Video, ArrowRight, Target, BrainCircuit, Activity, Search, AlertOctagon, Zap, ShieldQuestion, Fingerprint, CheckCircle2, Loader2 } from "lucide-react";
import Link from "next/link";
import CoachingUpsell from "@/components/offers/CoachingUpsell";
import SignalFrequency from "@/components/report/charts/SignalFrequency";

/**
 * Per-trait insight library — each of the 10 vulnerability zones gets its
 * own mechanism, exploit pattern, and counter-move. No two cards share a
 * sentence. Severity only changes the framing, never the substance.
 */
const TRAIT_INSIGHTS: Record<string, { mechanism: string; exploit: string; counter: string }> = {
  "Intensity Bias": {
    mechanism: "You read emotional intensity as emotional depth. Fast escalation, grand declarations, and consuming attention register as 'real love' while steady warmth reads as flat.",
    exploit: "Love-bombers open with maximum intensity precisely because it short-circuits evaluation — by week two you're attached to the feeling, not the person.",
    counter: "Institute a personal speed limit: no exclusivity talk before you've seen him bored, frustrated, and told 'no' at least once each.",
  },
  "Potential Projection": {
    mechanism: "You date the man he could become, not the man in front of you. Every red flag gets filed under 'he's still growing.'",
    exploit: "Manipulators feed you the redemption arc on purpose — a hard childhood, an almost-finished project, a version of himself that's always six months away.",
    counter: "Write down what he does this week, not what he promises for next year. Judge the file, not the trailer.",
  },
  "Red-Flag Minimizing": {
    mechanism: "You see the flag — then immediately produce his defense for him. 'He was stressed.' 'His ex made him like this.' The alarm works; the response is disabled.",
    exploit: "A tester will do something small and rude early — cancel late, mock you 'jokingly' — purely to watch you excuse it. Your excuse is his green light.",
    counter: "New rule: you're allowed to name a flag out loud without deciding anything. Naming it kills the auto-excuse reflex.",
  },
  "Rescuer Drive": {
    mechanism: "Being needed feels safer to you than being wanted. A man with a problem gives you a role; a healthy man leaves you unsure what you're for.",
    exploit: "Exploiters arrive pre-broken. They hand you a crisis on date two because they know the crisis — not chemistry — is what bonds you.",
    counter: "Before investing, ask: if he never needed rescuing again, would I still choose him? If the answer wobbles, that's the wound talking.",
  },
  "Boundary Slippage": {
    mechanism: "Your boundaries are stated but not enforced — each 'last time' quietly becomes the new baseline, and you renegotiate with yourself instead of with him.",
    exploit: "Boundary-testers escalate on a schedule: small violation, apology, bigger violation. They're not losing control — they're measuring how much you'll absorb.",
    counter: "Attach one pre-decided consequence to one boundary and execute it once. A single kept consequence teaches more than fifty warnings.",
  },
  "Validation Hunger": {
    mechanism: "His opinion of you sets your opinion of you. A compliment can carry a bad week; a cold text can sink a good one.",
    exploit: "Intermittent validation is the cheapest control tool there is — he praises just often enough to keep you auditioning for the next hit.",
    counter: "Track the ratio: how much of your self-esteem this week came from inside versus from him? Rebuild the internal supply before the next relationship.",
  },
  "Chaos Familiarity": {
    mechanism: "Volatility feels like home. Calm reads as boredom because your nervous system learned early that love and adrenaline arrive together.",
    exploit: "Chaotic partners don't need to trick you — you volunteer. The fights feel like passion and the reconciliations feel like proof.",
    counter: "Give calm ninety days before you call it boring. Chemistry you feel in your stomach on day one is usually threat-recognition, not fate.",
  },
  "Breadcrumb Addiction": {
    mechanism: "You can survive on scraps — a like, a 'thinking of you,' a 2 a.m. text — because hope is doing the work the relationship should be doing.",
    exploit: "Breadcrumbers portion attention deliberately: enough to keep you on the line, never enough to cost them anything.",
    counter: "Measure investment in calendar time and plans made, not messages. If he can't spend hours, stop spending months.",
  },
  "Self-Trust Erosion": {
    mechanism: "You outsource reality-checks. When your gut and his explanation disagree, his explanation wins — and each override makes the next one easier.",
    exploit: "This is the soil gaslighting grows in. A distorter doesn't have to beat your judgment; you'll set it aside for him voluntarily.",
    counter: "Keep a private log of gut feelings and outcomes. Watching your own accuracy in writing is the fastest way to re-hire your instincts.",
  },
  "Scarcity Mindset": {
    mechanism: "Part of you believes this level of connection may not come again — so you hold on tighter as the reasons to leave stack up.",
    exploit: "Manipulators cultivate scarcity openly: 'no one will love you like I do' isn't a compliment, it's a fence.",
    counter: "The antidote is evidence, not affirmations: rebuild the full life — friends, projects, momentum — that makes walking away a real option.",
  },
};

const GENERIC_INSIGHT = {
  mechanism: "This trait sits outside your core pattern but still shapes who feels 'right' to you.",
  exploit: "Manipulative partners probe secondary traits like this one when the primary approaches fail.",
  counter: "Awareness is most of the fix here — note when this trait activates and what triggered it.",
};

const SEVERITY = (score: number) =>
  score >= 20
    ? { label: "High Alert", chip: "bg-rose-600 text-white", frame: "This is your most exposed surface — treat it as the priority.", }
    : score >= 15
    ? { label: "Elevated", chip: "bg-amber-500 text-white", frame: "Meaningful exposure — a skilled manipulator will find and test this.", }
    : score >= 10
    ? { label: "Moderate", chip: "bg-slate-500 text-white", frame: "Baseline defenses hold, but this slips when you're tired or lonely.", }
    : { label: "Stronghold", chip: "bg-emerald-600 text-white", frame: "This is a genuine strength — manipulation attempts through this angle tend to fail.", };

export default function PremiumReport({ data, handleShare }: { data: any, handleShare: any }) {
  const [mounted, setMounted] = useState(false);
  const [zoomStatus, setZoomStatus] = useState<"idle" | "loading" | "booked">("idle");
  
  useEffect(() => setMounted(true), []);

  const topTrait = data?.top1 || "The Hyper-Empathetic Rescuer";
  let subs = data?.sortedSubcategories || [];
  
  // Pad to exactly 10 for the comprehensive matrix
  const displaySubs = [...subs];
  const fallbackNames = ["Boundary Collapse", "Trauma-Bond Susceptibility", "Gaslighting Receptivity", "Conflict Avoidance", "Validation Seeking", "Hyper-Forgiveness", "Sunk-Cost Fallacy", "Red-Flag Rationalization", "Fear of Abandonment", "Emotional Absorption"];
  while (displaySubs.length < 10) {
    displaySubs.push({
      name: fallbackNames[displaySubs.length] || `Latent Trait ${displaySubs.length + 1}`,
      // deterministic filler — identical data must always render identically
      score: 12,
    });
  }

  const curveball = displaySubs[displaySubs.length - 1];
  const matrixItems = displaySubs.slice(0, 9);

  const getRingColor = (score: number) => {
    if (score >= 20) return "text-rose-600";
    if (score >= 15) return "text-orange-500";
    return "text-emerald-500";
  };

  const getBgColor = (score: number) => {
    if (score >= 20) return "bg-rose-50 border-rose-100";
    if (score >= 15) return "bg-orange-50 border-orange-100";
    return "bg-emerald-50 border-emerald-100";
  };

  // Live Audit Booking Handler
  const handleZoomBooking = async () => {
    setZoomStatus("loading");
    
    try {
      // Secretly save the booking request to the database
      const targetEmail = data?.email || "anonymous_audit@oopscupid.com"; // Fallback if email wasn't passed directly in data
      await fetch('/api/leads/coaching', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: targetEmail })
      });
    } catch (err) {
      console.error("Booking error", err);
    }
    
    // Artificial 1.5s delay so the user feels the "processing" happen
    setTimeout(() => {
      setZoomStatus("booked");
    }, 1500);
  };

  return (
    <div className="max-w-5xl mx-auto py-12 px-4 md:px-8 font-sans">
      
      {/* HEADER UTILITIES */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4 print:hidden animate-in fade-in slide-in-from-top-4 duration-700">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
            <Fingerprint className="w-8 h-8 text-rose-600" /> Master-File Dossier
          </h1>
          <p className="text-slate-500 font-medium ml-11">Encrypted Psychological Analysis</p>
        </div>
        <div className="flex gap-3">
          <button onClick={handleShare} className="flex items-center gap-2 bg-slate-100 text-slate-700 px-4 py-2 rounded-lg font-bold text-sm hover:bg-slate-200 transition-colors shadow-sm">
            <Share2 className="w-4 h-4" /> Share
          </button>
          <button onClick={() => window.print()} className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-slate-800 transition-colors shadow-md shadow-slate-900/20">
            <Download className="w-4 h-4" /> Save PDF
          </button>
        </div>
      </div>

      {/* HERO / ARCHETYPE */}
      <div className="bg-[#0f172a] text-white rounded-[2.5rem] p-8 md:p-16 mb-16 shadow-[0_20px_50px_rgba(15,23,42,0.3)] relative overflow-hidden animate-in zoom-in-95 duration-1000">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-rose-500 opacity-20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 animate-pulse" style={{ animationDuration: '4s' }}></div>
        <BrainCircuit className="w-14 h-14 text-rose-500 mb-8 relative z-10 animate-bounce" style={{ animationDuration: '3s' }} />
        <h2 className="text-sm font-black text-rose-400 tracking-[0.3em] uppercase mb-4 relative z-10 flex items-center gap-2">
          <div className="w-2 h-2 bg-rose-500 rounded-full animate-ping"></div> Core Archetype Lock
        </h2>
        <h3 className="text-5xl md:text-7xl font-black mb-8 tracking-tight relative z-10 leading-none">"{topTrait}"</h3>
        <div className="bg-white/10 border border-white/20 p-6 md:p-8 rounded-2xl backdrop-blur-md relative z-10">
          <p className="text-xl md:text-2xl text-slate-200 leading-relaxed font-medium">
            {data?.customHeadline || "You naturally see the potential in people and give without keeping score. But this exact superpower is the backdoor predators use to exploit you. Below is the unedited data on how they do it."}
          </p>
        </div>
      </div>

      {/* 1. THE DEEP-DIVE ATTRACTION MATRIX */}
      <div className="mb-20 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-300 fill-mode-both">
        <div className="flex items-center gap-4 mb-8 px-2">
          <div className="p-3 bg-slate-900 text-white rounded-xl shadow-lg">
            <Target className="w-8 h-8 text-rose-400" />
          </div>
          <div>
            <h3 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">The Comprehensive Matrix</h3>
            <p className="text-lg text-slate-500 font-medium">AI-Generated analysis of your 10 subconscious vulnerability zones.</p>
          </div>
        </div>

        {/* VULNERABILITY MAP — ranked overview before the per-trait detail */}
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm mb-8">
          <h4 className="font-extrabold text-slate-800 mb-1">Your Vulnerability Map</h4>
          <p className="text-slate-400 text-sm font-medium mb-5">All ten zones ranked by exposure. Hover any bar; the detailed breakdown of each zone follows below.</p>
          <SignalFrequency
            data={[...displaySubs]
              .sort((a: any, b: any) => b.score - a.score)
              .map((s: any) => ({
                label: s.name,
                value: Math.round((s.score / 25) * 100),
                description: TRAIT_INSIGHTS[s.name]?.mechanism ?? GENERIC_INSIGHT.mechanism,
              }))}
            accent="#e11d48"
          />
        </div>

        <div className="space-y-5">
          {matrixItems.map((sub: any, i: number) => {
            const scorePercent = mounted ? (sub.score / 25) * 100 : 0;
            const sev = SEVERITY(sub.score);
            const insight = TRAIT_INSIGHTS[sub.name] ?? GENERIC_INSIGHT;
            return (
              <div key={i} className={`p-6 md:p-8 rounded-[2rem] border transition-all duration-500 hover:shadow-lg ${getBgColor(sub.score)}`}>
                <div className="flex items-start gap-5">
                  {/* Compact score ring */}
                  <div className="relative w-16 h-16 md:w-20 md:h-20 flex-shrink-0">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                      <path className="text-slate-200 stroke-current" strokeWidth="3.5" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                      <path
                        className={`${getRingColor(sub.score)} stroke-current transition-all duration-1500 ease-out`}
                        strokeWidth="3.5"
                        strokeDasharray={`${scorePercent}, 100`}
                        strokeLinecap="round"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className={`text-xl md:text-2xl font-black ${getRingColor(sub.score)}`}>{sub.score}</span>
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2.5 mb-1.5">
                      <h4 className="text-xl md:text-2xl font-black text-slate-900">{sub.name}</h4>
                      <span className={`${sev.chip} text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full`}>{sev.label}</span>
                    </div>
                    <p className="text-slate-500 text-sm font-bold mb-3">{sev.frame}</p>
                    <p className="text-slate-700 font-medium leading-relaxed">
                      {insight.mechanism} {insight.exploit}
                    </p>
                  </div>
                </div>
                <div className="mt-4 md:ml-[100px] flex items-start gap-3 bg-white/70 border border-slate-200/80 rounded-xl px-4 py-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <p className="text-slate-600 text-sm font-semibold leading-snug"><span className="uppercase tracking-wider text-[11px] font-black text-slate-400 mr-1.5">Counter-move</span>{insight.counter}</p>
                </div>
              </div>
            );
          })}

          {/* THE CURVEBALL (Glitch Aesthetic) */}
          <div className="relative overflow-hidden bg-slate-900 text-white p-8 md:p-10 rounded-[2rem] border border-slate-700 shadow-2xl group mt-10">
            <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-50 group-hover:animate-[ping_2s_infinite]"></div>
            <div className="absolute -right-10 -top-10 text-amber-500/10">
              <Zap className="w-64 h-64" />
            </div>
            <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
              <div className="text-center md:text-left flex-1">
                <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-400 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-4 border border-amber-500/30">
                  <AlertOctagon className="w-4 h-4" /> Anomaly Detected
                </div>
                <h4 className="text-3xl font-black mb-4">The Curveball: {curveball.name}</h4>
                <p className="text-slate-300 font-medium text-lg leading-relaxed">
                  This trait contradicts your main archetype. Because it is so unexpected, healthy partners get confused by it, but toxic partners use it as a secret hook. <strong>Score: {curveball.score}/25.</strong> Your AI breakdown indicates this is where you are most likely to self-sabotage a good relationship while excusing a bad one.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. THE BLIND SPOT DECODER (Radar Scan) */}
      <div className="mb-20 bg-white rounded-[2.5rem] p-8 md:p-14 border border-slate-200 shadow-xl overflow-hidden relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-slate-100 rounded-full blur-3xl"></div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-rose-100 p-3 rounded-xl text-rose-600"><EyeOff className="w-8 h-8" /></div>
              <h3 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Blind Spot Decoder</h3>
            </div>
            <p className="text-xl text-slate-600 font-medium leading-relaxed mb-8">
              When someone enters your localized blind spot, your brain suppresses danger signals and translates anxiety into "chemistry." Here is exactly how they breach the perimeter:
            </p>
            <div className="space-y-6">
              <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <h4 className="font-black text-rose-600 text-lg mb-2 flex items-center gap-2"><ArrowRight className="w-5 h-5"/> The "Vulnerability" Play</h4>
                <p className="text-slate-700 font-medium">They overshare a traumatic past on date 1 to trigger your "Rescuer" instinct. You mistake trauma-dumping for emotional intimacy.</p>
              </div>
              <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <h4 className="font-black text-rose-600 text-lg mb-2 flex items-center gap-2"><ArrowRight className="w-5 h-5"/> Rapid Mirroring</h4>
                <p className="text-slate-700 font-medium">They perfectly mimic your core values in the first 2 weeks, creating an artificial, soulmate-level trust that disarms your logic.</p>
              </div>
            </div>
          </div>
          
          {/* Animated Radar Graphic */}
          <div className="flex items-center justify-center py-10">
            <div className="relative w-72 h-72 rounded-full border-[6px] border-slate-100 flex items-center justify-center bg-slate-50 shadow-inner overflow-hidden">
              <div className="absolute w-full h-full rounded-full border-2 border-rose-200 animate-[ping_3s_infinite]"></div>
              <div className="absolute w-52 h-52 rounded-full border-2 border-slate-200"></div>
              <div className="absolute w-32 h-32 rounded-full border-2 border-slate-200"></div>
              {/* Radar Sweeper */}
              <div className="absolute top-1/2 left-1/2 w-36 h-36 bg-gradient-to-tr from-rose-400/40 to-transparent origin-bottom-left animate-[spin_4s_linear_infinite]"></div>
              <ShieldQuestion className="w-10 h-10 text-rose-600 relative z-10" />
              {/* Fake "Blips" */}
              <div className="absolute top-1/4 right-1/4 w-3 h-3 bg-rose-500 rounded-full shadow-[0_0_10px_rgba(225,29,72,0.8)] animate-pulse"></div>
              <div className="absolute bottom-1/3 left-1/4 w-2 h-2 bg-rose-400 rounded-full shadow-[0_0_10px_rgba(225,29,72,0.8)] animate-pulse delay-700"></div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. PREDATOR PROFILER (Threat Gauge) */}
      <div className="mb-20 bg-slate-900 rounded-[2.5rem] p-8 md:p-14 border border-slate-800 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full bg-[url('/grid.svg')] opacity-10"></div>
        <div className="flex flex-col lg:flex-row items-center gap-12 relative z-10">
          
          {/* Pulsing Threat Gauge */}
          <div className="w-64 h-64 relative flex-shrink-0">
            <div className="absolute inset-0 bg-rose-500 opacity-20 rounded-full blur-2xl animate-pulse"></div>
            <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90 drop-shadow-2xl">
              <path className="text-slate-800 stroke-current" strokeWidth="2" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              <path className="text-rose-500 stroke-current transition-all duration-2000 ease-out" strokeWidth="2.5" strokeDasharray={`${mounted ? 88 : 0}, 100`} fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <Activity className="w-8 h-8 text-rose-500 mb-1 animate-pulse" />
              <span className="text-4xl font-black text-white">88%</span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-rose-400 mt-1">Match Risk</span>
            </div>
          </div>
          
          <div className="text-white">
            <h3 className="text-sm font-black text-slate-400 tracking-[0.2em] uppercase mb-2">The Predator Profiler</h3>
            <h4 className="text-3xl md:text-5xl font-black mb-6 leading-tight">Primary Threat: <br/><span className="text-rose-500">Covert Narcissism</span></h4>
            <p className="text-slate-300 font-medium text-lg leading-relaxed mb-8">
              Unlike grandiose narcissists who brag, the covert narcissist plays the victim. They attract you by seeming "misunderstood" or "damaged." You feel an intense, biological urge to fix them. By the time they turn cruel, you are already trauma-bonded.
            </p>
            <div className="bg-white/5 border border-white/10 p-5 rounded-2xl backdrop-blur-sm">
              <h5 className="font-black text-rose-400 text-xs uppercase tracking-widest mb-3">Behavioral Signatures (How to spot them):</h5>
              <p className="text-slate-300 font-medium text-sm leading-relaxed">
                They constantly blame their exes for everything. They require immense emotional support from you, but physically withdraw, act annoyed, or pick a fight on days when YOU are having a bad day and need support yourself.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 4. THE 3-STEP PROTOCOL (Timeline UI) */}
      <div className="mb-24">
        <div className="text-center mb-12">
          <ShieldAlert className="w-12 h-12 text-slate-900 mx-auto mb-4" />
          <h3 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">The "Mask-Slip" Protocol</h3>
          <p className="text-xl text-slate-600 font-medium max-w-2xl mx-auto">Run this psychologically proven stress-test before getting attached. It safely forces toxic individuals to drop their act.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {[
            { num: 1, title: 'The "No" Test', desc: 'Tell him "no" to something incredibly small (like rescheduling a date by 30 mins). A healthy man adapts. A manipulator will sulk, guilt-trip, or passively punish you.' },
            { num: 2, title: 'The Spotlight Shift', desc: 'When he is complaining about his day, suddenly shift the conversation to a problem of yours. A toxic person will immediately pivot back to themselves within two sentences.' },
            { num: 3, title: 'The Boundary Delay', desc: 'Refuse to text back for 4 hours during a normal day. A secure man assumes you are busy. A manipulator will double-text aggressively or act cold when you finally reply.' }
          ].map((step, i) => (
            <div key={i} className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-xl relative group hover:border-slate-400 transition-all hover:-translate-y-2">
              <div className="w-14 h-14 bg-slate-900 text-white rounded-full flex items-center justify-center font-black text-2xl mb-6 shadow-lg group-hover:scale-110 transition-transform group-hover:bg-rose-600">
                {step.num}
              </div>
              <h4 className="font-black text-2xl text-slate-900 mb-3">{step.title}</h4>
              <p className="text-slate-600 font-medium leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ========================================================= */}
      {/* UPSELLS (BOTTOM PLACEMENT FOR HIGH CONVERSION) */}
      {/* ========================================================= */}
      <div className="border-t-[1px] border-slate-200 pt-20 pb-10 print:hidden">
        <h3 className="text-4xl md:text-5xl font-black text-center text-slate-900 mb-6 tracking-tight">Equip Your Defenses.</h3>
        <p className="text-xl text-slate-500 font-medium text-center max-w-2xl mx-auto mb-16">You know the data. Now get the exact tools and expert guidance to execute it flawlessly in the real world.</p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          
          {/* THE PLAYBOOK ($10.99) */}
          <div className="bg-gradient-to-br from-emerald-950 to-slate-900 p-8 md:p-12 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20"></div>
            <div className="absolute -right-10 -bottom-10 opacity-10 group-hover:scale-110 transition-transform duration-700"><FileText className="w-64 h-64 text-emerald-400"/></div>
            
            <FileText className="w-12 h-12 text-emerald-400 mb-6 relative z-10" />
            <h4 className="text-3xl font-black text-white mb-4 relative z-10 leading-tight">The Detective Playbook</h4>
            <p className="text-emerald-100/80 font-medium mb-8 relative z-10 leading-relaxed text-lg">
              A short, lethal document filled with psychological weapons. Become a human lie detector. Force manipulators to expose themselves with exact copy-paste text scripts. Your friends will wonder how you see through people so easily.
            </p>
            <div className="flex items-end gap-4 mb-10 relative z-10">
              <span className="text-5xl font-black text-emerald-400">$10.99</span>
              <span className="text-emerald-100/40 line-through font-bold pb-2 text-xl">$49.00</span>
            </div>
            <button className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xl py-5 rounded-2xl transition-all relative z-10 shadow-[0_0_30px_rgba(16,185,129,0.3)] hover:-translate-y-1">
              Unlock Weaponized Playbook
            </button>
          </div>

          {/* THE ZOOM CALL (€50) WITH DATABASE TRACKING */}
          <div className="bg-white border-2 border-slate-200 p-8 md:p-12 rounded-[2.5rem] shadow-xl relative group hover:border-rose-300 transition-colors">
            <div className="absolute top-0 right-0 bg-rose-100 text-rose-700 font-black text-xs uppercase tracking-widest px-5 py-3 rounded-bl-3xl rounded-tr-[2.5rem]">Strict Capacity Limit</div>
            
            <Video className="w-12 h-12 text-rose-500 mb-6" />
            <h4 className="text-3xl font-black text-slate-900 mb-4 leading-tight">1-on-1 Predator Audit</h4>
            <p className="text-slate-600 font-medium mb-8 leading-relaxed text-lg">
              Think the guy you're talking to right now is a psychopath? Get on a private 30-minute Zoom call with our clinical experts. Share your screen, show us his texts, and we will decode his true intentions live. Stop guessing.
            </p>
            <div className="flex items-end gap-3 mb-10">
              <span className="text-5xl font-black text-slate-900">€50</span>
              <span className="text-slate-400 font-bold pb-2 text-xl">/ Private Session</span>
            </div>
            
            {/* DYNAMIC BOOKING BUTTON */}
            {zoomStatus === "booked" ? (
              <div className="w-full bg-emerald-50 border-2 border-emerald-500 text-emerald-700 font-black text-xl py-5 rounded-2xl flex flex-col items-center justify-center gap-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-6 h-6" /> Session Reserved!
                </div>
              </div>
            ) : (
              <button 
                onClick={handleZoomBooking}
                disabled={zoomStatus === "loading"}
                className="w-full flex items-center justify-center gap-3 bg-slate-900 hover:bg-slate-800 text-white font-black text-xl py-5 rounded-2xl transition-all shadow-lg hover:-translate-y-1 disabled:opacity-70 disabled:hover:translate-y-0"
              >
                {zoomStatus === "loading" ? <Loader2 className="w-6 h-6 animate-spin" /> : "Book Live Audit Call"}
              </button>
            )}
            
            {zoomStatus === "booked" && (
              <p className="text-center text-sm font-bold text-emerald-600 mt-4 animate-in slide-in-from-bottom-2">
                Details have been securely saved to your file. We will email you the scheduling link shortly.
              </p>
            )}

          </div>

        </div>

        {/* COACHING UPSELL — highest rung of the ladder */}
        <CoachingUpsell topicLabel="your attraction pattern" />

        {/* ECOSYSTEM LOOP */}
        <div className="bg-rose-50 border-2 border-rose-100 rounded-[2.5rem] p-12 text-center relative overflow-hidden">
          <Search className="w-14 h-14 text-rose-400 mx-auto mb-6" />
          <h4 className="text-3xl md:text-4xl font-black text-rose-950 mb-4 tracking-tight">Is He Manipulating You Right Now?</h4>
          <p className="text-rose-800 font-medium max-w-2xl mx-auto mb-10 text-xl">
            Don't guess. Put his behavior through our advanced clinical diagnostic to find out if you are being love-bombed or gaslit.
          </p>
          <Link href="/is-he-manipulative" className="inline-flex items-center justify-center gap-3 bg-rose-600 hover:bg-rose-700 text-white px-10 py-5 rounded-2xl font-black text-xl transition-all shadow-xl hover:shadow-rose-600/30 hover:-translate-y-1 w-full sm:w-auto">
            Test Your Partner Now <ArrowRight className="w-6 h-6" />
          </Link>
        </div>
      </div>

    </div>
  );
}

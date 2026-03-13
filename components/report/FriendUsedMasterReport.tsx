import React from "react";
import CircularScore from "./CircularScore";
import { ScoreBar } from "./ScoreBars";
import UnlockBanner from "./UnlockBanner";
import { ShieldAlert, Lock, HandCoins, AlertTriangle, LifeBuoy } from "lucide-react";

export default function FriendUsedMasterReport({ profile }: any) {
  
  const [isRedirecting, setIsRedirecting] = useState(false);

  const handleUnlock = async () => {
    setIsRedirecting(true);
    try {
      // Calls your checkout API route
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quizType: "are-your-friends-using-you" }),
      });
      const data = await res.json();
      
      if (data.url) {
         window.location.href = data.url; // Redirects the user to Stripe
      } else {
         alert("Checkout failed to generate URL.");
         setIsRedirecting(false);
      }
    } catch (err) {
      console.error(err);
      setIsRedirecting(false);
    }
  };

  const isPremium = profile.premiumUnlocked;

  // Sleek Emerald & Charcoal "Audit" Theme
  const colors = {
    bgMain: "bg-[#0f172a]", 
    bgCard: "bg-[#1e293b]",     
    borderCard: "border-[#334155]", 
    textPrimary: "text-[#f8fafc]",  
    textSecondary: "text-[#94a3b8]",
    accentEmerald: "#10b981",
    accentRed: "#ef4444"
  };

  const getSeverityColor = (score: number) => {
    if (score >= 75) return "#ef4444"; // Very High Risk
    if (score >= 50) return "#f59e0b"; // High Risk
    if (score >= 25) return "#3b82f6"; // Moderate Risk
    return "#10b981"; // Low Risk
  };

  const getRiskLabel = (score: number) => {
    if (score >= 75) return "Very High";
    if (score >= 50) return "High";
    if (score >= 25) return "Moderate";
    return "Low";
  };

  const getRiskText = (score: number) => {
    if (score >= 75) return "You’re consistently relied on — and often taken advantage of. This pattern is costing you time, energy and sometimes money. Below is a prioritized plan to protect your boundaries and rebuild healthy reciprocity.";
    if (score >= 50) return "You’re in a pattern where a handful of friendships are leaning heavily on you. With small, consistent boundary moves, you can shift these relationships toward balance.";
    if (score >= 25) return "Some friend relationships are a bit lopsided. You’re not being exploited across the board, but a few dynamics deserve your attention.";
    return "Your friendships are fairly reciprocal. Continue the behaviors that create balance and mutual respect.";
  };

  const ARCHETYPES: Record<string, { hook: string, prediction: string }> = {
    "The Generous Anchor": {
        hook: "I’m the one everyone leans on — and sometimes takes for granted.",
        prediction: "You provide massive stability to your group, but your data shows a severe lack of boundary enforcement. Friends expect you to absorb their stress, run their errands, and be available constantly, often with very little gratitude in return. Your generosity has become an expectation rather than a gift."
    },
    "The Overleveraged Helper": {
        hook: "I give more than I receive — time to rebalance.",
        prediction: "Your friendship dynamic is fundamentally lopsided. The data reveals a strong pattern where your time and resources are systematically drained without reciprocal support. You are operating at a deep relational deficit, investing far more into these people than they are willing to invest in you."
    },
    "The Unseen Sponsor": {
        hook: "People benefit from my connections and resources more than they thank me.",
        prediction: "Your circle is leveraging your status, finances, or access for their own gain. You score highly on Opportunism and Financial Drain, meaning certain 'friends' are likely keeping you around specifically for what you can provide them socially or materially, rather than genuine emotional connection."
    },
    "The Emotional ATM": {
        hook: "I’m the group’s emotional bank — often robbed.",
        prediction: "You are dealing with high emotional labor extraction. Friends use you to endlessly vent, regulate their own nervous systems, and dump their anxiety, but they magically disappear or minimize your struggles when you need support. They are extracting free therapy."
    },
    "The Conditional Companion": {
        hook: "Friends are there when it’s useful — but disappear when it isn’t.",
        prediction: "Your friendships operate on highly conditional terms. The data flags that people in your circle only show up when there is a public benefit, a party, or a favor to be gained. In quiet, difficult, or low-status moments, you are left entirely on your own."
    },
    "The Boundary Blur": {
        hook: "My lines are fuzzy and people cross them.",
        prediction: "Your primary vulnerability isn't necessarily malicious friends, but an inability to hold a line. Because your 'no' is weak or flexible, friends have learned that they can push, guilt, or persuade you into doing things you don't actually have the bandwidth for."
    },
    "The Reliable One (but Burned)": {
        hook: "I always show up — and get burned.",
        prediction: "You hold yourself to a strict standard of loyalty and reliability, but your friends do not return the favor. You are frequently left covering their slack, dealing with their flakiness, and rearranging your life to accommodate people who would never do the same for you."
    },
    "The Financial Magnet": {
        hook: "I’m frequently expected to foot the bill.",
        prediction: "The data shows a localized but intense exploitation of your finances. Whether it's 'forgetting' their wallet, asking for loans they never repay, or assuming you will cover group costs, your friends are systematically draining your material resources."
    },
    "The Dependent Trap": {
        hook: "A friend keeps me close by making me feel I owe them.",
        prediction: "This is a dangerous dynamic. The data flags high manipulative signaling and dependency engineering. A specific friend (or group) is actively trying to isolate you, undermine your other relationships, and use guilt or past favors to keep you emotionally tethered to them."
    },
    "The Strategic Networker": {
        hook: "People orbit me for access — but relationships can still be fair.",
        prediction: "You naturally attract people who want to climb socially. However, your data suggests you are somewhat aware of this and maintain decent boundaries. As long as you keep your expectations realistic, these transactional relationships don't have to be deeply exploitative."
    }
  };

  const currentArchetype = ARCHETYPES[profile.primaryArchetype] || ARCHETYPES["The Generous Anchor"];
  const secArchetype = ARCHETYPES[profile.secondaryArchetype];

  const CustomLockedCard = ({ title, teaser, isAlert = false }: any) => {
    if (isPremium) {
      return (
        <div className={`rounded-3xl border p-8 md:p-10 flex flex-col h-full ${colors.bgCard} ${colors.borderCard} shadow-sm`}>
          <h4 className={`text-sm font-bold uppercase tracking-widest text-[${colors.accentEmerald}] mb-4 flex items-center gap-2`}>Premium Insight Unlocked</h4>
          <h3 className={`text-2xl font-extrabold ${colors.textPrimary} mb-4`}>{title}</h3>
          <p className={`${colors.textSecondary} leading-relaxed`}>Data unlocked successfully.</p>
        </div>
      );
    }
    return (
      <div className={`relative rounded-3xl border p-8 md:p-10 flex flex-col h-full overflow-hidden ${colors.bgCard} ${colors.borderCard} group shadow-lg`}>
        <div className="filter blur-[6px] opacity-30 select-none">
          <h3 className={`text-2xl font-extrabold ${colors.textPrimary} mb-4`}>{title}</h3>
          <p className={`${colors.textSecondary} leading-relaxed mb-4`}>This section contains deep clinical analysis.</p>
          <div className="w-full h-4 bg-[#334155] rounded mb-2"></div>
          <div className="w-3/4 h-4 bg-[#334155] rounded mb-2"></div>
          <div className="w-5/6 h-4 bg-[#334155] rounded"></div>
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-[#0f172a]/80 backdrop-blur-sm border border-white/5">
          <div className={`w-14 h-14 ${isAlert ? 'bg-red-500/20 text-red-400' : 'bg-emerald-500/20 text-emerald-400'} rounded-full flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
            <Lock className="w-6 h-6" />
          </div>
          <h4 className={`text-xl font-extrabold ${colors.textPrimary} mb-2`}>{title}</h4>
          <p className={`text-sm ${colors.textSecondary} mb-6 max-w-sm`}>{teaser}</p>
          <button onClick={handleUnlock} disabled={isRedirecting} className={`px-6 py-3 rounded-full font-bold text-sm ${isAlert ? 'bg-red-500 hover:bg-red-600' : 'bg-emerald-500 hover:bg-emerald-600'} text-white shadow-lg transition-colors disabled:opacity-70`}>
      {isRedirecting ? "Securely redirecting..." : "Unlock Full Analysis"}
    </button>
        </div>
      </div>
    );
  };

  return (
    <div className={`py-8 md:py-12 w-full ${colors.bgMain}`}>
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
        
        {/* WIDESCREEN HERO SECTION */}
        <div className={`rounded-[32px] border p-10 md:p-16 flex flex-col justify-center ${colors.bgCard} ${colors.borderCard} shadow-2xl relative overflow-hidden mb-8`}>
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-[#10b981] via-transparent to-transparent"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
             <div className="flex-1">
                <div className={`inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold tracking-widest mb-6 bg-[#0f172a] border border-[#334155] text-white shadow-md`}>
                  <HandCoins className="w-4 h-4 text-[#10b981]" />
                  TRANSACTIONAL AUDIT COMPLETE
                </div>
                <h2 className={`text-4xl md:text-5xl font-extrabold leading-tight tracking-tighter mb-4 text-white`}>
                  Primary Role: <span className="text-[#10b981]">{profile.primaryArchetype}</span>
                </h2>
                <p className="text-xl text-emerald-400 font-medium italic mb-6">"{currentArchetype.hook}"</p>
                <p className="text-lg text-slate-300 leading-relaxed max-w-2xl">
                  {currentArchetype.prediction}
                </p>
             </div>

             <div className={`w-full md:w-auto shrink-0 rounded-3xl border p-8 flex flex-col items-center justify-center bg-[#0f172a] ${colors.borderCard} shadow-lg text-center`}>
                <h3 className="text-slate-400 text-sm font-bold uppercase tracking-widest mb-4">Use-Risk Index</h3>
                <CircularScore 
                  value={profile.useRiskIndex || 0} 
                  title="" 
                  color={getSeverityColor(profile.useRiskIndex || 0)} 
                  isDarkTheme={true}
                />
                <div className="mt-6">
                  <span className="text-2xl font-bold text-white block">{getRiskLabel(profile.useRiskIndex || 0)} Risk</span>
                </div>
             </div>
          </div>
        </div>

        {/* NARRATIVE & SECONDARY ARCHETYPE */}
        <div className="grid w-full grid-cols-1 lg:grid-cols-3 gap-8 mb-16 items-stretch">
          <div className={`lg:col-span-2 rounded-3xl border p-8 md:p-12 flex flex-col h-full ${colors.bgCard} ${colors.borderCard} shadow-lg`}>
            <div className="flex items-center gap-3 mb-6">
              <div className={`w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center`}>
                <ShieldAlert className={`w-6 h-6 text-emerald-400`} />
              </div>
              <h3 className={`text-2xl md:text-3xl font-extrabold ${colors.textPrimary}`}>The Baseline Assessment</h3>
            </div>
            <p className={`text-lg md:text-xl leading-relaxed ${colors.textSecondary}`}>
              {getRiskText(profile.useRiskIndex || 0)}
            </p>
          </div>

          <div className={`lg:col-span-1 rounded-3xl border p-8 md:p-10 flex flex-col justify-center h-full ${colors.bgCard} ${colors.borderCard} shadow-lg`}>
             <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4 border-b border-slate-700 pb-2">Secondary Vulnerability</h3>
             <h4 className="text-xl font-bold text-white mb-2">{profile.secondaryArchetype}</h4>
             <p className="text-sm text-slate-300 italic mb-3">"{secArchetype?.hook}"</p>
             <p className="text-sm text-slate-400 leading-relaxed">{secArchetype?.prediction.substring(0, 120)}...</p>
          </div>
        </div>

        {/* SUBSCALES */}
        <h3 className={`text-2xl md:text-3xl font-extrabold ${colors.textPrimary} mb-8 border-b ${colors.borderCard} pb-3`}>
          Exploitation Vectors
        </h3>
        
        <div className="space-y-12 md:space-y-16 w-full">
          <div className="grid w-full grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
            <div className={`rounded-3xl border p-8 md:p-10 flex flex-col h-full ${colors.bgCard} ${colors.borderCard} shadow-lg`}>
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-2 flex items-center gap-2"><AlertTriangle className="w-4 h-4"/> Metric Data</h4>
                  <h2 className={`text-3xl md:text-4xl font-extrabold ${colors.textPrimary}`}>Where You Lose</h2>
                </div>
              </div>
              <div className="space-y-6 mb-8 flex-grow">
                <ScoreBar label="Emotional Labor Burden" value={profile.normalizedScores?.["Emotional Labor"] || 0} color={`bg-[#3b82f6]`} />
                <ScoreBar label="Reciprocity Deficit (Imbalance)" value={profile.normalizedScores?.["Reciprocity Balance"] || 0} color={`bg-[#f59e0b]`} />
                <ScoreBar label="Conditional Presence" value={profile.normalizedScores?.["Conditional Presence"] || 0} color="bg-[#8b5cf6]" />
                <ScoreBar label="Manipulative Exposure" value={profile.normalizedScores?.["Manipulation"] || 0} color="bg-[#ef4444]" />
              </div>
            </div>
            <CustomLockedCard 
              title="Red Flag Audit" 
              teaser="Unlock the specific, undeniable behavioral patterns your friends are using to keep you compliant." 
              isAlert={true} 
            />
          </div>

          <div className="grid w-full grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
             <CustomLockedCard 
               title="Boundary Negotiation Scripts"  
               teaser="Copy-paste text messages designed by psychologists to say 'no' without triggering a massive group argument." 
             />
             <CustomLockedCard 
               title="The Exit Plan"  
               teaser="Determine mathematically if a friendship can be repaired through boundaries, or if it requires a hard exit." 
             />
          </div>
        </div>

        {!isPremium && (
          <div className="mt-20">
            <UnlockBanner />
          </div>
        )}
      </div>
    </div>
  );
}

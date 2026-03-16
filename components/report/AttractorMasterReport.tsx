import React from "react";
import CircularScore from "./CircularScore";
import { ScoreBar } from "./ScoreBars";
import UnlockBanner from "./UnlockBanner";
import { ShieldCheck, Lock, Target, Radio, AlertTriangle, EyeOff } from "lucide-react";

export default function AttractorMasterReport({ profile }: any) {
  const isPremium = profile.premiumUnlocked;

  const colors = {
    bgMain: "bg-[#f2f5fa]", 
    bgCard: "bg-white",     
    borderCard: "border-[#ced2dc]", 
    textPrimary: "text-[#2a2522]",  
    textSecondary: "text-[#2a2522]/70",
  };

  const getSeverityColor = (score: number) => {
    if (score >= 75) return "#C73E1D"; // Red (High Vulnerability)
    if (score >= 50) return "#F18F01"; // Orange (Moderate)
    return "#2E86AB"; // Blue (Safe)
  };

  // 🧠 THE 12 INBOUND ARCHETYPES - Rewritten as Hormozi-style "Brutal Truths"
  const ARCHETYPES: Record<string, { subtitle: string, prediction: string }> = {
    "The Predator Magnet": {
        subtitle: "You show too much empathy, too soon.",
        prediction: "Here is the brutal truth: Players and narcissists smell your empathy from a mile away. They know you will forgive their red flags because you always 'want to see the good' in people. You are a walking target for manipulation, and they know you will prioritize their feelings over your own safety."
    },
    "The Chase Trigger": {
        subtitle: "You act like you don't care, so you attract competitors.",
        prediction: "Here is the brutal truth: Because you put up massive walls, you attract men who treat dating like a game to be won. They will obsess over you just to break down your walls. But the second they finally 'win' you, they get bored and pull away, leaving you confused and hurt."
    },
    "The Broken-Bird Collector": {
        subtitle: "You act like a mother, not a girlfriend.",
        prediction: "Here is the brutal truth: You attract chaotic, wounded men who need to be saved. You exhaust yourself trying to fix their lives, hoping they will finally love you for it. They won't. They will drain all your energy, and once you heal them, they will leave you for someone else."
    },
    "The Narcissist's Trophy": {
        subtitle: "You look perfect on paper, so you attract users.",
        prediction: "Here is the brutal truth: Because you have high status or perfect aesthetics, you attract men who want to show you off like a shiny new car. They do not care about your feelings or your bad days; they only care about how standing next to you makes them look to other people."
    },
    "The Opportunist's Mark": {
        subtitle: "You are too generous, and users can see it.",
        prediction: "Here is the brutal truth: You are highly capable and giving, which attracts men looking for a free ride—emotionally or financially. They flock to you because they know you will step up and take care of things when they 'forget' or act helpless."
    },
    "The Savior's Project": {
        subtitle: "You act chaotic, which attracts controllers.",
        prediction: "Here is the brutal truth: You project unpredictability, which instantly attracts 'White Knights.' These men do not want an equal partner; they want a broken project they can control and fix. Once you actually become healthy and independent, they will lose interest."
    },
    "The Dominant's Canvas": {
        subtitle: "You are too agreeable, which attracts dictators.",
        prediction: "Here is the brutal truth: You 'go with the flow' too much. By never setting firm boundaries, you act as a magnet for highly controlling, jealous men who want to dictate your entire life. They want to own you, not share a life with you."
    },
    "The Submissive's Shield": {
        subtitle: "You are so bossy you attract weak men.",
        prediction: "Here is the brutal truth: You project such intense independence that strong, secure men stay away. Instead, you attract highly anxious, weak men who want you to make all their life choices for them. You end up feeling like you are dating a child."
    },
    "The Sapiosexual Trap": {
        subtitle: "You use your intelligence as a shield.",
        prediction: "Here is the brutal truth: You project intense intellectual superiority. You attract men who view dating as a debate club and just want to prove they are smarter than you. It is exhausting, competitive, and completely lacks real emotional warmth."
    },
    "The Traditional Catch": {
        subtitle: "You play it so safe you attract boredom.",
        prediction: "Here is the brutal truth: You aggressively project a desire for a 'traditional' life, which attracts incredibly rigid, script-following men. You filter out the bad boys, but you end up with partners who lack passion and view you as a checklist item."
    },
    "The Subculture Icon": {
        subtitle: "You are trapped in a weird aesthetic bubble.",
        prediction: "Here is the brutal truth: Your aesthetic and vibe are so intense that you only attract people competing in that exact same weird bubble. You are completely blocking out normal, secure, healthy partners because they think you live on another planet."
    },
    "The Low-Effort Magnet": {
        subtitle: "You try too hard to be the 'Chill Girl'.",
        prediction: "Here is the brutal truth: You demand absolutely nothing because you don't want to cause drama. Because you ask for nothing, you attract lazy, emotionally unavailable men who give you exactly that: nothing."
    },
    "The Safe Harbor": {
        subtitle: "You actually have great boundaries.",
        prediction: "Here is the brutal truth: You are doing a lot right. You do not project extreme chaos or extreme victimhood. However, because you are a high-value partner, highly skilled toxic men will still try to fake their way into your life. You need to know how to spot their masks."
    }
  };

  const currentArchetype = ARCHETYPES[profile.archetype] || ARCHETYPES["The Safe Harbor"];

  const CustomLockedCard = ({ title, teaser, icon: Icon = Lock }: { title: string, teaser: string, icon?: any }) => {
    if (isPremium) {
      return (
        <div className={`rounded-3xl border p-8 md:p-10 flex flex-col h-full ${colors.bgCard} ${colors.borderCard} shadow-sm`}>
          <h4 className={`text-sm font-bold uppercase tracking-widest text-[#A23B72] mb-4 flex items-center gap-2`}>Premium Playbook Unlocked</h4>
          <h3 className={`text-2xl font-extrabold ${colors.textPrimary} mb-4`}>{title}</h3>
          <p className={`${colors.textSecondary} leading-relaxed`}>Data unlocked successfully.</p>
        </div>
      );
    }
    return (
      <div className={`relative rounded-3xl border p-8 md:p-10 flex flex-col h-full overflow-hidden ${colors.bgCard} ${colors.borderCard} group shadow-sm`}>
        <div className="filter blur-[6px] opacity-40 select-none">
          <h3 className={`text-2xl font-extrabold ${colors.textPrimary} mb-4`}>{title}</h3>
          <p className={`${colors.textSecondary} leading-relaxed mb-4`}>This section contains the exact text scripts and strategies.</p>
          <div className="w-full h-4 bg-[#ced2dc] rounded mb-2"></div>
          <div className="w-3/4 h-4 bg-[#ced2dc] rounded mb-2"></div>
          <div className="w-5/6 h-4 bg-[#ced2dc] rounded"></div>
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-white/80 backdrop-blur-sm border-2 border-transparent group-hover:border-[#A23B72]/20 rounded-3xl transition-all">
          <div className={`w-14 h-14 bg-[#3B1F2B] rounded-2xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform`}>
            <Icon className="w-6 h-6 text-[#F18F01]" />
          </div>
          <h4 className={`text-xl font-extrabold ${colors.textPrimary} mb-2`}>{title}</h4>
          <p className={`text-sm ${colors.textSecondary} mb-6 max-w-sm font-medium leading-relaxed`}>{teaser}</p>
          <button className={`px-8 py-4 rounded-xl font-extrabold text-sm bg-[#A23B72] text-white shadow-lg shadow-[#A23B72]/30 hover:bg-[#8e3263] hover:-translate-y-1 transition-all`}>
            Unlock This Playbook
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className={`py-8 md:py-12 w-full ${colors.bgMain}`}>
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
        
        {/* WIDESCREEN HERO SECTION (The Dream Outcome / Reality Check) */}
        <div className={`rounded-[32px] border p-10 md:p-16 flex flex-col justify-center bg-[#3B1F2B] border-[#3B1F2B] shadow-2xl relative overflow-hidden mb-8`}>
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
          <div className="relative z-10 text-center max-w-4xl mx-auto">
            <div className={`inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold tracking-widest mb-6 bg-[#A23B72] text-white shadow-md uppercase`}>
              <ShieldCheck className="w-4 h-4 text-white" />
              Instant Diagnostic Audit
            </div>
            <h2 className={`text-4xl md:text-6xl font-extrabold leading-tight tracking-tighter mb-6 text-white`}>
              Why You Keep Attracting <br className="hidden md:block"/>
              <span className="text-[#F18F01] mt-2 block">{profile.archetype || "Analyzing..."}</span>
            </h2>
            <p className="text-xl md:text-2xl text-white/90 font-medium italic">
              "{currentArchetype.subtitle}"
            </p>
          </div>
        </div>

        {/* FREE PREDICTION & GAUGE GRID */}
        <div className="grid w-full grid-cols-1 lg:grid-cols-3 gap-8 mb-16 items-stretch">
          <div className={`lg:col-span-2 rounded-3xl border p-8 md:p-12 flex flex-col h-full ${colors.bgCard} ${colors.borderCard} shadow-lg`}>
            <div className="flex items-center gap-3 mb-6">
              <div className={`w-12 h-12 rounded-2xl bg-[#A23B72]/10 flex items-center justify-center`}>
                <Target className={`w-6 h-6 text-[#A23B72]`} />
              </div>
              <h3 className={`text-2xl md:text-3xl font-extrabold ${colors.textPrimary}`}>The Brutal Truth</h3>
            </div>
            <p className={`text-lg md:text-xl leading-relaxed ${colors.textSecondary} font-medium`}>
              {currentArchetype.prediction}
            </p>
          </div>

          <div className={`lg:col-span-1 rounded-3xl border p-8 md:p-10 flex flex-col items-center justify-center ${colors.bgCard} ${colors.borderCard} shadow-lg text-center`}>
            <CircularScore 
              value={profile.vulnerabilityIndex || 0} 
              title="The 'Easy Target' Meter" 
              color={getSeverityColor(profile.vulnerabilityIndex || 0)} 
              isDarkTheme={false}
            />
            <p className={`mt-8 text-sm font-medium leading-relaxed ${colors.textSecondary}`}>
              This meter shows exactly how vulnerable you look to toxic men. A high score means you are broadcasting signals (like over-forgiving or extreme submissiveness) that attract predators.
            </p>
          </div>
        </div>

        <h3 className={`text-2xl md:text-3xl font-extrabold ${colors.textPrimary} mb-8 border-b ${colors.borderCard} pb-3`}>
          The Hidden Signals You Are Sending
        </h3>
        
        <div className="space-y-12 md:space-y-16 w-full">
          <div className="grid w-full grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
            <div className={`rounded-3xl border p-8 md:p-10 flex flex-col h-full ${colors.bgCard} ${colors.borderCard} shadow-lg`}>
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-widest text-[#A23B72] mb-2 flex items-center gap-2"><Radio className="w-4 h-4"/> What They See</h4>
                  <h2 className={`text-2xl md:text-3xl font-extrabold ${colors.textPrimary}`}>Your Subconscious Broadcast</h2>
                </div>
              </div>
              <p className="text-sm text-slate-500 font-medium mb-6">These bars show the exact behaviors you do on first dates that secretly tell men how to treat you.</p>
              <div className="space-y-6 mb-8 flex-grow">
                <ScoreBar label="The 'Over-Giver' Signal (Anxiety)" value={profile.normalizedScores?.Anxiety || 0} color={`bg-[#A23B72]`} />
                <ScoreBar label="The 'I Will Pull Away' Signal (Avoidance)" value={profile.normalizedScores?.Avoidance || 0} color={`bg-[#3B1F2B]`} />
                <ScoreBar label="The 'I Don't Need You' Wall" value={profile.normalizedScores?.Independence || 0} color="bg-[#2E86AB]" />
                <ScoreBar label="The 'I Can Fix Him' Signal" value={profile.normalizedScores?.Maternal || profile.normalizedScores?.Agreeableness || 0} color="bg-[#F18F01]" />
              </div>
            </div>
            
            <CustomLockedCard 
              title="The Toxic Magnet Breakdown" 
              teaser="See exactly what you say and do on dates that tells narcissists and players you are a safe target—and how to stop doing it." 
              icon={EyeOff}
            />
          </div>

          <div className="grid w-full grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
             <CustomLockedCard 
               title="Who Will Approach You Next"  
               teaser="Our tool predicts exactly what kind of toxic (or secure) person will approach you next based on your current hidden signals." 
               icon={Target}
             />
             <CustomLockedCard 
               title="The 'Player Repellent' Playbook"  
               teaser="Get the exact, step-by-step instructions to instantly change what you signal, so toxic men ignore you and secure men pursue you." 
               icon={AlertTriangle}
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

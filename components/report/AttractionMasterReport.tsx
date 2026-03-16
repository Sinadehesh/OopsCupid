import React from "react";
import CircularScore from "./CircularScore";
import { ScoreBar } from "./ScoreBars";
import UnlockBanner from "./UnlockBanner";
import { ShieldCheck, Lock, Target, AlertTriangle, EyeOff, Radio } from "lucide-react";

export default function AttractionMasterReport({ profile }: any) {
  const isPremium = profile.premiumUnlocked;

  const colors = {
    bgMain: "bg-[#f2f5fa]", 
    bgCard: "bg-white",     
    borderCard: "border-[#ced2dc]", 
    textPrimary: "text-[#2a2522]",  
    textSecondary: "text-[#2a2522]/70",
  };

  const getSeverityColor = (score: number) => {
    if (score >= 75) return "#DD1C1A"; 
    if (score >= 50) return "#F0C808"; 
    return "#086788"; 
  };

  // 🧠 THE 12-ARCHETYPE DICTIONARY - Rewritten as Hormozi "Brutal Truths"
  const ARCHETYPES: Record<string, { subtitle: string, prediction: string }> = {
    "The Dark Magnet": {
        subtitle: "You mistake arrogance for confidence.",
        prediction: "Here is the brutal truth: You are drawn to narcissists and players because you love the 'high' of winning them over. You mistake their dominating behavior for strength. You get addicted to the chase, but once they finally have you, they devalue you. You are trading your long-term peace for short-term adrenaline."
    },
    "The Emotional Masochist": {
        subtitle: "You equate anxiety and drama with love.",
        prediction: "Here is the brutal truth: If a guy is safe and consistent, you think he is 'boring.' You actively chase men who make you walk on eggshells because the drama feels like passion to your nervous system. You are caught in a toxic loop where the person causing your pain is the only one who can soothe it."
    },
    "The Ghost Hunter": {
        subtitle: "You only want men who don't want you.",
        prediction: "Here is the brutal truth: You chase emotionally unavailable guys because deep down, real intimacy terrifies you. The second a guy actually commits and treats you right, you lose interest. You are subconsciously keeping yourself single on purpose by chasing 'ghosts'."
    },
    "The Chaos Junkie": {
        subtitle: "You crave a rollercoaster, not a relationship.",
        prediction: "Here is the brutal truth: You pick unpredictable, impulsive men because a peaceful life feels suffocating to you. You end up playing therapist, managing their crises, and cleaning up their messes until you completely burn out. You need to stop trying to fix broken people."
    },
    "The Fixer": {
        subtitle: "You act like a rehab center for broken men.",
        prediction: "Here is the brutal truth: You pick guys who need saving because if they 'need' you, they can't leave you. You are draining your own life force trying to build a man from scratch. You will exhaust yourself fixing him, and once he is healed, he will leave you for someone else."
    },
    "The Power Submissive": {
        subtitle: "You confuse controlling behavior with 'protection'.",
        prediction: "Here is the brutal truth: You want a man to make all the decisions so you don't have to. You are attracted to extreme dominance, which makes you a prime target for controlling, possessive men. You are handing over your power to men who will eventually use it against you."
    },
    "The Intensity Chaser": {
        subtitle: "You mistake the anxiety of 'will he text me?' for chemistry.",
        prediction: "Here is the brutal truth: You chase extreme highs and lows because peace feels empty to you. You are addicted to the push-pull cycle. The anxiety of wondering where you stand feels exactly like passionate love to your broken nervous system. You are addicted to the game, not the person."
    },
    "The Status Climber": {
        subtitle: "You care more about his resume than his character.",
        prediction: "Here is the brutal truth: You prioritize what a man looks like on paper over how he actually treats you behind closed doors. You are willing to endure emotional neglect, cheating, or cruelty as long as he provides status and money. You are trading your happiness for an image."
    },
    "The Trophy Hunter": {
        subtitle: "You prioritize physical chemistry over everything else.",
        prediction: "Here is the brutal truth: You are so blinded by looks and physical chemistry that you ignore massive, glaring red flags. Because you only filter for aesthetics, you repeatedly fall into the traps of vain, narcissistic men who only view you as a shiny accessory to show off."
    },
    "The Intellectual Sparring Partner": {
        subtitle: "You use your intelligence as a shield.",
        prediction: "Here is the brutal truth: You treat dating like a debate club. You push away guys who just want to love you because they aren't 'challenging' enough. You mistake emotional warmth for intellectual simplicity, and you are accidentally isolating yourself from good men."
    },
    "The Traditionalist": {
        subtitle: "You are blindly following a checklist.",
        prediction: "Here is the brutal truth: You are so obsessed with checking off the 'marriage and kids' boxes that you ignore major incompatibilities. You are drawn to men just because they fit a traditional mold, and you risk waking up in 10 years feeling completely empty and disconnected."
    },
    "The Safe-But-Bored Seeker": {
        subtitle: "You self-sabotage when things get too peaceful.",
        prediction: "Here is the brutal truth: You actually have a good picker, but you sabotage it. When you finally get a secure, healthy guy, your brain misses the drama of your past toxic relationships, so you start picking fights or feeling 'bored'. You have to train your brain to accept peace."
    }
  };

  const currentArchetype = ARCHETYPES[profile.archetype] || ARCHETYPES["The Safe-But-Bored Seeker"];

  const CustomLockedCard = ({ title, teaser, icon: Icon = Lock }: { title: string, teaser: string, icon?: any }) => {
    if (isPremium) {
      return (
        <div className={`rounded-3xl border p-8 md:p-10 flex flex-col h-full ${colors.bgCard} ${colors.borderCard} shadow-sm`}>
          <h4 className="text-sm font-bold uppercase tracking-widest text-[#086788] mb-4 flex items-center gap-2">
             Premium Playbook Unlocked
          </h4>
          <h3 className={`text-2xl font-extrabold ${colors.textPrimary} mb-4`}>{title}</h3>
          <p className={`${colors.textSecondary} leading-relaxed`}>
            Premium content renders here based on the exact traits and arrays passed.
          </p>
        </div>
      );
    }

    return (
      <div className={`relative rounded-3xl border p-8 md:p-10 flex flex-col h-full overflow-hidden ${colors.bgCard} ${colors.borderCard} group shadow-sm`}>
        <div className="filter blur-[6px] opacity-40 select-none">
          <h3 className={`text-2xl font-extrabold ${colors.textPrimary} mb-4`}>{title}</h3>
          <p className={`${colors.textSecondary} leading-relaxed mb-4`}>
            This premium section contains your personalized deep-dive analysis based on your unique combination of traits.
          </p>
          <div className="w-full h-4 bg-[#ced2dc] rounded mb-2"></div>
          <div className="w-3/4 h-4 bg-[#ced2dc] rounded mb-2"></div>
          <div className="w-5/6 h-4 bg-[#ced2dc] rounded"></div>
        </div>
        
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-white/80 backdrop-blur-sm border-2 border-transparent group-hover:border-[#DD1C1A]/20 rounded-3xl transition-all">
          <div className="w-14 h-14 bg-[#2a2522] rounded-2xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform">
            <Icon className="w-6 h-6 text-[#F0C808]" />
          </div>
          <h4 className={`text-xl font-extrabold ${colors.textPrimary} mb-2`}>{title}</h4>
          <p className={`text-sm ${colors.textSecondary} mb-6 max-w-sm font-medium leading-relaxed`}>{teaser}</p>
          <button className={`px-8 py-4 rounded-xl font-extrabold text-sm bg-[#DD1C1A] text-white shadow-lg hover:bg-[#C11715] hover:-translate-y-1 transition-all`}>
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
        <div className={`rounded-[32px] border p-10 md:p-16 flex flex-col justify-center bg-[#2a2522] border-[#2a2522] shadow-2xl relative overflow-hidden mb-8`}>
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
          <div className="relative z-10 text-center max-w-4xl mx-auto">
            <div className={`inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold tracking-widest mb-6 bg-[#086788] text-white shadow-md uppercase`}>
              <ShieldCheck className="w-4 h-4 text-[#F0C808]" />
              Instant Diagnostic Audit
            </div>
            <h2 className={`text-4xl md:text-6xl font-extrabold leading-tight tracking-tighter mb-6 text-[#f2f5fa]`}>
              Why You Keep Chasing <br className="hidden md:block"/>
              <span className="text-[#F0C808] mt-2 block">{profile.archetype || "Analyzing..."}</span>
            </h2>
            <p className="text-xl md:text-2xl text-[#f2f5fa]/90 font-medium italic">
              "{currentArchetype.subtitle}"
            </p>
          </div>
        </div>

        {/* WIDESCREEN FREE PREDICTION & GAUGE GRID */}
        <div className="grid w-full grid-cols-1 lg:grid-cols-3 gap-8 mb-16 items-stretch">
          
          <div className={`lg:col-span-2 rounded-3xl border p-8 md:p-12 flex flex-col h-full ${colors.bgCard} ${colors.borderCard} shadow-lg`}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-[#086788]/10 flex items-center justify-center">
                <Target className="w-6 h-6 text-[#086788]" />
              </div>
              <h3 className={`text-2xl md:text-3xl font-extrabold ${colors.textPrimary}`}>The Brutal Truth</h3>
            </div>
            <p className={`text-lg md:text-xl leading-relaxed ${colors.textSecondary} font-medium`}>
              {currentArchetype.prediction}
            </p>
          </div>

          <div className={`lg:col-span-1 rounded-3xl border p-8 md:p-10 flex flex-col items-center justify-center ${colors.bgCard} ${colors.borderCard} shadow-lg text-center`}>
            <CircularScore 
              value={profile.riskIndex || 0} 
              title="The 'Toxic Magnet' Meter" 
              color={getSeverityColor(profile.riskIndex || 0)} 
              isDarkTheme={false}
            />
            <p className={`mt-8 text-sm font-medium leading-relaxed ${colors.textSecondary}`}>
              This meter shows how likely you are to ignore red flags and fall for someone who will emotionally drain you.
            </p>
          </div>
        </div>

        <h3 className={`text-2xl md:text-3xl font-extrabold ${colors.textPrimary} mb-8 border-b ${colors.borderCard} pb-3`}>
          Your Hidden Blind Spots
        </h3>
        
        <div className="space-y-12 md:space-y-16 w-full">
          
          {/* Card 1: Core Traits -> Subconscious Drivers */}
          <div className="grid w-full grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
            <div className={`rounded-3xl border p-8 md:p-10 flex flex-col h-full ${colors.bgCard} ${colors.borderCard} shadow-lg`}>
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-widest text-[#086788] mb-2 flex items-center gap-2"><EyeOff className="w-4 h-4"/> Your Personality</h4>
                  <h2 className={`text-3xl md:text-4xl font-extrabold ${colors.textPrimary}`}>Subconscious Drivers</h2>
                </div>
              </div>
              <p className="text-sm text-slate-500 font-medium mb-6">These bars show the hidden emotional triggers that secretly control who you fall in love with.</p>
              <div className="space-y-6 mb-8 flex-grow">
                <ScoreBar label="The 'Overthinking' Signal (Volatility)" value={profile.normalizedScores?.Neuroticism || 0} color="bg-[#DD1C1A]" />
                <ScoreBar label="The 'People Pleaser' Signal (Empathy)" value={profile.normalizedScores?.Agreeableness || 0} color="bg-[#086788]" />
                <ScoreBar label="The 'Fear of Leaving' Signal (Anxiety)" value={profile.normalizedScores?.Anxiety || 0} color="bg-[#F0C808]" />
                <ScoreBar label="The 'Push Away' Signal (Avoidance)" value={profile.normalizedScores?.Avoidance || 0} color="bg-[#2a2522]" />
              </div>
            </div>
            
            <CustomLockedCard 
              title="The 'Broken Picker' Diagnosis" 
              teaser="See exactly which toxic personalities you naturally attract, why they target you, and the red flags you keep ignoring." 
              icon={AlertTriangle}
            />
          </div>

          {/* Card 2: Assortative Risk -> Who You Actively Seek */}
          <div className="grid w-full grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
            <div className={`rounded-3xl border p-8 md:p-10 flex flex-col h-full ${colors.bgCard} ${colors.borderCard} shadow-lg`}>
               <div className="flex justify-between items-start mb-8">
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-widest text-[#DD1C1A] mb-2 flex items-center gap-2"><Radio className="w-4 h-4"/> Partner Prediction</h4>
                  <h2 className={`text-3xl md:text-4xl font-extrabold ${colors.textPrimary}`}>Who You Actively Seek</h2>
                </div>
              </div>
              <p className={`${colors.textSecondary} mb-8 leading-relaxed font-medium`}>
                Based on your answers, this is the exact type of toxic behavior your brain is actively searching for in a partner.
              </p>
              <div className="space-y-6 mb-8 flex-grow">
                <ScoreBar label="Attraction to Players & Narcissists" value={profile.normalizedScores?.Machiavellianism || 0} color="bg-[#2a2522]" />
                <ScoreBar label="Attraction to Chaos & Drama" value={profile.normalizedScores?.NegativeAffect || 0} color="bg-[#DD1C1A]" />
                <ScoreBar label="Attraction to Unpredictability" value={profile.normalizedScores?.Disinhibition || 0} color="bg-[#086788]" />
              </div>
            </div>
            
            <CustomLockedCard 
              title="The 'Pattern Breaker' Playbook"  
              teaser="Get the exact, step-by-step instructions to stop chasing chaos and rewire your brain to find safe, secure partners attractive." 
              icon={Target}
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

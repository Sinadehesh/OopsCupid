import React from "react";
import { ScoreBar } from "./ScoreBars";
import UnlockBanner from "./UnlockBanner";
import { ShieldCheck, Lock, Sparkles, Navigation } from "lucide-react";

export default function FriendRoleMasterReport({ profile }: any) {
  const isPremium = profile.premiumUnlocked;

  // Vibrant Happy Palette matching /friends hub
  const colors = {
    bgMain: "bg-[#fafafa]", 
    bgCard: "bg-white",     
    borderCard: "border-[#0D2C54]/10", 
    textPrimary: "text-[#0D2C54]",  
    textSecondary: "text-[#0D2C54]/70",
    accentMain: "#00A6ED",
    accentWarm: "#FFB400",
    accentRed: "#FF495C"
  };

  const ARCHETYPES: Record<string, { subtitle: string, prediction: string, strengths: string, downsides: string }> = {
    "The Leader": {
        subtitle: "You give the group shape and momentum.",
        prediction: "You are the person who gives a group shape. When everyone is stuck in endless 'what should we do?' mode, you move things forward. You often become the unofficial planner, decision-maker, or stabilizer, especially in chaotic moments. Your presence makes the group feel more directed, because people trust you to turn vague ideas into real plans. At your best, you help the group function better and waste less energy.",
        strengths: "Decisive, reliable, initiative-taking, calming in chaos, motivating.",
        downsides: "Can become bossy, overburdened, impatient with indecision, or too responsible for group outcomes."
    },
    "The Therapist": {
        subtitle: "You are the emotional anchor of the group.",
        prediction: "People tend to trust you with the deeper stuff, because you create a sense of safety without demanding attention for yourself. You listen closely, notice what people are feeling beneath the surface, and often know how to respond in a way that makes others feel seen rather than analyzed. In a friend group, this role often becomes the private support system behind the scenes.",
        strengths: "Empathetic, trustworthy, emotionally perceptive, grounded, supportive.",
        downsides: "Emotional burnout, overfunctioning, taking on too much, giving more care than you receive."
    },
    "The Entertainer": {
        subtitle: "You bring lift, movement, and personality to the group.",
        prediction: "You often create the stories everyone remembers later, because you know how to make a moment fun, funny, or emotionally alive. Your humor can break tension, your energy can rescue a dead vibe, and your presence often keeps social situations from becoming flat. At your best, you make people feel lighter, more connected, and more open.",
        strengths: "Funny, charismatic, lively, memorable, mood-lifting.",
        downsides: "Overperforming, avoiding seriousness, joking at the wrong time, needing external reactions too much."
    },
    "The Adventurer": {
        subtitle: "You are the spark that keeps the group from getting stale.",
        prediction: "You push people toward novelty, movement, and stories worth telling. You are often the first to suggest something spontaneous, unusual, or slightly chaotic, and your energy can pull more cautious friends out of autopilot. You help create memories by saying yes faster than most people do. At your best, you make life feel larger and less repetitive.",
        strengths: "Bold, spontaneous, energizing, curious, exciting.",
        downsides: "Impulsive, restless, poor with limits, dismissive of caution, easily bored."
    },
    "The Peacekeeper": {
        subtitle: "You are the regulator of tension.",
        prediction: "You notice when things are about to turn sour, and you often step in before conflict spreads through the whole group. Rather than choosing sides too quickly, you tend to understand emotional context, competing perspectives, and the hidden misunderstandings underneath arguments. You often care more about repair than drama, and that gives the group a sense of stability.",
        strengths: "Fair-minded, calming, diplomatic, emotionally steady, good at repair.",
        downsides: "Avoiding necessary conflict, suppressing your own needs, overmediating, becoming the group’s emotional referee."
    },
    "The Protector": {
        subtitle: "You are the friend people feel safe beside.",
        prediction: "Loyalty is not abstract to you; it shows up in action. You notice disrespect quickly, you care about who is being left out or mistreated, and you are willing to step forward when someone in your circle needs backup. In many groups, this role becomes the line between 'friendly' and 'solid.' You don’t just enjoy your friends; you guard the space around them.",
        strengths: "Loyal, brave, dependable, attentive, protective.",
        downsides: "Defensiveness, territorial behavior, overreacting, difficulty trusting outsiders, possessiveness."
    },
    "The Connector": {
        subtitle: "You are the social glue holding the web together.",
        prediction: "You remember to reach out, you revive fading conversations, and you care about maintaining the web of friendship, not just your one-to-one bonds. You may be the one organizing reunions, including quieter people, remembering birthdays, or noticing when someone is slipping away. You help turn a collection of friends into an actual group with continuity.",
        strengths: "Inclusive, thoughtful, relationship-minded, dependable, socially attentive.",
        downsides: "Overextending, resentment, doing the emotional admin for everyone, taking distance personally."
    },
    "The Lone Wolf": {
        subtitle: "You are part of the group, but not absorbed by it.",
        prediction: "You value friendship, yet you also guard your space, autonomy, and inner world. You are less likely to rely heavily on group energy for your identity or emotional balance, which can make you seem calm, mysterious, independent, or hard to read. You often prefer self-direction over constant closeness, and you may handle problems privately before letting anyone in.",
        strengths: "Independent, self-contained, observant, boundary-aware, steady under social pressure.",
        downsides: "Emotional distance, inconsistency, disappearing acts, difficulty asking for support, seeming unreadable."
    }
  };

  // Handle Hybrids safely
  const isHybrid = profile.archetype.includes("/");
  const primaryKey = isHybrid ? profile.archetype.split(" / ")[0] : profile.archetype;
  const currentArchetype = ARCHETYPES[primaryKey] || ARCHETYPES["The Leader"];

  const CustomLockedCard = ({ title, teaser, iconBg }: any) => {
    if (isPremium) {
      return (
        <div className={`rounded-[32px] border p-8 md:p-10 flex flex-col h-full ${colors.bgCard} ${colors.borderCard} shadow-sm`}>
          <h4 className={`text-sm font-bold uppercase tracking-widest text-[#00A6ED] mb-4 flex items-center gap-2`}>Premium Insight Unlocked</h4>
          <h3 className={`text-2xl font-extrabold ${colors.textPrimary} mb-4`}>{title}</h3>
          <p className={`${colors.textSecondary} leading-relaxed`}>Data unlocked successfully.</p>
        </div>
      );
    }
    return (
      <div className={`relative rounded-[32px] border p-8 md:p-10 flex flex-col h-full overflow-hidden ${colors.bgCard} ${colors.borderCard} group shadow-lg hover:shadow-xl transition-all duration-300`}>
        <div className="filter blur-[6px] opacity-40 select-none">
          <h3 className={`text-2xl font-extrabold ${colors.textPrimary} mb-4`}>{title}</h3>
          <p className={`${colors.textSecondary} leading-relaxed mb-4`}>This section contains deep clinical analysis.</p>
          <div className="w-full h-4 bg-[#0D2C54]/10 rounded mb-2"></div>
          <div className="w-3/4 h-4 bg-[#0D2C54]/10 rounded mb-2"></div>
          <div className="w-5/6 h-4 bg-[#0D2C54]/10 rounded"></div>
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-white/80 backdrop-blur-sm border border-white/20">
          <div className={`w-14 h-14 ${iconBg} rounded-full flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
            <Lock className="w-6 h-6 text-white" />
          </div>
          <h4 className={`text-xl font-extrabold ${colors.textPrimary} mb-2`}>{title}</h4>
          <p className={`text-sm ${colors.textSecondary} mb-6 max-w-sm`}>{teaser}</p>
          <button className={`px-6 py-3 rounded-full font-bold text-sm bg-[#00A6ED] text-white shadow-lg hover:bg-[#008cc9] transition-colors`}>
            Unlock Full Analysis
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className={`py-8 md:py-12 w-full ${colors.bgMain}`}>
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
        
        {/* WIDESCREEN HERO SECTION */}
        <div className={`rounded-[32px] border p-10 md:p-16 flex flex-col justify-center bg-[#FFB400] border-transparent shadow-xl relative overflow-hidden mb-8`}>
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#0D2C54] via-transparent to-transparent"></div>
          <div className="relative z-10 text-center max-w-4xl mx-auto">
            <div className={`inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold tracking-widest mb-6 bg-white/30 text-[#0D2C54] shadow-sm uppercase`}>
              <Sparkles className="w-4 h-4 text-[#0D2C54]" />
              Role Analysis Complete
            </div>
            <h2 className={`text-4xl md:text-6xl font-extrabold leading-none tracking-tighter mb-6 text-[#0D2C54]`}>
              You Are:<br/>
              <span className="text-white drop-shadow-md mt-2 block">{profile.archetype || "Analyzing..."}</span>
            </h2>
            <p className="text-xl md:text-2xl text-[#0D2C54]/80 font-medium">
              {currentArchetype.subtitle}
            </p>
          </div>
        </div>

        {/* FREE PREDICTION GRID */}
        <div className="grid w-full grid-cols-1 lg:grid-cols-3 gap-8 mb-16 items-stretch">
          <div className={`lg:col-span-2 rounded-[32px] border p-8 md:p-12 flex flex-col h-full ${colors.bgCard} ${colors.borderCard} shadow-lg`}>
            <div className="flex items-center gap-3 mb-6">
              <div className={`w-12 h-12 rounded-full bg-[#00A6ED]/10 flex items-center justify-center`}>
                <Navigation className={`w-6 h-6 text-[#00A6ED]`} />
              </div>
              <h3 className={`text-2xl md:text-3xl font-extrabold ${colors.textPrimary}`}>How You Navigate the Group</h3>
            </div>
            <p className={`text-lg md:text-xl leading-relaxed ${colors.textSecondary}`}>
              {currentArchetype.prediction}
            </p>
            {isHybrid && (
               <p className={`text-lg md:text-xl leading-relaxed mt-4 font-bold text-[#FF495C]`}>
                 *Note: You scored as a rare Hybrid. You effortlessly switch between these two distinct roles depending on what the group needs in the moment.
               </p>
            )}
          </div>

          <div className={`lg:col-span-1 rounded-[32px] border p-8 md:p-10 flex flex-col h-full ${colors.bgCard} ${colors.borderCard} shadow-lg`}>
             <h3 className={`text-xl font-extrabold ${colors.textPrimary} mb-6 border-b pb-4`}>Your Trait Breakdown</h3>
             
             <div className="mb-6">
               <h4 className="text-xs font-bold uppercase tracking-widest text-[#43B929] mb-2">Your Superpowers</h4>
               <p className="text-sm text-[#0D2C54]/80 font-medium leading-relaxed">{currentArchetype.strengths}</p>
             </div>

             <div>
               <h4 className="text-xs font-bold uppercase tracking-widest text-[#FF495C] mb-2">Your Blind Spots</h4>
               <p className="text-sm text-[#0D2C54]/80 font-medium leading-relaxed">{currentArchetype.downsides}</p>
             </div>
          </div>
        </div>

        <h3 className={`text-2xl md:text-3xl font-extrabold ${colors.textPrimary} mb-8 border-b ${colors.borderCard} pb-3`}>
          Your Top 3 Dominant Behaviors
        </h3>
        
        <div className="space-y-12 md:space-y-16 w-full">
          <div className="grid w-full grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
            <div className={`rounded-[32px] border p-8 md:p-10 flex flex-col h-full ${colors.bgCard} ${colors.borderCard} shadow-lg`}>
              <div className="space-y-6 mb-8 flex-grow mt-4">
                {profile.topTraits && profile.topTraits.map((trait: any, i: number) => {
                   const colorsArr = ["bg-[#00A6ED]", "bg-[#FFB400]", "bg-[#FF495C]"];
                   return (
                     <ScoreBar key={trait.name} label={trait.name} value={trait.score} color={colorsArr[i]} />
                   )
                })}
              </div>
            </div>
            <CustomLockedCard title="The Resentment Trap" teaser="Discover the specific way your role is secretly draining you, and why you feel under-appreciated by the group." iconBg="bg-[#FF495C]" />
          </div>

          <div className="grid w-full grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
             <CustomLockedCard title="How Others Secretly View You"  teaser="Unlock the unfiltered reality of how your friends interpret your actions when you aren't in the room." iconBg="bg-[#00A6ED]" />
             <CustomLockedCard title="The Evolution Blueprint"  teaser="Concrete steps to step out of the box they put you in, set boundaries, and redefine your role without losing your friends." iconBg="bg-[#FFB400]" />
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

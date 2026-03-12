import React from "react";
import { ScoreBar } from "./ScoreBars";
import UnlockBanner from "./UnlockBanner";
import { ShieldCheck, Lock, Sparkles, Navigation } from "lucide-react";

export default function FriendRoleMasterReport({ profile }: any) {
  const isPremium = profile.premiumUnlocked;

  // Vibrant Happy Palette
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

  // 12-ARCHETYPE DICTIONARY EXPANDED FOR VIRALITY
  const ARCHETYPES: Record<string, { subtitle: string, prediction: string, strengths: string, downsides: string, experience: string }> = {
    "The Leader": {
        subtitle: "You give the group shape and momentum.",
        prediction: "You are the person who gives a group shape. When everyone is stuck in endless 'what should we do?' mode, you move things forward. You often become the unofficial planner, decision-maker, or stabilizer, especially in chaotic moments. Your presence makes the group feel more directed, because people trust you to turn vague ideas into real plans.",
        strengths: "Decisive, reliable, initiative-taking, calming in chaos.",
        downsides: "Can become bossy, overburdened, or impatient with indecision.",
        experience: "Your friends often look to you first when plans need to be made or decisions are stalled."
    },
    "The Therapist": {
        subtitle: "You are the emotional anchor of the group.",
        prediction: "People tend to trust you with the deeper stuff, because you create a sense of safety without demanding attention for yourself. You listen closely, notice what people are feeling beneath the surface, and often know how to respond in a way that makes others feel seen rather than analyzed. You are the private support system behind the scenes.",
        strengths: "Emotionally supportive, great listener, reliable during crises.",
        downsides: "Emotional exhaustion, friends relying too heavily on you, difficulty setting boundaries.",
        experience: "Your friends often come to you first when something serious happens or they need to vent."
    },
    "The Entertainer": {
        subtitle: "You bring lift, movement, and personality to the group.",
        prediction: "You often create the stories everyone remembers later, because you know how to make a moment fun, funny, or emotionally alive. Your humor can break tension, your energy can rescue a dead vibe, and your presence often keeps social situations from becoming flat. At your best, you make people feel lighter and more connected.",
        strengths: "Funny, charismatic, lively, memorable.",
        downsides: "Overperforming, avoiding seriousness, needing external validation.",
        experience: "Your friends expect you to bring the energy and keep hangouts from feeling boring."
    },
    "The Adventurer": {
        subtitle: "You are the spark that keeps the group from getting stale.",
        prediction: "You push people toward novelty, movement, and stories worth telling. You are often the first to suggest something spontaneous, unusual, or slightly chaotic, and your energy can pull more cautious friends out of autopilot. You help create memories by saying yes faster than most people do.",
        strengths: "Bold, spontaneous, energizing, curious.",
        downsides: "Impulsive, restless, poor with limits, easily bored.",
        experience: "Your friends rely on you to get them out of their comfort zones and try new things."
    },
    "The Peacekeeper": {
        subtitle: "You are the regulator of group tension.",
        prediction: "You notice when things are about to turn sour, and you often step in before conflict spreads through the whole group. Rather than choosing sides too quickly, you tend to understand emotional context, competing perspectives, and the hidden misunderstandings underneath arguments. You care more about repair than drama.",
        strengths: "Fair-minded, calming, diplomatic, good at repair.",
        downsides: "Avoiding necessary conflict, suppressing your own needs, overmediating.",
        experience: "Your friends trust you to mediate drama and keep the group harmony intact."
    },
    "The Protector": {
        subtitle: "You are the friend people feel safe beside.",
        prediction: "Loyalty is not abstract to you; it shows up in action. You notice disrespect quickly, you care about who is being left out or mistreated, and you are willing to step forward when someone in your circle needs backup. In many groups, this role becomes the line between 'friendly' and 'solid.'",
        strengths: "Loyal, brave, dependable, highly attentive.",
        downsides: "Defensiveness, territorial behavior, overreacting to perceived slights.",
        experience: "Your friends know you have their back no matter what, especially in public."
    },
    "The Connector": {
        subtitle: "You are the social glue holding the web together.",
        prediction: "You remember to reach out, you revive fading conversations, and you care about maintaining the web of friendship, not just your one-to-one bonds. You may be the one organizing reunions, including quieter people, remembering birthdays, or noticing when someone is slipping away.",
        strengths: "Inclusive, thoughtful, relationship-minded, dependable.",
        downsides: "Overextending, doing the emotional admin for everyone, taking distance personally.",
        experience: "Your friends count on you to keep the group chat alive and organize the reunions."
    },
    "The Wild Card": {
        subtitle: "You bring a thrilling element of unpredictability.",
        prediction: "You combine high energy with a complete willingness to go off script. You keep the group guessing in the best way possible. While others follow the standard routine, you introduce random ideas, bizarre humor, and unexpected twists that turn a standard Friday night into an adventure.",
        strengths: "Spontaneous, hilarious, highly adaptable, intensely fun.",
        downsides: "Inconsistent, sometimes unreliable, creates occasional messes.",
        experience: "Your friends never know exactly what you'll do next, but they know it will be memorable."
    },
    "The Observer": {
        subtitle: "You are the quiet genius reading the room.",
        prediction: "You might not be the loudest person in the room, but you see absolutely everything. You pick up on shifting dynamics, hidden tensions, and unspoken feelings faster than anyone else. Because you spend more time watching than performing, your insights into the group are usually spot-on.",
        strengths: "Highly perceptive, thoughtful, extremely accurate reads on people.",
        downsides: "Can seem detached, might withhold valuable input to avoid the spotlight.",
        experience: "Your friends are often amazed by the subtle details and dynamics you notice that everyone else missed."
    },
    "The Lone Wolf": {
        subtitle: "You are part of the group, but not absorbed by it.",
        prediction: "You value friendship, yet you also guard your space, autonomy, and inner world. You are less likely to rely heavily on group energy for your identity or emotional balance. You often prefer self-direction over constant closeness, and you may handle problems privately before letting anyone in.",
        strengths: "Independent, self-contained, boundary-aware, steady under pressure.",
        downsides: "Emotional distance, disappearing acts, seeming unreadable.",
        experience: "Your friends love when you are around, but respect that you often need to retreat and recharge on your own."
    },
    "The Chaos Friend": {
        subtitle: "You are a lovable tornado of fun and mild disaster.",
        prediction: "You prioritize the thrill of the moment over long-term logistics. You attract crazy situations, funny stories, and a bit of drama. You push boundaries and refuse to live a boring life, which makes you incredibly magnetic, even if you occasionally need your more responsible friends to help you navigate the fallout.",
        strengths: "Extremely entertaining, zero judgment, up for absolutely anything.",
        downsides: "Requires 'babysitting' sometimes, unpredictable, low conflict-resolution skills.",
        experience: "Your friends love your crazy stories, but sometimes feel like they have to keep you out of trouble."
    },
    "The Overachiever": {
        subtitle: "You are the ambitious standard-setter of the group.",
        prediction: "You bring an intense, goal-oriented energy to your friendships. Whether it's securing an impossible dinner reservation, mapping out an aggressive travel itinerary, or pushing your friends to level up in their careers, you treat the group's success as your own project.",
        strengths: "Driven, organized, highly competent, inspiring.",
        downsides: "Can project high expectations onto others, struggles to just 'chill'.",
        experience: "Your friends admire your drive and usually let you take the wheel on complex plans."
    }
  };

  const currentArchetype = ARCHETYPES[profile.primaryArchetype] || ARCHETYPES["The Leader"];

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
            <h2 className={`text-4xl md:text-6xl font-extrabold leading-none tracking-tighter mb-4 text-[#0D2C54]`}>
              You Are:<br/>
              <span className="text-white drop-shadow-md mt-2 block">{profile.primaryArchetype || "Analyzing..."}</span>
            </h2>
            
            {profile.secondaryArchetype && (
              <div className="inline-block bg-white/20 backdrop-blur-sm border border-white/40 px-6 py-2 rounded-full mt-4 shadow-sm">
                <p className="text-sm font-extrabold text-[#0D2C54] uppercase tracking-wide">
                  Secondary Role: <span className="text-white">{profile.secondaryArchetype}</span>
                </p>
              </div>
            )}
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
            <p className={`text-lg md:text-xl leading-relaxed ${colors.textSecondary} mb-8`}>
              {currentArchetype.prediction}
            </p>

            {/* NEW EXPERIENTIAL INSIGHT */}
            <div className="mt-auto bg-[#fafafa] border border-[#0D2C54]/10 rounded-2xl p-6">
               <h4 className="text-xs font-bold uppercase tracking-widest text-[#00A6ED] mb-2">How Friends Experience You</h4>
               <p className="text-base text-[#0D2C54] font-medium leading-relaxed italic">"{currentArchetype.experience}"</p>
            </div>
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

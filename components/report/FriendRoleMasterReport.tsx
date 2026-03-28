"use client";
import React, { useEffect, useRef } from "react";
import { ShieldCheck, Lock, Sparkles, Navigation, Users, Zap, Eye, Heart, Flame, Brain, Star, TrendingUp, AlertTriangle, CheckCircle } from "lucide-react";
import Link from "next/link";

// ─── TYPES ────────────────────────────────────────────────────────────────────
interface Trait { name: string; score: number; }
interface Profile {
  primaryArchetype: string;
  secondaryArchetype: string;
  topTraits: Trait[];
  normalizedScores: Record<string, number>;
  premiumUnlocked?: boolean;
}

// ─── SUBSCALE META ────────────────────────────────────────────────────────────
const SUBSCALE_META: Record<string, { icon: React.ReactNode; color: string; low: string; high: string; label: string }> = {
  "Social Leadership":   { icon: <Navigation className="w-5 h-5" />, color: "#00A6ED", low: "You prefer to follow and support rather than steer.", high: "You naturally take charge and move the group forward.", label: "Social Leadership" },
  "Emotional Support":   { icon: <Heart className="w-5 h-5" />, color: "#FF6B9D", low: "You are less emotionally focused in your friendships.", high: "You are a deeply empathetic, emotionally present friend.", label: "Emotional Support" },
  "Humor & Entertainment": { icon: <Flame className="w-5 h-5" />, color: "#FF9500", low: "You bring calm and grounded energy over humor.", high: "You are a natural entertainer who lights up the room.", label: "Humor & Entertainment" },
  "Adventure & Risk":    { icon: <Zap className="w-5 h-5" />, color: "#FFB400", low: "You prefer stability and routine over risk-taking.", high: "You crave novelty and push others toward bold experiences.", label: "Adventure & Risk" },
  "Conflict Mediation":  { icon: <ShieldCheck className="w-5 h-5" />, color: "#43B929", low: "You avoid drama but may not actively resolve it.", high: "You are the natural mediator who repairs group tension.", label: "Conflict Mediation" },
  "Observational Insight": { icon: <Eye className="w-5 h-5" />, color: "#9B59B6", low: "You engage more than you observe.", high: "You read people and rooms with uncanny precision.", label: "Observational Insight" },
  "Independence":        { icon: <Star className="w-5 h-5" />, color: "#E74C3C", low: "You thrive on group connection and shared identity.", high: "You maintain strong boundaries and self-direction.", label: "Independence" },
  "Loyalty & Protection": { icon: <ShieldCheck className="w-5 h-5" />, color: "#2ECC71", low: "Your loyalty is selective and earned over time.", high: "You are fiercely loyal and would go to the mat for your friends.", label: "Loyalty & Protection" },
  "Attention & Spotlight": { icon: <Star className="w-5 h-5" />, color: "#F39C12", low: "You are comfortable in the background.", high: "You are drawn to the center of social energy.", label: "Attention & Spotlight" },
  "Social Glue":         { icon: <Users className="w-5 h-5" />, color: "#1ABC9C", low: "You maintain a few close bonds rather than the whole web.", high: "You are the invisible thread holding the entire group together.", label: "Social Glue" },
};

// ─── ARCHETYPE DATA ───────────────────────────────────────────────────────────
const ARCHETYPES: Record<string, {
  subtitle: string; prediction: string; strengths: string[]; downsides: string[];
  experience: string; compatibleWith: string[]; challengedBy: string[];
  socialEnergy: number; rarity: string;
}> = {
  "The Leader": {
    subtitle: "You give the group shape and momentum.",
    prediction: "You are the person who gives a group shape. When everyone is stuck in endless 'what should we do?' mode, you move things forward. You often become the unofficial planner, decision-maker, or stabilizer, especially in chaotic moments. Your presence makes the group feel more directed — people trust you to turn vague ideas into real plans.",
    strengths: ["Decisive and initiative-taking", "Calming in chaos", "Turns ideas into action", "People trust your judgment"],
    downsides: ["Can become bossy or overbearing", "Impatient with indecision", "Takes on too much responsibility", "Resents being under-appreciated"],
    experience: "Your friends look to you first when plans stall or decisions need to be made.",
    compatibleWith: ["The Therapist", "The Connector", "The Peacekeeper"],
    challengedBy: ["The Lone Wolf", "The Chaos Friend", "The Wild Card"],
    socialEnergy: 85, rarity: "Top 12%"
  },
  "The Therapist": {
    subtitle: "You are the emotional anchor of the group.",
    prediction: "People tend to trust you with the deeper stuff, because you create a sense of safety without demanding attention for yourself. You listen closely, notice what people are feeling beneath the surface, and often know how to respond in a way that makes others feel seen rather than analyzed. You are the private support system behind the scenes.",
    strengths: ["Deeply empathetic listener", "Creates emotional safety", "Reliable in crises", "Sees beneath the surface"],
    downsides: ["Emotional exhaustion is constant", "Friends rely too heavily on you", "Difficulty setting boundaries", "Your own needs go unaddressed"],
    experience: "Your friends come to you first when something serious happens or they need to vent.",
    compatibleWith: ["The Leader", "The Connector", "The Protector"],
    challengedBy: ["The Entertainer", "The Wild Card", "The Chaos Friend"],
    socialEnergy: 60, rarity: "Top 18%"
  },
  "The Entertainer": {
    subtitle: "You bring lift, movement, and personality.",
    prediction: "You often create the stories everyone remembers later, because you know how to make a moment fun, funny, or emotionally alive. Your humor can break tension, your energy can rescue a dead vibe, and your presence often keeps social situations from becoming flat. At your best, you make people feel lighter and more connected.",
    strengths: ["Charismatic and magnetic", "Breaks tension effortlessly", "Creates memorable moments", "Makes others feel alive"],
    downsides: ["Overperforming when anxious", "Avoids serious conversation", "Craves external validation", "Hard to see beneath the performance"],
    experience: "Your friends expect you to bring the energy and rescue boring hangouts.",
    compatibleWith: ["The Adventurer", "The Wild Card", "The Observer"],
    challengedBy: ["The Lone Wolf", "The Therapist", "The Peacekeeper"],
    socialEnergy: 92, rarity: "Top 9%"
  },
  "The Adventurer": {
    subtitle: "You are the spark that keeps the group from getting stale.",
    prediction: "You push people toward novelty, movement, and stories worth telling. You are often the first to suggest something spontaneous, unusual, or slightly chaotic, and your energy can pull more cautious friends out of autopilot. You help create memories by saying yes faster than most people do.",
    strengths: ["Bold and spontaneous", "Pulls others out of routine", "Energizing in slow moments", "Creates stories worth telling"],
    downsides: ["Impulsive with consequences", "Easily bored by routine", "Pushes limits others aren't ready for", "Can leave others feeling exhausted"],
    experience: "Your friends rely on you to get them out of their comfort zone.",
    compatibleWith: ["The Entertainer", "The Wild Card", "The Leader"],
    challengedBy: ["The Peacekeeper", "The Therapist", "The Observer"],
    socialEnergy: 88, rarity: "Top 15%"
  },
  "The Peacekeeper": {
    subtitle: "You are the regulator of group tension.",
    prediction: "You notice when things are about to turn sour, and you often step in before conflict spreads through the whole group. Rather than choosing sides too quickly, you tend to understand emotional context, competing perspectives, and the hidden misunderstandings underneath arguments. You care more about repair than drama.",
    strengths: ["Fair-minded and diplomatic", "Calms group tension quickly", "Great at emotional repair", "Sees all perspectives"],
    downsides: ["Avoids necessary confrontation", "Suppresses your own needs", "Over-mediates minor issues", "Can seem passive"],
    experience: "Your friends trust you to mediate drama without taking sides.",
    compatibleWith: ["The Connector", "The Therapist", "The Leader"],
    challengedBy: ["The Chaos Friend", "The Wild Card", "The Protector"],
    socialEnergy: 58, rarity: "Top 14%"
  },
  "The Protector": {
    subtitle: "You are the friend people feel safe beside.",
    prediction: "Loyalty is not abstract to you — it shows up in action. You notice disrespect quickly, you care about who is being left out or mistreated, and you are willing to step forward when someone in your circle needs backup. In many groups, this role becomes the line between 'friendly' and 'solid.'",
    strengths: ["Fiercely loyal", "Defends the group publicly", "Deeply reliable in a crisis", "Notices who is excluded"],
    downsides: ["Defensiveness that escalates", "Territorial over people you love", "Overreacts to small slights", "Hard to back down from conflict"],
    experience: "Your friends know you have their back, no matter what.",
    compatibleWith: ["The Therapist", "The Leader", "The Connector"],
    challengedBy: ["The Lone Wolf", "The Observer", "The Wild Card"],
    socialEnergy: 72, rarity: "Top 16%"
  },
  "The Connector": {
    subtitle: "You are the social glue holding the web together.",
    prediction: "You remember to reach out, you revive fading conversations, and you care about maintaining the web of friendship — not just your one-to-one bonds. You may be the one organizing reunions, including quieter people, remembering birthdays, or noticing when someone is slipping away.",
    strengths: ["Inclusive and thoughtful", "Maintains the whole friend web", "Revives fading connections", "Makes everyone feel seen"],
    downsides: ["Does everyone's emotional admin", "Takes distance personally", "Overextends and burns out", "Never gets that energy back"],
    experience: "Your friends count on you to keep the group alive and organized.",
    compatibleWith: ["The Leader", "The Therapist", "The Peacekeeper"],
    challengedBy: ["The Lone Wolf", "The Wild Card", "The Chaos Friend"],
    socialEnergy: 75, rarity: "Top 11%"
  },
  "The Wild Card": {
    subtitle: "You bring thrilling unpredictability.",
    prediction: "You combine high energy with a complete willingness to go off script. You keep the group guessing in the best possible way. While others follow the standard routine, you introduce random ideas, bizarre humor, and unexpected twists that turn a standard Friday night into an adventure.",
    strengths: ["Hilariously unpredictable", "Goes off-script brilliantly", "Intensely fun to be around", "Injects life into boring moments"],
    downsides: ["Inconsistent and unreliable", "Creates occasional chaos", "Hard to plan with", "May be liked more than understood"],
    experience: "Your friends never know what you'll do next, but they know it'll be memorable.",
    compatibleWith: ["The Entertainer", "The Adventurer", "The Chaos Friend"],
    challengedBy: ["The Leader", "The Peacekeeper", "The Observer"],
    socialEnergy: 90, rarity: "Top 8%"
  },
  "The Observer": {
    subtitle: "You are the quiet genius reading the room.",
    prediction: "You might not be the loudest person in the room, but you see absolutely everything. You pick up on shifting dynamics, hidden tensions, and unspoken feelings faster than anyone else. Because you spend more time watching than performing, your insights into the group are usually spot-on.",
    strengths: ["Reads people and rooms precisely", "Holds the most accurate view", "Deep insight when you speak", "Trusted with real secrets"],
    downsides: ["Can seem detached or cold", "Withholds insights to stay safe", "Underestimated constantly", "Lonely inside the group"],
    experience: "Your friends are stunned by the dynamics you notice that everyone else missed.",
    compatibleWith: ["The Therapist", "The Entertainer", "The Leader"],
    challengedBy: ["The Entertainer", "The Chaos Friend", "The Wild Card"],
    socialEnergy: 35, rarity: "Top 7%"
  },
  "The Lone Wolf": {
    subtitle: "You are part of the group, but not absorbed by it.",
    prediction: "You value friendship, yet you also guard your space, autonomy, and inner world. You are less likely to rely heavily on group energy for your identity or emotional balance. You often prefer self-direction over constant closeness, and you may handle problems privately before letting anyone in.",
    strengths: ["Deeply self-contained", "Clear personal boundaries", "Steady under pressure", "Honest about your needs"],
    downsides: ["Emotional distance confuses people", "Disappears without warning", "Hard to read and reach", "Friends feel kept at arm's length"],
    experience: "Your friends love when you're present, but accept when you need to retreat.",
    compatibleWith: ["The Observer", "The Adventurer", "The Overachiever"],
    challengedBy: ["The Connector", "The Therapist", "The Protector"],
    socialEnergy: 28, rarity: "Top 10%"
  },
  "The Chaos Friend": {
    subtitle: "A lovable tornado of fun and mild disaster.",
    prediction: "You prioritize the thrill of the moment over long-term logistics. You attract crazy situations, funny stories, and a bit of drama. You push boundaries and refuse to live a boring life, which makes you incredibly magnetic, even if you occasionally need your more responsible friends to help you navigate the fallout.",
    strengths: ["Zero judgment, maximum fun", "Up for absolutely anything", "Magnetic in a room", "Your stories are legendary"],
    downsides: ["Needs occasional 'babysitting'", "Low conflict-resolution skills", "Leaves messes behind", "Unreliable for serious moments"],
    experience: "Your friends love your stories, but sometimes feel like they have to keep you out of trouble.",
    compatibleWith: ["The Wild Card", "The Entertainer", "The Adventurer"],
    challengedBy: ["The Leader", "The Peacekeeper", "The Observer"],
    socialEnergy: 95, rarity: "Top 6%"
  },
  "The Overachiever": {
    subtitle: "The ambitious standard-setter of the group.",
    prediction: "You bring an intense, goal-oriented energy to your friendships. Whether it's securing an impossible dinner reservation, mapping out an aggressive travel itinerary, or pushing your friends to level up in their careers, you treat the group's success as your own project.",
    strengths: ["Driven and highly organized", "Inspires others to aim higher", "Executes complex plans", "Reliable under pressure"],
    downsides: ["Projects expectations onto others", "Struggles to just 'chill'", "Makes others feel behind", "Defines friendship through productivity"],
    experience: "Your friends admire your drive and let you take the wheel on complex plans.",
    compatibleWith: ["The Leader", "The Adventurer", "The Lone Wolf"],
    challengedBy: ["The Chaos Friend", "The Wild Card", "The Therapist"],
    socialEnergy: 80, rarity: "Top 13%"
  }
};

// ─── RADAR CHART ──────────────────────────────────────────────────────────────
function RadarChart({ scores }: { scores: Record<string, number> }) {
  const keys = Object.keys(SUBSCALE_META).filter(k => scores[k] !== undefined);
  const n = keys.length;
  if (n < 3) return null;
  const cx = 160; const cy = 160; const r = 120;
  const points = keys.map((_, i) => {
    const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
    return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
  });
  const dataPoints = keys.map((k, i) => {
    const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
    const pct = (scores[k] || 0) / 100;
    return { x: cx + r * pct * Math.cos(angle), y: cy + r * pct * Math.sin(angle) };
  });
  const polygon = dataPoints.map(p => `${p.x},${p.y}`).join(" ");
  // Grid rings
  const rings = [0.25, 0.5, 0.75, 1].map(pct => {
    const ps = keys.map((_, i) => {
      const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
      return `${cx + r * pct * Math.cos(angle)},${cy + r * pct * Math.sin(angle)}`;
    }).join(" ");
    return ps;
  });
  return (
    <svg viewBox="0 0 320 320" className="w-full max-w-xs mx-auto" style={{ overflow: "visible" }}>
      {/* Grid */}
      {rings.map((ps, i) => (
        <polygon key={i} points={ps} fill="none" stroke="#0D2C54" strokeOpacity={0.08} strokeWidth={1} />
      ))}
      {/* Spokes */}
      {points.map((p, i) => (
        <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke="#0D2C54" strokeOpacity={0.1} strokeWidth={1} />
      ))}
      {/* Fill */}
      <polygon points={polygon} fill="#00A6ED" fillOpacity={0.18} stroke="#00A6ED" strokeWidth={2.5} strokeLinejoin="round" />
      {/* Dots */}
      {dataPoints.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={4} fill="#00A6ED" />
      ))}
      {/* Labels */}
      {points.map((p, i) => {
        const key = keys[i];
        const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
        const lx = cx + (r + 22) * Math.cos(angle);
        const ly = cy + (r + 22) * Math.sin(angle);
        const short = key.split(" ").slice(0, 2).join(" ");
        return (
          <text key={i} x={lx} y={ly} textAnchor="middle" dominantBaseline="middle"
            fill="#0D2C54" fontSize={9} fontWeight={700} opacity={0.7}>
            {short}
          </text>
        );
      })}
    </svg>
  );
}

// ─── SCORE BAR ────────────────────────────────────────────────────────────────
function ScoreBar({ label, value, color, description }: { label: string; value: number; color: string; description?: string }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-bold text-[#0D2C54]">{label}</span>
        <span className="text-sm font-black" style={{ color }}>{value}%</span>
      </div>
      <div className="w-full h-2.5 rounded-full bg-[#0D2C54]/8 overflow-hidden mb-1">
        <div className="h-full rounded-full transition-all duration-700" style={{ width: `${value}%`, backgroundColor: color }} />
      </div>
      {description && <p className="text-xs text-[#0D2C54]/55 font-medium">{description}</p>}
    </div>
  );
}

// ─── SOCIAL ENERGY METER ─────────────────────────────────────────────────────
function EnergyMeter({ value }: { value: number }) {
  const label = value >= 80 ? "Extrovert" : value >= 55 ? "Ambivert" : value >= 35 ? "Social Introvert" : "Deep Introvert";
  const desc = value >= 80
    ? "You recharge through people. Groups energize you."
    : value >= 55
    ? "You enjoy groups but need periodic alone-time."
    : value >= 35
    ? "You're selective — close friends only."
    : "Solitude is your default recharge mode.";
  const grad = value >= 70 ? "from-[#FFB400] to-[#FF6B35]" : value >= 45 ? "from-[#00A6ED] to-[#00D4AA]" : "from-[#9B59B6] to-[#6C3483]";
  return (
    <div className="bg-white border border-[#0D2C54]/10 rounded-2xl p-6 shadow-sm">
      <p className="text-xs font-black uppercase tracking-widest text-[#0D2C54]/50 mb-3">Social Energy Profile</p>
      <div className="flex items-end gap-4 mb-4">
        <span className="text-5xl font-black text-[#0D2C54]">{value}</span>
        <div>
          <p className="text-lg font-extrabold text-[#0D2C54]">{label}</p>
          <p className="text-xs text-[#0D2C54]/55 font-medium">{desc}</p>
        </div>
      </div>
      <div className="w-full h-3 rounded-full bg-[#0D2C54]/8 overflow-hidden">
        <div className={`h-full rounded-full bg-gradient-to-r ${grad} transition-all duration-1000`} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

// ─── LOCKED CARD ──────────────────────────────────────────────────────────────
function LockedCard({ title, teaser, iconColor, href }: { title: string; teaser: string; iconColor: string; href: string }) {
  return (
    <Link href={href}
      className="relative rounded-[28px] border border-[#0D2C54]/10 p-8 flex flex-col overflow-hidden bg-white group shadow hover:shadow-lg transition-all duration-300 cursor-pointer min-h-[220px]">
      <div className="filter blur-sm opacity-30 select-none pointer-events-none">
        <div className="w-full h-4 bg-[#0D2C54]/15 rounded mb-2" />
        <div className="w-3/4 h-4 bg-[#0D2C54]/10 rounded mb-2" />
        <div className="w-5/6 h-4 bg-[#0D2C54]/10 rounded" />
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-12 h-12 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-md" style={{ backgroundColor: iconColor }}>
          <Lock className="w-5 h-5 text-white" />
        </div>
        <h4 className="text-lg font-extrabold text-[#0D2C54] mb-2">{title}</h4>
        <p className="text-sm text-[#0D2C54]/60 mb-5 max-w-xs leading-relaxed">{teaser}</p>
        <span className="px-5 py-2.5 rounded-full font-bold text-sm text-white shadow group-hover:brightness-110 transition-all" style={{ backgroundColor: iconColor }}>
          Unlock →
        </span>
      </div>
    </Link>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function FriendRoleMasterReport({ profile }: { profile: Profile }) {
  const archData = ARCHETYPES[profile.primaryArchetype] || ARCHETYPES["The Leader"];
  const scores = profile.normalizedScores || {};

  // Persist to localStorage for premium pages
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("friend_role_result", JSON.stringify(profile));
    }
  }, [profile]);

  // Build sorted subscale list
  const sortedScores = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const topScore = sortedScores[0];
  const bottomScore = sortedScores[sortedScores.length - 1];

  return (
    <div className="py-8 md:py-12 w-full bg-[#f7f8fa]">
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 md:px-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">

        {/* ═══════════════════════════════════════════════════════
            HERO
        ═══════════════════════════════════════════════════════ */}
        <div className="rounded-[32px] bg-[#FFB400] p-10 md:p-16 text-center shadow-xl relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_60%_40%,_#fff,_transparent)]" />
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-widest mb-5 bg-black/10 text-[#0D2C54] uppercase">
              <Sparkles className="w-4 h-4" /> Analysis Complete · {archData.rarity} of people
            </div>
            <h1 className="text-4xl md:text-6xl font-black leading-none tracking-tighter text-[#0D2C54] mb-3">
              You Are<br />
              <span className="text-white drop-shadow">{profile.primaryArchetype}</span>
            </h1>
            <p className="text-lg font-bold text-[#0D2C54]/80 mb-5">{archData.subtitle}</p>
            {profile.secondaryArchetype && (
              <div className="inline-block bg-white/25 border border-white/40 px-5 py-2 rounded-full">
                <span className="text-sm font-extrabold text-[#0D2C54] uppercase tracking-wide">
                  Secondary role: <span className="text-white">{profile.secondaryArchetype}</span>
                </span>
              </div>
            )}
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════
            ROW 1: Prediction + Energy Meter
        ═══════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white border border-[#0D2C54]/10 rounded-[28px] p-8 md:p-10 shadow">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-full bg-[#00A6ED]/10 flex items-center justify-center">
                <Navigation className="w-5 h-5 text-[#00A6ED]" />
              </div>
              <h2 className="text-2xl font-extrabold text-[#0D2C54]">How You Navigate the Group</h2>
            </div>
            <p className="text-lg leading-relaxed text-[#0D2C54]/80 mb-6">{archData.prediction}</p>
            <div className="bg-[#f7f8fa] rounded-2xl p-5 border border-[#0D2C54]/8">
              <p className="text-xs font-black uppercase tracking-widest text-[#00A6ED] mb-2">How Friends Experience You</p>
              <p className="text-base text-[#0D2C54] font-semibold italic">"{archData.experience}"</p>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {/* Energy Meter */}
            <EnergyMeter value={archData.socialEnergy} />
            {/* Rarity Badge */}
            <div className="bg-white border border-[#0D2C54]/10 rounded-2xl p-6 shadow-sm text-center">
              <p className="text-xs font-black uppercase tracking-widest text-[#0D2C54]/50 mb-2">How Rare is Your Type?</p>
              <p className="text-4xl font-black text-[#FFB400] mb-1">{archData.rarity}</p>
              <p className="text-xs text-[#0D2C54]/55 font-medium">of people share your primary role</p>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════
            ROW 2: Radar Chart + Strengths/Downsides
        ═══════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Radar */}
          <div className="bg-white border border-[#0D2C54]/10 rounded-[28px] p-8 shadow">
            <h2 className="text-xl font-extrabold text-[#0D2C54] mb-6">Your Psychological Trait Map</h2>
            <RadarChart scores={scores} />
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="bg-[#00A6ED]/8 rounded-xl p-3 text-center">
                <p className="text-xs font-black text-[#00A6ED] uppercase tracking-wider mb-1">Highest Trait</p>
                <p className="text-sm font-extrabold text-[#0D2C54]">{topScore?.[0]}</p>
                <p className="text-lg font-black text-[#00A6ED]">{topScore?.[1]}%</p>
              </div>
              <div className="bg-[#FF495C]/8 rounded-xl p-3 text-center">
                <p className="text-xs font-black text-[#FF495C] uppercase tracking-wider mb-1">Growth Zone</p>
                <p className="text-sm font-extrabold text-[#0D2C54]">{bottomScore?.[0]}</p>
                <p className="text-lg font-black text-[#FF495C]">{bottomScore?.[1]}%</p>
              </div>
            </div>
          </div>

          {/* Strengths + Downsides */}
          <div className="bg-white border border-[#0D2C54]/10 rounded-[28px] p-8 shadow flex flex-col gap-6">
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-[#43B929] mb-4 flex items-center gap-2">
                <CheckCircle className="w-4 h-4" /> Your Superpowers
              </p>
              <ul className="space-y-2.5">
                {archData.strengths.map((s, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-1 w-5 h-5 rounded-full bg-[#43B929]/15 flex items-center justify-center shrink-0">
                      <CheckCircle className="w-3 h-3 text-[#43B929]" />
                    </span>
                    <span className="text-sm font-semibold text-[#0D2C54]/85">{s}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="border-t border-[#0D2C54]/8 pt-6">
              <p className="text-xs font-black uppercase tracking-widest text-[#FF495C] mb-4 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" /> Your Blind Spots
              </p>
              <ul className="space-y-2.5">
                {archData.downsides.map((d, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-1 w-5 h-5 rounded-full bg-[#FF495C]/15 flex items-center justify-center shrink-0">
                      <AlertTriangle className="w-3 h-3 text-[#FF495C]" />
                    </span>
                    <span className="text-sm font-semibold text-[#0D2C54]/85">{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════
            ROW 3: All Subscale Bars
        ═══════════════════════════════════════════════════════ */}
        <div className="bg-white border border-[#0D2C54]/10 rounded-[28px] p-8 md:p-10 shadow">
          <h2 className="text-xl font-extrabold text-[#0D2C54] mb-2">Full Trait Breakdown</h2>
          <p className="text-sm text-[#0D2C54]/55 mb-8">All 10 dimensions scored from your answers.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-7">
            {sortedScores.map(([key, val]) => {
              const meta = SUBSCALE_META[key];
              const desc = val >= 60 ? meta?.high : meta?.low;
              return (
                <ScoreBar key={key} label={key} value={val} color={meta?.color || "#00A6ED"} description={desc} />
              );
            })}
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════
            ROW 4: Compatibility + Clashes
        ═══════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white border border-[#0D2C54]/10 rounded-[28px] p-8 shadow">
            <p className="text-xs font-black uppercase tracking-widest text-[#43B929] mb-4">Best Friend-Group Matches</p>
            <h3 className="text-lg font-extrabold text-[#0D2C54] mb-5">You thrive alongside…</h3>
            <div className="space-y-3">
              {archData.compatibleWith.map((a, i) => (
                <div key={i} className="flex items-center gap-3 bg-[#43B929]/8 rounded-xl p-4">
                  <span className="w-7 h-7 rounded-full bg-[#43B929]/20 flex items-center justify-center text-[#43B929] font-black text-xs">{i + 1}</span>
                  <span className="font-bold text-[#0D2C54] text-sm">{a}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white border border-[#0D2C54]/10 rounded-[28px] p-8 shadow">
            <p className="text-xs font-black uppercase tracking-widest text-[#FF495C] mb-4">Friction Points</p>
            <h3 className="text-lg font-extrabold text-[#0D2C54] mb-5">You clash with…</h3>
            <div className="space-y-3">
              {archData.challengedBy.map((a, i) => (
                <div key={i} className="flex items-center gap-3 bg-[#FF495C]/8 rounded-xl p-4">
                  <span className="w-7 h-7 rounded-full bg-[#FF495C]/20 flex items-center justify-center text-[#FF495C] font-black text-xs">{i + 1}</span>
                  <span className="font-bold text-[#0D2C54] text-sm">{a}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-[#0D2C54]/40 mt-4 font-medium">Not enemies — just roles that require intentional bridging.</p>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════
            ROW 5: Locked Insight Cards (premium teaser)
        ═══════════════════════════════════════════════════════ */}
        <div>
          <h2 className="text-2xl font-extrabold text-[#0D2C54] mb-2">What's Hidden Below the Surface</h2>
          <p className="text-sm text-[#0D2C54]/55 mb-6">These insights require the full playbooks to unlock.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <LockedCard href="/friend-group-role/premium" title="The Resentment Trap" teaser="The exact way your role is secretly draining you — and why it builds invisibly." iconColor="#FF495C" />
            <LockedCard href="/friend-group-role/premium" title="How Others See You" teaser="The unfiltered version of how your friends interpret your actions behind your back." iconColor="#00A6ED" />
            <LockedCard href="/friend-group-role/premium" title="Your Aura Signature" teaser="The invisible social energy you project and why people react to you the way they do." iconColor="#9B59B6" />
            <LockedCard href="/friend-group-role/premium" title="Your Evolution Blueprint" teaser="Concrete steps to redefine your role and set new standards in the group." iconColor="#FFB400" />
            <LockedCard href="/friend-group-role/premium" title="The Power Move" teaser="The one behavioral shift that immediately changes how your group perceives you." iconColor="#43B929" />
            <LockedCard href="/friend-group-role/premium" title="Your Friendship Pattern" teaser="The repeating dynamic you create in every friend group — and how to break it." iconColor="#E74C3C" />
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════
            PRICING BANNER — TWO PRODUCTS + BUNDLE
        ═══════════════════════════════════════════════════════ */}
        <div className="bg-gradient-to-br from-[#0a0f1e] to-[#0d1f3c] rounded-[32px] p-8 md:p-12 shadow-2xl border border-white/10 relative overflow-hidden">
          {/* Glow blobs */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#FFB400] opacity-10 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#00A6ED] opacity-10 rounded-full blur-[100px] pointer-events-none translate-y-1/2 -translate-x-1/2" />

          <div className="relative z-10">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-widest mb-5 bg-white/10 text-white/80 border border-white/15 uppercase">
                <Sparkles className="w-4 h-4 text-[#FFB400]" /> Choose Your Playbook
              </div>
              <h3 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight">
                Go From Knowing Your Role<br />
                <span className="text-[#FFB400]">To Actually Changing It.</span>
              </h3>
              <p className="text-slate-400 text-lg font-medium max-w-2xl mx-auto">
                Two specialized playbooks built specifically for <span className="text-white font-bold">{profile.primaryArchetype}</span>. Get one or get both.
              </p>
            </div>

            {/* Cards grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">

              {/* Aura Playbook */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-7 flex flex-col hover:bg-white/8 transition-colors">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#9B59B6]/30 flex items-center justify-center">
                    <Brain className="w-5 h-5 text-[#C39BD3]" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-[#9B59B6]">Playbook 1</p>
                    <p className="text-white font-extrabold text-lg leading-tight">The Aura Playbook</p>
                  </div>
                </div>
                <ul className="space-y-2.5 mb-6 flex-1">
                  {[
                    "Your invisible social signal decoded",
                    "Why people react to you the way they do",
                    "Your Aura Signature + Power Persona",
                    "The Power Move that changes everything",
                    "Your shadow side & how to manage it"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-300 font-medium">
                      <span className="text-[#9B59B6] mt-0.5 font-black">✦</span> {item}
                    </li>
                  ))}
                </ul>
                <div className="text-center">
                  <p className="text-3xl font-black text-white mb-1">$9.99</p>
                  <p className="text-xs text-slate-500 mb-4">One-time · Instant access</p>
                  <Link href="/friend-group-role/premium?product=aura"
                    className="block w-full py-3.5 rounded-xl font-extrabold text-sm text-white border border-[#9B59B6]/60 hover:bg-[#9B59B6]/20 transition-colors">
                    Get Aura Playbook
                  </Link>
                </div>
              </div>

              {/* BUNDLE — middle, highlighted */}
              <div className="bg-[#FFB400] rounded-2xl p-7 flex flex-col relative shadow-[0_0_40px_rgba(255,180,0,0.25)]">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-white text-[#0D2C54] text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow">
                    Best Value — Save 20%
                  </span>
                </div>
                <div className="flex items-center gap-3 mb-4 mt-3">
                  <div className="w-10 h-10 rounded-xl bg-black/15 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-[#0D2C54]" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-[#0D2C54]/70">Full Bundle</p>
                    <p className="text-[#0D2C54] font-extrabold text-lg leading-tight">Both Playbooks</p>
                  </div>
                </div>
                <ul className="space-y-2.5 mb-6 flex-1">
                  {[
                    "Everything in the Aura Playbook",
                    "Everything in the Friendship Playbook",
                    "The Resentment Trap analysis",
                    "How others secretly view you",
                    "Your Evolution Blueprint (3-stage)",
                    "Your repeating friendship pattern"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-[#0D2C54] font-semibold">
                      <span className="text-[#0D2C54] mt-0.5 font-black">✓</span> {item}
                    </li>
                  ))}
                </ul>
                <div className="text-center">
                  <div className="flex items-baseline justify-center gap-2 mb-1">
                    <p className="text-4xl font-black text-[#0D2C54]">$15.99</p>
                    <p className="text-sm font-bold text-[#0D2C54]/50 line-through">$19.98</p>
                  </div>
                  <p className="text-xs text-[#0D2C54]/60 mb-4">One-time · Instant access</p>
                  <Link href="/friend-group-role/premium?product=bundle"
                    className="block w-full py-3.5 rounded-xl font-extrabold text-sm bg-[#0D2C54] text-white hover:bg-[#0a2347] transition-colors shadow-md">
                    Get Full Bundle →
                  </Link>
                </div>
              </div>

              {/* Friendship Playbook */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-7 flex flex-col hover:bg-white/8 transition-colors">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#00A6ED]/30 flex items-center justify-center">
                    <Users className="w-5 h-5 text-[#5DADE2]" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-[#00A6ED]">Playbook 2</p>
                    <p className="text-white font-extrabold text-lg leading-tight">The Friendship Playbook</p>
                  </div>
                </div>
                <ul className="space-y-2.5 mb-6 flex-1">
                  {[
                    "Your resentment trap decoded",
                    "How your friends secretly see you",
                    "Your Evolution Blueprint",
                    "The friendship pattern you keep repeating",
                    "Boundary scripts for your specific role"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-300 font-medium">
                      <span className="text-[#00A6ED] mt-0.5 font-black">✦</span> {item}
                    </li>
                  ))}
                </ul>
                <div className="text-center">
                  <p className="text-3xl font-black text-white mb-1">$9.99</p>
                  <p className="text-xs text-slate-500 mb-4">One-time · Instant access</p>
                  <Link href="/friend-group-role/premium?product=friendship"
                    className="block w-full py-3.5 rounded-xl font-extrabold text-sm text-white border border-[#00A6ED]/60 hover:bg-[#00A6ED]/20 transition-colors">
                    Get Friendship Playbook
                  </Link>
                </div>
              </div>
            </div>

            {/* Trust row */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#43B929]" />
                <span><strong className="text-white">7-Day Money-Back</strong> — if it's not accurate, full refund.</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-[#FFB400]" />
                <span><strong className="text-white">Instant access</strong> — no waiting, no account needed.</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

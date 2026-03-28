"use client";
import React, { useEffect } from "react";
import { ShieldCheck, Lock, Sparkles, Navigation, Users, Zap, Eye, Heart, Flame, Brain, Star, TrendingUp, AlertTriangle, CheckCircle, ArrowDown } from "lucide-react";
import Link from "next/link";

interface Trait { name: string; score: number; }
interface Profile {
  primaryArchetype: string;
  secondaryArchetype: string;
  topTraits: Trait[];
  normalizedScores: Record<string, number>;
  premiumUnlocked?: boolean;
}

const SUBSCALE_META: Record<string, { color: string; low: string; high: string }> = {
  "Social Leadership":     { color: "#00A6ED", low: "You prefer to follow and support rather than steer.",          high: "You naturally take charge and move the group forward." },
  "Emotional Support":     { color: "#FF6B9D", low: "You're less emotionally focused in your friendships.",          high: "You are a deeply empathetic, emotionally present friend." },
  "Humor & Entertainment": { color: "#FF9500", low: "You bring calm and grounded energy over humor.",                high: "You are a natural entertainer who lights up the room." },
  "Adventure & Risk":      { color: "#FFB400", low: "You prefer stability and routine over risk-taking.",            high: "You crave novelty and push others toward bold experiences." },
  "Conflict Mediation":    { color: "#43B929", low: "You avoid drama but may not actively resolve it.",              high: "You are the natural mediator who repairs group tension." },
  "Observational Insight": { color: "#9B59B6", low: "You engage more than you observe.",                             high: "You read people and rooms with uncanny precision." },
  "Independence":          { color: "#E74C3C", low: "You thrive on group connection and shared identity.",           high: "You maintain strong boundaries and self-direction." },
  "Loyalty & Protection":  { color: "#2ECC71", low: "Your loyalty is selective and earned over time.",               high: "You are fiercely loyal and would go to the mat for your friends." },
  "Attention & Spotlight": { color: "#F39C12", low: "You are comfortable in the background.",                        high: "You are drawn to the center of social energy." },
  "Social Glue":           { color: "#1ABC9C", low: "You maintain a few close bonds rather than the whole web.",    high: "You are the invisible thread holding the entire group together." },
};

const ARCHETYPES: Record<string, {
  subtitle: string; prediction: string; deepFreeInsight: string;
  strengths: string[]; downsides: string[];
  experience: string; compatibleWith: string[]; challengedBy: string[];
  socialEnergy: number; rarity: string;
}> = {
  "The Leader": {
    subtitle: "You give the group shape and momentum.",
    prediction: "You are the person who gives a group shape. When everyone is stuck in endless 'what should we do?' mode, you move things forward. You often become the unofficial planner, decision-maker, or stabilizer, especially in chaotic moments. Your presence makes the group feel more directed — people trust you to turn vague ideas into real plans.",
    deepFreeInsight: "Here's what almost no one tells The Leader: the group depends on you so deeply that they've stopped asking if you're okay. You handle things so reliably that your own exhaustion becomes invisible. The friends who would drop everything for you in a crisis are often the exact ones who assume you never have a crisis. That quiet assumption — that you're always fine, always capable, always willing to take charge — is the thing that slowly drains you. Not the responsibility. The invisibility underneath it.",
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
    deepFreeInsight: "Here's what almost no one tells The Therapist: you have become so safe for everyone else that you've forgotten how to be unsafe yourself. You know how to hold someone else's fear. You don't always know how to let yours out. And so over time, a very specific kind of loneliness develops — not loneliness for company, but loneliness for reciprocity. For a person who listens to you the way you listen to them. Most of your friends don't even know that person is missing from your life.",
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
    deepFreeInsight: "Here's what almost no one tells The Entertainer: people love being around you, but almost none of them know who you are when the performance stops. The persona is so good, so polished, so genuinely enjoyable, that your actual inner world stays completely hidden behind it. And you've gotten so efficient at using humor to redirect serious moments that some of your closest friends have never seen you actually struggle. The loneliness of being The Entertainer is laughing in a room full of people who would be shocked to find out you weren't okay.",
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
    deepFreeInsight: "Here's what almost no one tells The Adventurer: you move so fast and so enthusiastically through experiences that people rarely stop to ask why. The perpetual forward motion, the constant need for something new — underneath it, there is often something you are not quite ready to sit still with. The adventure is real, the joy is real. But so is the discomfort that arrives when everything stops and it's just you, quiet, alone with your own thoughts.",
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
    deepFreeInsight: "Here's what almost no one tells The Peacekeeper: keeping the peace has a cost, and you are the only one paying it. Every time you soften your own opinion to avoid upsetting someone, every time you redirect a conflict before it escalates — you are doing emotional labor that goes completely unrecognized. And because you're so good at it, the group assumes the harmony is natural. They have no idea it's a service. You've quietly become the shock absorber for everyone else's unregulated behavior.",
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
    deepFreeInsight: "Here's what almost no one tells The Protector: the armor you wear for everyone else is the same armor that keeps people from getting close to you. You are fiercely loyal and genuinely brave in defending others — but because you default to strength, people rarely think to protect you back. And the few times you've been vulnerable, it probably didn't go the way you hoped. So you learned to handle things alone. What looks like toughness from the outside is, on the inside, a quiet decision that it's safer not to need anyone.",
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
    deepFreeInsight: "Here's what almost no one tells The Connector: you are why the group still exists, and almost nobody knows it. If you quietly stopped initiating for a month, three people would reach out. The rest would drift. The group would slowly dissolve. You carry the social infrastructure entirely on your own, and because it looks effortless — because you genuinely enjoy it — no one recognizes it as labor. The real cost isn't the energy. It's that you give so much relational warmth outward that almost none flows back to you.",
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
    deepFreeInsight: "Here's what almost no one tells The Wild Card: the unpredictability that makes you so magnetic is the same thing that makes it hard for people to take you seriously. You're incredibly fun, genuinely electric, and people light up around you. But underneath the chaos there's often a sharper mind, a more sensitive inner world, and a deeper need to be understood than anyone would guess from the outside. The persona of 'wild card' is partly real and partly a very effective way to stay in control of how people see you.",
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
    deepFreeInsight: "Here's what almost no one tells The Observer: you are the most accurate person in the group and the least likely to be believed when you share what you see. You've noticed things about your friends that they haven't noticed about themselves. You've watched dynamics unfold in slow motion that everyone else only understood after the damage was done. And yet, because you deliver insights quietly — without theatrics, without demanding credit — people often discount you until, eventually, you stop offering what you see. That withdrawal is the real loss.",
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
    deepFreeInsight: "Here's what almost no one tells The Lone Wolf: your independence is real, but it's also become a habit so automatic that you sometimes can't tell the difference between choosing solitude and defaulting to it. The distance you maintain feels like freedom. But occasionally — in the quiet moments — it feels more like a default setting you didn't fully choose. The people who care about you often interpret your retreating as rejection. Most of them are wrong. But they don't know that, because you haven't told them.",
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
    deepFreeInsight: "Here's what almost no one tells The Chaos Friend: the wildness isn't random. It's a very specific kind of intelligence that refuses to accept that life has to be boring, predictable, or carefully managed at all times. But underneath the chaos is a person who feels things intensely — probably more intensely than most — and the noise and adventure and constant movement is partly a way of staying ahead of that intensity rather than sitting inside it.",
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
    deepFreeInsight: "Here's what almost no one tells The Overachiever: the drive that makes you exceptional is also making it very hard to be present. You are always optimizing, always thinking about what's next, always subtly measuring whether the current moment is as good as it could be. The people around you experience this as inspiring. Internally, you experience it as a low hum of dissatisfaction that never fully turns off. Rest doesn't feel like rest when part of you is always tallying what you could have been doing instead.",
    strengths: ["Driven and highly organized", "Inspires others to aim higher", "Executes complex plans", "Reliable under pressure"],
    downsides: ["Projects expectations onto others", "Struggles to just 'chill'", "Makes others feel behind", "Defines friendship through productivity"],
    experience: "Your friends admire your drive and let you take the wheel on complex plans.",
    compatibleWith: ["The Leader", "The Adventurer", "The Lone Wolf"],
    challengedBy: ["The Chaos Friend", "The Wild Card", "The Therapist"],
    socialEnergy: 80, rarity: "Top 13%"
  }
};

function RadarChart({ scores }: { scores: Record<string, number> }) {
  const keys = Object.keys(SUBSCALE_META).filter(k => scores[k] !== undefined);
  const n = keys.length;
  if (n < 3) return null;
  const cx = 160, cy = 160, r = 115;
  const angle = (i: number) => (Math.PI * 2 * i) / n - Math.PI / 2;
  const outerPts = keys.map((_, i) => ({ x: cx + r * Math.cos(angle(i)), y: cy + r * Math.sin(angle(i)) }));
  const dataPts = keys.map((k, i) => { const pct = (scores[k] || 0) / 100; return { x: cx + r * pct * Math.cos(angle(i)), y: cy + r * pct * Math.sin(angle(i)) }; });
  const poly = dataPts.map(p => `${p.x},${p.y}`).join(" ");
  const rings = [0.25, 0.5, 0.75, 1].map(pct =>
    keys.map((_, i) => `${cx + r * pct * Math.cos(angle(i))},${cy + r * pct * Math.sin(angle(i))}`).join(" ")
  );
  return (
    <svg viewBox="0 0 320 320" className="w-full max-w-[280px] mx-auto" style={{ overflow: "visible" }}>
      {rings.map((ps, i) => <polygon key={i} points={ps} fill="none" stroke="#0D2C54" strokeOpacity={0.07} strokeWidth={1} />)}
      {outerPts.map((p, i) => <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke="#0D2C54" strokeOpacity={0.08} strokeWidth={1} />)}
      <polygon points={poly} fill="#00A6ED" fillOpacity={0.15} stroke="#00A6ED" strokeWidth={2.5} strokeLinejoin="round" />
      {dataPts.map((p, i) => <circle key={i} cx={p.x} cy={p.y} r={4} fill="#00A6ED" />)}
      {outerPts.map((p, i) => {
        const lx = cx + (r + 24) * Math.cos(angle(i));
        const ly = cy + (r + 24) * Math.sin(angle(i));
        const short = keys[i].split(" ").slice(0, 2).join(" ");
        return <text key={i} x={lx} y={ly} textAnchor="middle" dominantBaseline="middle" fill="#0D2C54" fontSize={8.5} fontWeight={700} opacity={0.65}>{short}</text>;
      })}
    </svg>
  );
}

function ScoreBar({ label, value, color, description }: { label: string; value: number; color: string; description?: string }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-bold text-[#0D2C54]">{label}</span>
        <span className="text-sm font-black" style={{ color }}>{value}%</span>
      </div>
      <div className="w-full h-2.5 rounded-full overflow-hidden mb-1" style={{ backgroundColor: `${color}18` }}>
        <div className="h-full rounded-full" style={{ width: `${value}%`, backgroundColor: color }} />
      </div>
      {description && <p className="text-xs font-medium" style={{ color: `${color}99` }}>{description}</p>}
    </div>
  );
}

function EnergyMeter({ value }: { value: number }) {
  const label = value >= 80 ? "Extrovert" : value >= 55 ? "Ambivert" : value >= 35 ? "Social Introvert" : "Deep Introvert";
  const desc = value >= 80 ? "Groups energize you. You recharge through people."
    : value >= 55 ? "You enjoy groups but need periodic alone-time."
    : value >= 35 ? "Selective — close friends only."
    : "Solitude is your natural recharge mode.";
  const color = value >= 70 ? "#FFB400" : value >= 45 ? "#00A6ED" : "#9B59B6";
  return (
    <div className="bg-white border border-[#0D2C54]/10 rounded-2xl p-6 shadow-sm">
      <p className="text-xs font-black uppercase tracking-widest text-[#0D2C54]/40 mb-3">Social Energy Profile</p>
      <div className="flex items-end gap-4 mb-4">
        <span className="text-5xl font-black text-[#0D2C54]">{value}</span>
        <div>
          <p className="text-lg font-extrabold text-[#0D2C54]">{label}</p>
          <p className="text-xs text-[#0D2C54]/50 font-medium">{desc}</p>
        </div>
      </div>
      <div className="w-full h-3 rounded-full overflow-hidden" style={{ backgroundColor: `${color}20` }}>
        <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${value}%`, backgroundColor: color }} />
      </div>
    </div>
  );
}

function LockedCard({ title, teaser, iconColor, href }: { title: string; teaser: string; iconColor: string; href: string }) {
  return (
    <Link href={href}
      className="relative rounded-[24px] border border-[#0D2C54]/10 p-7 flex flex-col overflow-hidden bg-white group shadow hover:shadow-lg transition-all duration-300 cursor-pointer min-h-[210px]">
      <div className="filter blur-sm opacity-20 select-none pointer-events-none mb-2">
        <div className="w-full h-3 rounded bg-[#0D2C54]/20 mb-2" />
        <div className="w-3/4 h-3 rounded bg-[#0D2C54]/15 mb-2" />
        <div className="w-5/6 h-3 rounded bg-[#0D2C54]/10" />
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-11 h-11 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow" style={{ backgroundColor: iconColor }}>
          <Lock className="w-4 h-4 text-white" />
        </div>
        <h4 className="text-base font-extrabold text-[#0D2C54] mb-2">{title}</h4>
        <p className="text-xs text-[#0D2C54]/55 mb-4 max-w-[220px] leading-relaxed">{teaser}</p>
        <span className="px-4 py-2 rounded-full font-bold text-xs text-white shadow group-hover:brightness-110 transition-all" style={{ backgroundColor: iconColor }}>
          Unlock →
        </span>
      </div>
    </Link>
  );
}

export default function FriendRoleMasterReport({ profile }: { profile: Profile }) {
  const archData = ARCHETYPES[profile.primaryArchetype] || ARCHETYPES["The Leader"];
  const scores = profile.normalizedScores || {};

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("friend_role_result", JSON.stringify(profile));
    }
  }, [profile]);

  const sortedScores = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const topScore = sortedScores[0];
  const bottomScore = sortedScores[sortedScores.length - 1];

  return (
    <div className="py-8 md:py-12 w-full bg-[#f7f8fa]">
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 md:px-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">

        {/* ── HERO ─────────────────────────────────────────────── */}
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

        {/* ── PREDICTION + ENERGY + RARITY ─────────────────────── */}
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
            <EnergyMeter value={archData.socialEnergy} />
            <div className="bg-white border border-[#0D2C54]/10 rounded-2xl p-6 shadow-sm text-center">
              <p className="text-xs font-black uppercase tracking-widest text-[#0D2C54]/40 mb-2">How Rare Is Your Type?</p>
              <p className="text-4xl font-black text-[#FFB400] mb-1">{archData.rarity}</p>
              <p className="text-xs text-[#0D2C54]/50 font-medium">of people share your primary role</p>
            </div>
          </div>
        </div>

        {/* ── RADAR + STRENGTHS/BLIND SPOTS ────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white border border-[#0D2C54]/10 rounded-[28px] p-8 shadow">
            <h2 className="text-xl font-extrabold text-[#0D2C54] mb-6">Your Psychological Trait Map</h2>
            <RadarChart scores={scores} />
            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-xl p-3 text-center" style={{ backgroundColor: "#00A6ED18" }}>
                <p className="text-[10px] font-black text-[#00A6ED] uppercase tracking-wider mb-1">Highest Trait</p>
                <p className="text-sm font-extrabold text-[#0D2C54] leading-tight">{topScore?.[0]}</p>
                <p className="text-lg font-black text-[#00A6ED]">{topScore?.[1]}%</p>
              </div>
              <div className="rounded-xl p-3 text-center" style={{ backgroundColor: "#FF495C18" }}>
                <p className="text-[10px] font-black text-[#FF495C] uppercase tracking-wider mb-1">Growth Zone</p>
                <p className="text-sm font-extrabold text-[#0D2C54] leading-tight">{bottomScore?.[0]}</p>
                <p className="text-lg font-black text-[#FF495C]">{bottomScore?.[1]}%</p>
              </div>
            </div>
          </div>
          <div className="bg-white border border-[#0D2C54]/10 rounded-[28px] p-8 shadow flex flex-col gap-6">
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-[#43B929] mb-4 flex items-center gap-2">
                <CheckCircle className="w-4 h-4" /> Your Superpowers
              </p>
              <ul className="space-y-2.5">
                {archData.strengths.map((s, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-[#43B929]/15 flex items-center justify-center shrink-0">
                      <CheckCircle className="w-3 h-3 text-[#43B929]" />
                    </span>
                    <span className="text-sm font-semibold text-[#0D2C54]/85">{s}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="border-t border-[#0D2C54]/8 pt-5">
              <p className="text-xs font-black uppercase tracking-widest text-[#FF495C] mb-4 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" /> Your Blind Spots
              </p>
              <ul className="space-y-2.5">
                {archData.downsides.map((d, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-[#FF495C]/15 flex items-center justify-center shrink-0">
                      <AlertTriangle className="w-3 h-3 text-[#FF495C]" />
                    </span>
                    <span className="text-sm font-semibold text-[#0D2C54]/85">{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* ── FULL TRAIT BREAKDOWN ──────────────────────────────── */}
        <div className="bg-white border border-[#0D2C54]/10 rounded-[28px] p-8 md:p-10 shadow">
          <h2 className="text-xl font-extrabold text-[#0D2C54] mb-1">Full Trait Breakdown</h2>
          <p className="text-sm text-[#0D2C54]/45 mb-8">All 10 dimensions scored from your answers.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-7">
            {sortedScores.map(([key, val]) => {
              const meta = SUBSCALE_META[key];
              return <ScoreBar key={key} label={key} value={val} color={meta?.color || "#00A6ED"} description={val >= 60 ? meta?.high : meta?.low} />;
            })}
          </div>
        </div>

        {/* ── COMPATIBILITY + CLASHES ───────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white border border-[#0D2C54]/10 rounded-[28px] p-8 shadow">
            <p className="text-xs font-black uppercase tracking-widest text-[#43B929] mb-4">Best Friend-Group Matches</p>
            <h3 className="text-lg font-extrabold text-[#0D2C54] mb-5">You thrive alongside…</h3>
            <div className="space-y-3">
              {archData.compatibleWith.map((a, i) => (
                <div key={i} className="flex items-center gap-3 rounded-xl p-4" style={{ backgroundColor: "#43B92912" }}>
                  <span className="w-7 h-7 rounded-full flex items-center justify-center text-[#43B929] font-black text-xs shrink-0" style={{ backgroundColor: "#43B92925" }}>{i + 1}</span>
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
                <div key={i} className="flex items-center gap-3 rounded-xl p-4" style={{ backgroundColor: "#FF495C12" }}>
                  <span className="w-7 h-7 rounded-full flex items-center justify-center text-[#FF495C] font-black text-xs shrink-0" style={{ backgroundColor: "#FF495C25" }}>{i + 1}</span>
                  <span className="font-bold text-[#0D2C54] text-sm">{a}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-[#0D2C54]/35 mt-4 font-medium">Not enemies — just roles that need intentional bridging.</p>
          </div>
        </div>

        {/* ── DEEP FREE INSIGHT (the hook before the paywall) ──── */}
        <div className="bg-[#0D2C54] rounded-[28px] p-8 md:p-12 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#FFB400] opacity-10 rounded-full blur-[80px] pointer-events-none" />
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-black tracking-widest mb-6 bg-[#FFB400]/20 text-[#FFB400] border border-[#FFB400]/30 uppercase">
              <Sparkles className="w-3.5 h-3.5" /> The Insight Most People Don't Hear
            </div>
            <p className="text-lg md:text-xl leading-relaxed text-white/90 font-medium">
              {archData.deepFreeInsight}
            </p>
            <div className="mt-8 flex items-center gap-3 text-white/40">
              <ArrowDown className="w-4 h-4 animate-bounce" />
              <span className="text-xs font-bold uppercase tracking-widest">There's more below — the parts that go even deeper</span>
            </div>
          </div>
        </div>

        {/* ── LOCKED CARDS ─────────────────────────────────────── */}
        <div>
          <h2 className="text-2xl font-extrabold text-[#0D2C54] mb-1">Go Deeper</h2>
          <p className="text-sm text-[#0D2C54]/45 mb-6">Six more layers — built specifically for {profile.primaryArchetype}.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <LockedCard href="/friend-group-role/premium" title="The Resentment Trap" teaser="The exact way your role is secretly draining you — and why the resentment builds so invisibly." iconColor="#FF495C" />
            <LockedCard href="/friend-group-role/premium" title="How Others See You" teaser="The unfiltered version of how your friends read your behavior when you're not in the room." iconColor="#00A6ED" />
            <LockedCard href="/friend-group-role/premium" title="Your Aura Signature" teaser="The invisible social signal you project — and why people respond to you the way they do." iconColor="#9B59B6" />
            <LockedCard href="/friend-group-role/premium" title="Your Evolution Blueprint" teaser="Concrete steps to redefine your role and set new standards in the group — in 3 stages." iconColor="#FFB400" />
            <LockedCard href="/friend-group-role/premium" title="The Power Move" teaser="The one behavioral shift that immediately changes how your entire group perceives you." iconColor="#43B929" />
            <LockedCard href="/friend-group-role/premium" title="Your Friendship Pattern" teaser="The repeating dynamic you create in every friend group — and exactly how to break it." iconColor="#E74C3C" />
          </div>
        </div>

        {/* ── PRICING BANNER ───────────────────────────────────── */}
        <div className="bg-gradient-to-br from-[#0a0f1e] to-[#0d1f3c] rounded-[32px] p-8 md:p-12 shadow-2xl border border-white/10 relative overflow-hidden">
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
                  {["Your invisible social signal decoded","Why people react to you the way they do","Your Aura Signature + Power Persona","The Power Move that changes everything","Your shadow side & how to manage it"]
                    .map((item, i) => <li key={i} className="flex items-start gap-2 text-sm text-slate-300 font-medium"><span className="text-[#9B59B6] mt-0.5 font-black">✦</span>{item}</li>)}
                </ul>
                <div className="text-center">
                  <p className="text-3xl font-black text-white mb-1">$9.99</p>
                  <p className="text-xs text-slate-500 mb-4">One-time · Instant access</p>
                  <Link href="/friend-group-role/premium?product=aura" className="block w-full py-3.5 rounded-xl font-extrabold text-sm text-white border border-[#9B59B6]/60 hover:bg-[#9B59B6]/20 transition-colors">Get Aura Playbook</Link>
                </div>
              </div>
              {/* Bundle */}
              <div className="bg-[#FFB400] rounded-2xl p-7 flex flex-col relative shadow-[0_0_40px_rgba(255,180,0,0.25)]">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-white text-[#0D2C54] text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow">Best Value — Save 20%</span>
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
                  {["Everything in the Aura Playbook","Everything in the Friendship Playbook","The Resentment Trap analysis","How others secretly view you","Your Evolution Blueprint (3-stage)","Your repeating friendship pattern"]
                    .map((item, i) => <li key={i} className="flex items-start gap-2 text-sm text-[#0D2C54] font-semibold"><span className="font-black">✓</span>{item}</li>)}
                </ul>
                <div className="text-center">
                  <div className="flex items-baseline justify-center gap-2 mb-1">
                    <p className="text-4xl font-black text-[#0D2C54]">$15.99</p>
                    <p className="text-sm font-bold text-[#0D2C54]/40 line-through">$19.98</p>
                  </div>
                  <p className="text-xs text-[#0D2C54]/60 mb-4">One-time · Instant access</p>
                  <Link href="/friend-group-role/premium?product=bundle" className="block w-full py-3.5 rounded-xl font-extrabold text-sm bg-[#0D2C54] text-white hover:bg-[#0a2347] transition-colors shadow-md">Get Full Bundle →</Link>
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
                  {["Your resentment trap decoded","How your friends secretly see you","Your Evolution Blueprint","The friendship pattern you keep repeating","Boundary scripts for your specific role"]
                    .map((item, i) => <li key={i} className="flex items-start gap-2 text-sm text-slate-300 font-medium"><span className="text-[#00A6ED] mt-0.5 font-black">✦</span>{item}</li>)}
                </ul>
                <div className="text-center">
                  <p className="text-3xl font-black text-white mb-1">$9.99</p>
                  <p className="text-xs text-slate-500 mb-4">One-time · Instant access</p>
                  <Link href="/friend-group-role/premium?product=friendship" className="block w-full py-3.5 rounded-xl font-extrabold text-sm text-white border border-[#00A6ED]/60 hover:bg-[#00A6ED]/20 transition-colors">Get Friendship Playbook</Link>
                </div>
              </div>
            </div>
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

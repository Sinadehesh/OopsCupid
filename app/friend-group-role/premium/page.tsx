"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle, ArrowRight, Sparkles, Target, Eye, Map, Users, ShieldCheck, Zap, CheckCircle2, Lock } from "lucide-react";
import Link from "next/link";
import SharePrintButtons from "@/components/ui/SharePrintButtons";

// Deep per-archetype premium content
const PREMIUM_CONTENT: Record<string, {
  deepProfile: string;
  resentmentTrap: string;
  othersView: string;
  evolutionBlueprint: { now: string; week: string; month: string };
  crossSell: { id: string; name: string; pitch: string };
}> = {
  "The Leader": {
    deepProfile: "Your data reveals a high-autonomy, high-initiative profile. You do not wait for permission — you generate momentum when others stall. But leadership in social groups is rarely elected. It's extracted by circumstance, and you've been paying that tax for years. The system has quietly made you responsible for other people's good time, other people's decisions, and the invisible labor of keeping everyone coordinated. You perform leadership so effortlessly that no one ever thinks to ask if you want to.",
    resentmentTrap: "You say yes to organizing because saying no feels like abandoning the group. But underneath that competence is a quiet score you're keeping: who showed up, who didn't, who appreciated it, and who just consumed. You are building resentment silently. The trap is that you will never stop unless you consciously redefine what your role is allowed to cost you.",
    othersView: "Your friends see you as the most reliable person in the room — so reliable that they've stopped wondering if you're okay. They assume you're fine because you always seem fine. They bring you problems without asking how you're doing first. They trust your judgment completely, which also means they rarely challenge you. You are admired but not truly known.",
    evolutionBlueprint: {
      now: "Let one plan fall apart on purpose. Don't fix it. See what happens when you don't carry the group.",
      week: "Tell one person in your group specifically what it costs you to always organize. Name it directly, not as a complaint — as a fact.",
      month: "Rotate responsibility. Ask someone else to plan one event from start to finish with zero input from you."
    },
    crossSell: { id: "are-your-friends-using-you", name: "Are Your Friends Using You?", pitch: "If you're always the one leading, organizing, and showing up — you need to know whether that's friendship or just convenience." }
  },
  "The Therapist": {
    deepProfile: "You score highest in emotional attunement and interpersonal sensitivity. You are the person who creates safety — quietly, reliably, without ceremony. People trust you with the real stuff. But this role has a hidden tax: you absorb the emotional weight of the entire group. Your nervous system is constantly processing other people's pain, drama, and needs, often before your own. You are not just a good listener. You are an emotional sponge, and nobody is asking what you need when you walk into the room.",
    resentmentTrap: "The resentment trap for you is invisible. You chose this role because it felt meaningful — and it is. But over time, you start noticing the asymmetry. You know everything about everyone. Nobody knows much about you. You've had a hundred conversations where you held space for someone else's feelings. Count how many times someone held space for yours.",
    othersView: "Your friends think of you as the safest person in their lives. They come to you first in a crisis. But they also — and this will sting slightly — don't fully picture you as someone who struggles. You've been so consistently supportive that they've subconsciously decided you don't need what they need. You have accidentally made yourself invulnerable in their eyes.",
    evolutionBlueprint: {
      now: "The next time someone asks how you are, answer honestly. Not 'fine.' Actually say one real thing.",
      week: "Practice receiving. When someone offers help or care, let yourself take it without immediately deflecting or shrinking.",
      month: "Have one conversation where you go first. You share something difficult before anyone else does."
    },
    crossSell: { id: "are-your-friends-using-you", name: "Are Your Friends Using You?", pitch: "If you're always the emotional anchor — and nobody's anchoring you — you need to understand whether this is friendship or exploitation." }
  },
  "The Entertainer": {
    deepProfile: "Your humor and social presence score in the top tier. You are consistently the person who lifts the room. But behind high entertainment value is often a deep need to be *liked* — not just tolerated, but actively wanted. When you stop performing, does the room still include you? You may have unconsciously built a role that keeps you safe from rejection: be so enjoyable that nobody would want you to leave. But it means you are never fully off-stage, even with the people who know you best.",
    resentmentTrap: "Your resentment builds when you work hard to keep the energy alive and nobody notices. You carry the social labor of fun — you rescue dead silences, you push past awkward moments, you manufacture energy when the group is running flat. When that effort is invisible, it eventually starts to feel hollow. You wonder if they want you, or they want the performance.",
    othersView: "Your friends adore you. You are the high point of most hangouts. But some of them quietly wonder if they really *know* you. You are always 'on.' Always funny, always light. When you're serious, they don't know how to respond because they've never really seen it before. You are deeply liked but sometimes slightly misread.",
    evolutionBlueprint: {
      now: "Let one conversation stay serious for more than 5 minutes without redirecting to humor. Just sit in it.",
      week: "Tell one person in your group one real thing that's bothering you — without wrapping it in a joke.",
      month: "Notice the difference in how people respond to you when you're not performing. Is the connection still there? It probably is."
    },
    crossSell: { id: "attachment-style", name: "Your Attachment Style Quiz", pitch: "People who perform constantly in social settings often have something deeper driving it. Discover what it is." }
  },
  "The Adventurer": {
    deepProfile: "You have an unusually high tolerance for uncertainty and novelty. You are wired to move, push, and experience, which makes you magnetic and slightly dangerous in the best way. But underneath this is often an avoidance pattern: staying in motion keeps you from sitting with discomfort. When things get emotionally heavy or logistically boring, you push for the next thing. You create stories and experiences for your group. But you may be harder to reach emotionally when things slow down.",
    resentmentTrap: "You resent when your group is too cautious, too slow, or too stuck in routine. You pitch bold ideas and watch people overthink them to death. You start to feel unseen — like your energy is being managed rather than celebrated. Over time, if the group doesn't follow your lead on experiences, you start to pull away or find external outlets.",
    othersView: "Your friends love your energy and credit you with some of their best memories. But they sometimes feel exhausted by your pace. A few of them quietly wonder if you're running from something. They admire you deeply but may feel like they can't *catch* you emotionally. You are consistently exciting and occasionally hard to hold.",
    evolutionBlueprint: {
      now: "Stay present in one boring situation without fixing it. Just experience the discomfort of stillness.",
      week: "Ask someone in your group what they need this week — and actually do that thing, even if it's not exciting.",
      month: "Plan something that goes deep instead of wide. One meaningful conversation instead of one wild adventure."
    },
    crossSell: { id: "attachment-style", name: "Your Attachment Style Quiz", pitch: "High adventure-seeking and emotional avoidance often come from the same place. Find out what's underneath your need to move." }
  },
  "The Peacekeeper": {
    deepProfile: "Your conflict mediation scores are exceptionally high, paired with a strong emotional attunement. You are the reason your friend group hasn't fractured. You see tension coming before it arrives, and you quietly manage the emotional temperature of every room you're in. But this is exhausting. You have sacrificed your own directness for group harmony. You've swallowed your opinions, diluted your feedback, and resisted taking sides so many times that you may have lost track of what you actually think.",
    resentmentTrap: "You will never erupt dramatically. But internally, you accumulate. Every time you smoothed something over that should have been said directly, every time you were the one who backed down to keep the peace — it adds up. The trap is that you've made yourself responsible for an outcome (harmony) that doesn't belong to just you.",
    othersView: "Your friends think of you as mature, calm, and trustworthy. But some of them — particularly the more confrontational ones — may subtly exploit your conflict-avoidance. They know you won't fight back. They know you'll find a middle ground. This makes you easy to lean on but occasionally easy to take advantage of.",
    evolutionBlueprint: {
      now: "Let one disagreement stay unresolved for 24 hours. Don't fix it immediately. See if it actually needs you to intervene.",
      week: "Express one real opinion you've been holding back — without softening it into a question.",
      month: "Practice 'kind honesty' instead of harmless diplomacy. The difference is whether you're protecting them or protecting yourself."
    },
    crossSell: { id: "are-your-friends-using-you", name: "Are Your Friends Using You?", pitch: "Peacekeepers often absorb the most relational labor. Find out if your group is truly balanced or if you're doing the work for everyone." }
  },
  "The Protector": {
    deepProfile: "Your loyalty and protection scores are among the highest in any profile. You are fiercely present for the people you care about. But this protectiveness comes from a deep place — often an early experience of someone not being protected, defended, or seen. You have made a quiet vow to never let that happen to someone in your circle. That is beautiful. It is also something that can turn into vigilance, defensiveness, and a readiness for conflict that others don't always understand.",
    resentmentTrap: "You go hard for your friends. You show up. You defend them. And when that energy isn't matched — when you're the one who needs someone to step up and nobody does — it lands hard. Your resentment is proportional to how much you've given. The trap is loyalty without reciprocity, and staying in it because leaving feels like betrayal.",
    othersView: "Your friends feel genuinely safe around you. They know you have their back. But some of them are slightly cautious around you — not because they don't trust you, but because they feel your protectiveness can escalate fast. They appreciate your fire but sometimes want you to let small things go more easily.",
    evolutionBlueprint: {
      now: "Identify one person in your group who doesn't match your loyalty level. Be honest about whether that's okay.",
      week: "Practice letting a small slight go without addressing it. Not because it doesn't matter, but as a choice.",
      month: "Redefine what loyalty costs you. You do not owe protection to people who don't offer it back."
    },
    crossSell: { id: "are-your-friends-using-you", name: "Are Your Friends Using You?", pitch: "Strong protectors are often the most taken for granted. Find out if your group values what you give." }
  },
  "The Connector": {
    deepProfile: "You are the invisible infrastructure of your friend group. You maintain the web — the messages, the check-ins, the plans, the memories. Without you, the group would drift apart faster than anyone realizes. But this comes with a heavy invisible cost: you do the majority of the emotional and logistical labor of keeping the group alive, and it is almost never acknowledged, because it looks effortless when you do it.",
    resentmentTrap: "You keep reaching out and organizing and including — and one day you stop, to see what happens. And nothing does. No one notices. No one picks up the slack. That silence is the resentment trap: you've created a dependency that nobody is aware of, and therefore nobody will ever volunteer to replace.",
    othersView: "Your friends love having you around but may not fully register what they would lose if you stepped back. You are the person who makes the group feel like a group. Some of your friends might even feel slightly guilty around you without knowing why — because somewhere they sense you're giving more than they are.",
    evolutionBlueprint: {
      now: "Don't initiate any group plans this week. See what gets initiated without you.",
      week: "Tell one friend specifically what you do that keeps the group connected. Name it plainly.",
      month: "Invest in one friendship that consistently invests back. Let some others drift without guilt."
    },
    crossSell: { id: "are-your-friends-using-you", name: "Are Your Friends Using You?", pitch: "Connectors often give the most and get the least. This quiz will tell you exactly who values you and who just benefits from you." }
  },
  "The Wild Card": {
    deepProfile: "You score high on both humor and spontaneity, creating a profile that is genuinely unpredictable and highly entertaining. People are magnetized by you. But the wild card identity — the person who is always surprising, always up for anything, always a little chaotic — can become a cage. You get reduced to your entertainment value. People may love the stories you create, but feel unsure about who you actually are beneath the performance and the spontaneity.",
    resentmentTrap: "Your resentment tends to come in when people treat you as entertainment rather than a person. When you're only invited because the night needs energy, not because someone wants to actually know you. You sense when you're being used as a prop and it quietly hollows out the friendship.",
    othersView: "You are genuinely beloved — exciting, unpredictable, and memorable. But some of your friends quietly don't know how to relate to you outside of a fun context. They may like the idea of you more than they've invested in really knowing you.",
    evolutionBlueprint: {
      now: "Have one conversation that is intentionally boring, slow, and real. No big story. Just presence.",
      week: "Let one friend see you uncertain, tired, or unsure. Not dramatically — just genuinely.",
      month: "Pick one relationship in your group and go deeper on purpose. Consistency over novelty for one month."
    },
    crossSell: { id: "attachment-style", name: "Your Attachment Style Quiz", pitch: "People who live on the edge of social groups — exciting but hard to hold — often have a specific attachment pattern underneath. Discover yours." }
  },
  "The Observer": {
    deepProfile: "Your observational insight score is the highest possible. You see everything. You process social dynamics in real time with a precision that most people will never develop. But with this gift comes a specific kind of loneliness: you understand people more than they understand you. You hold back because you've noticed how rarely people actually listen. You've learned to protect your perceptions by keeping them private. The result is a vast inner world that almost nobody has access to.",
    resentmentTrap: "You sit in rooms where you see exactly what's happening — the dynamics, the manipulations, the unspoken tensions — and nobody asks. Your insights are invisible unless you volunteer them. The quiet resentment comes from being consistently underestimated by people who are talking too loud to notice what you see.",
    othersView: "Your friends find you quietly fascinating but slightly hard to read. They sense you know more than you say. Some are a little intimidated by your perceptiveness. A few of them are probably slightly afraid of being analyzed by you. They trust you with real things — but they also wonder if you trust them.",
    evolutionBlueprint: {
      now: "Share one observation you've been holding back. Say it plainly, without softening.",
      week: "Ask one person in your group a question you already know the answer to — to practice being in conversation rather than observation mode.",
      month: "Let one person in the group know you better than you've allowed before. Give them something real."
    },
    crossSell: { id: "attachment-style", name: "Your Attachment Style Quiz", pitch: "Observers often have a deeply specific relationship with closeness and distance. This quiz will tell you exactly how your attachment style shapes your friendships." }
  },
  "The Lone Wolf": {
    deepProfile: "Your independence score is extremely high, paired with low social dependency. You enjoy people, but on your own terms — and only up to a point. You are not cold or unfeeling. You simply have a different internal economy: closeness costs you energy, and solitude restores it. The issue isn't the independence itself. The issue is that the people who care about you sometimes can't tell if you care back. Your consistency is loyalty, not distance — but that translation is hard to make.",
    resentmentTrap: "Your resentment comes when people treat your need for space as a personal rejection. When they guilt you for not being 'present enough' or take your independence as evidence that you don't care. You do care. You just express it differently — and the gap between how you give and how others receive is a constant source of low-grade friction.",
    othersView: "Your friends admire your self-sufficiency and are a little in awe of your composure. But some of them feel slightly kept at arm's length and aren't sure how to cross that threshold. They want more access to you but don't know how to ask without feeling like they're imposing.",
    evolutionBlueprint: {
      now: "Reach out to one person first — no agenda, just contact. Let them know you're thinking of them.",
      week: "Tell one person in your group that you appreciate them. Specifically and directly.",
      month: "Let one friendship get closer than you normally allow. Not more frequent — just more real."
    },
    crossSell: { id: "attachment-style", name: "Your Attachment Style Quiz", pitch: "Lone Wolves consistently show a specific attachment pattern. Find out what's actually driving your need for distance." }
  },
  "The Chaos Friend": {
    deepProfile: "You score very high on adventure-seeking and humor, with notably low conflict mediation scores. You are the opposite of boring, which makes you magnetic. But chaos is often a coping mechanism — a way of staying in motion so that nothing heavy can catch you. You create memorable experiences and stories, but you may struggle with the parts of friendship that are slow, quiet, and emotionally demanding. You are loved intensely. You may also be the friend people worry about when nobody is watching.",
    resentmentTrap: "You feel the resentment when your friends switch into 'responsible mode' and start treating you like a problem to manage rather than a person to enjoy. When your wildness gets pathologized. You know you can be a lot. But you also know that the version of yourself people love — the chaotic, fearless one — is real. It deserves appreciation, not supervision.",
    othersView: "Your friends adore you and find you exhausting in equal measure. They tell the best stories about you. They also occasionally wonder if you're okay. There's a split between how much fun you are and how much they actually know you. You keep things light, even when you're not light.",
    evolutionBlueprint: {
      now: "Let one plan go wrong without turning it into a funny story immediately. Just be with what happened.",
      week: "Tell one trusted friend something real — not chaotic, not funny. Just real.",
      month: "Practice being the stable one in one situation. Show the side of you that can hold things together."
    },
    crossSell: { id: "attachment-style", name: "Your Attachment Style Quiz", pitch: "Chaos-seekers often have a very specific trauma-linked attachment style. This quiz will decode exactly what's underneath yours." }
  },
  "The Overachiever": {
    deepProfile: "You combine very high social leadership with strong independence — a rare and intense combination. You bring drive, ambition, and a standard of excellence to every context, including your friendships. But this comes at a cost: you can make other people feel exhausted, judged, or quietly insufficient. Your standards are high because you hold yourself to the same ones. But not everyone wants to be optimized, and not everyone sees your drive as energizing. Some experience it as pressure.",
    resentmentTrap: "You put maximum effort into everything, including your social life. And when people don't match that effort — when they're passive, late, half-committed, or settling — it registers as disrespect. Your resentment is the gap between what you're capable of and what you watch other people choose. You want to pull people forward. Most of them just want to coast.",
    othersView: "Your friends are proud to know you. They reference your accomplishments and your drive with genuine admiration. But some of them feel subtly inferior around you, even when you're not trying to make them feel that way. A few of them hold back because they're afraid to fail in front of you.",
    evolutionBlueprint: {
      now: "Let one plan be average on purpose. Don't optimize it. See what the group does with 'good enough.'",
      week: "Ask a friend what *they* need from the friendship right now — not what you think they need.",
      month: "Find one way to celebrate someone else's success that has nothing to do with yours."
    },
    crossSell: { id: "attachment-style", name: "Your Attachment Style Quiz", pitch: "High-achieving social personalities often run on a specific anxious-avoidant combination. Find out exactly how your attachment style shapes your friendships." }
  }
};

export default function FriendRolePremiumPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [isClaiming, setIsClaiming] = useState(false);
  const [isClaimed, setIsClaimed] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("friend_role_result");
      if (!saved) {
        setError("No profile found. Please complete the quiz first.");
        setIsLoading(false);
        return;
      }
      const parsed = JSON.parse(saved);
      setProfile(parsed);
    } catch {
      setError("Profile data is corrupted. Please retake the quiz.");
    }
    setIsLoading(false);
  }, []);

  const handleClaimCoaching = async () => {
    setIsClaiming(true);
    try {
      await fetch("/api/leads/coaching", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "friend_role_coaching" }),
      }).catch(() => {});
      setTimeout(() => { setIsClaimed(true); setIsClaiming(false); }, 1000);
    } catch { setIsClaiming(false); }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#fff1d0] px-4">
        <div className="w-20 h-20 border-8 border-[#d6d2d2] border-t-[#06aed5] rounded-full animate-spin mb-8"></div>
        <h2 className="text-3xl font-black text-[#086788] mb-2 text-center">Unlocking Your Full Profile...</h2>
        <p className="text-[#086788]/70 text-center max-w-md font-medium">Compiling your deep psychological role analysis.</p>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#fff1d0] px-4 text-center">
        <AlertTriangle className="w-16 h-16 text-[#dd1c1a] mb-6" />
        <h2 className="text-3xl font-black text-[#086788] mb-4">Access Denied</h2>
        <p className="text-lg font-medium text-[#086788]/80 max-w-md mb-8">{error}</p>
        <button onClick={() => router.push("/friend-group-role")} className="px-8 py-4 bg-[#086788] hover:bg-[#06aed5] text-white rounded-xl font-black shadow-md transition-colors">
          Return to Quiz
        </button>
      </div>
    );
  }

  const archetype = profile.primaryArchetype || "The Leader";
  const content = PREMIUM_CONTENT[archetype] || PREMIUM_CONTENT["The Leader"];
  const secondary = profile.secondaryArchetype;

  return (
    <div className="min-h-screen bg-[#fafafa] py-12 md:py-20 border-t border-[#d6d2d2]">
      <div className="max-w-4xl mx-auto px-4 md:px-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">

        {/* HERO */}
        <div className="bg-[#FFB400] rounded-[32px] p-10 md:p-14 text-center relative overflow-hidden shadow-xl">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_#0D2C54,_transparent)]"></div>
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-widest mb-6 bg-white/30 text-[#0D2C54] uppercase">
              <Sparkles className="w-4 h-4" /> Full Analysis Unlocked
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-[#0D2C54] leading-none mb-3">
              {archetype}
            </h1>
            {secondary && (
              <div className="inline-block bg-white/20 border border-white/40 px-5 py-2 rounded-full mt-2">
                <p className="text-sm font-extrabold text-[#0D2C54] uppercase tracking-wide">
                  Secondary Role: <span className="text-white">{secondary}</span>
                </p>
              </div>
            )}
          </div>
        </div>

        {/* DEEP PROFILE */}
        <div className="bg-white border border-[#d6d2d2] border-l-8 border-l-[#00A6ED] rounded-2xl p-8 md:p-12 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <Eye className="w-7 h-7 text-[#00A6ED]" />
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#0D2C54]">The Deep Profile</h2>
          </div>
          <p className="text-lg md:text-xl font-medium leading-relaxed text-[#0D2C54]/85">
            {content.deepProfile}
          </p>
        </div>

        {/* THE RESENTMENT TRAP */}
        <div className="bg-white border border-[#d6d2d2] border-l-8 border-l-[#FF495C] rounded-2xl p-8 md:p-12 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <AlertTriangle className="w-7 h-7 text-[#FF495C]" />
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#0D2C54]">The Resentment Trap</h2>
          </div>
          <p className="text-lg font-medium leading-relaxed text-[#0D2C54]/85">
            {content.resentmentTrap}
          </p>
        </div>

        {/* HOW OTHERS VIEW YOU */}
        <div className="bg-white border border-[#d6d2d2] border-l-8 border-l-[#FFB400] rounded-2xl p-8 md:p-12 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <Users className="w-7 h-7 text-[#FFB400]" />
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#0D2C54]">How Others Secretly View You</h2>
          </div>
          <p className="text-lg font-medium leading-relaxed text-[#0D2C54]/85">
            {content.othersView}
          </p>
        </div>

        {/* THE EVOLUTION BLUEPRINT */}
        <div className="bg-white border border-[#d6d2d2] rounded-2xl p-8 md:p-12 shadow-sm">
          <div className="flex items-center gap-3 mb-8">
            <Map className="w-7 h-7 text-[#00A6ED]" />
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#0D2C54]">The Evolution Blueprint</h2>
          </div>
          <div className="space-y-4">
            <div className="bg-[#fafafa] border border-[#d6d2d2] rounded-xl p-6">
              <p className="text-xs font-black text-[#0D2C54]/40 uppercase tracking-widest mb-2">Right Now</p>
              <p className="font-bold text-[#0D2C54] text-base leading-relaxed">{content.evolutionBlueprint.now}</p>
            </div>
            <div className="bg-[#fafafa] border border-[#d6d2d2] rounded-xl p-6">
              <p className="text-xs font-black text-[#0D2C54]/40 uppercase tracking-widest mb-2">This Week</p>
              <p className="font-bold text-[#0D2C54] text-base leading-relaxed">{content.evolutionBlueprint.week}</p>
            </div>
            <div className="bg-[#fafafa] border border-[#d6d2d2] rounded-xl p-6">
              <p className="text-xs font-black text-[#0D2C54]/40 uppercase tracking-widest mb-2">This Month</p>
              <p className="font-bold text-[#0D2C54] text-base leading-relaxed">{content.evolutionBlueprint.month}</p>
            </div>
          </div>
        </div>

        {/* TRAIT SCORES */}
        {profile.normalizedScores && (
          <div className="bg-white border border-[#d6d2d2] rounded-2xl p-8 md:p-12 shadow-sm">
            <h2 className="text-2xl font-extrabold text-[#0D2C54] mb-8">Your Full Trait Breakdown</h2>
            <div className="space-y-5">
              {Object.entries(profile.normalizedScores as Record<string, number>)
                .sort((a, b) => b[1] - a[1])
                .map(([key, val], i) => (
                  <div key={key}>
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-sm font-bold text-[#0D2C54]">{key}</span>
                      <span className="text-sm font-black text-[#00A6ED]">{val}%</span>
                    </div>
                    <div className="w-full h-2.5 rounded-full bg-[#d6d2d2] overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{
                          width: `${val}%`,
                          backgroundColor: i === 0 ? "#00A6ED" : i === 1 ? "#FFB400" : i === 2 ? "#FF495C" : "#0D2C54"
                        }}
                      />
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* COACHING OFFER */}
        <div className="bg-white border-2 border-[#FFB400] rounded-3xl p-8 md:p-12 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-[#FFB400] text-[#0D2C54] text-[10px] font-black px-4 py-1.5 uppercase tracking-widest rounded-bl-lg">Limited Offer</div>
          <h2 className="text-3xl font-extrabold mb-3 text-[#0D2C54]">Step Out of the Box They Put You In.</h2>
          <p className="text-lg font-medium text-[#0D2C54]/75 mb-6">
            You have the data. A 1-on-1 coaching session based on your exact profile will give you tactical steps to redefine your role, set boundaries, and change how your group relates to you — without losing anyone.
          </p>
          <div className="flex items-center gap-4 mb-8">
            <span className="text-5xl font-black text-[#0D2C54]">Free</span>
            <div>
              <span className="text-sm font-bold text-[#0D2C54]/40 line-through block">Usually €50.00</span>
              <span className="text-sm font-black text-[#FF495C] uppercase tracking-widest">Included With Premium</span>
            </div>
          </div>
          {isClaimed ? (
            <div className="bg-[#06aed5]/10 border border-[#06aed5]/30 p-6 rounded-xl flex items-center gap-4">
              <CheckCircle2 className="w-8 h-8 text-[#06aed5] shrink-0" />
              <div>
                <p className="font-black text-[#0D2C54] text-lg">Request Confirmed!</p>
                <p className="text-sm font-medium text-[#0D2C54]/70">Check your email shortly for scheduling.</p>
              </div>
            </div>
          ) : (
            <button onClick={handleClaimCoaching} disabled={isClaiming} className="w-full min-h-[64px] bg-[#FFB400] text-[#0D2C54] rounded-xl font-black text-xl transition-all shadow-md hover:-translate-y-1 flex items-center justify-center gap-3 disabled:opacity-50">
              {isClaiming ? "Securing Spot..." : "Yes, I Want Coaching"} <Zap className="w-6 h-6" />
            </button>
          )}
        </div>

        {/* CROSS SELL */}
        <div className="bg-white border-2 border-[#00A6ED] p-8 md:p-12 rounded-3xl shadow-md text-center">
          <span className="inline-block py-1.5 px-4 rounded bg-[#00A6ED]/10 text-[#00A6ED] font-black text-xs tracking-widest uppercase mb-6">Recommended Next</span>
          <h3 className="text-3xl font-extrabold mb-4 text-[#0D2C54]">"{content.crossSell.name}"</h3>
          <p className="text-lg font-medium mb-8 text-[#0D2C54]/75 max-w-xl mx-auto">{content.crossSell.pitch}</p>
          <Link
            href={`/${content.crossSell.id}`}
            className="inline-flex items-center justify-center gap-3 py-5 w-full md:w-auto px-10 min-h-[64px] bg-[#0D2C54] hover:bg-[#00A6ED] text-white rounded-xl font-black text-xl transition-all hover:-translate-y-1 shadow-md"
          >
            Start Now <ArrowRight className="w-6 h-6" />
          </Link>
        </div>

        <div className="pt-4 pb-12"><SharePrintButtons /></div>
      </div>
    </div>
  );
}

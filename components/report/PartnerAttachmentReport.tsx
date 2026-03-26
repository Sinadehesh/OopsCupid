"use client";
import React, { useState } from "react";
import {
  ShieldCheck, ShieldAlert, UserMinus, HeartHandshake,
  Lock, Zap, Star, CheckCircle2, BookOpen, Brain,
  MessageSquare, AlertTriangle, Eye, TrendingUp, ChevronDown, Target
} from "lucide-react";

// ─── GUMROAD LINKS ────────────────────────────────────────────────────────────
const PLAYBOOK_DECODE_URL  = "https://oopscupid.gumroad.com/l/decode-his-attachment";
const PLAYBOOK_SCRIPT_URL  = "https://oopscupid.gumroad.com/l/reach-him-playbook";
const PLAYBOOK_BUNDLE_URL  = "https://oopscupid.gumroad.com/l/attachment-truth-bundle";
// ─────────────────────────────────────────────────────────────────────────────

// ─── STYLE CONFIG ─────────────────────────────────────────────────────────────
type StyleKey = "Dismissive-Avoidant" | "Anxious-Preoccupied" | "Fearful-Avoidant (Disorganized)" | "Secure";

const STYLE_CFG: Record<StyleKey, {
  label: string;
  emoji: string;
  accent: string;
  bg: string;
  border: string;
  badge: string;
  bar: string;
  verdict: string;
  urgency: string;
  icon: React.ElementType;
  free_summary: string;
  deepDive: string;
  trajectoryTitle: string;
  trajectoryBody: string;
  trapTitle: string;
  trapBody: string;
  scriptTitle: string;
  scripts: string[];
  scriptWarning: string;
  actionSteps: { day: string; action: string; why: string }[];
  silenceCosts: { label: string; pct: number }[];
}> = {
  "Dismissive-Avoidant": {
    label: "Dismissive-Avoidant",
    emoji: "🧊",
    accent: "#3b82f6",
    bg: "bg-[#060d1a]",
    border: "border-blue-500/30",
    badge: "bg-blue-500/20 border-blue-500/40 text-blue-300",
    bar: "bg-blue-500",
    icon: UserMinus,
    free_summary: "He treats emotional closeness as a threat to his autonomy. The more you need from him, the further he retreats — not because he does not care, but because his nervous system is wired to equate intimacy with the loss of self.",
    verdict: "He has built a wall, and the wall is not about you. A dismissive-avoidant partner learned early that needing people leads to disappointment — so he stopped needing them entirely. His independence is not confidence. It is armour.",
    urgency: "Without intervention, this dynamic leads to one-sided emotional labor that gradually erodes you.",
    deepDive: "Dismissive-avoidants deactivate emotional engagement as a survival strategy. When conflict arises, his instinct is to intellectualize, minimize, or exit the conversation — not because he does not care, but because his nervous system has learned that emotional engagement is unsafe. He likely dismisses your emotional needs as 'too much', praises logic over feeling, and retreats into work, hobbies, or solo activities when he feels the relationship getting too close. He does not ghost you because he hates you. He ghosts you because closeness activates a threat response he was never taught to manage.",
    trajectoryTitle: "How He Is Quietly Changing You",
    trajectoryBody: "Long exposure to a dismissive-avoidant partner rewires your own nervous system. You begin to second-guess your emotional needs. You apologize for wanting intimacy. You perform independence you do not feel in order to keep him comfortable. Over time, the anxious pursuit and the disappointed retreat become your cycle — and you forget what it felt like to be in a relationship where you did not have to earn someone's presence.",
    trapTitle: "The Anxious-Avoidant Loop",
    trapBody: "If you are reading this, you likely have some anxious attachment tendencies yourself — which is why you ended up with a dismissive. You pursue; he retreats. His retreat activates your anxiety; your pursuit activates his avoidance. Neither of you is broken. You are two trauma responses locked in perfect, exhausting opposition. The loop does not break by trying harder. It breaks by changing your part in it.",
    scriptTitle: "How to Actually Reach a Dismissive-Avoidant",
    scripts: [
      "\"I am not here to push you. I just want to tell you what I am experiencing, and then I am going to give you space. You do not have to respond right now.\"",
      "\"I do not need you to fix this. I am not attacking you. I need you to hear me for two minutes without defending. Can you do that?\"",
      "\"I know closeness does not feel natural for you. I am not asking you to change overnight. I am asking you to try one thing: stay in the conversation even when it feels uncomfortable.\"",
    ],
    scriptWarning: "Never use ultimatums with a dismissive-avoidant in the heat of the moment — it activates his deactivation strategy immediately and he will go silent or leave. Bring requests during calm, low-stakes moments, not in the middle of conflict.",
    actionSteps: [
      { day: "Day 1", action: "Stop pursuing during withdrawals.", why: "Every time you chase, you confirm his belief that intimacy means being smothered. A single cycle of non-pursuit will disorient him in a productive way." },
      { day: "Day 2", action: "Name your need once, clearly, then drop it.", why: "He cannot hear repeated requests — they register as attacks. State what you need once with no escalation, then let it land." },
      { day: "Day 3", action: "Build your own emotional support system.", why: "You cannot get all your emotional needs from someone who structurally limits his output. Stop trying. Build other sources of connection." },
      { day: "Day 4", action: "Use the script during a calm moment.", why: "He is most reachable when there is no active conflict. A quiet Tuesday evening is more effective than any heated conversation." },
      { day: "Day 5", action: "Assess his response honestly.", why: "Did he try? Dismiss? Apologize and then repeat the same behavior? His response to a non-threatening conversation tells you his ceiling." },
    ],
    silenceCosts: [
      { label: "Emotional loneliness deepens", pct: 87 },
      { label: "You shrink your own needs further", pct: 82 },
      { label: "Resentment accumulates silently", pct: 91 },
    ],
  },

  "Anxious-Preoccupied": {
    label: "Anxious-Preoccupied",
    emoji: "🌊",
    accent: "#f59e0b",
    bg: "bg-[#110d00]",
    border: "border-amber-500/30",
    badge: "bg-amber-500/20 border-amber-500/40 text-amber-300",
    bar: "bg-amber-500",
    icon: HeartHandshake,
    free_summary: "He requires constant reassurance that you are not leaving. Every moment of distance feels like abandonment. His love is intense but consuming — what looks like passion is often a fear-based surveillance of your availability.",
    verdict: "His nervous system is permanently on alert for signs you are pulling away. He does not know he is doing it. His love is genuine, but it is filtered through a lens of anticipated loss — which means your normal behavior constantly triggers his alarm.",
    urgency: "Without understanding this dynamic, you will spend increasing energy managing his emotional state rather than being loved by him.",
    deepDive: "An anxious-preoccupied partner experienced inconsistent caregiving early in life — sometimes warmth, sometimes absence — which taught him that love is both urgently needed and never guaranteed. He monitors your behavior for signs of withdrawal. A slow text reply, a cancelled plan, a distracted conversation — all of these are processed as early warning signs of abandonment. He escalates contact, seeks explicit reassurance, may use guilt or emotional intensity to force engagement. When this works (and you respond with warmth), his anxiety spikes further — because he now knows anxiety gets results.",
    trajectoryTitle: "How He Is Exhausting You",
    trajectoryBody: "Partners of anxious-preoccupied individuals become emotional regulators — responsible for another adult's internal state. Over time you walk on eggshells, pre-emptively reassuring him before he escalates, managing your own behavior to avoid triggering his anxiety. You lose the ability to have a bad day, need space, or feel ambivalent about the relationship without it becoming a crisis. This is not love — it is emotional labor with no breaks.",
    trapTitle: "The Reassurance Loop",
    trapBody: "Every time you give reassurance in response to his anxiety, you temporarily relieve his distress — but you also teach him that anxiety gets attention. His baseline anxiety rises over time because reassurance only works briefly before the fear returns. The only way to disrupt this cycle is to offer connection proactively (not in response to anxiety) while refusing to engage with escalated demands in the moment.",
    scriptTitle: "How to Set a Limit Without Triggering Panic",
    scripts: [
      "\"I care about you and I am not going anywhere. And I also need [specific thing]. Both of those things are true at the same time.\"",
      "\"When you ask me the same question multiple times in a row, I cannot hear what you actually need. Tell me the real fear underneath the question.\"",
      "\"I am not punishing you by needing space. I am a person who needs space. It has nothing to do with how I feel about you.\"",
    ],
    scriptWarning: "Do not give reassurance while he is escalating. This trains the anxiety. Instead, say 'I will answer that when we are both calm' and follow through. Warmth delivered after de-escalation is more effective than warmth delivered under pressure.",
    actionSteps: [
      { day: "Day 1", action: "Identify your reassurance pattern.", why: "Write down the last 5 times you gave reassurance in response to escalation. Notice whether it actually resolved anything or just reset the clock." },
      { day: "Day 2", action: "Offer proactive connection unprompted.", why: "Anxious partners feel most regulated when connection comes from you without them asking for it. This shifts the dynamic from demand-response to genuine exchange." },
      { day: "Day 3", action: "Refuse one escalated demand calmly.", why: "Not with coldness — with clarity. 'I am not going to respond to this right now, but I will talk to you in an hour.' Then do it." },
      { day: "Day 4", action: "Deliver the script in a calm moment.", why: "He needs to hear what you actually need, not in response to a fight but as a clear statement of how this relationship needs to work." },
      { day: "Day 5", action: "Observe his response to your boundary.", why: "Can he hear a limit without spiraling? Does he apologize and then repeat the same behavior? His response to your boundary is the data." },
    ],
    silenceCosts: [
      { label: "His anxiety escalates over time", pct: 88 },
      { label: "Your personal space shrinks further", pct: 84 },
      { label: "Resentment builds silently", pct: 79 },
    ],
  },

  "Fearful-Avoidant (Disorganized)": {
    label: "Fearful-Avoidant",
    emoji: "🌀",
    accent: "#f43f5e",
    bg: "bg-[#1a0608]",
    border: "border-rose-500/30",
    badge: "bg-rose-500/20 border-rose-500/40 text-rose-300",
    bar: "bg-rose-500",
    icon: ShieldAlert,
    free_summary: "He pulls you in and then pushes you away — and the rules for which one he does seem to change without warning. This is not game-playing. His nervous system genuinely cannot decide whether closeness means safety or danger.",
    verdict: "Fearful-avoidant attachment is the most complex and destabilizing pattern. He wants what he is afraid of. Every time the relationship gets intimate enough to feel safe, a subconscious alarm fires and he sabotages it. He is not doing this to punish you. He does not know he is doing it.",
    urgency: "This is the most difficult pattern to navigate. Without clarity on what is happening, you will cycle through hope and devastation indefinitely.",
    deepDive: "Fearful-avoidant (disorganized) attachment typically originates from early caregiving that was simultaneously a source of comfort and fear — often trauma, unpredictability, or a parent who was both loving and frightening. His nervous system never resolved the contradiction between 'I need connection' and 'connection is dangerous'. As an adult, he seeks intimacy intensely but experiences it as a trigger once he has it. The push-pull is not strategic. It is his nervous system executing two contradictory survival programs simultaneously. You feel like you are constantly being tested — because in a sense, you are. His internal system is constantly testing whether you will hurt him.",
    trajectoryTitle: "How This Pattern Is Destabilizing You",
    trajectoryBody: "Partners of fearful-avoidants describe the same trajectory: initial intensity that felt like the deepest connection they had ever experienced, followed by a series of hot-cold cycles that leave them questioning their own perception of reality. Over time you stop trusting your own read of the relationship. You become hypervigilant to his moods, trying to predict which version of him will show up. Your nervous system starts to mirror his disorganization.",
    trapTitle: "The Intensity-Withdrawal Cycle",
    trapBody: "Fearful-avoidants are typically the most romantically overwhelming at the start — intense eye contact, vulnerability dumps, declarations of deep feeling. This intensity is real. But once you respond with equivalent depth, his alarm activates. He goes cold. You chase. He warms. The cycle repeats at higher and higher stakes until something breaks. Understanding this is not pessimism — it is the only way to stop being pulled in by the intensity without seeing the cycle for what it is.",
    scriptTitle: "How to Communicate With a Fearful-Avoidant",
    scripts: [
      "\"I am not going to leave because things got intense. And I need you to stop disappearing when they do. If you need space, tell me. I can handle that. What I cannot handle is silence.\"",
      "\"I notice you pull away when we get close. I am not asking you to explain why. I am asking you to stay in the room instead of leaving.\"",
      "\"You do not need to be ready to talk right now. But I need to know you will come back. Can you tell me when?\"",
    ],
    scriptWarning: "Do not give long emotional speeches during a withdrawal episode — he cannot process them in that state. Keep language short, non-blaming, and focused on one specific behavior change, not a full relationship audit.",
    actionSteps: [
      { day: "Day 1", action: "Map the last 3 cycles.", why: "Write down what triggered each withdrawal — what happened immediately before. You will likely find a pattern: intimacy, a vulnerable moment, or a fight he started to create distance." },
      { day: "Day 2", action: "Stop chasing during withdrawals.", why: "Every chase confirms his belief that love means being smothered or losing himself. Sit in the distance once — without reaching out." },
      { day: "Day 3", action: "Decide your personal threshold.", why: "What behavior are you no longer willing to absorb? Write it down privately. You need a line before you need a conversation." },
      { day: "Day 4", action: "Use the script in a calm reconnection window.", why: "Fearful-avoidants are most reachable in the reconnection phase — after the cold has passed and before the next cycle begins." },
      { day: "Day 5", action: "Assess whether he acknowledged the pattern.", why: "A fearful-avoidant who cannot see the cycle cannot change it. His awareness — or absence of it — is your most important data point." },
    ],
    silenceCosts: [
      { label: "Your reality perception erodes", pct: 92 },
      { label: "Cycles intensify over time", pct: 88 },
      { label: "You become hypervigilant to his moods", pct: 94 },
    ],
  },

  "Secure": {
    label: "Secure",
    emoji: "🛡️",
    accent: "#10b981",
    bg: "bg-[#021510]",
    border: "border-emerald-500/30",
    badge: "bg-emerald-500/20 border-emerald-500/40 text-emerald-300",
    bar: "bg-emerald-500",
    icon: ShieldCheck,
    free_summary: "He is comfortable with both closeness and independence. He communicates needs without games and handles conflict without stonewalling or spiraling. This is genuinely rare — and it does not mean the relationship requires no work.",
    verdict: "A secure partner does not guarantee a perfect relationship. It means you have a foundation that can actually handle real problems — conflict, change, difference — without the foundation itself being the problem.",
    urgency: "Understand what you have so you can work on the actual relationship instead of the attachment dynamic.",
    deepDive: "Secure attachment developed through consistent, responsive early caregiving. He learned that expressing needs leads to connection rather than rejection. As an adult, he can sit with conflict without needing to win, exit, or retaliate. He can express vulnerability without feeling exposed. He does not interpret your need for space as rejection, or your emotional expression as a threat. He is not perfectly consistent — but his inconsistencies are situation-based, not fear-based.",
    trajectoryTitle: "What Secure Attachment Makes Possible",
    trajectoryBody: "With a secure partner, the relationship can become your base rather than your project. You have the psychological bandwidth to work on yourself, pursue your goals, and show up fully — because you are not spending it managing his emotional volatility or his avoidant retreats. The work shifts from 'how do I not lose him' to 'how do we build something'.",
    trapTitle: "The Secure Partner Blind Spot",
    trapBody: "If you came from previous insecure relationships, a secure partner can initially feel boring or emotionally flat — because drama and emotional intensity register as love when that is what you learned. The absence of anxiety can feel like the absence of passion. It is not. It is what safety feels like before your nervous system recalibrates.",
    scriptTitle: "How to Ask for What You Need From a Secure Partner",
    scripts: [
      "\"I want to tell you something that is vulnerable for me. I need you to listen without jumping to fix it.\"",
      "\"I have been carrying something and I want to share it. This is not a complaint about you — it is me trusting you with it.\"",
      "\"I would like more [specific thing]. Can we talk about whether that is possible?\"",
    ],
    scriptWarning: "With a secure partner, directness works. You do not need to soften requests into near-invisibility or test him with hints. Ask clearly. He can handle it — and he will respect you more for it.",
    actionSteps: [
      { day: "Day 1", action: "Identify any patterns you bring from past insecure relationships.", why: "Your nervous system may still be running old threat-detection software. Knowing this prevents you from manufacturing problems in a stable relationship." },
      { day: "Day 2", action: "Practice stating one need directly.", why: "If you learned to suppress needs in previous relationships, this will feel uncomfortable. Do it anyway. Observe what happens." },
      { day: "Day 3", action: "Notice where you are still guarding.", why: "Where are you still waiting for the other shoe to drop? Name it. This is your healing work, not his problem." },
      { day: "Day 4", action: "Have one conversation about where you want this to go.", why: "A secure partner can handle future-talk without feeling cornered. Use that." },
      { day: "Day 5", action: "Identify one growth area for the relationship.", why: "Security is the foundation. What do you want to build on it?" },
    ],
    silenceCosts: [
      { label: "Unspoken needs create quiet distance", pct: 58 },
      { label: "Old patterns re-emerge without awareness", pct: 63 },
      { label: "Connection deepens more slowly", pct: 52 },
    ],
  },
};

function getStyleCfg(styleLabel: string) {
  return STYLE_CFG[styleLabel as StyleKey] ?? STYLE_CFG["Secure"];
}

// ─── SCORE RING ─────────────────────────────────────────────────────────────
function ScoreRing({ score, accent }: { score: number; accent: string }) {
  return (
    <div className="relative inline-flex items-center justify-center w-36 h-36">
      <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="44" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
        <circle cx="50" cy="50" r="44" fill="none" stroke={accent} strokeWidth="8" strokeLinecap="round"
          strokeDasharray={`${score * 2.76} 276`} className="transition-all duration-1000" />
      </svg>
      <div className="text-center">
        <p className="text-4xl font-black text-white leading-none">{score}</p>
        <p className="text-white/40 text-xs font-black uppercase tracking-wider mt-1">/ 100</p>
      </div>
    </div>
  );
}

// ─── PLAYBOOKS UPSELL ────────────────────────────────────────────────────────
function PlaybooksUpsell({ accent, styleLabel }: { accent: string; styleLabel: string }) {
  const [hovered, setHovered] = useState<"decode" | "script" | null>(null);

  return (
    <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden">
      <div className="bg-slate-900 px-8 py-7 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-white/70 text-xs font-black uppercase tracking-widest mb-4">
          <BookOpen className="w-3.5 h-3.5" /> Recommended For You
        </div>
        <h2 className="text-2xl md:text-3xl font-black text-white mb-2">Now You Know His Pattern. Use It.</h2>
        <p className="text-white/50 text-sm max-w-lg mx-auto leading-relaxed">
          Two playbooks written specifically for partners of {styleLabel} individuals. One explains the psychology. The other gives you the tools.
        </p>
      </div>

      <div className="p-6 md:p-8 space-y-5">
        {/* PLAYBOOK 1 */}
        <div
          className={`relative rounded-3xl border-2 transition-all duration-200 overflow-hidden ${
            hovered === "decode" ? "border-rose-400 shadow-lg shadow-rose-100" : "border-slate-200"
          }`}
          onMouseEnter={() => setHovered("decode")}
          onMouseLeave={() => setHovered(null)}
        >
          <div className="absolute top-0 right-0 bg-rose-600 text-white text-xs font-black px-4 py-2 rounded-bl-2xl uppercase tracking-widest">Most Popular</div>
          <div className="p-7 md:p-8">
            <div className="flex items-start gap-5 mb-6">
              <div className="shrink-0 w-14 h-14 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center text-2xl">🧠</div>
              <div>
                <h3 className="text-xl md:text-2xl font-black text-slate-900 leading-tight">Decode His Attachment</h3>
                <p className="text-rose-600 font-bold text-sm mt-1">The {styleLabel} Deep-Dive Playbook</p>
              </div>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed mb-6">
              A full clinical breakdown of how his attachment style formed, exactly how it will show up in your relationship, why the patterns repeat, and what is actually happening in his nervous system when he behaves the way he does. Stop guessing. Start understanding.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-7">
              {[
                { icon: "🔬", text: "The neuroscience of how his pattern formed" },
                { icon: "📋", text: "The 8 behavioral tells specific to his style" },
                { icon: "🔁", text: "Why the cycle repeats even when things are going well" },
                { icon: "🧭", text: "His core emotional wound — and why it drives everything" },
                { icon: "⚡", text: "His specific triggers — and how to stop accidentally hitting them" },
                { icon: "📈", text: "Can he change? The honest clinical answer" },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2.5 bg-slate-50 rounded-xl p-3.5 border border-slate-100">
                  <span className="text-lg shrink-0">{item.icon}</span>
                  <span className="text-slate-700 text-xs font-semibold leading-snug">{item.text}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-3xl font-black text-slate-900">$9.99</span>
                <span className="text-slate-400 text-sm ml-2">one-time</span>
              </div>
              <a href={PLAYBOOK_DECODE_URL} target="_blank" rel="noopener noreferrer"
                className="bg-rose-600 hover:bg-rose-500 text-white font-black text-sm px-7 py-3.5 rounded-2xl shadow-md hover:-translate-y-0.5 transition-all flex items-center gap-2">
                <Zap className="w-4 h-4" /> Get This Playbook
              </a>
            </div>
          </div>
        </div>

        {/* PLAYBOOK 2 */}
        <div
          className={`relative rounded-3xl border-2 transition-all duration-200 overflow-hidden ${
            hovered === "script" ? "border-emerald-400 shadow-lg shadow-emerald-100" : "border-slate-200"
          }`}
          onMouseEnter={() => setHovered("script")}
          onMouseLeave={() => setHovered(null)}
        >
          <div className="absolute top-0 right-0 bg-emerald-600 text-white text-xs font-black px-4 py-2 rounded-bl-2xl uppercase tracking-widest">Actionable</div>
          <div className="p-7 md:p-8">
            <div className="flex items-start gap-5 mb-6">
              <div className="shrink-0 w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-2xl">💬</div>
              <div>
                <h3 className="text-xl md:text-2xl font-black text-slate-900 leading-tight">How to Actually Reach Him</h3>
                <p className="text-emerald-600 font-bold text-sm mt-1">The Communication Scripts Playbook</p>
              </div>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed mb-6">
              Word-for-word scripts calibrated to his specific attachment style — how to ask for what you need without triggering his defenses, how to set limits without causing a shutdown or an explosion, and how to have the conversations that actually change the dynamic.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-7">
              {[
                { icon: "💬", text: "12 scripts matched to his specific attachment style" },
                { icon: "🚫", text: "The exact phrases that trigger his defenses — never say these" },
                { icon: "🎯", text: "How to set a limit without causing withdrawal or explosion" },
                { icon: "🔓", text: "How to ask for emotional availability without pushing him away" },
                { icon: "🧊", text: "What to do during a cold episode or stonewalling event" },
                { icon: "🛠️", text: "The repair script — how to recover after a bad fight" },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2.5 bg-slate-50 rounded-xl p-3.5 border border-slate-100">
                  <span className="text-lg shrink-0">{item.icon}</span>
                  <span className="text-slate-700 text-xs font-semibold leading-snug">{item.text}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-3xl font-black text-slate-900">$9.99</span>
                <span className="text-slate-400 text-sm ml-2">one-time</span>
              </div>
              <a href={PLAYBOOK_SCRIPT_URL} target="_blank" rel="noopener noreferrer"
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm px-7 py-3.5 rounded-2xl shadow-md hover:-translate-y-0.5 transition-all flex items-center gap-2">
                <Zap className="w-4 h-4" /> Get This Playbook
              </a>
            </div>
          </div>
        </div>

        {/* BUNDLE */}
        <div className="relative rounded-3xl bg-slate-900 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse at 60% 0%, #f43f5e18 0%, transparent 60%), radial-gradient(ellipse at 10% 100%, #10b98118 0%, transparent 60%)" }} />
          <div className="relative z-10 p-7 md:p-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white/60 text-xs font-black uppercase tracking-widest mb-4">
                  <Lock className="w-3 h-3" /> Bundle &amp; Save
                </div>
                <h3 className="text-2xl font-black text-white mb-2">Both Playbooks Together</h3>
                <p className="text-white/50 text-sm leading-relaxed max-w-md">
                  One explains why he is the way he is. The other tells you exactly what to say. Together they are the complete toolkit for navigating a {styleLabel} partner.
                </p>
                <div className="flex flex-wrap gap-3 mt-5">
                  {["Decode His Attachment Playbook", "How to Actually Reach Him", "Lifetime Access", "Instant Download"].map((item, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-white/60 text-xs font-bold">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> {item}
                    </div>
                  ))}
                </div>
              </div>
              <div className="shrink-0 text-center">
                <div className="mb-1"><span className="text-white/30 line-through text-lg font-black">$19.98</span></div>
                <div className="text-4xl font-black text-white">$15.99</div>
                <div className="text-emerald-400 text-xs font-black uppercase tracking-wider mb-4">Save $4 &mdash; Today Only</div>
                <a href={PLAYBOOK_BUNDLE_URL} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white text-slate-900 font-black text-sm px-8 py-4 rounded-2xl shadow-xl hover:bg-slate-100 hover:-translate-y-0.5 transition-all">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" /> Get Both &mdash; $15.99
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── MAIN REPORT ─────────────────────────────────────────────────────────────
export default function PartnerAttachmentReport({ profile }: { profile: any }) {
  const cfg = getStyleCfg(profile.styleLabel);
  const [open, setOpen] = useState<number | null>(null);
  const scores = profile.normalizedScores ?? {};

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <div className="max-w-4xl mx-auto px-4 py-10 pb-24 space-y-8">

        {/* HERO */}
        <div className={`${cfg.bg} text-white rounded-[32px] p-8 md:p-12 shadow-2xl border ${cfg.border} relative overflow-hidden text-center`}>
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full blur-3xl pointer-events-none" style={{ background: `${cfg.accent}18` }} />
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full blur-3xl pointer-events-none" style={{ background: `${cfg.accent}0c` }} />
          <div className="relative z-10">
            <div className={`inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest mb-8 border ${cfg.badge}`}>
              <Eye className="w-4 h-4" /> Partner Attachment Report
            </div>
            <div className="text-6xl mb-4">{cfg.emoji}</div>
            <h1 className="text-3xl md:text-5xl font-black mt-2 mb-3 leading-tight">His Style: {cfg.label}</h1>
            <p className="text-white/50 text-base mb-8">Volatility Index: <span className="text-white font-black">{profile.volatilityIndex ?? 0}/100</span></p>
            <div className="bg-white/5 border border-white/8 rounded-2xl p-6 text-left max-w-2xl mx-auto">
              <p className="text-white/30 text-xs font-black uppercase tracking-widest mb-3">Clinical Verdict</p>
              <p className="text-white/85 leading-relaxed text-base">{cfg.verdict}</p>
              <p className="mt-4 text-sm font-black" style={{ color: cfg.accent }}>{cfg.urgency}</p>
            </div>
          </div>
        </div>

        {/* SCORE BARS */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
          <h2 className="text-2xl font-black text-slate-800 mb-2 flex items-center gap-3">
            <Eye className="w-6 h-6 text-rose-500" /> Behavioral Subscale Breakdown
          </h2>
          <p className="text-slate-400 text-sm mb-7">How strongly each attachment dimension is expressed in his observed behavior.</p>
          <div className="space-y-5">
            {[
              { label: "Avoidance / Deactivation", val: scores.Avoidance ?? 0, note: "How strongly he pulls away from emotional closeness" },
              { label: "Anxiety / Hyper-activation", val: scores.Anxiety ?? 0, note: "How intensely he monitors for signs of abandonment" },
              { label: "Push-Pull / Disorganization", val: scores.FearfulRisk ?? 0, note: "How much hot-cold volatility appears in his behavior" },
              { label: "Secure Baseline", val: scores.SecureBase ?? 0, note: "How consistently he shows up as a regulated partner" },
            ].map((row, i) => (
              <div key={i}>
                <div className="flex justify-between mb-1">
                  <span className="text-slate-700 font-bold text-sm">{row.label}</span>
                  <span className="text-slate-400 text-sm font-black">{row.val}%</span>
                </div>
                <p className="text-slate-400 text-xs mb-2">{row.note}</p>
                <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                  <div className={`${cfg.bar} h-full rounded-full transition-all duration-1000`} style={{ width: `${row.val}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* DEEP DIVE */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
          <h2 className="text-2xl font-black text-slate-800 mb-6 flex items-center gap-3">
            <Brain className="w-6 h-6 text-rose-500" /> What Is Actually Happening Inside Him
          </h2>
          <p className="text-slate-600 leading-relaxed text-base">{cfg.deepDive}</p>
        </div>

        {/* ACCORDION: TRAJECTORY + TRAP */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
          <h2 className="text-2xl font-black text-slate-800 mb-6 flex items-center gap-3">
            <TrendingUp className="w-6 h-6 text-rose-500" /> Relationship Impact Analysis
          </h2>
          <div className="space-y-4">
            {[
              { label: cfg.trajectoryTitle, body: cfg.trajectoryBody },
              { label: cfg.trapTitle, body: cfg.trapBody },
            ].map((item, i) => (
              <div key={i} className="border border-slate-200 rounded-2xl overflow-hidden">
                <button
                  className="w-full text-left px-6 py-5 flex items-center justify-between hover:bg-slate-50 transition-colors"
                  onClick={() => setOpen(open === i ? null : i)}
                >
                  <span className="font-black text-slate-800">{item.label}</span>
                  <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-200 shrink-0 ${open === i ? "rotate-180" : ""}`} />
                </button>
                {open === i && (
                  <div className="px-6 pb-5 text-slate-600 text-sm leading-relaxed bg-slate-50">{item.body}</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* COMMUNICATION SCRIPTS */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
          <h2 className="text-2xl font-black text-slate-800 mb-2 flex items-center gap-3">
            <MessageSquare className="w-6 h-6 text-rose-500" /> {cfg.scriptTitle}
          </h2>
          <p className="text-slate-400 text-sm mb-6">Calibrated to {cfg.label} partners. Use these exact phrases — they are designed to bypass his default defenses.</p>
          <div className="space-y-4">
            {cfg.scripts.map((script, i) => (
              <div key={i} className="bg-rose-50 border-l-4 border-rose-400 rounded-r-2xl p-5">
                <p className="text-rose-800 text-sm font-bold leading-relaxed italic">{script}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 bg-amber-50 border border-amber-200 rounded-2xl p-5">
            <p className="text-amber-800 text-sm font-bold flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
              {cfg.scriptWarning}
            </p>
          </div>
        </div>

        {/* 5-DAY PROTOCOL */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
          <h2 className="text-2xl font-black text-slate-800 mb-6 flex items-center gap-3">
            <Target className="w-6 h-6 text-rose-500" /> Your 5-Day Action Protocol
          </h2>
          <div className="space-y-4">
            {cfg.actionSteps.map((step, i) => (
              <div key={i} className="flex gap-4 items-start">
                <div className="shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center font-black text-sm text-white shadow-sm" style={{ background: cfg.accent }}>
                  {step.day.replace("Day ", "D")}
                </div>
                <div className="bg-slate-50 rounded-2xl p-5 flex-1 border border-slate-100">
                  <p className="font-extrabold text-slate-800 mb-1">{step.action}</p>
                  <p className="text-slate-500 text-sm leading-relaxed">{step.why}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SILENCE COST */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
          <h2 className="text-2xl font-black text-slate-800 mb-2 flex items-center gap-3">
            <TrendingUp className="w-6 h-6 text-rose-500" /> What Happens If Nothing Changes
          </h2>
          <p className="text-slate-500 text-sm mb-7">Research on insecure attachment patterns shows these outcomes compound when the dynamic is not addressed.</p>
          <div className="space-y-5">
            {cfg.silenceCosts.map((row, i) => (
              <div key={i}>
                <div className="flex justify-between mb-2">
                  <span className="text-slate-700 font-bold text-sm">{row.label}</span>
                  <span className="text-slate-500 text-sm font-black">{row.pct}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2.5">
                  <div className={`${cfg.bar} h-full rounded-full transition-all duration-1000`} style={{ width: `${row.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* PLAYBOOKS */}
        <PlaybooksUpsell accent={cfg.accent} styleLabel={cfg.label} />

        {/* CLOSING */}
        <div className={`${cfg.bg} rounded-[32px] p-8 text-center border ${cfg.border} relative overflow-hidden`}>
          <div className="absolute inset-0 rounded-[32px] pointer-events-none" style={{ background: `radial-gradient(ellipse at 50% 50%, ${cfg.accent}12 0%, transparent 70%)` }} />
          <div className="relative z-10">
            <div className="flex items-center justify-center gap-2 mb-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: cfg.accent }}>
                  <Star className="w-4 h-4 text-white fill-white" />
                </div>
              ))}
            </div>
            <h3 className="text-2xl font-black text-white mb-3">You Now Have the Map</h3>
            <p className="text-white/60 text-base max-w-lg mx-auto leading-relaxed mb-6">
              Understanding his attachment style does not fix the relationship. But it means you stop fighting ghosts. You know what you are working with.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              {["Full Attachment Analysis", "Communication Scripts", "5-Day Protocol"].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-white/70 font-bold">
                  <CheckCircle2 className="w-4 h-4" style={{ color: cfg.accent }} /> {item}
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

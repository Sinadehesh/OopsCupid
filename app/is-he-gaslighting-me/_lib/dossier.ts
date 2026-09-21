import type { Dossier, Subscale, SubscaleInsight } from "@/lib/report/dossier";

/**
 * "Is he gaslighting me?" — paid report content.
 *
 * The subscale writing here is carried over from the previous report,
 * which was the strongest copy on the site; what it lacked was charts, a
 * plan, and a price that matched what we actually charge. It also sold
 * Gumroad playbooks that do not exist — those are gone.
 */

const MEASURES: Record<string, { short: string; measures: string }> = {
  reality_denial:     { short: "Denial", measures: "How often he denies events you both witnessed." },
  invalidation:       { short: "Invalidation", measures: "Whether your reactions are treated as information or as defects." },
  blame_reversal:     { short: "Blame flip", measures: "Who ends up apologising when the subject is his behaviour." },
  confusion_tactics:  { short: "Confusion", measures: "Moving targets, rewritten rules, and contradictory accounts." },
  isolation_control:  { short: "Isolation", measures: "Pressure on your access to other people and your own life." },
  self_trust_erosion: { short: "Self-trust", measures: "The damage meter — how much your own judgement still counts." },
};

const INSIGHTS: Record<string, SubscaleInsight> = {
  reality_denial: {
    mechanism:
      "Denial of a shared event works because it is unfalsifiable in the moment: there is no recording, so the disagreement becomes one word against another. Repeated often enough, the question stops being what happened and becomes whose memory is reliable — and that is a contest the more confident person wins regardless of the facts.",
    high: "He reliably denies things you both witnessed. At this level it is not forgetfulness — repeated, confident denial of shared events is the core gaslighting manoeuvre, and it is working exactly as designed if you have noticed yourself trusting your own recall less.",
    mid: "Denial shows up at meaningful moments — usually when accountability is on the table. Watch whether it clusters around his mistakes; selective amnesia is a strategy, not a memory problem.",
    low: "Outright denial of shared reality is not a significant pattern in your answers. Your disagreements appear to stay about the topic, not about whether the topic happened.",
    move:
      "Keep a dated private log — one line, facts only, written the same day. Not to show him; showing it escalates. It exists so that in three weeks you can check your memory against a record instead of against his account.",
  },
  invalidation: {
    mechanism:
      "Invalidation reframes a reaction as a symptom. Once your response is the thing being discussed, whatever caused it is off the table — and after enough repetitions you begin performing the reframe yourself, which is the point at which he no longer needs to do it.",
    high: "Your feelings are being routinely reclassified as defects — 'dramatic', 'too sensitive', 'crazy'. Done this consistently, invalidation trains you to pre-dismiss your own reactions before he even has to.",
    mid: "Your reactions get downgraded often enough to notice. The test: does he engage with WHAT you feel, or only with whether you should feel it? Only the second one erodes you.",
    low: "Invalidation is not a strong signal here — your emotional reactions appear to be treated as information rather than as malfunctions.",
    move:
      "When your reaction becomes the subject, say the topic out loud again once and stop: 'We're talking about the phone call.' Do not defend the reaction. Defending it concedes that it is what is in question.",
  },
  blame_reversal: {
    mechanism:
      "This is DARVO — deny, attack, reverse victim and offender. It works because it changes the conversation's direction faster than you can track, and the emotional force of being accused overrides the memory of what you came in to discuss. You leave having apologised without ever deciding to.",
    high: "Conversations about his behaviour reliably end with you apologising. That inversion — complainant becomes defendant — is DARVO running at full strength, and it is why you leave arguments feeling more guilty than heard.",
    mid: "The reversal appears under pressure: when cornered, he redirects to your tone, your timing, your past. Note the pattern — accountability deflected sideways is still accountability avoided.",
    low: "Blame appears to stay roughly where it belongs in your answers. When something is his fault, the conversation is allowed to be about that.",
    move:
      "Write one sentence before the conversation describing what it is about, and keep it. When the subject changes to you, return to that sentence rather than answering the new charge. Answering it is how the reversal completes.",
  },
  confusion_tactics: {
    mechanism:
      "Sustained confusion is cheaper than persuasion. A person who is disoriented cannot mount a consistent objection, so the rules keep changing rather than the argument being won. Exhaustion produces the agreement, and exhaustion does not feel like being convinced — which is why you can concede and still not know why.",
    high: "Moving targets, rewritten histories, contradictory rules — your answers describe engineered confusion. A person who keeps you disoriented never has to keep you convinced; exhaustion does the agreeing for you.",
    mid: "There is enough inconsistency to keep you off balance, though not a total fog. Keep a simple rule: if you consistently leave conversations less clear than you entered them, the confusion is a feature.",
    low: "You do not report significant engineered confusion. Whatever conflicts exist, the ground rules seem to hold still while you argue on them.",
    move:
      "End conversations at a fixed time rather than at resolution. 'I'm going to stop here and pick it up tomorrow.' Nothing that depends on wearing you down survives a conversation with a clock on it.",
  },
  isolation_control: {
    mechanism:
      "Isolation is the load-bearing element. Every other tactic on this chart depends on there being nobody to check the account against — with outside witnesses, denial and rewritten history simply fail. This is why the pressure is rarely framed as a restriction; it arrives as jealousy, as concern, or as a low-grade cost attached to seeing other people.",
    high: "The pattern points to shrinking territory: friction around friends and family, monitoring, and penalties for independence. Isolation is what turns gaslighting from an argument tactic into a closed system — no outside witness left to check reality against.",
    mid: "Some pull toward isolation registers — discomfort when you are unreachable, subtle downgrading of people close to you. Guard your outside relationships now; they are the reality-checks he would have to beat later.",
    low: "Your access to your own people and life appears intact. This is a genuine protective factor — outside witnesses make sustained gaslighting much harder to run.",
    move:
      "Restore one relationship this week that has quietly gone dormant, and do not make it a statement. One person outside the system who knows what is happening changes the entire dynamic, whatever you decide to do next.",
  },
  self_trust_erosion: {
    mechanism:
      "This dimension measures damage rather than behaviour, which makes it the one that decides how hard leaving would be. Self-trust is not lost through one incident; it goes through the accumulated experience of being wrong about your own perception, and it rebuilds the same way — through repeated evidence that you were not.",
    high: "This is the damage meter, and it is high: second-guessing your memory, outsourcing your judgement, feeling 'crazy' around one specific person. The repair starts with evidence — a private dated log will show you within weeks that your recall was never the problem.",
    mid: "Your self-trust is taking real hits but has not collapsed. You still catch the distortions — later, at 2 a.m. Shortening that delay from hours to minutes is the skill to build now.",
    low: "Your self-trust is holding. You can disagree with him without doubting your own mind afterwards — keep treating that as non-negotiable, because it is the exact asset gaslighting exists to take.",
    move:
      "Each evening, write one thing you were right about that day. Small and mundane is better. This is not positive thinking; it is rebuilding a record, and a record is the only thing that argues back against months of correction.",
  },
};

interface Subscale_ { key: string; label: string; score: number; max: number; pct: number }
interface GaslightingResult {
  totalScore: number; maxScore: number;
  tacticsScore: number; tacticsMax: number;
  impactScore: number; impactMax: number;
  criticalFlags: number; level: number;
  levelData: { title: string; subtitle: string; advice: string };
  subscales: Subscale_[];
  topDrivers: Subscale_[];
}

const BANDS: Record<number, { id: string; label: string; accent: string; verdict: string; urgency: string; perspective: string }> = {
  5: {
    id: "l5", label: "Level 5 — Severe Pattern", accent: "#f43f5e",
    verdict:
      "Your answers describe a sustained pattern built around confusion, control and self-doubt rather than around any particular disagreement. At this level the tactics are not incidental to the relationship — they are how it is run. You do not need further proof before taking your own distress seriously.",
    urgency:
      "Priority this week is a witness and a record, not a conversation. Tell one person outside the relationship what is happening, and start a dated log. Both are things you can do without him knowing and without deciding anything yet.",
    perspective:
      "Not having seen this sooner is not a failure of intelligence. Gaslighting works specifically by disabling the faculty you would need to detect it — which is why an outside measure is worth more here than reflection.",
  },
  4: {
    id: "l4", label: "Level 4 — Significant Pattern", accent: "#fb7185",
    verdict:
      "There is meaningful erosion of your self-trust, and the tactics scores indicate it is being produced rather than imagined. At this level clarity does not usually arrive through one well-handled conversation — it comes from facts, from an outside perspective, and from stepping out of the circular logic rather than trying to win inside it.",
    urgency:
      "Start the dated log now. Not for him, and not as evidence for an argument — as something to read in three weeks when you are being told the last month did not happen the way you remember.",
    perspective:
      "A significant pattern is not a life sentence for the relationship, and it does not mean everything in it was false. It means the current dynamic is damaging something you need.",
  },
  3: {
    id: "l3", label: "Level 3 — Emerging Pattern", accent: "#f97316",
    verdict:
      "This reads less like misunderstanding and more like a pattern of destabilisation. The useful question is not whether any single incident was extreme — it is whether your read on reality keeps getting weaker while his keeps getting stronger.",
    urgency:
      "This is the level where tracking changes things fastest. Incidents, dated, with no commentary. A month of notes settles a question that a year of trying to remember will not.",
    perspective:
      "Patterns at this level often stall or reverse when they stop working, and the log is a large part of what stops them working.",
  },
  2: {
    id: "l2", label: "Level 2 — Early Distortion", accent: "#f59e0b",
    verdict:
      "Something is bending the emotional reality of the relationship, though it has not become a system. You are not overreacting by paying attention now — the early stage is when this is cheapest to address.",
    urgency:
      "Track repeated moments rather than isolated excuses. One incident is always explainable; the third one on the same theme is not.",
    perspective:
      "A great many relationships produce a score in this range during a bad period. What matters is the direction over the next few months.",
  },
  1: {
    id: "l1", label: "Level 1 — Minimal Evidence", accent: "#eab308",
    verdict:
      "You may be dealing with conflict, immaturity or inconsiderate communication, but the full gaslighting pattern is not strongly present in your answers. The distinction matters, because the two need opposite responses: ordinary conflict improves with directness, and gaslighting gets worse with it.",
    urgency:
      "Nothing urgent. Notice whether raising a concern leads to repair or to defensiveness — that single test separates the two cases better than any other.",
    perspective:
      "Something prompted you to take this. A low score does not mean nothing is wrong; it means what is wrong is probably addressable by talking about it.",
  },
  0: {
    id: "l0", label: "Level 0 — Clear", accent: "#10b981",
    verdict:
      "Your answers show very little of this pattern. Disagreements in your relationship appear to stay about the subject rather than turning into a contest over whose account of events is true.",
    urgency: "Nothing here needs acting on.",
    perspective:
      "If something still feels wrong, it is worth looking at elsewhere — this instrument measures one specific dynamic and does not cover everything that can be difficult in a relationship.",
  },
};

export function buildGaslightingDossier(result: GaslightingResult): Dossier {
  const band = BANDS[result.level] ?? BANDS[1];
  const score = Math.round((result.totalScore / (result.maxScore || 200)) * 100);

  const subscales: Subscale[] = result.subscales.map((s) => ({
    key: s.key,
    label: s.label,
    short: MEASURES[s.key]?.short ?? s.label,
    value: Math.max(0, Math.min(100, Math.round(s.pct))),
    measures: MEASURES[s.key]?.measures ?? "",
  }));

  const ranked = [...subscales].sort((a, b) => b.value - a.value);
  const top = ranked[0];
  const second = ranked[1];
  const tacticsPct = Math.round((result.tacticsScore / result.tacticsMax) * 100);
  const impactPct = Math.round((result.impactScore / result.impactMax) * 100);

  const deepDive = [
    {
      heading: "Tactics versus damage — read these two numbers together",
      body:
        `Your tactics score is ${tacticsPct}% and your impact score is ${impactPct}%. The first measures what is being done; the second measures what it has cost you, and the relationship between them tells you more than either alone. ` +
        (impactPct > tacticsPct + 10
          ? "Impact running ahead of tactics usually means a long exposure — the behaviour does not have to be extreme to do this much damage once it has been running for years, and it also means recovery starts as soon as the exposure does."
          : tacticsPct > impactPct + 10
          ? "Tactics running ahead of impact is the better of the two shapes: it means a considerable amount is being aimed at you and a considerable amount is not landing. Your self-trust is still doing its job, and protecting it is the single highest-value thing on this page."
          : "The two are close, which is the usual shape — the behaviour and the damage have moved together. Reducing exposure reduces both, in that order."),
    },
    {
      heading: `Why ${top.label} is doing the most work`,
      body:
        `${top.label} scored ${top.value} and ${second.label} scored ${second.value}. These are not separate problems; they are two parts of one mechanism. ` +
        `${top.short} is how your account of events gets displaced, and ${second.short} is what stops you correcting it afterwards. Addressing the higher one alone tends not to hold, because the second re-establishes the first within a few weeks. The counter-moves on both cards are designed to be run together.`,
    },
    {
      heading: "Why arguing harder makes this worse",
      body:
        "The instinct — and it is a reasonable one — is to find better evidence, be clearer, choose a calmer moment. It fails consistently, and not because you have been doing it badly. This dynamic does not run on who is right; it runs on who can still think clearly at the end. A better argument simply extends the conversation, and a longer conversation favours the person who is not trying to hold a factual position. This is why the moves in this report are structural rather than rhetorical: a dated log, a fixed end-time, an outside witness. None of them require you to win anything.",
    },
    {
      heading: "What recovering self-trust actually involves",
      body:
        "Self-trust is not restored by being told you are right. It comes back through accumulated evidence that your perception was accurate, which is why the dated log does more than any reassurance can — within about three weeks it stops being a record of incidents and becomes a record of your judgement being sound. Expect the first fortnight to feel worse rather than better: writing things down removes the ambiguity that has been making the situation liveable. That discomfort is the pattern becoming visible, not the situation deteriorating.",
    },
    ...(result.criticalFlags >= 3
      ? [{
          heading: "About the critical items you flagged",
          body:
            `You answered at the top of the scale on ${result.criticalFlags} items that are weighted differently from the rest, because they are the ones most associated with coercive control rather than with a difficult relationship. That is why your level was escalated. It does not mean you are in danger tonight, and nothing here asks you to confront him. It does mean this is worth discussing with one person outside the relationship this week — a friend, a GP, or a helpline (in the UK, 0808 2000 247, free and 24-hour). Telling one person costs nothing you cannot take back.`,
        }]
      : []),
  ];

  return {
    quiz: "Is He Gaslighting Me?",
    title: "Your Reality Defence Report",
    scoreLabel: "Gaslighting Index",
    score: Math.max(0, Math.min(100, score)),
    band,
    archetype: result.levelData?.subtitle?.split("|")[0]?.trim() || undefined,
    archetypeLabel: "Where this sits",
    topicLabel: "what he is doing and how to hold your ground",
    subscales,
    insights: INSIGHTS,
    deepDive,
    scripts: [
      {
        situation: "He denies something you clearly remember",
        say: "We remember it differently. I'm not going to debate it.",
        why:
          "It concedes nothing and offers no opening. Trying to prove the memory is the trap — the point of the denial is to put your recall on trial, and refusing the trial is the only way to not lose it.",
      },
      {
        situation: "The subject switches to your tone or your reaction",
        say: "We can talk about how I said it after we've finished talking about what happened.",
        why:
          "This does not reject the complaint about your tone, so there is nothing to escalate. It puts it in a queue — and the reversal only works if it happens immediately.",
      },
      {
        situation: "The conversation is going in circles",
        say: "I'm going to stop here. We can come back to it tomorrow.",
        why:
          "Circular conversations are won by whoever lasts longer, which is never the person trying to hold a consistent account. Leaving on a clock is not avoidance; it removes the only mechanism the circle has.",
      },
      {
        situation: "He objects to you seeing friends or family",
        say: "I'm going. We can talk about it when I'm back.",
        why:
          "Brief, not a negotiation, and not an argument about whether the objection is reasonable. Your outside relationships are the single biggest protective factor on this chart, and they are defended by attendance rather than by debate.",
      },
    ],
    plan: [
      {
        window: "Days 1–3",
        title: "Start the log",
        detail:
          "One line per incident, written the same day: date, what was said, what you had said before it. No feelings, no interpretation — those get argued with, and facts do not. Keep it somewhere he does not have access to. This is for you, not for him.",
      },
      {
        window: "Days 4–7",
        title: "Re-establish one outside relationship",
        detail:
          "Contact one person who has drifted, and see them. You do not have to tell them anything. The value is structural: isolation is what makes every other dimension on your chart possible, and one active outside relationship measurably weakens all of them.",
      },
      {
        window: "Days 8–11",
        title: `Run the counter-move for ${top.label}`,
        detail:
          `Your highest dimension at ${top.value}/100. Use its card above, exactly as written, in one real conversation. Then write down what happened in the log. The response to a boundary is itself information — often clearer information than the behaviour that prompted it.`,
      },
      {
        window: "Days 12–14",
        title: "Read the log as if it were someone else's",
        detail:
          "Two weeks of dated entries, read in one sitting, with no memory of the surrounding context. This is the closest you can get to an outside view of your own relationship. Whatever you conclude, you will be concluding it from a record rather than from an impression — which is exactly what has been unavailable to you until now.",
      },
    ],
    faq: [
      {
        q: "What if he isn't doing it on purpose?",
        a: "Entirely possible, and it changes what you do rather than what is happening. Some of these patterns are learned, and a person can run all of them without a plan. Intent matters for whether the relationship can change; it has no bearing on whether your self-trust is being eroded, and the log works the same either way.",
      },
      {
        q: "Should I show him this report?",
        a: "No. It is built from your perception, which makes it the right basis for your decisions and a poor basis for a debate. Handing it over converts something you now know into something you have to prove — and proving it is the contest this dynamic is designed to win.",
      },
      {
        q: "What if I'm the one distorting things?",
        a: "This is the most common question at every level, and the fact that you are asking it is itself informative — the pattern produces it. The log settles it either way: two weeks of same-day factual notes will show you whether your account holds up. That is why it is the first step rather than the last.",
      },
      {
        q: "Does a high score mean I should leave?",
        a: "The report does not make that recommendation, and it is not in a position to. What a high score means is that decisions made inside this dynamic are unreliable, which is why the plan is built around restoring your ability to judge rather than around a conclusion. Decide once you can trust the deciding.",
      },
    ],
  };
}

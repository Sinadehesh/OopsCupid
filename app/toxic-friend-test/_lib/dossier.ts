import type { Dossier, Subscale, SubscaleInsight } from "@/lib/report/dossier";
import { buildEvidence, humanise } from "@/lib/report/evidence";
import { TOXIC_FRIEND_QUESTIONS, OPTIONS } from "../_data/questions";

/**
 * "Toxic friend test" — paid report content.
 *
 * This quiz is about ONE named person, not a circle, and the scoring can
 * raise a safety flag. The writing here has to stay usable by someone who
 * is frightened: no dramatics, no instruction to confront, and an explicit
 * route out at the top when the flag is set.
 */

const MEASURES: Record<string, { label: string; short: string; measures: string }> = {
  victimization:  { label: "Direct Victimisation", short: "Victimisation", measures: "Things done to you directly — humiliation, threats, control, pressure." },
  quality:        { label: "Friendship Quality Deficit", short: "Quality", measures: "What is missing: reciprocity, warmth, reliability, interest in your life." },
  aggression:     { label: "Relational Aggression", short: "Aggression", measures: "Harm routed through other people — exclusion, rumours, social positioning." },
  manipulation:   { label: "Manipulation", short: "Manipulation", measures: "Guilt, obligation, rewritten history, and pressure disguised as closeness." },
  antisocial:     { label: "Antisocial Conduct", short: "Conduct", measures: "Rule-breaking, dishonesty and risk-taking that pulls you in with them." },
  vulnerability:  { label: "Your Exposure", short: "Exposure", measures: "How much of your life — money, housing, secrets, social standing — runs through them." },
  impact:         { label: "Impact On You", short: "Impact", measures: "What this friendship has cost you in sleep, mood, confidence and other relationships." },
};

const INSIGHTS: Record<string, SubscaleInsight> = {
  victimization: {
    mechanism:
      "Direct harm in a friendship is usually calibrated: it stays just under the threshold where you would name it as mistreatment, because past that threshold you would leave. The calibration is what makes it survivable, and survivable is what makes it last.",
    high: "You are on the receiving end of behaviour you would not accept from a stranger. The reason you accept it here is history — you are pricing in years of context that the behaviour itself no longer earns.",
    mid: "There are real incidents, but they are occasional rather than the texture of the friendship. Keep a note of dates; frequency is the thing memory gets wrong.",
    low: "Nothing here points to direct mistreatment. Whatever is wrong in this friendship is happening through other channels.",
    move:
      "Write down the three worst specific incidents with dates. Not feelings, not patterns — incidents. Most people find this list is shorter than their sense of it, or considerably worse. Either result is more useful than the impression you have now.",
  },
  quality: {
    mechanism:
      "A friendship can be entirely free of bad behaviour and still be a poor deal, because the harm is in the absence rather than the presence. Nothing happens that you could point to, which is exactly why it is so hard to justify leaving.",
    high: "The basics are not there: they do not ask about your life, they are not reliable, and you would not call them first with either good or bad news. What you have is a history and a habit.",
    mid: "Some of the fundamentals are present and some are missing. The usual shape is that they show up for the big things and not for any of the small ones.",
    low: "The core of the friendship is sound. If something feels wrong it is a specific behaviour, not the foundation.",
    move:
      "Ask yourself one question: if you met this person today, knowing what you know, would you pursue the friendship? Keeping something for its history is a legitimate choice — but make it knowingly.",
  },
  aggression: {
    mechanism:
      "Relational aggression works through third parties, which makes it nearly impossible to confront: there is no incident, only an atmosphere, and raising it makes you sound like the problem. That deniability is the mechanism, not a side effect.",
    high: "Harm here is routed socially. You have probably noticed the effects — invitations that stopped, a cooling from mutual friends — without being able to point at a cause, which is precisely how this works.",
    mid: "Some social positioning at your expense, more likely opportunistic than sustained.",
    low: "They are not working against you socially. This matters more than it sounds: it is the difference between a difficult friend and an unsafe one.",
    move:
      "Build one friendship that does not touch this person's network. Relational aggression needs shared social ground to work, and a separate circle removes most of its leverage without a confrontation.",
  },
  manipulation: {
    mechanism:
      "Manipulation persists because each individual instance is arguable. Any one guilt trip, rewritten memory or well-timed crisis can be explained; only the pattern is undeniable, and patterns are exactly what an ongoing friendship makes hard to see.",
    high: "Guilt and obligation are load-bearing in this friendship. The reliable tell is how the conversations end: you agree to things, and then you cannot fully reconstruct how the agreement happened.",
    mid: "There is some pressure and some selective memory, though not enough to shape most decisions.",
    low: "What they ask for, they ask for openly. That is the single most protective thing on this chart.",
    move:
      "For two weeks, make no decision during a conversation with them. 'I'll think about it and let you know tomorrow' is a complete sentence. Almost all manipulation depends on an answer in the moment.",
  },
  antisocial: {
    mechanism:
      "This dimension measures whether their behaviour creates risk that lands on you — legally, financially, or reputationally. Proximity is the whole issue: you do not have to participate to carry the consequences.",
    high: "Their conduct exposes you. Look at what is joint or shared — a lease, a loan, an account, a workplace — because that is where their decisions become your problem.",
    mid: "Some behaviour you would not choose, without a direct line to you yet.",
    low: "Their conduct does not create risk for you.",
    move:
      "List anything legally or financially shared between you. Untangle what can be untangled quietly, starting now, before it becomes urgent or contested.",
  },
  vulnerability: {
    mechanism:
      "Exposure is not about their behaviour at all — it is about your options. The more of your life that runs through one person, the more expensive leaving becomes, and cost of exit is what determines what you will tolerate.",
    high: "A great deal of your life is entangled with this person. That is why the situation feels stuck: it is stuck, structurally, and no amount of clarity about their behaviour changes that on its own.",
    mid: "Some entanglement — a shared circle, a shared commitment — enough to make distance awkward rather than difficult.",
    low: "You are not dependent on this friendship. You can change the terms whenever you decide to.",
    move:
      "Reduce one dependency this month. One. Money is usually the fastest, housing the slowest, social circle the most underrated. Every one you remove lowers the price of every future decision.",
  },
  impact: {
    mechanism:
      "Impact is the only dimension that measures you rather than them. It matters because it settles the argument you are probably having with yourself — whether this is bad enough to count. Cost is the answer to that question; intent is not.",
    high: "This friendship is costing you measurably: sleep, mood, confidence, other relationships. That is a sufficient reason on its own, regardless of what they intend or how they would explain it.",
    mid: "There is a real cost, concentrated around specific episodes rather than constant.",
    low: "Whatever is happening, it is not damaging you. That gives you room to make this decision slowly.",
    move:
      "Score your mood out of 10 before and after every contact for two weeks. The gap is the number to make your decision on — and it is far harder to argue yourself out of than a feeling.",
  },
};

interface ToxicResult {
  /** Raw answers, present on results computed after this shipped. */
  answers?: Record<string, string>;
  riskScore: number;
  tier: number;
  archetype: string;
  description: string;
  safetyFlagTriggered: boolean;
  mods: Record<string, number>;
}

const BANDS: Record<number, { id: string; label: string; accent: string; verdict: string; urgency: string; perspective: string }> = {
  5: {
    id: "t5",
    label: "Tier 5 — Severe",
    accent: "#f43f5e",
    verdict:
      "Your answers describe behaviour well outside the range of a difficult friendship. Several dimensions are elevated at once, which is what separates a friend who is going through something from a dynamic that is structurally harmful. The pattern does not require intent to be real, and it does not require you to prove anything to anyone before acting on it.",
    urgency:
      "Reduce contact and reduce exposure before you attempt any conversation. Confrontation with a pattern this dense tends to escalate rather than resolve, and it works much better once you are less entangled.",
    perspective:
      "Staying this long is not a failure of judgement. Friendships do not change all at once; they change one tolerable increment at a time, which is exactly why they are hard to see from inside.",
  },
  4: {
    id: "t4",
    label: "Tier 4 — High Concern",
    accent: "#fb7185",
    verdict:
      "This is not ordinary friction. The scores indicate a persistent pattern rather than a bad patch, and the chart below shows which mechanism it runs on. Friendships in this range rarely improve by themselves, because nothing in them creates pressure to change.",
    urgency:
      "Act in the next few weeks rather than waiting for a clear-cut incident. The nature of this pattern is that the clear-cut incident does not arrive; it stays just below that line.",
    perspective:
      "High concern is not a verdict on the whole person, and it does not mean the good parts were fake. It means the current arrangement is costing you more than it returns.",
  },
  3: {
    id: "t3",
    label: "Tier 3 — Imbalanced",
    accent: "#f97316",
    verdict:
      "You are giving substantially more than you receive. That is the whole finding — the scores do not indicate hostility or manipulation, they indicate a friendship where the effort, attention and emotional labour run largely in one direction.",
    urgency:
      "No emergency. This is the range where changing the format — less often, shorter, clearer limits — usually fixes things without any confrontation at all.",
    perspective:
      "Imbalance is frequently unintentional. Some people genuinely do not notice, and they adjust when the balance shifts on its own.",
  },
  2: {
    id: "t2",
    label: "Tier 2 — Strained",
    accent: "#f59e0b",
    verdict:
      "There is real friction here and it is worth taking seriously, but the profile fits mismatched expectations rather than harm. The two look similar from inside and call for entirely different responses.",
    urgency:
      "Nothing needs doing quickly. Read the top two dimensions below — that is where the friction is coming from.",
    perspective:
      "Most long friendships pass through this range at least once, usually when one person's life changes and the other's has not.",
  },
  1: {
    id: "t1",
    label: "Tier 1 — Low Concern",
    accent: "#10b981",
    verdict:
      "This friendship does not show a toxic pattern. There may well be friction — the chart below shows where — but friction and toxicity are different things, and your answers point clearly at the first.",
    urgency:
      "Nothing to act on. If you took this quiz because of one specific incident, the chart will show whether it is part of a pattern or an isolated event.",
    perspective:
      "Taking a test like this usually means something is bothering you. A low score does not mean the thing that prompted it was not real — only that it is not the start of a pattern.",
  },
};

export function buildToxicFriendDossier(data: ToxicResult): Dossier {
  const band = BANDS[data.tier] ?? BANDS[1];

  // Validity items are attention checks, not statements about her life;
  // they are excluded from the score and have no business being quoted.
  const evidence = data.answers
    ? buildEvidence(
        TOXIC_FRIEND_QUESTIONS.filter((q) => q.module !== "validity").map((q) => ({
          id: q.id,
          text: q.text,
          category: humanise(q.subscale),
          options: OPTIONS[q.responseType],
          min: 0,
        })),
        data.answers
      )
    : undefined;

  const subscales: Subscale[] = Object.entries(MEASURES).map(([key, m]) => ({
    key,
    label: m.label,
    short: m.short,
    value: Math.max(0, Math.min(100, Math.round(data.mods?.[key] ?? 0))),
    measures: m.measures,
  }));

  const ranked = [...subscales].sort((a, b) => b.value - a.value);
  const top = ranked[0];
  const second = ranked[1];

  const deepDive = [
    ...(data.safetyFlagTriggered
      ? [{
          heading: "Read this part first",
          body:
            "One or more of your answers indicated fear, threat or coercion. That single fact outranks every score on this page. Nothing in this report asks you to confront this person, and you should not treat the action plan as a reason to have a difficult conversation with them. If you are in the UK, the National Domestic Abuse Helpline (0808 2000 247) also advises on coercive friendships and non-partner relationships; elsewhere, a local support line will do the same. Talking it through with one person outside the situation is the single most useful thing you can do this week, and it costs you nothing you cannot take back.",
        }]
      : []),
    {
      heading: "What your two highest dimensions mean together",
      body:
        `${top.label} scored ${top.value} and ${second.label} scored ${second.value}. Reading them together is more informative than reading either alone: ${top.short} describes what is happening, and ${second.short} describes what makes it hold. ` +
        `A friendship needs both to persist — a mechanism and something that keeps you in range of it. This is why advice aimed only at the behaviour tends not to work: it addresses the first and leaves the second untouched.`,
    },
    {
      heading: "Why it is so hard to judge this from inside",
      body:
        "Three things are working against your assessment at once. First, history: you are scoring a person against years of evidence, most of it good, and the recent months are a small sample by comparison. Second, incrementalism — nothing in a friendship shifts far enough in one step to trigger a reaction, so the baseline moves with it. Third, the sunk cost of explanation: once you have defended someone to other people, changing your mind means revising those conversations too. None of these are errors of judgement. They are what it is like to evaluate something you are inside of, which is the entire reason a scored instrument is more useful here than reflection.",
    },
    {
      heading: "Intent is the wrong question",
      body:
        "Most people in this situation spend their energy trying to work out whether the other person means it. That question cannot be answered from outside someone's head, and — more importantly — the answer does not change anything. A friend who drains you without meaning to drains you exactly as much as one who does it deliberately. Intent matters for whether you forgive them; it has no bearing on whether the arrangement is good for you. Decide on cost, which you can actually measure, and leave intent as a separate question you can take your time over.",
    },
    {
      heading: "What distance actually looks like",
      body:
        "Very few of these situations end in a confrontation, and the ones that do rarely go well — a pattern that has been denied for years is not going to be conceded in one conversation. What works instead is reducing three things in order: exposure (anything shared that makes leaving expensive), frequency (fewer and shorter contacts, with no announcement), and availability (slower replies, no decisions made in the moment). Done quietly, over about six weeks, this changes the relationship without ever requiring a scene. Friendships that were salvageable often recover on their own once the imbalance stops being subsidised.",
    },
  ];

  return {
    quiz: "Toxic Friend Test",
    title: "Your Friendship Risk Dossier",
    scoreLabel: "Toxicity Index",
    score: Math.max(0, Math.min(100, Math.round(data.riskScore))),
    band,
    archetype: data.archetype,
    archetypeLabel: "Closest pattern match",
    topicLabel: "this friendship",
    subscales,
    evidence,
    insights: INSIGHTS,
    deepDive,
    scripts: [
      {
        situation: "Buying time instead of answering",
        say: "Let me think about it and I'll tell you tomorrow.",
        why:
          "Pressure needs an answer now. This sentence costs nothing, cannot be argued with, and removes the single condition most manipulation depends on. Use it even when you already know your answer.",
      },
      {
        situation: "Declining without opening a negotiation",
        say: "That doesn't work for me.",
        why:
          "No reason attached, so there is nothing to solve or counter. Reasons are what turn a no into a discussion — and the discussion is where the no gets worn down.",
      },
      {
        situation: "They rewrite something you clearly remember",
        say: "That's not how I remember it. I'm not going to argue about it.",
        why:
          "States your position and closes the loop in the same breath. Arguing the detail is the trap: the point of the rewrite is to put your memory on trial, and refusing the debate declines that.",
      },
      {
        situation: "Stepping back without announcing it",
        say: "Things are busy at the moment — I'll message when they settle.",
        why:
          "True enough, final enough, and it gives no foothold. Announced distance invites persuasion; unannounced distance does not, and it is much easier to maintain.",
      },
    ],
    plan: [
      {
        window: "Days 1–3",
        title: "Get one outside perspective",
        detail:
          "Tell one person you trust — outside this friendship's circle — what has been happening, in plain language and without softening it. Not for advice. Saying it out loud to someone with no stake in it is what breaks the calibration you have been using, and most people find their own account surprises them.",
      },
      {
        window: "Days 4–7",
        title: "Stop deciding in the moment",
        detail:
          "For one week, make no commitment during a conversation with them. 'I'll let you know tomorrow' to everything, including easy requests. You will learn a great deal from how that single change is received.",
      },
      {
        window: "Days 8–11",
        title: `Reduce exposure — starting with ${top.short.toLowerCase()}`,
        detail:
          `Your highest dimension is ${top.label} at ${top.value}/100. Do the counter-move from its card above. Then separately, remove one thing that makes distance expensive: a shared commitment, an unresolved loan, a dependency on their social circle. Options are what make every later decision possible.`,
      },
      {
        window: "Days 12–14",
        title: "Set the terms and write them down",
        detail:
          "Decide what contact looks like from here — how often, in what setting, what you will not do — and write it down for yourself. Not a message to them. A written line is what you will read in three weeks when they are being lovely again and the whole thing feels overstated.",
      },
    ],
    faq: [
      {
        q: "Do I have to end the friendship?",
        a: "No, and for most results here that is not the recommendation. Tiers 1–3 usually respond to a change of format rather than an ending. Tiers 4–5 call for distance first; whether that becomes permanent is a decision you can make later, from a better position.",
      },
      {
        q: "Should I show them this report?",
        a: "No. It is built from your perception, which is the right basis for your decisions and a weak basis for an argument. Handing it over converts a decision you have already made into a debate you are unlikely to win.",
      },
      {
        q: "What if I'm overreacting?",
        a: "Use the Impact dimension. It measures cost to you rather than their behaviour, and cost is not something you can overreact to — either your sleep, mood and confidence have been affected or they have not. If Impact is low, you are probably not overreacting so much as noticing something early.",
      },
      {
        q: "They're going through a hard time. Doesn't that change it?",
        a: "It changes what you do about it, not what is happening. Someone in crisis can genuinely need more than they give, and supporting them through that is a good thing to do. The question worth asking is whether the arrangement has an end — whether they ask about you at all, and whether you can name what it would look like for this period to be over.",
      },
    ],
  };
}

import type { Dossier, Subscale, SubscaleInsight } from "@/lib/report/dossier";

/**
 * "What's my partner's attachment style?" — paid report content.
 *
 * Four dimensions only, because that is what the instrument actually
 * measures (Bartholomew & Horowitz). Padding it out with invented axes
 * would look fuller and mean less.
 */

interface PartnerProfile {
  styleLabel: string;
  volatilityIndex: number;
  normalizedScores: { Anxiety: number; Avoidance: number; FearfulRisk: number; SecureBase: number };
}

const DIMENSIONS = [
  { key: "Anxiety", label: "Attachment Anxiety", short: "Anxiety", measures: "How much closeness he needs to feel safe, and what happens when he does not get it." },
  { key: "Avoidance", label: "Attachment Avoidance", short: "Avoidance", measures: "How much distance he needs, and how he creates it when closeness builds." },
  { key: "FearfulRisk", label: "Disorganised Risk", short: "Disorganised", measures: "Whether the two pulls fire at once — wanting closeness and fleeing it in the same week." },
  { key: "SecureBase", label: "Secure-Base Deficit", short: "Insecurity", measures: "How much of the ordinary reliability of a secure partner is missing." },
];

const INSIGHTS: Record<string, SubscaleInsight> = {
  Anxiety: {
    mechanism:
      "Attachment anxiety is an alarm calibrated in childhood for a situation that no longer exists. It fires on signals of distance — a short reply, a changed plan — and it does not read reassurance as information, which is why the same conversation happens repeatedly without ever resolving anything.",
    high: "He needs a great deal of contact to feel secure, and distance registers to him as danger rather than as ordinary space. The behaviour this produces — checking, needing to finish the argument tonight, reading tone into nothing — is alarm rather than control, though it can land identically on you.",
    mid: "He needs more reassurance than average and can go without it. It surfaces under stress rather than continuously.",
    low: "Distance does not alarm him. He can be apart from you without needing to resolve anything.",
    move:
      "Reassurance works when it arrives before the alarm, not after. A predictable small thing — a message at a known time — does more than an hour of reassurance once he is already escalated, because the alarm does not process argument.",
  },
  Avoidance: {
    mechanism:
      "Avoidance is a strategy for keeping the nervous system regulated by keeping other people at a manageable distance. It is triggered by closeness rather than by conflict, which is why it so often appears right after a good week — the withdrawal is a response to intimacy, not to something going wrong.",
    high: "He creates distance as a matter of course, and it is likely to arrive after closeness rather than after arguments. Pursuing him at that moment reliably makes it worse: pressure is the exact input the strategy exists to manage.",
    mid: "He needs some room and takes it without disappearing.",
    low: "He does not need distance to stay regulated. Closeness is not a threat.",
    move:
      "When he withdraws, name a return time rather than pursuing: 'I'm here when you're ready — let's talk tomorrow evening.' Avoidance responds to a horizon far better than to a conversation, because the horizon removes the pressure without removing you.",
  },
  FearfulRisk: {
    mechanism:
      "When both systems are active, the same person is simultaneously the source of safety and the source of threat. There is no stable strategy available, so behaviour alternates rather than resolving — intense closeness followed by withdrawal, both genuine. This is the hardest attachment pattern to be in a relationship with, and the hardest to have.",
    high: "He runs both patterns. The whiplash you experience is not manipulation and not indecision — it is two systems firing in sequence, and he is very unlikely to be able to explain it any better than you can.",
    mid: "Some oscillation, usually under significant stress rather than as the default mode.",
    low: "His pattern is consistent, whatever it is. Consistency is much easier to adapt to than alternation, even when it is not what you would choose.",
    move:
      "Predictability is worth more here than closeness. Fixed times, kept plans, the same response to the same situation. The oscillation runs on uncertainty, and the single thing that reduces it is a relationship that behaves the same way every week.",
  },
  SecureBase: {
    mechanism:
      "This is the absence measure: how much ordinary secure behaviour — repair after conflict, reliability, tolerance of your independence — is missing. It matters more than the style label, because it is the dimension that actually moves. Anxiety and avoidance are relatively fixed; secure behaviour is learned, and it is learned in relationships.",
    high: "The basics of a secure partner are largely missing. Conflict does not get repaired, and your independence is treated as a problem rather than as normal. This is the most important number on your chart.",
    mid: "Some secure behaviour is present and some is not. Typically the reliability is there and the repair is not.",
    low: "He does the secure things — comes back after conflict, is dependable, is fine when you have your own life. Whatever else is on this chart, this is the foundation that makes it workable.",
    move:
      "Watch what happens after the next argument, not during it. Repair is the single strongest predictor of whether a relationship works, and it is far more informative than how badly the argument itself went.",
  },
};

const BANDS = [
  {
    min: 70, id: "high", label: "High Volatility", accent: "#f43f5e",
    verdict:
      "The pattern you describe is a partner whose attachment system is active most of the time. That produces a relationship where a great deal of energy goes into managing the connection itself rather than into living alongside each other — and it is exhausting in a way that is hard to explain to anyone outside it.",
    urgency:
      "Nothing here requires a decision this week. What it does justify is stopping the search for the thing you are doing wrong: this pattern is largely independent of how well you handle it.",
    perspective:
      "This describes a pattern, not a verdict on him. Attachment styles are learned responses, and they are the most changeable part of an adult personality — but only when the person wants to change them.",
  },
  {
    min: 45, id: "mixed", label: "Moderate Volatility", accent: "#f59e0b",
    verdict:
      "His attachment system is active under stress and quiet the rest of the time. That produces a relationship that works well in ordinary conditions and becomes difficult in specific, predictable circumstances — which is actually good news, because predictable is something you can plan around.",
    urgency:
      "No urgency. Worth identifying the two or three situations that reliably trigger it; that list is short in this range.",
    perspective:
      "This is the most common result and it describes a workable relationship. Most couples have one partner in roughly this range.",
  },
  {
    min: 0, id: "low", label: "Low Volatility", accent: "#10b981",
    verdict:
      "His attachment behaviour is stable. He can be close without alarm and apart without withdrawing, and conflict does not put the relationship itself in question. If something feels wrong, attachment is not where it is coming from.",
    urgency: "Nothing to act on.",
    perspective:
      "A secure partner is not the same as an easy one. This measures one specific system, and plenty of real difficulties sit entirely outside it.",
  },
];

export function buildPartnerAttachmentDossier(raw: { profile: PartnerProfile } | PartnerProfile): Dossier {
  const profile: PartnerProfile = (raw as any).profile ?? raw;
  const n = profile.normalizedScores ?? ({} as any);
  const score = Math.max(0, Math.min(100, Math.round(profile.volatilityIndex ?? 0)));
  const band = BANDS.find((b) => score >= b.min) ?? BANDS[BANDS.length - 1];

  const subscales: Subscale[] = DIMENSIONS.map((d) => ({
    key: d.key,
    label: d.label,
    short: d.short,
    value: Math.max(0, Math.min(100, Math.round((n as any)[d.key] ?? 0))),
    measures: d.measures,
  }));

  const anx = subscales.find((s) => s.key === "Anxiety")!;
  const avo = subscales.find((s) => s.key === "Avoidance")!;
  const sec = subscales.find((s) => s.key === "SecureBase")!;
  const ranked = [...subscales].sort((a, b) => b.value - a.value);

  return {
    quiz: "What's My Partner's Attachment Style?",
    title: "Your Partner's Attachment Dossier",
    scoreLabel: "Volatility Index",
    score,
    band,
    archetype: profile.styleLabel,
    archetypeLabel: "Closest attachment quadrant",
    topicLabel: "his attachment pattern and how to respond to it",
    subscales,
    insights: INSIGHTS,
    deepDive: [
      {
        heading: "Where he sits on the two axes",
        body:
          `Anxiety ${anx.value}, avoidance ${avo.value}. Attachment is not a set of four types — it is two independent dials, and the four familiar labels are just names for the corners. ` +
          (anx.value > 55 && avo.value > 55
            ? "Both of yours are high, which is the disorganised corner: the closeness he wants is also the thing that alarms him, so neither approaching nor withdrawing settles anything. The oscillation is the pattern, not a failure to commit to one."
            : anx.value > avo.value + 15
            ? "Anxiety clearly leads. His system treats distance as the emergency, so the behaviour you see under stress will be pursuit — more contact, more urgency, needing it resolved now."
            : avo.value > anx.value + 15
            ? "Avoidance clearly leads. His system treats closeness as the pressure, so the behaviour you see under stress will be withdrawal — and it will usually follow a good stretch rather than a bad one."
            : "Neither dial dominates, which means his behaviour under stress will depend more on the situation than on a fixed strategy."),
      },
      {
        heading: "Why the label matters less than the deficit",
        body:
          `The quadrant name is the part people remember and the least useful thing on this page. Anxiety and avoidance are relatively stable traits — they shift slowly, over years, usually with deliberate effort. Secure-base behaviour is different: repair after conflict, dependability, being all right with your independence. Those are learned, they are learnable in adulthood, and they can be present even at high anxiety or high avoidance. His secure-base deficit is ${sec.value}, and that number will tell you more about whether this relationship works than the label above it.`,
      },
      {
        heading: "What this report cannot tell you",
        body:
          "This is built from your observations of him, which makes it a good description of your experience of the relationship and an indirect measure of him. That distinction matters in one specific way: attachment language is frequently used to explain behaviour that is not attachment. Withdrawal is avoidance; refusing to ever discuss anything is a choice. Needing reassurance is anxiety; monitoring where you are is control. If the behaviour that brought you here involves your access to other people, your money, or your freedom of movement, the framework on this page is the wrong one — that is a different assessment and a different conversation.",
      },
      {
        heading: "What you can actually change",
        body:
          "Not his attachment style; that is his work and it only happens if he wants it. What you can change is the input, and attachment systems are unusually responsive to input because they run on prediction. Consistency does more than intensity: a partner who behaves the same way every week gives an anxious system less to scan for and an avoidant system less to escape. Concretely — respond at the same pace rather than matching his, name a return time instead of pursuing a withdrawal, and keep your own commitments regardless of the week's weather. None of these require his cooperation, and all three reliably reduce volatility over a couple of months.",
      },
    ],
    scripts: [
      {
        situation: "He withdraws after a good week",
        say: "Take the evening. I'll see you tomorrow.",
        why:
          "Names a return point and applies no pressure. Pursuing a withdrawal makes it longer every time — the withdrawal exists to relieve pressure, so adding pressure extends it.",
      },
      {
        situation: "He needs the argument resolved tonight",
        say: "I'm not going anywhere. I'm too tired to do this well — let's finish it at breakfast.",
        why:
          "The first sentence is the one that matters: it answers the actual alarm, which is about abandonment rather than about the topic. The second buys the time without reading as a threat.",
      },
      {
        situation: "Your independent plans become an issue",
        say: "I'm going, and I want to hear about your evening when I'm back.",
        why:
          "Holds the plan and offers connection in the same breath. Cancelling teaches the system that the objection works; going without the offer confirms the fear it started from.",
      },
      {
        situation: "After a conflict, when nothing has been repaired",
        say: "I don't want to relitigate it. I do want to know we're okay.",
        why:
          "Asks for repair without reopening the argument. Whether repair is available is the single most useful thing to know about a relationship, and this is the cheapest way to find out.",
      },
    ],
    plan: [
      {
        window: "Days 1–3",
        title: "Find the triggers, not the incidents",
        detail:
          `Write down what happened in the 24 hours before the last three times things went wrong. You are looking for the input, not the argument. With anxiety leading it is usually distance; with avoidance leading it is usually a stretch of closeness. His top dimension is ${ranked[0].label} at ${ranked[0].value}/100, so start there.`,
      },
      {
        window: "Days 4–7",
        title: "Make one thing predictable",
        detail:
          "Pick one contact point and make it invariant — same time, every day, regardless of how the week is going. Attachment systems run on prediction, and one reliable data point lowers the background alarm more than a great deal of reassurance offered in the moment.",
      },
      {
        window: "Days 8–11",
        title: "Stop matching his pace",
        detail:
          "Respond at your own speed rather than mirroring his. Matching amplifies: pursuing a withdrawal extends it, withdrawing from a pursuit escalates it. This is the single highest-leverage change available to you, and it requires nothing from him.",
      },
      {
        window: "Days 12–14",
        title: "Test for repair",
        detail:
          "After the next disagreement, wait. Do not initiate the repair. Whether he comes back on his own, and how long it takes, is the most predictive piece of information in this entire report — considerably more than his style label or his volatility score.",
      },
    ],
    faq: [
      {
        q: "Can his attachment style change?",
        a: "The underlying dials move slowly and usually only with deliberate effort on his part. Secure behaviours — repair, reliability, tolerating your independence — can change much faster, and they can be learned inside a relationship. That is the realistic target.",
      },
      {
        q: "Should I show him this?",
        a: "It is built from your answers about him, which makes it your read rather than his. Showing it tends to produce a debate about the accuracy of the quiz rather than a conversation about the relationship. The language is more useful than the document: 'I notice you need space after we've been close' lands far better than a score.",
      },
      {
        q: "Is this an excuse for how he treats me?",
        a: "No, and this is the most important limit on the report. An explanation is not a permission. Attachment accounts for pursuing, withdrawing and needing reassurance. It does not account for contempt, monitoring, or controlling your access to money or other people — those are different behaviours with a different framework, and this instrument does not measure them.",
      },
    ],
  };
}

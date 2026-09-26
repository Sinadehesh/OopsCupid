import type { Dossier, Subscale, SubscaleInsight } from "@/lib/report/dossier";
import { buildEvidence, fromBattery } from "@/lib/report/evidence";
import { attractorQuestions } from "@/lib/psychometrics/attractor/questions";
import { composite, inverseComposite } from "@/lib/report/composites";

/**
 * "Who is attracted to me?" — paid report content.
 *
 * The scoring engine produces 33 subscales, two thirds of which rest on a
 * single question. Charting those individually would hand a paying reader
 * a precise-looking number derived from one answer, so the seven
 * dimensions below are composites with enough items behind them to mean
 * something.
 */

interface AttractorProfile {
  vulnerabilityIndex: number;
  archetype: string;
  normalizedScores: Record<string, number>;
}

const DIMENSIONS: {
  key: string; label: string; short: string; measures: string;
  from: (s: Record<string, number>) => number;
}[] = [
  {
    key: "availability", label: "Availability Signal", short: "Available",
    measures: "How openly you show need for reassurance and closeness early on.",
    from: (s) => composite(s, ["Anxiety", "Agreeableness"]),
  },
  {
    key: "distance", label: "Distance Signal", short: "Distance",
    measures: "How much you hold back, stay unreadable, or keep people at arm's length.",
    from: (s) => composite(s, ["Avoidance", "Detachment", "Mystery", "HardToGet"]),
  },
  {
    key: "volatility", label: "Volatility Signal", short: "Volatility",
    measures: "How much emotional weather you show to people who barely know you.",
    from: (s) => composite(s, ["Neuroticism", "NegativeAffect", "Depression", "Chaos"]),
  },
  {
    key: "impulsivity", label: "Impulsivity Signal", short: "Impulsive",
    measures: "Spontaneity, risk appetite and how quickly things escalate around you.",
    from: (s) => composite(s, ["Disinhibition", "ADHD", "Substance"]),
  },
  {
    key: "warmth", label: "Warmth Signal", short: "Warmth",
    measures: "Approachability — how easy you are to start something with.",
    from: (s) => composite(s, ["Extraversion", "Openness", "Agreeableness"]),
  },
  {
    key: "edge", label: "Edge Signal", short: "Edge",
    measures: "Bluntness, competitiveness and comfort with conflict.",
    from: (s) => composite(s, ["Antagonism", "Narcissism", "Machiavellianism", "Dominance"]),
  },
  {
    key: "steadiness", label: "Steadiness Signal", short: "Steady",
    measures: "How reliable and self-governed you appear before anyone knows you well.",
    from: (s) => composite(s, ["Conscientiousness"]),
  },
];

const INSIGHTS: Record<string, SubscaleInsight> = {
  availability: {
    mechanism:
      "Availability is read within the first few interactions, largely from response speed, agreement rate and how early you rearrange things to fit someone. It draws two very different groups at once: people who want a real connection and find it easy to start one, and people looking for someone who will absorb cost without complaint. Both read the same signal, which is why this dimension cannot simply be turned down.",
    high: "You broadcast availability strongly. That is genuinely attractive to well-intentioned people — and it is the single clearest marker for anyone looking for someone accommodating, which is why your inbound attention is probably high in volume and mixed in quality.",
    mid: "You are readable as interested without being wide open. This is the range that tends to produce the fewest bad matches.",
    low: "You give very little away early. Fewer people approach, and the ones who do tend to be more confident than average — which is its own kind of selection effect.",
    move:
      "Do not reduce warmth. Add one slow variable instead: keep one evening a week that does not move for anyone new, for the first two months. Availability that has a limit in it filters exactly the group you want to filter, and costs you nothing with everyone else.",
  },
  distance: {
    mechanism:
      "Distance creates ambiguity, and ambiguity is the main fuel of pursuit. People fill an information gap with a version of you they invent, which is why unreadable people attract intense early interest that often collapses on contact with the real person.",
    high: "You are hard to read, and that reliably triggers chasing behaviour. The attention this brings is usually intense at first and poorly matched — you are being pursued for an idea, and the idea has to survive knowing you.",
    mid: "You hold some things back, which is ordinary and healthy. Nothing here is distorting who approaches you.",
    low: "You are easy to read and you disclose early. This filters out chasers, who need ambiguity to work with, and it means the people who stay are responding to you rather than to a guess.",
    move:
      "If this is high and the intensity keeps fading, disclose earlier — something ordinary and specific in the first two or three conversations. It kills the projection early, which loses you some interest and keeps the interest that was real.",
  },
  volatility: {
    mechanism:
      "Emotional intensity shared early is read as either depth or as need, depending entirely on who is doing the reading. The people most drawn to it are not necessarily predatory, but they do tend to be people whose role in a relationship is to manage someone — and that role has a shelf life.",
    high: "You show a lot of emotional weather to people who have not earned it yet. This selects hard for rescuers and for people who enjoy being needed, and both of those tend to lose interest once the crisis passes.",
    mid: "You are open about difficulty without leading with it. That is roughly the right calibration.",
    low: "You keep your internal weather private in the early stages. People get to know a steady version of you first, which is the version that attracts people looking for an equal.",
    move:
      "Keep the hard conversations for after week four with anyone new. Not concealment — sequencing. Intimacy built on crisis has to survive the crisis ending, and most of it does not.",
  },
  impulsivity: {
    mechanism:
      "A high-impulsivity signal accelerates everything: things move fast, decisions get made early, and the ordinary friction that would have revealed a bad match gets skipped. It is not that it attracts worse people — it is that it removes the time in which you would have noticed them.",
    high: "Things escalate quickly around you. The problem is not the pace itself; it is that you are consistently deciding about people on very little information, and the people who benefit from that are the ones who do not hold up to more.",
    mid: "You can move quickly when something is worth it, without everything running at that speed.",
    low: "You take your time, which means you see more of someone before committing anything. This is a substantial protective factor.",
    move:
      "Put one fixed, boring delay in the sequence — two weeks before anything that is hard to undo. The right people find a delay unremarkable. The reaction to it is itself a filter.",
  },
  warmth: {
    mechanism:
      "Warmth governs how many people approach you at all. It is the volume dial rather than the quality dial — it changes the size of the pool, not its composition, which is why the other dimensions matter more for who you end up with.",
    high: "You are easy to approach, and you get a lot of inbound interest as a result. Volume is not the issue in your dating life; selection is.",
    mid: "You are approachable to people who make an effort. A moderate, well-filtered flow.",
    low: "Fewer people approach you, and they are self-selected for confidence. Smaller pool, generally better-matched.",
    move:
      "If warmth is high and your results are poor, the fix is on the other end: screen harder rather than signal less. Cutting warmth reduces the good approaches and the bad ones equally.",
  },
  edge: {
    mechanism:
      "Edge — directness, competitiveness, comfort with conflict — mainly works as a deterrent, and specifically as a deterrent to people who were counting on an easy time. It also deters some genuinely good, conflict-averse people, which is the real cost of having it high.",
    high: "You are direct and hard to push around. Exploitative people generally pass on you, because you are expensive. Some conflict-averse people you would have liked also pass, for the same reason.",
    mid: "You can hold your ground without leading with it. Low cost, good protection.",
    low: "You are easy to be around and rarely push back. Pleasant for everyone, including people whose interest depends on you not pushing back.",
    move:
      "If edge is low and availability is high, that combination is the one worth changing. One small, early disagreement — about anything — tells you a great deal about how someone handles not getting their way, and costs almost nothing.",
  },
  steadiness: {
    mechanism:
      "Steadiness is read from follow-through: turning up, doing what you said, being findable. It is the least glamorous dimension here and the one that most strongly predicts who stays, because it is the signal that says a relationship with you would be low-maintenance.",
    high: "You read as reliable, and you attract people who value that. This is the profile most associated with people looking for something that lasts.",
    mid: "Reliable enough not to be an issue either way.",
    low: "You come across as unpredictable in the small things. This disproportionately deters people who are looking for something durable — they screen for exactly this.",
    move:
      "If this is your lowest dimension, pick the smallest version: reply within a day, and do the thing you said you would do. It is tedious advice and it moves this dimension faster than anything else on the list.",
  },
};

const BANDS = [
  {
    min: 70, id: "high", label: "High Inbound Vulnerability", accent: "#f43f5e",
    verdict:
      "The combination you project is one that exploitative people screen for, and they screen for it early. This is not a statement about your worth or about how you look — it is about which signals are most visible in your first few interactions, and yours currently lead with the ones that suggest low cost and high accommodation.",
    urgency:
      "Nothing here needs fixing this week, but the next person who moves very fast is worth slowing down. Speed is the common factor in almost every bad outcome this profile produces.",
    perspective:
      "Every signal on this chart is attractive to good people too. The task is filtering, not becoming less yourself — and the same traits that read as an opportunity to a bad actor read as a relief to a decent one.",
  },
  {
    min: 45, id: "mixed", label: "Mixed Inbound Profile", accent: "#f59e0b",
    verdict:
      "Your signals pull in a broad range of people rather than a specific type. That explains inconsistent results: you are not attracting one kind of person and getting one kind of outcome, you are attracting a wide field and the variation is coming from the field rather than from you.",
    urgency:
      "No urgency. The useful change here is at the screening stage rather than the signalling stage.",
    perspective:
      "A wide field is a good problem. It means the raw material is there and the work is in selection.",
  },
  {
    min: 0, id: "low", label: "Low Inbound Vulnerability", accent: "#10b981",
    verdict:
      "Your profile does not lead with the signals that exploitative people look for. You read as steady, reasonably guarded, and expensive to take advantage of — which costs you some volume of attention and considerably improves its quality.",
    urgency:
      "Nothing to act on. If your dating life is frustrating, this chart suggests the constraint is volume rather than the kind of people you attract.",
    perspective:
      "Low vulnerability is not the same as being closed off. Your chart shows what you project on first contact, not what you are like once someone knows you.",
  },
];

export function buildAttractorDossier(raw: { rawAnswers?: Record<string, number | string>; profile: AttractorProfile } | AttractorProfile): Dossier {
  const profile: AttractorProfile = (raw as any).profile ?? raw;
  const scores = profile.normalizedScores ?? {};
  const score = Math.max(0, Math.min(100, Math.round(profile.vulnerabilityIndex ?? 0)));
  const band = BANDS.find((b) => score >= b.min) ?? BANDS[BANDS.length - 1];

  const subscales: Subscale[] = DIMENSIONS.map((d) => ({
    key: d.key,
    label: d.label,
    short: d.short,
    value: d.from(scores),
    measures: d.measures,
  }));

  const ranked = [...subscales].sort((a, b) => b.value - a.value);
  const top = ranked[0];
  const second = ranked[1];
  const avail = subscales.find((s) => s.key === "availability")!;
  const edge = subscales.find((s) => s.key === "edge")!;

  return {
    quiz: "Who Is Attracted To Me?",
    title: "Your Inbound Attraction Dossier",
    scoreLabel: "Vulnerability Index",
    score,
    band,
    archetype: profile.archetype,
    archetypeLabel: "The type you most reliably attract",
    topicLabel: "the kind of people your signals bring in",
    subscales,
    // Quoted straight back to her. Missing on results saved before the
    // widget kept the answers, and the section is then simply absent.
    evidence: "rawAnswers" in raw && raw.rawAnswers
      ? buildEvidence(fromBattery(attractorQuestions as any), raw.rawAnswers)
      : undefined,
    insights: INSIGHTS,
    deepDive: [
      {
        heading: "What your two loudest signals do together",
        body:
          `${top.label} (${top.value}) and ${second.label} (${second.value}) are the two things people read first about you. Signals interact rather than add: the same availability that reads as warmth alongside high steadiness reads as an opportunity alongside low edge. ` +
          `Yours currently sit at availability ${avail.value} and edge ${edge.value}, and that ratio does more to determine who approaches you than any single number on this chart.`,
      },
      {
        heading: "Why this is about filtering, not about changing",
        body:
          "Nearly every trait measured here is attractive to people with good intentions. Warmth, openness about your feelings, willingness to accommodate — a decent partner experiences all of these as relief. The problem is that they are equally legible to someone looking for a low-cost arrangement, and they are legible in the first few conversations, long before you know which you are dealing with. So the answer is almost never to project less. It is to add friction that a good match will not notice and a bad one will not tolerate: a fixed commitment you do not move, one early disagreement, a two-week delay before anything hard to undo.",
      },
      {
        heading: "What the archetype actually means",
        body:
          `"${profile.archetype}" is a description of the type of attention your profile most reliably produces — not a description of you, and not a prediction about any specific person. It is generated from the relative height of your signals rather than from their absolute values, which is why two people with very different scores can share an archetype. Treat it as a label for a pattern in your inbox rather than as an identity, and read the dimension cards below for anything you intend to act on.`,
      },
      {
        heading: "Why first impressions carry so much weight here",
        body:
          "All of this operates in the first three to four interactions, before anyone has enough information to form a real view. People make a fast read and then spend weeks confirming it — which means the signals on this chart get far more influence over who pursues you than anything you demonstrate later. This is also the good news: the leverage is concentrated in a very small window. One adjustment to how the first fortnight goes changes the composition of who sticks around more than months of effort after that.",
      },
    ],
    scripts: [
      {
        situation: "Someone is moving much faster than you are comfortable with",
        say: "I like where this is going. I also go slowly — that's not about you.",
        why:
          "Warm, non-accusatory, and it introduces a delay without a confrontation. Someone who is genuinely interested will find this unremarkable; someone who needed the speed will show you within a week.",
      },
      {
        situation: "Declining to rearrange your plans, early on",
        say: "I can't do Thursday — how's the weekend?",
        why:
          "No apology and no explanation, offered alongside an alternative so it reads as logistics rather than as a message. How this small no is received tells you a lot for what it costs.",
      },
      {
        situation: "A first disagreement",
        say: "I see it differently, actually.",
        why:
          "A deliberately low-stakes test. What you are watching is not whether they agree but what happens in the next thirty seconds — curiosity, or a shift in temperature.",
      },
      {
        situation: "They ask something personal very early",
        say: "Ask me again in a few weeks and I'll tell you properly.",
        why:
          "Friendly, not withholding, and it moves disclosure to a point where you know who you are disclosing to. Rushed intimacy is the most common route into the outcomes this profile produces.",
      },
    ],
    plan: [
      {
        window: "Days 1–3",
        title: "Audit the last three people who pursued you",
        detail:
          "Write down how fast each one moved in the first fortnight, what they wanted early, and how it ended. Three cases is enough for a pattern to appear, and it is almost always the pace rather than the person that predicts the ending.",
      },
      {
        window: "Days 4–7",
        title: "Add one fixed point",
        detail:
          "Choose one commitment a week that does not move for anyone new — a class, a standing dinner, anything. This is the cheapest possible filter: invisible to someone reasonable, immediately irritating to someone who needs you fully available.",
      },
      {
        window: "Days 8–11",
        title: `Work on ${top.label}`,
        detail:
          `Your loudest signal at ${top.value}/100. Do the counter-move on its card above. Note that the aim is not to mute the signal — it is to add one qualifier so that it stops reading as an open door on first contact.`,
      },
      {
        window: "Days 12–14",
        title: "Run one early disagreement",
        detail:
          "With anyone new, disagree once about something genuinely unimportant, and watch what happens immediately afterwards. This is the single highest-information, lowest-cost test available, and most people never run it until it matters.",
      },
    ],
    faq: [
      {
        q: "Is this saying it's my fault that I attract these people?",
        a: "No. What you project and what someone chooses to do about it are separate things, and responsibility sits entirely with the person acting. This chart is useful for one narrow reason: your signals are the part of the system you can adjust. That is a statement about leverage, not about blame.",
      },
      {
        q: "Should I try to change what I signal?",
        a: "Mostly not. Every dimension here is attractive to people worth attracting, and muting it costs you those people first. The recommended changes are all additions — a fixed commitment, a delay, one early disagreement — because they filter without reducing.",
      },
      {
        q: "Why does my archetype not sound like me?",
        a: "It describes the attention you attract rather than your personality, and those are frequently different. It also comes from the relative height of your signals, not from their absolute values — so the archetype can shift while you stay exactly the same, if the ranking changes.",
      },
    ],
  };
}

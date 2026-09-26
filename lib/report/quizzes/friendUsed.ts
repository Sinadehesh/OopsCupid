import type { Dossier, Subscale, SubscaleInsight } from "@/lib/report/dossier";
import { buildEvidence, fromBattery } from "@/lib/report/evidence";
import { friendUsedQuestions } from "@/lib/psychometrics/friend-used/questions";

/**
 * "Are your friends using you?" — paid report content.
 *
 * Twelve dimensions, nine questions each, so every one is worth charting
 * on its own — no composites needed here.
 */

interface FriendUsedProfile {
  useRiskIndex: number;
  primaryArchetype: string;
  secondaryArchetype: string;
  normalizedScores: Record<string, number>;
}

const DIMENSIONS: { key: string; short: string; measures: string }[] = [
  { key: "Favor Frequency",       short: "Favours",      measures: "How often you are asked for something, and how rarely you are not." },
  { key: "Reciprocity Balance",   short: "Reciprocity",  measures: "Whether what you give comes back in any form over time." },
  { key: "Emotional Labor",       short: "Emotional",    measures: "How much of their emotional management is done by you." },
  { key: "Boundary Respect",      short: "Boundaries",   measures: "What happens to your no once you have said it." },
  { key: "Conditional Presence",  short: "Conditional",  measures: "Whether they are around when there is nothing to be gained." },
  { key: "Opportunism",           short: "Opportunism",  measures: "How closely their interest tracks what you can currently offer." },
  { key: "Time Drain",            short: "Time",         measures: "How much of your week is spent on their business rather than yours." },
  { key: "Financial Drain",       short: "Money",        measures: "What this friendship costs you in cash, loans and unreturned rounds." },
  { key: "Reliability Asymmetry", short: "Reliability",  measures: "Whether they show up for you the way you show up for them." },
  { key: "Manipulation",          short: "Manipulation", measures: "Guilt, pressure and obligation used to secure a yes." },
  { key: "Appreciation",          short: "Thanklessness",measures: "How rarely what you do is acknowledged at all." },
  { key: "Dependency",            short: "Dependency",   measures: "How much they have arranged their life around your availability." },
];

const INSIGHTS: Record<string, SubscaleInsight> = {
  "Favor Frequency": {
    mechanism:
      "Being asked often is not evidence of being used — it is evidence of being capable and reachable. What makes it a problem is the ratio: high frequency only becomes extraction when it is paired with low reciprocity, and either one alone is fine.",
    high: "You are asked for things constantly. Check this against your reciprocity score before drawing any conclusion — high favours with healthy reciprocity is just what being the competent friend looks like.",
    mid: "A normal volume of requests. Nothing here on its own.",
    low: "You are rarely asked for anything. If other dimensions are high, the extraction is not happening through direct requests.",
    move:
      "Say no to the next low-stakes ask, with no reason given. You are measuring the reaction, not the request — and the reaction is the entire dataset.",
  },
  "Reciprocity Balance": {
    mechanism:
      "Reciprocity in friendship is not transactional bookkeeping; it is a rough, generous, multi-year average. The failure state is not an uneven month — it is a relationship where the direction never reverses, no matter how long the window.",
    high: "The flow runs one way. Over any timescale you choose, you are the one supplying, and it does not reverse when you are the one having a hard week.",
    mid: "Broadly balanced with a tilt in your direction. Common and usually fine.",
    low: "The exchange runs both ways. This is the dimension everything else depends on, and yours is healthy.",
    move:
      "Ask for something small and slightly inconvenient — a lift, an hour, a favour with a real cost. Not because you need it. You are testing whether the direction can reverse at all.",
  },
  "Emotional Labor": {
    mechanism:
      "Emotional labour becomes extraction when it stops being an exchange and becomes a service. The marker is not how much they need — anyone can have a terrible year — it is whether the traffic is ever bidirectional, and whether they know anything about your life.",
    high: "You are managing their emotional world. The clearest test: name three things currently going on in your life that they know about. If that is hard, you are the therapist rather than the friend.",
    mid: "You do more of the emotional work than they do, without it being the whole relationship.",
    low: "The support goes both ways.",
    move:
      "Next time they process at you, say one true sentence about your own week first. What happens to it in the following minute tells you what kind of arrangement this is.",
  },
  "Boundary Respect": {
    mechanism:
      "Boundaries in friendship fail politely. Nobody argues — they simply do it again, and raising it a second time costs more socially than letting it go. That asymmetry is why an unenforced limit stays unenforced for years.",
    high: "Your limits do not survive contact. Usually not malice: nothing follows when they are crossed, so they read as preferences rather than rules.",
    mid: "The big limits hold, the small ones drift.",
    low: "Your no holds. This makes you much harder to extract from than any other single factor here.",
    move:
      "Restate the most-crossed limit once, plainly, with no justification attached. Justifications invite negotiation; a bare statement does not.",
  },
  "Conditional Presence": {
    mechanism:
      "A friendship that exists only when something is on offer is not a friendship that has gone wrong — it is a different kind of arrangement that has been using the same word. The distinction shows up only in the gaps, which is why it can run for years unnoticed.",
    high: "They are present when there is something to be had and absent otherwise. You have likely noticed the timing before and explained it as coincidence.",
    mid: "Some correlation between their availability and what is going on, not enough to be the whole pattern.",
    low: "They are around regardless. This is what actually separates a friend from a contact.",
    move:
      "Go two weeks without offering anything — no invitations, no help, no availability. Note who surfaces and what they open with. This single test resolves more than any conversation could.",
  },
  Opportunism: {
    mechanism:
      "Opportunism is about timing rather than character. It is legible in one specific way: their contact correlates with your resources rather than with your life, and that correlation is visible in your message history whether or not it is visible in your memory.",
    high: "Their interest tracks what you can provide. Scroll back through the last ten times they got in touch and note what each one was about — the pattern is usually unambiguous and slightly unpleasant to see.",
    mid: "Some opportunistic timing, probably not deliberate.",
    low: "Their contact is unrelated to what you have going on.",
    move:
      "Read back the last ten messages they initiated. Do not rely on your impression; impressions are generous and the log is not.",
  },
  "Time Drain": {
    mechanism:
      "Time is the cost people are least likely to count, because no single instance is large. It accrues in half-hours — the calls, the logistics, the emergencies that turn out not to be — and it is only visible in aggregate, which is exactly how it stays unexamined.",
    high: "A meaningful share of your week goes on their business. Add up the last fortnight honestly; most people are surprised by a factor of two or three.",
    mid: "Some time cost, within the normal range of caring about someone.",
    low: "This friendship is not costing you time you needed.",
    move:
      "Cap one recurring thing — 'I've got half an hour' at the start of the call rather than at the end. Stated up front it reads as logistics; stated later it reads as rejection.",
  },
  "Financial Drain": {
    mechanism:
      "Money is the cleanest signal in friendship precisely because it is countable. It is also the one people most avoid counting, because doing so feels like a betrayal of how the friendship is supposed to work — which is what makes it such a reliable measure.",
    high: "There is a real and ongoing financial cost here. Unreturned loans are the specific thing to look at: the amount matters less than what happens when you mention it.",
    mid: "Occasional imbalance, the ordinary kind.",
    low: "No meaningful financial asymmetry.",
    move:
      "Mention one outstanding amount, once, factually and with no edge. What follows — repayment, an apology, deflection, or offence — is the most informative thirty seconds available to you.",
  },
  "Reliability Asymmetry": {
    mechanism:
      "Reliability asymmetry is the gap between the version of you they receive and the version of them you receive. It is different from not caring: people can be genuinely fond of you and still have never once rearranged anything for you, simply because they have never had to.",
    high: "You show up for them in ways they do not show up for you. You could probably name three occasions where you did and one where they did not.",
    mid: "Broadly reliable, with occasional gaps.",
    low: "They turn up for you. Whatever else is on this chart, this is the load-bearing part.",
    move:
      "Ask for something that requires them to change a plan. Not a test you announce — just an ordinary request with a real cost attached.",
  },
  Manipulation: {
    mechanism:
      "Guilt is how obligation gets enforced when there is no authority to enforce it. It works by shifting the decision from whether you want to do something to whether you can bear to refuse — and those feel identical from the inside.",
    high: "A substantial part of what you do here is extracted rather than chosen. The tell is the feeling right after you agree: relief that the conversation ended, not anything like wanting to go.",
    mid: "Occasional pressure, usually situational.",
    low: "What they want, they ask for openly.",
    move:
      "Make no commitment during a conversation with them for two weeks. 'Let me check and come back to you' is a complete answer, and almost all guilt-based pressure depends on an answer in the moment.",
  },
  Appreciation: {
    mechanism:
      "Thanklessness is the cheapest thing to fix and the most corrosive to leave. Acknowledgement is what converts a favour into an exchange; without it, what you did simply becomes the new baseline, and the next ask starts from there.",
    high: "What you do goes unacknowledged. This is why the friendship is more tiring than the workload alone would explain — unrecognised effort costs several times what recognised effort does.",
    mid: "Thanked sometimes, taken for granted sometimes.",
    low: "Your effort gets noticed. This makes a surprising amount of imbalance sustainable.",
    move:
      "Stop doing one invisible thing you routinely do and say nothing about it. Whether it is noticed answers the question directly, and whether it is then done by someone else answers a second one.",
  },
  Dependency: {
    mechanism:
      "Dependency is the dimension that makes all the others expensive to change. Once someone has arranged their life around your availability, withdrawing it is not a small adjustment to them — it is a genuine problem, and the resulting distress is real rather than tactical, which is precisely what makes it so hard to hold a line against.",
    high: "They have built around your availability. Expect real distress rather than manipulation when you start reducing it, and expect that to be much harder to resist than an argument would be.",
    mid: "They lean on you without being structurally dependent.",
    low: "They manage their own life.",
    move:
      "Reduce gradually rather than announcing a change. A 20% reduction held for a month resets the baseline with far less fallout than one conversation, and it is much easier to sustain.",
  },
};

const BANDS = [
  {
    min: 70, id: "high", label: "High Extraction Risk", accent: "#f43f5e",
    verdict:
      "Across most dimensions, this friendship runs in one direction. The volume of what you supply is not the finding — plenty of good friendships are lopsided for a season. The finding is that the direction does not reverse, in any timeframe, including the weeks when you are the one who needs something.",
    urgency:
      "There is no incident to respond to and there is not going to be one — that is characteristic of this pattern rather than evidence against it. Pick the highest dimension and change one input this month.",
    perspective:
      "Being the capable one is not a defect and this is not a case of poor judgement. Arrangements like this form gradually, out of ordinary generosity, and they are invisible from inside for exactly that reason.",
  },
  {
    min: 45, id: "mixed", label: "Meaningful Imbalance", accent: "#f59e0b",
    verdict:
      "The friendship is genuine and the ledger is uneven. Your chart shows the imbalance concentrated in specific dimensions rather than spread across all of them, which is the more workable version of this result — it means a couple of changes would fix it rather than a renegotiation of the whole thing.",
    urgency:
      "Nothing urgent. Worth acting on before the imbalance becomes the definition of the friendship, which is what happens if nothing changes.",
    perspective:
      "Most long friendships have a stretch in this range. It is usually fixed by adjusting inputs rather than by a conversation about it.",
  },
  {
    min: 0, id: "low", label: "Balanced", accent: "#10b981",
    verdict:
      "This friendship is not extractive. You may give more than you get in places — most generous people do — but the reciprocity is there and it reverses when you need it to.",
    urgency: "Nothing to act on.",
    perspective:
      "If something still feels off, look at the one or two dimensions that are out of line with the rest of your chart rather than at the headline number.",
  },
];

export function buildFriendUsedDossier(raw: { rawAnswers?: Record<string, number | string>; profile: FriendUsedProfile } | FriendUsedProfile): Dossier {
  const profile: FriendUsedProfile = (raw as any).profile ?? raw;
  const n = profile.normalizedScores ?? {};
  const score = Math.max(0, Math.min(100, Math.round(profile.useRiskIndex ?? 0)));
  const band = BANDS.find((b) => score >= b.min) ?? BANDS[BANDS.length - 1];

  const subscales: Subscale[] = DIMENSIONS.map((d) => ({
    key: d.key,
    label: d.key,
    short: d.short,
    value: Math.max(0, Math.min(100, Math.round(n[d.key] ?? 0))),
    measures: d.measures,
  }));

  const ranked = [...subscales].sort((a, b) => b.value - a.value);
  const top = ranked[0];
  const second = ranked[1];
  const recip = subscales.find((s) => s.key === "Reciprocity Balance")!;
  const favours = subscales.find((s) => s.key === "Favor Frequency")!;

  return {
    quiz: "Are Your Friends Using You?",
    title: "Your Friendship Ledger",
    scoreLabel: "Use Risk Index",
    score,
    band,
    archetype: profile.primaryArchetype,
    archetypeLabel: "Your role in this dynamic",
    topicLabel: "what this friendship is costing you",
    subscales,
    // Quoted straight back to her. Missing on results saved before the
    // widget kept the answers, and the section is then simply absent.
    evidence: "rawAnswers" in raw && raw.rawAnswers
      ? buildEvidence(fromBattery(friendUsedQuestions as any), raw.rawAnswers)
      : undefined,
    insights: INSIGHTS,
    deepDive: [
      {
        heading: "The ratio that actually decides this",
        body:
          `Favours asked ${favours.value}, reciprocity ${recip.value}. Neither number means anything alone — being asked for a lot is what happens to competent, reachable people, and it is a compliment rather than a symptom. ` +
          (favours.value >= 60 && recip.value >= 60
            ? "Yours shows high demand with a return flow that does not keep up, and that combination is the definition of extraction. It is also the most fixable one, because the demand is not the part that needs to change."
            : favours.value >= 60
            ? "Yours shows high demand with reciprocity holding up. That is not extraction — it is what being the capable friend looks like, and the tiredness you feel is volume rather than imbalance."
            : "Yours shows moderate demand, so whatever is costing you here is not arriving as direct requests. Look at the top two dimensions instead."),
      },
      {
        heading: `Where the cost is concentrated`,
        body:
          `${top.label} (${top.value}) and ${second.label} (${second.value}) carry your result. That concentration is more useful than the headline index, because these dynamics never run evenly — they run on one or two specific mechanics, and the remaining dimensions are largely consequences. Changing one input on the top dimension moves more than a general resolution to be less available, which is the approach most people try and almost nobody sustains.`,
      },
      {
        heading: "Why this is invisible from the inside",
        body:
          "Three things hide it. First, each instance is individually reasonable — no single favour is unreasonable, and the pattern only exists in aggregate. Second, there is no review point: friendships have no anniversaries, no check-ins, nothing that ever forces either party to look at the arrangement. Third, the person doing more keeps the friendship from visibly failing, which removes the only signal that would prompt anyone to change. You are, in effect, funding the evidence that nothing is wrong.",
      },
      {
        heading: "The difference between using you and needing you",
        body:
          "This determines what you should do, and the numbers cannot settle it. Someone using you behaves differently with other people — you get the version that takes. Someone who simply needs a lot behaves the same way with everyone and is going through something with an end to it. The first does not improve through conversation; the second improves enormously with a change of format. Two questions separate them: do they know what is currently going on in your life, and can you name what it would look like for this period to be over? Two noes point at the first.",
      },
      {
        heading: "What actually changes it",
        body:
          "Not a conversation about the friendship — those usually fail, because the behaviour is rarely deliberate and the person hears an accusation where you intended a request. What works is changing your own inputs and letting the arrangement re-equilibrate: stop initiating and see who initiates, say one no without a reason, mention the outstanding loan once. Each is a small experiment returning real information about a relationship you currently hold only an impression of. Friendships worth keeping survive all three without anyone needing to discuss them.",
      },
    ],
    scripts: [
      {
        situation: "Declining without opening a negotiation",
        say: "I can't do that one.",
        why:
          "No reason means nothing to solve. Reasons invite problem-solving, and problem-solving is how a no becomes a discussion you then lose.",
      },
      {
        situation: "Capping a call before it starts",
        say: "I've got about twenty minutes — what's going on?",
        why:
          "Stated up front it is logistics; stated at the forty-minute mark it is rejection. Same limit, completely different reception.",
      },
      {
        situation: "Raising money you are owed",
        say: "Whenever you get a chance — there's still the £80 from June.",
        why:
          "Factual, dated, no edge, and it does not ask for an explanation. What comes back in the next thirty seconds is worth more than the money.",
      },
      {
        situation: "Guilt after you have already said no",
        say: "I know, and I still can't.",
        why:
          "Acknowledges them without reopening the decision. Re-explaining signals that the decision is still available for negotiation — which is what the guilt is checking for.",
      },
    ],
    plan: [
      {
        window: "Days 1–3",
        title: "Read the log, not your memory",
        detail:
          "Scroll back through the last ten exchanges this person initiated and note what each one was about. Memory averages in their favour; the message history does not. This takes ten minutes and usually settles the question you have been carrying for months.",
      },
      {
        window: "Days 4–7",
        title: "Run the initiation test",
        detail:
          "Stop initiating. Offer nothing. Say nothing about it. Note who gets in touch and whether they open with a request or a question about you. This is the single most informative week in the plan.",
      },
      {
        window: "Days 8–11",
        title: `Change one input on ${top.label}`,
        detail:
          `Your highest dimension at ${top.value}/100. Do exactly the counter-move from its card above — once, with this person, without announcing it. Then leave it alone and watch what happens.`,
      },
      {
        window: "Days 12–14",
        title: "Decide the format, not the verdict",
        detail:
          "Almost nobody should end this friendship, and almost everybody should change its shape. Write down what you are willing to give from here — how often, how much, what you will not do — and keep it somewhere you will see it. The written version is what you will need in three weeks when they are being lovely again.",
      },
    ],
    faq: [
      {
        q: "What if they're genuinely struggling?",
        a: "Then supporting them is a good thing to do, and the chart is still accurate about the cost. Those are separate questions. The one worth asking is whether this has an end: can you describe what it would look like for this period to be over? If not, it is not a crisis — it is an arrangement.",
      },
      {
        q: "Should I confront them?",
        a: "Usually not. Conversations that open with a diagnosis put people on the defensive and rarely change behaviour, particularly when the behaviour was never deliberate. Every step in the plan above is a change to your own side, for exactly that reason.",
      },
      {
        q: "Am I just being petty about money?",
        a: "Money is the cleanest measure available in friendship because it is the only one that counts itself. Noticing it is not pettiness. What matters is not the amount but what happens when you mention it once, factually — and that reaction is about the friendship rather than about the sum.",
      },
    ],
  };
}

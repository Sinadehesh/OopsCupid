import type { Dossier, Subscale, SubscaleInsight } from "@/lib/report/dossier";
import { buildEvidence } from "@/lib/report/evidence";
import { BAD_GUYS_QUESTIONS } from "../_data/questions";

/**
 * "Why do I pick bad guys?" — paid report content.
 *
 * Ten subscales, each with its own mechanism and counter-move. The band
 * writing sets the tone; the subscale writing is what makes two reports in
 * the same band read differently.
 */

/** Raw subscale scores are 5 questions × 1–5, so 5–25. Map to 0–100. */
const toPct = (raw: number) => Math.round(((raw - 5) / 20) * 100);

const MEASURES: Record<string, { short: string; measures: string }> = {
  "Intensity Bias": { short: "Intensity", measures: "How strongly you read adrenaline — nerves, urgency, uncertainty — as evidence of chemistry." },
  "Potential Projection": { short: "Potential", measures: "How much you relate to who he could become rather than who he has been." },
  "Red-Flag Minimizing": { short: "Minimising", measures: "How readily you supply an explanation for behaviour that hurt you." },
  "Rescuer Drive": { short: "Rescuing", measures: "How much of your value in a relationship comes from being the one who fixes things." },
  "Boundary Slippage": { short: "Boundaries", measures: "How often a limit you set quietly moves once he pushes against it." },
  "Validation Hunger": { short: "Validation", measures: "How much his approval sets your read on your own worth that day." },
  "Chaos Familiarity": { short: "Chaos", measures: "How normal instability feels — and how flat calm feels by comparison." },
  "Breadcrumb Addiction": { short: "Breadcrumbs", measures: "How much intermittent, unpredictable attention holds your focus." },
  "Self-Trust Erosion": { short: "Self-trust", measures: "How far your own read on a situation has stopped counting as evidence." },
  "Scarcity Mindset": { short: "Scarcity", measures: "How rare you believe a good option is, and what you accept because of it." },
};

const INSIGHTS: Record<string, SubscaleInsight> = {
  "Intensity Bias": {
    mechanism:
      "Your body cannot tell the difference between attraction and threat — both run on the same adrenaline. When a man is inconsistent, your nervous system produces the racing heart and preoccupation you have learned to call falling in love. Safe men do not trigger it, so they register as 'no spark'.",
    high: "Intensity is your primary filter. You are not choosing men badly so much as running a screening test that actively rejects the stable ones — a calm, available man reads to you as an absence of feeling rather than the presence of safety.",
    mid: "You know intellectually that butterflies are not compatibility, and you can usually name it after the fact. In the moment, though, intensity still gets the benefit of the doubt, especially early on when there is little else to go on.",
    low: "You are not driven by adrenaline. Interest for you builds on evidence, which means whatever is going wrong in your dating life is happening somewhere other than initial attraction.",
    move:
      "Score every man on a 1–10 'calm' scale on the third date: how settled does your stomach feel after he leaves? Below a 6 is a flag, not a thrill. Keep dating anyone who scores 7+ for four more weeks before you judge whether there is 'chemistry'.",
  },
  "Potential Projection": {
    mechanism:
      "Projection is investment in a person who does not exist yet. It gives you the reward of a good relationship without needing a good partner, which is why it is so hard to give up — the fantasy is more reliable than the man.",
    high: "You are in a relationship with a forecast. The version of him you describe to friends is assembled from his best hour, an explanation he once gave for his behaviour, and your own effort. That man has never been in the room.",
    mid: "You give a reasonable amount of benefit of the doubt, but the accounting is uneven: his good moments count as evidence of character and his bad ones count as circumstance.",
    low: "You judge men on their record rather than their reviews of themselves. This is the single most protective trait in this assessment.",
    move:
      "Write down, once, what he has actually done in the last 30 days — not said, not promised, not intended. Read only that list when you are deciding whether to stay.",
  },
  "Red-Flag Minimizing": {
    mechanism:
      "Minimising is not blindness; it is a reflex that protects you from having to act. Once you name a behaviour honestly, you owe yourself a decision about it — so the mind produces a smaller word instead, and the decision never comes due.",
    high: "You see everything. That is the painful part. The flags get registered and then immediately downgraded into something survivable, which is why you can describe his worst behaviour in a calm voice and still be there next month.",
    mid: "You catch the big things but round off the medium ones. The pattern usually shows up in how you tell the story — accurate to your friends, softened when you tell it to yourself.",
    low: "You call behaviour what it is. This makes the early weeks less comfortable for you and much shorter for the wrong men.",
    move:
      "For one week, re-tell every incident in the exact words you would use if your closest friend were describing it about her partner. Say it out loud. The gap between the two versions is the size of your blind spot.",
  },
  "Rescuer Drive": {
    mechanism:
      "If being needed is how you secure your place, then a man with no problems has no use for you — so the men who feel like a fit are the ones with a vacancy for a fixer. The relationship stays stable only while he stays broken.",
    high: "Your role in a relationship is load-bearing. You are the one managing his moods, his logistics, his relationships with other people. It feels like intimacy, but it is a job, and jobs end when the work runs out.",
    mid: "You take on more than your share without resenting it yet. The risk is not this relationship — it is that you do not know what you would offer a man who did not need managing.",
    low: "You can be close to someone without having a function. That means a healthy man will not feel like a threat to your usefulness.",
    move:
      "Pick one thing you routinely handle for him and stop, without announcing it. Watch what happens for two weeks. Whether it gets done tells you whether you are a partner or a service.",
  },
  "Boundary Slippage": {
    mechanism:
      "A boundary is not the sentence you say; it is what you do the second time. Men who take advantage are not testing your words — they are testing the consequence, and an unenforced limit teaches them that the line is decorative.",
    high: "Your limits get restated rather than enforced. From the outside this looks like flexibility; from his side it reads as a negotiation he will eventually win, which is why the same conversation keeps happening.",
    mid: "You hold the big boundaries and let the small ones drift. The drift matters because it is where he learns the rate at which you can be moved.",
    low: "Your no holds. It costs you some early matches and saves you entire years.",
    move:
      "Name one limit and attach a consequence you are genuinely willing to carry out. Small and real beats large and theoretical — 'I leave the conversation' is enforceable, 'I'll end things' usually is not.",
  },
  "Validation Hunger": {
    mechanism:
      "When your read on yourself comes from outside, whoever controls the supply controls you. A man who is warm and then absent is not being complicated; he is operating the only lever that works on you, whether he knows it or not.",
    high: "His attention is functioning as your self-esteem. A good text reorganises your day upward and silence reorganises it downward — which means he does not need to do anything cruel to hold enormous power over how you feel.",
    mid: "You would rather have his approval than not, but you can go a day without it. The tell is how quickly an unanswered message becomes a question about you rather than about him.",
    low: "Your sense of yourself survives his mood. You will notice bad behaviour sooner than most women do, because you are not depending on him to feel all right.",
    move:
      "For two weeks, keep a one-line daily note of something you did well that he does not know about. It sounds small; it rebuilds the internal supply that he is currently the sole distributor of.",
  },
  "Chaos Familiarity": {
    mechanism:
      "Familiar and good are different axes, and the nervous system only reliably tracks the first. If your early template involved unpredictability, then a steady relationship does not feel like relief — it feels like something missing, and the mind goes looking for the missing thing.",
    high: "Calm makes you restless. You may find yourself starting a difficult conversation when nothing is wrong, or losing interest exactly when a man becomes reliable — the flatness is not boredom with him, it is withdrawal.",
    mid: "You tolerate calm but do not yet trust it. The pattern shows up as waiting for the other shoe rather than as creating chaos yourself.",
    low: "Stability reads as stability to you. You are not going to sabotage a good thing for the sake of something happening.",
    move:
      "When the flat feeling arrives, name it out loud as withdrawal and do nothing for 72 hours — no conversation, no pulling away, no reopening old ground. The urge passes and takes the 'he's boring' verdict with it.",
  },
  "Breadcrumb Addiction": {
    mechanism:
      "Intermittent reinforcement produces stronger attachment than consistent reward — this is the slot-machine finding, and it holds in relationships. Unpredictable contact does not weaken your interest, it concentrates it, which is why the least available man is the one you think about most.",
    high: "The men who hold your attention are the ones who supply it unreliably. You can name the pattern and still check your phone, because the mechanism does not run on belief — it runs on schedule.",
    mid: "You notice the pull of irregular attention and can usually resist acting on it, though it still sets who occupies your thoughts.",
    low: "Sporadic attention reads to you as low interest, which is exactly what it is. This is a rare and useful immunity.",
    move:
      "Reply on your own schedule for 30 days — not games, just your actual availability rather than his. Men who were only interesting because they were unpredictable become visibly uninteresting within three weeks.",
  },
  "Self-Trust Erosion": {
    mechanism:
      "Every time you raise a concern and get argued out of it, the concern is not resolved — it is filed as a mistake you made. Repeat this enough and your own perception stops counting as evidence, which leaves you needing someone else to tell you what happened.",
    high: "You have largely outsourced your read on reality. The clearest sign is how much of your thinking goes into whether you are allowed to feel something rather than into what to do about it.",
    mid: "You still trust yourself on the big things but poll other people on the medium ones. That polling habit is where the erosion continues.",
    low: "You believe your own account of events. This is the foundation everything else in this report is built on.",
    move:
      "Keep a dated note of the moment you first felt something was off, before any discussion. Review it a week later. You will find your first instinct was right far more often than you currently assume.",
  },
  "Scarcity Mindset": {
    mechanism:
      "Scarcity does not change who is available; it changes your reserve price. Believing that good men are rare makes every mediocre option look like the last train, and nobody negotiates well from a platform they think is closing.",
    high: "You are dating from a position of shortage. This shows up less in who you pick and more in what you accept once you have picked — the cost of leaving looks catastrophic, so the cost of staying gets paid instead.",
    mid: "You know there are other options in the abstract, but under stress the abstract does not help much. Scarcity thinking tends to arrive right when you are deciding whether to end something.",
    low: "You operate as though you have options, which means you can leave — and being able to leave is what makes staying a choice rather than a sentence.",
    move:
      "Before any decision about ending things, write the answer to one question: 'If I had three good options, would I still accept this?' Decide from that answer, not from the fear underneath it.",
  },
};

interface BadGuysResult {
  /** The raw answers, present on any result computed after this shipped. */
  answers?: Record<number, number>;
  totalScore: number;
  tier: string;
  top1: string;
  sortedSubcategories: { name: string; score: number }[];
  customHeadline: string;
}

const BANDS = [
  {
    tier: "Toxic Pattern Magnet",
    id: "magnet",
    label: "Toxic Pattern Magnet",
    accent: "#f43f5e",
    verdict:
      "Your answers describe a complete cycle, not a run of bad luck. Every stage of it — what attracts you, what you excuse, what you tolerate, and what keeps you from leaving — scored high enough to be doing real work. That is actually good news in one specific way: a cycle has entry points, and a run of bad luck does not.",
    urgency:
      "Do not try to fix all ten dimensions. Take the top two from your chart and work only on those for the next fortnight — in a pattern this interlocked, the top dimensions are carrying the rest, and they collapse the others when they move.",
    perspective:
      "A high score here measures a set of learned responses, not your character or your judgement. Every one of these dimensions was adaptive somewhere before it became expensive here.",
  },
  {
    tier: "Chaos-Chemistry Loop",
    id: "loop",
    label: "Chaos-Chemistry Loop",
    accent: "#fb7185",
    verdict:
      "The pattern in your answers is specific: you are attracted to volatility and then you accommodate it. Those two things reinforce each other — the attraction gets you into the situation and the accommodation keeps you there long past the point where you knew better.",
    urgency:
      "The next few weeks matter more than the next few months. Loops like this tighten when you are lonely, so put the counter-moves in place while you are not in the middle of one.",
    perspective:
      "You are not choosing badly on purpose, and you are clearly not unaware — you took this quiz. Awareness is the part most people never reach.",
  },
  {
    tier: "Red-Flag Negotiator",
    id: "negotiator",
    label: "Red-Flag Negotiator",
    accent: "#f97316",
    verdict:
      "You see problems clearly and then talk yourself into a manageable version of them. Your scores are not those of someone who misses warnings — they are those of someone who registers a warning and then reduces it to something she can live with.",
    urgency:
      "Watch the next time you catch yourself explaining his behaviour to a friend. That sentence, said out loud, is the whole pattern in miniature, and it is the easiest place to intervene.",
    perspective:
      "Negotiating is a skill; the problem is only the direction it is pointed. The same ability to see both sides makes you very good at the things this report asks you to do.",
  },
  {
    tier: "Potential Chaser",
    id: "chaser",
    label: "Potential Chaser",
    accent: "#f59e0b",
    verdict:
      "Your profile is weighted toward the future rather than the evidence. You invest in what a man could become, and you are generous with the time you give him to become it. The men who benefit most from that generosity are the ones least likely to change.",
    urgency:
      "There is no emergency here, which is exactly why this is the right moment. Patterns are much easier to change before a specific person makes it personal.",
    perspective:
      "Optimism about people is not a defect. It only becomes one when it is unaccompanied by a record.",
  },
  {
    tier: "Soft Spot",
    id: "softspot",
    label: "Soft Spot",
    accent: "#eab308",
    verdict:
      "Most of your dimensions are in a healthy range. One or two are not, and the chart below shows exactly which — that concentration is why your dating life can feel inexplicably difficult despite generally good judgement.",
    urgency:
      "Read only the top two cards below. The rest describe patterns you do not have, and applying advice you do not need is its own kind of problem.",
    perspective:
      "A narrow vulnerability is the easiest kind to close. You are not rebuilding anything here — you are patching one seam.",
  },
  {
    tier: "Clear Radar",
    id: "clear",
    label: "Clear Radar",
    accent: "#10b981",
    verdict:
      "Your answers do not show a self-sabotage pattern. You read behaviour accurately, you hold limits, and your sense of yourself does not depend on a man's mood. If your dating life is still frustrating, the cause is outside the scope of this assessment.",
    urgency:
      "Nothing here needs urgent attention. Use the chart below as a baseline — a year from now, a shift in any dimension is worth noticing.",
    perspective:
      "Scoring low is not the same as never having been hurt. It means the hurt did not rewrite how you choose.",
  },
];

export function buildBadGuysDossier(data: BadGuysResult): Dossier {
  // The band IS the tier the scoring module already assigned — deriving it
  // a second time from the percentage produced two different names for the
  // same result on the same page.
  const band = BANDS.find((b) => b.tier === data.tier) ?? BANDS[BANDS.length - 1];
  const score = Math.round(((data.totalScore - 50) / 200) * 100);

  const subscales: Subscale[] = data.sortedSubcategories.map((s) => ({
    key: s.name,
    label: s.name,
    short: MEASURES[s.name]?.short ?? s.name,
    value: Math.max(0, Math.min(100, toPct(s.score))),
    measures: MEASURES[s.name]?.measures ?? "",
  }));

  const top = subscales.reduce((a, b) => (b.value > a.value ? b : a), subscales[0]);
  const second = subscales.filter((s) => s.key !== top.key).reduce((a, b) => (b.value > a.value ? b : a), subscales[1]);

  return {
    quiz: "Why Do I Pick Bad Guys?",
    title: "Your Partner-Selection Dossier",
    archetype: data.customHeadline,
    archetypeLabel: "The pattern in one sentence",
    scoreLabel: "Pattern Index",
    score,
    band,
    topicLabel: `your pull toward ${top.label.toLowerCase()}`,
    subscales,
    insights: INSIGHTS,
    // Absent on results saved before the scoring kept answers; the report
    // then renders without section 02 rather than inventing one.
    evidence: data.answers ? buildEvidence(BAD_GUYS_QUESTIONS, data.answers) : undefined,
    deepDive: [
      {
        heading: "The two dimensions doing the most work",
        body:
          `Your chart is not ten equal problems. ${top.label} scored ${top.value} and ${second.label} scored ${second.value}, and in combination they explain most of what you experience as "picking badly". ` +
          `${top.label} governs who gets through the door; ${second.label} governs how long they stay after you know better. Selection and retention are separate skills and they fail for separate reasons, which is why working on "being pickier" alone has never fixed this — it only addresses the first one.`,
      },
      {
        heading: "Why the wrong men find this so easy to read",
        body:
          "Men who take advantage are not psychic and they are rarely strategic in the way films suggest. What they are is efficient: they make a small request early — a moved boundary, a cancelled plan, a late reply — and they read your response. A woman who enforces gets dropped in the first fortnight because she is expensive. A woman who accommodates gets kept, and the requests get larger at a rate her responses set. Nothing in that process requires you to be naive; it only requires that your first no be softer than your second.",
      },
      {
        heading: "Why this is stickier than a preference",
        body:
          "Attraction patterns are not opinions you can talk yourself out of, which is why insight alone has not changed anything for you so far. They live in the part of the nervous system that decides, before you have language for it, whether a situation is familiar. Familiar is the only signal that system reliably reads, and it does not carry a quality judgement. This is also why change here feels unpleasant rather than liberating at first: the correct choice registers as flat, and flatness is a withdrawal symptom, not a verdict on the man.",
      },
      {
        heading: "What actually changes it",
        body:
          "Three things, in order. First, a written record of behaviour rather than a remembered impression — memory is reconstructive and reconstructs in his favour. Second, one enforced boundary with a consequence small enough that you will really carry it out, because the enforcement is the lesson, not the size. Third, staying present through the flatness of a stable man for longer than three dates, which is roughly how long the withdrawal lasts. None of these require you to feel differently. They only require you to act before the feeling catches up.",
      },
    ],
    scripts: [
      {
        situation: "He reappears after weeks of silence",
        say: "Hey. I'm not picking this back up, but I wish you well.",
        why:
          "No explanation and no question mark. Explanations are an opening — they invite a reply, and the reply is where you get talked round. This sentence cannot be argued with because it makes no claim about him.",
      },
      {
        situation: "He crosses a limit you have already stated once",
        say: "I've said this before, so I'm not going to explain it again. If it happens a third time, I'm out.",
        why:
          "Naming that it is a repeat removes the 'I didn't realise' route, and attaching a consequence converts a preference into a limit. Say it only if it is true — an unenforced threat is worse than no threat.",
      },
      {
        situation: "He explains away something that hurt you",
        say: "That might all be true. It doesn't change that it happened twice and I'm not okay with it.",
        why:
          "This does not dispute his version, so there is nothing to win by arguing. It separates his reason from the pattern, which is the one move most of these conversations are designed to prevent.",
      },
      {
        situation: "A steady man feels flat and you want to end it",
        say: "(To yourself, not him.) Nothing is wrong. I'm at day nine of not being on edge.",
        why:
          "The flatness peaks in the second week and passes. Naming it as withdrawal rather than incompatibility is the single highest-value habit in this report, because it is the one that keeps the good option in play long enough to be judged fairly.",
      },
    ],
    plan: [
      {
        window: "Days 1–3",
        title: "Build the record",
        detail:
          `Write down what the man you are currently thinking about has actually done in the last 30 days. Actions only — not intentions, not what he said he would do, not what he was going through. Most people find the list is a third the length they expected. Keep it; you will re-read it on day 12.`,
      },
      {
        window: "Days 4–7",
        title: `Run one intervention on ${top.label}`,
        detail:
          `This is your highest dimension at ${top.value}/100, so it is where a small change shows up fastest. Do exactly the counter-move from its card above — once, deliberately, and note what happened afterwards. One executed move beats ten understood ones.`,
      },
      {
        window: "Days 8–11",
        title: "Set one boundary you will actually enforce",
        detail:
          "Choose something small enough that carrying out the consequence costs you an evening, not a relationship. 'If you cancel same-day again I'm not rescheduling that week' is enforceable. The point is not the rule — it is that you find out what you do when it is tested.",
      },
      {
        window: "Days 12–14",
        title: "Re-read the record and decide once",
        detail:
          "Read only the behaviour list from day 1, with no context and no explanations attached. Then answer one question in writing: if a friend showed you this exact list, what would you tell her to do? Do that. Decide once rather than continuously — continuous deciding is how a year goes by.",
      },
    ],
    faq: [
      {
        q: "Does a high score mean I should leave my relationship?",
        a: "No. This assessment measures your pattern, not his behaviour — a high score tells you what you are prone to, not what he is doing. If you want to know whether a specific relationship is the problem, use the record from day 1 of the plan: it is about him, and this report is about you.",
      },
      {
        q: "I recognised myself in almost every dimension. Is that normal?",
        a: "It is common, and it is usually an artefact of how these traits cluster rather than ten separate problems. Work the top two. In most profiles the lower dimensions are downstream of the top ones and move on their own.",
      },
      {
        q: "How long does this actually take to change?",
        a: "The behaviours change in weeks — that is what the 14-day plan is for. The feeling that a stable man is boring takes longer, usually two to three months of repeated exposure. Most people quit in week two because they mistake the withdrawal for proof they were right.",
      },
    ],
  };
}

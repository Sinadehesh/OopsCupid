import type { Dossier, Subscale, SubscaleInsight } from "@/lib/report/dossier";
import { composite } from "@/lib/report/composites";

/**
 * "Attraction patterns" — paid report content.
 *
 * The outbound counterpart to the attractor quiz: who YOU are drawn to,
 * rather than who is drawn to you. Same long tail of one-item subscales,
 * so the same composite treatment applies — a chart built from single
 * questions would look precise and mean very little.
 */

interface AttractionProfile {
  riskIndex: number;
  archetype: string;
  normalizedScores: Record<string, number>;
}

const DIMENSIONS: {
  key: string; label: string; short: string; measures: string;
  from: (s: Record<string, number>) => number;
}[] = [
  {
    key: "intensity", label: "Intensity Preference", short: "Intensity",
    measures: "How much you need the early stage to feel charged rather than comfortable.",
    from: (s) => composite(s, ["Chemistry", "Excitement", "Anxiety"]),
  },
  {
    key: "darkPull", label: "Dark-Trait Pull", short: "Dark pull",
    measures: "How much confidence-with-an-edge registers to you as attractive.",
    from: (s) => composite(s, ["Narcissism", "Machiavellianism", "Psychopathy", "Antagonism"]),
  },
  {
    key: "unavailability", label: "Unavailability Draw", short: "Unavailable",
    measures: "How much your interest depends on someone not being fully reachable.",
    from: (s) => composite(s, ["Avoidance", "Detachment", "Independence"]),
  },
  {
    key: "rescuing", label: "Rescuer Preference", short: "Rescuing",
    measures: "How much of your attraction comes from being needed or from someone's potential.",
    from: (s) => composite(s, ["Vulnerability", "Agreeableness", "Protection"]),
  },
  {
    key: "status", label: "Status Weighting", short: "Status",
    measures: "How much money, standing and appearance move your interest.",
    from: (s) => composite(s, ["Status", "Resources", "Looks"]),
  },
  {
    key: "volatilityTolerance", label: "Volatility Tolerance", short: "Volatility",
    measures: "How much emotional unpredictability you find normal in a partner.",
    from: (s) => composite(s, ["NegativeAffect", "Neuroticism", "Disinhibition", "Psychoticism"]),
  },
  {
    key: "stability", label: "Stability Preference", short: "Stability",
    measures: "How much you weight reliability, shared values and a calm life.",
    from: (s) => composite(s, ["Conscientiousness", "Values", "Family", "Openness"]),
  },
];

const INSIGHTS: Record<string, SubscaleInsight> = {
  intensity: {
    mechanism:
      "Adrenaline and attraction share a physiology, so the body produces the same racing heart for uncertainty as it does for desire. Inconsistent people generate that state reliably; consistent people do not. The result is a filter that quietly scores availability as an absence of feeling.",
    high: "Intensity is your primary filter. You are not choosing badly so much as running a screening test that rejects the stable options, because a calm person cannot produce the signal you are reading for.",
    mid: "You know that butterflies are not compatibility and can usually name it afterwards. In the moment, intensity still gets the benefit of the doubt — particularly in the first fortnight, when there is little else to go on.",
    low: "Your interest builds on evidence rather than on adrenaline. Whatever is frustrating about your dating life, it is not happening at the attraction stage.",
    move:
      "Rate how settled you feel an hour after the third date, out of ten. Below six is a flag, not a thrill. Keep seeing anyone who scores seven or above for four more weeks before judging whether there is chemistry — the verdict at week two is withdrawal, not information.",
  },
  darkPull: {
    mechanism:
      "The traits that read as magnetic early — certainty, boldness, indifference to other people's opinions — are the same ones that produce trouble later. They are not disguised at the start; they are genuinely attractive, and the cost only becomes visible once the certainty is pointed at you.",
    high: "You are drawn to edge. The early stage with these partners tends to be the best you have experienced, which is precisely why the pattern survives repeated evidence.",
    mid: "Some pull toward bold, self-assured people, without it overriding everything else.",
    low: "Confidence without warmth does not particularly attract you. This is the strongest protective factor on the chart.",
    move:
      "Watch how he treats someone who cannot do anything for him — a waiter, a junior colleague — in the first month. It is the single most predictive observation available, and it costs you nothing to make.",
  },
  unavailability: {
    mechanism:
      "Intermittent attention produces stronger attachment than consistent attention — the slot-machine finding, and it holds in relationships. Unpredictability does not weaken interest, it concentrates it, which is why the least available person is the one who occupies most of your thinking.",
    high: "Your interest is strongly organised around people who are not fully reachable. You can name the pattern and still check your phone, because it runs on a schedule rather than on belief.",
    mid: "You notice the pull of irregular attention and can usually resist acting on it, though it still sets who occupies your attention.",
    low: "Sporadic attention reads to you as low interest — which is what it is. A rare and useful immunity.",
    move:
      "Reply on your own schedule for thirty days. Not games — your actual availability rather than theirs. People who were interesting only because they were unpredictable become visibly uninteresting inside three weeks.",
  },
  rescuing: {
    mechanism:
      "If being needed is how you secure your place, a partner with no vacancy has no use for you. That makes people with problems feel like a fit, and it makes the relationship stable only for as long as the problem lasts.",
    high: "You are drawn to potential and to people who need managing. It feels like intimacy and functions like a role — and roles end when the work does.",
    mid: "You take on more than your share without resenting it yet. The risk is not this relationship; it is not knowing what you would offer someone who needed nothing.",
    low: "You can be close to someone without having a function, which means a self-sufficient partner does not register as a threat.",
    move:
      "Write down what he has actually done in the last thirty days — not said, not promised, not intended. Decide from that list. Projection is investment in a person who does not exist yet, and the list is the fastest cure for it.",
  },
  status: {
    mechanism:
      "Status is a legitimate preference that becomes a liability in one specific way: it is easy to display and hard to verify. Anyone can present the markers, which means weighting them heavily selects for people who are good at presentation rather than for people who are good.",
    high: "Standing and appearance move your interest substantially. The exposure is not shallowness — it is that these signals are the cheapest ones to fake, so your filter is the easiest to pass.",
    mid: "Status counts without deciding anything.",
    low: "Status barely registers for you.",
    move:
      "Before the third date, name one thing you know about how he treats people close to him. If status is the only category you can fill in, you are evaluating a presentation rather than a person.",
  },
  volatilityTolerance: {
    mechanism:
      "Familiar and good are different axes, and the nervous system only tracks the first. If early life involved unpredictability, then calm does not register as relief — it registers as something missing, and the mind goes looking for the missing thing.",
    high: "Emotional unpredictability reads as normal to you, and calm reads as flat. That flatness is withdrawal rather than boredom, and it is the reason good options get discarded at around week two.",
    mid: "You tolerate calm without fully trusting it. It shows up as waiting for the other shoe rather than as creating drama yourself.",
    low: "Stability reads as stability. You are not going to dismantle something good for the sake of something happening.",
    move:
      "When the flat feeling arrives, name it as withdrawal and do nothing for seventy-two hours — no conversation, no pulling away, no reopening old ground. It passes, and it takes the verdict with it.",
  },
  stability: {
    mechanism:
      "Stability preference is the counterweight to everything above it on this chart. It is the least exciting dimension and the one that best predicts whether a relationship lasts, because it is the only one that describes what you want on an ordinary Tuesday rather than in week two.",
    high: "You genuinely value reliability and shared values. If your results are still poor, the constraint is at the selection stage rather than in what you want.",
    mid: "Stability matters to you without being decisive.",
    low: "You weight reliability and shared values lightly, which is the clearest signal on this chart. It means your filter is built entirely around the early stage, and the early stage is the part that ends.",
    move:
      "Write down three non-negotiables that have nothing to do with how someone makes you feel in the first month — how he handles being wrong, what he does when you are ill, whether his friendships last. Screen on those before chemistry, not after.",
  },
};

const BANDS = [
  {
    min: 65, id: "high", label: "High-Risk Attraction Pattern", accent: "#f43f5e",
    verdict:
      "Your preferences point consistently toward partners who are exciting and unreliable. That is a coherent pattern rather than a run of bad luck, and it is worth knowing that patterns have entry points in a way that bad luck does not.",
    urgency:
      "Nothing here is an emergency. It does mean the next person who produces an immediate, overwhelming certainty is worth slowing down on — that feeling is the pattern's signature rather than a signal about them.",
    perspective:
      "None of these preferences are character defects, and every one of them was adaptive somewhere before it became expensive here. They are learned responses, and learned responses are the changeable kind.",
  },
  {
    min: 40, id: "mixed", label: "Mixed Attraction Pattern", accent: "#f59e0b",
    verdict:
      "Your preferences pull in two directions at once: part of your chart wants intensity and part of it wants something that lasts. That is why your dating history is probably inconsistent rather than uniformly difficult — different dimensions have been winning at different times.",
    urgency:
      "No urgency. The useful work is noticing which dimension is in charge when you make a decision, because it is rarely the same one that would make the decision a month later.",
    perspective:
      "A mixed profile is the most common result and the easiest to shift, because the counterweight is already present in your own preferences.",
  },
  {
    min: 0, id: "low", label: "Low-Risk Attraction Pattern", accent: "#10b981",
    verdict:
      "Your preferences point toward available, reliable people. You are not selecting for the traits that predict trouble, which means that if your dating life is frustrating, the cause sits outside what this assessment measures.",
    urgency: "Nothing to act on here.",
    perspective:
      "Low risk is not the same as never having been hurt. It means the hurt did not rewrite what you are drawn to.",
  },
];

export function buildAttractionDossier(raw: { profile: AttractionProfile } | AttractionProfile): Dossier {
  const profile: AttractionProfile = (raw as any).profile ?? raw;
  const scores = profile.normalizedScores ?? {};
  const score = Math.max(0, Math.min(100, Math.round(profile.riskIndex ?? 0)));
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
  const stability = subscales.find((s) => s.key === "stability")!;
  const intensity = subscales.find((s) => s.key === "intensity")!;

  return {
    quiz: "Attraction Patterns",
    title: "Your Attraction Blueprint",
    scoreLabel: "Pattern Risk Index",
    score,
    band,
    archetype: profile.archetype,
    archetypeLabel: "Your dominant pattern",
    topicLabel: "the type you keep being drawn to",
    subscales,
    insights: INSIGHTS,
    deepDive: [
      {
        heading: "Intensity against stability — the ratio that decides your results",
        body:
          `Intensity preference ${intensity.value}, stability preference ${stability.value}. These two compete directly: the first decides who gets your attention and the second decides who you can actually live alongside. ` +
          (intensity.value > stability.value + 15
            ? "Yours favours intensity, which means your filter is optimised for the first month of a relationship and indifferent to the rest of it. That is the whole mechanism behind a pattern of exciting starts and poor endings."
            : stability.value > intensity.value + 15
            ? "Yours favours stability, which is the healthier arrangement and the one associated with relationships that last. If dating still feels difficult, the problem is more likely to be volume of options than the kind of person you pick."
            : "Yours are close, which produces genuine ambivalence — you are drawn to people you would not choose, and choose people you are not drawn to. That conflict is uncomfortable and it is also the most workable version of this result."),
      },
      {
        heading: `Why ${top.label} leads your chart`,
        body:
          `${top.label} scored ${top.value} and ${second.label} scored ${second.value}. Selection and retention are separate skills that fail for separate reasons, which is why deciding to "be pickier" has never fixed this — it addresses only the first. ${top.short} governs who gets through the door. ${second.short} governs how long they stay after you know better. Both counter-moves are meant to be run together for that reason.`,
      },
      {
        heading: "Why insight alone has not changed this",
        body:
          "Attraction is not an opinion, so it cannot be argued with. It lives in the part of the nervous system that decides, before you have language for it, whether a situation is familiar — and familiarity is the only signal that system reads reliably. It carries no quality judgement at all. This is also why change feels bad rather than liberating at first: the correct choice registers as flat, and that flatness is a withdrawal symptom rather than a verdict on the person in front of you.",
      },
      {
        heading: "What actually shifts it",
        body:
          "Three things, in order. A written record of behaviour rather than a remembered impression, because memory is reconstructive and reconstructs in his favour. One screening criterion applied before chemistry rather than after — chemistry is not information, it is a physiological state. And staying present through the flatness of a stable person for longer than three dates, which is roughly how long the withdrawal lasts. None of these require you to feel differently. They require you to act before the feeling catches up, and the feeling does catch up, usually in the second or third month.",
      },
    ],
    scripts: [
      {
        situation: "You feel instant, overwhelming certainty about someone",
        say: "(To yourself.) This is the feeling. I'll decide in three weeks.",
        why:
          "Certainty in week one is a statement about your nervous system rather than about them. Nothing is lost by waiting, and everything the pattern depends on is lost by waiting.",
      },
      {
        situation: "A steady person feels flat and you want to end it",
        say: "(To yourself.) Nothing is wrong. I'm at day nine of not being on edge.",
        why:
          "The flatness peaks in the second week and then passes. Naming it as withdrawal rather than as incompatibility is the single highest-value habit in this report, because it keeps the good option in play long enough to be judged fairly.",
      },
      {
        situation: "Someone reappears after going quiet",
        say: "Hey. I'm not picking this back up, but I wish you well.",
        why:
          "No explanation and no question mark. Explanations invite a reply, and the reply is where you get talked round. This sentence makes no claim about them, so there is nothing to argue with.",
      },
      {
        situation: "Setting a limit early with someone you like",
        say: "I go slowly. That's not about you.",
        why:
          "Warm, not withholding, and it introduces a delay without a confrontation. Someone genuinely interested finds it unremarkable; someone who needed the speed shows you within a week.",
      },
    ],
    plan: [
      {
        window: "Days 1–3",
        title: "Audit the last three",
        detail:
          "Write down, for each of your last three significant attractions: how fast it moved in the first fortnight, what drew you in the first week, and how it ended. Three cases is enough for a pattern. In most profiles the pace predicts the ending better than the person does.",
      },
      {
        window: "Days 4–7",
        title: "Write three non-chemistry criteria",
        detail:
          "Three things you will screen for that have nothing to do with how someone makes you feel early on — how he handles being wrong, what he does when you are ill, whether his friendships last. Then apply them before chemistry rather than after. Chemistry has never been the constraint; sequencing is.",
      },
      {
        window: "Days 8–11",
        title: `Run the counter-move for ${top.label}`,
        detail:
          `Your leading dimension at ${top.value}/100. Do exactly what its card says, once, deliberately, and write down what happened. One executed move is worth ten understood ones, and this is the dimension where a single change shows up fastest.`,
      },
      {
        window: "Days 12–14",
        title: "Sit through one flat week",
        detail:
          "With anyone steady you are currently seeing, do nothing for a fortnight — do not escalate, do not withdraw, do not decide. Most people quit in week two because they mistake withdrawal for proof that they were right. Getting past that point is the whole intervention.",
      },
    ],
    faq: [
      {
        q: "Does this mean I'm attracted to bad people?",
        a: "No. It means your preferences weight traits that are genuinely attractive early and poorly correlated with how a relationship goes later — confidence, unpredictability, intensity. Plenty of people with those traits are perfectly decent. The issue is that the filter cannot tell the difference, because it is not measuring for it.",
      },
      {
        q: "Can what I'm attracted to actually change?",
        a: "The behaviours change in weeks. The feeling that a stable person is boring takes longer — usually two to three months of repeated exposure. Most people conclude it has not worked at week two, which is exactly when the withdrawal peaks.",
      },
      {
        q: "Why doesn't my archetype sound like me?",
        a: "It is generated from the relative height of your dimensions rather than their absolute values, so it describes the shape of your chart rather than your personality. Read the dimension cards for anything you intend to act on; the archetype is a label for a pattern, not an identity.",
      },
    ],
  };
}

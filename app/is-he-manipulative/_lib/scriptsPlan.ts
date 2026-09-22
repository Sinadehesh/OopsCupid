import type { ScriptCard, ActionStep } from "@/lib/report/dossier";

/**
 * "Is he manipulative?" — the scripts and action plan the checkout page
 * promises ("the scripts to stop him today" + a master action plan).
 *
 * Keyed to the dominant pattern the scoring engine identifies, because a
 * counter-move for gaslighting is the wrong move for isolation and vice
 * versa. A single generic set would be the over-promise this is fixing.
 */

export type DominantPattern =
  | "gaslighting"
  | "isolation_dependency"
  | "emotional_control"
  | "mixed_friction";

const SCRIPTS: Record<DominantPattern, ScriptCard[]> = {
  gaslighting: [
    {
      situation: "He denies something you clearly remember",
      say: "We remember it differently. I'm not going to debate it.",
      why:
        "It concedes nothing and offers nothing to argue with. Trying to prove the memory is the trap — the denial exists to put your recall on trial, and the only way not to lose that trial is to decline it.",
    },
    {
      situation: "Your reaction becomes the subject instead of his behaviour",
      say: "We can talk about how I said it after we've finished talking about what happened.",
      why:
        "It does not reject his complaint, so there is nothing to escalate — it just puts it in a queue. The redirect only works if it happens immediately.",
    },
    {
      situation: "The conversation is going in circles",
      say: "I'm going to stop here. We can come back to it tomorrow.",
      why:
        "Circular arguments are won by whoever lasts longer, which is never the person holding a consistent account. Leaving on a clock removes the mechanism rather than the topic.",
    },
    {
      situation: "He tells you no one else sees it this way",
      say: "That's possible. It's still how I see it.",
      why:
        "Refuses the invitation to treat other people's opinions as the deciding evidence about your own experience — without giving him an accusation to defend against.",
    },
  ],
  isolation_dependency: [
    {
      situation: "He objects to you seeing friends or family",
      say: "I'm going. We can talk about it when I'm back.",
      why:
        "Short, not a negotiation, and not an argument about whether the objection is reasonable. Outside relationships are the single strongest protective factor here, and they are defended by attendance rather than by debate.",
    },
    {
      situation: "Plans get derailed right before you leave",
      say: "I'm still going. I'll sort this out with you later.",
      why:
        "A crisis timed to your departure is answered by leaving anyway, once. Cancelling teaches that the timing works; nothing else you say will unteach it.",
    },
    {
      situation: "He wants access to your phone, accounts or location",
      say: "No. That's not something I'm going to do.",
      why:
        "No reason attached. Reasons invite a counter-argument about trust, and that argument is unwinnable by design — the request was never really about trust.",
    },
    {
      situation: "Money becomes a reason you cannot do something",
      say: "Let's look at the numbers together this week.",
      why:
        "Turns a vague constraint into a specific, checkable one. Economic control depends on the details staying vague; daylight is the counter-move.",
    },
  ],
  emotional_control: [
    {
      situation: "Silence or withdrawal after you raised something",
      say: "I'm not going to chase this. I'll be here when you want to talk.",
      why:
        "Stonewalling works because the discomfort of the silence makes you concede to end it. Naming that you will wait removes its only leverage without escalating.",
    },
    {
      situation: "A raised voice, a slammed door, a look",
      say: "I'm going to step outside for a bit.",
      why:
        "Leaves the situation without a verdict on it. Intimidation needs you present to work; going for a walk is not a confrontation and it is not compliance either.",
    },
    {
      situation: "Guilt after you have already said no",
      say: "I know, and I still can't.",
      why:
        "Acknowledges him without reopening the decision. Re-explaining signals the decision is still negotiable — which is exactly what the guilt is testing for.",
    },
    {
      situation: "He minimises something that hurt you",
      say: "That might all be true. It doesn't change that it happened twice and I'm not okay with it.",
      why:
        "Does not dispute his version, so there is nothing to win by arguing — and it separates his reason from the pattern, which is the move these conversations are built to prevent.",
    },
  ],
  mixed_friction: [
    {
      situation: "Buying time instead of answering under pressure",
      say: "Let me think about it and I'll tell you tomorrow.",
      why:
        "Costs nothing, cannot be argued with, and removes the one condition most pressure depends on: an answer in the moment. Use it even when you already know your answer.",
    },
    {
      situation: "Declining without starting a negotiation",
      say: "That doesn't work for me.",
      why:
        "No reason means nothing to solve. Reasons turn a no into a discussion, and the discussion is where it gets worn down.",
    },
    {
      situation: "Repeating a limit you have already stated",
      say: "I meant it the first time. I'm not doing this one.",
      why:
        "Naming it as a repeat removes the 'I didn't realise' route without an accusation. Short is the whole point — length signals the decision is still open.",
    },
    {
      situation: "After an argument, when nothing has been repaired",
      say: "I don't want to relitigate it. I do want to know we're okay.",
      why:
        "Asks for repair without reopening the argument. Whether repair is available is the most useful thing to know about a relationship, and this is the cheapest way to find out.",
    },
  ],
};

const PLANS: Record<DominantPattern, ActionStep[]> = {
  gaslighting: [
    {
      window: "Days 1–3",
      title: "Start a dated log",
      detail:
        "One line per incident, written the same day: date, what was said, what you had said before it. Facts only — feelings get argued with and facts do not. Keep it somewhere he cannot reach. This is for you, not for him, and you will read it on day 14.",
    },
    {
      window: "Days 4–7",
      title: "Stop trying to win the argument",
      detail:
        "For one week, use the scripts above instead of evidence. Do not produce screenshots, do not reconstruct timelines, do not call witnesses. Notice how much shorter the conversations get — that length was never about the facts.",
    },
    {
      window: "Days 8–11",
      title: "Tell one person outside it",
      detail:
        "Say it out loud, in plain language, to someone with no stake in the relationship. Not for advice. Isolation is what makes every other tactic work, and one outside account of events measurably weakens all of them.",
    },
    {
      window: "Days 12–14",
      title: "Read the log as if it were someone else's",
      detail:
        "Two weeks of dated entries, in one sitting, without the surrounding context. This is the closest you can get to an outside view of your own relationship — and it means your next decision comes from a record rather than an impression.",
    },
  ],
  isolation_dependency: [
    {
      window: "Days 1–3",
      title: "Map what runs through him",
      detail:
        "Write down everything shared or dependent: money, housing, accounts, transport, your social circle, your job. This is not a decision — it is an inventory. The cost of leaving is what determines what you tolerate, and you cannot lower a cost you have not measured.",
    },
    {
      window: "Days 4–7",
      title: "Restore one outside relationship",
      detail:
        "Contact one person who has quietly gone dormant, and see them. Do not make it a statement and do not explain. One active relationship outside his reach changes the dynamic more than any conversation with him will.",
    },
    {
      window: "Days 8–11",
      title: "Remove one dependency",
      detail:
        "One. Money is usually fastest, housing slowest, social circle the most underrated. Do it quietly and do not announce it. Every dependency removed lowers the price of every decision that comes after it.",
    },
    {
      window: "Days 12–14",
      title: "Keep one commitment that does not move",
      detail:
        "Choose something weekly and go, regardless of what comes up that day. Hold it for two weeks. What you learn from how that is received is worth more than anything you could ask him directly.",
    },
  ],
  emotional_control: [
    {
      window: "Days 1–3",
      title: "Track the before, not the incident",
      detail:
        "For each flashpoint, write what happened in the 24 hours beforehand. You are looking for the trigger, not the argument. Most people find the pattern is about timing — closeness, or your independence — far more than about the stated subject.",
    },
    {
      window: "Days 4–7",
      title: "Stop chasing the silence",
      detail:
        "When he withdraws, use the script above once and then genuinely leave it. No follow-up messages, no repair attempts, no softening. Stonewalling runs entirely on your discomfort; this is the week you find out what happens without it.",
    },
    {
      window: "Days 8–11",
      title: "Make no decision in the moment",
      detail:
        "For one week, commit to nothing during a conversation with him. 'I'll come back to you tomorrow' for everything, including easy requests. Pressure needs an immediate answer, and you will learn a great deal from how removing that lands.",
    },
    {
      window: "Days 12–14",
      title: "Test for repair",
      detail:
        "After the next disagreement, wait. Do not initiate the repair yourself. Whether he comes back on his own, and how long it takes, predicts more about this relationship than any score on this page.",
    },
  ],
  mixed_friction: [
    {
      window: "Days 1–3",
      title: "Write down what actually happened",
      detail:
        "Three incidents, dated, in the words you would use telling a friend. The gap between how you describe it to someone else and how you describe it to yourself is the thing worth noticing here.",
    },
    {
      window: "Days 4–7",
      title: "Set one limit with a real consequence",
      detail:
        "Small enough that carrying it out costs you an evening, not the relationship. 'If you cancel same-day again I'm not rescheduling that week' is enforceable. The point is not the rule — it is finding out what you do when it is tested.",
    },
    {
      window: "Days 8–11",
      title: "Stop deciding in the moment",
      detail:
        "No commitments made during a conversation, for one week. This single change removes the mechanism behind most of what registered on this assessment, and it requires nothing from him.",
    },
    {
      window: "Days 12–14",
      title: "Check whether repair exists",
      detail:
        "After the next disagreement, do not initiate the repair. If he comes back on his own, you are dealing with friction and it is workable. If the silence simply continues until you break it, you have learned something this quiz could not tell you.",
    },
  ],
};

export function scriptsFor(pattern: string | undefined): ScriptCard[] {
  return SCRIPTS[(pattern as DominantPattern) ?? "mixed_friction"] ?? SCRIPTS.mixed_friction;
}

export function planFor(pattern: string | undefined): ActionStep[] {
  return PLANS[(pattern as DominantPattern) ?? "mixed_friction"] ?? PLANS.mixed_friction;
}

export const PATTERN_LABEL: Record<DominantPattern, string> = {
  gaslighting: "reality distortion",
  isolation_dependency: "isolation and dependency",
  emotional_control: "emotional control",
  mixed_friction: "mixed friction",
};

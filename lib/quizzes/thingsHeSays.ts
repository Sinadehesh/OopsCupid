/**
 * THINGS HE SAYS: the entry point paid social actually needs.
 *
 * The diagnostics on this site run to 78 questions at the median and 120 at
 * the longest. That is defensible for someone who arrived from a search for
 * "is he gaslighting me" and has already decided to find out. It is
 * hopeless for someone who tapped an advert between two videos: they leave
 * at question five, and the ad spend goes with them.
 *
 * So this is a different shape. No scale, no scoring of degree, no
 * progress bar to lose heart against. Sixteen sentences, tap the ones you
 * have heard, done in under a minute. The sentences do the work, because
 * recognising one of them is a more visceral experience than rating your
 * agreement with an abstraction, and because they are the thing a short
 * video can actually show.
 *
 * What it must not do:
 *
 *  - diagnose anybody. It names what a phrase is doing in a conversation,
 *    which is a claim about language, not about a person's psychology;
 *  - dramatise. The phrases are ordinary on purpose. The unsettling part
 *    is how ordinary they are, and inventing lurid ones would both cheapen
 *    it and make it useless to the people it is for;
 *  - carry physical violence as quiz material. Those items exist in the
 *    full manipulation battery, where the context and the safety handling
 *    are built for them. A tap-to-select grid is not that context.
 *
 * Each phrase carries the tactic it belongs to and, where one exists, the
 * long-form page about it, so the result becomes a route into the writing
 * rather than a dead end.
 */

export interface Phrase {
  id: string;
  text: string;
  tactic: TacticKey;
  /** The /signs/ page that explains this one, when there is one. */
  slug?: string;
  /**
   * A marker of coercive control rather than a bad argument. Enough of
   * these together changes what the result is allowed to say.
   */
  control?: boolean;
}

export type TacticKey =
  | "reality"
  | "blame"
  | "withdrawal"
  | "isolation"
  | "conditional"
  | "minimising"
  | "monitoring"
  | "character";

export const TACTICS: Record<TacticKey, { label: string; does: string }> = {
  reality: {
    label: "Rewriting what happened",
    does: "Disputes the event itself, so there is nothing left to discuss. It cannot be settled, because neither of you has a recording.",
  },
  blame: {
    label: "Turning it back on you",
    does: "Moves the subject from what he did to how you reacted. You end up defending your character and the original thing never gets answered.",
  },
  withdrawal: {
    label: "Leaving the room",
    does: "Ends the conversation without ending the disagreement. The discomfort of not knowing does the work that an argument would have done.",
  },
  isolation: {
    label: "Thinning out your circle",
    does: "Makes the people who would notice into a problem. It rarely arrives as a ban, it arrives as a mood whenever you see them.",
  },
  conditional: {
    label: "Putting the relationship on the table",
    does: "Attaches the whole relationship to a small disagreement, so the cost of holding your position is losing everything.",
  },
  minimising: {
    label: "Shrinking it",
    does: "Reclassifies what happened as something too small to have minded, which makes minding it the fault.",
  },
  monitoring: {
    label: "Checking up",
    does: "Treats your ordinary movements as something requiring explanation. Being asked to account for yourself is not the same as being missed.",
  },
  character: {
    label: "Making you the problem",
    does: "Explains the disagreement by way of something wrong with you. Once that is established, nothing specific has to be addressed again.",
  },
};

export const PHRASES: Phrase[] = [
  { id: "p1", text: "That never happened.", tactic: "reality", slug: "he-says-it-never-happened" },
  { id: "p2", text: "You're remembering it wrong.", tactic: "reality", slug: "he-says-it-never-happened" },
  { id: "p3", text: "I never said that.", tactic: "reality", slug: "he-twists-my-words" },
  { id: "p4", text: "You're too sensitive.", tactic: "blame", slug: "he-says-im-too-sensitive" },
  { id: "p5", text: "You're overreacting.", tactic: "blame", slug: "he-says-im-too-sensitive" },
  { id: "p6", text: "Why do you turn everything into a fight?", tactic: "blame", slug: "i-always-end-up-apologizing" },
  { id: "p7", text: "After everything I've done for you.", tactic: "blame", slug: "i-always-end-up-apologizing" },
  { id: "p8", text: "Nothing's wrong. I'm fine.", tactic: "withdrawal", slug: "he-feels-distant-but-says-nothing-is-wrong" },
  { id: "p9", text: "I don't want to talk about it.", tactic: "withdrawal", slug: "he-gives-me-the-silent-treatment" },
  { id: "p10", text: "Your friends don't like me.", tactic: "isolation", control: true },
  { id: "p11", text: "You always take their side.", tactic: "isolation", control: true },
  { id: "p12", text: "Fine, maybe we should just end it then.", tactic: "conditional", control: true },
  { id: "p13", text: "I can't keep doing this.", tactic: "conditional" },
  { id: "p14", text: "It was a joke. Relax.", tactic: "minimising" },
  { id: "p15", text: "Why did it take you so long to reply?", tactic: "monitoring", slug: "he-accused-me-of-cheating", control: true },
  { id: "p16", text: "You're crazy.", tactic: "character", slug: "i-feel-crazy-around-him" },
];

export interface PhraseResult {
  chosen: Phrase[];
  count: number;
  /** Tactics present, most-used first. */
  tactics: { key: TacticKey; label: string; does: string; count: number }[];
  band: "none" | "few" | "pattern" | "system";
  headline: string;
  verdict: string;
  /** Set when enough coercive-control markers are present to say so. */
  support: string | null;
}

export function scorePhrases(selected: string[]): PhraseResult {
  const chosen = PHRASES.filter((p) => selected.includes(p.id));
  const count = chosen.length;

  const tally = new Map<TacticKey, number>();
  for (const p of chosen) tally.set(p.tactic, (tally.get(p.tactic) ?? 0) + 1);
  const tactics = [...tally.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([key, n]) => ({ key, label: TACTICS[key].label, does: TACTICS[key].does, count: n }));

  const controls = chosen.filter((p) => p.control).length;

  // Bands describe how much of the grid was recognised, and nothing more.
  // "You have heard eleven of these" is a fact. What it means about a
  // relationship is not something sixteen taps can establish, and the
  // copy here is careful never to claim otherwise.
  let band: PhraseResult["band"] = "none";
  if (count >= 8) band = "system";
  else if (count >= 4) band = "pattern";
  else if (count >= 1) band = "few";

  const headline = {
    none: "You did not recognise any of them.",
    few: `You have heard ${count} of these.`,
    pattern: `You have heard ${count} of the 16.`,
    system: `You have heard ${count} of the 16.`,
  }[band];

  const verdict = {
    none: "That is worth knowing too. Whatever is bothering you, it is not this, and you can stop looking here. Most of what people call gaslighting is ordinary bad communication, which is painful in a completely different way and has completely different answers.",
    few: "One or two of these is a bad week, not a pattern. Every couple argues badly sometimes, and a sentence said once in a temper is not a tactic. What matters is whether it comes back, and whether the original subject ever gets answered once it does.",
    pattern: "That is past the point where any of them can be read on its own. Individually each is arguable, which is exactly why they work: there is never a single incident big enough to point at, and the effect accumulates anyway.",
    system: "These are not separate habits. Recognising this many means the same conversation is being ended the same way each time, and the subject is never the thing you raised. That is the part worth naming, and the part that does not resolve itself.",
  }[band];

  const support =
    controls >= 2
      ? "Some of what you picked is about access rather than argument: who you see, and having to account for your time. That is worth talking through with someone who is not in the relationship. If you are in the UK, Refuge runs a free 24-hour line on 0808 2000 247."
      : null;

  return { chosen, count, tactics, band, headline, verdict, support };
}

/**
 * RED FLAG OR GREEN FLAG? A swipe game.
 *
 * Swipe a dating moment left for red, right for green, and get the verdict
 * with the reason straight away. It plays like a game and teaches the one
 * skill every other test on the site is really about: telling a warning
 * sign from ordinary annoyance.
 *
 * The verdicts follow the Red Flag Field Guide, so the game and the guide
 * never disagree. "Beige" cards (annoying, not dangerous) count as green,
 * with a note, because the point is that they are not warning signs.
 */

export interface FlagCard {
  id: string;
  text: string;
  flag: "red" | "green";
  beige?: boolean;
  why: string;
}

export const FLAG_CARDS: FlagCard[] = [
  { id: "g1", text: "He asks how your day was, and remembers the answer the next day", flag: "green", why: "Remembering what matters to you is what caring looks like in practice." },
  { id: "g2", text: "He says \"I've never felt like this before\" on the second date", flag: "red", why: "Huge intensity before he knows you is a classic sign of love bombing. Real interest survives going slowly." },
  { id: "g3", text: "He's rude to the waiter but sweet to you", flag: "red", why: "How he treats people who can do nothing for him is how he'll treat you once you're one of them." },
  { id: "g4", text: "He takes three hours to reply, but always replies properly", flag: "green", beige: true, why: "Beige flag: a slow texter is annoying, not dangerous. Consistency matters more than speed." },
  { id: "g5", text: "He sulks every time you see your friends", flag: "red", why: "Making your friends feel like a betrayal is how a circle gets quietly smaller." },
  { id: "g6", text: "You cancel because you're exhausted. He says \"no worries, rest up\"", flag: "green", why: "He handled a small no well. That's the best preview there is of how he'll handle a big one." },
  { id: "g7", text: "He wants you to share locations after two weeks", flag: "red", why: "Tracking this early is about access, not closeness. Being missed is different from being monitored." },
  { id: "g8", text: "He apologises without adding \"but you...\"", flag: "green", why: "A clean apology takes responsibility. \"Sorry, but\" usually hands the blame back." },
  { id: "g9", text: "He puts pineapple on pizza", flag: "green", beige: true, why: "Beige flag. Questionable taste is not a character flaw. Probably." },
  { id: "g10", text: "Every one of his exes is \"crazy\"", flag: "red", why: "If every story ends with someone else being the problem, you'll eventually be the next story." },
  { id: "g11", text: "He introduces you to his friends after a couple of months", flag: "green", why: "Bringing you into his world is a sign he's planning to keep you in it." },
  { id: "g12", text: "He jokes about your weight, then says \"relax, it's a joke\"", flag: "red", why: "A \"joke\" that only ever hurts you, with minding it made your fault, isn't a joke." },
  { id: "g13", text: "He says when he needs space, and tells you when he'll be back", flag: "green", why: "Needing space is normal. Naming a return time is what makes it safe for both of you." },
  { id: "g14", text: "He goes through your phone \"just to check\"", flag: "red", why: "Checking your phone is control dressed up as worry. Trust gets built, not searched for." },
  { id: "g15", text: "He's really close to his mum", flag: "green", beige: true, why: "Beige, leaning green. It's only a problem if he can never put the relationship first." },
  { id: "g16", text: "After a fight he goes silent for days, then acts like nothing happened", flag: "red", why: "Silence as punishment, then pretending it didn't happen, means nothing ever gets resolved." },
];

export interface FlagRank {
  min: number;
  emoji: string;
  title: string;
  line: string;
}

/** Highest first. Out of 16. */
export const FLAG_RANKS: FlagRank[] = [
  { min: 15, emoji: "🕵️‍♀️", title: "Red Flag Detective", line: "Nothing gets past you. Your radar is elite." },
  { min: 12, emoji: "🚨", title: "Sharp Radar", line: "You spot most of them. A couple still slip through the charm." },
  { min: 8, emoji: "🙈", title: "Rose-Tinted Glasses", line: "You give people the benefit of the doubt, sometimes a bit too much." },
  { min: 0, emoji: "💘", title: "Hopeless Romantic", line: "You see the best in everyone. Lovely, and exactly what red flags count on." },
];

export function rankFor(score: number) {
  return FLAG_RANKS.find((r) => score >= r.min)!;
}

/**
 * FLAG RUNNER: a lane runner where the gates are dating moments.
 *
 * Two gates come down the road, one green flag and one red. Steer into a
 * gate and its hidden effect hits your army of hearts: green flags grow
 * it, red flags shrink it. The effects are only revealed after you pass,
 * so the only way to win is to actually spot the flag. At the end of each
 * level a boss needs more hearts than it has to be beaten.
 *
 * Every gate carries a one-line reason, shown as you pass and again in
 * the level summary, which is where the learning happens. Verdicts follow
 * the Red Flag Field Guide and the swipe game, so nothing on the site
 * contradicts anything else.
 *
 * Gate text is kept to a few words so it can be read at a glance on the
 * move. Adding a level is just adding an entry to LEVELS: six pairs, a boss,
 * and the guides and test it leads to.
 */

export interface RunnerGate {
  text: string;
  why: string;
}

export interface RunnerPair {
  green: RunnerGate;
  red: RunnerGate;
}

export interface RunnerLevel {
  id: string;
  name: string;
  emoji: string;
  bg: string;
  boss: { name: string; emoji: string };
  pairs: RunnerPair[];
  /** Guide slugs shown after the level. */
  guides: string[];
  /** The quick test for "now check your own". */
  test: { href: string; label: string };
  /** A support line shown in the summary, for levels that touch on harm. */
  support?: string;
}

const P = (g: string, gw: string, r: string, rw: string): RunnerPair => ({ green: { text: g, why: gw }, red: { text: r, why: rw } });

export const LEVELS: RunnerLevel[] = [
  {
    id: "the-apps",
    name: "The apps",
    emoji: "📲",
    bg: "#FFD1E8",
    boss: { name: "The Catfish", emoji: "🎣" },
    pairs: [
      P("Bio: actual hobbies", "Effort in the bio means effort in real life.", "Bio: \"just ask\"", "Zero effort now, zero effort later."),
      P("Asks you out in a week", "Keen people make plans, not pen pals.", "Three weeks of chat, no date", "Endless texting is a hobby, not interest."),
      P("Opens with a real question", "Curious about your mind is the good stuff.", "Opens with your body", "Leading with your body says what he's here for."),
      P("Recent pics, no filter", "Honest photos, honest man. Usually.", "Every pic is from 2017", "If the photos lie, what else does?"),
      P("Happy to video call", "Wanting to see the real you is a good sign.", "Never, ever video calls", "The classic catfish move."),
      P("Deletes the app for you", "Closing the apps is choosing you.", "Still swiping after \"exclusive\"", "Exclusive means the apps are closed."),
    ],
    guides: ["what-are-we", "hot-and-cold"],
    test: { href: "/is-he-just-not-that-into-you", label: "The Mixed Signals Receipt" },
  },
  {
    id: "situationship",
    name: "Situationship",
    emoji: "😶",
    bg: "#C9B6FF",
    boss: { name: "The Breadcrumber", emoji: "🍞" },
    pairs: [
      P("\"Be my girlfriend?\"", "Saying it out loud is the whole green flag.", "\"What are we?\" \"Vibes\"", "Vibes aren't an answer."),
      P("Saturday night plans", "Weekends are for people who matter.", "Only free on Tuesdays", "Weekday-only means you're scheduled around someone."),
      P("Posts you on his story", "Proud to be seen with you.", "Hides you from his story", "Hiding you is a choice he makes daily."),
      P("Daylight brunch dates", "Daytime dates mean he's not hiding you.", "Only comes over after midnight", "After-midnight-only is a booty call with feelings."),
      P("Calls you \"babe\" and means it", "Pet names plus commitment: lovely.", "\"Babe\" but won't commit", "Pet names without commitment are just perks for him."),
      P("Honest that he's dating others", "Honesty lets you choose with open eyes.", "Jealous, but won't commit", "Wanting you without choosing you."),
    ],
    guides: ["what-are-we", "hot-and-cold"],
    test: { href: "/is-it-a-situationship", label: "Situationship Bingo" },
  },
  {
    id: "sleepover",
    name: "The sleepover",
    emoji: "🛌",
    bg: "#FFC9A8",
    boss: { name: "The Player", emoji: "🎰" },
    support: "If anyone has pushed you after a no, that is never on you. In England and Wales, the Rape Crisis support line is free and open 24/7: 0808 500 2222.",
    pairs: [
      P("Asks what you're into", "Checking in is sexy, actually.", "Pushes after you said no", "No is a full sentence. Every single time."),
      P("Stays for breakfast", "Morning effort says it wasn't just the night.", "Books your Uber at 3am", "Shown the door before sunrise is a message."),
      P("Brings condoms, no fuss", "Looking after both of you is hot.", "\"Trust me, I'm clean\"", "Your health isn't a trust exercise."),
      P("Texts you the next day", "Following up means it meant something.", "Ghosts after night one", "If it ends at sex, sex was the plan."),
      P("Cuddles after", "Affection outside sex is the real tell.", "Straight onto his phone", "Instant disconnection stings for a reason."),
      P("Happy to wait", "Patience is attraction, not a sacrifice.", "Counts the dates \"owed\"", "Dinner doesn't buy anything."),
    ],
    guides: ["red-flag-field-guide", "what-are-we"],
    test: { href: "/first-month-red-flags", label: "Red Flag Bingo" },
  },
  {
    id: "his-phone",
    name: "His phone",
    emoji: "📱",
    bg: "#BDE3FF",
    boss: { name: "The Cheater", emoji: "💋" },
    pairs: [
      P("Shows you the group chat", "Nothing to hide looks exactly like this.", "Snap streak with his \"cousin\"", "Some cousins need explaining."),
      P("One phone, no drama", "Boring phone, happy girlfriend.", "Has a second phone", "A second phone has one job."),
      P("Likes your posts", "Small public support counts.", "Likes every thirst trap", "Public thirst is a choice he makes daily."),
      P("Answers when you call", "Reachable is reliable.", "Always on Do Not Disturb", "DND around you isn't about focus."),
      P("Ex is blocked", "Closed doors make room for you.", "First to watch her stories", "Some doors are still very open."),
      P("Tells you who Sarah is", "Context before you ask is respect.", "\"Sarah\" saved as \"Steve\"", "A fake contact name is a confession."),
    ],
    guides: ["last-seen-spiral", "pattern-or-overthinking"],
    test: { href: "/things-he-does", label: "The Receipts" },
  },
  {
    id: "the-ex",
    name: "The ex files",
    emoji: "💔",
    bg: "#FFE68A",
    boss: { name: "The Ex", emoji: "👻" },
    pairs: [
      P("Ended it like an adult", "Mature endings predict mature partners.", "Still sleeps in her hoodie", "Keepsakes in bed are still in bed."),
      P("Ex is just a name", "Past tense, as it should be.", "Compares you to her", "You're not a sequel."),
      P("Single a year before you", "Healed people date better.", "Dated you two weeks after her", "Rebounds rarely know they're rebounds."),
      P("Tells you when she texts", "Transparency kills the drama.", "Meets her \"for closure\" again", "Closure doesn't need repeat visits."),
      P("Owns his part in the break-up", "Owning his part is maturity.", "\"She ruined my life\"", "A big villain story hides his part."),
      P("Unfollowed and moved on", "Moved on looks like this.", "Drunk-texts her on your night out", "Drunk texts tend to be sober feelings."),
    ],
    guides: ["hot-and-cold", "pattern-or-overthinking"],
    test: { href: "/him-vs-your-ex", label: "Him vs your ex" },
  },
  {
    id: "girls-night",
    name: "Girls' night",
    emoji: "🍸",
    bg: "#B8F2D8",
    boss: { name: "The Pick-Me", emoji: "💅" },
    pairs: [
      P("Hypes your outfit", "Hype before a night out is love.", "\"You're wearing THAT?\"", "Knocking your look before you go out is a power move."),
      P("Holds your hair, no judging", "Real ones show up at the messiest moment.", "Films you crying for her story", "Content over friend is a red flag."),
      P("Shares her location home", "Getting each other home is the whole night.", "Leaves with a guy, no text", "Rule one: nobody gets left behind."),
      P("Wingwoman for your crush", "Helping you shoot your shot is loyalty.", "Flirts with your crush", "That's not a wingwoman. That's competition."),
      P("Splits the bill fairly", "Fair with money, fair with you.", "Orders lobster, splits evenly", "Small, but it says a lot."),
      P("Same girl, boys or no boys", "Being herself everywhere is a green flag.", "Different girl when men arrive", "Switching personality for boys is a pick-me tell."),
    ],
    guides: ["frenemy-files", "therapist-friend"],
    test: { href: "/is-my-friend-a-pick-me", label: "Pick-Me Bingo" },
  },
  {
    id: "holiday",
    name: "Holiday together",
    emoji: "✈️",
    bg: "#D9F99D",
    boss: { name: "The Man-Child", emoji: "🍼" },
    pairs: [
      P("Books half the trip", "Sharing the planning is sharing the load.", "\"You sort it, babe\"", "Being his travel agent isn't romance."),
      P("Packs his own bag", "A grown man with a grown suitcase.", "Forgets his passport, blames you", "Blaming you at the airport is a preview."),
      P("Plans one surprise", "A little effort abroad goes a long way.", "Sulks when you're tired", "Your tiredness isn't an attack on him."),
      P("Takes your photos, properly", "The Instagram boyfriend is a green flag.", "Checks out every bikini", "Wandering eyes on holiday still wander."),
      P("Shares the last churro", "Generosity in small things matters.", "Counts who paid for what", "Splitting every euro kills the romance."),
      P("\"Let's go again\"", "Wanting more time with you is the point.", "\"Never travelling with you again\"", "Threats after a fight are punishment."),
    ],
    guides: ["clueless-or-careless", "red-flag-field-guide"],
    test: { href: "/is-my-boyfriend-stupid", label: "His Receipt" },
  },
  {
    id: "the-parents",
    name: "Meet the parents",
    emoji: "🏡",
    bg: "#FFB3C7",
    boss: { name: "The Monster-in-Law", emoji: "👹" },
    pairs: [
      P("Briefs you on family drama", "Prepping you is teamwork.", "Lets his mum grill you", "Not stepping in is choosing a side."),
      P("Holds your hand at dinner", "Showing up for you in his territory.", "Ignores you all night", "Vanishing at his family's table hurts for a reason."),
      P("\"She's the one, Mum\"", "Choosing you out loud is everything.", "Introduces you as \"a friend\"", "A friend? After six months?"),
      P("Leaves when it gets nasty", "Protecting you beats keeping the peace.", "\"Just keep the peace\"", "Your comfort isn't the price of peace."),
      P("Visits your family too", "Fair is fair.", "Every holiday at his mum's", "Your family matters too."),
      P("Defends your job at dinner", "Backing you in public is love.", "Laughs when they mock you", "Laughing along is picking a side."),
    ],
    guides: ["clueless-or-careless", "red-flag-field-guide"],
    test: { href: "/is-he-a-mamas-boy", label: "The Mummy Receipt" },
  },
];

/** What each pair does to the army: green and red effects per position. */
export const GREEN_OPS = ["+10", "x2", "+15", "x2", "+20", "x2"];
export const RED_OPS = ["-5", "÷2", "-10", "÷2", "-15", "÷2"];
export const START_HEARTS = 10;

export function applyOp(n: number, op: string) {
  const v = parseInt(op.slice(1), 10);
  if (op[0] === "+") return n + v;
  if (op[0] === "-") return Math.max(0, n - v);
  if (op[0] === "x") return n * v;
  return Math.floor(n / v);
}

/** The most hearts a perfect run can reach. */
export function perfectHearts() {
  return GREEN_OPS.reduce((n, op) => applyOp(n, op), START_HEARTS);
}

/** Bosses get tougher level by level: level 1 forgives one big mistake, level 6 barely any. */
export function bossPower(levelIndex: number) {
  return Math.round(perfectHearts() * (0.22 + levelIndex * 0.07));
}

export function starsFor(hearts: number) {
  const max = perfectHearts();
  if (hearts >= max * 0.9) return 3;
  if (hearts >= max * 0.6) return 2;
  return 1;
}

/** Seconds for a gate pair to reach you. Faster each level. */
export function travelSeconds(levelIndex: number) {
  return Math.max(2.6, 3.6 - levelIndex * 0.13);
}

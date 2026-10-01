/**
 * FLAG RUNNER: she runs down the road, two gates come at her, one green
 * flag and one red. A heart above her head fills with every green flag;
 * every red flag adds to her ick. Between the gates there are obstacles
 * to dodge (they add ick too) and roses to grab (they take one away).
 * Every green flag and no ick is love; one ick is a talking stage, two a
 * situationship, and three means the boss wins and they break up.
 *
 * Gate text is a few words, readable at a glance on the move, and none of
 * it repeats the other games and tests. Some pairs are marked hard: both
 * gates sound fine, and only one is.
 *
 * Every gate carries a one-line reason, shown as she passes and again in
 * the level summary, which is where the learning happens.
 *
 * Adding a level is adding an entry to LEVELS: six pairs, a boss, and the
 * guides and test it leads to.
 */

export interface RunnerGate {
  text: string;
  why: string;
}

export interface RunnerPair {
  green: RunnerGate;
  red: RunnerGate;
  /** Both sound fine. Shown with a "hard" badge. */
  hard?: boolean;
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
  /** A support line in the summary, for levels that touch on harm. */
  support?: string;
}

const P = (g: string, gw: string, r: string, rw: string, hard = false): RunnerPair => ({
  green: { text: g, why: gw },
  red: { text: r, why: rw },
  hard,
});
const H = (g: string, gw: string, r: string, rw: string) => P(g, gw, r, rw, true);

const REFUGE = "If any of these red flags is happening to you, you deserve support. In the UK, Refuge's free helpline is 0808 2000 247, day or night.";

export const LEVELS: RunnerLevel[] = [
  {
    id: "the-apps",
    name: "The apps",
    emoji: "📲",
    bg: "#FFD1E8",
    boss: { name: "The Catfish", emoji: "🎣" },
    pairs: [
      P("Asks you out in a week", "Keen people make plans, not pen pals.", "Three weeks of chat, no date", "Endless texting is a hobby, not interest."),
      P("Opens with a real question", "Curious about your mind is the good stuff.", "Opens with your body", "Leading with your body says what he's here for."),
      H("Slow replies, real questions", "Real questions mean real interest, even if they're slow.", "Instant replies, all compliments", "Instant flattery is often a script."),
      P("Recent pics, no filter", "Honest photos, honest man. Usually.", "Every pic is from 2017", "If the photos lie, what else does?"),
      P("Happy to video call", "Wanting to see the real you is a good sign.", "Never, ever video calls", "The classic catfish move."),
      P("Deletes the app for you", "Closing the apps is choosing you.", "Still swiping after \"exclusive\"", "Exclusive means the apps are closed."),
    ],
    guides: ["what-are-we", "hot-and-cold"],
    test: { href: "/is-he-just-not-that-into-you", label: "The Mixed Signals Receipt" },
  },
  {
    id: "first-dates",
    name: "First dates",
    emoji: "🌹",
    bg: "#FFB3C7",
    boss: { name: "The Ick", emoji: "🤢" },
    pairs: [
      P("Turns up on time", "Respecting your time is the first test.", "45 minutes late, no text", "Late with no text says you're optional."),
      P("Phone stays in his pocket", "Full attention is the bare minimum. And hot.", "Checks his phone mid-sentence", "Divided attention on date one rarely improves."),
      H("\"Can I see you again?\"", "Calm and clear interest is the real thing.", "Plans your wedding on date one", "Fast-forwarding to forever is a love-bombing tell."),
      P("Asks before kissing you", "Asking is sexy. Always.", "Leans in after you pulled back", "Ignoring your body language is a big red flag."),
      P("Pays or splits, no fuss", "Money without drama is grown-up.", "Pays, then hints you owe him", "Generosity with strings isn't generosity."),
      H("Mentions his therapist", "Working on himself is a green flag, not baggage.", "Trauma-dumps on date one", "Pouring it all out on date one rushes intimacy."),
    ],
    guides: ["red-flag-field-guide", "hot-and-cold"],
    test: { href: "/first-month-red-flags", label: "Red Flag Bingo" },
  },
  {
    id: "texting",
    name: "Texting",
    emoji: "💬",
    bg: "#BDE3FF",
    boss: { name: "Left on Read", emoji: "👻" },
    pairs: [
      H("Good morning texts", "A daily hello is sweet and easy.", "\"Where are you?\" every hour", "Constant check-ins can be control in a cute font."),
      P("Voice notes about his day", "Letting you into his day is intimacy.", "Only replies with memes", "Memes instead of words keeps you at arm's length."),
      P("Asks before calling", "Asking first respects your time.", "Ten missed calls in a row", "Ten missed calls is pressure, not love."),
      P("Replies to what you said", "Actually reading your texts is the bar.", "Answers everything with \"lol\"", "Dodging with lol avoids every real question."),
      H("Slow replies, makes plans", "Slow but follows through beats fast and flaky.", "Instant replies, never makes plans", "Fast texting without dates is entertainment."),
      P("Sends you a song", "Thinking of you is the whole point.", "Posts stories, ignores you", "Online for everyone except you."),
    ],
    guides: ["last-seen-spiral", "pattern-or-overthinking"],
    test: { href: "/decode-his-text", label: "Decode his text" },
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
      P("Calls you \"babe\" and means it", "Pet names plus commitment: lovely.", "\"Babe\" but won't commit", "Pet names without commitment are perks for him."),
      H("Honest that he's dating others", "Honesty lets you choose with open eyes.", "Jealous, but won't commit", "Wanting you without choosing you."),
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
      H("\"I'm not ready for more yet\"", "Honest pacing is a green flag, even if it stings.", "Promises the world, then vanishes", "Promises to get you into bed aren't promises."),
      P("Brings condoms, no fuss", "Looking after both of you is hot.", "\"Trust me, I'm clean\"", "Your health isn't a trust exercise."),
      P("Texts you the next day", "Following up means it meant something.", "Ghosts after night one", "If it ends at sex, sex was the plan."),
      P("Cuddles after", "Affection outside sex is the real tell.", "Straight onto his phone", "Instant disconnection stings for a reason."),
      P("Happy to wait", "Patience is attraction, not a sacrifice.", "Counts the dates \"owed\"", "Dinner doesn't buy anything."),
    ],
    guides: ["red-flag-field-guide", "what-are-we"],
    test: { href: "/first-month-red-flags", label: "Red Flag Bingo" },
  },
  {
    id: "his-world",
    name: "Meeting his world",
    emoji: "🍻",
    bg: "#FFE68A",
    boss: { name: "The Mama's Boy", emoji: "🍼" },
    pairs: [
      P("His mates know your name", "You've been talked about, in a good way.", "His mates call you \"this one\"", "You've been filed as temporary."),
      P("Mum visits, by invitation", "Close family with boundaries is ideal.", "Mum has a key to your flat", "Boundaries need a door that locks."),
      H("Calls his mum on Sundays", "Loving his mum is a green flag.", "Calls his mum mid-argument", "Bringing his mum into your fights breaks the team."),
      P("Defends you to his sister", "Backing you in his family is loyalty.", "Lets his sister roast you", "Silence while you're roasted is a choice."),
      P("Takes you to his local", "Showing you his world is letting you in.", "Only meets you far from home", "Keeping you off his turf can mean someone's on it."),
      P("Mum's opinion is just an opinion", "He hears her, then decides himself.", "\"Mum thinks you're wrong for me\"", "Outsourcing his feelings to his mum."),
    ],
    guides: ["clueless-or-careless", "red-flag-field-guide"],
    test: { href: "/is-he-a-mamas-boy", label: "The Mummy Receipt" },
  },
  {
    id: "his-phone",
    name: "His phone",
    emoji: "🔒",
    bg: "#B8E1FF",
    boss: { name: "The Cheater", emoji: "💋" },
    pairs: [
      P("Shows you the group chat", "Nothing to hide looks exactly like this.", "Snap streak with his \"cousin\"", "Some cousins need explaining."),
      P("One phone, no drama", "Boring phone, happy girlfriend.", "Has a second phone", "A second phone has one job."),
      P("Likes your posts", "Small public support counts.", "Likes every thirst trap", "Public thirst is a choice he makes daily."),
      H("Female friends you've met", "Friends you've met are just friends.", "A \"friend\" you can't meet", "If you can't meet her, ask why."),
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
    bg: "#FFE0A3",
    boss: { name: "The Ex", emoji: "🪃" },
    pairs: [
      P("Ended it like an adult", "Mature endings predict mature partners.", "Still sleeps in her hoodie", "Keepsakes in bed are still in bed."),
      P("Ex is just a name", "Past tense, as it should be.", "Compares you to her", "You're not a sequel."),
      P("Single a year before you", "Healed people date better.", "Dated you two weeks after her", "Rebounds rarely know they're rebounds."),
      H("Tells you when she texts", "Transparency kills the drama.", "Meets her \"for closure\" again", "Closure doesn't need repeat visits."),
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
      H("Hard truths, in private", "Honesty in private is loyalty.", "Hard truths, in the group chat", "Same words, wrong audience. Public is for points."),
      P("Same girl, boys or no boys", "Being herself everywhere is a green flag.", "Different girl when men arrive", "Switching personality for boys is a pick-me tell."),
    ],
    guides: ["frenemy-files", "therapist-friend"],
    test: { href: "/is-my-friend-a-pick-me", label: "Pick-Me Bingo" },
  },
  {
    id: "friendships",
    name: "Friendships",
    emoji: "👯",
    bg: "#D9F99D",
    boss: { name: "The Frenemy", emoji: "🐍" },
    pairs: [
      P("Celebrates your engagement", "Joy for you, loudly, is a real friend.", "Announces hers the same day", "Upstaging your big moment is classic frenemy."),
      P("Lends you her best dress", "Generous with you is the good kind.", "Wears your outfit idea first", "Copying, then beating you to it, is rivalry."),
      H("\"I miss you!\" when you're busy", "Missing you is love, not guilt.", "\"Forgot about me then?\" every time", "Guilt for having a life is a leash."),
      P("Likes your new man, says so", "Happy for you, simple as that.", "Likes your new man... a lot", "Too much interest in your man is worth watching."),
      P("Remembers your exam day", "Small remembering is big caring.", "Only texts when she's single", "Gone when she's in love, back when she's sad."),
      P("Asks before sharing your news", "Your news, your timing.", "Posts your news first", "Your news, her content."),
    ],
    guides: ["frenemy-files", "therapist-friend"],
    test: { href: "/friend-vs-friend", label: "Friend vs friend" },
  },
  {
    id: "arguments",
    name: "Arguments",
    emoji: "🗯️",
    bg: "#E9D5FF",
    boss: { name: "The Gaslighter", emoji: "🌀" },
    support: REFUGE,
    pairs: [
      P("\"Let's sleep on it\"", "Pausing beats saying something unforgivable.", "Argues till 4am, every time", "Exhausting you until you give in is a tactic."),
      P("Lowers his voice", "Calm voice, safe room.", "Shouts, then says you're shouting", "Flipping the script is gaslighting 101."),
      H("\"I need a minute\", then comes back", "Space to calm down, then return, is healthy.", "Leaves, phone off, for a day", "Disappearing is punishment, not space."),
      P("Remembers it differently, says so", "Different memories are normal.", "Rewrites what you said, every time", "If you always end up doubting your memory, that's the pattern."),
      H("Sorry, with a plan to change", "Sorry plus a change is the real deal.", "Cries until you comfort him", "Ending up consoling him when he hurt you is a flip."),
      P("Fights the problem, not you", "Same team, shared problem.", "Uses your trauma to win", "Using your wounds as ammo is a hard line."),
    ],
    guides: ["too-sensitive", "red-flag-field-guide"],
    test: { href: "/gaslighting-or-not", label: "Gaslighting or not?" },
  },
  {
    id: "holiday",
    name: "Holiday together",
    emoji: "✈️",
    bg: "#A7F3D0",
    boss: { name: "The Man-Child", emoji: "🎮" },
    pairs: [
      P("Books half the trip", "Sharing the planning is sharing the load.", "\"You sort it, babe\"", "Being his travel agent isn't romance."),
      P("Packs his own bag", "A grown man with a grown suitcase.", "Forgets his passport, blames you", "Blaming you at the airport is a preview."),
      H("Wants a few hours solo", "A little time apart is healthy, even on holiday.", "Vanishes all day, phone off", "Disappearing abroad leaves you stranded."),
      P("Takes your photos, properly", "The Instagram boyfriend is a green flag.", "Checks out every bikini", "Wandering eyes on holiday still wander."),
      P("Shares the last churro", "Generosity in small things matters.", "Counts who paid for what", "Splitting every euro kills the romance."),
      P("\"Let's go again\"", "Wanting more time with you is the point.", "\"Never travelling with you again\"", "Threats after a fight are punishment."),
    ],
    guides: ["clueless-or-careless", "red-flag-field-guide"],
    test: { href: "/is-my-boyfriend-stupid", label: "His Receipt" },
  },
  {
    id: "work",
    name: "His work",
    emoji: "💼",
    bg: "#FDE68A",
    boss: { name: "The Office Flirt", emoji: "😏" },
    pairs: [
      P("Talks about colleagues normally", "Boring work talk is a good sign.", "\"Work wife\" texts at midnight", "Midnight work-wife texts aren't about work."),
      P("Brings you to the Christmas do", "Proud to have you there.", "Partners not invited, again", "Leaving you home every year is a choice."),
      H("Vents, then asks about your day", "Venting both ways is partnership.", "Vents for an hour, never asks", "One-way venting turns you into his therapist."),
      P("Leaves work at work", "Present at home is a green flag.", "Work calls at dinner, every night", "Every night means you're never the priority."),
      P("Celebrates your pay rise", "A partner, not a rival.", "Sulks when you earn more", "Your wins shouldn't cost you his warmth."),
      P("Colleagues know about you", "You exist in his whole life.", "Colleagues think he's single", "Single at work is a story he's telling."),
    ],
    guides: ["red-flag-field-guide", "pattern-or-overthinking"],
    test: { href: "/things-he-does", label: "The Receipts" },
  },
  {
    id: "moving-in",
    name: "Moving in",
    emoji: "🏠",
    bg: "#FFC9A8",
    boss: { name: "The Control Freak", emoji: "⛓️" },
    support: REFUGE,
    pairs: [
      P("Does chores unasked", "Seeing what needs doing is half the work.", "\"Just tell me what to do\"", "Managing him is unpaid work."),
      P("Shares the bills fairly", "Money honesty is trust with numbers.", "Hides what he spends", "Financial secrecy is a trust problem."),
      P("Your stuff on the walls too", "A home should have both of you in it.", "His flat, his rules", "No room for your way, no room for you."),
      H("Location sharing, both ways", "Mutual, agreed sharing can be fine.", "Tracks yours, hides his", "One-way tracking is control."),
      P("Says sorry when he's grumpy", "Owning his moods keeps home safe.", "You tiptoe round his moods", "Feeling scared at home is a serious sign."),
      P("Cooks sometimes", "Sharing the load is the point of living together.", "Expects dinner on the table", "That's a role, not a relationship."),
    ],
    guides: ["red-flag-field-guide", "clueless-or-careless"],
    test: { href: "/is-my-boyfriend-toxic", label: "Toxic Boyfriend Bingo" },
  },
  {
    id: "the-parents",
    name: "Meet the parents",
    emoji: "🏡",
    bg: "#FFD1E8",
    boss: { name: "The Monster-in-Law", emoji: "👹" },
    pairs: [
      P("Briefs you on family drama", "Prepping you is teamwork.", "Lets his mum grill you", "Not stepping in is choosing a side."),
      P("Holds your hand at dinner", "Showing up for you on his turf.", "Ignores you all night", "Vanishing at his family's table hurts for a reason."),
      P("\"She's the one, Mum\"", "Choosing you out loud is everything.", "Introduces you as \"a friend\"", "A friend? After six months?"),
      H("Leaves when it gets nasty", "Protecting you beats keeping the peace.", "\"Just keep the peace\"", "Your comfort isn't the price of peace."),
      P("Visits your family too", "Fair is fair.", "Every holiday at his mum's", "Your family matters too."),
      P("Defends your job at dinner", "Backing you in public is love.", "Laughs when they mock you", "Laughing along is picking a side."),
    ],
    guides: ["clueless-or-careless", "red-flag-field-guide"],
    test: { href: "/is-he-a-mamas-boy", label: "The Mummy Receipt" },
  },
  {
    id: "the-proposal",
    name: "The proposal",
    emoji: "💍",
    bg: "#C9B6FF",
    boss: { name: "Cold Feet", emoji: "🥶" },
    pairs: [
      P("Talks about forever, and plans it", "Planning together is building together.", "\"Maybe in five years\", for five years", "A deadline that keeps moving is a no in disguise."),
      P("Sneakily asks your ring size", "Effort and a little mystery. Perfect.", "Mocks you for wanting a ring", "Mocking what you want is dismissing you."),
      H("Waits till money's sorted", "Waiting for a reason, with a plan, is responsible.", "Waits for a \"sign\" that never comes", "Waiting with no plan is stalling."),
      H("Proposes privately, you're shy", "Proposing your way, not his, is love.", "Big public stunt you'd hate", "A proposal for his audience, not for you."),
      P("Proposes when things are good", "A ring should mark a good place, not patch a bad one.", "Proposes to end a fight", "A ring as a plaster rarely sticks."),
      P("Up for pre-wedding counselling", "Investing in you two before the big day.", "\"We don't need help, we're fine\"", "Refusing any work now predicts later."),
    ],
    guides: ["what-are-we", "clueless-or-careless"],
    test: { href: "/when-it-gets-serious", label: "Self-Sabotage Tier List" },
  },
];

/** Three icks and it's over. */
export const ICK_LIMIT = 3;

export type Ending = "love" | "talking" | "situationship" | "breakup";

/**
 * How the level ends. Ick comes from red flag gates and obstacles she runs
 * into; a rose she catches takes one away. True love needs every green
 * flag and no ick left at the end.
 */
export function endingFor(greens: number, ick: number, total: number): Ending {
  if (ick >= ICK_LIMIT) return "breakup";
  if (greens === total && ick === 0) return "love";
  if (ick <= 1) return "talking";
  return "situationship";
}

/** Things on the road between the gates: dodge the obstacles, grab the roses. */
export interface RoadThing {
  emoji: string;
  name: string;
  rose?: boolean;
}

export const OBSTACLES: RoadThing[] = [
  { emoji: "🧳", name: "Emotional baggage" },
  { emoji: "💣", name: "Love bomb" },
  { emoji: "🧱", name: "Trust issues" },
  { emoji: "🚧", name: "Mixed signals" },
  { emoji: "🕳️", name: "Overthinking hole" },
  { emoji: "🍷", name: "His ex at the bar" },
  { emoji: "📵", name: "Left on read" },
  { emoji: "🧨", name: "Drama" },
  { emoji: "🪤", name: "Breadcrumb trap" },
  { emoji: "🌵", name: "Prickly mood" },
];

export const ROSES: RoadThing[] = [
  { emoji: "🌹", name: "A sweet gesture", rose: true },
  { emoji: "💌", name: "A love letter", rose: true },
  { emoji: "🍫", name: "Surprise chocolate", rose: true },
];

export const ENDINGS: Record<Ending, { emoji: string; title: string; line: string; stars: number }> = {
  love: { emoji: "💘", title: "It's love!", line: "Every green flag, no ick. He's a keeper (and so are you).", stars: 3 },
  talking: { emoji: "💕", title: "Talking stage", line: "So close. One ick slipped through, but the heart's nearly there.", stars: 2 },
  situationship: { emoji: "😶", title: "Stuck in a situationship", line: "Not quite love, not quite over. Two icks got to you.", stars: 1 },
  breakup: { emoji: "💔", title: "You broke up", line: "Three icks and it's over. It happens. Run it back.", stars: 0 },
};

/** Seconds for a gate pair to reach her. Faster as the levels go on. */
export function travelSeconds(levelIndex: number) {
  return Math.max(2.5, 3.6 - levelIndex * 0.08);
}

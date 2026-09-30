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
 * Adding a level is just adding an entry to LEVELS: eight pairs, a boss,
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
  /** Shows a support line in the summary. */
  support?: boolean;
}

const P = (g: string, gw: string, r: string, rw: string): RunnerPair => ({ green: { text: g, why: gw }, red: { text: r, why: rw } });

export const LEVELS: RunnerLevel[] = [
  {
    id: "first-dates",
    name: "First dates",
    emoji: "🌹",
    bg: "#FFD1E8",
    boss: { name: "The Ick", emoji: "🤢" },
    pairs: [
      P("He asks about you and listens to the answers", "Real curiosity about you is the first green flag.", "He talks about himself for two hours straight", "A date is a conversation, not an audience."),
      P("He's lovely to the waiter", "How he treats people who can't do anything for him is the real him.", "He's rude to the waiter", "How he treats staff is how he'll treat you once the shine wears off."),
      P("He suggests a second date with a day and time", "Specific plans mean real interest.", "\"We should do this again sometime\"", "Vague plans keep you as an option."),
      P("He's fine when you say you're not drinking", "Respecting a small no predicts respecting a big one.", "He pushes you to have \"just one more\"", "Pushing past a small no predicts pushing past bigger ones."),
      P("He texts to check you got home safe", "Small care, big signal.", "He's texting someone under the table", "Divided attention on date one rarely gets better."),
      P("He talks about his ex with respect", "Respect for past partners predicts respect for you.", "Every one of his exes is \"crazy\"", "If every story has a villain, you'll be the next one."),
      P("He's happy to take things slowly", "Real interest survives going slowly.", "\"I think I love you\" on date two", "Instant intensity is a classic love-bombing sign."),
      P("He laughs at himself", "Not taking himself too seriously is gold.", "He sulks when you beat him at pool", "A fragile ego gets louder over time, not quieter."),
    ],
    guides: ["red-flag-field-guide", "hot-and-cold"],
    test: { href: "/first-month-red-flags", label: "Red Flag Bingo: your first month" },
  },
  {
    id: "texting",
    name: "Texting",
    emoji: "📱",
    bg: "#BDE3FF",
    boss: { name: "Left on Read", emoji: "👻" },
    pairs: [
      P("He replies slowly, but always properly", "Slow and consistent beats fast and flaky. That's a beige flag at worst.", "He's online for hours but ignores you for days", "Available to everyone except you is its own message."),
      P("He asks how your big day went", "Remembering what matters to you is caring in practice.", "He only ever texts after 11pm", "Late-night-only texting is about convenience."),
      P("\"Busy today, I'll call you tonight\" and he does", "Saying it and doing it is the whole game.", "He vanishes, then comes back with \"hey stranger\"", "Breadcrumbing keeps you hooked with minimum effort."),
      P("He's fine when you don't reply for a few hours", "Trust means your silence isn't a threat.", "\"Why are you ignoring me??\" after 20 minutes", "Panic over your silence can turn into control."),
      P("He sends a meme that made him think of you", "Thinking of you when you're not there is the point.", "He only texts when he wants something", "Contact that only flows one way isn't connection."),
      P("He says sorry when he forgets to reply", "Owning small things is a big green flag.", "He asks who you're texting, every time", "Monitoring isn't love. It's surveillance."),
      P("He makes plans over text and sticks to them", "Consistency is the most underrated green flag.", "He cancels by text ten minutes before, again", "Last-minute cancels, often, show where you rank."),
      P("He's the same person every week", "Steady can feel boring at first. It's what safe feels like.", "Hot one week, ice cold the next", "Unpredictable warmth is exactly what makes it addictive."),
    ],
    guides: ["last-seen-spiral", "hot-and-cold", "pattern-or-overthinking"],
    test: { href: "/decode-his-text", label: "Decode his text" },
  },
  {
    id: "his-world",
    name: "Meeting his world",
    emoji: "🍻",
    bg: "#FFE68A",
    boss: { name: "The Mama's Boy", emoji: "🍼" },
    pairs: [
      P("He introduces you to his friends", "Bringing you into his world means he plans to keep you in it.", "He keeps you a secret from everyone", "Hidden relationships usually have a reason."),
      P("He's the same with you around his mates", "Consistency in public is respect.", "He's cold to you in front of his friends", "If he's different in public, believe the public version."),
      P("He's close to his family, and it's healthy", "Close to his mum is fine. It's about who comes first in your relationship.", "His mum decides your weekend plans", "Someone who can't say no to his mum can't fully choose you."),
      P("He's happy you have your own friends", "A partner who wants you to have a life is a keeper.", "He sulks every time you see your friends", "Isolation often starts as sulking."),
      P("He backs you up when a friend makes a dig", "Defending you when you're outnumbered is loyalty.", "He laughs along when his friends mock you", "Laughing along is picking a side."),
      P("He invites you to his work do", "Being proud to be seen with you is a green flag.", "He hides his phone when you walk in", "Phone secrecy rarely means a surprise party."),
      P("His ex is just an ex", "Closed doors make room for you.", "He still texts his ex every night", "Some doors he's keeping open."),
      P("He remembers your friends' names", "Caring about your people is caring about you.", "He calls your best friend \"a bad influence\"", "Discrediting your people is how isolation starts."),
    ],
    guides: ["red-flag-field-guide", "clueless-or-careless", "what-are-we"],
    test: { href: "/is-he-a-mamas-boy", label: "The Mummy Receipt" },
  },
  {
    id: "arguments",
    name: "Arguments",
    emoji: "🗯️",
    bg: "#C9B6FF",
    boss: { name: "The Gaslighter", emoji: "🌀" },
    support: true,
    pairs: [
      P("\"I'm upset. Can we talk later tonight?\"", "Pausing to calm down, with a time to come back, is healthy.", "Three days of the silent treatment", "Silence as punishment is control."),
      P("He apologises without a \"but\"", "A clean apology takes responsibility.", "\"Sorry you feel that way\"", "A non-apology blames your feelings, not his actions."),
      P("He listens, then gives his side", "Taking turns is how fights end well.", "\"You're way too sensitive\"", "Dismissing your feelings ends the conversation, not the problem."),
      P("\"You're right, I got that wrong\"", "Admitting fault is strength, not weakness.", "\"That never happened\" (it did)", "Denying reality is the heart of gaslighting."),
      P("He sticks to what the fight is about", "One issue at a time actually gets solved.", "He brings up everything you did since 2021", "Throwing in everything buries the real issue."),
      P("He goes for a walk to cool off", "Taking space to calm down protects both of you.", "He punches the wall", "Anger aimed at objects near you is a serious warning sign."),
      P("\"How can we fix this?\"", "Teaming up against the problem is the goal.", "\"If you loved me, you'd drop it\"", "Using love as leverage is manipulation."),
      P("You make up and it's actually sorted", "Repair is what makes couples stronger.", "He acts like nothing happened. Nothing's fixed", "Sweeping it under the rug means it comes back."),
    ],
    guides: ["too-sensitive", "red-flag-field-guide"],
    test: { href: "/gaslighting-or-not", label: "Gaslighting or not?" },
  },
  {
    id: "friends",
    name: "Friendships",
    emoji: "👯",
    bg: "#B8F2D8",
    boss: { name: "The Frenemy", emoji: "🐍" },
    pairs: [
      P("She's genuinely thrilled about your promotion", "Being happy for you is the clearest sign of a real friend.", "\"Must be nice\"", "Envy dressed up as a joke is still envy."),
      P("She checks in the day after your break-up", "Showing up when it's hard is the whole job.", "She only calls when she needs something", "One-way friendships drain you."),
      P("She keeps your secret", "Trust kept is friendship proven.", "She tells the group your secret", "Trust traded for gossip is hard to rebuild."),
      P("She's honest with you, kindly, in private", "Hard truths in private are love.", "She corrects you in front of everyone", "Public correction is about status, not helping you."),
      P("She remembers your big days", "Effort both ways is what keeps a friendship alive.", "She forgets your birthday but expects a party", "Uneven effort is a pattern worth noticing."),
      P("She's glad you have other friends", "Secure friends share you happily.", "She guilt-trips you for seeing other people", "Possessive friends shrink your world."),
      P("She hypes you up when you're not there", "Who she is behind your back is who she is.", "She flirts with your crush after you told her", "That one's a snake. Clean and simple."),
      P("You always leave feeling lighter", "Your body knows a good friend before your head does.", "You always leave feeling a bit worse", "Your body keeps score. Listen to it."),
    ],
    guides: ["frenemy-files", "therapist-friend"],
    test: { href: "/friend-vs-friend", label: "Friend vs friend" },
  },
  {
    id: "moving-in",
    name: "Moving in",
    emoji: "🏠",
    bg: "#FFC9A8",
    boss: { name: "The Control Freak", emoji: "⛓️" },
    support: true,
    pairs: [
      P("He does chores without being asked", "Seeing what needs doing is half the work.", "\"Just tell me what to do\", forever", "Being the household manager is exhausting, unpaid work."),
      P("He talks about money openly", "Money honesty is trust with numbers.", "He hides what he spends", "Financial secrecy is a trust problem with numbers."),
      P("He's fine with you keeping your own account", "Independence inside a couple is healthy.", "He wants all your passwords", "Access isn't intimacy."),
      P("Your stuff is in the flat too", "A home should have both of you in it.", "Everything has to be done his way", "If there's no room for your way, there's no room for you."),
      P("He gives you space when you need it", "Space and closeness can both be fine.", "He tracks your location \"for your safety\"", "Tracking a partner is control, however it's framed."),
      P("He cooks sometimes", "Sharing the load is the whole point of living together.", "He expects dinner on the table", "That's a role, not a relationship."),
      P("He says sorry when he's been grumpy", "Owning his moods keeps home feeling safe.", "You tiptoe around his moods", "Feeling scared of someone's mood at home is a serious sign."),
      P("He talks about a future with you in it", "Planning together means building together.", "He refuses to ever talk about the future", "Years of dodging that conversation is an answer."),
    ],
    guides: ["red-flag-field-guide", "clueless-or-careless"],
    test: { href: "/is-my-boyfriend-toxic", label: "Toxic Boyfriend Bingo" },
  },
];

/** What each pair does to the army: green and red effects per position. */
export const GREEN_OPS = ["+10", "x2", "+15", "+20", "x2", "+25", "x2", "+30"];
export const RED_OPS = ["-5", "÷2", "-10", "-15", "÷2", "-20", "÷2", "-25"];
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
  return Math.round(perfectHearts() * (0.3 + levelIndex * 0.07));
}

export function starsFor(hearts: number) {
  const max = perfectHearts();
  if (hearts >= max * 0.9) return 3;
  if (hearts >= max * 0.6) return 2;
  return 1;
}

/** Seconds for a gate pair to reach you. Faster each level. */
export function travelSeconds(levelIndex: number) {
  return Math.max(3.2, 4.6 - levelIndex * 0.25);
}

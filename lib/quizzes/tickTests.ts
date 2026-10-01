import { MORE_TICK_TESTS } from "./tickTestsMore";
import { VERSUS_GAMES } from "./versus";
import { CHOICE_GAMES } from "./choiceGames";

/**
 * TICK TESTS: the forty-second format, generalised.
 *
 * /things-he-says proved the shape: a grid of ordinary sentences, tap the
 * ones you recognise, an honest result in under a minute. It is the only
 * test on the site short enough for someone arriving from a video, and
 * recognition ("he has said that") lands harder than rating an abstract
 * statement on a scale. These are the same shape for the other problems the
 * site covers, each leading into its full test, its paid report and its
 * programme.
 *
 * The rules from things-he-says still hold:
 *  - count, never diagnose. "You recognised nine of these" is a fact; what
 *    it means about a person is not something taps can establish, and the
 *    copy says so;
 *  - ordinary items, not lurid ones. The jolt comes from how familiar they
 *    are;
 *  - no violence as tap material. Where items touch on control, enough of
 *    them together adds a plain pointer to real support.
 */

export interface TickItem {
  id: string;
  text: string;
  group: string;
  /** Counts towards the support note when enough are picked together. */
  flag?: boolean;
}

export interface TickTest {
  /** Light-hearted: labelled "just for fun", with a playful result. */
  fun?: boolean;
  slug: string;
  /** The question, as it reads on the tile and in the H1. */
  question: string;
  /** Shorter, for tiles and share cards. */
  short: string;
  emoji: string;
  intro: string;
  /** "he has said", "you have done": used in the result headline. */
  verb: string;
  /** Tile colours. */
  bg: string;
  fg: string;
  items: TickItem[];
  groups: Record<string, { label: string; does: string }>;
  verdicts: { none: string; few: string; pattern: string; system: string };
  support?: { min: number; text: string };
  /** The full test this leads into, where the paid report lives. */
  full: { href: string; label: string };
  /** What the €9.99 report adds, in plain words. */
  report: { pitch: string; bullets: string[] };
  seo: { title: string; description: string };
}

const CORE_TESTS: TickTest[] = [
  {
    slug: "things-he-does",
    question: "Which of these has he started doing?",
    short: "Things he's started doing",
    emoji: "📱",
    intro: "Tap every change you have actually noticed in the last few months. Only what you have seen, not what you suspect.",
    verb: "noticed",
    bg: "#FBE0E6",
    fg: "#7A1F35",
    items: [
      { id: "d1", text: "His phone is always face down now", group: "secrecy" },
      { id: "d2", text: "He changed his passcode and didn't mention it", group: "secrecy" },
      { id: "d3", text: "He takes his phone to the bathroom", group: "secrecy" },
      { id: "d4", text: "He smiles at messages and won't say who", group: "secrecy" },
      { id: "d5", text: "A new \"work friend\" you've never met", group: "someone" },
      { id: "d6", text: "He mentions one name a lot, then suddenly never", group: "someone" },
      { id: "d7", text: "His story didn't match what someone else said", group: "stories" },
      { id: "d8", text: "Plans that are vague about where and with whom", group: "stories" },
      { id: "d9", text: "Late nights that are never quite explained", group: "stories" },
      { id: "d10", text: "He picks a fight right before going out", group: "distance" },
      { id: "d11", text: "Less affection, and he says nothing's changed", group: "distance" },
      { id: "d12", text: "He gets angry when you ask ordinary questions", group: "defence" },
      { id: "d13", text: "He accuses you of cheating, out of nowhere", group: "defence" },
      { id: "d14", text: "A sudden interest in the gym and his looks", group: "change" },
      { id: "d15", text: "New music, new jokes, new words you didn't teach him", group: "change" },
      { id: "d16", text: "Money or time you can't account for", group: "stories" },
    ],
    groups: {
      secrecy: { label: "New secrecy", does: "A change in how he handles his phone. On its own it proves nothing: people guard phones for all sorts of reasons. It is the change, not the habit, that is worth noticing." },
      someone: { label: "A person in the picture", does: "Someone new keeps appearing, or noticeably stops appearing. Worth a plain question, never worth a stake-out." },
      stories: { label: "Stories that don't add up", does: "Inconsistencies you have seen for yourself. Of everything here, these carry the most weight, because they can be checked rather than read into." },
      distance: { label: "Distance", does: "Less closeness, sometimes manufactured with a fight. It has many causes, stress and depression among them, and it hurts whatever the cause." },
      defence: { label: "Defensiveness", does: "Ordinary questions are treated as attacks, or the suspicion is turned back on you. It makes the subject impossible to raise, which is the effect whatever the reason." },
      change: { label: "A change in him", does: "New habits and interests. Very often innocent; sometimes part of a wider picture. On its own, the weakest sign here." },
    },
    verdicts: {
      none: "Nothing on this list has changed. Whatever is worrying you, it is not these, and that is worth knowing.",
      few: "A couple of changes is ordinary life: a new job, a stressful month, a new hobby. On their own they are worth noticing, not worth building a case on.",
      pattern: "Several changes at once, starting around the same time, deserve a calm, direct conversation. Not proof of anything, but past the point where you should have to keep guessing.",
      system: "That is a lot of change, and you are not imagining that something is different. What it means cannot be settled by more checking; it can only be settled by asking, and by deciding what you will do with the answer.",
    },
    full: { href: "/is-he-cheating", label: "Take the full cheating test, free" },
    report: {
      pitch: "Find out which of these signs actually carry weight in your situation.",
      bullets: [
        "Each area of warning signs scored, from the full test's questions",
        "Why doubting him makes you feel like the problem",
        "A word-for-word script for asking him",
        "A 5-day action plan that doesn't depend on checking his phone",
      ],
    },
    seo: {
      title: "Is He Cheating? 16 Changes, Tap The Ones You've Noticed",
      description: "Sixteen changes people notice when something is going on. Tap the ones you've seen and get an honest read in 40 seconds. Free, no sign-up.",
    },
  },
  {
    slug: "waiting-for-his-reply",
    question: "Which of these have you done waiting for his reply?",
    short: "Waiting for his reply",
    emoji: "⏳",
    intro: "Be honest, nobody sees this. Tap everything you have done in the last month while waiting to hear back.",
    verb: "done",
    bg: "#DDEFE8",
    fg: "#1F4A3E",
    items: [
      { id: "w1", text: "Checked when he was last online", group: "checking" },
      { id: "w2", text: "Posted a story to see if he'd watch it", group: "checking" },
      { id: "w3", text: "Checked his likes or who he follows", group: "checking" },
      { id: "w4", text: "Typed a message, deleted it, typed it again", group: "rehearsing" },
      { id: "w5", text: "Reread the whole chat looking for what I did wrong", group: "rehearsing" },
      { id: "w6", text: "Sent a screenshot to a friend to decode", group: "rehearsing" },
      { id: "w7", text: "Double texted, then regretted it", group: "protest" },
      { id: "w8", text: "Sent \"?\" or \"all good?\"", group: "protest" },
      { id: "w9", text: "Went cold on purpose so he'd notice", group: "protest" },
      { id: "w10", text: "Replied instantly, then waited hours to look casual", group: "protest" },
      { id: "w11", text: "Couldn't concentrate on anything else", group: "body" },
      { id: "w12", text: "Felt sick when the phone buzzed and it wasn't him", group: "body" },
      { id: "w13", text: "Lost sleep over a reply", group: "body" },
      { id: "w14", text: "Decided he's lost interest, from one slow reply", group: "story" },
      { id: "w15", text: "Wondered what's wrong with me", group: "story" },
      { id: "w16", text: "Felt instantly fine the second he replied", group: "story" },
    ],
    groups: {
      checking: { label: "Checking", does: "Looking for evidence of where you stand. It gives a moment of relief and then feeds the doubt, which is why it never feels finished." },
      rehearsing: { label: "Rehearsing", does: "Going over the conversation to find the mistake. It feels like problem-solving; it is the alarm looking for a reason to stay switched on." },
      protest: { label: "Protest moves", does: "Things done to get a reaction: more contact, or pointedly less. Attachment researchers call these protest behaviours, and they tend to push people further away." },
      body: { label: "The alarm in your body", does: "Your nervous system treating a slow reply as a threat. It is real, it is exhausting, and it can be turned down." },
      story: { label: "The story it tells", does: "A slow reply becomes a verdict on you. The instant relief when he answers is the tell: the feeling was never about the message." },
    },
    verdicts: {
      none: "None of these. Waiting for a reply doesn't seem to get to you, which is rarer than you might think.",
      few: "A few of these is normal when you like someone. Everybody checks sometimes. What matters is whether it takes over your evening.",
      pattern: "This is your attachment alarm at work: a slow reply sets it off, and these are the ways you try to switch it off. None of it is silly, and all of it is learnable.",
      system: "Waiting for a reply takes over your whole state, body and all. That is not you being needy. It is an alarm set very sensitive, and it is one of the most workable patterns there is.",
    },
    full: { href: "/attachment-style-quiz", label: "Find your attachment style, free" },
    report: {
      pitch: "See exactly how your alarm works, across love, friends, work and family.",
      bullets: [
        "Your attachment scored across five areas of life, not just dating",
        "Your own answers quoted back to you",
        "What to do today, this week and this month",
      ],
    },
    seo: {
      title: "Anxious Attachment Test: What Do You Do Waiting For His Reply?",
      description: "Sixteen things people do while waiting for a text back. Tap the ones you've done and see what your attachment alarm is up to. 40 seconds, free.",
    },
  },
  {
    slug: "first-month-red-flags",
    question: "Which of these happened in the first month?",
    short: "First-month red flags",
    emoji: "🚩",
    intro: "Think of the last person you fell for. Tap everything that happened in the first few weeks.",
    verb: "had",
    bg: "#FCE3D8",
    fg: "#7A2E14",
    items: [
      { id: "f1", text: "\"I've never felt like this before\"", group: "intensity" },
      { id: "f2", text: "Texting all day, every day, from day one", group: "intensity" },
      { id: "f3", text: "Talking about the future on the second date", group: "intensity" },
      { id: "f4", text: "\"You're not like other girls\"", group: "intensity" },
      { id: "f5", text: "Every ex was \"crazy\"", group: "history" },
      { id: "f6", text: "Just out of something, or not quite out of it", group: "history" },
      { id: "f7", text: "Rude to a waiter, sweet to you", group: "character" },
      { id: "f8", text: "Made a joke at your expense, then \"relax\"", group: "character" },
      { id: "f9", text: "Pushed after you said no, even about something small", group: "boundaries", flag: true },
      { id: "f10", text: "Sulked when you had plans without him", group: "boundaries", flag: true },
      { id: "f11", text: "Cancelled last minute, then made it up hugely", group: "hotcold" },
      { id: "f12", text: "Went quiet for days, then came back like nothing happened", group: "hotcold" },
      { id: "f13", text: "You felt like you had to earn his attention", group: "hotcold" },
      { id: "f14", text: "Your friends were unsure about him", group: "outside" },
      { id: "f15", text: "You explained his behaviour to people", group: "outside" },
      { id: "f16", text: "It felt more intense than anything before", group: "intensity" },
    ],
    groups: {
      intensity: { label: "Too much, too fast", does: "Intensity that arrives before he knows you. It feels like chemistry. Researchers link very fast, very intense early attention with love bombing, and it tends to cool as fast as it came." },
      history: { label: "His history", does: "How someone talks about their past is a preview of how they will talk about you." },
      character: { label: "How he treats people", does: "The way he treats people who can do nothing for him, and how he handles a joke that lands badly, show you the version of him you'll meet later." },
      boundaries: { label: "Your no", does: "How someone handles a small no early is the best predictor there is of how they'll handle a big one later." },
      hotcold: { label: "Hot and cold", does: "Unpredictable attention is the most gripping kind there is. The relief when he comes back feels like love; a lot of it is uncertainty." },
      outside: { label: "What others saw", does: "The people who love you often see it first, and explaining him to them is its own signal." },
    },
    verdicts: {
      none: "None of these. That first month sounds steady, and steady is underrated.",
      few: "A flag or two is not a verdict. Nobody is perfect in the first month. The question is whether they grew or faded as you got to know him.",
      pattern: "Several of these together is a recognisable start, and a common one. It is not your fault that it felt good; it was designed to. The useful part is learning to see it earlier next time.",
      system: "That first month had most of the signs of an intense, hot-and-cold start. If you keep ending up here, it is a pattern in who gets through your door, and patterns can be changed.",
    },
    support: { min: 2, text: "Two of what you picked are about how he handled your no and your time with others. If that is still happening in a relationship now, it is worth talking to someone outside it. In the UK, Refuge runs a free 24-hour line on 0808 2000 247." },
    full: { href: "/why-do-i-pick-bad-guys", label: "Find out why you pick them, free" },
    report: {
      pitch: "Find out what in you says yes to this kind of start.",
      bullets: [
        "Your partner-selection pattern, scored dimension by dimension",
        "Why the wrong men find it so easy to read, for your scores",
        "Your own answers quoted back to you",
        "Word-for-word scripts and a step-by-step plan",
      ],
    },
    seo: {
      title: "Love Bombing Test: Which Red Flags Happened In The First Month?",
      description: "Sixteen things that happen in the first month of the wrong relationship. Tap the ones you had and see what they add up to. 40 seconds, free.",
    },
  },
  {
    slug: "things-my-friend-says",
    question: "Which of these has your friend said to you?",
    short: "Things my friend says",
    emoji: "🐍",
    intro: "Think of the friend who leaves you feeling a bit worse. Tap every sentence you've heard from them.",
    verb: "heard",
    bg: "#FDEBD3",
    fg: "#6B3E0E",
    items: [
      { id: "m1", text: "\"Must be nice.\"", group: "envy" },
      { id: "m2", text: "\"You're so lucky\" and then straight back to them", group: "envy" },
      { id: "m3", text: "\"Won't that be really stressful though?\"", group: "envy" },
      { id: "m4", text: "\"Omg so sorry hun\" and then a favour two days later", group: "taking" },
      { id: "m5", text: "\"You're the only one I can talk to\"", group: "taking" },
      { id: "m6", text: "\"Can you just...\" (again)", group: "taking" },
      { id: "m7", text: "\"I'm just being honest\"", group: "digs" },
      { id: "m8", text: "\"You've changed\"", group: "digs" },
      { id: "m9", text: "\"No offence, but...\"", group: "digs" },
      { id: "m10", text: "\"You always make it about you\"", group: "guilt" },
      { id: "m11", text: "\"I'd do it for you\"", group: "guilt" },
      { id: "m12", text: "\"Fine, go then\" when you have other plans", group: "guilt" },
      { id: "m13", text: "\"Don't tell anyone, but...\" about someone else", group: "gossip" },
      { id: "m14", text: "\"Everyone thinks so, not just me\"", group: "gossip" },
      { id: "m15", text: "\"Sorry, I've been so busy\" (every time)", group: "effort" },
      { id: "m16", text: "\"We should hang out\" and never a plan", group: "effort" },
    ],
    groups: {
      envy: { label: "Can't be happy for you", does: "Your good news gets deflated, dismissed or turned back to them. Research on how friends respond to good news finds this is one of the clearest signs of how close a friendship really is." },
      taking: { label: "Takes more than gives", does: "You are needed, often. Being needed is not the same as being cared for, and the gap shows when you need something back." },
      digs: { label: "Digs dressed as honesty", does: "Criticism with a disclaimer attached. The disclaimer is there so that minding it becomes your fault." },
      guilt: { label: "Guilt as a lead", does: "Your independence is treated as disloyalty. It keeps you close, and it keeps you careful." },
      gossip: { label: "Gossip", does: "If they talk this way about others to you, it is worth assuming they talk about you this way to others." },
      effort: { label: "One-way effort", does: "Warm words, no plans. The friendship survives because you carry it." },
    },
    verdicts: {
      none: "You haven't heard any of these. Whoever you were thinking of, it isn't these habits.",
      few: "Everyone says one of these on a bad day. A couple is a friend with flaws, which is every friend.",
      pattern: "This friendship leans one way, and part of you knows it, or you wouldn't have picked them. It may be repairable with one honest conversation. It may not. Either way, you're not being dramatic.",
      system: "That is most of the list. This friendship costs you more than it gives, and it has probably been that way for a while. You're allowed to want friends who are glad when things go well for you.",
    },
    full: { href: "/toxic-friend-test", label: "Take the full toxic friend test, free" },
    report: {
      pitch: "See exactly how this friendship works, and what to do about it.",
      bullets: [
        "The friendship scored across seven dimensions, including its impact on you",
        "What your two highest scores mean together",
        "When a quiet fade works better than a confrontation",
        "Word-for-word scripts and a step-by-step plan",
      ],
    },
    seo: {
      title: "Toxic Friend Test: Which Of These Has Your Friend Said?",
      description: "Sixteen things toxic friends say. Tap the ones you've heard and find out what the friendship is really like. 40 seconds, free, no sign-up.",
    },
  },
  {
    slug: "when-it-gets-serious",
    question: "Which of these do you do when it gets serious?",
    short: "When it gets serious",
    emoji: "💣",
    intro: "Think of the moment a relationship starts to get real. Tap everything you've caught yourself doing.",
    verb: "done",
    bg: "#D8F0EE",
    fg: "#134A45",
    items: [
      { id: "s1", text: "Suddenly notice everything that's wrong with them", group: "exit" },
      { id: "s2", text: "Their laugh, chewing or texting starts to annoy me", group: "exit" },
      { id: "s3", text: "Think about an ex, or someone new", group: "exit" },
      { id: "s4", text: "Lose interest almost overnight", group: "exit" },
      { id: "s5", text: "Reply slower, on purpose", group: "distance" },
      { id: "s6", text: "Get very busy all of a sudden", group: "distance" },
      { id: "s7", text: "Feel trapped when they plan ahead", group: "distance" },
      { id: "s8", text: "Pick a fight over something tiny", group: "test" },
      { id: "s9", text: "Push them away to see if they'll stay", group: "test" },
      { id: "s10", text: "Say \"maybe we should end it\" without meaning it", group: "test" },
      { id: "s11", text: "Wait for them to mess up so I can leave", group: "test" },
      { id: "s12", text: "Feel numb when they say something loving", group: "numb" },
      { id: "s13", text: "Feel relieved when plans get cancelled", group: "numb" },
      { id: "s14", text: "Think \"they'll leave once they know the real me\"", group: "worth" },
      { id: "s15", text: "Expect disappointment even when they're lovely", group: "worth" },
      { id: "s16", text: "End it without really explaining why", group: "exit" },
    ],
    groups: {
      exit: { label: "Finding the exit", does: "The sudden list of flaws that appears right as things get good. Attachment researchers call these deactivating strategies: ways of turning closeness down when it starts to feel like too much." },
      distance: { label: "Making space", does: "Quiet distance, rarely explained. It relieves the pressure for you and creates it for them." },
      test: { label: "Testing them", does: "A question in disguise: will you stay if I'm difficult? The trouble is that they answer the disguise, not the question." },
      numb: { label: "Going numb", does: "Closeness shuts feeling off instead of turning it up. It's a protection, not a lack of feeling." },
      worth: { label: "Not feeling worth it", does: "The belief underneath the rest: that you'll be found out. Everything else on this list protects you from finding out." },
    },
    verdicts: {
      none: "None of these. When things get serious, you seem to be able to stay. That's not nothing.",
      few: "A little wobble when things get real is normal. Everyone has a moment of \"is this too much?\"",
      pattern: "There's a pattern here: it's when things go well that something in you reaches for the exit. That's protection doing its job at the wrong time, and it can be retrained.",
      system: "Closeness itself seems to be the trigger. That's exhausting to live with, and it's not because you don't care. It usually means you learned early that getting close was where you got hurt.",
    },
    full: { href: "/why-do-i-sabotage-relationships", label: "Take the full self-sabotage test, free" },
    report: {
      pitch: "See which of your five sabotage patterns is running the show.",
      bullets: [
        "Fear of closeness, the rejection alarm, testing, worthiness and withdrawal, each scored",
        "A written analysis of your results, not a generic type",
        "The one change that would help most, right now",
      ],
    },
    seo: {
      title: "Self-Sabotage Test: What Do You Do When It Gets Serious?",
      description: "Sixteen things people do when a relationship gets real. Tap the ones you do and see your sabotage pattern. 40 seconds, free, no sign-up.",
    },
  },
  {
    slug: "after-a-good-weekend",
    question: "Which of these does he do after a really good weekend?",
    short: "After a good weekend",
    emoji: "🥶",
    intro: "Think of the last time things felt really close between you. Tap everything he did in the days after.",
    verb: "noticed",
    bg: "#DDE9F5",
    fg: "#1E3E5E",
    items: [
      { id: "a1", text: "Goes quiet for a day or two", group: "withdraw" },
      { id: "a2", text: "Suddenly \"really busy with work\"", group: "withdraw" },
      { id: "a3", text: "Replies with one word", group: "withdraw" },
      { id: "a4", text: "Cancels the next plan", group: "withdraw" },
      { id: "a5", text: "\"Nothing's wrong, I'm fine\"", group: "shutdown" },
      { id: "a6", text: "Changes the subject when you bring up the future", group: "shutdown" },
      { id: "a7", text: "\"Let's see\" about anything past next week", group: "shutdown" },
      { id: "a8", text: "Needs \"space\" with no idea for how long", group: "shutdown" },
      { id: "a9", text: "Picks at something small you do", group: "flaws" },
      { id: "a10", text: "Mentions how \"free\" his single friends are", group: "flaws" },
      { id: "a11", text: "Talks about an ex like she was the one", group: "flaws" },
      { id: "a12", text: "Comes back warm like nothing happened", group: "return" },
      { id: "a13", text: "Is lovely in person, distant over text", group: "return" },
      { id: "a14", text: "Gets irritated when you ask what's wrong", group: "pressure" },
      { id: "a15", text: "Pulls further away the more you reach", group: "pressure" },
      { id: "a16", text: "Says you're \"too much\" when you're upset", group: "pressure" },
    ],
    groups: {
      withdraw: { label: "Pulling back", does: "Distance that follows closeness. The timing is the clue: it's his limit on closeness, not a verdict on you." },
      shutdown: { label: "Shutting the door", does: "The future and feelings get closed down gently. It turns a big fear into a small \"let's see\"." },
      flaws: { label: "Finding reasons", does: "Small faults and idealised exes. Researchers describe these as ways avoidant people turn their own feelings down." },
      return: { label: "Coming back", does: "The warmth after the distance. It is real, and it is also the part that keeps you hooked, because relief feels like love." },
      pressure: { label: "The chase-and-retreat", does: "The more you reach, the more he goes. Therapists call this the pursue-withdraw cycle, and it is the cycle, not either of you, that is the problem." },
    },
    verdicts: {
      none: "None of these. Closeness doesn't seem to scare him off, which is good to know.",
      few: "Everyone needs a quiet day after a big weekend. A little of this is just two people with different batteries.",
      pattern: "There's a clear pattern: closeness is followed by distance. It is most likely about how much closeness he can handle, not about how lovable you are.",
      system: "Every step closer is followed by a step back, and you're doing a lot of chasing. That dance is exhausting, and it has a name, a cause, and things you can do about your half of it.",
    },
    full: { href: "/partners-attachment-style", label: "Find his attachment style, free" },
    report: {
      pitch: "See his pattern, yours, and how they lock together.",
      bullets: [
        "Where he sits on the two attachment axes, scored from what you've seen",
        "What is most likely behind his distance",
        "What you can actually change, and what you can't",
        "A step-by-step plan for your side of it",
      ],
    },
    seo: {
      title: "Why Does He Pull Away After Getting Close? 16 Signs, 40 Seconds",
      description: "Sixteen things men do after a close weekend. Tap the ones you've seen and find out what his distance really means. Free, no sign-up.",
    },
  },
];

/** Serious ones first on each shelf, then the lighter ones mixed in. */
export const TICK_TESTS: TickTest[] = [...CORE_TESTS, ...MORE_TICK_TESTS];

export function tickTestBySlug(slug: string) {
  return TICK_TESTS.find((t) => t.slug === slug);
}

/** Every 40-second test, including the original, for cross-links. */
export const QUICK_TESTS: { slug: string; short: string; emoji: string; bg: string; fg: string; fun?: boolean }[] = [
  // The games lead: they are the most shareable thing here.
  { slug: "flag-runner", short: "Flag Runner", emoji: "🏃‍♀️", bg: "#FFE68A", fg: "#5C4300", fun: true },
  { slug: "love-tower", short: "Love Tower", emoji: "🏗️", bg: "#C9B6FF", fg: "#3F2C6B", fun: true },
  { slug: "kiss-the-frogs", short: "Kiss the Frogs", emoji: "🐸", bg: "#D9F99D", fg: "#365314", fun: true },
  { slug: "heart-wars", short: "Heart Wars", emoji: "🏰", bg: "#FFB3C7", fg: "#6E1A4A", fun: true },
  { slug: "red-flag-or-green-flag", short: "Red flag or green flag?", emoji: "🚦", bg: "#FFD1E8", fg: "#6E1A4A", fun: true },
  ...CHOICE_GAMES.slice(0, 1).map(({ slug, short, emoji, bg, fg }) => ({ slug, short, emoji, bg, fg, fun: true })),
  ...VERSUS_GAMES.map(({ slug, short, emoji, bg, fg }) => ({ slug, short, emoji, bg, fg, fun: true })),
  ...CHOICE_GAMES.slice(1).map(({ slug, short, emoji, bg, fg }) => ({ slug, short, emoji, bg, fg, fun: true })),
  { slug: "things-he-says", short: "Things he says", emoji: "💬", bg: "#E9E2F7", fg: "#3F2C6B" },
  ...TICK_TESTS.map(({ slug, short, emoji, bg, fg, fun }) => ({ slug, short, emoji, bg, fg, fun })),
];

export type TickBand = "none" | "few" | "pattern" | "system";

export interface TickResult {
  chosen: TickItem[];
  count: number;
  total: number;
  band: TickBand;
  groups: { key: string; label: string; does: string; items: TickItem[] }[];
  headline: string;
  verdict: string;
  support: string | null;
}

export function scoreTick(test: TickTest, selected: string[]): TickResult {
  const chosen = test.items.filter((i) => selected.includes(i.id));
  const count = chosen.length;
  const total = test.items.length;
  // Half the grid or more is "system", a quarter "pattern": 8 and 4 on the
  // sixteen-item tests, 6 and 3 on the twelve-item ones.
  const band: TickBand =
    count >= Math.ceil(total / 2) ? "system" : count >= Math.ceil(total / 4) ? "pattern" : count >= 1 ? "few" : "none";

  const byGroup = new Map<string, TickItem[]>();
  for (const i of chosen) byGroup.set(i.group, [...(byGroup.get(i.group) ?? []), i]);
  const groups = [...byGroup.entries()]
    .sort((a, b) => b[1].length - a[1].length)
    .map(([key, items]) => ({ key, label: test.groups[key].label, does: test.groups[key].does, items }));

  const headline =
    band === "none" ? `You haven't ${test.verb} any of these.` : `You've ${test.verb} ${count} of the ${total}.`;
  const flags = chosen.filter((i) => i.flag).length;
  const support = test.support && flags >= test.support.min ? test.support.text : null;

  return { chosen, count, total, band, groups, headline, verdict: test.verdicts[band], support };
}

/**
 * The test to suggest next: the one after this in the list, wrapping round,
 * so following "next" walks through every test without repeating.
 */
export function nextQuickTest(slug: string) {
  const i = QUICK_TESTS.findIndex((t) => t.slug === slug);
  return QUICK_TESTS[(i + 1) % QUICK_TESTS.length];
}

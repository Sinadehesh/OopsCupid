/**
 * Pick-the-answer games: one moment per card, a handful of answers, the
 * verdict and the reason straight after. They play like a game show and
 * each teaches one distinction the tests and guides are built on (a dry
 * texter vs a fading one, anxious vs avoidant, gaslighting vs a mix-up,
 * a real friend vs a frenemy).
 *
 * Answers are the most likely reading, not a diagnosis, and every reason
 * says what would change the verdict. Correct answers are spread across
 * positions so nobody can win by always tapping the same button.
 */

export interface ChoiceOption {
  id: string;
  label: string;
  emoji: string;
}

export interface ChoiceRound {
  id: string;
  /** The moment itself. In "text" games it's shown as his message bubble. */
  prompt: string;
  /** A line of context under the prompt. */
  context?: string;
  /** Per-round answers; otherwise the game's shared ones. */
  options?: ChoiceOption[];
  answer: string;
  why: string;
}

export interface ChoiceRank {
  min: number;
  emoji: string;
  title: string;
  line: string;
}

export interface ChoiceGame {
  slug: string;
  title: string;
  short: string;
  emoji: string;
  bg: string;
  fg: string;
  /** "text" shows the prompt as a message from him. */
  style: "text" | "scene";
  kicker: string;
  intro: string;
  question: string;
  options?: ChoiceOption[];
  rounds: ChoiceRound[];
  ranks: ChoiceRank[];
  resultLabel: string;
  /** Shown under the result, whatever the score. */
  note?: string;
  /** The "now test your own" link. */
  own: { href: string; label: string; emoji: string };
  /** The quiz path whose programme to offer after the result. */
  program?: string;
  seo: { title: string; description: string; og: string };
}

const o = (id: string, emoji: string, label: string): ChoiceOption => ({ id, emoji, label });

const DECODE: ChoiceGame = {
  slug: "decode-his-text",
  title: "Decode his text",
  short: "Decode his text",
  emoji: "📱",
  bg: "#BDE3FF",
  fg: "#123A5C",
  style: "text",
  kicker: "📱 text game · 12 messages",
  intro: "Read what he sent. Pick what it most likely means. Find out if you're fluent in man.",
  question: "What does it most likely mean?",
  rounds: [
    {
      id: "d1", prompt: "k", context: "Reply to your long message about your day.",
      options: [o("a", "😡", "He's furious with you"), o("b", "🤷", "He's busy, or just a dry texter"), o("c", "📉", "He's losing interest")],
      answer: "b",
      why: "One short reply means nothing on its own. If he's warm in person and texts like a robot, that's his texting style. Only a change in his pattern is worth noticing.",
    },
    {
      id: "d2", prompt: "we should hang out sometime 😊", context: "The third time he's said it. Still no plan.",
      options: [o("a", "🌷", "He's shy, give it time"), o("b", "🎁", "He's planning a surprise"), o("c", "🎣", "He likes having you as an option")],
      answer: "c",
      why: "\"Sometime\", repeated with no day attached, keeps the door open without walking through it. Someone keen names a day. Try \"Sure, Thursday?\" and see what happens.",
    },
    {
      id: "d3", prompt: "u up?", context: "Sent at 1:12am. You haven't heard from him all week.",
      options: [o("a", "🌙", "He wants company tonight"), o("b", "💭", "He can't stop thinking about you"), o("c", "🩹", "He's worried about you")],
      answer: "a",
      why: "Late-night-only messages are about availability, not you in particular. The easy test: does he also want to see you at 2pm on a Sunday?",
    },
    {
      id: "d4", prompt: "sorry, been crazy busy this week. how are you? how did the interview go??", context: "After four quiet days.",
      options: [o("a", "👻", "He's slowly ghosting you"), o("b", "🕵️", "He's hiding something"), o("c", "🙋", "He got busy and came back properly")],
      answer: "c",
      why: "He came back, apologised and remembered your interview. One quiet week followed by real interest is life, not a red flag. A pattern of vanishing would be different.",
    },
    {
      id: "d5", prompt: "I'm not looking for anything serious right now", context: "Said on date three.",
      options: [o("a", "✅", "He means it. Believe him"), o("b", "🪄", "He'll change his mind once he knows you"), o("c", "🎯", "He's testing if you'll chase")],
      answer: "a",
      why: "When someone tells you what they want, it's the most reliable information you'll ever get. Lots of people hope to be the exception. Most aren't, and that's not about you.",
    },
    {
      id: "d6", prompt: "haha", context: "His reply to your funny story.",
      options: [o("a", "🙄", "He thinks you're annoying"), o("b", "😂", "He laughed. He's just low-key"), o("c", "👀", "He's texting another girl")],
      answer: "b",
      why: "\"haha\" is the most overanalysed word in dating. On its own it means he laughed. Whether he keeps the conversation going tells you far more than the number of h's.",
    },
    {
      id: "d7", prompt: "you're overreacting, it was a joke", context: "After you said his comment hurt.",
      options: [o("a", "🙅", "He's brushing off how you feel"), o("b", "🤏", "You're probably being too sensitive"), o("c", "😜", "He's just being playful")],
      answer: "a",
      why: "Whatever he meant, you told him it hurt. A caring reply is \"sorry, I didn't mean it like that\". Telling you how you should feel skips the apology. If it happens a lot, read the Too Sensitive guide.",
    },
    {
      id: "d8", prompt: "I just think we're at different places in life right now", context: "Out of nowhere, after two months.",
      options: [o("a", "⏳", "He needs a few weeks"), o("b", "🚪", "It's a kind way of ending it"), o("c", "💪", "He wants you to try harder")],
      answer: "b",
      why: "This is a soft goodbye. It's vague on purpose so nobody has to be the bad guy. Chasing a \"different place\" rarely gets you to the same one.",
    },
    {
      id: "d9", prompt: "can I call you? easier than texting", context: "Mid-conversation about weekend plans.",
      options: [o("a", "📞", "He wants to actually talk to you"), o("b", "⚠️", "Something's wrong"), o("c", "❌", "He's about to cancel")],
      answer: "a",
      why: "Wanting to hear your voice is effort, usually the opposite of a slow fade. Not every call is bad news.",
    },
    {
      id: "d10", prompt: "who's that guy in your story?", context: "Two weeks in. You're not exclusive.",
      options: [o("a", "⛓️", "He's controlling"), o("b", "🚫", "He doesn't trust you"), o("c", "🙈", "He's curious and a bit jealous")],
      answer: "c",
      why: "A flash of jealousy is human, and asking is fine. It becomes a red flag if it turns into rules, sulking or checking your phone. Watch what he does with the answer.",
    },
    {
      id: "d11", prompt: "I miss you", context: "Three weeks after he ended it. No apology, no plan.",
      options: [o("a", "💍", "He wants you back for real"), o("b", "🥀", "He's lonely tonight"), o("c", "😔", "He knows he made a mistake")],
      answer: "b",
      why: "Missing someone is a feeling, not a plan. If he wanted you back you'd get an apology and a proposal, not a feeling sent at 11pm. The Hot and Cold guide is about this loop.",
    },
    {
      id: "d12", prompt: "sorry, I was wrong. I'll text you next time I'm running late", context: "After you were upset he turned up an hour late.",
      options: [o("a", "🎭", "He's saying what you want to hear"), o("b", "😨", "He's scared you'll leave"), o("c", "🤝", "He's taking responsibility")],
      answer: "c",
      why: "A clean apology plus a specific change is the gold standard. Whether he means it shows the next time he's late, so give it the chance to show.",
    },
  ],
  ranks: [
    { min: 11, emoji: "🧠", title: "Fluent in Man", line: "You read texts like subtitles. Nobody's vague message gets past you." },
    { min: 8, emoji: "🔍", title: "Decent Decoder", line: "You get most of them. A couple of classics still catch you out." },
    { min: 5, emoji: "🌀", title: "Overthinker in Training", line: "You read a lot into a little. The guides below will save you hours of staring at your phone." },
    { min: 0, emoji: "📵", title: "Lost in Translation", line: "His texts are a foreign language right now. Good news: it's learnable." },
  ],
  resultLabel: "Your text decoding level",
  program: "/partners-attachment-style",
  own: { href: "/is-he-just-not-that-into-you", label: "Is he just not that into you?", emoji: "💔" },
  seo: {
    title: "Decode His Text: What Does His Message Really Mean? | OopsCupid",
    description: "Read 12 real-life texts from him, pick what each one most likely means, and get the verdict and the reason straight away. A free game that stops the overthinking.",
    og: "12 texts. What does he actually mean?",
  },
};

const ATTACH = [o("secure", "😌", "Secure"), o("anxious", "😰", "Anxious"), o("avoidant", "🧊", "Avoidant"), o("fearful", "🌀", "Fearful-avoidant")];

const ATTACHMENT: ChoiceGame = {
  slug: "guess-the-attachment-style",
  title: "Guess the attachment style",
  short: "Guess the attachment style",
  emoji: "🧸",
  bg: "#FFE68A",
  fg: "#5C4300",
  style: "scene",
  kicker: "🧸 guessing game · 12 people",
  intro: "Twelve people, twelve moments. Guess who's secure, anxious, avoidant or fearful-avoidant.",
  question: "Which attachment style is this?",
  options: ATTACH,
  rounds: [
    { id: "a1", prompt: "He hasn't replied in three hours. She's checked his last seen eleven times and drafted two \"is everything ok?\" texts.", answer: "anxious", why: "Reading silence as danger, and needing reassurance to calm down, is the anxious pattern. The Last-Seen Spiral guide is all about this." },
    { id: "a2", prompt: "Things are going really well, so he suddenly feels \"suffocated\" and starts picking at her small flaws.", answer: "avoidant", why: "When closeness feels like a threat, finding flaws is a way to make distance feel justified. It says more about his comfort with intimacy than about her." },
    { id: "a3", prompt: "Her partner cancels at the last minute. She's disappointed, says so, and suggests another day.", answer: "secure", why: "Feeling the disappointment, saying it plainly and moving on without a spiral or a sulk. That's secure in one move." },
    { id: "a4", prompt: "She swings between \"I've never felt this way\" and \"I knew you'd leave\" in the same week.", answer: "fearful", why: "Wanting closeness badly and fearing it just as much is the fearful-avoidant push and pull. It's exhausting, mostly for her." },
    { id: "a5", prompt: "After an argument he says \"I'm fine\", goes to the gym for three hours and never brings it up again.", answer: "avoidant", why: "Shutting feelings down and hoping they go away is classic avoidant. The argument doesn't get resolved, it just gets buried." },
    { id: "a6", prompt: "Mid-fight she says \"I'm upset. Can we talk about it tonight when we're both calmer?\"", answer: "secure", why: "Naming the feeling and suggesting a time to come back to it. Secure people can be upset without the relationship feeling at risk." },
    { id: "a7", prompt: "He texts \"are you mad at me?\" when she's just busy at work.", answer: "anxious", why: "Assuming a quiet partner means an angry partner is the anxious alarm going off. Nothing happened, but it felt like something did." },
    { id: "a8", prompt: "She shares something really vulnerable, then feels exposed and goes cold the next day.", answer: "fearful", why: "Reaching for closeness and then recoiling from it is fearful-avoidant. Someone avoidant usually wouldn't have shared in the first place." },
    { id: "a9", prompt: "He's happy to spend the weekend together, and just as happy to spend one apart. Neither feels like a verdict on the relationship.", answer: "secure", why: "Time apart doesn't mean less love to a secure person. Togetherness and space can both be fine." },
    { id: "a10", prompt: "She's most attracted to people who are hard to pin down, and bored by people who text back straight away.", answer: "anxious", why: "Unpredictability feels like chemistry to an anxious system because the chase is familiar. Steady can read as boring at first. It usually isn't." },
    { id: "a11", prompt: "He's amazing at the start, then says \"I'm just not good at relationships\" the moment she asks where it's going.", answer: "avoidant", why: "The label conversation is where avoidant people often bail. \"I'm not good at this\" is a way to leave without discussing it." },
    { id: "a12", prompt: "She keeps a backup option \"just in case\", because counting on one person feels dangerous, but she desperately wants that one person.", answer: "fearful", why: "Craving one person while never fully trusting them is the fearful-avoidant bind. The backup is protection from a hurt that hasn't happened." },
  ],
  ranks: [
    { min: 11, emoji: "🛋️", title: "Basically a Therapist", line: "You clocked every style. Your friends should be paying you." },
    { min: 8, emoji: "🧠", title: "Emotionally Fluent", line: "You can read people well. Anxious and fearful-avoidant still blur sometimes, and that's normal." },
    { min: 5, emoji: "🧸", title: "Getting the Hang of It", line: "You've got the basics. The guides below make the rest click." },
    { min: 0, emoji: "🔮", title: "Vibes-Based Reader", line: "You go on vibes. Now learn the four styles and the vibes get a lot more accurate." },
  ],
  resultLabel: "Your people-reading level",
  note: "Attachment styles are patterns, not labels. Everyone does a bit of all four, especially under stress. Your own style is the one that matters most.",
  program: "/attachment-style-quiz",
  own: { href: "/attachment-style-quiz", label: "What's your own attachment style?", emoji: "🧸" },
  seo: {
    title: "Guess the Attachment Style: The Game | OopsCupid",
    description: "Twelve people, twelve dating moments. Guess who's secure, anxious, avoidant or fearful-avoidant and learn the four attachment styles as you play. Free.",
    og: "Secure, anxious, avoidant or fearful? Guess all 12.",
  },
};

const GASLIGHT = [o("gaslighting", "🌀", "Gaslighting"), o("dismissive", "🙄", "Dismissive"), o("fair", "🤝", "Fair enough")];

const GASLIGHTING: ChoiceGame = {
  slug: "gaslighting-or-not",
  title: "Gaslighting or not?",
  short: "Gaslighting or not?",
  emoji: "🌀",
  bg: "#C9B6FF",
  fg: "#3F2C6B",
  style: "scene",
  kicker: "🌀 spot it game · 12 moments",
  intro: "Not every argument is gaslighting. Some are just rude, and some are fine. Can you tell which is which?",
  question: "Is it gaslighting, dismissive, or fair enough?",
  options: GASLIGHT,
  rounds: [
    { id: "g1", prompt: "You remind him he promised to come to your sister's birthday. He says \"I never said that. You're making things up again.\"", answer: "gaslighting", why: "Denying what happened is one thing. Adding \"again\", so you start to see yourself as unreliable, is what makes it gaslighting." },
    { id: "g2", prompt: "\"Oh no, I thought dinner was Saturday! My bad. Can we do tomorrow?\"", answer: "fair", why: "An honest mix-up he owns straight away. No rewriting, no blame. This is how normal mistakes look." },
    { id: "g3", prompt: "You say his comment hurt. He says \"God, you can't take a joke.\"", answer: "dismissive", why: "He's not denying what happened, he's dismissing how you feel about it. Not gaslighting, but not great either if it's constant." },
    { id: "g4", prompt: "You have the screenshot of his message. He says \"That's not what I meant, and honestly it's paranoid that you keep screenshots.\"", answer: "gaslighting", why: "Faced with proof, he turns it into evidence that you're the problem. Making you doubt your own memory or sanity is the heart of gaslighting." },
    { id: "g5", prompt: "You both remember an argument differently. He says \"I remember it another way, but I believe it felt like that for you.\"", answer: "fair", why: "Different memories are normal. Holding his version while respecting yours is what a healthy disagreement looks like." },
    { id: "g6", prompt: "You mention he forgot your anniversary. He sighs: \"Can we not do this right now? I'm exhausted.\"", answer: "dismissive", why: "He's dodging the conversation, not rewriting reality. It's only a problem if \"not right now\" quietly becomes never." },
    { id: "g7", prompt: "He tells your friends you've been \"really unstable lately\" before you've even told them about the fight.", answer: "gaslighting", why: "Getting his version out first, so everyone doubts yours, is gaslighting that reaches beyond the two of you. It's also a big red flag." },
    { id: "g8", prompt: "\"I don't think I said that, but if I did, I'm sorry. That's not ok.\"", answer: "fair", why: "He doesn't remember, and he still takes it seriously. Nobody has to win the memory contest for an apology to happen." },
    { id: "g9", prompt: "You ask why he was two hours late. He says \"Traffic, ok? Stop interrogating me.\"", answer: "dismissive", why: "Defensive and a bit rude, and he's making a normal question sound unreasonable. But he isn't denying what happened." },
    { id: "g10", prompt: "He insists last week's argument never happened, even though his best friend was sitting right there.", answer: "gaslighting", why: "Flatly denying something that witnesses saw is textbook. If you ever feel you need a witness for your own relationship, trust that feeling." },
    { id: "g11", prompt: "You say he's been distant lately. He says \"You're right. I've been in my head about work. I'm sorry.\"", answer: "fair", why: "He hears you, agrees, explains and apologises. That's how feedback is supposed to land." },
    { id: "g12", prompt: "He forgot to pick you up. \"I completely forgot, that's on me. How can I make it up to you?\"", answer: "fair", why: "Forgetting happens. Owning it and offering to fix it is what makes it a mistake rather than a pattern." },
  ],
  ranks: [
    { min: 11, emoji: "🛡️", title: "Gaslight-Proof", line: "Nobody is rewriting your reality. You know exactly where the line is." },
    { min: 8, emoji: "🧠", title: "Clear-Headed", line: "You spot the real thing. The dismissive ones sometimes blur in, and that's the hardest line to draw." },
    { min: 5, emoji: "🌀", title: "A Bit Too Forgiving", line: "You give people the benefit of the doubt. Kind, but it helps to know where the line is." },
    { min: 0, emoji: "💗", title: "Too Trusting", line: "You assume the best of everyone. The guides below will help you trust your own read." },
  ],
  resultLabel: "Your gaslighting radar",
  note: "If a lot of these felt familiar from your own life, trust that. Doubting your memory all the time is a sign, not a personality flaw.",
  program: "/is-he-gaslighting-me",
  own: { href: "/is-he-gaslighting-me", label: "Is he gaslighting you?", emoji: "🌀" },
  seo: {
    title: "Gaslighting or Not? The Spot-It Game | OopsCupid",
    description: "Twelve real arguments. Is it gaslighting, just dismissive, or fair enough? Get the verdict and the reason after each one and learn where the line really is. Free.",
    og: "Gaslighting, dismissive, or fair enough? 12 moments.",
  },
};

const FRIEND = [o("real", "💖", "Real friend"), o("frenemy", "🐍", "Frenemy"), o("human", "🤷", "Just human")];

const FRENEMY: ChoiceGame = {
  slug: "friend-or-frenemy",
  title: "Friend or frenemy?",
  short: "Friend or frenemy?",
  emoji: "🐍",
  bg: "#B8F2D8",
  fg: "#0F4A34",
  style: "scene",
  kicker: "🐍 spot it game · 12 moments",
  intro: "Real friend, sneaky frenemy, or just a normal person having a normal week? Call it.",
  question: "Real friend, frenemy, or just human?",
  options: FRIEND,
  rounds: [
    { id: "f1", prompt: "You get a promotion. She screams \"well deserved!!\" and takes you for a drink.", answer: "real", why: "Being genuinely happy for you, loudly, is one of the clearest signs of a real friend. Envy can't fake that for long." },
    { id: "f2", prompt: "You get a promotion. She says \"Wow, they must have been desperate. Jk!!\"", answer: "frenemy", why: "A dig with \"jk\" on the end is still a dig. Frenemies put you down right when you're doing well." },
    { id: "f3", prompt: "She leaves your long message on read for two days, then sends a voice note apologising and answering everything.", answer: "human", why: "Life gets busy. She came back and gave it proper attention. That's not neglect, that's a normal friend." },
    { id: "f4", prompt: "She only ever calls when she's just been dumped.", answer: "frenemy", why: "A friendship that only exists during her crises is a one-way street. The Therapist Friend guide is for you." },
    { id: "f5", prompt: "Before your date she quietly tells you there's spinach in your teeth.", answer: "real", why: "Telling you the awkward truth, kindly and in private, is love. A frenemy would've let you walk in with it." },
    { id: "f6", prompt: "She tells the whole group you \"always get so dramatic about guys\".", answer: "frenemy", why: "Shaping how other people see you, when you're not there to answer, is classic frenemy behaviour." },
    { id: "f7", prompt: "She cancels twice this month because work is mad, and suggests a new date both times.", answer: "human", why: "Cancelling happens. Suggesting a new date every time shows she still wants to see you." },
    { id: "f8", prompt: "She compliments your outfit, then adds \"it's so brave. I could never wear that.\"", answer: "frenemy", why: "The backhanded compliment: praise at the front, a put-down hidden at the back. You feel weird afterwards for a reason." },
    { id: "f9", prompt: "Another friend tells you she stood up for you when you weren't there.", answer: "real", why: "What she says when you're not in the room is who she really is. This is the good stuff." },
    { id: "f10", prompt: "She's a bit quiet at your birthday because she's had a rough week.", answer: "human", why: "Friends are people with bad weeks. She still turned up, and that counts." },
    { id: "f11", prompt: "She starts dating your ex a week after the break-up, and you find out from her post.", answer: "frenemy", why: "Even if feelings happen, letting you find out from social media shows how little your feelings weighed." },
    { id: "f12", prompt: "She tells you once, honestly, that she doesn't love your new boyfriend. Then she drops it and supports you.", answer: "real", why: "Honest once, supportive after. That's the balance real friends manage and frenemies never do." },
  ],
  ranks: [
    { min: 11, emoji: "🛰️", title: "Elite Bestie Radar", line: "No snake gets past you. Your circle is lucky to have your judgement." },
    { min: 8, emoji: "💅", title: "Good Judge of Character", line: "You spot most of them. The sneaky ones sometimes pass as normal." },
    { min: 5, emoji: "🧁", title: "Too Nice for Your Own Good", line: "You see the best in people. Lovely, and exactly what frenemies count on." },
    { min: 0, emoji: "🤗", title: "Everyone's Bestie", line: "You trust everyone. Time to learn the signs so your kindness goes to the right people." },
  ],
  resultLabel: "Your friendship radar",
  program: "/is-my-best-friend-toxic",
  own: { href: "/friend-vs-friend", label: "Compare two of your friends", emoji: "👯" },
  seo: {
    title: "Friend or Frenemy? The Spot-It Game | OopsCupid",
    description: "Twelve friendship moments. Real friend, frenemy, or just human? Get the verdict and the reason after each one and sharpen your friendship radar. Free.",
    og: "Real friend or frenemy? Call all 12.",
  },
};

export const CHOICE_GAMES: ChoiceGame[] = [DECODE, ATTACHMENT, GASLIGHTING, FRENEMY];

export function choiceGame(slug: string) {
  return CHOICE_GAMES.find((g) => g.slug === slug);
}

export function optionsFor(game: ChoiceGame, round: ChoiceRound) {
  return round.options ?? game.options ?? [];
}

export function choiceRank(game: ChoiceGame, score: number) {
  return game.ranks.find((r) => score >= r.min)!;
}

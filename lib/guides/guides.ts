/**
 * MINI GUIDES, €1.99 each.
 *
 * The thing a short test should sell is not a longer test: it is an
 * explanation of the exact thing she just recognised. Someone who ticked
 * "checked when he was last online" wants to know why she does it and
 * whether it means anything, today, for the price of a coffee.
 *
 * Each guide is a ten-minute read: a hook, what's actually happening
 * (the real psychology, named honestly), how to tell a pattern from
 * overthinking, what's normal and what's a red flag, and what to do. The
 * first section is free, so she knows what she's buying and search engines
 * can find it. The rest unlocks for €1.99, or with the €9.99 report, which
 * unlocks every guide and every read.
 *
 * Tone: a clever friend who has read the research. Fun, never flippant
 * about harm. British English, no dashes.
 */

export interface GuideSection {
  title: string;
  body: string[];
  /** Optional list, rendered as bullets or a checklist. */
  list?: string[];
  /** Optional two-column comparison. */
  compare?: { left: string; right: string; rows: [string, string][] };
  /** Optional script box. */
  script?: string;
}

export interface Guide {
  slug: string;
  title: string;
  hook: string;
  emoji: string;
  bg: string;
  fg: string;
  minutes: number;
  /** Short tests this guide belongs under, and tick groups that trigger it. */
  forTests: string[];
  forGroups?: string[];
  sections: GuideSection[];
  takeaway: string;
  sources: string;
}

export const GUIDES: Guide[] = [
  {
    slug: "last-seen-spiral",
    title: "The Last-Seen Spiral",
    hook: "Why you keep checking if he's online, and what it actually means (spoiler: less than it feels like).",
    emoji: "👀",
    bg: "#DDEFE8",
    fg: "#1F4A3E",
    minutes: 9,
    forTests: ["decode-his-text", "guess-the-attachment-style", "waiting-for-his-reply", "is-he-just-not-that-into-you", "things-he-does", "after-a-good-weekend"],
    forGroups: ["checking", "rehearsing", "body", "story"],
    sections: [
      {
        title: "You're not crazy, you're wired",
        body: [
          "It's 11.40pm. He said goodnight at 11. You open the chat just to look, and there it is: online. Your stomach drops before you've had a single thought.",
          "That drop is not you being dramatic. It is one of the oldest systems in your brain doing its job. Humans survived by staying close to the people they depended on, and the brain built an alarm that fires when someone important seems to be drifting away. For some people that alarm is set very sensitive. A green dot, a slow reply, a changed tone, and it goes off like a smoke detector reacting to toast.",
          "This guide is about that alarm: why checking feels like it helps, why it never does, and how to tell the difference between your gut noticing something real and your alarm noticing nothing at all.",
        ],
      },
      {
        title: "Why checking feels so good (for about four minutes)",
        body: [
          "Checking works like a tiny slot machine. Most of the time you see nothing new. Occasionally you see something: he's online, he posted, he liked someone's photo. That unpredictability is exactly what makes it compulsive. Psychologists have known since B. F. Skinner's experiments that rewards which arrive at random produce the most stubborn habits of all.",
          "And there's a nastier twist. Research by Marcel van den Hout, Merel Kindt and Adam Radomsky found that the more people check something, the less sure they become about it. Checking doesn't settle doubt. It feeds it.",
        ],
        list: [
          "You check. For a moment, relief, or a new clue.",
          "The doubt comes back, slightly bigger.",
          "Your brain remembers checking helped last time.",
          "You check again. Round and round.",
        ],
      },
      {
        title: "What a green dot actually tells you",
        body: [
          "Here is what \"online\" means on most apps: the app was open. That's it. He could be replying to his mum, reading football scores, checking a work group, or asleep with the app open. Last seen tells you when a phone was touched, not who a person was thinking about.",
          "The story your brain attaches to it (\"he's talking to someone else\", \"he's lost interest\") arrives so fast it feels like knowledge. It isn't. It's a guess wearing a disguise.",
        ],
      },
      {
        title: "Pattern or overthinking? The three-question test",
        body: [
          "Sometimes your gut is right. The trick is knowing which signals deserve attention. Ask these three questions about anything that's worrying you:",
        ],
        list: [
          "Have I seen it, or am I inferring it? \"He was online at midnight\" is seen. \"He was messaging a girl\" is inferred.",
          "Has it happened repeatedly, over weeks, or once? Patterns repeat. Moments don't mean much.",
          "Has something changed? A new habit that started recently tells you more than an old one he's always had.",
        ],
        compare: {
          left: "Probably overthinking",
          right: "Worth a calm conversation",
          rows: [
            ["He was online late once", "Late nights he won't explain, for weeks"],
            ["Slow reply on a busy day", "Always slow, but instant with everyone else"],
            ["He liked someone's photo", "A new secretive phone habit since March"],
            ["You feel anxious", "His story didn't match what someone else said"],
          ],
        },
      },
      {
        title: "Why some people check and others don't",
        body: [
          "Attachment researchers Mario Mikulincer and Phillip Shaver describe \"hyperactivating\" strategies: when people with an anxious attachment style feel distance, they turn the alarm up and reach for reassurance. Checking is the modern version of standing at the window.",
          "If your early relationships were unpredictable, warm one day and distant the next, your brain learned to scan for signs of distance constantly. That scanning kept you safe once. Now it keeps you awake.",
        ],
      },
      {
        title: "When it IS a red flag",
        body: [
          "Checking is usually about your alarm, not his behaviour. But your gut deserves a hearing when it is picking up a cluster of changes: new secrecy, stories that don't add up, less affection, defensiveness when you ask normal questions. Several of those together, lasting weeks, is worth one calm, direct conversation. Not a stake-out.",
        ],
      },
      {
        title: "What to do tonight instead of checking",
        body: [
          "You can't think your way out of an alarm. You have to calm the body first, then decide.",
        ],
        list: [
          "Put the phone in another room. Distance breaks the loop.",
          "Breathe in for four, out for six, five times. The long out-breath slows your heart.",
          "Write down the thought (\"he's talking to someone\") and next to it, what you actually know.",
          "Set a rule: no checking after 10pm. When you slip, just start again.",
          "If something real is bothering you, ask him directly, in daylight, once.",
        ],
        script: "\"Hey, can I ask you something without it being a big deal? I've noticed you've been on your phone late a lot recently and my brain's been running with it. Is everything okay?\"",
      },
    ],
    takeaway: "A green dot is a phone being used, not a verdict on you. Ask, don't check.",
    sources: "Draws on attachment research (Bowlby; Mikulincer and Shaver), research on checking and memory distrust (van den Hout and Kindt; Radomsky), and reinforcement research (Skinner).",
  },
  {
    slug: "pattern-or-overthinking",
    title: "Pattern or Overthinking?",
    hook: "How to tell when he's actually doing something, and when your brain is writing fan fiction.",
    emoji: "🧠",
    bg: "#E9E2F7",
    fg: "#3F2C6B",
    minutes: 10,
    forTests: ["decode-his-text", "things-he-does", "things-he-says", "is-he-just-not-that-into-you", "is-it-a-situationship", "waiting-for-his-reply"],
    forGroups: ["stories", "secrecy", "effort", "reality"],
    sections: [
      {
        title: "The question under every relationship worry",
        body: [
          "\"Am I overthinking this?\" Everybody asks it, and most people answer it badly, either by talking themselves out of real problems or into imaginary ones.",
          "The good news: there's a method. It's not about trusting your gut or ignoring it. It's about separating three things your brain loves to blend together: what happened, what you fear, and the story that joins them up.",
        ],
      },
      {
        title: "Facts, fears and stories",
        body: [
          "A fact is something you saw or heard: he got home at 11, not 10. A fear is what it makes you feel: he's losing interest. A story is the full movie your mind makes: he was with someone from work, laughing, planning to leave.",
          "The story always feels the most real, because it's the most detailed. But the detail came from you, not from him. Therapists using Aaron Beck's cognitive therapy teach people to write these three things in separate columns, because on paper the difference becomes obvious.",
        ],
        compare: {
          left: "Fact",
          right: "Story",
          rows: [
            ["He didn't text back for 5 hours", "He's with someone else"],
            ["He changed his passcode", "He's hiding a whole second life"],
            ["He seemed quiet at dinner", "He's about to break up with me"],
          ],
        },
      },
      {
        title: "The three Rs: Repeated, Recent, Real",
        body: ["Before you act on a worry, run it through three filters:"],
        list: [
          "Repeated: has it happened more than once, over weeks? One late night is life. Every Thursday is a pattern.",
          "Recent: is it a change? Something that started recently says more than a habit he's always had.",
          "Real: did you see it, or infer it? Only count what you'd be able to describe to a friend without the words \"I think\" or \"probably\".",
        ],
      },
      {
        title: "Your brain's favourite tricks",
        body: ["These are the thinking traps cognitive therapists see most in relationship worry:"],
        list: [
          "Mind reading: \"He's annoyed with me\" (he hasn't said anything).",
          "Fortune telling: \"This is going to end badly.\"",
          "Personalising: \"He's quiet, so it's something I did.\"",
          "Confirmation bias: noticing everything that fits the fear, missing everything that doesn't.",
        ],
      },
      {
        title: "Why you can't just read his face",
        body: [
          "If you're hoping to catch the truth in his expression: a huge 2006 review of lie-detection studies by Charles Bond and Bella DePaulo found people spot lies at about 54% accuracy. That's barely better than a coin toss. Nervous faces, pauses, looking away: all weak evidence. Anxious people are even more likely to see guilt where there's none.",
          "What works better is patterns over time and things you can check: stories that don't match, times that don't add up, changes that keep happening.",
        ],
      },
      {
        title: "When it's a pattern: what to do",
        body: [
          "If something passes the three Rs, it's not overthinking. It deserves one calm, direct conversation. Describe what you've seen (facts only), say how it makes you feel, and ask a clear question.",
        ],
        script: "\"The last three Thursdays you've been home late and said it was work, but you're usually home by seven. I'm not accusing you of anything, I just feel shut out. What's going on?\"",
      },
      {
        title: "When it's overthinking: what to do",
        body: ["If it doesn't pass, the problem is the alarm, not him. Calm the body, write the thought down with the facts next to it, and give the worry a set time: fifteen minutes at 6pm, not all night. Worry postponed is worry weakened."],
      },
    ],
    takeaway: "Repeated, recent and real deserves a conversation. Everything else deserves a walk.",
    sources: "Draws on cognitive therapy (Beck), research on thinking errors, and lie-detection research (Bond and DePaulo, 2006).",
  },
  {
    slug: "red-flag-field-guide",
    title: "The Red Flag Field Guide",
    hook: "Red, orange or just annoying? A spotter's guide to what actually matters in a new relationship.",
    emoji: "🚩",
    bg: "#FCE3D8",
    fg: "#7A2E14",
    minutes: 10,
    forTests: ["gaslighting-or-not", "red-flag-or-green-flag", "first-month-red-flags", "is-my-boyfriend-toxic", "does-he-have-narcissistic-traits", "things-he-says"],
    forGroups: ["intensity", "boundaries", "character", "control", "disrespect"],
    sections: [
      {
        title: "Not every flag is red",
        body: [
          "TikTok has made everything a red flag. He likes pineapple on pizza? Red flag. He texts in full stops? Red flag. The result is that real warning signs get lost in the noise.",
          "This guide sorts them into three colours: beige flags (quirks that are just annoying), orange flags (worth watching), and red flags (take seriously, fast).",
        ],
      },
      {
        title: "Beige flags: annoying, not dangerous",
        body: ["These might drive you mad. They say nothing about how he'll treat you:"],
        list: [
          "Bad texter, same with everyone",
          "Forgets things, including his own plans",
          "Messy, or weirdly tidy",
          "Different taste in films, food, music, holidays",
          "Takes a while to open up",
        ],
      },
      {
        title: "Orange flags: watch these",
        body: ["On their own they're not a verdict. Together, or repeated, they start to mean something:"],
        list: [
          "Every ex was \"crazy\"",
          "Just out of something, or not quite out of it",
          "Hot and cold: all in one week, distant the next",
          "Rude to waiters, lovely to you",
          "Jokes at your expense, then \"relax, it's a joke\"",
          "Your friends aren't sure about him",
        ],
      },
      {
        title: "Red flags: take these seriously",
        body: ["These are the ones researchers and domestic abuse services consistently flag, because they predict how someone will treat you later:"],
        list: [
          "He pushes after you say no, even about small things",
          "He sulks or punishes you for seeing friends",
          "Intensity too fast: \"I've never felt like this\" in week one, talking about moving in on date three",
          "He wants to know where you are all the time",
          "He never apologises, or apologises only for \"how you feel\"",
          "Contempt: eye-rolling, mocking, making you feel stupid",
        ],
      },
      {
        title: "The small-no test",
        body: [
          "The single most useful red flag detector is free and takes ten seconds. Early on, say a small no. \"I'd rather not stay out late tonight.\" \"Can we do Saturday instead?\"",
          "A good partner takes it in their stride. A poor one sulks, pushes, guilt-trips or goes cold. How someone handles a small no early is the best preview you'll get of how they'll handle a big one later.",
        ],
      },
      {
        title: "Why love bombing feels so good",
        body: [
          "Very fast, very intense attention feels like chemistry. A small 2017 study linked love bombing to narcissistic traits, and domestic abuse services describe it as a common early stage in controlling relationships. The intensity isn't proof he loves you. It's often proof he's in a hurry.",
          "Healthy interest survives you slowing down. If slowing down gets punished, that's the answer.",
        ],
      },
      {
        title: "Contempt: the flag researchers rate highest",
        body: [
          "John Gottman, who has studied thousands of couples, found contempt (mockery, eye-rolling, sneering) to be the single strongest predictor of a relationship failing. If he looks down on you, it tends to get worse, not better.",
        ],
      },
      {
        title: "What to do when you spot one",
        body: [
          "Beige: live with it or leave it, it's taste. Orange: watch, and raise it once, calmly. Red: believe it the first time. You don't need three examples of someone pushing past your no.",
          "If a red flag is about control or fear, please talk to someone outside the relationship. In the UK, Refuge runs a free 24-hour line on 0808 2000 247.",
        ],
      },
    ],
    takeaway: "Beige: taste. Orange: watch. Red: believe it the first time.",
    sources: "Draws on John Gottman's research on contempt, domestic abuse guidance on early warning signs, and a 2017 study on love bombing and narcissism.",
  },
  {
    slug: "hot-and-cold",
    title: "Hot and Cold",
    hook: "Why the guy who confuses you is the one you can't stop thinking about, and how to break the spell.",
    emoji: "🎰",
    bg: "#FBE0E6",
    fg: "#7A1F35",
    minutes: 9,
    forTests: ["guess-the-attachment-style", "red-flag-or-green-flag", "after-a-good-weekend", "first-month-red-flags", "is-he-just-not-that-into-you", "is-it-a-situationship"],
    forGroups: ["hotcold", "withdraw", "return", "convenience", "pressure"],
    sections: [
      {
        title: "The slot machine in your phone",
        body: [
          "He's amazing all weekend. Then three days of one-word replies. Then he's back, sweeter than ever, and the relief is so big it feels like love.",
          "If you've wondered why this kind of guy is so much harder to let go of than a steady, kind one, the answer is one of the best-known findings in psychology.",
        ],
      },
      {
        title: "Intermittent reinforcement, explained",
        body: [
          "In the 1950s B. F. Skinner found that animals rewarded every time learned a behaviour, but animals rewarded unpredictably learned it harder and kept going long after the rewards stopped. It's the principle slot machines are built on.",
          "Hot-and-cold affection is the same schedule. You never know when the warmth is coming, so every return hits like a jackpot. Researchers studying why people stay attached to partners who treat them badly, notably Donald Dutton and Susan Painter, point to exactly this pattern.",
        ],
      },
      {
        title: "Why calm feels boring",
        body: [
          "A steady person never gives you the drop, so they never give you the jackpot of relief. That can feel flat at first. It's not that they offer less. It's that they don't put you through the fall before the high.",
          "In a famous 1974 study, men on a scary swaying bridge were more attracted to a woman they met there than men on a solid one: their pounding hearts were read as attraction. Uncertainty does the same thing.",
        ],
      },
      {
        title: "What's going on with him",
        body: [
          "Sometimes hot and cold is avoidant attachment: closeness sets off his alarm, so he pulls back after the good times, then misses you and returns. Sometimes it's that he likes the attention but not the commitment. And sometimes it's deliberate. You can't always tell which, and here's the thing: you don't need to. The effect on you is the same.",
        ],
        compare: {
          left: "Normal ups and downs",
          right: "Hot and cold",
          rows: [
            ["Quieter in a stressful week, tells you why", "Vanishes after the best weekends, no explanation"],
            ["Consistent effort, varying energy", "Huge effort, then almost none"],
            ["You feel secure most of the time", "You feel anxious most of the time"],
          ],
        },
      },
      {
        title: "How to break the spell",
        list: [
          "Name it. When the relief hits, say to yourself: that's the jackpot feeling, not proof of love.",
          "Stop chasing during the cold. Chasing is what makes the return feel like a win.",
          "Judge him by the average, not the highs. What is he like on a normal Tuesday?",
          "Ask for consistency, once, clearly. Watch what he does, not what he promises.",
        ],
        body: [],
        script: "\"I really like the time we spend together, but when you go quiet for days afterwards I don't know where I stand. I need a bit more consistency than that. Is that something you want too?\"",
      },
    ],
    takeaway: "The high feels like love because of the low before it. Judge him on a normal Tuesday.",
    sources: "Draws on reinforcement research (Skinner), traumatic bonding research (Dutton and Painter), misattribution of arousal (Dutton and Aron, 1974) and attachment research.",
  },
  {
    slug: "too-sensitive",
    title: "\"You're Too Sensitive\"",
    hook: "The sentences that end arguments without answering them, decoded one by one.",
    emoji: "🌀",
    bg: "#E3E6F8",
    fg: "#27306B",
    minutes: 9,
    forTests: ["gaslighting-or-not", "decode-his-text", "things-he-says", "is-my-boyfriend-toxic", "does-he-have-narcissistic-traits", "him-vs-your-ex"],
    forGroups: ["reality", "blame", "minimising", "character", "fragile", "mask"],
    sections: [
      {
        title: "Why you always end up apologising",
        body: [
          "You raise something that bothered you. Ten minutes later, you're apologising, and you can't remember how you got there. The original thing never got discussed.",
          "That's not bad luck. Certain sentences move a conversation off the subject and onto you. Once you can hear them, they stop working.",
        ],
      },
      {
        title: "\"That never happened\" / \"You're remembering it wrong\"",
        body: [
          "These dispute the event itself, so there's nothing left to discuss. Said once, it can be genuine disagreement. Said every time, it's a pattern researchers call gaslighting: making someone doubt their own memory. The sociologist Paige Sweet describes it as working best when there's an imbalance of power, so the other person's version wins by default.",
          "Your antidote: write things down at the time. Not to win arguments, but so you can trust your own memory.",
        ],
      },
      {
        title: "\"You're too sensitive\" / \"You're overreacting\"",
        body: [
          "These move the topic from what he did to how you reacted. Now you're defending your personality, and the thing he did quietly disappears.",
          "The tell: you can be sensitive AND right. Both can be true at once.",
        ],
        script: "\"Maybe I am sensitive. I'd still like to talk about what happened.\"",
      },
      {
        title: "\"It was a joke\" / \"Relax\"",
        body: ["This reclassifies something hurtful as too small to mind, which makes minding it the problem. Jokes that only ever land on you, and only ever hurt, aren't jokes."],
      },
      {
        title: "\"After everything I've done for you\"",
        body: ["This turns the relationship into a debt, so asking for anything makes you ungrateful. Kindness given as a bargaining chip isn't kindness."],
      },
      {
        title: "\"Fine, maybe we should just end it then\"",
        body: ["This puts the whole relationship on the table over a small disagreement, so the cost of holding your position becomes losing everything. If this happens often, it's a way of winning, not a real offer."],
      },
      {
        title: "One sentence that works on all of them",
        body: [
          "You don't need to win the argument about reality. You just need to not give up your version of it. Stay on the subject, calmly, without escalating:",
        ],
        script: "\"We remember it differently. I'm not going to argue about that. I'd still like to talk about how it made me feel.\"",
        list: [
          "Say it once, calmly.",
          "Don't accept a change of subject.",
          "If it keeps happening, notice that too. It's information.",
        ],
      },
      {
        title: "When to worry",
        body: ["One bad argument is one bad argument. The same sentences, every time, especially with control over your friends, money or time, are a pattern worth talking to someone outside the relationship about. In the UK, Refuge: 0808 2000 247."],
      },
    ],
    takeaway: "You can be sensitive and right at the same time. Stay on the subject.",
    sources: "Draws on research on gaslighting (Sweet, 2019), DARVO (Freyd) and DBT interpersonal skills (Linehan).",
  },
  {
    slug: "frenemy-files",
    title: "The Frenemy Files",
    hook: "How to spot the friend who isn't happy for you, and what to do without starting a war.",
    emoji: "🐍",
    bg: "#FDEBD3",
    fg: "#6B3E0E",
    minutes: 9,
    forTests: ["friend-or-frenemy", "things-my-friend-says", "friend-vs-friend", "is-my-friend-a-pick-me", "are-you-the-therapist-friend"],
    forGroups: ["envy", "taking", "digs", "guilt", "gossip", "effort", "rival", "oneway"],
    sections: [
      {
        title: "The good-news test",
        body: [
          "Want to know who your real friends are? Forget who shows up in a crisis. Most people are decent in a crisis. Watch what happens when you share good news.",
          "Psychologist Shelly Gable studied exactly this. She found four ways people respond to good news, and only one of them, enthusiastic, curious, \"tell me everything\", was linked to close, satisfying relationships.",
        ],
        compare: {
          left: "Builds you up",
          right: "Brings you down",
          rows: [
            ["\"That's amazing! How did it happen?\"", "\"Nice.\" Back to their weekend"],
            ["\"Let's celebrate\"", "\"Won't that be stressful though?\""],
            ["Asks questions", "\"Must be nice\""],
          ],
        },
      },
      {
        title: "Why some friends can't be happy for you",
        body: [
          "Envy is human. Everyone feels it sometimes. The difference is what people do with it. A good friend feels a pang and still celebrates you. A frenemy lets the envy leak out as digs, deflation or competition.",
          "Research on \"ambivalent\" relationships (both supportive and upsetting) by Julianne Holt-Lunstad found they were linked to higher blood pressure than purely supportive ones. Mixed friendships can be more stressful than openly bad ones, because you never know which version you'll get.",
        ],
      },
      {
        title: "The frenemy checklist",
        list: [
          "Your good news gets a flat response, or a catch",
          "Compliments with a sting: \"You look great, have you lost weight finally?\"",
          "\"I'm just being honest\" before something unkind",
          "They gossip about others to you (assume they gossip about you too)",
          "They're lovely one to one, different in a group",
          "You leave feeling slightly worse than when you arrived",
        ],
        body: [],
      },
      {
        title: "The walk-home test",
        body: ["After seeing a friend, notice how you feel on the way home. Lighter and more yourself? Or tired, smaller, replaying things they said? Your body often knows before your head admits it."],
      },
      {
        title: "Fade, talk or end?",
        body: ["Most friendships don't need a dramatic ending. Choose one:"],
        list: [
          "Talk: they're a good friend going through something. One honest conversation might fix it.",
          "Fade: fewer, shorter contacts, slower replies, no announcement. Best when a conversation wouldn't be heard.",
          "End: only when it's genuinely harmful, like betrayal or cruelty, or they won't let a fade happen.",
        ],
        script: "\"I've noticed when I share good stuff it sometimes feels like it lands flat, and it's made me hold back with you. I don't want that. Is everything okay with us?\"",
      },
    ],
    takeaway: "Watch how a friend handles your good news. It tells you more than any crisis.",
    sources: "Draws on Shelly Gable's research on responses to good news and Julianne Holt-Lunstad's research on ambivalent relationships.",
  },
  {
    slug: "why-you-run",
    title: "Why You Run When It's Good",
    hook: "The self-sabotage guide: why closeness makes you want to bolt, and how to stay ten minutes longer.",
    emoji: "🏃‍♀️",
    bg: "#D8F0EE",
    fg: "#134A45",
    minutes: 9,
    forTests: ["guess-the-attachment-style", "when-it-gets-serious", "am-i-the-toxic-one"],
    forGroups: ["exit", "distance", "test", "numb", "worth", "punish", "fight"],
    sections: [
      {
        title: "It always happens when it's going well",
        body: [
          "The weekend was perfect. They said something lovely. And by Tuesday, their laugh is annoying and you're wondering if you even like them.",
          "If that sounds familiar, you're not heartless and you're not broken. There's a name for it, and a reason.",
        ],
      },
      {
        title: "Your protection system, misfiring",
        body: [
          "Attachment researchers Mario Mikulincer and Phillip Shaver describe \"deactivating strategies\": automatic ways people turn closeness down when it starts to feel like too much. Suddenly noticing flaws. Thinking about an ex. Getting very busy. Losing interest overnight.",
          "They usually come from somewhere. If, growing up, needing people led to disappointment, your brain learned that closeness is where you get hurt. So when closeness grows, the alarm goes off. It's protection. It's just protecting you from the wrong things now.",
        ],
      },
      {
        title: "The tests you don't know you're running",
        body: [
          "Some people run. Others push to see if the other person will stay: picking fights, going cold, being at their worst. Each is a question in disguise: \"Will you still want me if...?\"",
          "Geraldine Downey's research on rejection sensitivity found this can become a self-fulfilling prophecy: expecting rejection makes people act in ways that bring it about.",
        ],
      },
      {
        title: "Sabotage or genuine incompatibility?",
        compare: {
          left: "Probably sabotage",
          right: "Probably incompatible",
          rows: [
            ["The doubts arrive right after closeness", "The doubts are there all the time"],
            ["The flaws are tiny (chewing, texting)", "The issues are big (values, respect)"],
            ["It happens with everyone good", "It's specific to this person"],
            ["You feel relief when plans cancel", "You feel dread about who they are"],
          ],
        },
        body: [],
      },
      {
        title: "How to stay ten minutes longer",
        list: [
          "Notice the moment. Say it in your head: \"This is the alarm, not the truth.\"",
          "Stay ten minutes longer than the urge wants. The urge rises, peaks and falls on its own.",
          "Need space? Take it, but name a return time instead of vanishing.",
          "Replace the test with the real question.",
        ],
        body: [],
        script: "\"I'm feeling a bit overwhelmed, it's not you. I need a quiet night and I'll call you tomorrow after work.\"",
      },
    ],
    takeaway: "The urge to run is loudest when it's going well. That's the moment to stay ten minutes longer.",
    sources: "Draws on attachment research (Mikulincer and Shaver), rejection sensitivity (Downey) and exposure-based therapy.",
  },
  {
    slug: "what-are-we",
    title: "The \"What Are We?\" Guide",
    hook: "How to ask the scariest question in modern dating without scaring yourself, or him.",
    emoji: "🌫️",
    bg: "#E2EEF3",
    fg: "#1F4552",
    minutes: 8,
    forTests: ["decode-his-text", "is-it-a-situationship", "is-he-just-not-that-into-you"],
    forGroups: ["label", "shape", "world", "you", "said", "hidden"],
    sections: [
      {
        title: "Why the question feels impossible",
        body: [
          "You've been seeing each other for months. You text every day. You've met nobody in his life. And you'd rather eat glass than ask \"what are we?\", because what if the answer ends it?",
          "Here's the uncomfortable truth: if asking a normal question could end it, the thing you'd be losing isn't very sturdy.",
        ],
      },
      {
        title: "Sliding vs deciding",
        body: [
          "Relationship researchers Scott Stanley and Galena Rhoades describe two ways couples move forward: sliding (drifting into the next stage without discussing it) and deciding (talking about it and choosing). Relationships where the big steps are slid into tend to go less well.",
          "Situationships are sliding with no end. Undefined suits whoever wants less. Usually that's not the person reading this guide.",
        ],
      },
      {
        title: "Signs you want more than it's giving",
        list: [
          "You'd be hurt if he dated someone else",
          "You pretend you're fine with \"no labels\"",
          "You plan your week around when he might be free",
          "You've never been on a proper date",
          "You feel anxious more than happy",
        ],
        body: [],
      },
      {
        title: "How to ask (without the drama)",
        list: [
          "Pick a calm moment, in daylight, not after sex or drinks.",
          "Talk about what you want, not what he's doing wrong.",
          "Keep it short. Then stop talking and let him answer.",
        ],
        body: [],
        script: "\"I really like what we've got. I've realised I want something more defined, and I'd rather know where you're at than keep guessing. What do you want this to be?\"",
      },
      {
        title: "Reading the answer",
        compare: {
          left: "Good sign",
          right: "Believe him",
          rows: [
            ["\"Me too, I didn't want to rush you\"", "\"I'm not looking for anything serious\""],
            ["Clear, and his actions change", "\"Let's just see where it goes\" (again)"],
            ["He brings it up again himself", "He goes quiet for days afterwards"],
          ],
        },
        body: ["When someone tells you they don't want something serious, the kindest thing you can do for yourself is believe them the first time."],
      },
    ],
    takeaway: "If asking a normal question could end it, you already have your answer.",
    sources: "Draws on research on sliding versus deciding (Stanley and Rhoades) and attachment research.",
  },
  {
    slug: "therapist-friend",
    title: "The Therapist Friend's Survival Guide",
    hook: "For the one everyone calls at 2am. How to stop being everyone's therapist and nobody's friend.",
    emoji: "🛋️",
    bg: "#E4F2E0",
    fg: "#2C4F22",
    minutes: 8,
    forTests: ["friend-or-frenemy", "are-you-the-therapist-friend", "things-my-friend-says", "friend-vs-friend"],
    forGroups: ["role", "oneway", "cost", "taking", "effort"],
    sections: [
      {
        title: "Being needed isn't the same as being cared for",
        body: [
          "You're the one everyone texts when something goes wrong. You're good at it. And somewhere along the way, you noticed that when you're the one who's struggling, the phone goes quiet.",
          "It's not that nobody cares. It's that you've trained everyone to think you're fine.",
        ],
      },
      {
        title: "Where the role comes from",
        body: [
          "Many therapist friends were therapist children: the one who kept the peace, looked after a parent, or never caused trouble. Schema therapy calls this pattern self-sacrifice: meeting other people's needs at the expense of your own, because being useful feels like the safest way to be loved.",
        ],
      },
      {
        title: "Signs the role is costing you",
        list: [
          "You're drained after certain friends, even when nothing bad happened",
          "You feel guilty not replying straight away",
          "You say \"I'm fine\" and change the subject",
          "You secretly wish someone would ask how you are",
        ],
        body: [],
      },
      {
        title: "Three tiny experiments",
        list: [
          "Say no once, without a reason: \"I can't tonight, but I hope it goes okay.\"",
          "Ask for something small from a friend you usually support.",
          "Stop initiating with one draining friend for two weeks and see who reaches out.",
        ],
        body: [
          "Research by Francis Flynn and Vanessa Bohns found people hugely underestimate how willing others are to help when asked. You're probably assuming a no that would never come.",
        ],
        script: "\"Can I actually vent to you for a minute? I've had a rubbish week and I could do with a friend.\"",
      },
    ],
    takeaway: "You're allowed to go first. The right friends will be glad you did.",
    sources: "Draws on schema therapy (Young), research on asking for help (Flynn and Bohns) and DBT interpersonal skills.",
  },
  {
    slug: "clueless-or-careless",
    title: "Clueless or Careless?",
    hook: "Is he genuinely oblivious, or just not paying attention to you? How to tell, and what to say.",
    emoji: "🤷‍♂️",
    bg: "#FFF1C9",
    fg: "#6A4B00",
    minutes: 7,
    forTests: ["is-my-boyfriend-stupid", "is-he-a-mamas-boy", "after-a-good-weekend", "him-vs-your-ex"],
    forGroups: ["house", "hints", "feelings", "memory", "sides", "shutdown"],
    sections: [
      {
        title: "The ketchup problem",
        body: [
          "He asks where the ketchup is. It's in front of him. He didn't notice you were upset for an entire evening. He forgot your mum's name, again.",
          "Is he stupid? Almost certainly not. But the more useful question is whether he's clueless (fixable, often funny) or careless (a different conversation entirely).",
        ],
      },
      {
        title: "Why hints don't work",
        body: [
          "A lot of couples fight about hints. One person drops them; the other misses them; resentment builds. Couples researchers find again and again that clear, direct requests work far better than hoping to be guessed. Mind reading isn't a love language.",
        ],
      },
      {
        title: "Clueless vs careless",
        compare: {
          left: "Clueless",
          right: "Careless",
          rows: [
            ["Misses the hint, fixes it once told", "Hears you, doesn't change"],
            ["Forgets stuff, feels bad about it", "Forgets stuff, says you're dramatic"],
            ["Tries to fix it when you wanted a hug", "Rolls his eyes when you're upset"],
            ["Remembers what matters when reminded", "Only remembers what matters to him"],
          ],
        },
        body: [],
      },
      {
        title: "How to talk to a clueless man",
        list: [
          "Be embarrassingly specific: not \"help more\", but \"can you do the bins every Tuesday\".",
          "Say what you want emotionally: \"I don't need solutions, I need a hug.\"",
          "Praise it when he gets it right. It works on everyone.",
        ],
        body: [],
        script: "\"When I'm upset I don't need you to fix it, I just need you to ask what's wrong and listen. Can you try that next time?\"",
      },
      {
        title: "If it's careless",
        body: ["If you've been clear, more than once, and nothing changes, it's not about intelligence. It's about priority. That's worth a more serious conversation, and it's worth noticing how he responds to it."],
      },
    ],
    takeaway: "Clueless learns when told. Careless doesn't. Tell him once, clearly, and watch.",
    sources: "Draws on couples research on direct communication and responsiveness.",
  },
];

export function guideBySlug(slug: string) {
  return GUIDES.find((g) => g.slug === slug);
}

/** The guides to offer on a short test's result, best match first. */
export function guidesFor(testSlug: string, groups: string[] = [], max = 3): Guide[] {
  const scored = GUIDES.map((g) => {
    let s = 0;
    if (g.forTests.includes(testSlug)) s += 2;
    s += (g.forGroups ?? []).filter((x) => groups.includes(x)).length;
    return { g, s };
  })
    .filter((x) => x.s > 0)
    .sort((a, b) => b.s - a.s);
  return scored.slice(0, max).map((x) => x.g);
}

export const GUIDE_PRICE = "€1.99";

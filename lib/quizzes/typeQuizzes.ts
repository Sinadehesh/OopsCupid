/**
 * "Which one are you?" quizzes: a handful of quick questions, every answer
 * votes for a type, and the result is a type worth posting ("I got The
 * Detective"). It's the most shared quiz format there is, so these exist
 * to travel. Each type still says one true, useful thing, and every result
 * leads into the full test that can say more.
 *
 * Kept free of imports from the other quiz files so anything can import it.
 */

export interface TypeProfile {
  emoji: string;
  title: string;
  /** The shareable one-liner. */
  line: string;
  /** What it actually means, in two or three sentences. */
  body: string;
  strength: string;
  watch: string;
  tip: string;
}

export interface TypeOption {
  t: string;
  emoji: string;
  label: string;
}

export interface TypeQuestion {
  id: string;
  prompt: string;
  options: TypeOption[];
}

export interface TypeQuiz {
  slug: string;
  title: string;
  short: string;
  emoji: string;
  bg: string;
  fg: string;
  kicker: string;
  intro: string;
  /** Above the result title, e.g. "Your toxic trait is". */
  resultLabel: string;
  types: Record<string, TypeProfile>;
  questions: TypeQuestion[];
  /** Shown under every result, e.g. where the idea comes from. */
  note?: string;
  own: { href: string; label: string; emoji: string };
  program?: string;
  seo: { title: string; description: string; og: string; about: string };
}

type Opt = [type: string, emoji: string, label: string];
const q = (id: string, prompt: string, ...opts: Opt[]): TypeQuestion => ({
  id,
  prompt,
  options: opts.map(([t, emoji, label]) => ({ t, emoji, label })),
});

const DATING_TENDENCIES: TypeQuiz = {
  slug: "dating-tendencies-quiz",
  title: "The 3 dating tendencies quiz",
  short: "Which dating tendency are you?",
  emoji: "🧭",
  bg: "#FFE3EF",
  fg: "#6E1A4A",
  kicker: "🧭 which one are you · 9 questions",
  intro: "Romanticiser, Maximiser or Hesitater? Pick what you'd honestly do and find out which tendency is quietly running your love life.",
  resultLabel: "Your dating tendency is",
  note: "The three tendencies were described by behavioural scientist Logan Ury in her book How to Not Die Alone. This quiz is our own playful take on them, not hers.",
  types: {
    romanticiser: {
      emoji: "💘",
      title: "The Romanticiser",
      line: "You're waiting for fireworks, and you'll walk past a slow burn to find them.",
      body: "Romanticisers believe in the one, and judge a date by the spark in the first ten minutes. The risk is ruling out good people who are nervous, quiet or slow to warm up, and staying too long with exciting ones who aren't kind.",
      strength: "You love wholeheartedly and you won't settle for indifference.",
      watch: "First-date chemistry mostly measures confidence and novelty, not whether you'll be happy together.",
      tip: "Give one \"nice but no fireworks\" person a second date this month.",
    },
    maximiser: {
      emoji: "🔍",
      title: "The Maximiser",
      line: "You have a spreadsheet for your soulmate, and he keeps failing one column.",
      body: "Maximisers want the best possible option and keep looking in case someone better is one swipe away. In psychologist Barry Schwartz's research on choice, maximisers tended to end up less satisfied with their decisions than people who aimed for good enough.",
      strength: "You know what you want and you won't drift into something by accident.",
      watch: "Endless options make every real person look like a compromise.",
      tip: "Write down three non-negotiables. Everything else is a nice-to-have.",
    },
    hesitater: {
      emoji: "🐢",
      title: "The Hesitater",
      line: "You'll start dating when you're ready. You've been nearly ready for years.",
      body: "Hesitaters wait to feel ready: the right weight, the right job, the perfect profile. Underneath is usually fear of rejection, and the waiting protects you from it, along with everything else.",
      strength: "You're thoughtful and you take love seriously.",
      watch: "Nobody feels ready. Readiness tends to arrive after you start, not before.",
      tip: "Send one message this week that you'd normally overthink for a day.",
    },
  },
  questions: [
    q("q1", "A match is cute, kind and a bit boring on the first date.",
      ["romanticiser", "🙅‍♀️", "No spark, no second date"],
      ["maximiser", "📲", "Maybe, but I've got four other chats going"],
      ["hesitater", "🫣", "I wasn't really ready to be dating anyway"]),
    q("q2", "Your dream way to meet someone:",
      ["romanticiser", "☔", "Eye contact across a rainy bookshop"],
      ["maximiser", "🧮", "An app with forty filters so I find the best one"],
      ["hesitater", "🌱", "Once I've sorted my life out, it'll just happen"]),
    q("q3", "A friend wants to set you up with someone \"perfect on paper\".",
      ["romanticiser", "🦋", "Paper doesn't give me butterflies"],
      ["maximiser", "📋", "Send me his height, job and star sign first"],
      ["hesitater", "📅", "Can we do it next month instead?"]),
    q("q4", "Two dates in. He's lovely, but you're not obsessed.",
      ["romanticiser", "💔", "If I'm not obsessed, it's not right"],
      ["maximiser", "🤔", "Lovely, but what if there's someone even better?"],
      ["hesitater", "🐢", "Lovely, which is terrifying, so I go quiet"]),
    q("q5", "Your dating profile is...",
      ["romanticiser", "🌅", "A sunset and a quote about soulmates"],
      ["maximiser", "💼", "Rewritten weekly to attract a better calibre"],
      ["hesitater", "📝", "Half finished. For eight months"]),
    q("q6", "Your biggest fear in dating:",
      ["romanticiser", "🫖", "Settling for something lukewarm"],
      ["maximiser", "⏳", "Committing too soon and missing the right one"],
      ["hesitater", "😬", "Putting myself out there and being rejected"]),
    q("q7", "What your friends say about your love life:",
      ["romanticiser", "💭", "\"You fall for the idea of people\""],
      ["maximiser", "🏆", "\"Nobody will ever be good enough for you\""],
      ["hesitater", "🛋️", "\"You'd meet someone if you actually went out\""]),
    q("q8", "A first date ends with an awkward hug.",
      ["romanticiser", "🎬", "It's over. Films never have awkward hugs"],
      ["maximiser", "📊", "Adding it to the pros and cons list"],
      ["hesitater", "🙈", "Proof I'm bad at this. Taking a break"]),
    q("q9", "You'd describe \"the one\" as...",
      ["romanticiser", "✨", "Someone I'll know the second I see him"],
      ["maximiser", "🔬", "The best man available, after careful research"],
      ["hesitater", "🕰️", "Someone I'll meet when I'm finally ready"]),
  ],
  own: { href: "/why-do-i-pick-bad-guys", label: "Why do I attract the wrong guys? Take the full quiz", emoji: "🧲" },
  program: "/why-do-i-pick-bad-guys",
  seo: {
    title: "The 3 Dating Tendencies Quiz: Romanticiser, Maximiser or Hesitater?",
    description: "Take the three dating tendencies quiz. Nine quick questions to find out if you're a Romanticiser, a Maximiser or a Hesitater, and what it means for your love life. Free, no sign-up.",
    og: "Romanticiser, Maximiser or Hesitater? 9 questions",
    about: "The three dating tendencies: which one are you?",
  },
};

const TOXIC_TRAIT: TypeQuiz = {
  slug: "whats-my-toxic-trait",
  title: "What's your toxic trait?",
  short: "What's my toxic trait?",
  emoji: "🧪",
  bg: "#E9FFD6",
  fg: "#2E4A12",
  kicker: "🧪 which one are you · 10 questions",
  intro: "Ten very specific relationship moments. Pick what you'd actually do. We'll name your toxic trait, lovingly.",
  resultLabel: "Your toxic trait is",
  types: {
    detective: {
      emoji: "🔍",
      title: "The Detective",
      line: "You don't have trust issues, you have a research department.",
      body: "When you feel unsure, you investigate: his followers, his last seen, the girl who liked his photo in 2021. It feels like control, but it's anxiety looking for proof, and the checking keeps the anxiety alive.",
      strength: "You notice what other people miss.",
      watch: "Every search teaches your brain that the threat is real.",
      tip: "Next time you reach for his profile, ask him a plain question instead.",
    },
    overthinker: {
      emoji: "🧠",
      title: "The Overthinker",
      line: "One \"ok\" and you've written a three-act tragedy.",
      body: "You read tone, timing and full stops like evidence. It's a classic sign of an anxious attachment style: an alarm that fires at anything ambiguous, so neutral feels negative.",
      strength: "You care deeply and you're emotionally switched on.",
      watch: "Your interpretation is not the message.",
      tip: "Before decoding a text, write down the most boring explanation. It's usually the right one.",
    },
    ghost: {
      emoji: "👻",
      title: "The Ghost",
      line: "Things got real, so you got gone.",
      body: "When closeness or conflict arrives, you disappear, physically or emotionally. Leaving first protects you from being left, and it's common with an avoidant attachment style.",
      strength: "You're independent and you don't do drama.",
      watch: "Disappearing doesn't avoid the hard conversation, it just makes someone else have it alone.",
      tip: "Next time you want to vanish, send one honest line: \"I need a day, I'm not leaving.\"",
    },
    fixer: {
      emoji: "🛠️",
      title: "The Fixer",
      line: "You see a man covered in red flags and think: project.",
      body: "You're drawn to people who need saving, and you pour in time, advice and energy. Being needed can feel safer than being loved, because it's earned.",
      strength: "You're generous and fiercely loyal.",
      watch: "You can't love someone into changing.",
      tip: "Ask yourself: what do I get from this relationship that isn't being needed?",
    },
    scorekeeper: {
      emoji: "🧾",
      title: "The Scorekeeper",
      line: "You forgive. You also keep receipts, with dates.",
      body: "Every argument comes with an archive. Dragging every old grievance into a new fight even has a name, kitchen-sinking, and it makes arguments almost impossible to resolve.",
      strength: "A memory like a vault and a strong sense of fairness.",
      watch: "If you keep score, you're both losing.",
      tip: "Pick one old grievance and either raise it properly or let it go for good.",
    },
    hotcold: {
      emoji: "🌡️",
      title: "The Hot and Cold",
      line: "You pull away so he'll chase you, then you're upset he didn't.",
      body: "You test: go quiet, act unbothered, flirt with someone else, to see if he cares. The book Attached calls this protest behaviour: trying to get closeness back by pushing it away.",
      strength: "You're passionate and you know what you want to feel.",
      watch: "Tests teach people to stop trying, not to try harder.",
      tip: "Say the need instead of staging it: \"I've missed you this week.\"",
    },
  },
  questions: [
    q("q1", "He hasn't replied in three hours.",
      ["detective", "🔍", "Check if he's been online"],
      ["overthinker", "🧠", "Reread my last message for what I did wrong"],
      ["hotcold", "🌡️", "When he does, I'll wait six hours to reply"],
      ["ghost", "👻", "Honestly? Forget he exists"]),
    q("q2", "He forgets your plans for Friday.",
      ["scorekeeper", "🧾", "Add it to the list. There is a list"],
      ["fixer", "🛠️", "Set up his calendar for him, he's so disorganised"],
      ["overthinker", "🌀", "Spiral about what it says about us"],
      ["hotcold", "📸", "Make other plans and post them loudly"]),
    q("q3", "A new girl starts following him.",
      ["detective", "🕵️‍♀️", "Full background check by lunch"],
      ["scorekeeper", "🗂️", "Mention it in our next, unrelated, argument"],
      ["ghost", "🚪", "Decide he's going to leave and get there first"],
      ["fixer", "🤝", "She's probably just being nice, he needs friends"]),
    q("q4", "He says \"we need to talk\".",
      ["scorekeeper", "📑", "Prepare my own list of points"],
      ["overthinker", "📝", "Draft fourteen versions of the conversation"],
      ["detective", "🔎", "Check his recent likes for clues"],
      ["hotcold", "🧊", "Get in first: \"actually, I've been feeling distant\""]),
    q("q5", "Your type is...",
      ["fixer", "🧩", "Lost boys with potential"],
      ["hotcold", "🏆", "Men I have to win"],
      ["ghost", "🌫️", "Men who don't need much from me"],
      ["scorekeeper", "⚖️", "Men who admit when they're wrong (rare)"]),
    q("q6", "In an argument, you...",
      ["scorekeeper", "📅", "Bring up March 2023"],
      ["ghost", "🫥", "Go silent and leave the room"],
      ["hotcold", "🙃", "Say \"fine, do what you want\" and mean the opposite"],
      ["overthinker", "🔁", "Replay it for three days afterwards"]),
    q("q7", "He's having a hard week.",
      ["fixer", "📋", "Make him a plan, a playlist and a therapist shortlist"],
      ["ghost", "🏝️", "Give him space. A lot of space. All of it"],
      ["detective", "🤨", "Wonder if \"hard week\" is code for something"],
      ["overthinker", "😟", "Assume it's secretly about me"]),
    q("q8", "Your friends would say your toxic trait is...",
      ["detective", "💸", "\"She'd find your ex's cousin's Venmo\""],
      ["scorekeeper", "🐘", "\"She never forgets anything, ever\""],
      ["fixer", "🏗️", "\"She dates renovation projects\""],
      ["hotcold", "🎲", "\"She plays games, then says she hates games\""]),
    q("q9", "Things are going really, really well.",
      ["ghost", "🏃‍♀️", "Suspicious. Time to find a reason to leave"],
      ["overthinker", "😬", "Waiting for the catch"],
      ["fixer", "🥱", "Bit bored, he doesn't need me"],
      ["hotcold", "🎯", "Pull back a bit so he doesn't get complacent"]),
    q("q10", "He apologises.",
      ["scorekeeper", "🗄️", "Accept it and file it"],
      ["detective", "🧐", "Check whether his story adds up"],
      ["fixer", "🩹", "Tell him it's fine and make him feel better"],
      ["ghost", "📭", "Already left him on delivered"]),
  ],
  own: { href: "/why-do-i-sabotage-relationships", label: "Where does it come from? Take the self-sabotage test", emoji: "💣" },
  program: "/why-do-i-sabotage-relationships",
  seo: {
    title: "What's My Toxic Trait? Free Relationship Toxic Trait Quiz",
    description: "What's your toxic trait in relationships? Ten quick questions to find out if you're the Detective, the Overthinker, the Ghost, the Fixer, the Scorekeeper or the Hot and Cold. Free, no sign-up.",
    og: "Detective, Ghost or Overthinker? 10 questions",
    about: "What's my toxic trait in relationships?",
  },
};

const GIRLFRIEND: TypeQuiz = {
  slug: "what-kind-of-girlfriend-am-i",
  title: "What kind of girlfriend are you?",
  short: "What kind of girlfriend am I?",
  emoji: "👑",
  bg: "#FFF1C9",
  fg: "#6A4B00",
  kicker: "👑 which one are you · 10 questions",
  intro: "Golden retriever, black cat, or the one who's booked his dentist? Ten questions, one very accurate verdict.",
  resultLabel: "You're",
  types: {
    golden: {
      emoji: "🐶",
      title: "The Golden Retriever Girlfriend",
      line: "You've never played it cool in your life, and he's lucky.",
      body: "Openly affectionate, excited every time you see him, first to say sorry. Warmth like this is good for relationships; the only catch is giving it to people who don't give it back.",
      strength: "You make love feel easy and safe.",
      watch: "Enthusiasm isn't a reason to accept half the effort.",
      tip: "Notice who matches your energy, and give more of it to them.",
    },
    blackcat: {
      emoji: "🐈‍⬛",
      title: "The Black Cat Girlfriend",
      line: "Cold to the world, soft for one person, who has to earn it.",
      body: "Independent, private and slow to show it, but fiercely loyal once someone's in. The challenge is that partners can read your calm as not caring.",
      strength: "You never lose yourself in a relationship.",
      watch: "If he has to guess how you feel, he might guess wrong.",
      tip: "Say one soft thing out loud this week that you'd normally only think.",
    },
    mum: {
      emoji: "🧺",
      title: "The Mum Girlfriend",
      line: "You've booked his dentist, packed his snacks and reminded him to call his mum.",
      body: "You show love by looking after people. It's generous, but if you do all the planning and remembering, the relationship can quietly turn into you parenting an adult.",
      strength: "You make life work for everyone around you.",
      watch: "When one person over-functions, the other one under-functions.",
      tip: "Hand over one job completely, and don't redo it.",
    },
    maincharacter: {
      emoji: "🎬",
      title: "The Main Character Girlfriend",
      line: "Every date is a plot twist and you've already picked the soundtrack.",
      body: "You bring fun, drama and spontaneity, and life with you is never boring. The flip side is needing intensity to feel loved, which can make calm, steady men seem dull.",
      strength: "You make ordinary days feel like an event.",
      watch: "Calm is not the same as boring.",
      tip: "Plan one quiet night in and notice whether you feel close or restless.",
    },
    bestie: {
      emoji: "🫶",
      title: "The Bestie Girlfriend",
      line: "His partner, his Mario Kart rival and the person who roasts him hardest.",
      body: "Your relationship runs on friendship, banter and in-jokes. John Gottman's research puts friendship at the foundation of lasting couples, so this is a strong base, as long as the romance doesn't get lost in the banter.",
      strength: "You actually like each other, which is rarer than love.",
      watch: "Banter can hide the feelings you never say.",
      tip: "Swap one joke for one sincere compliment.",
    },
  },
  questions: [
    q("q1", "He's had a bad day.",
      ["golden", "🤗", "Run to the door with snacks and hugs"],
      ["blackcat", "🖤", "Sit next to him quietly. That's my love language"],
      ["mum", "🛁", "Run him a bath and make dinner"],
      ["bestie", "🎮", "Beat him at Mario Kart until he laughs"]),
    q("q2", "Your ideal date night:",
      ["maincharacter", "🚆", "A last-minute train somewhere new"],
      ["bestie", "🏆", "Pub quiz, and we're going to win"],
      ["golden", "🥰", "Literally anything, as long as it's with him"],
      ["mum", "📒", "A dinner I've booked, with a backup booked too"]),
    q("q3", "How you text him:",
      ["golden", "📱", "Forty messages and a voice note"],
      ["blackcat", "🐈‍⬛", "\"ok\""],
      ["maincharacter", "🎬", "Live updates on my day like it's a reality show"],
      ["bestie", "🐸", "Memes only. Three hundred a day"]),
    q("q4", "When you're upset with him:",
      ["blackcat", "🌙", "Go quiet until I've decided how I feel"],
      ["mum", "😮‍💨", "Sigh and do the thing myself"],
      ["maincharacter", "🎭", "We're having a scene, darling"],
      ["golden", "🐶", "Upset for ten minutes, then I miss him"]),
    q("q5", "Meeting his friends:",
      ["bestie", "💬", "I'm in their group chat by Sunday"],
      ["maincharacter", "💃", "I'm the funniest one there, sorry"],
      ["mum", "🎂", "I've already learned everyone's birthday"],
      ["blackcat", "🕶️", "Polite, mysterious, they'll warm up to me"]),
    q("q6", "Your friends describe you as a girlfriend who is...",
      ["golden", "💛", "\"Obsessed with him, it's cute\""],
      ["mum", "🗂️", "\"Basically his PA\""],
      ["bestie", "🫶", "\"More like his best mate\""],
      ["maincharacter", "🌪️", "\"Never boring\""]),
    q("q7", "Your relationship's soundtrack:",
      ["maincharacter", "🎤", "Taylor Swift, the dramatic ones"],
      ["blackcat", "🌹", "Lana Del Rey at 2am"],
      ["golden", "🪩", "ABBA, full volume"],
      ["bestie", "😈", "Whatever he hates, so I can annoy him"]),
    q("q8", "He forgets your anniversary.",
      ["mum", "📅", "Fine. I'd already planned it anyway"],
      ["blackcat", "😼", "Pretend I forgot too, out of pride"],
      ["golden", "🥺", "Sad, but I'll forgive him by lunch"],
      ["maincharacter", "☕", "Tell everyone at brunch. In detail"]),
    q("q9", "How you say \"I love you\":",
      ["bestie", "🧥", "Stealing his hoodie and calling him an idiot"],
      ["blackcat", "🔐", "Letting him be the only one who sees the real me"],
      ["mum", "🍫", "His favourite snack, always in the cupboard"],
      ["golden", "📣", "Out loud, constantly, in public"]),
    q("q10", "Your biggest relationship flaw:",
      ["maincharacter", "🎢", "I need things to be exciting"],
      ["blackcat", "🧊", "I don't show enough"],
      ["mum", "🧺", "I do too much"],
      ["bestie", "🙃", "I joke instead of saying how I feel"]),
  ],
  own: { href: "/attachment-style-quiz", label: "What's your attachment style? Take the free full test", emoji: "🧠" },
  program: "/attachment-style-quiz",
  seo: {
    title: "What Kind of Girlfriend Am I? Free Girlfriend Type Quiz",
    description: "What kind of girlfriend are you? Ten quick questions to find out if you're a golden retriever, black cat, mum, main character or bestie girlfriend, and what it says about you. Free, no sign-up.",
    og: "Golden retriever or black cat girlfriend? 10 questions",
    about: "What kind of girlfriend am I?",
  },
};

const BOYFRIEND: TypeQuiz = {
  slug: "golden-retriever-or-black-cat-boyfriend",
  title: "Golden retriever or black cat boyfriend?",
  short: "Golden retriever or black cat?",
  emoji: "🐶",
  bg: "#FFE8C2",
  fg: "#6B3A00",
  kicker: "🐾 which one is he · 10 questions",
  intro: "Golden retriever, black cat, fox or teddy bear? Answer ten questions about him and find out what kind of boyfriend you've really got.",
  resultLabel: "He's a",
  types: {
    golden: {
      emoji: "🐶",
      title: "Golden Retriever Boyfriend",
      line: "He thinks you hung the moon, and he tells everyone.",
      body: "Open, enthusiastic, affectionate in public, easy to read. You rarely have to guess where you stand with him, and that feeling of security matters more than chemistry.",
      strength: "Reliable joy, every single day.",
      watch: "Make sure the enthusiasm comes with follow-through, not just good vibes.",
      tip: "Tell him what you need plainly. He genuinely wants to get it right.",
    },
    blackcat: {
      emoji: "🐈‍⬛",
      title: "Black Cat Boyfriend",
      line: "Moody to the world, a total softie with you.",
      body: "Reserved, dry, selective with affection, and loyal once he's let you in. The difference between a black cat and an avoidant man is consistency: a black cat is quiet but reliable; an avoidant one disappears when it gets close.",
      strength: "When he shows up, he means it.",
      watch: "Quiet is fine. Inconsistent isn't.",
      tip: "Give him space to come to you. He will, in his own time.",
    },
    fox: {
      emoji: "🦊",
      title: "Fox Boyfriend",
      line: "Charming, flirty, unforgettable, and he knows it.",
      body: "Smooth, witty, brilliant at the start. Foxes are thrilling, but charm early on tells you very little about who someone is in month six. Watch what he does when he isn't trying to win you.",
      strength: "He makes you feel like the only person in the room.",
      watch: "Is he like this with everyone?",
      tip: "Judge him on the boring Tuesdays, not the big gestures.",
    },
    bear: {
      emoji: "🐻",
      title: "Teddy Bear Boyfriend",
      line: "Big hugs, calm energy, would fight a goose for you.",
      body: "Steady, protective, low drama. He might not be the flashiest texter, but he turns up. Calm men can feel boring if you're used to chaos; that's often your nervous system, not him.",
      strength: "Safe, warm and consistent.",
      watch: "Make sure calm doesn't mean he never says what he needs.",
      tip: "Ask him what he'd love to do this weekend. He rarely asks for himself.",
    },
  },
  questions: [
    q("q1", "You walk into the room. He...",
      ["golden", "🎄", "Lights up like it's Christmas morning"],
      ["blackcat", "🖤", "Gives you a tiny smile only you notice"],
      ["fox", "😏", "Winks. Somehow it works"],
      ["bear", "🤗", "Opens his arms for a hug, no words needed"]),
    q("q2", "His texting style:",
      ["golden", "☀️", "\"GOOD MORNING BEAUTIFUL\" and six emojis"],
      ["blackcat", "🐈‍⬛", "\"k.\" But he replies every time"],
      ["fox", "🎙️", "Flirty voice notes at midnight"],
      ["bear", "📞", "Calls instead. Texting is hard"]),
    q("q3", "At a party, he's...",
      ["golden", "🎉", "Talking to everyone and introducing you to all of them"],
      ["blackcat", "🍷", "In the kitchen with the host's actual cat"],
      ["fox", "🎤", "The centre of attention, mid-story"],
      ["bear", "🧀", "Guarding the snacks and checking you're okay"]),
    q("q4", "When you're upset, he...",
      ["golden", "😟", "Asks if you're okay forty times"],
      ["blackcat", "🍵", "Doesn't say much, but brings your favourite tea"],
      ["fox", "😂", "Makes you laugh until you forget why"],
      ["bear", "🫂", "Holds you and says \"I've got you\""]),
    q("q5", "His idea of a romantic gesture:",
      ["golden", "🧺", "A surprise picnic with a playlist he made"],
      ["blackcat", "🗝️", "Remembering something you said six months ago"],
      ["fox", "✈️", "A weekend away, booked with zero warning"],
      ["bear", "🔧", "Fixing the thing in your flat you've been ignoring"]),
    q("q6", "His friends describe him as...",
      ["golden", "😇", "\"The nicest guy you'll ever meet\""],
      ["blackcat", "🤫", "\"Quiet, but hilarious once you know him\""],
      ["fox", "🦊", "\"A bit of a charmer, watch out\""],
      ["bear", "🚗", "\"The one you call when your car breaks down\""]),
    q("q7", "His love language:",
      ["golden", "💬", "Words, constantly"],
      ["blackcat", "🛋️", "Quality time, in silence, on the sofa"],
      ["fox", "💋", "Flirting, even after a year"],
      ["bear", "🐻", "Acts of service and very big hugs"]),
    q("q8", "In an argument, he...",
      ["golden", "🥺", "Apologises first, even when he didn't start it"],
      ["blackcat", "🌙", "Needs an hour, then comes back to talk"],
      ["fox", "😇", "Charms his way out of it. Every time"],
      ["bear", "🧘", "Stays calm and waits until you're ready"]),
    q("q9", "His dream weekend:",
      ["golden", "🐾", "Anything, as long as you're there"],
      ["blackcat", "📚", "A rainy day, a book, and you in the same room"],
      ["fox", "🍸", "A rooftop bar he heard about from a friend"],
      ["bear", "🌲", "A long walk, a pub lunch and a nap"]),
    q("q10", "Your mum's verdict:",
      ["golden", "💍", "\"He's adorable, marry him\""],
      ["blackcat", "🧐", "\"Hard to read, but he clearly loves you\""],
      ["fox", "👀", "\"Charming. Keep an eye on him\""],
      ["bear", "☕", "\"Finally, a sensible one\""]),
  ],
  own: { href: "/partners-attachment-style", label: "What's his attachment style? Take the free full test", emoji: "🧠" },
  program: "/partners-attachment-style",
  seo: {
    title: "Golden Retriever or Black Cat Boyfriend? Free Boyfriend Quiz",
    description: "Is your boyfriend a golden retriever, a black cat, a fox or a teddy bear? Ten quick questions about him and a verdict worth sending to the group chat. Free, no sign-up.",
    og: "Golden retriever, black cat, fox or teddy bear? 10 questions",
    about: "Is he a golden retriever or a black cat boyfriend?",
  },
};

export const TYPE_QUIZZES: TypeQuiz[] = [TOXIC_TRAIT, BOYFRIEND, GIRLFRIEND, DATING_TENDENCIES];

export function typeQuiz(slug: string) {
  return TYPE_QUIZZES.find((x) => x.slug === slug);
}

export interface TypeScore {
  top: string;
  ranked: { t: string; n: number; pct: number }[];
}

/**
 * Count the votes. A tie goes to whichever tied type she picked most
 * recently, so the last few answers settle a close call.
 */
export function scoreType(quiz: TypeQuiz, picks: string[]): TypeScore {
  const counts = new Map<string, number>();
  const lastSeen = new Map<string, number>();
  picks.forEach((t, i) => {
    counts.set(t, (counts.get(t) ?? 0) + 1);
    lastSeen.set(t, i);
  });
  const total = Math.max(1, picks.length);
  const ranked = Object.keys(quiz.types)
    .map((t) => ({ t, n: counts.get(t) ?? 0, pct: Math.round(((counts.get(t) ?? 0) / total) * 100) }))
    .sort((a, b) => b.n - a.n || (lastSeen.get(b.t) ?? -1) - (lastSeen.get(a.t) ?? -1));
  return { top: ranked[0].t, ranked };
}

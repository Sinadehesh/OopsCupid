import type { Week } from "../types";

/**
 * TRUST YOUR OWN MIND
 * Recovering your judgement after manipulation and gaslighting.
 *
 * For whoever arrives from /is-he-manipulative, /is-he-gaslighting-me or
 * the /things-he-says grid. The work is not about him. Everything here is
 * something she can do without his cooperation, because anything that
 * depends on it hands him the steering wheel again.
 */

export const TRUST_YOUR_OWN_MIND: Week[] = [
  /* ═════════════════════════════ WEEK 1 ═════════════════════════════ */
  {
    week: 1,
    theme: "See it clearly",
    goal: "Separate what happened from what you were told happened, and start a record he cannot argue with.",
    sessions: [
      {
        day: 1,
        title: "What actually happened",
        minutes: 12,
        technique: "Grounding · behavioural self-monitoring",
        intro:
          "Start with the smallest possible thing: one event, described so plainly that nobody could dispute it. Not what it meant, not whether you overreacted. Just what happened.",
        blocks: [
          {
            id: "ground",
            kind: "timer",
            title: "Sixty seconds, before anything else",
            seconds: 60,
            cues: [
              "Put both feet flat on the floor.",
              "Name five things you can see, out loud or in your head.",
              "Four things you can feel: the chair, your sleeves, the air.",
              "Breathe out for longer than you breathe in.",
              "You are here, in this room, and this is your time.",
            ],
          },
          {
            id: "why-foggy",
            kind: "read",
            title: "Why your memory feels unreliable",
            body: [
              "If you have spent months being told that things did not happen the way you remember, you will now doubt your memory even when it is right. That is not a sign that your memory is bad. It is what repeated, confident contradiction does to anyone.",
              "Memory is not a recording. We store the gist and rebuild the details each time we recall. That rebuilding is exactly where a confident voice saying \"that is not what happened\" gets in, and once you are anxious, you have less attention spare to check it.",
              "So we are not going to argue about the past. We are going to start writing the present down, as it happens, in a way you can trust later.",
            ],
            why: "Researchers call this source monitoring: judging where a memory came from. Stress and repeated contradiction both make it harder, which is why a written record made on the day is worth more than any amount of certainty after the fact.",
          },
          {
            id: "one-event",
            kind: "reflect",
            prompt: "Describe one thing that happened this week between you. Facts only: when, where, and the exact words, as close as you can get them.",
            hint: "Leave out what you think it meant. That comes later.",
            placeholder: "Tuesday, about 9pm, kitchen. I said I was upset he'd cancelled. He said…",
          },
          {
            id: "fact-or-story",
            kind: "check",
            question: "Which of these is a fact, rather than an interpretation?",
            options: [
              { text: "He was trying to make me feel stupid.", because: "It might be true, but it is about his intention, which you cannot see. Keep it, just not in the facts column." },
              { text: "He said: \"You always do this.\"", correct: true, because: "Exactly. Words that were said are facts, even when the words themselves are unfair." },
              { text: "I overreacted again.", because: "This is a judgement, and often one you have borrowed from someone else." },
            ],
          },
        ],
        takeaway: "A fact is something a camera would have caught. Everything else is allowed, it just lives in a different column.",
      },
      {
        day: 2,
        title: "The sentences that end conversations",
        minutes: 12,
        technique: "Psychoeducation · pattern recognition",
        intro:
          "Most manipulation does not sound dramatic. It sounds like ordinary sentences that happen to end the conversation before the thing you raised is dealt with. Today is about learning to hear them.",
        blocks: [
          {
            id: "eight",
            kind: "read",
            title: "Eight things a sentence can do",
            body: [
              "Rewriting what happened: \"That never happened.\" Turning it back on you: \"You're too sensitive.\" Leaving the room: \"I don't want to talk about it.\" Thinning out your circle: \"Your friends don't like me.\"",
              "Putting the relationship on the table: \"Fine, maybe we should just end it.\" Shrinking it: \"It was a joke.\" Checking up: \"Why did it take you so long to reply?\" Making you the problem: \"You're crazy.\"",
              "Any of these, said once in a bad week, is just a person arguing badly. The pattern is when the same moves come back, and the thing you actually raised never gets an answer.",
            ],
            why: "Psychologist Jennifer Freyd named one common sequence DARVO: Deny, Attack, Reverse Victim and Offender. Naming a move is often enough to stop it working on you, because you can see it while it is happening.",
          },
          {
            id: "heard",
            kind: "choose",
            prompt: "Which have you heard more than once?",
            options: [
              "That never happened.",
              "You're too sensitive.",
              "I don't want to talk about it.",
              "Your friends don't like me.",
              "Maybe we should just end it then.",
              "It was a joke. Relax.",
              "Why did it take you so long to reply?",
              "You're crazy.",
            ],
            after: {
              few: "Noticing even one of these, clearly, is the start. Each time you hear it from now on, you will recognise it a fraction of a second sooner.",
              many: "That many is not a run of bad arguments. It is a way of ending conversations that has become the default, and it explains why so little ever gets resolved.",
            },
          },
          {
            id: "lands-hardest",
            kind: "reflect",
            prompt: "Which one lands hardest for you, and what do you usually do in the moment right after you hear it?",
            placeholder: "\"You're too sensitive\" gets me every time. I go quiet and start apologising…",
          },
        ],
        takeaway: "The question is never whether a sentence is technically true. It is whether the thing you raised ever gets answered.",
      },
      {
        day: 3,
        title: "Your body knew first",
        minutes: 12,
        technique: "Interoceptive awareness · baseline measure",
        intro:
          "Before you had words for it, your body was already reacting. Learning to read that reaction gives you information that nobody can talk you out of.",
        blocks: [
          {
            id: "body-data",
            kind: "read",
            title: "Your body as a witness",
            body: [
              "When someone contradicts your memory, the argument happens in words. But your body registers the situation before the words arrive: a tight chest, a hot face, a sudden urge to apologise or to go quiet.",
              "Those signals are not proof of anything on their own. They are data, and they are yours. Over the next weeks you will learn which ones reliably show up when something is off.",
            ],
            why: "Interoception, the sense of what is happening inside your body, is trainable. People who notice their signals earlier tend to regulate better, simply because they get a few seconds' warning.",
          },
          {
            id: "signals",
            kind: "choose",
            prompt: "What happens in your body when a conversation starts going this way?",
            options: [
              "Tight chest or throat",
              "Hot face or neck",
              "Stomach drops",
              "Urge to apologise",
              "Going blank, losing my words",
              "Shaky hands",
              "Wanting to leave the room",
              "Crying before I want to",
            ],
            after: {
              few: "Keep these in mind. They are your early warning system, and they tend to show up before your thoughts catch up.",
              many: "Your body is working hard in these conversations. That is not weakness. It is a nervous system that has learned this situation is not safe to relax in.",
            },
          },
          {
            id: "self-trust-baseline",
            kind: "scale",
            prompt: "Right now, how much do you trust your own read of what happens between you?",
            low: "not at all",
            high: "completely",
          },
          {
            id: "last-time",
            kind: "reflect",
            prompt: "Think of the last time your body reacted before you understood why. What did it notice that you only worked out later?",
          },
        ],
        takeaway: "Your body is not always right, but it is always honest. It is worth listening to before anyone else.",
      },
      {
        day: 4,
        title: "Facts, feelings, stories",
        minutes: 14,
        technique: "CBT · separating observation from interpretation",
        intro:
          "Arguments you cannot win usually mix three different things together. Pulling them apart is one of the most useful skills in this whole programme.",
        blocks: [
          {
            id: "three-kinds",
            kind: "read",
            title: "Three kinds of statement",
            body: [
              "A fact is what a camera would catch. A feeling is what happened inside you. A story is the meaning either of you puts on it.",
              "Manipulation almost always works on the story. \"You're overreacting\" is a story about your feeling. \"That never happened\" is a story that tries to overwrite a fact. When you know which kind of statement you are dealing with, you know which ones are up for debate. Your feelings are not. The facts should not be.",
            ],
          },
          {
            id: "sort-statements",
            kind: "sort",
            prompt: "Sort each one.",
            buckets: ["Fact", "Feeling", "Story"],
            items: [
              { text: "He cancelled at 6pm.", answer: "Fact" },
              { text: "I felt humiliated.", answer: "Feeling" },
              { text: "He doesn't care about me.", answer: "Story" },
              { text: "You're making a big deal out of nothing.", answer: "Story" },
              { text: "He said \"calm down\" twice.", answer: "Fact" },
              { text: "I was scared.", answer: "Feeling" },
              { text: "I'm too needy.", answer: "Story" },
            ],
            after: "Notice where the stories about you came from. Some of them may be his words, repeated so often they feel like your own.",
          },
          {
            id: "own-three",
            kind: "thoughts",
            prompt: "Take one recent argument and pull it apart.",
            example: {
              situation: "He came home late and didn't text. I asked why. He said I was being controlling.",
              thought: "Maybe I am controlling. Maybe I'm the problem.",
              evidence: "For: I did ask where he was. Against: I asked once, calmly, after he was two hours late without a word.",
              balanced: "Asking once after two silent hours is a normal question. Being called controlling for it is his story, not a fact about me.",
            },
          },
        ],
        takeaway: "Your feelings are not up for debate, and the facts should not be. Only the stories are.",
      },
      {
        day: 5,
        title: "Start the record",
        minutes: 12,
        technique: "Self-monitoring · written log",
        intro:
          "This is the habit the rest of the programme rests on. Five minutes a day, a record of what happened, written on the day it happened.",
        blocks: [
          {
            id: "how-to-log",
            kind: "read",
            title: "How to keep a record that helps",
            body: [
              "One line per incident. Date, time, what was said, what you did. Write it the same day, while it is still clear. Facts only. You can add how you felt on a separate line.",
              "This is not for showing him. Showing it tends to start a new argument about the record itself. It is for you, three weeks from now, when you are told something never happened and you are about to believe it.",
              "Keep it somewhere private: a notes app with a passcode, an email draft to yourself, or a notebook he will not read. If you share devices or he checks your phone, choose a place he does not have access to.",
            ],
            why: "Writing on the day fixes the memory before it can be rewritten. It also, over time, shows you the pattern in a way single moments never can.",
          },
          {
            id: "first-entries",
            kind: "reflect",
            prompt: "Write your first three entries now, from anything you remember clearly from the last week.",
            rows: 8,
            placeholder: "Mon 14th, 8pm: I said I'd felt left out at dinner. He said \"that's not what happened, you're imagining it\". I dropped it.\nWed 16th…",
          },
          {
            id: "clarity-w1",
            kind: "scale",
            prompt: "How clear-headed do you feel today, about your own life?",
            low: "completely foggy",
            high: "completely clear",
          },
          {
            id: "w1-notice",
            kind: "reflect",
            prompt: "Looking back over this week, what did you notice that you had not let yourself see before?",
          },
        ],
        takeaway: "From today, what happened is written down. That is the beginning of trusting yourself again.",
      },
    ],
  },

  /* ═════════════════════════════ WEEK 2 ═════════════════════════════ */
  {
    week: 2,
    theme: "Understand why it works",
    goal: "See why doubt sticks, why the good days make it harder, and what staying has been protecting.",
    sessions: [
      {
        day: 1,
        title: "Why doubt sticks",
        minutes: 13,
        technique: "Psychoeducation · formulation",
        intro:
          "If you are clever and capable and still found yourself doubting your own memory, that is not a contradiction. Understanding why is the first step to it working less.",
        blocks: [
          {
            id: "mechanism",
            kind: "read",
            title: "How the doubt gets in",
            body: [
              "It rarely starts with a big lie. It starts with small contradictions, stated confidently, about things too minor to fight over. You let them go, because fighting over them seems petty.",
              "Each time you let one go, a little more of your certainty moves over to his side. After enough of them, the contradictions do not need to be confident any more. You start doing the doubting yourself, before he has said anything.",
              "That is why it can feel as though you did this to yourself. You did not. You were responding reasonably to someone who kept telling you that your version was wrong.",
            ],
            why: "The sociologist Paige Sweet has shown that gaslighting works best where one person already has more social credibility, for example being seen as the calm, rational one. The doubt draws on stereotypes that already exist, which is part of why it is so effective and so hard to name.",
          },
          {
            id: "small-first",
            kind: "reflect",
            prompt: "Can you remember the first small thing you let go, near the start? What made it seem not worth arguing about?",
          },
          {
            id: "who-credible",
            kind: "choose",
            prompt: "In your relationship, who usually gets to be the reasonable one?",
            options: [
              "He is seen as the calm one",
              "I am seen as the emotional one",
              "Friends or family take his side",
              "He is better with words in an argument",
              "I am told I remember things wrong",
              "People like him more than they like me",
            ],
            after: {
              few: "That imbalance matters. It is part of why your version gets doubted, including by you.",
              many: "When credibility is this lopsided, you would doubt yourself too, whoever you were. That is the mechanism, not a flaw in you.",
            },
          },
        ],
        takeaway: "You did not start doubting yourself for no reason. You were told you were wrong, often, by someone you trusted.",
      },
      {
        day: 2,
        title: "Hot and cold",
        minutes: 14,
        technique: "Psychoeducation · intermittent reinforcement",
        intro:
          "The part of this that makes the least sense from outside is why the good days make it harder to see the bad ones clearly. There is a reason, and it is not that you are weak.",
        blocks: [
          {
            id: "slot-machine",
            kind: "read",
            title: "The slot machine effect",
            body: [
              "When warmth is reliable, you stop noticing it. When it comes and goes unpredictably, every return of it feels like relief, and relief is one of the strongest rewards a nervous system knows.",
              "This is the same principle that makes gambling compelling: rewards that arrive unpredictably create stronger attachment than rewards that arrive every time. A good evening after a bad week does not cancel the bad week. It deepens the bond to the person who caused both.",
            ],
            why: "Researchers Donald Dutton and Susan Painter described this as traumatic bonding: the combination of a power imbalance and intermittent good and bad treatment produces an unusually strong attachment. It is a predictable human response, not a character flaw.",
          },
          {
            id: "cycle",
            kind: "choose",
            prompt: "Which parts of this cycle do you recognise?",
            options: [
              "Tension slowly building",
              "Walking on eggshells",
              "A blow-up or a cold withdrawal",
              "An apology or sudden warmth",
              "Gifts, plans, or the old him coming back",
              "A calm stretch where I think it's fixed",
              "Feeling foolish for having doubted him",
            ],
            after: {
              few: "Seeing even part of the cycle gives you a map. You will start to notice which stage you are in.",
              many: "This is the full cycle. Knowing it means that next time the warmth comes back, you can enjoy it without concluding that nothing was wrong.",
            },
          },
          {
            id: "last-good",
            kind: "reflect",
            prompt: "Describe the last really good stretch between you. What came just before it?",
          },
          {
            id: "cycle-check",
            kind: "check",
            question: "After a bad week, he is loving and attentive for three days. What does that tell you?",
            options: [
              { text: "The problem is solved.", because: "It might be, but three good days cannot tell you that. The question is what happens the next time you raise something." },
              { text: "Nothing on its own. Watch what happens next time there's a disagreement.", correct: true, because: "Exactly. Warm phases are real and you are allowed to enjoy them. They just are not evidence that the pattern has changed." },
              { text: "I was wrong to be upset.", because: "The good days do not reach back and undo the bad ones. Both happened." },
            ],
          },
        ],
        takeaway: "A good day is real, and it is not evidence. Both can be true at once.",
      },
      {
        day: 3,
        title: "Where you learned to doubt yourself",
        minutes: 15,
        technique: "Schema work · early messages",
        intro:
          "Some people are much more vulnerable to being talked out of their own experience, and it usually started long before this relationship. This session is gentle. Go at your own pace.",
        blocks: [
          {
            id: "schemas",
            kind: "read",
            title: "Old rules, new situations",
            body: [
              "If, growing up, keeping the peace mattered more than what you felt, you probably learned rules like \"my feelings cause problems\" or \"other people know better than I do.\" Those rules made sense then. They kept you safe in a family that needed them.",
              "The trouble is that the same rules make you easy to talk out of your own experience now. Someone confidently telling you that you are wrong fits a slot that was carved out a long time ago.",
            ],
            why: "Schema therapy calls these patterns early maladaptive schemas. Subjugation (\"my needs don't count\") and self-sacrifice are especially common in people who end up with controlling partners. Recognising the schema does not blame you; it explains why this felt familiar.",
          },
          {
            id: "messages",
            kind: "choose",
            prompt: "Which of these did you pick up, growing up?",
            options: [
              "Don't make a fuss",
              "You're too sensitive",
              "Keep the peace at any cost",
              "Other people's moods are your job",
              "If you're upset, you've done something wrong",
              "Adults know better than you do",
              "Love has to be earned",
              "None of these fit",
            ],
            after: {
              few: "Even one of these can make a controlling partner's words feel strangely familiar. That familiarity is not love, though it can feel like it.",
              many: "These are heavy things to have carried in. It makes complete sense that someone telling you your feelings were wrong would feel less like an attack and more like the truth.",
            },
          },
          {
            id: "who-first",
            kind: "reflect",
            prompt: "Who first taught you that your version of events might not count? What would you say to your younger self now?",
            hint: "If this brings up more than you want to deal with today, stop and come back to it. That is allowed.",
          },
        ],
        takeaway: "The rule you learned kept you safe once. You are allowed to retire it now.",
      },
      {
        day: 4,
        title: "What staying protects",
        minutes: 14,
        technique: "Motivational interviewing · decisional balance",
        intro:
          "This is not a session about leaving. It is about being honest with yourself about why things are the way they are. Mixed feelings are normal, and they are information.",
        blocks: [
          {
            id: "ambivalence",
            kind: "read",
            title: "Why mixed feelings are normal",
            body: [
              "People stay in relationships that hurt them for real reasons: love, history, money, children, fear, hope, not wanting to be alone, not wanting to be wrong about someone. None of those reasons is stupid.",
              "Pushing yourself to decide before you are ready usually backfires. Looking clearly at both sides, without deciding anything, is what actually moves people forward.",
            ],
            why: "Motivational interviewing, developed by William Miller and Stephen Rollnick, treats ambivalence as a normal stage of change rather than a failure of will. Writing out both sides tends to shift people further than being told what to do.",
          },
          { id: "stay-good", kind: "reflect", prompt: "What does staying give you, honestly? What would you miss?" },
          { id: "stay-cost", kind: "reflect", prompt: "What does staying cost you? What have you given up to keep things calm?" },
          { id: "change-fear", kind: "reflect", prompt: "What scares you most about things changing, in any direction?" },
          {
            id: "readiness",
            kind: "scale",
            prompt: "How ready do you feel to change something, anything, about the situation?",
            low: "not at all ready",
            high: "completely ready",
          },
        ],
        takeaway: "You do not have to decide anything today. Seeing both sides clearly is already a step.",
      },
      {
        day: 5,
        title: "The cost ledger",
        minutes: 12,
        technique: "Behavioural audit · values contact",
        intro:
          "One of the quietest effects of this kind of relationship is how much you stop doing, without ever deciding to. Today you take stock.",
        blocks: [
          {
            id: "stopped",
            kind: "choose",
            prompt: "Since this relationship began, what have you done less of?",
            options: [
              "Seeing my friends",
              "Seeing my family",
              "Hobbies I used to love",
              "Saying no",
              "Spending money on myself",
              "Wearing what I want",
              "Sharing good news",
              "Having opinions out loud",
              "Being spontaneous",
            ],
            after: {
              few: "Notice these. They are not small. They are pieces of you that went quiet.",
              many: "That is a lot of your life that has gone quiet. None of it was taken in one go, which is exactly why it was so hard to notice.",
            },
          },
          {
            id: "miss-most",
            kind: "reflect",
            prompt: "Of everything you ticked, which do you miss the most? When did you last do it?",
          },
          {
            id: "self-trust-w2",
            kind: "scale",
            prompt: "Now, after two weeks: how much do you trust your own read of what happens between you?",
            low: "not at all",
            high: "completely",
            compareTo: { week: 1, day: 3, id: "self-trust-baseline", label: "In week 1" },
          },
        ],
        takeaway: "What you stopped doing is a map of what you have to come back to.",
      },
    ],
  },

  /* ═════════════════════════════ WEEK 3 ═════════════════════════════ */
  {
    week: 3,
    theme: "Take your reality back",
    goal: "Practise the skills that stop these conversations working: disengaging from reality arguments, reconnecting, and boundaries that hold.",
    sessions: [
      {
        day: 1,
        title: "The one-sentence rule",
        minutes: 13,
        technique: "Behavioural skill · disengaging from reality disputes",
        intro:
          "You cannot win an argument about what happened with someone who is willing to deny it. So this week, you stop having that argument.",
        blocks: [
          {
            id: "no-debate",
            kind: "read",
            title: "Why proving it never works",
            body: [
              "When you bring evidence, the conversation becomes about the evidence: whether it is exact, whether you are being obsessive for keeping it, whether you are twisting things. The original point disappears.",
              "The alternative is one calm sentence that refuses the debate without agreeing to his version: \"We remember that differently.\" Then you move on or leave. You do not need him to agree. You already know what happened; it is in your record.",
            ],
            why: "This is a form of what DBT calls radical acceptance: accepting that you cannot control his account, and redirecting your energy to what you can control, which is your own response.",
          },
          {
            id: "my-sentence",
            kind: "script",
            prompt: "Build your own version. Keep it short enough to say calmly when your heart is pounding.",
            template: ["{acknowledge}.", "{hold}.", "{exit}."],
            fields: [
              { key: "acknowledge", label: "Name the disagreement", placeholder: "We remember that differently" },
              { key: "hold", label: "Hold your ground, gently", placeholder: "I know what I heard" },
              { key: "exit", label: "Leave the argument", placeholder: "I'm not going to argue about it" },
            ],
          },
          {
            id: "practise",
            kind: "reflect",
            prompt: "Imagine saying it. What do you expect he will do? What do you feel in your body as you imagine it?",
          },
        ],
        takeaway: "You do not need him to agree with you. You only need to stop needing him to.",
      },
      {
        day: 2,
        title: "Low reactivity, and when not to use it",
        minutes: 14,
        technique: "Communication skill · safety judgement",
        intro:
          "Sometimes the most protective thing you can do is become less interesting to argue with. Sometimes it is not. Today is about telling the difference.",
        blocks: [
          {
            id: "grey",
            kind: "read",
            title: "Being boring on purpose",
            body: [
              "Manipulation runs on reactions. When you respond with brief, neutral, factual answers, there is much less for it to grip. People sometimes call this going grey rock.",
              "It is a tool for situations you cannot leave right now, like co-parenting logistics or a shared flat. It is not a way to fix a relationship, and it is not meant to be permanent.",
              "Important: if you are afraid of how he reacts when you disengage, or if things have ever become physical, low reactivity alone is not a safety plan. Please talk to a domestic abuse service. In the UK, Refuge runs a free 24-hour line on 0808 2000 247.",
            ],
          },
          {
            id: "grey-sort",
            kind: "sort",
            prompt: "Which of these responses give the argument something to grip, and which do not?",
            buckets: ["Feeds it", "Starves it"],
            items: [
              { text: "\"Okay.\"", answer: "Starves it" },
              { text: "\"That's so unfair, you always do this!\"", answer: "Feeds it" },
              { text: "\"I'll think about it.\"", answer: "Starves it" },
              { text: "A long message explaining myself", answer: "Feeds it" },
              { text: "\"I'll pick the kids up at five.\"", answer: "Starves it" },
              { text: "Crying and asking why he's doing this", answer: "Feeds it" },
            ],
            after: "None of the feeding responses are wrong to feel. They just hand him the next move.",
          },
          {
            id: "where-use",
            kind: "reflect",
            prompt: "Where in your life right now would being less reactive protect you? And is there anywhere it would not feel safe?",
          },
        ],
        takeaway: "Less reaction is a shield for now, not a plan for ever. Your safety comes first.",
      },
      {
        day: 3,
        title: "A second opinion",
        minutes: 13,
        technique: "Reality testing · social reconnection",
        intro:
          "Isolation is what lets doubt grow. The antidote is simple and hard: telling someone you trust what is happening, and hearing what they think.",
        blocks: [
          {
            id: "outside-view",
            kind: "read",
            title: "Why an outside view helps",
            body: [
              "When you are inside a confusing situation, everything is filtered through the last thing you were told. Someone outside it has no stake in either version, and can often say in one sentence what you have been circling for months.",
              "You do not need to tell them everything, and you do not need them to tell you what to do. You are borrowing their eyes for a moment.",
            ],
          },
          {
            id: "who-trust",
            kind: "reflect",
            prompt: "Who, in your life, would believe you and not repeat it? Name them, even if you have not spoken in a while.",
          },
          {
            id: "reach-out",
            kind: "experiment",
            task: "Send one message to someone on that list this week. It does not have to mention the relationship. Just reconnect.",
            predictPrompt: "What do you expect will happen? What are you worried about?",
            resultPrompt: "What actually happened?",
            learnPrompt: "What does that tell you?",
          },
        ],
        takeaway: "The people who would believe you are still there. One message is enough to find out.",
      },
      {
        day: 4,
        title: "Boundaries that hold",
        minutes: 15,
        technique: "DBT · DEAR MAN interpersonal effectiveness",
        intro:
          "A boundary is not a demand about what he does. It is a statement about what you will do. That is why it can hold even when he disagrees.",
        blocks: [
          {
            id: "dear-man",
            kind: "read",
            title: "Asking clearly, and holding it",
            body: [
              "DBT teaches a structure called DEAR MAN for asking for something clearly. Describe the facts. Express how you feel. Assert what you want. Reinforce why it matters. Then stay Mindful of your goal, Appear confident, and Negotiate where it makes sense.",
              "The key to a boundary that holds is the last part: what you will do if it is crossed. \"If you raise your voice, I will leave the room and we can talk later\" is a boundary. \"Stop shouting at me\" is a request he can ignore.",
            ],
            why: "DEAR MAN comes from Marsha Linehan's dialectical behaviour therapy. It is one of the most tested interpersonal skills there is, precisely because it separates what you ask for from what you do.",
          },
          {
            id: "my-boundary",
            kind: "script",
            prompt: "Write one boundary, in your own words.",
            template: ["When {describe},", "I feel {express}.", "I need {assert}.", "If it happens again, I will {consequence}."],
            fields: [
              { key: "describe", label: "Describe the facts", placeholder: "you tell me something didn't happen when I remember it" },
              { key: "express", label: "How you feel", placeholder: "confused and shut out" },
              { key: "assert", label: "What you need", placeholder: "us to accept we remember it differently, and move on" },
              { key: "consequence", label: "What you will do", placeholder: "end the conversation and go for a walk" },
            ],
          },
          {
            id: "can-you",
            kind: "check",
            question: "Which of these is a boundary you can actually keep?",
            options: [
              { text: "\"You need to stop lying to me.\"", because: "This is a request about his behaviour. He can simply not do it, and then you have nothing." },
              { text: "\"If the conversation turns to how I'm too sensitive, I'll end it and we can pick it up tomorrow.\"", correct: true, because: "Yes. It is entirely about what you will do, so it works whether or not he agrees." },
              { text: "\"You'd better start treating me with respect.\"", because: "It is a fair wish, but it depends on him, and it is vague enough to be argued with." },
            ],
          },
        ],
        takeaway: "A boundary is about what you will do, which is why it is the one thing he cannot argue you out of.",
      },
      {
        day: 5,
        title: "The experiment",
        minutes: 13,
        technique: "CBT · behavioural experiment",
        intro:
          "This week you use one of your skills on purpose and watch what happens. Not to change him, but to learn what is actually true.",
        blocks: [
          {
            id: "why-experiment",
            kind: "read",
            title: "Testing a prediction",
            body: [
              "Fear makes predictions: if I hold my ground, it will be a disaster. Those predictions keep us stuck, because we never test them.",
              "A behavioural experiment is a small, safe test. You write down what you expect, you try it, and you compare. Sometimes the fear was right, and that is important to know. Often it was bigger than reality.",
            ],
            why: "Behavioural experiments are one of the most effective tools in cognitive therapy for changing beliefs, because experience persuades us in a way argument never does.",
          },
          {
            id: "main-experiment",
            kind: "experiment",
            task: "The next time you hear one of the eight sentences, use your one-sentence rule or your boundary instead of arguing.",
            predictPrompt: "What do you predict will happen? How bad, on a scale you choose?",
            resultPrompt: "What actually happened, facts first?",
            learnPrompt: "What did you learn, about him or about yourself?",
          },
          {
            id: "capable",
            kind: "scale",
            prompt: "How capable do you feel of holding your ground now?",
            low: "not at all",
            high: "completely",
          },
        ],
        takeaway: "Whatever happened, you learned something true. That is exactly what trusting yourself is built from.",
      },
    ],
  },

  /* ═════════════════════════════ WEEK 4 ═════════════════════════════ */
  {
    week: 4,
    theme: "A mind that's yours again",
    goal: "Reconnect with what matters to you, speak to yourself with kindness, and make a plan for the days the doubt comes back.",
    sessions: [
      {
        day: 1,
        title: "What you actually value",
        minutes: 14,
        technique: "ACT · values clarification",
        intro:
          "After a long time organising your life around someone else's moods, it can be hard to remember what you actually care about. Today you find out again.",
        blocks: [
          {
            id: "values-read",
            kind: "read",
            title: "Values, not goals",
            body: [
              "A goal is something you finish. A value is a direction you keep walking in: honesty, curiosity, loyalty to friends, creativity, independence. You never complete a value, you just choose it again.",
              "Values are useful exactly because nobody can argue you out of them. They are not facts about the world. They are choices about who you want to be.",
            ],
            why: "Acceptance and commitment therapy, developed by Steven Hayes, uses values as a compass. People who act in line with their values tend to cope better with distress, even when circumstances do not change.",
          },
          {
            id: "values-sort",
            kind: "sort",
            prompt: "Sort these by how much they matter to you. There are no right answers.",
            buckets: ["Essential", "Important", "Not really me"],
            items: [
              { text: "Honesty" },
              { text: "Independence" },
              { text: "Friendship" },
              { text: "Creativity" },
              { text: "Calm" },
              { text: "Adventure" },
              { text: "Family" },
              { text: "Fairness" },
              { text: "Learning" },
              { text: "Being useful" },
            ],
            after: "Look at your Essential column. Those are what you are walking back towards.",
          },
          {
            id: "value-action",
            kind: "reflect",
            prompt: "Pick one of your essential values. What is one small thing you could do this week that is in line with it?",
          },
        ],
        takeaway: "Your values were yours before this relationship, and they are still yours now.",
      },
      {
        day: 2,
        title: "Talking to yourself like a friend",
        minutes: 14,
        technique: "Compassion-focused · self-compassion break",
        intro:
          "Many people who have been gaslit end up doing the criticism themselves. Today you practise the opposite.",
        blocks: [
          {
            id: "compassion-read",
            kind: "read",
            title: "Three parts of self-compassion",
            body: [
              "Kristin Neff describes self-compassion in three parts. Mindfulness: noticing that this is hard, without exaggerating or dismissing it. Common humanity: remembering that other people go through this too, that you are not uniquely foolish. Kindness: speaking to yourself the way you would to a friend in the same place.",
              "It is not self-pity and it is not letting yourself off the hook. People who are kinder to themselves actually take more responsibility, because mistakes stop feeling like a verdict on their worth.",
            ],
          },
          {
            id: "compassion-break",
            kind: "timer",
            title: "A self-compassion break",
            seconds: 90,
            cues: [
              "Think of something that has hurt you in this relationship.",
              "Say to yourself: this is really hard.",
              "Remind yourself: other people have been here too. I am not alone in this.",
              "Put a hand on your chest if it feels right.",
              "Say: may I be kind to myself right now.",
              "Stay with that for a few more breaths.",
            ],
          },
          {
            id: "friend-letter",
            kind: "letter",
            to: "yourself",
            prompt: "Write to yourself as a close friend would, someone who knows everything that has happened and is completely on your side.",
            opening: "Dear me,",
          },
        ],
        takeaway: "The voice that doubts you is not the only voice you have. You can choose which one to listen to.",
      },
      {
        day: 3,
        title: "Your early warning signs",
        minutes: 13,
        technique: "Relapse prevention · personal plan",
        intro:
          "The doubt will come back sometimes. That is not failure; it is how recovery works. What matters is catching it early.",
        blocks: [
          {
            id: "signs",
            kind: "choose",
            prompt: "Which of these are signs you are starting to doubt yourself again?",
            options: [
              "Apologising before I know what I did",
              "Checking my memory with him",
              "Stopping writing in my record",
              "Cancelling on friends",
              "Replaying conversations for hours",
              "Feeling I'm too much",
              "Going quiet in arguments again",
              "Trusting his version over mine",
            ],
          },
          {
            id: "plan",
            kind: "script",
            prompt: "Your plan for when you notice the signs.",
            template: ["When I notice {sign},", "I will {action},", "and I will talk to {person}."],
            fields: [
              { key: "sign", label: "Your earliest sign", placeholder: "that I'm apologising for things I didn't do" },
              { key: "action", label: "One thing you'll do", placeholder: "read my record from the last two weeks" },
              { key: "person", label: "Who you'll talk to", placeholder: "my sister" },
            ],
          },
        ],
        takeaway: "A slip is not the end of the progress. Catching it is the progress.",
      },
      {
        day: 4,
        title: "Deciding, not drifting",
        minutes: 15,
        technique: "Decision support · safety planning",
        intro:
          "This programme will never tell you whether to stay or to go. That is your decision, and nobody else's. But you deserve to make it deliberately, rather than having it made for you by default.",
        blocks: [
          {
            id: "decide-read",
            kind: "read",
            title: "What would need to be true",
            body: [
              "Rather than asking \"should I stay?\", try asking: \"what would need to be true for me to feel safe and respected here?\" That question has an answer you can check, week by week, instead of a feeling that changes by the hour.",
              "If you are thinking about leaving, and especially if you are afraid of how he would react, please plan it with a specialist service rather than alone. The time around leaving can carry the highest risk. In the UK, Refuge is on 0808 2000 247, free, day and night.",
            ],
          },
          {
            id: "need-true",
            kind: "reflect",
            prompt: "What would need to be true for you to feel safe and respected in this relationship? Be specific.",
          },
          {
            id: "is-true",
            kind: "reflect",
            prompt: "Looking at your record from the last few weeks, how much of that is true now?",
          },
          {
            id: "clarity-w4",
            kind: "scale",
            prompt: "How clear-headed do you feel today, about your own life?",
            low: "completely foggy",
            high: "completely clear",
            compareTo: { week: 1, day: 5, id: "clarity-w1", label: "At the end of week 1" },
          },
        ],
        takeaway: "Whatever you decide, deciding it on purpose is what makes it yours.",
      },
      {
        day: 5,
        title: "The person you're coming back to",
        minutes: 15,
        technique: "Integration · future-self letter",
        intro:
          "Four weeks ago you started writing down what happened. Today, the last session, you write to the person you are becoming.",
        blocks: [
          {
            id: "future-letter",
            kind: "letter",
            to: "yourself, three months from now",
            prompt: "What do you want her to remember from these four weeks? What do you hope she is doing, and who is she spending time with?",
            opening: "Dear future me,",
          },
          {
            id: "self-trust-final",
            kind: "scale",
            prompt: "Last time: how much do you trust your own read of what happens between you?",
            low: "not at all",
            high: "completely",
            compareTo: { week: 1, day: 3, id: "self-trust-baseline", label: "On day 3 of week 1" },
          },
          {
            id: "keep",
            kind: "reflect",
            prompt: "Of everything in this programme, what is the one thing you are going to keep doing?",
          },
        ],
        takeaway: "You were never the unreliable one. You just needed somewhere to write it down.",
      },
    ],
  },
];

import type { Week } from "../types";

/**
 * FRIENDSHIPS THAT GIVE BACK
 * Ending one-sided friendships and finding your people.
 *
 * For the friendship quizzes: the toxic friend test, are my friends bad
 * for me, are my friends using me, the friend group role quiz and the
 * best-friend test. The common thread is almost never one villain. It is
 * a giver who has drifted into friendships that only run one way, and
 * who finds it very hard to ask for anything back.
 *
 * So the programme does not start with "cut them off". It starts with a
 * map, moves through why she gives first, practises saying no and asking
 * for something back, and only then decides, friend by friend, between
 * repair, fading and ending. Friends are "they" throughout.
 */

export const FRIENDSHIPS_THAT_GIVE_BACK: Week[] = [
  /* ═════════════════════════════ WEEK 1 ═════════════════════════════ */
  {
    week: 1,
    theme: "See it",
    goal: "Map your friendships, see who drains and who restores, and take an honest baseline.",
    sessions: [
      {
        day: 1,
        title: "Your friendship map",
        minutes: 13,
        technique: "Social mapping",
        intro:
          "Most people have never looked at their friendships all at once. Today you draw the map: who is close, who is further out, and who is only there out of habit.",
        blocks: [
          {
            id: "map-read",
            kind: "read",
            title: "Circles, not a list",
            body: [
              "Friendships sit in rings. A small inner circle of people you would call at 3am. A wider ring of good friends. Then a larger crowd of people you like but do not really confide in.",
              "Trouble usually starts when someone sits in an inner ring out of history or habit, while the way they treat you belongs much further out. Mapping it makes that visible.",
            ],
            why: "The anthropologist Robin Dunbar found that human social networks tend to form layers of roughly 5 intimate friends, 15 close friends and 50 good friends, each layer requiring more time and trust than the one outside it. You have limited room in the inner rings, which is why who sits there matters.",
          },
          {
            id: "inner-circle",
            kind: "reflect",
            prompt: "Who is in your inner circle right now, the people you would tell something hard? List them, initials are fine.",
            rows: 4,
          },
          {
            id: "habit-circle",
            kind: "reflect",
            prompt: "Who is close to you mainly because of history, habit or a group you're both in, rather than because of how they treat you now?",
          },
          {
            id: "map-check",
            kind: "check",
            question: "You have known a friend for fifteen years. Lately, after seeing them, you usually feel worse about yourself. What does the length of the friendship tell you?",
            options: [
              { text: "That it must be a good friendship, or it wouldn't have lasted.", because: "Length shows loyalty and history, both real. It does not tell you how the friendship works now." },
              { text: "That it has a lot of history, which is a separate question from whether it is good for you now.", correct: true, because: "Yes. History earns a friendship some patience. It does not earn it a permanent place in the inner circle regardless of how it feels." },
              { text: "That I'm being ungrateful.", because: "Noticing how you feel after seeing someone is not ingratitude. It is information." },
            ],
          },
        ],
        takeaway: "History is a reason for patience. It is not a reason to stay in the inner circle.",
      },
      {
        day: 2,
        title: "Who drains, who restores",
        minutes: 12,
        technique: "Energy audit",
        intro:
          "You can tell a lot about a friendship from how you feel on the way home. Today you run an energy audit.",
        blocks: [
          {
            id: "energy-read",
            kind: "read",
            title: "The walk home",
            body: [
              "After some friends you feel lighter, more yourself, a bit braver. After others you feel tired, smaller, or slightly on edge, even when nothing obviously bad happened.",
              "The trickiest friendships are the mixed ones: sometimes wonderful, sometimes cutting. They are the hardest to see clearly, because the good times keep you from trusting the bad feelings.",
            ],
            why: "Research by Julianne Holt-Lunstad and Bert Uchino found that relationships that are both supportive and upsetting, which they called ambivalent ties, were linked to higher blood pressure responses than purely supportive ones. Mixed friendships may be more stressful than they look.",
          },
          {
            id: "energy-sort",
            kind: "sort",
            prompt: "Think of your friends as you go. Where does each kind of feeling after seeing someone belong?",
            buckets: ["Restores me", "Drains me"],
            items: [
              { text: "I feel more like myself", answer: "Restores me" },
              { text: "I replay things they said", answer: "Drains me" },
              { text: "I laughed properly", answer: "Restores me" },
              { text: "I feel I talked too much about myself, or not at all", answer: "Drains me" },
              { text: "I feel braver about something", answer: "Restores me" },
              { text: "I feel slightly smaller than before", answer: "Drains me" },
              { text: "I feel listened to", answer: "Restores me" },
              { text: "I need a quiet evening to recover", answer: "Drains me" },
            ],
            after: "Now put names next to these in your head. The friend you thought of for \"drains me\" came to mind fast, didn't they?",
          },
          {
            id: "energy-reflect",
            kind: "reflect",
            prompt: "Which friend restores you most, and which drains you most? What is the difference in how each of them treats you?",
          },
        ],
        takeaway: "Pay attention to the walk home. It is honest.",
      },
      {
        day: 3,
        title: "The one-sided signs",
        minutes: 13,
        technique: "Pattern recognition",
        intro:
          "No friendship is perfectly even. Some are so uneven that you are carrying it alone. Today you learn the signs.",
        blocks: [
          {
            id: "onesided-read",
            kind: "read",
            title: "Even over time, not every day",
            body: [
              "Healthy friendships are not scorecards. One person leans on the other through a divorce, and a year later it flips. What matters is that it evens out over time.",
              "A one-sided friendship does not even out. You always initiate. You always listen. Your news gets a quick \"aw\" before the conversation swings back to them. When you needed them, they were busy.",
            ],
            why: "The sociologist Alvin Gouldner described the norm of reciprocity in 1960: a near-universal expectation that help and kindness are returned over time. When it is broken repeatedly, people tend to feel used, even when they cannot say exactly why.",
          },
          {
            id: "onesided-signs",
            kind: "choose",
            prompt: "Think of your most draining friend. Which of these are true?",
            options: [
              "I almost always get in touch first",
              "Conversations mostly turn to them",
              "They're around when they need something",
              "My good news gets a flat response",
              "They cancel on me more than I cancel on them",
              "I know far more about their life than they know about mine",
              "They make jokes at my expense in front of others",
              "When I needed them, they weren't there",
              "I feel I have to be careful what I say",
            ],
            after: {
              few: "Some unevenness. Worth watching, and worth one honest conversation later in the programme.",
              many: "This friendship runs one way. That is not your imagination, and it is not because you are too sensitive.",
            },
          },
          {
            id: "last-needed",
            kind: "reflect",
            prompt: "Think of the last time you needed that friend. What happened?",
          },
        ],
        takeaway: "Friendship evens out over time. If it never does, you are not in a friendship, you are providing a service.",
      },
      {
        day: 4,
        title: "Your role in the group",
        minutes: 12,
        technique: "Role analysis",
        intro:
          "In most friend groups everyone ends up with a role. Some roles are fun. Some quietly wear you out. Today you name yours.",
        blocks: [
          {
            id: "role-read",
            kind: "read",
            title: "The job nobody gave you",
            body: [
              "The organiser, who books the table and chases the replies. The therapist, who everyone calls in a crisis. The peacekeeper, who smooths things over. The one who always drives. The joker, who keeps it light even when they are not okay.",
              "Roles often start as something you are good at. Over time, they can turn into something you are expected to do, and nobody notices the effort because you make it look easy.",
            ],
            why: "Group psychologists have long observed that members settle into stable roles, and that roles can persist long after they stop suiting the person in them. Seeing your role as a role, rather than as who you are, is what makes it possible to change it.",
          },
          {
            id: "my-role",
            kind: "choose",
            prompt: "Which roles do you play?",
            options: [
              "The organiser",
              "The therapist",
              "The peacekeeper",
              "The driver or host",
              "The joker",
              "The one who remembers birthdays",
              "The reliable one, who never needs anything",
              "The one who goes along with everyone else",
            ],
            after: {
              few: "That is your job in the group. Ask yourself whether you chose it, or it chose you.",
              many: "You are doing a lot of work to keep the group running. Some of that may be love. Some of it may be fear of what happens if you stop.",
            },
          },
          {
            id: "role-stop",
            kind: "reflect",
            prompt: "If you stopped doing your main role for a month, what do you think would happen? What are you afraid would happen?",
          },
        ],
        takeaway: "A role you are good at can still be a role you are tired of.",
      },
      {
        day: 5,
        title: "Where you stand now",
        minutes: 10,
        technique: "Baseline measure",
        intro:
          "Three quick measures to close the week. You will take them again in week 4.",
        blocks: [
          {
            id: "baseline-read",
            kind: "read",
            title: "Why measure",
            body: [
              "Friendships change slowly, and from inside it can be hard to tell whether anything has shifted. A number now gives you something honest to compare against later.",
            ],
            why: "Structured therapies measure at the start and repeat the measure later, partly to see what is working and partly because seeing change in writing helps people keep going.",
          },
          {
            id: "drain-baseline",
            kind: "scale",
            better: "lower",
            prompt: "On average, how drained do your friendships leave you?",
            low: "not at all",
            high: "completely",
          },
          {
            id: "twoway-baseline",
            kind: "scale",
            prompt: "How two-way do your close friendships feel?",
            low: "all one way",
            high: "completely even",
          },
          {
            id: "no-baseline",
            kind: "scale",
            prompt: "How easy is it for you to say no to a friend?",
            low: "impossible",
            high: "easy",
          },
          {
            id: "week1-notice",
            kind: "reflect",
            prompt: "What did you notice about your friendships this week that you had not let yourself see before?",
          },
        ],
        takeaway: "You have a starting point. Everything from here is measured against it.",
      },
    ],
  },

  /* ═════════════════════════════ WEEK 2 ═════════════════════════════ */
  {
    week: 2,
    theme: "Understand it",
    goal: "Understand why you give first, where the guilt comes from, and what the imbalance is costing you.",
    sessions: [
      {
        day: 1,
        title: "Why you give first",
        minutes: 14,
        technique: "Schema · self-sacrifice",
        intro:
          "Givers are not born. They are usually made, early, by learning that being useful is the safest way to be loved. Today you look at how you learned it.",
        blocks: [
          {
            id: "give-read",
            kind: "read",
            title: "Useful equals safe",
            body: [
              "If, growing up, you were loved most when you were helpful, easy or good, you may have learned that your value lies in what you provide. Needing things yourself felt risky, or selfish, or just pointless.",
              "In adult friendships that turns into giving first, giving more, and feeling uneasy when someone gives back. It also attracts people who are very happy to take.",
              "None of this makes kindness a problem. It makes kindness that you cannot switch off a problem.",
            ],
            why: "Jeffrey Young's schema therapy describes self-sacrifice (meeting others' needs at the expense of your own) and subjugation (giving in to avoid conflict or rejection) as common patterns learned in childhood. The therapist Pete Walker coined the phrase \"fawn response\" for the reflex to please people in order to feel safe.",
          },
          {
            id: "give-beliefs",
            kind: "choose",
            prompt: "Which of these feel true?",
            options: [
              "If I stop giving, people will stop liking me",
              "My needs are less important than other people's",
              "Saying no makes me a bad friend",
              "I should be able to cope without help",
              "Conflict is worse than being taken for granted",
              "I have to earn my place in the group",
              "It's selfish to want something back",
            ],
            after: {
              few: "These are the rules behind your giving. You did not choose them, and you can revise them.",
              many: "That is a lot of rules pointing the same way: you last. No wonder the balance has tipped so far.",
            },
          },
          {
            id: "where-learned",
            kind: "reflect",
            prompt: "When did you first learn that being helpful was the way to be loved or kept safe?",
            hint: "A general picture is enough. \"Being the easy child when things were hard at home\" is plenty.",
          },
        ],
        takeaway: "Kindness is a strength. Kindness you cannot switch off is a trap.",
      },
      {
        day: 2,
        title: "Guilt versus obligation",
        minutes: 14,
        technique: "CBT · beliefs",
        intro:
          "Givers often feel guilty whenever they do anything for themselves. Today you learn to tell real guilt, which is useful, from false guilt, which is just the old rules talking.",
        blocks: [
          {
            id: "guilt-read",
            kind: "read",
            title: "The tyranny of the should",
            body: [
              "Real guilt says: I did something against my own values, and I should put it right. It is uncomfortable and useful.",
              "False guilt says: I disappointed someone, so I must have done something wrong. It fires when you say no, when you rest, when you do not reply straight away. It is the old rules talking, and it is often loudest when you have done nothing wrong at all.",
              "The test is simple. Did I break one of my values, or did I just not give someone what they wanted?",
            ],
            why: "The psychoanalyst Karen Horney called it \"the tyranny of the should\": rigid inner rules about how we must be. Cognitive therapy treats \"should\" statements as a common thinking trap, and thought records are the standard way of loosening them.",
          },
          {
            id: "guilt-record",
            kind: "thoughts",
            prompt: "Take a recent time you felt guilty for not giving a friend something. Pull it apart.",
            example: {
              situation: "I told Jess I couldn't help her move on Saturday because I'd promised myself a rest day.",
              thought: "I'm a terrible friend. She always needs me and I let her down.",
              evidence: "For: she sounded disappointed. Against: I've helped her move twice before. She has other friends and a car. I've been exhausted for weeks. She didn't come to my birthday.",
              balanced: "I disappointed her, which is uncomfortable, but I didn't break any of my values. Resting when I'm exhausted is allowed.",
            },
          },
          {
            id: "guilt-check",
            kind: "check",
            question: "Which of these is most likely real guilt, the kind worth acting on?",
            options: [
              { text: "Feeling bad for saying no to lending money for the third time.", because: "Disappointing someone is not the same as doing wrong. This is probably the old rules talking." },
              { text: "Feeling bad because I shared a friend's secret with someone else.", correct: true, because: "Yes. That broke a value you hold, trust, and putting it right would be worth doing." },
              { text: "Feeling bad for not replying to a message for a day.", because: "A day is a normal response time for most people. This is almost always false guilt." },
            ],
          },
        ],
        takeaway: "Disappointing someone is not the same as doing something wrong.",
      },
      {
        day: 3,
        title: "The friend who can't be happy for you",
        minutes: 13,
        technique: "Envy and rivalry",
        intro:
          "You can learn more about a friend from how they react to your good news than to your bad. Today is about that moment.",
        blocks: [
          {
            id: "goodnews-read",
            kind: "read",
            title: "How they answer your good news",
            body: [
              "Most people are decent in a crisis. The quieter test is good news. You got the job, the flat, the relationship. Does your friend light up and ask questions? Or do they say \"nice\" and change the subject, or find the catch, or turn it into a story about themselves?",
              "A friend who is often cool about your wins may be struggling with envy. That is human, and it is not always a reason to end things. But if it happens every time, you will start to hide your good news from them, and that is a sign of how the friendship really works.",
            ],
            why: "Shelly Gable's research on how people respond to a partner's or friend's good news found four styles: active and warm, passive and warm, active and deflating, and passive and dismissive. Only the first, enthusiastic engagement, was reliably linked to closer, more satisfying relationships.",
          },
          {
            id: "goodnews-sort",
            kind: "sort",
            prompt: "You tell a friend you've been promoted. Which kind of response is each of these?",
            buckets: ["Builds you up", "Brings you down"],
            items: [
              { text: "\"That's amazing! How did you find out? Tell me everything.\"", answer: "Builds you up" },
              { text: "\"Nice.\" Then back to their weekend", answer: "Brings you down" },
              { text: "\"Won't that mean loads more stress though?\"", answer: "Brings you down" },
              { text: "\"You worked so hard for this. Let's celebrate.\"", answer: "Builds you up" },
              { text: "\"Must be nice. I never get lucky like that.\"", answer: "Brings you down" },
            ],
            after: "Notice which kind your draining friend usually gives. And notice which kind you give them.",
          },
          {
            id: "hide-news",
            kind: "reflect",
            prompt: "Is there a friend you have started hiding good news from? What happens when you share it?",
          },
        ],
        takeaway: "Watch how a friend answers your good news. It tells you more than their help in a crisis.",
      },
      {
        day: 4,
        title: "The role you got stuck in",
        minutes: 13,
        technique: "Family roles",
        intro:
          "The role you play with friends often started much earlier, at home. Today you trace it back.",
        blocks: [
          {
            id: "family-read",
            kind: "read",
            title: "Old jobs, new places",
            body: [
              "In many families children take on jobs. The one who keeps the peace. The one who looks after a parent. The one who makes everyone laugh when things are tense. The one who never causes trouble.",
              "Those jobs follow people into adult life, and friendships are one of the first places they show up. If you were the peacekeeper at ten, you may still be the one smoothing things over at thirty, without ever having decided to be.",
            ],
            why: "The family therapist Virginia Satir described \"placating\", agreeing and pleasing to avoid conflict, as one of the main ways people cope under stress. Family therapists since have written widely about roles children take on in stressed families, including the caretaker and the peacekeeper, and how those roles carry into adult relationships.",
          },
          {
            id: "family-role",
            kind: "choose",
            prompt: "Which of these was your job at home?",
            options: [
              "Keeping the peace",
              "Looking after a parent or siblings",
              "Being the easy one, never causing trouble",
              "Making everyone laugh",
              "Being the achiever the family was proud of",
              "Staying out of the way",
              "None of these, really",
            ],
          },
          {
            id: "same-role",
            kind: "reflect",
            prompt: "Where does that same job show up in your friendships now?",
          },
        ],
        takeaway: "You may still be doing a job you were given at ten. You are allowed to resign.",
      },
      {
        day: 5,
        title: "The cost ledger",
        minutes: 12,
        technique: "Behavioural audit",
        intro:
          "Givers are good at counting what they owe and bad at counting what it costs them. Today you do the second sum.",
        blocks: [
          {
            id: "ledger-read",
            kind: "read",
            title: "What it costs",
            body: [
              "Giving to a one-sided friendship costs time, money and energy, and it also costs you the friendships you did not have room for. Every Friday spent propping up someone who never asks how you are is a Friday you did not spend with someone who would.",
            ],
            why: "Behaviour therapists call this a cost-benefit audit. Writing down the real costs matters because people consistently underweight slow, spread-out costs compared with the immediate discomfort of changing something.",
          },
          {
            id: "ledger",
            kind: "script",
            prompt: "Your ledger for your most draining friendship.",
            template: [
              "This friendship costs me {time}.",
              "It costs me {money}.",
              "It has made me feel {feel}.",
              "It has left less room for {room}.",
            ],
            fields: [
              { key: "time", label: "Time", placeholder: "most Sunday evenings on the phone" },
              { key: "money", label: "Money or favours", placeholder: "about £400 I won't see again" },
              { key: "feel", label: "How it makes you feel", placeholder: "like I'm only worth what I do for her" },
              { key: "room", label: "What it crowds out", placeholder: "seeing Aisha, who actually asks about me" },
            ],
          },
          {
            id: "drain-w2",
            kind: "scale",
            better: "lower",
            prompt: "On average, how drained do your friendships leave you?",
            low: "not at all",
            high: "completely",
            compareTo: { week: 1, day: 5, id: "drain-baseline", label: "At the end of week 1" },
          },
          {
            id: "week2-notice",
            kind: "reflect",
            prompt: "What do you understand about your giving now that you did not two weeks ago?",
          },
        ],
        takeaway: "Every hour given to a one-way friendship is an hour not given to a two-way one.",
      },
    ],
  },

  /* ═════════════════════════════ WEEK 3 ═════════════════════════════ */
  {
    week: 3,
    theme: "Change it",
    goal: "Practise saying no, ask for something back, decide what each friendship needs, and have the hard talk if it is needed.",
    sessions: [
      {
        day: 1,
        title: "No, without a reason",
        minutes: 12,
        technique: "Assertiveness",
        intro:
          "Givers tend to wrap every no in three reasons and an apology. Today you practise a shorter version.",
        blocks: [
          {
            id: "no-read",
            kind: "read",
            title: "A reason is an invitation to argue",
            body: [
              "When you give a reason for a no, you give the other person something to solve. \"I can't, I'm tired\" becomes \"Oh, just come for an hour then.\" Now you have to say no twice.",
              "A kind, plain no does not need a reason. \"I can't make it this time, but have a great night.\" If they push, repeat it calmly, word for word. You do not owe a debate.",
            ],
            why: "The psychologist Manuel Smith's 1975 book When I Say No, I Feel Guilty popularised the \"broken record\" technique: calmly repeating the same short answer instead of justifying it. It is still taught in assertiveness training.",
          },
          {
            id: "no-script",
            kind: "script",
            prompt: "Write your plain no.",
            template: ["{warm}", "{no}", "If they push, I'll say again: {repeat}"],
            fields: [
              { key: "warm", label: "A warm opener", placeholder: "Thanks for thinking of me." },
              { key: "no", label: "The no, no reason", placeholder: "I can't do Saturday this time." },
              { key: "repeat", label: "Your broken record line", placeholder: "I can't this time, but have a lovely day." },
            ],
          },
          {
            id: "no-experiment",
            kind: "experiment",
            task: "This week, say one no to a friend without giving a reason.",
            predictPrompt: "What do you predict they will do, and how guilty will you feel, from 0 to 10?",
            resultPrompt: "What actually happened, and how guilty did you actually feel?",
            learnPrompt: "What did this tell you about saying no?",
          },
        ],
        takeaway: "No is a complete sentence. Kind is optional but nice. Reasons are not required.",
      },
      {
        day: 2,
        title: "Asking for something back",
        minutes: 12,
        technique: "Behavioural experiment",
        intro:
          "Givers almost never ask. Which means they never find out who would have said yes. Today you ask for one thing.",
        blocks: [
          {
            id: "ask-read",
            kind: "read",
            title: "People say yes more than you think",
            body: [
              "If you always give and never ask, a one-sided friendship can look two-sided, because you never test it. Asking for something is how you find out.",
              "Keep it small and specific. \"Could you come with me to look at a flat on Thursday?\" \"Can I talk to you about something that's been bothering me?\" The answer, and how it is given, is information.",
            ],
            why: "Studies by Francis Flynn and Vanessa Bohns found that people consistently underestimate how likely others are to agree to a request for help, in some experiments by as much as half. Givers tend to assume a no that would never have come.",
          },
          {
            id: "ask-script",
            kind: "script",
            prompt: "Draft your ask.",
            template: ["Could you {ask}", "{when}?"],
            fields: [
              { key: "ask", label: "What you'll ask for", placeholder: "come with me to the hospital appointment" },
              { key: "when", label: "When", placeholder: "on Thursday morning" },
            ],
          },
          {
            id: "ask-experiment",
            kind: "experiment",
            task: "Ask one friend for your small, specific thing this week.",
            predictPrompt: "What do you predict they'll say? How uncomfortable will asking feel, from 0 to 10?",
            resultPrompt: "What did they actually say, and how?",
            learnPrompt: "What does their response tell you about this friendship?",
          },
        ],
        takeaway: "You cannot know who would show up for you until you ask.",
      },
      {
        day: 3,
        title: "Fade or conversation",
        minutes: 14,
        technique: "Decision skill",
        intro:
          "Not every difficult friendship needs a confrontation, and not every one should quietly fade. Today you decide, friend by friend, which it needs.",
        blocks: [
          {
            id: "decide-read",
            kind: "read",
            title: "Three honest options",
            body: [
              "Repair: the friendship is worth saving, and one honest conversation might rebalance it. Usually right when the friend is caring but careless, or has not realised.",
              "Fade: you step back quietly. Fewer and shorter contacts, slower replies, no announcement. Usually right when a conversation would not be heard, or the friendship was mostly circumstance.",
              "End: you say it is over. Usually only needed when the friendship is harmful: cruelty, betrayal, or someone who will not let a fade happen.",
            ],
            why: "Weighing options against each other before acting, rather than deciding in the heat of the moment, is a core skill in both motivational interviewing and DBT. Writing out the choices makes it much harder for guilt alone to decide.",
          },
          {
            id: "decide-sort",
            kind: "sort",
            prompt: "For each situation, which option usually fits best?",
            buckets: ["Repair", "Fade", "End"],
            items: [
              { text: "A kind friend who has become self-absorbed since having a baby", answer: "Repair" },
              { text: "A work friend you only stayed close to out of habit", answer: "Fade" },
              { text: "A friend who shared your secret to embarrass you, again", answer: "End" },
              { text: "A friend who doesn't realise you always organise everything", answer: "Repair" },
              { text: "A friend who only calls when they need money", answer: "Fade" },
            ],
            after: "These are rules of thumb, not laws. You know your friends. The point is to choose deliberately, not to let guilt choose for you.",
          },
          {
            id: "my-decisions",
            kind: "reflect",
            prompt: "Go through the friends on your map who drain you. For each, write repair, fade or end, and one line on why.",
            rows: 6,
          },
        ],
        takeaway: "Repair, fade or end. Choose on purpose, one friend at a time.",
      },
      {
        day: 4,
        title: "The hard talk, scripted",
        minutes: 15,
        technique: "DBT · DEAR MAN",
        intro:
          "If a friendship is worth repairing, it probably needs one honest conversation. Today you script it, so it does not come out as a blow-up or a mumble.",
        blocks: [
          {
            id: "dearman-read",
            kind: "read",
            title: "A structure for saying hard things",
            body: [
              "Describe the facts, without labels. Express how you feel, using \"I\". Assert what you would like, clearly. Reinforce why it would help both of you.",
              "Then stay Mindful of your goal, do not get pulled into old arguments. Appear confident, even if you are not. Negotiate, be willing to meet halfway.",
              "That is DEAR MAN. It sounds formal, but in practice it just stops the conversation sliding into blame or apology.",
            ],
            why: "DEAR MAN comes from Marsha Linehan's Dialectical Behaviour Therapy, where it is taught as a core interpersonal effectiveness skill for asking for what you need while keeping the relationship and your self-respect.",
          },
          {
            id: "dearman-script",
            kind: "script",
            prompt: "Script your conversation.",
            template: [
              "Describe: {describe}",
              "Express: {express}",
              "Assert: {assert}",
              "Reinforce: {reinforce}",
            ],
            fields: [
              { key: "describe", label: "The facts", placeholder: "The last few times we've met up, I've organised it and we've mostly talked about your stuff." },
              { key: "express", label: "How you feel", placeholder: "I feel a bit invisible, and I've started dreading it, which I hate." },
              { key: "assert", label: "What you'd like", placeholder: "I'd love you to plan the next one, and to ask how I'm doing." },
              { key: "reinforce", label: "Why it helps you both", placeholder: "I really want to keep this friendship. I think it'd feel better for both of us." },
            ],
          },
          {
            id: "talk-check",
            kind: "check",
            question: "Which opening is most likely to be heard?",
            options: [
              { text: "\"You're so selfish, it's always about you.\"", because: "It is a label, not a fact, and it invites a defence rather than a conversation." },
              { text: "\"The last three times we met, I planned it and we mainly talked about your week. I'd love it to feel more even.\"", correct: true, because: "Yes. Facts they can recognise, and a clear, fair request." },
              { text: "\"It's probably just me, but I sometimes feel a tiny bit left out, sorry.\"", because: "Softening this much makes it easy to dismiss. You are allowed to say it plainly." },
            ],
          },
        ],
        takeaway: "Facts, feelings, a clear ask. Hard talks go better with a script.",
      },
      {
        day: 5,
        title: "The reciprocity experiment",
        minutes: 12,
        technique: "Behavioural experiment",
        intro:
          "One clean test of a friendship: stop initiating for a while, and see who reaches out. Today you set it up.",
        blocks: [
          {
            id: "recip-read",
            kind: "read",
            title: "Stop carrying, and see",
            body: [
              "If you always make the plans and send the first message, you never find out whether the friendship would exist without your effort.",
              "For two weeks, stop initiating with one or two friends. Reply warmly when they get in touch, but do not start the contact yourself. Then see what happens.",
              "Whatever the result, it is useful. If they reach out, the friendship is more two-way than it felt. If they do not, you know how much of it was you.",
            ],
            why: "A behavioural experiment tests a belief by changing what you do and observing the result, a core technique in cognitive behavioural therapy. Here the belief being tested is \"this friendship would carry on without my effort\".",
          },
          {
            id: "recip-exp",
            kind: "experiment",
            task: "For two weeks, don't initiate contact with one or two friends you usually chase. Reply warmly if they get in touch.",
            predictPrompt: "Who do you predict will get in touch, and who won't?",
            resultPrompt: "Who actually got in touch? What happened?",
            learnPrompt: "What does this tell you about those friendships?",
          },
          {
            id: "week3-notice",
            kind: "reflect",
            prompt: "Of everything you tried this week, what surprised you most?",
          },
        ],
        takeaway: "If you stop carrying a friendship, you find out whether it can walk.",
      },
    ],
  },

  /* ═════════════════════════════ WEEK 4 ═════════════════════════════ */
  {
    week: 4,
    theme: "Live it",
    goal: "Know what you want from a friend, make room for new people, plan for old habits, and let go of what needs letting go.",
    sessions: [
      {
        day: 1,
        title: "What you want from a friend",
        minutes: 13,
        technique: "ACT · values",
        intro:
          "You have spent a lot of time on what friends want from you. Today is about what you want from them.",
        blocks: [
          {
            id: "want-read",
            kind: "read",
            title: "Three kinds of friendship",
            body: [
              "Over two thousand years ago Aristotle described three kinds of friendship: friendships of use, where each person gets something practical; friendships of pleasure, built on fun; and friendships of character, where each person values the other for who they are.",
              "All three are fine. The trouble comes when you give a friendship of use the loyalty of a friendship of character. Knowing what you want from each friend helps you invest in the right places.",
            ],
            why: "Aristotle's account is in the Nicomachean Ethics. Acceptance and Commitment Therapy adds the modern idea of choosing how you act by your values, rather than by guilt or habit.",
          },
          {
            id: "want-values",
            kind: "choose",
            prompt: "What matters most to you in a close friend?",
            options: [
              "They ask how I am, and listen",
              "They're glad when things go well for me",
              "They show up when it matters",
              "I can be completely myself",
              "We laugh a lot",
              "They tell me the truth kindly",
              "It feels even over time",
              "They make the effort too",
            ],
          },
          {
            id: "want-script",
            kind: "script",
            prompt: "Say it plainly.",
            template: ["I want friends who {want}.", "And I want to be a friend who {be}."],
            fields: [
              { key: "want", label: "What you want from them", placeholder: "ask about my life and are happy when it goes well" },
              { key: "be", label: "What you want to give", placeholder: "turns up, but not at the cost of myself" },
            ],
          },
        ],
        takeaway: "You are allowed to want things from a friendship too.",
      },
      {
        day: 2,
        title: "Finding your people",
        minutes: 13,
        technique: "Social activation",
        intro:
          "Stepping back from draining friendships leaves space. Today you plan how to fill some of it, slowly and on purpose.",
        blocks: [
          {
            id: "people-read",
            kind: "read",
            title: "Friendship takes hours",
            body: [
              "Adult friendships rarely happen by accident. They grow from repeated time together, usually in a shared setting: a class, a club, a team, a regular coffee.",
              "It takes longer than people expect, which is why so many give up after one nice evening. Pick one thing you will do repeatedly, and let time do the work.",
            ],
            why: "A 2018 study by Jeffrey Hall estimated that it takes around 50 hours together to go from acquaintance to casual friend, about 90 hours to become friends, and over 200 hours to become close friends.",
          },
          {
            id: "people-ideas",
            kind: "choose",
            prompt: "Where could you meet people repeatedly?",
            options: [
              "A weekly class or course",
              "A sports team or running club",
              "Volunteering",
              "A book club or hobby group",
              "Reconnecting with an old friend I drifted from",
              "Saying yes more to a colleague I like",
              "A regular walk or coffee with one person",
            ],
          },
          {
            id: "people-plan",
            kind: "script",
            prompt: "Your plan.",
            template: ["This month, I'll {thing}", "every {when},", "and I'll say yes to {yes}."],
            fields: [
              { key: "thing", label: "What you'll do", placeholder: "go to the Tuesday pottery class" },
              { key: "when", label: "How often", placeholder: "week" },
              { key: "yes", label: "One invitation you'll accept", placeholder: "the next drinks after class" },
            ],
          },
        ],
        takeaway: "New friendships are built in hours, not in one great evening. Give them the hours.",
      },
      {
        day: 3,
        title: "Your early warning signs",
        minutes: 12,
        technique: "Relapse prevention",
        intro:
          "Old habits come back, especially when someone needs you. Today you plan for that.",
        blocks: [
          {
            id: "relapse-read",
            kind: "read",
            title: "The pull back into giving",
            body: [
              "You will slip. A friend in crisis, a birthday you always organise, a guilt-trip that lands on a bad day. That is normal.",
              "The goal is to notice sooner. A written list of your signs, and what you will do about them, makes that far more likely.",
            ],
            why: "Alan Marlatt's relapse prevention model treats slips as predictable and plans for them in advance, so a lapse does not turn into a full return to the old pattern.",
          },
          {
            id: "warning-signs",
            kind: "choose",
            prompt: "Which would be your early warning signs?",
            options: [
              "I'm saying yes before I've checked if I want to",
              "I'm initiating everything again",
              "I'm giving reasons for every no",
              "I'm dreading seeing someone but going anyway",
              "I'm the group therapist again",
              "I've stopped asking for anything",
              "I'm feeling guilty for resting",
            ],
          },
          {
            id: "relapse-plan",
            kind: "script",
            prompt: "Your plan.",
            template: ["If I notice {sign},", "I will {action},", "and I'll remind myself: {remind}"],
            fields: [
              { key: "sign", label: "Your earliest sign", placeholder: "I'm saying yes before I've checked" },
              { key: "action", label: "What you'll do", placeholder: "reply \"let me check and get back to you\"" },
              { key: "remind", label: "What you'll remember", placeholder: "disappointing someone isn't doing wrong" },
            ],
          },
        ],
        takeaway: "\"Let me check and get back to you\" buys you the time to choose.",
      },
      {
        day: 4,
        title: "Letting go well",
        minutes: 14,
        technique: "Grief and endings",
        intro:
          "Stepping back from a friendship is a loss, even when it is the right choice. Today you let yourself grieve it, and measure how far you have come.",
        blocks: [
          {
            id: "grief-read",
            kind: "read",
            title: "Friendship endings hurt",
            body: [
              "People expect to grieve a breakup. Fewer expect to grieve a friend, and fewer still get sympathy for it. So the sadness gets pushed down, or turns into guilt, or pulls you back into the friendship to make it stop.",
              "You can be sad about a friendship and still be right to step back from it. Both are true. Let yourself miss the good parts.",
            ],
            why: "The grief researcher Kenneth Doka coined the term \"disenfranchised grief\" for losses that are not openly acknowledged or supported by others. The end of a friendship is often one of them.",
          },
          {
            id: "grief-reflect",
            kind: "reflect",
            prompt: "What will you genuinely miss about a friendship you are stepping back from? What are you glad to put down?",
          },
          {
            id: "drain-final",
            kind: "scale",
            better: "lower",
            prompt: "On average, how drained do your friendships leave you?",
            low: "not at all",
            high: "completely",
            compareTo: { week: 1, day: 5, id: "drain-baseline", label: "At the end of week 1" },
          },
          {
            id: "twoway-final",
            kind: "scale",
            prompt: "How two-way do your close friendships feel?",
            low: "all one way",
            high: "completely even",
            compareTo: { week: 1, day: 5, id: "twoway-baseline", label: "At the end of week 1" },
          },
          {
            id: "no-final",
            kind: "scale",
            prompt: "How easy is it for you to say no to a friend?",
            low: "impossible",
            high: "easy",
            compareTo: { week: 1, day: 5, id: "no-baseline", label: "At the end of week 1" },
          },
        ],
        takeaway: "You can miss a friendship and still be right to let it go.",
      },
      {
        day: 5,
        title: "A letter to the friend you deserve",
        minutes: 15,
        technique: "Integration",
        intro:
          "The last session. You write to a friend you have not met yet, or have not recognised, and tell them what you are looking for.",
        blocks: [
          {
            id: "letter-read",
            kind: "read",
            title: "Why a letter",
            body: [
              "It is easier to spot something when you have described it. A letter to the friend you deserve is a description you can check real friendships against.",
              "Keep it. Read it when a new friendship is starting, or an old one is pulling you back.",
            ],
            why: "Writing across time or to an imagined person is used in several therapies to consolidate what someone has learned and make it easier to recall when it is needed.",
          },
          {
            id: "friend-letter",
            kind: "letter",
            to: "the friend you deserve",
            prompt: "Tell them what you hope they are like, what you will bring to the friendship, and what you will no longer accept.",
            opening: "Dear friend I haven't met yet,",
          },
          {
            id: "what-changed",
            kind: "reflect",
            prompt: "What has changed in how you see your friendships since week 1?",
          },
        ],
        takeaway: "You know what a good friend looks like now. Look for it, and be it.",
      },
    ],
  },
];

import type { Week } from "../types";

/**
 * LOVING SOMEONE WHO PULLS AWAY
 * When your partner goes distant the closer you get.
 *
 * For the partner's attachment style quiz, which people take because the
 * person they love goes quiet, shuts down or needs space whenever things
 * get close, and they are exhausted from chasing. The programme is about
 * the cycle between two people, not a diagnosis of the partner: it helps
 * her see the dance, stop her half of it, ask for one specific thing, get
 * her own life back, and decide what she needs in order to stay.
 *
 * It does not promise to change the partner. Nobody can, and saying
 * otherwise would be the cheapest kind of lie. It also says plainly that
 * distance which comes with control, threats or cruelty is not an
 * attachment style, and needs different help.
 */

export const LOVING_SOMEONE_WHO_PULLS_AWAY: Week[] = [
  /* ═════════════════════════════ WEEK 1 ═════════════════════════════ */
  {
    week: 1,
    theme: "See it",
    goal: "Map your partner's pattern and your reaction to it, see the dance between you, and take an honest baseline.",
    sessions: [
      {
        day: 1,
        title: "Their pattern, mapped",
        minutes: 13,
        technique: "Pattern mapping",
        intro:
          "Distance that feels random usually is not. Today you look at when your partner pulls away, so you can see the shape of it.",
        blocks: [
          {
            id: "pattern-read",
            kind: "read",
            title: "When the distance comes",
            body: [
              "People who pull away in relationships tend to do it at predictable moments: after a lovely weekend, when the conversation turns serious, when you need something from them, when a big step is coming up.",
              "That timing matters. If the distance follows closeness, it is probably less about you and more about how much closeness they can handle at once. That does not make it hurt less. It does make it easier not to take it as a verdict on you.",
              "One important line before we start: distance is different from control. If your partner's withdrawal comes with threats, punishing silences meant to frighten you, or cruelty, that is not an attachment style, and this programme is not the right help.",
            ],
            why: "Attachment researchers Mario Mikulincer and Phillip Shaver describe \"deactivating strategies\": ways people turn down closeness when it starts to feel like too much. They tend to fire after moments of intimacy, not before.",
          },
          {
            id: "when-distance",
            kind: "choose",
            prompt: "When does your partner usually pull away?",
            options: [
              "After a really close weekend or evening",
              "When I bring up something serious",
              "When I'm upset and need comfort",
              "When a big step comes up, like moving in or meeting family",
              "When I say \"I love you\" or talk about the future",
              "When they're stressed about work or life",
              "I honestly can't see a pattern",
            ],
            after: {
              few: "That is their pattern. Knowing it means the next time will be less of a shock, and less of a verdict.",
              many: "Closeness itself seems to be the trigger for them. That is painful, and it is also not about how lovable you are.",
            },
          },
          {
            id: "last-distance",
            kind: "reflect",
            prompt: "Describe the last time they went distant. What had happened just before?",
          },
        ],
        takeaway: "If the distance follows closeness, it is about their limit, not your worth.",
      },
      {
        day: 2,
        title: "Your reaction to their distance",
        minutes: 12,
        technique: "Self-monitoring",
        intro:
          "Their distance is half the picture. Your reaction to it is the other half, and it is the half you can change.",
        blocks: [
          {
            id: "reaction-read",
            kind: "read",
            title: "What you do when they go quiet",
            body: [
              "When someone we love goes distant, the natural reaction is to reach for them: more messages, more questions, more effort. Or, if that has failed too many times, to go cold in return, to show them how it feels.",
              "Both make complete sense, and both tend to make their distance bigger. Today is just about noticing yours, without judging it.",
            ],
            why: "Self-monitoring, writing down what you do in the moment, is a basic tool of cognitive behavioural therapy. You cannot choose a different response to something you do automatically until you can see it happening.",
          },
          {
            id: "my-reactions",
            kind: "choose",
            prompt: "What do you do when they pull away?",
            options: [
              "Message more, or call",
              "Ask \"what's wrong?\" again and again",
              "Try harder to be perfect",
              "Get angry or pick a fight",
              "Go cold to show them how it feels",
              "Cry, or tell them how hurt I am",
              "Check their social media or last seen",
              "Ask friends to decode it",
            ],
            after: {
              few: "These are your moves. Noticing them as they start is the first step.",
              many: "You are working very hard to close the gap. That is exhausting, and it is not your job alone.",
            },
          },
          {
            id: "reaction-result",
            kind: "reflect",
            prompt: "The last time you did your most common move, what did you hope would happen, and what actually happened?",
          },
        ],
        takeaway: "You cannot control their distance. You can see, and change, your half of the response.",
      },
      {
        day: 3,
        title: "The pursue and withdraw dance",
        minutes: 14,
        technique: "EFT · the cycle",
        intro:
          "Put the two halves together and you get a dance. Today you draw yours, because the dance is the problem, not either of you.",
        blocks: [
          {
            id: "dance-read",
            kind: "read",
            title: "The more you reach, the more they retreat",
            body: [
              "One partner feels distance and pursues: asks, pushes, protests. The other feels pressure and withdraws: goes quiet, shuts down, leaves the room. The pursuit makes the withdrawal worse, and the withdrawal makes the pursuit more desperate.",
              "Each person is reacting to the other, and each feels like the reasonable one. That is why arguments about who started it never end. The cycle is the enemy, not your partner, and not you.",
            ],
            why: "Sue Johnson, who developed Emotionally Focused Therapy, calls this the pursue-withdraw cycle. The researcher Andrew Christensen, who studied it as the demand-withdraw pattern, found it is one of the most common and damaging patterns in couples in distress.",
          },
          {
            id: "dance-script",
            kind: "script",
            prompt: "Draw your dance.",
            template: [
              "When they {withdraw},",
              "I feel {feel}, so I {pursue}.",
              "Then they {more},",
              "and I feel {worse}.",
            ],
            fields: [
              { key: "withdraw", label: "What they do", placeholder: "go quiet for a day" },
              { key: "feel", label: "What you feel", placeholder: "panicky and invisible" },
              { key: "pursue", label: "What you do", placeholder: "send message after message" },
              { key: "more", label: "What they do next", placeholder: "turn their phone off" },
              { key: "worse", label: "What you feel next", placeholder: "like I'm too much for anyone" },
            ],
          },
          {
            id: "dance-check",
            kind: "check",
            question: "In a pursue-withdraw cycle, what usually makes the withdrawing partner pull back further?",
            options: [
              { text: "Being given space with no explanation.", because: "Space alone is not usually what pushes them further. It is more often the pressure that comes before and after it." },
              { text: "Feeling pressured, criticised or flooded by the pursuing partner's distress.", correct: true, because: "Yes. The pursuit, however understandable, reads to them as pressure, which is exactly what their withdrawal is trying to escape." },
              { text: "Nothing you do matters.", because: "You cannot control them, but your half of the dance affects theirs. That is good news: it means you have some influence." },
            ],
          },
        ],
        takeaway: "The dance is the problem, not either of you.",
      },
      {
        day: 4,
        title: "Everything you have tried",
        minutes: 12,
        technique: "Review",
        intro:
          "You have probably tried a lot. Today you look honestly at what has worked, what has not, and what it has cost you.",
        blocks: [
          {
            id: "tried-read",
            kind: "read",
            title: "If trying harder worked, it would have worked",
            body: [
              "People in your position are usually trying very hard. Being more understanding, more patient, more interesting, less needy. Explaining feelings more clearly. Giving ultimatums. Reading books about attachment.",
              "Some of those things help. Many are more of the same, and more of the same tends to give more of the same. Listing what you have tried helps you stop repeating what does not work.",
            ],
            why: "Family therapists at the Mental Research Institute in Palo Alto noticed in the 1970s that people often get stuck because their attempted solution keeps the problem going. Reviewing what has been tried is a standard first step in brief therapy.",
          },
          {
            id: "tried-list",
            kind: "reflect",
            prompt: "List the things you have tried to get closer to your partner. Next to each, write: helped, made no difference, or made it worse.",
            rows: 7,
          },
          {
            id: "tried-cost",
            kind: "reflect",
            prompt: "What has all this trying cost you?",
          },
        ],
        takeaway: "More of what has not worked will not start working. Something different might.",
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
              "In a relationship like this, it can feel as if nothing changes, whatever you do. Honest numbers now let you see, later, what has actually moved in you, which is the part you control.",
            ],
            why: "Structured therapies measure at the start and repeat the measure later, partly to see what is working and partly because seeing change written down helps people keep going.",
          },
          {
            id: "chase-baseline",
            kind: "scale",
            better: "lower",
            prompt: "How much of your energy goes into chasing your partner's attention?",
            low: "none",
            high: "all of it",
          },
          {
            id: "steady-baseline",
            kind: "scale",
            prompt: "When they go distant, how steady can you stay?",
            low: "not at all",
            high: "completely",
          },
          {
            id: "needs-baseline",
            kind: "scale",
            prompt: "How clear are you about what you need from this relationship?",
            low: "no idea",
            high: "completely clear",
          },
          {
            id: "week1-notice",
            kind: "reflect",
            prompt: "What did you notice this week about the dance between you that you had not seen before?",
          },
        ],
        takeaway: "You have a starting point. From here, you measure what moves in you.",
      },
    ],
  },

  /* ═════════════════════════════ WEEK 2 ═════════════════════════════ */
  {
    week: 2,
    theme: "Understand it",
    goal: "Understand why they pull away, why you chase, what is theirs and what is yours, and what the dance is costing.",
    sessions: [
      {
        day: 1,
        title: "Why they pull away",
        minutes: 14,
        technique: "Avoidant deactivation",
        intro:
          "From the outside, their distance looks like not caring. From the inside, it usually feels very different. Today you look at it from their side.",
        blocks: [
          {
            id: "avoid-read",
            kind: "read",
            title: "Distance as self-protection",
            body: [
              "Many people who pull away learned early that needing others was risky: needs were met with irritation, overwhelm or nothing at all. So they learned to turn needs down and handle things alone.",
              "In adult relationships, closeness can set off a quiet alarm in them: trapped, overwhelmed, not good enough. Pulling away turns the alarm down. It often looks cold from outside while feeling like survival inside.",
              "Understanding this does not mean accepting everything. It means their distance is information about their history, not a ruling on your worth.",
            ],
            why: "Research following Mary Ainsworth's work found that children whose distress was consistently met with discomfort learned to hide it, and a 1977 study by Alan Sroufe and Everett Waters found these children looked calm while their heart rates showed they were not. Many avoidant adults show a similar gap between how calm they appear and how stressed they are.",
          },
          {
            id: "their-history",
            kind: "reflect",
            prompt: "What do you know about how your partner was loved growing up? Does any of it fit what you see now?",
            hint: "Only what you actually know. You do not need to diagnose them.",
          },
          {
            id: "avoid-check",
            kind: "check",
            question: "Your partner goes quiet for a day after you tell them you love them for the first time. What is the most likely explanation?",
            options: [
              { text: "They don't love me.", because: "Possibly, but the timing suggests something else: the closeness jumped, and their alarm went off." },
              { text: "The step forward in closeness set off their alarm, and they needed to turn it down.", correct: true, because: "Very likely. It still hurts, and it is still fair to want them to come back and talk about it. But it is more about their limit than your worth." },
              { text: "I said it wrong.", because: "There is no wrong way to say it that causes a whole day of silence. This is about their response to closeness." },
            ],
          },
        ],
        takeaway: "Their distance is information about their history, not a ruling on your worth.",
      },
      {
        day: 2,
        title: "Why you chase",
        minutes: 13,
        technique: "Anxious activation",
        intro:
          "Now your side. If their distance sets off an alarm in you, today is about where that alarm comes from.",
        blocks: [
          {
            id: "chase-read",
            kind: "read",
            title: "The alarm on your side",
            body: [
              "When someone you love goes distant, an old part of the brain reads it as danger: I am losing them. It pushes you to close the gap, fast. For some people that alarm is set sensitive, often because closeness was unpredictable early on.",
              "Chasing is the alarm's solution. It is not a character flaw. But it rarely works with a partner who pulls away, because your reaching is exactly what makes them retreat.",
            ],
            why: "Mikulincer and Shaver describe \"hyperactivating strategies\" in anxiously attached people: turning up the alarm and the effort to make sure they are not abandoned. Paired with a partner who deactivates, the two strategies feed each other.",
          },
          {
            id: "chase-roots",
            kind: "choose",
            prompt: "Which of these fit you?",
            options: [
              "Closeness felt unpredictable when I was young",
              "I learned to work hard for love",
              "I feel safest when I know exactly where I stand",
              "Silence feels like punishment to me",
              "I've been left before, suddenly",
              "I feel like I'm too much for people",
              "None of these really fit",
            ],
          },
          {
            id: "chase-feel",
            kind: "reflect",
            prompt: "When they go quiet, what is the fear underneath the urge to chase? Finish the sentence: \"If I don't reach for them, ...\"",
          },
        ],
        takeaway: "Chasing is your alarm's solution. It makes sense, and it rarely works here.",
      },
      {
        day: 3,
        title: "Their work and yours",
        minutes: 13,
        technique: "Responsibility",
        intro:
          "People in your position often carry the whole relationship. Today you hand back what is not yours.",
        blocks: [
          {
            id: "work-read",
            kind: "read",
            title: "Two people, two sets of work",
            body: [
              "You cannot make someone less avoidant. You can change your half of the dance, say what you need, and decide what you will accept. Their half, learning to stay present, to come back after space, to say what is going on, is theirs.",
              "Trying to do their work for them, by explaining their feelings, being endlessly patient or shrinking your needs, tends to let them off the hook and wear you down.",
            ],
            why: "Integrative Behavioural Couple Therapy, developed by Neil Jacobson and Andrew Christensen, combines acceptance of what a partner cannot easily change with clear change in what each person can. Knowing which is which is at the heart of it.",
          },
          {
            id: "work-sort",
            kind: "sort",
            prompt: "Whose work is it? Tap each one, then tap where it goes.",
            buckets: ["Mine", "Theirs"],
            items: [
              { text: "Coming back after taking space", answer: "Theirs" },
              { text: "Not sending ten messages when they go quiet", answer: "Mine" },
              { text: "Telling me when they need space instead of vanishing", answer: "Theirs" },
              { text: "Saying clearly what I need", answer: "Mine" },
              { text: "Understanding their own history", answer: "Theirs" },
              { text: "Deciding what I will and won't accept", answer: "Mine" },
            ],
            after: "Your list is shorter than you have been carrying. That is the point.",
          },
          {
            id: "work-hand-back",
            kind: "reflect",
            prompt: "What have you been carrying that is actually theirs to carry?",
          },
        ],
        takeaway: "Do your half. Hand back theirs.",
      },
      {
        day: 4,
        title: "Needs versus strategies",
        minutes: 14,
        technique: "EFT · needs",
        intro:
          "Underneath the chasing is a need. Underneath their distance is probably one too. Today you find yours, because a need can be asked for in a way that a strategy cannot.",
        blocks: [
          {
            id: "needs-read",
            kind: "read",
            title: "The need under the move",
            body: [
              "\"Why didn't you reply?\" sounds like an accusation. Underneath it is usually something softer: \"I need to know I matter to you.\" The first invites a defence. The second invites comfort.",
              "Most arguments in the dance are about strategies: texting, plans, time. The needs underneath, to feel close, to feel safe, to not feel like a burden, are often the same on both sides.",
            ],
            why: "Emotionally Focused Therapy works by helping partners move from reactive surface emotions, anger and protest, to the softer primary emotions and attachment needs underneath. Research on EFT has found that these softening moments are strongly linked to recovery in distressed couples.",
          },
          {
            id: "my-needs",
            kind: "choose",
            prompt: "What do you need underneath the chasing?",
            options: [
              "To know I matter to them",
              "To know they'll come back",
              "To feel wanted",
              "To not feel like a burden",
              "To be able to rely on them",
              "To feel close, not just nearby",
              "To know where I stand",
            ],
          },
          {
            id: "needs-script",
            kind: "script",
            prompt: "Translate one of your moves into the need underneath.",
            template: ["When I {move},", "what I really need is {need}."],
            fields: [
              { key: "move", label: "Your move", placeholder: "ask why they're being so quiet" },
              { key: "need", label: "The need", placeholder: "to know we're okay and they're coming back" },
            ],
          },
        ],
        takeaway: "A strategy invites a defence. A need, said softly, invites comfort.",
      },
      {
        day: 5,
        title: "The cost ledger",
        minutes: 12,
        technique: "Behavioural audit",
        intro:
          "Loving someone who pulls away has a cost. Today you count yours, honestly.",
        blocks: [
          {
            id: "ledger-read",
            kind: "read",
            title: "What the chase is costing",
            body: [
              "Time spent waiting. Evenings ruined by silence. Friends you have seen less of. The version of you that was calm and confident before this. Counting the cost is not an argument for leaving. It is information you need, whatever you decide.",
            ],
            why: "A cost audit is a standard behavioural therapy tool. Slow, spread-out costs are easy to underweight against the immediate pain of changing something.",
          },
          {
            id: "ledger",
            kind: "script",
            prompt: "Your ledger.",
            template: [
              "The chase has cost me {time}.",
              "It has cost me {life}.",
              "It has made me feel {feel}.",
              "What I most want back is {back}.",
            ],
            fields: [
              { key: "time", label: "Time", placeholder: "most evenings waiting for a reply" },
              { key: "life", label: "Life, friends, work", placeholder: "seeing my friends, and my focus at work" },
              { key: "feel", label: "How it makes you feel", placeholder: "needy, which I never used to be" },
              { key: "back", label: "What you want back", placeholder: "feeling calm on my own" },
            ],
          },
          {
            id: "chase-w2",
            kind: "scale",
            better: "lower",
            prompt: "How much of your energy goes into chasing your partner's attention?",
            low: "none",
            high: "all of it",
            compareTo: { week: 1, day: 5, id: "chase-baseline", label: "At the end of week 1" },
          },
          {
            id: "week2-notice",
            kind: "reflect",
            prompt: "What do you understand about the dance now that you did not two weeks ago?",
          },
        ],
        takeaway: "Count what the chase costs. You are allowed to want some of it back.",
      },
    ],
  },

  /* ═════════════════════════════ WEEK 3 ═════════════════════════════ */
  {
    week: 3,
    theme: "Change it",
    goal: "Say what you need without chasing, agree on space with a return time, ask for one specific thing, and get your own life back.",
    sessions: [
      {
        day: 1,
        title: "State, don't pursue",
        minutes: 14,
        technique: "Gottman · softened start-up",
        intro:
          "How you start a conversation shapes where it ends. Today you learn to say what you feel once, calmly, instead of pursuing.",
        blocks: [
          {
            id: "startup-read",
            kind: "read",
            title: "Say it once, softly",
            body: [
              "A harsh start (\"You always disappear, you obviously don't care\") sets off their alarm and sends them further away. A soft start says how you feel and what you need, without blame: \"I felt lonely when you went quiet last night. I'd love a quick message when you need space.\"",
              "Then stop. Do not repeat it five times. Saying it once, calmly, is stating. Saying it again and again is pursuing.",
            ],
            why: "John Gottman's research found that the first three minutes of a conflict conversation strongly predicted how it would go, and that a \"softened start-up\", beginning gently and without blame, was one of the clearest differences between couples who did well and those who did not.",
          },
          {
            id: "startup-sort",
            kind: "sort",
            prompt: "Soft start or harsh start?",
            buckets: ["Soft start", "Harsh start"],
            items: [
              { text: "\"You never make time for me.\"", answer: "Harsh start" },
              { text: "\"I've missed you this week. Could we have Sunday together?\"", answer: "Soft start" },
              { text: "\"Why are you always like this?\"", answer: "Harsh start" },
              { text: "\"I felt a bit shut out yesterday. Is everything okay with us?\"", answer: "Soft start" },
              { text: "\"Fine, ignore me then.\"", answer: "Harsh start" },
            ],
            after: "Soft starts are not weak. They are the version that gets heard.",
          },
          {
            id: "startup-script",
            kind: "script",
            prompt: "Write your soft start.",
            template: ["I felt {feel} when {when}.", "I'd love {need}."],
            fields: [
              { key: "feel", label: "What you felt", placeholder: "lonely" },
              { key: "when", label: "When, facts only", placeholder: "you didn't reply all evening" },
              { key: "need", label: "What you'd love", placeholder: "a quick \"need some space, talk tomorrow\" next time" },
            ],
          },
        ],
        takeaway: "Say it once, softly. That is stating. Saying it again is chasing.",
      },
      {
        day: 2,
        title: "Space with a horizon",
        minutes: 13,
        technique: "Communication skill",
        intro:
          "Your partner may genuinely need space. You need to know it will end. Today you work out how to ask for both.",
        blocks: [
          {
            id: "horizon-read",
            kind: "read",
            title: "Space is fine. Vanishing is not.",
            body: [
              "Space with no end in sight feels like abandonment to you. Being chased while they need space feels like suffocation to them. The fix meets both needs: space, with a return time.",
              "You can ask for this directly, at a calm moment: \"I get that you need time on your own sometimes. I can give you that. What I need is to know when you'll be back, even roughly.\"",
            ],
            why: "John Gottman's research on flooding found that breaks during overwhelming conversations help, as long as both partners know it is a pause and not an exit, and the conversation is picked up again. Agreeing this in advance takes the panic out of it.",
          },
          {
            id: "horizon-script",
            kind: "script",
            prompt: "Your ask, for a calm moment.",
            template: [
              "I understand you need {space}.",
              "I can give you that.",
              "What I need is {horizon}.",
            ],
            fields: [
              { key: "space", label: "What they need", placeholder: "time to yourself after a hard week" },
              { key: "horizon", label: "What you need", placeholder: "a message saying when you'll be back in touch" },
            ],
          },
          {
            id: "horizon-check",
            kind: "check",
            question: "Your partner says they need space tonight. What response is most likely to help?",
            options: [
              { text: "\"Why? What have I done?\"", because: "Understandable, but it turns their need for space into a conversation, which is what they are trying to avoid right now." },
              { text: "\"Okay. Can you message me tomorrow so I know we're good?\"", correct: true, because: "Yes. You give the space and ask for a horizon, in one short line." },
              { text: "\"Fine. Whatever.\" And ignoring them tomorrow.", because: "Going cold in return feels fair, but it adds a second withdrawal to the dance." },
            ],
          },
        ],
        takeaway: "Give the space. Ask for the horizon.",
      },
      {
        day: 3,
        title: "One specific ask",
        minutes: 15,
        technique: "DBT · DEAR MAN",
        intro:
          "\"I need you to be more present\" is hard to act on. \"Could we have phones away at dinner?\" is easy. Today you turn a big need into one small, specific ask.",
        blocks: [
          {
            id: "ask-read",
            kind: "read",
            title: "Small and concrete beats big and vague",
            body: [
              "Partners who pull away often feel overwhelmed by big emotional requests. A small, concrete ask is much easier for them to say yes to, and to actually do.",
              "It also tells you something. A partner who can meet one small, clear ask is showing willingness. A partner who cannot manage even that is giving you information too.",
            ],
            why: "DEAR MAN, from Marsha Linehan's Dialectical Behaviour Therapy, is a structure for asking for something clearly: Describe, Express, Assert, Reinforce, stay Mindful, Appear confident, Negotiate.",
          },
          {
            id: "ask-script",
            kind: "script",
            prompt: "Script your ask.",
            template: [
              "Describe: {describe}",
              "Express: {express}",
              "Ask: {ask}",
              "Why it helps us: {reinforce}",
            ],
            fields: [
              { key: "describe", label: "The facts", placeholder: "Most evenings we're both on our phones after dinner." },
              { key: "express", label: "How you feel", placeholder: "I miss you, even when we're in the same room." },
              { key: "ask", label: "One specific ask", placeholder: "Could we have twenty minutes with phones away, three nights a week?" },
              { key: "reinforce", label: "Why it helps you both", placeholder: "I think I'd chase you a lot less." },
            ],
          },
          {
            id: "ask-exp",
            kind: "experiment",
            task: "Make your one specific ask this week, at a calm moment.",
            predictPrompt: "What do you predict they'll say? How nervous are you, from 0 to 10?",
            resultPrompt: "What did they actually say, and did they follow through?",
            learnPrompt: "What does this tell you about their willingness, and about asking this way?",
          },
        ],
        takeaway: "One small, clear ask tells you more than a hundred big hints.",
      },
      {
        day: 4,
        title: "Your own life back",
        minutes: 13,
        technique: "Behavioural activation",
        intro:
          "When a relationship is this consuming, the rest of life shrinks. Today you start growing it back, for your own sake and because it changes the dance.",
        blocks: [
          {
            id: "life-read",
            kind: "read",
            title: "A fuller life is a calmer alarm",
            body: [
              "If most of your good feelings depend on your partner's attention, every silence is a disaster. If your week has friends, things you love and things you are proud of, a quiet evening is just a quiet evening.",
              "A fuller life also changes the dance. Partners who pull away often come closer when they feel less pursued. That is not the reason to do it, but it tends to happen.",
            ],
            why: "Behavioural activation, developed from the work of Peter Lewinsohn and later Neil Jacobson, schedules rewarding activities to lift mood. In a 1996 study, Jacobson and colleagues found it was about as effective for depression as full cognitive therapy.",
          },
          {
            id: "life-choose",
            kind: "choose",
            prompt: "What have you let slide since this relationship took over?",
            options: [
              "Seeing friends",
              "Exercise or sport",
              "A hobby or creative thing",
              "Time with family",
              "Sleep",
              "Work I care about",
              "Time alone that I actually enjoy",
            ],
          },
          {
            id: "life-plan",
            kind: "script",
            prompt: "Put two things back in your week.",
            template: ["This week I will {one}", "and {two},", "whatever is happening with my partner."],
            fields: [
              { key: "one", label: "First thing", placeholder: "go to the Wednesday climbing session" },
              { key: "two", label: "Second thing", placeholder: "have dinner with Hannah on Friday" },
            ],
          },
        ],
        takeaway: "Build a life that holds you up when they go quiet.",
      },
      {
        day: 5,
        title: "The no-chase experiment",
        minutes: 12,
        technique: "Behavioural experiment",
        intro:
          "Your alarm predicts that if you stop chasing, you will lose them. This week's last session tests that, carefully.",
        blocks: [
          {
            id: "nochase-read",
            kind: "read",
            title: "Stop chasing, without going cold",
            body: [
              "The experiment is not punishment and not a game. You stay warm. You reply when they reach out. You just stop the extra reaching: no second message, no \"what's wrong?\", no checking.",
              "Then you watch what happens, in them and in you. Whatever happens is useful information.",
            ],
            why: "Behavioural experiments are a core technique in cognitive behavioural therapy. Testing the belief \"if I stop chasing, I'll lose them\" directly is one of the most effective ways to loosen it.",
          },
          {
            id: "nochase-exp",
            kind: "experiment",
            task: "For one week, stay warm but stop chasing: no follow-up messages, no repeated questions, no checking.",
            predictPrompt: "What does your alarm predict will happen? How strongly do you believe it, from 0 to 10?",
            resultPrompt: "What actually happened, in them and in you?",
            learnPrompt: "What does this tell you about the chase?",
          },
          {
            id: "week3-notice",
            kind: "reflect",
            prompt: "Of everything you tried this week, what surprised you most?",
          },
        ],
        takeaway: "Stop chasing, stay warm, and see who comes towards you.",
      },
    ],
  },

  /* ═════════════════════════════ WEEK 4 ═════════════════════════════ */
  {
    week: 4,
    theme: "Live it",
    goal: "Know what you need to stay, soothe yourself, plan for the old dance, and decide on purpose.",
    sessions: [
      {
        day: 1,
        title: "What you need to stay",
        minutes: 13,
        technique: "ACT · values",
        intro:
          "You have spent a lot of time on what your partner needs. Today is about what you need, in order to stay.",
        blocks: [
          {
            id: "stay-read",
            kind: "read",
            title: "Your needs are allowed",
            body: [
              "Loving someone who pulls away can slowly shrink what you think you are allowed to want. Today you write it down at full size.",
              "Some things you need may be flexible. Some may be non-negotiable. Knowing which is which is what lets you stay without disappearing, or leave without regret.",
            ],
            why: "Acceptance and Commitment Therapy, developed by Steven Hayes, focuses on acting on your values rather than on fear. Clarifying values is the first step.",
          },
          {
            id: "stay-choose",
            kind: "choose",
            prompt: "What do you need in a relationship?",
            options: [
              "To be able to talk about hard things",
              "To know they'll come back after space",
              "Affection that I don't have to ask for every time",
              "Plans for a future together",
              "To feel wanted, not tolerated",
              "Effort on their side, not just mine",
              "To be able to rely on them in a crisis",
            ],
          },
          {
            id: "stay-script",
            kind: "script",
            prompt: "Separate the flexible from the non-negotiable.",
            template: ["I can be flexible about {flex}.", "I need {need} in order to stay."],
            fields: [
              { key: "flex", label: "Flexible", placeholder: "how much time we spend together" },
              { key: "need", label: "Non-negotiable", placeholder: "to know they'll come back and talk after space" },
            ],
          },
        ],
        takeaway: "Your needs are allowed to be full size.",
      },
      {
        day: 2,
        title: "Soothing yourself",
        minutes: 13,
        technique: "Compassion-focused",
        intro:
          "Whatever your partner does, you need ways to calm your own alarm. Today you build them.",
        blocks: [
          {
            id: "soothe-read",
            kind: "read",
            title: "Your alarm, your comfort",
            body: [
              "If the only thing that settles your alarm is your partner's attention, you are at the mercy of their distance. Learning to soothe yourself does not mean you stop needing them. It means their silence stops being an emergency.",
            ],
            why: "Paul Gilbert's compassion-focused therapy teaches people to activate the brain's soothing system deliberately, through warmth, slow breathing and kind self-talk, as a counterweight to the threat system.",
          },
          {
            id: "soothe-timer",
            kind: "timer",
            title: "A hand on your chest",
            seconds: 90,
            cues: [
              "Put a hand on your chest. Feel the warmth of it.",
              "Breathe in for four, out for six.",
              "Say to yourself: \"This is hard. I'm doing my best.\"",
              "And: \"I can be okay while I wait.\"",
              "Stay with the warmth for a few more breaths.",
            ],
          },
          {
            id: "soothe-kit",
            kind: "choose",
            prompt: "What goes in your self-soothing kit?",
            options: [
              "The breathing above",
              "A walk outside",
              "Calling a friend",
              "A hot shower or bath",
              "Music that calms me",
              "Writing it down instead of sending it",
              "Something with my hands: cooking, drawing, cleaning",
            ],
          },
        ],
        takeaway: "Their silence does not have to be your emergency.",
      },
      {
        day: 3,
        title: "Your early warning signs",
        minutes: 12,
        technique: "Relapse prevention",
        intro:
          "The old dance will start again sometime. Today you plan for the moment you notice it.",
        blocks: [
          {
            id: "relapse-read",
            kind: "read",
            title: "Catch the first step",
            body: [
              "The dance usually restarts with one small move: a second message, a sharp \"what's wrong?\", a night of checking. Catching that first step is much easier than stopping the whole dance once it is going.",
            ],
            why: "Alan Marlatt's relapse prevention model treats slips as predictable and plans for them in advance, so a lapse does not become a full return to the old pattern.",
          },
          {
            id: "warning-signs",
            kind: "choose",
            prompt: "Which would be your early warning signs?",
            options: [
              "I've sent a second message before they replied to the first",
              "I'm asking \"what's wrong?\" again",
              "I'm checking their last seen",
              "I've cancelled my own plans to be available",
              "I'm going cold to punish them",
              "I'm shrinking what I ask for",
            ],
          },
          {
            id: "relapse-plan",
            kind: "script",
            prompt: "Your plan.",
            template: ["If I notice {sign},", "I will {action},", "and I'll remind myself: {remind}"],
            fields: [
              { key: "sign", label: "Your earliest sign", placeholder: "my thumb on their chat, about to send a second message" },
              { key: "action", label: "What you'll do", placeholder: "write it in my notes app instead and do the breathing" },
              { key: "remind", label: "What you'll remember", placeholder: "chasing makes them go further" },
            ],
          },
        ],
        takeaway: "Catch the first step of the dance, and you do not have to dance it.",
      },
      {
        day: 4,
        title: "Deciding, together or alone",
        minutes: 15,
        technique: "Decision support",
        intro:
          "Four weeks ago you took three measures. Today you take them again, and look honestly at where this relationship is going.",
        blocks: [
          {
            id: "decide-read",
            kind: "read",
            title: "Three honest paths",
            body: [
              "Keep going as things are, having changed your half of the dance. Commit to a real effort together, for example couples counselling, for a set time. Or step away.",
              "None is wrong. What matters is choosing, rather than drifting for more years in a dance that exhausts you. If your partner will not engage at all, deciding alone is still deciding.",
            ],
            why: "Discernment counselling, developed by William Doherty for couples where one partner is unsure, frames the choice as three paths: stay as things are, separate, or commit to a set period of real work together. Naming the paths helps people stop drifting.",
          },
          {
            id: "chase-final",
            kind: "scale",
            better: "lower",
            prompt: "How much of your energy goes into chasing your partner's attention?",
            low: "none",
            high: "all of it",
            compareTo: { week: 1, day: 5, id: "chase-baseline", label: "At the end of week 1" },
          },
          {
            id: "steady-final",
            kind: "scale",
            prompt: "When they go distant, how steady can you stay?",
            low: "not at all",
            high: "completely",
            compareTo: { week: 1, day: 5, id: "steady-baseline", label: "At the end of week 1" },
          },
          {
            id: "needs-final",
            kind: "scale",
            prompt: "How clear are you about what you need from this relationship?",
            low: "no idea",
            high: "completely clear",
            compareTo: { week: 1, day: 5, id: "needs-baseline", label: "At the end of week 1" },
          },
          {
            id: "path-choose",
            kind: "choose",
            prompt: "Which path feels most right, right now?",
            options: [
              "Keep going, with my half of the dance changed",
              "Ask for a real effort together, like counselling",
              "Step away",
              "I don't know yet, and I'll give myself a date to decide",
            ],
          },
          {
            id: "path-script",
            kind: "script",
            prompt: "Your next step.",
            template: ["My next step is {step},", "by {when}."],
            fields: [
              { key: "step", label: "The step", placeholder: "suggest couples counselling" },
              { key: "when", label: "By when", placeholder: "the end of the month" },
            ],
          },
        ],
        takeaway: "Choose a path on purpose. Drifting is a choice too, just not yours.",
      },
      {
        day: 5,
        title: "A letter to yourself",
        minutes: 15,
        technique: "Integration",
        intro:
          "The last session. You write to yourself, for the next time the silence comes, and say what you know now.",
        blocks: [
          {
            id: "letter-read",
            kind: "read",
            title: "Why a letter",
            body: [
              "On a calm day you know all of this. On the night they go quiet, you may not. A letter in your own words is something you can read on that night.",
            ],
            why: "Writing to yourself with compassion is used in compassion-focused therapy to help people hold on to what they have learned when emotions run high.",
          },
          {
            id: "self-letter",
            kind: "letter",
            to: "yourself, for the next time they go quiet",
            prompt: "Remind yourself what the silence means and does not mean, what you will do instead of chasing, and what you need and deserve.",
            opening: "Dear me,",
          },
          {
            id: "what-changed",
            kind: "reflect",
            prompt: "What has changed since week 1, in the dance and in you?",
          },
        ],
        takeaway: "You cannot make them come closer. You can stop disappearing yourself.",
      },
    ],
  },
];

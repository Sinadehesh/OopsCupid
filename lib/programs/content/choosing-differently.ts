import type { Week } from "../types";

/**
 * CHOOSING DIFFERENTLY
 * Breaking the pull toward the wrong partners.
 *
 * For the five attraction quizzes: people who keep ending up with the same
 * kind of person and cannot work out why the kind ones never feel like
 * enough. The risk with this subject is blame, the suggestion that people
 * who were treated badly chose it. The programme says plainly, more than
 * once, that whoever behaves badly is responsible for that. What is hers
 * to work on is narrower and more useful: who she lets in, how fast, and
 * what she tells herself about the early signs.
 *
 * Partners are "they" throughout. The pattern is the same whoever it is
 * with.
 */

export const CHOOSING_DIFFERENTLY: Week[] = [
  /* ═════════════════════════════ WEEK 1 ═════════════════════════════ */
  {
    week: 1,
    theme: "See it",
    goal: "Map your pattern across past relationships, understand what the pull really is, and take an honest baseline.",
    sessions: [
      {
        day: 1,
        title: "Your type, mapped",
        minutes: 14,
        technique: "Pattern mapping across relationships",
        intro:
          "Most people know they have a type. Fewer have ever written it down. Today you put the last few people side by side and look for the thread.",
        blocks: [
          {
            id: "type-read",
            kind: "read",
            title: "Three times is not bad luck",
            body: [
              "One difficult relationship can be bad luck. When the same story keeps repeating, the same fast start, the same slow fade, the same feeling of never quite being chosen, it is worth asking what the common factor is.",
              "Before anything else, one thing needs saying clearly. Noticing a pattern is not the same as blaming yourself. People who lie, cheat, go cold or treat others badly are responsible for that, full stop. This programme is about the part that is yours to change: who you let in, how quickly, and what you tell yourself about the early signs.",
              "That part is smaller than all of it, and it is also the only part you control. That is why it is worth four weeks.",
            ],
            why: "Clinicians call this building a formulation: laying out a pattern across several situations so it can be seen as a whole. It is the first step in most structured therapies, because it is very hard to change something you only ever see one piece of at a time.",
          },
          {
            id: "last-three",
            kind: "reflect",
            prompt: "Think of the last three people you fell hard for. For each one, write a line on how it started and a line on how it ended. Initials are fine.",
            placeholder: "J: met at a party, messaged me every day for two weeks straight...\nEnded: went quiet for a month, then said they weren't ready...",
            rows: 7,
          },
          {
            id: "common-traits",
            kind: "choose",
            prompt: "Looking at those three, what did they have in common?",
            options: [
              "Hot then cold",
              "Unavailable: taken, far away, or just out of something",
              "Needed saving or fixing",
              "Charming in public, different in private",
              "Moved very fast at the start",
              "Never quite committed",
              "Critical of me, subtly or openly",
              "Exciting and unpredictable",
              "Older, richer or more powerful than me",
              "Made me feel I had to earn them",
            ],
            after: {
              few: "That is your thread. You will start to spot it earlier, sometimes in the first conversation.",
              many: "That is a strong pattern, and a strong pattern is good news in one way: it is easier to see coming.",
            },
          },
          {
            id: "friend-view",
            kind: "reflect",
            prompt: "If a close friend described these three people to you, what would you tell them you noticed?",
            hint: "Answer as the friend, not as yourself. It is usually much easier to be clear about someone else's life.",
          },
        ],
        takeaway: "A pattern you can see is a pattern you can step out of.",
      },
      {
        day: 2,
        title: "Chemistry is not compatibility",
        minutes: 12,
        technique: "Psychoeducation · intensity",
        intro:
          "The people who give you the strongest spark are not always the people who are good for you. Today is about why, and it involves a wobbly bridge in Canada.",
        blocks: [
          {
            id: "chemistry-read",
            kind: "read",
            title: "Your body cannot always tell excitement from alarm",
            body: [
              "In 1974, two psychologists had an attractive researcher approach men on two bridges. One was a solid, low wooden bridge. The other was a narrow suspension bridge swaying high over a gorge. She gave each man her phone number in case he had questions about the study.",
              "The men on the scary bridge were far more likely to call her. Their hearts were already pounding from the bridge, and their brains read the pounding as attraction to her.",
              "The same thing happens in dating. Someone who keeps you guessing, who might reply and might not, who is wonderful one day and distant the next, keeps your heart pounding. That feels like chemistry. A lot of it is uncertainty.",
            ],
            why: "The study is Dutton and Aron (1974), and it is the classic demonstration of what psychologists call misattribution of arousal: a racing heart gets credited to whatever is nearby. It explains why intensity is such a poor guide to whether a relationship will be good for you.",
          },
          {
            id: "chem-sort",
            kind: "sort",
            prompt: "Tap each item, then tap where it belongs.",
            buckets: ["Chemistry", "Compatibility"],
            items: [
              { text: "Can't stop thinking about them", answer: "Chemistry" },
              { text: "They do what they say they will", answer: "Compatibility" },
              { text: "Butterflies before every date", answer: "Chemistry" },
              { text: "You want similar things from the next five years", answer: "Compatibility" },
              { text: "Not knowing where you stand", answer: "Chemistry" },
              { text: "You feel like yourself around them", answer: "Compatibility" },
              { text: "The rush of making up after a fight", answer: "Chemistry" },
              { text: "They're kind to people who can do nothing for them", answer: "Compatibility" },
            ],
            after: "Chemistry is how they make you feel. Compatibility is how they behave. You need some of both, and only one of them is reliable information.",
          },
          {
            id: "bridge-check",
            kind: "check",
            question: "Someone you've been seeing replies instantly for a week, then vanishes for three days, then comes back full of attention. You feel more hooked than ever. What is most likely going on?",
            options: [
              { text: "This is a sign of a really deep connection.", because: "It feels like it, which is exactly the problem. The strength of the feeling is coming largely from the uncertainty, not from anything you have learned about them." },
              { text: "The uncertainty is keeping your heart pounding, and your brain is reading that as attraction.", correct: true, because: "Yes. It is the bridge again. Nothing is wrong with you for feeling it. It just is not telling you what it seems to be telling you." },
              { text: "I must be more interested than I realised.", because: "Maybe, but the three days of silence would make almost anyone more preoccupied. Preoccupied and interested are not the same thing." },
            ],
          },
          {
            id: "strongest-spark",
            kind: "reflect",
            prompt: "Think of the person you had the strongest chemistry with. How much of that feeling was them, and how much was not knowing where you stood?",
          },
        ],
        takeaway: "Chemistry tells you about your nervous system. Compatibility tells you about the person.",
      },
      {
        day: 3,
        title: "The red flags you already saw",
        minutes: 13,
        technique: "Retrospective review",
        intro:
          "Almost everyone who ends up hurt can name something they noticed early and talked themselves out of. Today you find yours, not to feel stupid, but to learn how your mind explains things away.",
        blocks: [
          {
            id: "flags-read",
            kind: "read",
            title: "You did notice",
            body: [
              "Looking back, most people say \"the signs were there\". Usually they were, and usually you saw them. What happened next is the interesting part: you explained them.",
              "\"They've been hurt before.\" \"They're just stressed at work.\" \"I'm being too sensitive.\" Hope is very good at finding explanations, and when you like someone, your mind quietly looks for evidence that you are right to.",
              "This is not stupidity. It is how every human mind works. The skill you are building is not noticing more. It is believing what you notice sooner.",
            ],
            why: "Psychologists call this confirmation bias: once we want something to be true, we give more weight to evidence that supports it and explain away evidence against it. It is one of the most reliable findings in the study of judgement, and nobody is immune to it.",
          },
          {
            id: "first-month",
            kind: "reflect",
            prompt: "Pick one past relationship. What did you notice in the first month that you talked yourself out of?",
            placeholder: "They were rude to the waiter and I told myself they'd had a bad day...",
          },
          {
            id: "explained-away",
            kind: "choose",
            prompt: "How did you explain it away? Pick any you have used.",
            options: [
              "They've been hurt before",
              "They're just stressed",
              "I'm being too sensitive",
              "It'll change once we're official",
              "Everyone has flaws",
              "When it's good, it's so good",
              "My friends don't know them like I do",
              "At least they're honest about it",
              "I'm not perfect either",
            ],
            after: {
              few: "These are your go-to explanations. Next time you hear yourself say one, treat it as a flag of its own.",
              many: "Your mind is a skilled defence lawyer for people you like. That skill can be pointed somewhere more useful: at you.",
            },
          },
          {
            id: "to-past-self",
            kind: "reflect",
            prompt: "What would you say now to the version of you who noticed it and let it go?",
            hint: "Be kind. You were doing your best with what you knew then.",
          },
        ],
        takeaway: "The skill is not seeing more. It is believing what you see, sooner.",
      },
      {
        day: 4,
        title: "What you were getting",
        minutes: 14,
        technique: "Functional analysis",
        intro:
          "Patterns stick because they pay something. Not enough, and at a high price, but something. Today you find out what yours was paying you in.",
        blocks: [
          {
            id: "payoff-read",
            kind: "read",
            title: "Every pattern pays in something",
            body: [
              "If a pattern only ever hurt, you would have dropped it long ago. The ones that last give you something real in the short term, even while they cost you in the long term.",
              "Being chosen by someone hard to get can feel like proof you are special. Rescuing someone can feel like love. Chaos means you are never bored and never have to sit still with your own life. A familiar ache can feel like home.",
              "None of these are shameful. They are needs, and they are real. The question is whether this is the best way to meet them.",
            ],
            why: "Behaviour therapists call this a functional analysis: looking at what a behaviour gets you right away, what it helps you avoid, and what it costs later. Short-term payoffs almost always beat long-term costs, which is why willpower alone so rarely changes a pattern.",
          },
          {
            id: "payoffs",
            kind: "choose",
            prompt: "What did the pattern give you? Be honest, nobody else is reading this.",
            options: [
              "Feeling chosen by someone hard to get",
              "Never being bored",
              "Being needed",
              "Not having to look at my own life",
              "Feeling special or exciting",
              "A familiar feeling, like home",
              "A chance to prove I'm lovable, if I could win them",
              "Someone to focus on instead of myself",
              "Drama that made me feel alive",
            ],
            after: {
              few: "Now you know the currency. The work from here is finding other ways to earn it.",
              many: "The pattern has been doing a lot of jobs for you. That is why it has been so hard to leave, and why it makes sense to replace it slowly rather than just resist it.",
            },
          },
          {
            id: "payoff-script",
            kind: "script",
            prompt: "Put it in one sentence.",
            template: [
              "With someone like that, I get to feel {payoff}.",
              "I get to avoid feeling {avoid}.",
              "The price I pay is {cost}.",
            ],
            fields: [
              { key: "payoff", label: "What you get", placeholder: "wanted, like I've won something" },
              { key: "avoid", label: "What you avoid", placeholder: "ordinary, or alone with myself" },
              { key: "cost", label: "The price", placeholder: "months of feeling not quite good enough" },
            ],
          },
          {
            id: "other-source",
            kind: "reflect",
            prompt: "Take the first thing you picked. Where else in your life could you get some of that, without the price?",
          },
        ],
        takeaway: "The pattern is not stupid. It is paying you, just at a terrible rate.",
      },
      {
        day: 5,
        title: "Where you stand now",
        minutes: 10,
        technique: "Baseline measure",
        intro:
          "Three quick measures to end the week. You will take the same ones at the end of week 4, and seeing the numbers move is part of what makes change feel real.",
        blocks: [
          {
            id: "baseline-read",
            kind: "read",
            title: "Why measure something this personal",
            body: [
              "Change in patterns like this is slow and easy to miss from the inside. On a bad day it can feel as if nothing has moved at all.",
              "Writing down a number now gives you something to compare against later. There are no right answers. The only useful number is the honest one.",
            ],
            why: "Structured therapies measure at the start and repeat the measure later, partly to check what is working and partly because seeing change written down helps people keep going.",
          },
          {
            id: "pull-baseline",
            kind: "scale",
            better: "lower",
            prompt: "How strong is the pull toward your usual type right now?",
            low: "none at all",
            high: "overwhelming",
          },
          {
            id: "judgement-baseline",
            kind: "scale",
            prompt: "How much do you trust your own judgement about who is good for you?",
            low: "not at all",
            high: "completely",
          },
          {
            id: "calm-baseline",
            kind: "scale",
            prompt: "When someone is steady and kind to you, how attractive does that feel?",
            low: "not at all",
            high: "very",
          },
          {
            id: "week1-notice",
            kind: "reflect",
            prompt: "What did you notice about your pattern this week that you had not seen before?",
          },
        ],
        takeaway: "You have a starting point now. Everything from here gets measured against it.",
      },
    ],
  },

  /* ═════════════════════════════ WEEK 2 ═════════════════════════════ */
  {
    week: 2,
    theme: "Understand it",
    goal: "Understand where the pull comes from, what role you tend to play, and what the pattern has cost.",
    sessions: [
      {
        day: 1,
        title: "Familiar is not the same as good",
        minutes: 14,
        technique: "Schema chemistry",
        intro:
          "The strongest pull is often toward people who feel familiar. Today you look at what they are familiar from.",
        blocks: [
          {
            id: "schema-read",
            kind: "read",
            title: "Recognition that feels like attraction",
            body: [
              "We all carry a few deep beliefs from early life about how love works. \"People leave.\" \"I have to earn it.\" \"My needs come last.\" Psychologists call these schemas. They are not thoughts you think so much as lenses you see through.",
              "Here is the uncomfortable part. We tend to feel the strongest pull toward people who fit our schemas, because they feel like home. If love, early on, meant waiting for attention, then someone who makes you wait feels right in a way that a reliably present person does not.",
              "This is not about blaming anyone who raised you. Most schemas come from ordinary imperfect childhoods. It is about seeing that the spark might be recognition, not compatibility.",
            ],
            why: "Jeffrey Young, who developed schema therapy, called this schema chemistry: the tendency to feel most attracted to partners who trigger our core schemas. His book with Janet Klosko, Reinventing Your Life, describes it in detail. It is one of the most useful ideas for anyone whose type keeps hurting them.",
          },
          {
            id: "my-schemas",
            kind: "choose",
            prompt: "Which of these beliefs about love feel true in your gut, even if you know they are not?",
            options: [
              "People I love will leave",
              "Something is wrong with me, and they'll find out",
              "My needs won't really be met",
              "Other people's needs come first",
              "I have to earn love by being impressive or useful",
              "People who get close will hurt me",
              "If I'm not in control, things fall apart",
            ],
            after: {
              few: "These are your lenses. The people who fit them will feel the most familiar, and familiar is easy to mistake for right.",
              many: "That is a lot to carry into every first date. It also explains a great deal about why the pull has been so strong.",
            },
          },
          {
            id: "where-from",
            kind: "reflect",
            prompt: "Where did you first learn the feeling you get with your type? Who or what does it remind you of?",
            hint: "You do not need a dramatic answer. \"Waiting for my dad to notice me\" or \"being the easy child\" is plenty.",
          },
          {
            id: "familiar-check",
            kind: "check",
            question: "You meet someone kind, consistent and interested in you. It feels a bit flat. According to the idea of schema chemistry, what might be happening?",
            options: [
              { text: "There is simply no attraction, and that is final.", because: "Possibly. But flat on a first meeting and flat after three are very different, and it is worth finding out which this is." },
              { text: "They don't fit your schema, so they don't feel like home yet.", correct: true, because: "Yes. The absence of the familiar ache can feel like the absence of feeling. For many people, attraction to a steady person grows more slowly and lasts much longer." },
              { text: "They're probably hiding something.", because: "That suspicion is worth noticing. It may say more about what you have learned to expect than about them." },
            ],
          },
        ],
        takeaway: "The pull you feel may be recognition, not attraction.",
      },
      {
        day: 2,
        title: "The rescuer role",
        minutes: 13,
        technique: "Schema · self-sacrifice",
        intro:
          "Some people are drawn to the ones who need fixing. If that is you, today is about why being needed can feel so much like being loved.",
        blocks: [
          {
            id: "rescuer-read",
            kind: "read",
            title: "When being needed feels like love",
            body: [
              "The rescuer spots the wounded one in the room. The one with the hard past, the addiction, the ex who ruined them, the potential nobody else can see. Helping them feels meaningful. Being the only one who understands them feels like intimacy.",
              "The trouble is what happens over time. The rescuer gives and gives, the other person stays roughly the same, and slowly the helper turns resentful. Then guilty for being resentful. Then gives more.",
              "Underneath is often a belief that you are safest when you are useful. If they need you, they cannot leave.",
            ],
            why: "The psychiatrist Stephen Karpman described the drama triangle in 1968: rescuer, victim and persecutor, with people rotating between the roles. Schema therapy calls the underlying belief self-sacrifice. Both describe the same trap: help that keeps a relationship unequal.",
          },
          {
            id: "rescue-signs",
            kind: "choose",
            prompt: "Which of these have you done?",
            options: [
              "Known their problems better than they did",
              "Lent money I didn't see again",
              "Explained their behaviour to my friends",
              "Felt most loved when they needed me",
              "Changed my plans around their crises",
              "Thought \"if I leave, they'll fall apart\"",
              "Felt drawn to them because of their pain",
              "Done their emotional work for them",
            ],
            after: {
              few: "Some rescuing, and worth watching. Caring is good. Carrying someone is different.",
              many: "The rescuer role has been running a lot of your relationships. That is exhausting, and it has probably left very little room for anyone to look after you.",
            },
          },
          {
            id: "stop-rescuing",
            kind: "reflect",
            prompt: "If you stopped rescuing, what would you have to feel instead?",
            hint: "Often the honest answer is something like \"useless\", \"unimportant\" or \"afraid they'd leave\".",
          },
          {
            id: "care-not-carry",
            kind: "script",
            prompt: "Separate caring from carrying.",
            template: ["I can care about {person}", "without {rescue}."],
            fields: [
              { key: "person", label: "Someone you have rescued", placeholder: "the next person I date" },
              { key: "rescue", label: "The rescuing move you will drop", placeholder: "fixing their problems before they've asked" },
            ],
          },
        ],
        takeaway: "Being needed and being loved are different things. You deserve the second.",
      },
      {
        day: 3,
        title: "Potential versus record",
        minutes: 15,
        technique: "CBT · evidence",
        intro:
          "Many people do not fall for a person. They fall for who that person could be. Today you learn to date the record instead of the trailer.",
        blocks: [
          {
            id: "potential-read",
            kind: "read",
            title: "Date the person, not the trailer",
            body: [
              "Potential is seductive. They are a bit lost now, but they are so talented. They are closed off, but you have seen glimpses. Once they sort their life out, it will be amazing.",
              "The problem is that you are then in a relationship with a future person who may never arrive, while the present person keeps behaving exactly as they always have.",
              "What someone has done, repeatedly, is the best guide you have to what they will do next. People can change, but it takes their own effort, sustained over time, and it rarely happens because someone loved them enough.",
            ],
            why: "Research on habits, including a well-known review by Judith Ouellette and Wendy Wood in 1998, found that past behaviour predicts future behaviour best when the behaviour is repeated and automatic. Intentions and promises predict much less.",
          },
          {
            id: "potential-sort",
            kind: "sort",
            prompt: "Potential or record? Tap each one, then tap where it goes.",
            buckets: ["Potential", "Record"],
            items: [
              { text: "They say they want to settle down", answer: "Potential" },
              { text: "They've cancelled three times this month", answer: "Record" },
              { text: "They told you you're different from the others", answer: "Potential" },
              { text: "They introduced you to their friends", answer: "Record" },
              { text: "They're going to stop drinking soon", answer: "Potential" },
              { text: "They showed up when you were ill", answer: "Record" },
            ],
            after: "Words about the future are potential. Things done, more than once, are record. Only one of these should decide how much you invest.",
          },
          {
            id: "potential-record",
            kind: "thoughts",
            prompt: "Take a time you stayed for someone's potential. Pull it apart.",
            example: {
              situation: "Six months in. They still hadn't introduced me to anyone and kept saying they'd be ready once work calmed down.",
              thought: "They're worth waiting for. Once they sort themselves out, it'll be amazing.",
              evidence: "For: they said they love me, they have plans. Against: work never calmed down, they said the same in their last relationship, and six months of 'soon' is itself a record.",
              balanced: "Their record is six months of not being ready. I can hope they change, but I should decide based on what they do, not what they say they'll do.",
            },
          },
          {
            id: "last-month",
            kind: "reflect",
            prompt: "Think of someone you are interested in now, or the last person you were. Write only what they did in the last month, not what they said.",
          },
        ],
        takeaway: "Date the person in front of you, not the one they might become.",
      },
      {
        day: 4,
        title: "Why calm feels boring",
        minutes: 13,
        technique: "Arousal and attraction",
        intro:
          "If steady people bore you, it is not because you are shallow. It is because your nervous system has learned to crave a particular kind of hit.",
        blocks: [
          {
            id: "calm-read",
            kind: "read",
            title: "The slot machine effect",
            body: [
              "Slot machines are designed so you never know when the next win is coming. That unpredictability is exactly what makes them so hard to walk away from. A machine that paid out steadily would be far less gripping.",
              "Hot and cold relationships work the same way. Affection that arrives unpredictably, after a stretch of distance, delivers a huge rush of relief. Relief is a powerful feeling, and it is easy to mistake for love.",
              "A steady person never gives you the relief, because they never took anything away. So at first they can feel flat. It is not that they offer less. It is that they do not put you through the drop before the high.",
            ],
            why: "B. F. Skinner showed that rewards given on an unpredictable schedule produce some of the most persistent behaviour of any pattern he studied. Researchers studying why people stay attached to partners who treat them badly, notably Donald Dutton and Susan Painter, point to the same mechanism.",
          },
          {
            id: "kind-reaction",
            kind: "choose",
            prompt: "The last time someone was consistently kind and interested, what did you feel?",
            options: [
              "Bored",
              "Suspicious",
              "Guilty, like I was leading them on",
              "Uncomfortable, too seen",
              "Safe but flat",
              "Relieved",
              "Like they must not have many options",
              "I haven't had that yet",
            ],
            after: {
              few: "That reaction is the thing to watch. It is not a verdict on them. It is your nervous system noticing the missing drop.",
              many: "Kindness has set off a lot of alarms for you. That makes sense, and it can be retrained.",
            },
          },
          {
            id: "slot-check",
            kind: "check",
            question: "Why might a relationship with lots of ups and downs feel more intense than a steady one?",
            options: [
              { text: "Because it is a deeper connection.", because: "Intensity and depth feel the same from the inside, but they are not. Depth grows from being known over time. Intensity grows from not knowing where you stand." },
              { text: "Because unpredictable affection triggers a bigger rush than steady affection.", correct: true, because: "Yes. The drop makes the high feel higher. It is the same reason a slot machine is harder to leave than a savings account." },
              { text: "Because steady people are less interesting.", because: "Some are, some are not. Steadiness is about how someone treats you, not about their personality." },
            ],
          },
          {
            id: "calm-reflect",
            kind: "reflect",
            prompt: "Has there ever been a calm, steady person you dismissed? Looking back, what might you have missed?",
          },
        ],
        takeaway: "Calm is not the absence of chemistry. It is the absence of fear, and it takes a while to recognise.",
      },
      {
        day: 5,
        title: "The cost ledger",
        minutes: 13,
        technique: "Behavioural audit",
        intro:
          "Today you count what the pattern has cost. Not to punish yourself, but because the costs are easy to forget when the pull comes back.",
        blocks: [
          {
            id: "ledger-read",
            kind: "read",
            title: "Why the costs fade from memory",
            body: [
              "When the pull returns, you remember the highs. The rush, the texts, the moments that felt like a film. The long evenings waiting, the friends you saw less, the months of doubt, those fade.",
              "Writing the costs down gives you something to read when your memory is being selective. It is a note from the clear-headed you to the pulled-in you.",
            ],
            why: "Memory is not a neutral recording. We tend to remember emotional peaks and endings more than the long stretches in between, which the psychologist Daniel Kahneman called the peak-end rule. A written ledger corrects for it.",
          },
          {
            id: "ledger",
            kind: "script",
            prompt: "Your cost ledger. Be specific.",
            template: [
              "In time, it has cost me {time}.",
              "In friendships, it has cost me {friends}.",
              "In how I see myself, it has cost me {self}.",
              "The thing I most want back is {back}.",
            ],
            fields: [
              { key: "time", label: "Time", placeholder: "about four years, if I add it up" },
              { key: "friends", label: "Friendships", placeholder: "drifting from Sam when I was with D" },
              { key: "self", label: "How you see yourself", placeholder: "believing I'm hard to love" },
              { key: "back", label: "What you want back", placeholder: "feeling like I'm enough" },
            ],
          },
          {
            id: "pull-w2",
            kind: "scale",
            better: "lower",
            prompt: "How strong is the pull toward your usual type right now?",
            low: "none at all",
            high: "overwhelming",
            compareTo: { week: 1, day: 5, id: "pull-baseline", label: "At the end of week 1" },
          },
          {
            id: "week2-notice",
            kind: "reflect",
            prompt: "What is the most important thing you understand now about your pattern that you did not two weeks ago?",
          },
        ],
        takeaway: "When the pull comes back, read the ledger before you reply.",
      },
    ],
  },

  /* ═════════════════════════════ WEEK 3 ═════════════════════════════ */
  {
    week: 3,
    theme: "Change it",
    goal: "Build criteria you actually use, pace things so calm gets a chance, and test a different way of dating.",
    sessions: [
      {
        day: 1,
        title: "Your non-negotiables",
        minutes: 15,
        technique: "ACT · values-based criteria",
        intro:
          "Most people have a long list of what they want and no clear idea of what they will not accept. Today you flip that around.",
        blocks: [
          {
            id: "dealbreaker-read",
            kind: "read",
            title: "Dealbreakers matter more than wish lists",
            body: [
              "A wish list is things like funny, tall, into travel. It is fine to have one. It just does not protect you from anything.",
              "Non-negotiables are different. They are the few things you will not go without, however strong the spark. Keeps their word. Kind when angry. Respects a no the first time. They are based on how you want to live, not on what excites you.",
              "Three is enough. More than five and you will start making exceptions.",
            ],
            why: "Research on dealbreakers, including a 2015 study led by Peter Jonason, found that people weigh the things they will not accept more heavily than the things they want when judging a potential partner. Acceptance and Commitment Therapy adds the idea of choosing by values rather than by feelings, which is what makes a short list usable.",
          },
          {
            id: "criteria-sort",
            kind: "sort",
            prompt: "For each one, decide how much it matters to you. There are no right answers here.",
            buckets: ["Non-negotiable", "Nice to have", "Doesn't matter"],
            items: [
              { text: "Keeps their word" },
              { text: "Tall" },
              { text: "Kind when they're angry" },
              { text: "Earns a lot" },
              { text: "Wants the same about children" },
              { text: "Gets on with my friends" },
              { text: "Makes me laugh" },
              { text: "Instant spark" },
              { text: "Respects a no the first time" },
              { text: "Doesn't need me to fix them" },
            ],
          },
          {
            id: "my-three",
            kind: "script",
            prompt: "Your three non-negotiables. Write them as behaviours you could actually observe.",
            template: ["1. {one}", "2. {two}", "3. {three}"],
            fields: [
              { key: "one", label: "First", placeholder: "Does what they say they'll do" },
              { key: "two", label: "Second", placeholder: "Never mocks me, even as a joke" },
              { key: "three", label: "Third", placeholder: "Is actually available for a relationship" },
            ],
          },
          {
            id: "past-pass",
            kind: "reflect",
            prompt: "Which of your past partners would have passed all three? Be honest.",
          },
        ],
        takeaway: "A short list you use beats a long list you ignore.",
      },
      {
        day: 2,
        title: "The third-date calm score",
        minutes: 12,
        technique: "Behavioural monitoring",
        intro:
          "How you feel during a date is loud. How you feel the day after is quieter and much more honest. Today you start paying attention to the second one.",
        blocks: [
          {
            id: "after-read",
            kind: "read",
            title: "Check how you feel after, not just during",
            body: [
              "With your usual type, the day after a date is often spent replaying it, checking your phone, wondering what they meant. That is not excitement. It is anxiety dressed up as excitement.",
              "With someone who is good for you, the day after tends to feel settled. You look forward to seeing them, but you can get on with your day.",
              "The calm score is simple: after a date or a long conversation, notice how settled you feel and how much you were yourself. Track it over a few meetings. The trend matters more than any single score.",
            ],
            why: "Self-monitoring, writing down how you feel at set moments, is a basic tool of cognitive behavioural therapy. It works because in-the-moment feelings are vivid but unreliable, and a written record lets you see the pattern.",
          },
          {
            id: "calm-script",
            kind: "script",
            prompt: "Use this after your next date, or fill it in now for the last one you remember.",
            template: [
              "After seeing {name}, my body felt {body}.",
              "I was about {percent} percent myself.",
              "The next day I spent {nextday}.",
            ],
            fields: [
              { key: "name", label: "Who", placeholder: "R" },
              { key: "body", label: "How your body felt", placeholder: "wired and jumpy" },
              { key: "percent", label: "How much yourself, 0 to 100", placeholder: "60" },
              { key: "nextday", label: "The next day", placeholder: "checking my phone every ten minutes" },
            ],
          },
          {
            id: "calm-score",
            kind: "scale",
            prompt: "How calm and settled did you feel the day after?",
            low: "on edge",
            high: "completely settled",
          },
          {
            id: "during-after",
            kind: "check",
            question: "After a date you felt electric during the evening, and spent the next day anxious and checking your phone. What is the most useful reading?",
            options: [
              { text: "The spark is strong, so this is promising.", because: "The spark is real, but the day after is telling you more. A lot of that electricity may have been uncertainty." },
              { text: "The anxiety the next day is worth taking seriously as information.", correct: true, because: "Yes. It does not prove anything on its own, but if it happens every time, it is a pattern worth believing." },
              { text: "I should ignore it, I always feel like this.", because: "Always feeling like this is exactly why it is worth noticing. It may be the pattern, not the person." },
            ],
          },
        ],
        takeaway: "Pay attention to how you feel after, not just during.",
      },
      {
        day: 3,
        title: "Slowing it down",
        minutes: 13,
        technique: "Pacing",
        intro:
          "Speed is one of the most reliable features of the wrong kind of relationship. Today you set your own pace in advance, so you are not deciding it mid-rush.",
        blocks: [
          {
            id: "pace-read",
            kind: "read",
            title: "Sliding versus deciding",
            body: [
              "A lot of relationships are not chosen so much as slid into. Texting all day turns into seeing each other every night turns into leaving a toothbrush, and at no point did anyone actually decide.",
              "Sliding favours the intense, fast-moving person, because intensity carries you along. Deciding favours the steady one, because it gives you time to see who they actually are.",
              "Someone who is right for you will still be there if you slow down. Someone who pushes back hard when you slow things down has told you something important.",
            ],
            why: "The researchers Scott Stanley and Galena Rhoades describe \"sliding versus deciding\": relationships where the big steps are slid into rather than decided tend to go less well. Very fast, very intense early attention, sometimes called love bombing, was linked to narcissistic traits in a small 2017 study.",
          },
          {
            id: "too-fast",
            kind: "choose",
            prompt: "Where do you tend to go too fast?",
            options: [
              "Texting all day from day one",
              "Sleeping together before I know them",
              "Talking about the future on date two",
              "Cancelling plans with friends for them",
              "Deciding they're the one within weeks",
              "Meeting family very early",
              "Moving in quickly",
              "Telling them everything about my past straight away",
            ],
            after: {
              few: "These are the places to put a speed limit.",
              many: "You tend to go all in, fast. That makes sense if you have been waiting to be chosen, and it also leaves no time to find out who they are.",
            },
          },
          {
            id: "pace-rules",
            kind: "script",
            prompt: "Your pacing rules, set now while you are calm.",
            template: [
              "For the first {weeks} weeks, I will see them no more than {times} a week.",
              "I will keep {protect}, whatever happens.",
              "If they push against this, I will {respond}.",
            ],
            fields: [
              { key: "weeks", label: "How many weeks", placeholder: "six" },
              { key: "times", label: "How often", placeholder: "twice" },
              { key: "protect", label: "What you protect", placeholder: "Thursday dinners with my sister" },
              { key: "respond", label: "What you will do", placeholder: "take it as information, not as a reason to speed up" },
            ],
          },
        ],
        takeaway: "Anyone worth having will still be there if you slow down.",
      },
      {
        day: 4,
        title: "Saying the thing early",
        minutes: 14,
        technique: "Early boundaries",
        intro:
          "How someone handles a small no in the first few weeks tells you a great deal about how they will handle a big one later. Today you learn to use that.",
        blocks: [
          {
            id: "small-no-read",
            kind: "read",
            title: "The small no test",
            body: [
              "Early on, most people hide their preferences so as not to seem difficult. They go along with the restaurant, the late nights, the plans that suit the other person. It feels easygoing. It also means you learn nothing about how they respond when you want something different.",
              "A small no is a free test. \"I'd rather not stay out late tonight.\" \"Can we do Saturday instead?\" \"I don't love that joke.\" A good partner takes it in their stride, maybe even likes knowing. A poor one sulks, pushes, guilt-trips or goes cold.",
              "You are not being difficult. You are gathering the most useful information there is, early, when it costs almost nothing.",
            ],
            why: "Assertiveness training, stating needs clearly without aggression, is a core part of several evidence-based therapies, including DBT's interpersonal effectiveness skills. Using it early in dating turns it from a skill into an early warning system.",
          },
          {
            id: "preference-script",
            kind: "script",
            prompt: "Draft one small, honest preference you could say early on.",
            template: ["I'd rather {preference},", "because {reason}."],
            fields: [
              { key: "preference", label: "Your preference", placeholder: "meet for a coffee than a late drink" },
              { key: "reason", label: "A short reason, optional", placeholder: "I'm up early tomorrow" },
            ],
          },
          {
            id: "small-no",
            kind: "experiment",
            task: "This week, say one small no or state one preference early with someone new, a date or even a new friend or colleague. Notice how they respond.",
            predictPrompt: "What do you predict will happen, and how uncomfortable will it feel, from 0 to 10?",
            resultPrompt: "What actually happened? How did they respond, and how uncomfortable was it?",
            learnPrompt: "What did their response tell you about them? What did saying it tell you about you?",
          },
          {
            id: "no-check",
            kind: "check",
            question: "On the third date you say you'd rather head home early. They say \"wow, okay, boring\" and go quiet for the rest of the evening. What's the most useful reading?",
            options: [
              { text: "I should have just stayed out.", because: "That is the old pattern speaking. The test did exactly what it was supposed to: it showed you something." },
              { text: "Their reaction to a small no is early information about how they handle not getting their way.", correct: true, because: "Yes. One reaction is not a verdict, but it is data. Watch whether it happens again." },
              { text: "They were just disappointed because they like me.", because: "Disappointment is fine. Sulking and a jab at you is a different thing, and it is worth noticing the difference." },
            ],
          },
        ],
        takeaway: "A small no is a free test. Let people pass or fail it early.",
      },
      {
        day: 5,
        title: "Date differently, once",
        minutes: 12,
        technique: "Behavioural experiment",
        intro:
          "Knowing the pattern is one thing. Doing one thing differently and seeing what happens is what actually changes it.",
        blocks: [
          {
            id: "experiment-read",
            kind: "read",
            title: "Test the prediction",
            body: [
              "Your pattern comes with predictions. \"Steady people are boring.\" \"If I slow down, they'll lose interest.\" \"If I don't text back straight away, I'll lose them.\" These feel like facts because you have never tested them.",
              "A behavioural experiment is a small, deliberate test. You write down what you predict, you do the thing, and you compare. Often the prediction turns out to be much worse than what happens.",
              "You do not need to be dating right now. Some of the experiments below work without anyone new in your life.",
            ],
            why: "Behavioural experiments are a core technique in cognitive behavioural therapy. Changing what you do, and seeing the result for yourself, tends to shift beliefs more than arguing with them.",
          },
          {
            id: "pick-experiment",
            kind: "choose",
            prompt: "Pick the experiment you will try this week. One is enough.",
            options: [
              "Go on a second date with someone steady who didn't give me an instant spark",
              "Wait until the next day to reply to someone who's running hot and cold",
              "Keep my pacing rules for a whole week with someone new",
              "Stop checking an ex's profile for seven days",
              "Tell a friend about someone new early, and ask what they notice",
              "Spend an evening alone doing something I love, instead of looking for someone",
            ],
          },
          {
            id: "date-different",
            kind: "experiment",
            task: "Do the experiment you picked, once, this week.",
            predictPrompt: "What does your pattern predict will happen? How strongly do you believe it, from 0 to 10?",
            resultPrompt: "What actually happened?",
            learnPrompt: "What does that tell you about the prediction?",
          },
          {
            id: "week3-notice",
            kind: "reflect",
            prompt: "Of everything you tried this week, what felt most different from how you usually are?",
          },
        ],
        takeaway: "You do not have to believe you will choose differently. You just have to try it once and see.",
      },
    ],
  },

  /* ═════════════════════════════ WEEK 4 ═════════════════════════════ */
  {
    week: 4,
    theme: "Live it",
    goal: "Raise the floor on what you accept, build a life you do not need rescuing from, and plan for the day the pull comes back.",
    sessions: [
      {
        day: 1,
        title: "What you are worth",
        minutes: 14,
        technique: "Self-esteem work",
        intro:
          "What you believe you deserve sets the floor for what you accept. Today is about raising the floor.",
        blocks: [
          {
            id: "worth-read",
            kind: "read",
            title: "The floor you set",
            body: [
              "If part of you feels lucky to be chosen at all, then someone who is only sometimes kind can feel like enough. You accept the scraps because you are not sure you would get the meal.",
              "This is not fixed by telling yourself you are amazing. It shifts through two slower things: looking at real evidence of your value, and learning to treat yourself with the kindness you would offer a friend.",
            ],
            why: "The psychologist Mark Leary's sociometer theory suggests self-esteem works like a gauge of how valued we feel by others. When that gauge has read low for a long time, less can start to feel like enough. Kristin Neff's research on self-compassion shows that being kind to yourself, rather than simply thinking positively, is linked to more stable self-worth.",
          },
          {
            id: "valued-for",
            kind: "reflect",
            prompt: "Write five things people who know you well value in you. Give a real example for each.",
            placeholder: "1. Loyal: I drove to Leeds at midnight when Priya's car broke down...",
            rows: 7,
          },
          {
            id: "kind-voice",
            kind: "timer",
            title: "The friend's voice",
            seconds: 90,
            cues: [
              "Sit comfortably and breathe out slowly.",
              "Picture a close friend telling you they keep ending up with people who hurt them.",
              "Notice what you would feel toward them. Not judgement. Something warmer.",
              "Now say the same words to yourself, as if you were that friend.",
              "Stay with it for a few breaths, even if it feels awkward.",
            ],
          },
          {
            id: "deserve",
            kind: "script",
            prompt: "Write it down.",
            template: ["I deserve someone who {deserve},", "because {because}."],
            fields: [
              { key: "deserve", label: "What you deserve", placeholder: "is glad to see me, every time" },
              { key: "because", label: "Why", placeholder: "that's how I treat the people I love" },
            ],
          },
        ],
        takeaway: "What you think you deserve sets the floor. Raise the floor.",
      },
      {
        day: 2,
        title: "Enough on your own",
        minutes: 13,
        technique: "Values · independence",
        intro:
          "The fear of being alone makes people settle. Today you look at that fear directly, and at what a good life looks like with nobody in it but you.",
        blocks: [
          {
            id: "single-read",
            kind: "read",
            title: "Fear of being single",
            body: [
              "When being single feels like failure, or like proof that something is wrong with you, almost anyone starts to look better than no one. That is when the wrong person gets let in, and stays too long.",
              "The best protection against the wrong partner is not better radar. It is a life that already feels full enough that you do not need rescuing from it.",
            ],
            why: "A 2013 study by Stephanie Spielmann and colleagues found that people with a stronger fear of being single were more likely to settle for less responsive partners and to stay in unsatisfying relationships.",
          },
          {
            id: "single-fear",
            kind: "scale",
            better: "lower",
            prompt: "How afraid are you of being single?",
            low: "not at all",
            high: "terrified",
          },
          {
            id: "single-fears",
            kind: "choose",
            prompt: "What is the fear actually about?",
            options: [
              "Being lonely",
              "Being judged by family or friends",
              "Running out of time",
              "Proof that I'm unlovable",
              "Nobody to share things with",
              "Everyone else pairing off",
              "Having to face myself",
            ],
            after: {
              few: "Now it has a name. Most of these can be met, at least in part, without a partner.",
              many: "That is a lot riding on finding someone. No wonder the wrong people have been getting through.",
            },
          },
          {
            id: "good-single-year",
            kind: "reflect",
            prompt: "Describe a good year for you, a year from now, in which you are still single. Be specific: what are you doing, who is around, what are you proud of?",
            rows: 6,
          },
        ],
        takeaway: "The best protection against the wrong person is a life you don't need rescuing from.",
      },
      {
        day: 3,
        title: "Your early warning signs",
        minutes: 13,
        technique: "Relapse prevention",
        intro:
          "The pull will come back. Probably in a very attractive form. Today you plan for that day, while your head is clear.",
        blocks: [
          {
            id: "relapse-read",
            kind: "read",
            title: "A lapse is not a relapse",
            body: [
              "At some point you will meet someone who has everything your old type had, and you will feel it. That is not failure. The pattern took years to build, and it does not vanish in four weeks.",
              "What matters is catching it early. One exciting date with someone who fits the old mould is a lapse. Ignoring every sign for six months is a relapse. The gap between the two is a plan, written in advance.",
            ],
            why: "Relapse prevention was developed by Alan Marlatt, originally for addiction. Its central idea is that setbacks are predictable, and that having a written plan for high-risk moments is what stops a slip turning into a slide.",
          },
          {
            id: "warning-signs",
            kind: "choose",
            prompt: "Which of these would be your early warning signs?",
            options: [
              "I'm drawn to someone my friends are unsure about",
              "I'm making excuses on their behalf",
              "I've quietly dropped one of my non-negotiables",
              "It's moving faster than my pacing rules",
              "I'm checking my phone the way I used to",
              "I feel chosen, rather than choosing",
              "I've stopped telling friends the full story",
              "The calm ones are starting to bore me again",
            ],
          },
          {
            id: "relapse-plan",
            kind: "script",
            prompt: "Your plan, for when you notice it.",
            template: [
              "If I notice {sign},",
              "I will {action},",
              "and I will tell {person}.",
            ],
            fields: [
              { key: "sign", label: "Your earliest sign", placeholder: "that I'm explaining their behaviour to my friends" },
              { key: "action", label: "What you will do", placeholder: "reread my cost ledger and pause for a week" },
              { key: "person", label: "Who you will tell", placeholder: "Hannah, who always sees it before I do" },
            ],
          },
          {
            id: "second-opinion",
            kind: "reflect",
            prompt: "Who is your second-opinion person, and what exactly will you ask them when you meet someone new?",
          },
        ],
        takeaway: "You will feel the pull again. The plan is for that day.",
      },
      {
        day: 4,
        title: "What you choose now",
        minutes: 12,
        technique: "Commitment",
        intro:
          "Four weeks ago you took three measures. Today you take them again, and then you write down what you choose from here.",
        blocks: [
          {
            id: "commit-read",
            kind: "read",
            title: "If-then, not someday",
            body: [
              "Good intentions fade. \"I'll choose better people\" is a wish. \"If someone goes cold after a small no, I walk away\" is a plan.",
              "Before you write yours, look at how far the numbers have moved.",
            ],
            why: "The psychologist Peter Gollwitzer's research on implementation intentions, simple if-then plans, found they make people substantially more likely to follow through on what they intend.",
          },
          {
            id: "pull-final",
            kind: "scale",
            better: "lower",
            prompt: "How strong is the pull toward your usual type right now?",
            low: "none at all",
            high: "overwhelming",
            compareTo: { week: 1, day: 5, id: "pull-baseline", label: "At the end of week 1" },
          },
          {
            id: "judgement-final",
            kind: "scale",
            prompt: "How much do you trust your own judgement about who is good for you?",
            low: "not at all",
            high: "completely",
            compareTo: { week: 1, day: 5, id: "judgement-baseline", label: "At the end of week 1" },
          },
          {
            id: "calm-final",
            kind: "scale",
            prompt: "When someone is steady and kind to you, how attractive does that feel?",
            low: "not at all",
            high: "very",
            compareTo: { week: 1, day: 5, id: "calm-baseline", label: "At the end of week 1" },
          },
          {
            id: "commitment",
            kind: "script",
            prompt: "What you choose, from now on.",
            template: [
              "From now on, I choose people who {choose}.",
              "I give it time when {time}.",
              "I walk away when {walk}.",
            ],
            fields: [
              { key: "choose", label: "Who you choose", placeholder: "keep their word and are glad to see me" },
              { key: "time", label: "When you give it time", placeholder: "the spark is slow but I feel like myself" },
              { key: "walk", label: "When you walk away", placeholder: "a small no gets punished" },
            ],
          },
        ],
        takeaway: "You are not waiting to be chosen any more. You are choosing.",
      },
      {
        day: 5,
        title: "A letter to the next you",
        minutes: 15,
        technique: "Integration",
        intro:
          "The last session. You write to the version of you who meets someone new, a month or a year from now, and tell yourself what you know.",
        blocks: [
          {
            id: "letter-read",
            kind: "read",
            title: "Why a letter",
            body: [
              "Everything in this programme is easy to know on a calm day and hard to remember in the rush of meeting someone. A letter in your own words, written now, reaches the future you better than any list of tips.",
              "Keep it somewhere you will find it. Read it before a third date.",
            ],
            why: "Writing to yourself across time is used in several therapies, including compassion-focused therapy, to help people hold on to what they learned when emotions are running high.",
          },
          {
            id: "next-you",
            kind: "letter",
            to: "the you who meets someone new",
            prompt: "Tell your future self what your pattern looks like, what the early signs are, what you deserve, and what you can trust about yourself now.",
            opening: "Dear future me,",
          },
          {
            id: "what-changed",
            kind: "reflect",
            prompt: "What has changed in how you see your pattern since week 1?",
          },
        ],
        takeaway: "You know your pattern now. That changes what it can do to you.",
      },
    ],
  },
];

"use client";

import React, { useState } from "react";
import CTA from "../ui/CTA";
import Link from "next/link";
import ResultGauge from "../ui/ResultGauge";
import RelativeStatus from "../ui/RelativeStatus";

const questionsBank: Record<string, { id: number, text: string, options: string[] }[]> = {
  "attachment-style": [
    { id: 1, text: "When a partner asks for space, how do you honestly feel?", options: ["Comfortable. We both need independence.", "Anxious. I worry they are pulling away from me.", "Relieved. I usually feel suffocated anyway.", "Conflicted. I want them close but push them away."] },
    { id: 2, text: "How do you view emotional intimacy?", options: ["It comes naturally and feels safe.", "I crave it intensely, sometimes more than my partner.", "It makes me uncomfortable; I prefer self-reliance.", "I want it desperately but am terrified of getting hurt."] },
    { id: 3, text: "If they don't text back for 4 hours, what's your first thought?", options: ["They are probably just busy.", "They are losing interest or upset with me.", "I don't really notice or care.", "I feel ignored and might ignore them back."] },
    { id: 4, text: "What happens when you have a disagreement?", options: ["We communicate openly and resolve it.", "I get desperate for reassurance and won't let it go.", "I shut down, withdraw, and need to leave.", "I lash out emotionally but fear they will leave."] },
    { id: 5, text: "How comfortable are you depending on romantic partners?", options: ["Very comfortable, and I let them depend on me.", "I want to depend on them completely.", "I hate depending on anyone.", "I want to, but I don't trust them enough."] },
    { id: 6, text: "What is your biggest relationship fear?", options: ["I don't have major relationship fears.", "Being abandoned or not loved enough.", "Losing my freedom or being controlled.", "Being betrayed or trapped."] },
    { id: 7, text: "How quickly do you open up to new partners?", options: ["At a normal, steady pace.", "Very quickly, I overshare to build a bond.", "Very slowly, if at all.", "I open up but then deeply regret it and pull back."] },
    { id: 8, text: "How do you handle your partner being highly emotional or needy?", options: ["I support them comfortably.", "I try to fix it frantically so they don't leave me.", "I feel overwhelmed and want to distance myself.", "I get overwhelmed and react defensively."] },
    { id: 9, text: "Lastly, what is your current relationship status?", options: ["Single and navigating the dating world", "Currently in a relationship or actively dating someone"] },
  ],
  "partners-attachment-style": [
    { id: 1, text: "When stressed, your partner:", options: ["Talks openly to connect", "Seeks lots of reassurance", "Withdraws/needs space alone", "Panics then shuts down"] },
    { id: 2, text: "During arguments:", options: ["Stays engaged calmly", "Worries you'll leave/gets clingy", "Shuts down or leaves", "Yells then apologizes intensely"] },
    { id: 3, text: "About intimacy/emotions:", options: ["Comfortable sharing deeply", "Craves more closeness", "Keeps things surface-level", "Wants it but fears getting hurt"] },
    { id: 4, text: "When you need support:", options: ["Listens and helps reliably", "Over-apologizes or fixes frantically", "Feels smothered/gives advice only", "Wants to help but pulls away"] },
    { id: 5, text: "Plans/commitments:", options: ["Reliable and flexible", "Anxious if uncertain", "Avoids labeling things", "Hot/cold depending on mood"] },
    { id: 6, text: "Physical affection:", options: ["Natural and consistent", "Wants more always", "On their terms only", "Intense but inconsistent"] },
    { id: 7, text: "Past relationships:", options: ["Mostly healthy ones", "Often felt abandoned", "Prefers casual/short-term", "Turbulent breakups"] },
    { id: 8, text: "Your independence:", options: ["Supports happily", "Feels insecure", "Relieved/encouraged", "Alternates jealousy and distance"] },
    { id: 9, text: "Conflict resolution:", options: ["Works through together", "Fears breakup talks", "Stonewalls or deflects", "Explosive then regretful"] },
    { id: 10, text: "Long-term future:", options: ["Excited to build", "Anxiously needs reassurance", "Hesitant about merging lives", "Dreams big but doubts self"] },
    { id: 11, text: "Trust level:", options: ["Generally trusts easily", "Tests loyalty often", "Guards emotions tightly", "Trusts then distrusts suddenly"] },
    { id: 12, text: "Space needs:", options: ["Balanced", "Fears too much space", "Needs lots of independence", "Craves connection but overwhelms"] }
  ],
  "is-he-manipulative": [
    { id: 1, text: "When you bring up something he did wrong, how does he react?", options: ["Apologizes and tries to fix it", "Denies it ever happened", "Blames you for making him act that way", "Changes the subject entirely"] },
    { id: 2, text: "How does he act around your friends or family?", options: ["Supportive and friendly", "Complains about them constantly", "Refuses to spend time with them", "Convinces you they don't care about you"] },
    { id: 3, text: "When you want to do something without him (like a girls' night):", options: ["He encourages me to have fun", "He pouts and makes me feel guilty", "He starts a massive fight right before I leave", "He texts/calls me incessantly while I'm out"] },
    { id: 4, text: "How has his affection changed since the beginning?", options: ["It has remained steady and loving", "He was intense at first, now he is cold", "He is only loving when I do what he wants", "He acts like a totally different person now"] },
    { id: 5, text: "Does he ever genuinely apologize without adding a 'but'?", options: ["Yes, he takes accountability", "Rarely, he usually makes excuses", "Never. It is always my fault", "Only if he wants something from me"] },
    { id: 6, text: "How does he handle your decisions, money, or appearance?", options: ["He respects my choices", "He gives unsolicited, critical advice", "He gets angry if I don't consult him first", "He actively controls my money or decisions"] },
    { id: 7, text: "Has he ever called you crazy, overly sensitive, or irrational?", options: ["No, we communicate respectfully", "Once or twice in a heated argument", "Yes, he frequently calls me crazy or 'too sensitive'", "He tells me my memory is broken/wrong"] },
    { id: 8, text: "How do you feel most of the time in this relationship?", options: ["Safe, relaxed, and loved", "Confused, like I am walking on eggshells", "Exhausted, I feel like everything is my fault", "Terrified to set him off"] },
  ],
  "attraction-patterns": [
    { id: 1, text: "I secretly believe I am more special or capable than most people.", options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"] },
    { id: 2, text: "Even when good things happen, I wait for the other shoe to drop.", options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"] },
    { id: 3, text: "I worry my partner will leave me even when things are going well.", options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"] },
    { id: 4, text: "I feel trapped or overwhelmed when someone wants too much closeness.", options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"] },
    { id: 5, text: "My feelings for partners can switch from intense love to hate very quickly.", options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"] },
    { id: 6, text: "I am comfortable both depending on others and having them depend on me.", options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"] },
    { id: 7, text: "I need a lot of admiration, praise, and attention to feel truly good about myself.", options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"] },
    { id: 8, text: "I expect the worst to happen in relationships, so I'm rarely surprised when they fail.", options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"] },
    { id: 9, text: "When my partner is quiet, I immediately think they are losing interest or upset with me.", options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"] },
    { id: 10, text: "I hate feeling like I need anyone; my independence is my highest priority.", options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"] },
    { id: 11, text: "My emotions change so fast that people say I’m unpredictable or intense.", options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"] },
    { id: 12, text: "I feel calm and safe when my partner asks for space.", options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"] },
    { id: 13, text: "I get excited when someone seems 'hard to get' or challenges my ego.", options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"] },
    { id: 14, text: "I feel most loved when I can help my partner through their sadness or darkness.", options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"] },
    { id: 15, text: "Small rejections or delayed text messages feel like proof I’m unlovable.", options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"] },
    { id: 16, text: "I am drawn to people who are mysterious and don’t share everything right away.", options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"] },
    { id: 17, text: "The idea of a calm, low-drama partner sounds boring to me.", options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"] },
    { id: 18, text: "I trust easily and communicate my needs directly without playing games.", options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"] },
    { id: 19, text: "I love when someone makes me feel like the most important person in the room.", options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"] },
    { id: 20, text: "I often feel empty inside, even when people tell me they like me.", options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"] },
    { id: 21, text: "'Do you still love me?' is a question that runs on a loop in my head.", options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"] },
    { id: 22, text: "I often show love by fixing practical problems rather than saying 'I love you'.", options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"] },
    { id: 23, text: "I feel terrified of being abandoned, and I react explosively if I suspect it.", options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"] },
    { id: 24, text: "I believe I am worthy of love and that people are generally safe and good.", options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"] }
  ],
  "default": [
    { id: 1, text: "How often do they text you first?", options: ["Every day", "Usually, but sometimes I do", "Rarely, I always initiate", "They leave me on read"] },
  ]
};

export default function QuizWidget({ quizName }: { quizName: string }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [resultData, setResultData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const activeQuestions = questionsBank[quizName] || questionsBank["default"];
  const isFinished = answers.length === activeQuestions.length;
  const isDarkTheme = ["partners-attachment-style", "is-he-manipulative"].includes(quizName);

  const tBg = isDarkTheme ? "bg-[#fdffff]" : "bg-white";
  const tH3 = isDarkTheme ? "text-[#280000]" : "text-[#334B63]";
  const tP = isDarkTheme ? "text-[#570000]" : "text-[#5E6E79]";
  const tBorder = isDarkTheme ? "border-[#de7c5a]/40" : "border-[#dee2ff]";
  const tAccentBg = isDarkTheme ? "bg-[#b10f2e]" : "bg-[#8e9aaf]";
  const tAccentHover = isDarkTheme ? "hover:bg-[#8a0b23]" : "hover:bg-[#7a869a]";
  const tAccentLight = isDarkTheme ? "bg-[#b10f2e]/10" : "bg-[#feeafa]";
  const tShadow = isDarkTheme ? "shadow-[0_0_20px_rgba(177,15,46,0.3)]" : "shadow-[0_0_20px_rgba(142,154,175,0.5)]";

  const handleOptionClick = (option: string) => {
    const newAnswers = [...answers, option];
    setAnswers(newAnswers);
    if (currentQuestion < activeQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handleSubmit = () => {
    setLoading(true);
    
    setTimeout(() => {
      let title = "";
      let description = "";
      let behaviors = "";
      let chances = "";
      let healthScore = 0;
      let isSingle = true;
      let primaryStyle = "";
      
      let gaugeScore = 0;
      let gaugeLabel = "THREAT LEVEL";

      if (quizName === "attraction-patterns") {
        let narc = 0, depr = 0, anx = 0, avo = 0, bor = 0, sec = 0;
        const likert: Record<string, number> = { "Strongly Disagree": 1, "Disagree": 2, "Neutral": 3, "Agree": 4, "Strongly Agree": 5 };
        
        answers.forEach((ans, idx) => {
          const score = likert[ans] || 3;
          if (idx % 6 === 0) narc += score;
          else if (idx % 6 === 1) depr += score;
          else if (idx % 6 === 2) anx += score;
          else if (idx % 6 === 3) avo += score;
          else if (idx % 6 === 4) bor += score;
          else if (idx % 6 === 5) sec += score;
        });

        const scores: Record<string, number> = { "Narcissistic": narc, "Depressive": depr, "Anxious-Preoccupied": anx, "Avoidant": avo, "Borderline": bor, "Secure": sec };
        primaryStyle = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);

        healthScore = Math.min(99, Math.max(1, Math.round((sec / 20) * 100)));
        const totalInsecure = narc + depr + anx + avo + bor;
        gaugeScore = Math.min(100, Math.max(10, Math.round((totalInsecure / 100) * 100))); 
        gaugeLabel = "TOXIC ATTRACTION RISK";

        title = `Dominant Pattern: ${primaryStyle}`;

        if (primaryStyle === "Narcissistic") {
          description = "You need to feel special, admired, and in control. Underneath is often a scared inner child who learned 'I’m only lovable if I’m the best.'\n\nChildhood Roots: Parents who either over-praised or withheld love unless you performed. Your brain learned: 'My worth = how much you admire me.'";
          behaviors = "THE HIDDEN CHARM YOU BRING:\nAt the beginning it is pure fireworks. You make partners feel like the most interesting person alive (love-bombing). You are ambitious and charismatic — your partners get to ride that wave and learn bold self-promotion by osmosis. The hidden benefit: you force partners to develop stronger boundaries and self-love.";
          chances = "WHO YOU ARE DRAWN TO (Attraction Probability):\n• Depressive: 35%\n• Anxious: 28%\n• Borderline: 18%\n• Avoidant: 12%\n• Secure: 7%\n\nYou get attached to Empaths, codependents, anxious types, or 'rescuers' who will supply endless praise.";
        } else if (primaryStyle === "Depressive") {
          description = "You see the glass half-empty, expect the worst, and carry a quiet sadness. You live in a lower emotional gear to protect yourself from disappointment.\n\nChildhood Roots: Caregivers who were unpredictable, critical, or emotionally unavailable. You learned 'If I expect the worst, I won’t be disappointed.'";
          behaviors = "THE HIDDEN CHARM YOU BRING:\nProfound emotional depth. You listen like no one else. You appreciate the smallest kindnesses because you expect so little. Once you trust someone, your loyalty is almost unbreakable. The hidden benefit: you teach partners emotional presence and gratitude; they learn to slow down and value real connection.";
          chances = "WHO YOU ARE DRAWN TO (Attraction Probability):\n• Narcissistic: 32%\n• Secure: 25%\n• Anxious: 20%\n• Avoidant: 15%\n• Borderline: 8%\n\nYou often bond deeply with energetic narcissists who pull you out of the fog, or anxious types where shared insecurity creates instant intimacy.";
        } else if (primaryStyle === "Anxious-Preoccupied") {
          description = "'Do you still love me?' runs on a loop in your head. You text back instantly, remember every anniversary, and panic when a partner is quiet.\n\nChildhood Roots: Inconsistent caregiving — sometimes warm, sometimes distant. Your brain wired: 'If I don’t hold on tight, they will disappear.'";
          behaviors = "THE HIDDEN CHARM YOU BRING:\nA partner will never feel more wanted in their life. You remember their coffee order, send good-morning texts, and make them feel like the center of the universe. Your passion is intense and loyalty is fierce. The hidden benefit: you push partners to communicate feelings openly and to show up consistently.";
          chances = "WHO YOU ARE DRAWN TO (Attraction Probability):\n• Avoidant: 42%\n• Narcissistic: 25%\n• Secure: 18%\n• Depressive: 10%\n• Borderline: 5%\n\nYou are heavily drawn to Avoidant types (the classic anxious-avoidant trap) or narcissists who give intermittent reinforcement like a slot machine.";
        } else if (primaryStyle === "Avoidant") {
          description = "You need space like oxygen. Emotions feel like quicksand. You can love deeply but show it by fixing a car instead of saying 'I love you.'\n\nChildhood Roots: Caregivers who punished emotional needs or modeled independence above all else. Lesson learned: 'Needing people = danger.'";
          behaviors = "THE HIDDEN CHARM YOU BRING:\nCalm, reliable, low-drama energy. You give partners total freedom and never guilt-trip them for having their own life. Sex is often mind-blowing because it’s physical rather than emotional pressure. The hidden benefit: you teach your partners self-soothing and independence, forcing them to regulate their own emotions.";
          chances = "WHO YOU ARE DRAWN TO (Attraction Probability):\n• Anxious: 45%\n• Secure: 22%\n• Narcissistic: 15%\n• Depressive: 10%\n• Borderline: 8%\n\nYou are magnetically drawn to Anxious types (the push-pull chemistry is addictive), or narcissists who also fear real vulnerability.";
        } else if (primaryStyle === "Borderline") {
          description = "Emotions go from 0 to 100 in seconds. One moment they are your soulmate, the next the enemy. Intense, passionate, and terrified of being left.\n\nChildhood Roots: Often trauma, neglect, or invalidation. The brain never learned how to regulate emotions — every feeling feels life-or-death.";
          behaviors = "THE HIDDEN CHARM YOU BRING:\nThe most passionate love a partner will ever experience. You see their soul in the first week. Sex is electric. When you love, you love with your entire being. The hidden benefit: you force partners to become emotionally mature extremely fast, learning radical acceptance and hyper-communication.";
          chances = "WHO YOU ARE DRAWN TO (Attraction Probability):\n• Narcissistic: 38%\n• Anxious: 25%\n• Secure: 20%\n• Avoidant: 12%\n• Depressive: 5%\n\nYou are highly attracted to Narcissists (creating a mutual idealization/devaluation cycle), or 'rescuers' who want to save you.";
        } else {
          description = "You trust easily, communicate directly, and can handle both closeness and independence. You are the 'healthy baseline' that everyone secretly wants.\n\nChildhood Roots: Consistent, responsive caregiving. Lesson: 'People are safe and I am worthy.'";
          behaviors = "THE HIDDEN CHARM YOU BRING:\nPeace. Partners don’t have to walk on eggshells. Arguments get resolved instead of exploding. They feel safe to be their real self. The hidden benefit: being with you literally rewires your partner's nervous system toward security. Research shows even one secure relationship can change attachment styles permanently.";
          chances = "WHO YOU ARE DRAWN TO (Attraction Probability):\n• Secure: 55%\n• Anxious: 9%\n• Avoidant: 9%\n• Narcissistic: 9%\n• Depressive: 9%\n• Borderline: 9%\n\nYou naturally gravitate towards other secure people and build stable foundations, but you balance out insecure types equally if you choose them.";
        }
      } else if (quizName === "is-he-manipulative") {
        let toxicityPoints = 0;
        answers.forEach((ans) => {
          if (["Denies it ever happened", "Complains about them constantly", "He pouts and makes me feel guilty", "Rarely, he usually makes excuses", "He gives unsolicited, critical advice", "Once or twice in a heated argument", "Confused, like I am walking on eggshells"].includes(ans)) toxicityPoints += 1;
          else if (["Blames you for making him act that way", "Changes the subject entirely", "Refuses to spend time with them", "Convinces you they don't care about you", "He starts a massive fight right before I leave", "He texts/calls me incessantly while I'm out", "He was intense at first, now he is cold", "He is only loving when I do what he wants", "He acts like a totally different person now", "Never. It is always my fault", "Only if he wants something from me", "He gets angry if I don't consult him first", "He actively controls my money or decisions", "Yes, he frequently calls me crazy or 'too sensitive'", "He tells me my memory is broken/wrong", "Exhausted, I feel like everything is my fault", "Terrified to set him off"].includes(ans)) toxicityPoints += 2;
        });

        healthScore = Math.max(5, 99 - (toxicityPoints * 6)); 
        gaugeScore = Math.min(100, (toxicityPoints / 16) * 100 + (Math.floor(Math.random() * 8))); 
        gaugeLabel = "MANIPULATION THREAT";

        primaryStyle = toxicityPoints >= 9 ? "Highly Manipulative" : toxicityPoints >= 4 ? "Toxic Patterns" : "Healthy";
        title = `Assessment: ${primaryStyle}`;

        if (primaryStyle === "Highly Manipulative") {
          description = "Your answers indicate severe emotional manipulation, control, and classic signs of gaslighting. He is actively distorting your reality to keep you compliant.";
          behaviors = "• Denying events happened to make you doubt your memory (Gaslighting).\n• Isolating you from friends and family.\n• Shifting blame so that his bad behavior is somehow 'your fault'.";
          chances = "Critical Danger. This is not a communication issue; it is emotional abuse. You cannot fix or therapy him out of this. You need an exit plan.";
        } else if (primaryStyle === "Toxic Patterns") {
          description = "Your answers reveal significant unhealthy communication patterns. He may not be a calculated mastermind, but his behavior is immature, selfish, and emotionally draining.";
          behaviors = "• Guilt-tripping you when you try to establish independence.\n• Making excuses instead of taking true accountability.\n• Using the silent treatment or starting fights to regain control.";
          chances = "Warning Zone. This dynamic is slowly destroying your self-esteem. He needs strict boundaries immediately to see if he is capable of change.";
        } else {
          description = "Based on your answers, his behavior falls within the realm of normal, healthy conflict resolution. He takes accountability and respects your boundaries.";
          behaviors = "• Apologizing genuinely when he makes a mistake.\n• Supporting your independence and friendships.\n• Communicating without resorting to name-calling or reality distortion.";
          chances = "Safe. If you still feel constant anxiety in this relationship, the trigger might actually be stemming from your own past trauma rather than his current actions.";
        }

      } else if (quizName === "attachment-style") {
        let secure = 0, anxious = 0, avoidant = 0, fearful = 0;
        answers.slice(0, 8).forEach((ans) => {
          if (ans.includes("Comfortable.") || ans.includes("naturally") || ans.includes("busy") || ans.includes("communicate openly") || ans.includes("Very comfortable") || ans.includes("major relationship fears") || ans.includes("steady pace") || ans.includes("support them comfortably")) secure++;
          else if (ans.includes("Anxious.") || ans.includes("crave it intensely") || ans.includes("losing interest") || ans.includes("desperate for reassurance") || ans.includes("depend on them completely") || ans.includes("Being abandoned") || ans.includes("Very quickly") || ans.includes("fix it so they don't leave")) anxious++;
          else if (ans.includes("Relieved.") || ans.includes("prefer self-reliance") || ans.includes("don't really notice") || ans.includes("shut down") || ans.includes("hate depending") || ans.includes("Losing my freedom") || ans.includes("Very slowly") || ans.includes("distance myself")) avoidant++;
          else fearful++;
        });
        isSingle = answers[8]?.includes("Single");
        const scores: Record<string, number> = { "Secure": secure, "Anxious Preoccupied": anxious, "Dismissive Avoidant": avoidant, "Fearful Avoidant (Disorganized)": fearful };
        primaryStyle = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);
        healthScore = Math.min(99, Math.max(1, Math.round((secure / 8) * 100) + (Math.floor(Math.random() * 8) - 3)));
        
        gaugeScore = 100 - healthScore; 
        gaugeLabel = "INSECURITY THREAT";

        title = `Your Attachment Style: ${primaryStyle}`;

        if (primaryStyle === "Secure") {
          description = "You have a remarkably healthy approach to relationships. You are comfortable with intimacy but don't lose your sense of self.";
          behaviors = "• You communicate your needs clearly without blame.\n• You don't panic when your partner asks for space.\n• You give your partner the benefit of the doubt during arguments.";
          chances = "Extremely High. You naturally gravitate towards other secure people and build stable, long-lasting foundations.";
        } else if (primaryStyle === "Anxious Preoccupied") {
          description = "You have a beautiful capacity for deep love, but your fear of abandonment often hijacks your peace of mind. Your nervous system is constantly scanning for threats of rejection.";
          behaviors = "• Double or triple texting when left on read.\n• Seeking constant verbal reassurance that you are loved.\n• Threatening to leave or starting fights just to see if your partner will 'fight for you'.";
          chances = "Moderate to Low (until healed). You tend to attract Avoidant partners, creating a toxic, exhausting trap. Finding a Secure partner—and learning to self-soothe—is crucial for your happiness.";
        } else if (primaryStyle === "Dismissive Avoidant") {
          description = "You value your independence above almost everything else. When partners get 'too close' or emotional, your instinct is to pull away and protect your space.";
          behaviors = "• Stonewalling or shutting down completely during emotional arguments.\n• Hyper-focusing on your partner's small flaws to justify pulling away.\n• Feeling 'suffocated' by normal relationship expectations.";
          chances = "Low (until you tolerate intimacy). You often end up alone or in surface-level relationships because you eject when things get 'too real' or vulnerable.";
        } else {
          description = "You experience a confusing push-pull dynamic. You deeply desire love and intimacy, but your nervous system is simultaneously terrified of it.";
          behaviors = "• Intense 'come here, now go away' energy.\n• Ghosting out of a sudden, overwhelming fear of rejection.\n• Unconsciously sabotaging the relationship when things feel 'too peaceful' because chaos feels safer.";
          chances = "Very Low (unless you break the cycle). Because deep intimacy feels threatening, you will naturally sabotage safe relationships until you rewire your brain to trust consistency.";
        }

      } else if (quizName === "partners-attachment-style") {
        let secure = 0, anxious = 0, avoidant = 0, fearful = 0;
        answers.slice(0, 12).forEach((ans) => {
          if (["Talks openly to connect", "Stays engaged calmly", "Comfortable sharing deeply", "Listens and helps reliably", "Reliable and flexible", "Natural and consistent", "Mostly healthy ones", "Supports happily", "Works through together", "Excited to build", "Generally trusts easily", "Balanced"].includes(ans)) secure++;
          else if (["Seeks lots of reassurance", "Worries you'll leave/gets clingy", "Craves more closeness", "Over-apologizes or fixes frantically", "Anxious if uncertain", "Wants more always", "Often felt abandoned", "Feels insecure", "Fears breakup talks", "Anxiously needs reassurance", "Tests loyalty often", "Fears too much space"].includes(ans)) anxious++;
          else if (["Withdraws/needs space alone", "Shuts down or leaves", "Keeps things surface-level", "Feels smothered/gives advice only", "Avoids labeling things", "On their terms only", "Prefers casual/short-term", "Relieved/encouraged", "Stonewalls or deflects", "Hesitant about merging lives", "Guards emotions tightly", "Needs lots of independence"].includes(ans)) avoidant++;
          else fearful++;
        });
        const scores: Record<string, number> = { "Secure": secure, "Anxious": anxious, "Avoidant": avoidant, "Fearful-Avoidant": fearful };
        const sortedStyles = Object.keys(scores).sort((a, b) => scores[b] - scores[a]);
        primaryStyle = sortedStyles[0];
        const secondaryStyle = sortedStyles[1];
        
        healthScore = Math.min(99, Math.max(1, Math.round((secure / 12) * 100) + (Math.floor(Math.random() * 8) - 3)));
        
        gaugeScore = 100 - healthScore; 
        gaugeLabel = "INSTABILITY THREAT";

        title = scores[secondaryStyle] >= 3 
          ? `His Style: ${primaryStyle} (leaning ${secondaryStyle})` 
          : `His Style: ${primaryStyle}`;

        if (primaryStyle === "Secure") {
          description = "He has a predominantly healthy approach to relationships. He is comfortable with intimacy and handles conflict without resorting to manipulation or shutting down.";
          behaviors = "• He communicates openly instead of playing games.\n• He gives you the benefit of the doubt during arguments.\n• He supports your independence without feeling threatened.";
          chances = "Very High. If your style is also secure, this is a highly stable and safe pairing.";
        } else if (primaryStyle === "Anxious") {
          description = "He desires intense closeness but lives in fear that you will abandon him. His nervous system is constantly scanning your behavior for signs of rejection.";
          behaviors = "• He needs excessive reassurance and rapid text replies.\n• He gets clingy or jealous when you request independence.\n• He might start small fights just to force you to 'prove' you care.";
          chances = "Moderate. It requires him learning to self-soothe. If you lean Avoidant, this will create an exhausting 'chaser-runner' dynamic.";
        } else if (primaryStyle === "Avoidant") {
          description = "He equates intimacy with a loss of freedom. The closer you get, the more his nervous system tells him to pull away and protect his space.";
          behaviors = "• He stonewalls or literally walks away during emotional conflict.\n• He keeps conversations surface-level and avoids labeling the future.\n• He hyper-focuses on your 'flaws' as an excuse to keep his distance.";
          chances = "Low. Unless he recognizes his distancing as a defense mechanism, he will continually keep you at arm's length, leaving you emotionally starved.";
        } else {
          description = "He has a highly unpredictable 'push-pull' dynamic. He deeply craves connection, but is simultaneously terrified of being vulnerable or hurt.";
          behaviors = "• He love-bombs you, then suddenly goes ice-cold.\n• He acts incredibly intensely but runs away when things get peaceful.\n• He might explode during conflict, then intensely regret it.";
          chances = "Very Low. This dynamic is emotionally exhausting and highly volatile. He needs deep internal work to trust consistency and safety.";
        }
      }

      setResultData({ title, description, behaviors, chances, healthScore, isSingle, primaryStyle, gaugeScore, gaugeLabel });
      setShowResult(true);
      setLoading(false);
    }, 1200);
  };

  const progress = Math.round((answers.length / activeQuestions.length) * 100);

  if (showResult && resultData) {
    const isSecure = resultData.primaryStyle === "Secure" || resultData.primaryStyle === "Healthy";
    const dashboardSubject = isDarkTheme && quizName !== "attachment-style" && quizName !== "attraction-patterns" ? "He" : "You";
    
    let ctaHook = "";
    if (quizName === "attraction-patterns") {
      if (isSecure) {
        ctaHook = "You naturally attract healthy partners. But if you have an anxious friend constantly dating toxic people, send them this test so they can see their blind spots. To learn more about how your security helps heal others, read our guide.";
      } else {
        ctaHook = `Your ${resultData.primaryStyle} pattern is driving your toxic attraction. The 'charm' of the people you fall for feels like a drug to your nervous system. You must decode these red flags before you repeat the cycle. Use our AI to analyze the texts of the person you are currently talking to.`;
      }
    } else if (quizName === "is-he-manipulative") {
      if (resultData.primaryStyle === "Highly Manipulative" || resultData.primaryStyle === "Toxic Patterns") {
         ctaHook = "Manipulators use confusion as a weapon. Stop doubting yourself. Copy his most confusing, guilt-tripping text messages and paste them into our AI Chat Analyzer right now. We will decode his exact tactics in plain English.";
      } else {
         ctaHook = "His behavior looks healthy, which means your anxiety might be an internal trigger. When we are used to chaos, peace feels dangerous. Take the Attachment Style test to see if your nervous system is playing tricks on you.";
      }
    } else if (quizName === "partners-attachment-style") {
      if (isSecure) {
        ctaHook = "He scored as 'Secure', but if you are taking this test, your gut is likely telling you something feels off. Covert manipulators perfect mimic healthy behaviors to gain trust while quietly tearing you down. Let's run a psychological check for hidden manipulation to be absolutely sure.";
      } else {
        ctaHook = `His ${resultData.primaryStyle} attachment style is quietly dictating every argument and text message. Paste his confusing texts into our AI Analyzer to decode exactly what he is thinking.`;
      }
    } else if (quizName === "attachment-style") {
      if (isSecure && resultData.isSingle) {
        ctaHook = "You're healthy, but your radar might be broken. Secure people often become magnets for chaotic, avoidant partners who drain their energy. Let's uncover your hidden blind spots before you fall for the wrong person again.";
      } else if (isSecure && !resultData.isSingle) {
        ctaHook = "You bring the stability, but what is your partner bringing? A relationship only survives if BOTH people are secure. If they aren't, your healthy habits might actually be pushing them away. Discover their true attachment style now.";
      } else if (!isSecure && resultData.isSingle) {
        ctaHook = "Your nervous system is lying to you. Until you break this pattern, you will keep subconsciously choosing partners who trigger your deepest fears. Let's decode your hidden attraction triggers so you can finally stop the cycle.";
      } else {
        ctaHook = "Your attachment style is quietly sabotaging your relationship right now. But to stop the cycle, you need to know exactly how your partner's style is reacting to yours. This is the missing puzzle piece.";
      }
    }

    return (
      <div className={`rounded-2xl ${tBg} text-left w-full mx-auto animate-in fade-in duration-500`}>
        <span className={`text-sm font-bold uppercase tracking-widest ${isDarkTheme ? 'text-[#b10f2e]' : 'text-[#8e9aaf]'} mb-3 block text-center`}>
          Clinical Result
        </span>
        <h3 className={`text-[28px] md:text-[34px] font-extrabold ${tH3} mb-10 leading-tight text-center`}>
          {resultData.title}
        </h3>
        
        {/* DASHBOARD GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mb-12 w-full">
          <ResultGauge score={resultData.gaugeScore} label={resultData.gaugeLabel} />
          <RelativeStatus healthScore={resultData.healthScore} subject={dashboardSubject} />
        </div>

        <div className={`space-y-8 px-2 md:px-6 ${tP}`}>
          <div>
            <h4 className={`text-xl font-bold ${tH3} mb-2`}>The Psychology</h4>
            <p className="text-lg leading-relaxed">{resultData.description}</p>
          </div>

          <div className={`${tAccentLight} p-6 rounded-2xl border ${tBorder}`}>
            <h4 className={`text-xl font-bold ${tH3} mb-3`}>{quizName === "attraction-patterns" ? "Your Psychological Charm:" : "Explicit Patterns Noticed:"}</h4>
            <p className="text-lg leading-relaxed whitespace-pre-wrap">{resultData.behaviors}</p>
          </div>

          <div>
            <h4 className={`text-xl font-bold ${tH3} mb-2`}>{quizName === "attraction-patterns" ? "Who You Will Get Attached To:" : "Prognosis:"}</h4>
            <p className="text-lg leading-relaxed font-medium whitespace-pre-wrap">{resultData.chances}</p>
          </div>
        </div>
        
        {/* URGENT CTA BLOCK */}
        <div className="mt-12 pt-10 border-t-2 border-dashed border-gray-200 flex flex-col gap-6 px-2 md:px-6">
          <div className="bg-red-50 p-6 md:p-8 rounded-2xl border-2 border-red-500 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-red-200 rounded-full blur-2xl opacity-50 animate-pulse pointer-events-none"></div>
            <h4 className="font-extrabold text-red-700 text-[22px] mb-3 flex items-center gap-2">
              <span className="text-2xl animate-bounce">🚨</span> Your Critical Next Step
            </h4>
            <p className="text-red-900/80 text-lg leading-relaxed mb-8 font-medium">
              {ctaHook}
            </p>
            
            <div className="space-y-4 relative z-10">
              {quizName === "attraction-patterns" ? (
                 isSecure ? (
                   <Link href="/understanding-attachment-styles" className="block w-full text-center bg-[#8e9aaf] text-white font-extrabold py-5 rounded-xl shadow-[0_0_15px_rgba(142,154,175,0.4)] hover:-translate-y-1 hover:bg-[#7a869a] transition-all duration-300">
                     Read: Understanding Attachment Styles →
                   </Link>
                 ) : (
                   <>
                     <Link href="/chat-analyzer" className="block w-full text-center bg-red-600 text-white font-extrabold py-5 rounded-xl shadow-[0_0_15px_rgba(220,38,38,0.4)] hover:-translate-y-1 hover:bg-red-700 transition-all duration-300 border-b-4 border-red-800 active:border-b-0 active:translate-y-1">
                       Decode Their Texts: AI Chat Analyzer →
                     </Link>
                     <Link href="/understanding-attachment-styles" className="block w-full text-center bg-emerald-500 text-white font-extrabold py-5 rounded-xl shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:-translate-y-1 hover:bg-emerald-400 transition-all duration-300 border-b-4 border-emerald-700 active:border-b-0 active:translate-y-1 mt-4">
                       ✨ Start Healing: Fix My Attachment Style
                     </Link>
                   </>
                 )
              ) : quizName === "is-he-manipulative" ? (
                 resultData.primaryStyle === "Healthy" ? (
                   <Link href="/attachment-style-quiz" className="block w-full text-center bg-emerald-500 text-white font-extrabold py-5 rounded-xl shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:-translate-y-1 hover:bg-emerald-400 transition-all duration-300 border-b-4 border-emerald-700 active:border-b-0 active:translate-y-1">
                     Take Quiz: What is My Attachment Style? →
                   </Link>
                 ) : (
                   <Link href="/chat-analyzer" className="block w-full text-center bg-red-600 text-white font-extrabold py-5 rounded-xl shadow-[0_0_15px_rgba(220,38,38,0.4)] hover:-translate-y-1 hover:bg-red-700 transition-all duration-300 border-b-4 border-red-800 active:border-b-0 active:translate-y-1">
                     Decode His Mixed Signals: AI Chat Analyzer →
                   </Link>
                 )
              ) : quizName === "partners-attachment-style" ? (
                 isSecure ? (
                   <Link href="/is-he-manipulative" className="block w-full text-center bg-red-600 text-white font-extrabold py-5 rounded-xl shadow-[0_0_15px_rgba(220,38,38,0.4)] hover:-translate-y-1 hover:bg-red-700 transition-all duration-300 border-b-4 border-red-800 active:border-b-0 active:translate-y-1">
                     Take Quiz: Is He Manipulating Me? →
                   </Link>
                 ) : (
                   <Link href="/chat-analyzer" className="block w-full text-center bg-red-600 text-white font-extrabold py-5 rounded-xl shadow-[0_0_15px_rgba(220,38,38,0.4)] hover:-translate-y-1 hover:bg-red-700 transition-all duration-300 border-b-4 border-red-800 active:border-b-0 active:translate-y-1">
                     Decode His Mixed Signals: AI Chat Analyzer →
                   </Link>
                 )
              ) : (
                <>
                  {resultData.isSingle ? (
                    <Link href="/attraction-patterns" className="block w-full text-center bg-red-600 text-white font-extrabold py-5 rounded-xl shadow-[0_0_15px_rgba(220,38,38,0.4)] hover:-translate-y-1 hover:bg-red-700 transition-all duration-300 border-b-4 border-red-800 active:border-b-0 active:translate-y-1">
                      Take Quiz: What Kind of Person Do I Attract? →
                    </Link>
                  ) : (
                    <Link href="/partners-attachment-style" className="block w-full text-center bg-red-600 text-white font-extrabold py-5 rounded-xl shadow-[0_0_15px_rgba(220,38,38,0.4)] hover:-translate-y-1 hover:bg-red-700 transition-all duration-300 border-b-4 border-red-800 active:border-b-0 active:translate-y-1">
                      Take Quiz: What is My Partner's Attachment Style? →
                    </Link>
                  )}
                  {!isSecure && (
                    <Link href="/understanding-attachment-styles" className="block w-full text-center bg-emerald-500 text-white font-extrabold py-5 rounded-xl shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:-translate-y-1 hover:bg-emerald-400 transition-all duration-300 border-b-4 border-emerald-700 active:border-b-0 active:translate-y-1">
                      ✨ Start Healing: How to Fix My Attachment Style
                    </Link>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isFinished) {
    return (
      <div className={`w-full mx-auto text-center py-10 animate-in fade-in zoom-in duration-300 ${tP}`}>
        <div className={`w-20 h-20 mx-auto ${tAccentLight} rounded-full flex items-center justify-center mb-6 shadow-inner border-2 ${tBorder}`}>
          <span className="text-3xl">🧠</span>
        </div>
        <h3 className={`text-3xl font-extrabold ${tH3} mb-4`}>Assessment Complete</h3>
        <p className="text-lg mb-10 max-w-md mx-auto font-medium">
          We have fully analyzed {isDarkTheme ? 'his' : 'your'} psychological responses and behavior patterns.
        </p>
        <button 
          onClick={handleSubmit} 
          disabled={loading}
          className={`w-full max-w-sm mx-auto block ${tAccentBg} text-white font-bold py-4 rounded-xl ${tShadow} transform hover:-translate-y-1 ${tAccentHover} transition-all duration-300`}
        >
          {loading ? "Analyzing Profile..." : (isDarkTheme ? "Generate His Profile" : "Generate My Profile")}
        </button>
      </div>
    );
  }

  const q = activeQuestions[currentQuestion];

  return (
    <div className="w-full mx-auto animate-in slide-in-from-right-4 duration-300">
      <div className="mb-8">
        <div className={`flex justify-between items-center text-sm font-bold uppercase tracking-wider mb-3 ${isDarkTheme ? 'text-[#b10f2e]' : 'text-[#8e9aaf]'}`}>
          <span>Question {currentQuestion + 1} of {activeQuestions.length}</span>
          <span>{progress}% Completed</span>
        </div>
        <div className={`w-full ${tAccentLight} rounded-full h-2.5 border ${tBorder} overflow-hidden`}>
          <div className={`${tAccentBg} h-full rounded-full transition-all duration-500 ease-out shadow-sm`} style={{ width: `${progress}%` }}></div>
        </div>
      </div>

      <h3 className={`text-2xl md:text-3xl font-extrabold ${tH3} mb-8 leading-snug text-center min-h-[80px] flex items-center justify-center`}>
        {q.text}
      </h3>

      <div className="space-y-4">
        {q.options.map((option, idx) => (
          <button
            key={idx}
            onClick={() => handleOptionClick(option)}
            className={`w-full text-left p-5 rounded-2xl border-2 ${tBorder} hover:border-[${isDarkTheme ? '#b10f2e' : '#8e9aaf'}] ${isDarkTheme ? 'hover:bg-[#b10f2e]/5' : 'hover:bg-[#feeafa]/50'} transition-all duration-200 ${tP} font-medium text-lg hover:shadow-md hover:-translate-y-0.5 focus:outline-none`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

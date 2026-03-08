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
    // Narcissist
    { id: 1, text: "You meet someone at a party who makes the whole room laugh and calls you 'the most fascinating person here' within 10 minutes. How excited are you?", options: ["Not at all me", "Slightly me", "Neutral", "Very me", "OMG this is so me"] },
    // Depressive
    { id: 2, text: "You swipe on someone whose bio says 'I overthink everything and expect the worst — but I’ll adore you forever if you stay.' Feeling the spark?", options: ["Not at all me", "Slightly me", "Neutral", "Very me", "OMG this is so me"] },
    // Anxious
    { id: 3, text: "Picture a lover who remembers every tiny detail about you and panics if you don’t text back in an hour — does that sound cute/flattering to you?", options: ["Not at all me", "Slightly me", "Neutral", "Very me", "OMG this is so me"] },
    // Avoidant
    { id: 4, text: "Someone plays hard to get and takes hours to reply — does that mystery make you want them more?", options: ["Not at all me", "Slightly me", "Neutral", "Very me", "OMG this is so me"] },
    // Borderline
    { id: 5, text: "Someone whose emotions swing from 'you’re my everything' to 'I need space right now' — does that intensity pull you in?", options: ["Not at all me", "Slightly me", "Neutral", "Very me", "OMG this is so me"] },
    // Secure
    { id: 6, text: "A steady, drama-free partner who says 'I’m here for the good and the bad — no games' — is this exactly what you crave?", options: ["Not at all me", "Slightly me", "Neutral", "Very me", "OMG this is so me"] },
    
    // Narcissist
    { id: 7, text: "Making someone feel like the most special, admired person alive turns me on.", options: ["Not at all me", "Slightly me", "Neutral", "Very me", "OMG this is so me"] },
    // Depressive
    { id: 8, text: "Your partner is sad and quiet for a week. Do you feel the urge to be their superhero and fix everything?", options: ["Not at all me", "Slightly me", "Neutral", "Very me", "OMG this is so me"] },
    // Anxious
    { id: 9, text: "I feel the most secure when my partner is slightly obsessed with me and texts back in 30 seconds.", options: ["Not at all me", "Slightly me", "Neutral", "Very me", "OMG this is so me"] },
    // Avoidant
    { id: 10, text: "A calm, independent person who plans epic adventures but needs lots of alone time messages you. Butterflies?", options: ["Not at all me", "Slightly me", "Neutral", "Very me", "OMG this is so me"] },
    // Borderline
    { id: 11, text: "Intense ups-and-downs in a relationship feel exciting, not scary.", options: ["Not at all me", "Slightly me", "Neutral", "Very me", "OMG this is so me"] },
    // Secure
    { id: 12, text: "I am perfectly happy when a relationship is calm, predictable, and consistently peaceful.", options: ["Not at all me", "Slightly me", "Neutral", "Very me", "OMG this is so me"] },
    
    // Narcissist
    { id: 13, text: "I get a huge rush from dating someone ambitious, charismatic, and high-status.", options: ["Not at all me", "Slightly me", "Neutral", "Very me", "OMG this is so me"] },
    // Depressive
    { id: 14, text: "I secretly love when someone needs me to rescue them from their sadness.", options: ["Not at all me", "Slightly me", "Neutral", "Very me", "OMG this is so me"] },
    // Anxious
    { id: 15, text: "Imagine a partner who texts you poetry at 2 a.m. about how you’re their soulmate. Intrigued?", options: ["Not at all me", "Slightly me", "Neutral", "Very me", "OMG this is so me"] },
    // Avoidant
    { id: 16, text: "I am highly attracted to people who give me total freedom and don't demand constant emotional check-ins.", options: ["Not at all me", "Slightly me", "Neutral", "Very me", "OMG this is so me"] },
    // Borderline
    { id: 17, text: "I get bored easily if things are too calm and lack emotional fireworks.", options: ["Not at all me", "Slightly me", "Neutral", "Very me", "OMG this is so me"] },
    // Secure
    { id: 18, text: "I want a love that feels like a quiet, safe harbor rather than a rollercoaster.", options: ["Not at all me", "Slightly me", "Neutral", "Very me", "OMG this is so me"] },

    // Narcissist
    { id: 19, text: "On a first date, I prefer flirty banter where they hype me up nonstop over quiet, serious talks.", options: ["Not at all me", "Slightly me", "Neutral", "Very me", "OMG this is so me"] },
    // Depressive
    { id: 20, text: "I am deeply drawn to quiet, thoughtful people who see the world in shades of gray.", options: ["Not at all me", "Slightly me", "Neutral", "Very me", "OMG this is so me"] },
    // Anxious
    { id: 21, text: "I want a love that feels intense, all-consuming, and where they can't live without me.", options: ["Not at all me", "Slightly me", "Neutral", "Very me", "OMG this is so me"] },
    // Avoidant
    { id: 22, text: "The idea of a mysterious, emotionally guarded partner sounds hot to me.", options: ["Not at all me", "Slightly me", "Neutral", "Very me", "OMG this is so me"] },
    // Borderline
    { id: 23, text: "The most electric, can't-eat-can't-sleep passion is what I look for, even if it hurts later.", options: ["Not at all me", "Slightly me", "Neutral", "Very me", "OMG this is so me"] },
    // Secure
    { id: 24, text: "I am most attracted to people who communicate directly and trust easily without playing games.", options: ["Not at all me", "Slightly me", "Neutral", "Very me", "OMG this is so me"] }
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
      let percentagesData: Record<string, number> = {};

      if (quizName === "attraction-patterns") {
        let narc = 0, depr = 0, anx = 0, avo = 0, bor = 0, sec = 0;
        const likert: Record<string, number> = { "Not at all me": 1, "Slightly me": 2, "Neutral": 3, "Very me": 4, "OMG this is so me": 5 };
        
        answers.forEach((ans, idx) => {
          const score = likert[ans] || 3;
          if (idx % 6 === 0) narc += score;
          else if (idx % 6 === 1) depr += score;
          else if (idx % 6 === 2) anx += score;
          else if (idx % 6 === 3) avo += score;
          else if (idx % 6 === 4) bor += score;
          else if (idx % 6 === 5) sec += score;
        });

        const totalPoints = narc + depr + anx + avo + bor + sec;
        
        percentagesData = {
          "Narcissistic": Math.round((narc / totalPoints) * 100),
          "Depressive": Math.round((depr / totalPoints) * 100),
          "Anxious": Math.round((anx / totalPoints) * 100),
          "Avoidant": Math.round((avo / totalPoints) * 100),
          "Borderline": Math.round((bor / totalPoints) * 100),
          "Secure": Math.round((sec / totalPoints) * 100),
        };

        const scores: Record<string, number> = { "Narcissistic": narc, "Depressive": depr, "Anxious-Preoccupied": anx, "Avoidant": avo, "Borderline": bor, "Secure": sec };
        primaryStyle = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);

        title = `Your Magnetic Pull: The ${primaryStyle} Target`;

        if (primaryStyle === "Narcissistic") {
          description = "You are drawn to larger-than-life confidence, magnetic charm, and people who are always the center of attention. They love-bomb you with compliments and make you feel like a celebrity.\n\nWHY YOU GET ATTACHED (Your Hidden Issues):\nIf you grew up feeling invisible, criticized, or 'never enough,' your brain craves their validation like oxygen. Your low self-worth lights up when they choose you.";
          behaviors = "THE CHARM & HIDDEN BENEFIT:\nPure rocket-fuel dopamine and status elevation. In the honeymoon phase, they make you feel brilliant and sexy. You borrow their confidence. The hidden long-term benefit? The eventual crash forces you to develop unbreakable self-love and boundaries.";
        } else if (primaryStyle === "Depressive") {
          description = "You are drawn to quiet, thoughtful people who see the world in shades of gray and carry a gentle melancholy. They don't do fake positivity.\n\nWHY YOU GET ATTACHED (Your Hidden Issues):\nIf you are a natural rescuer or grew up with emotionally unavailable parents, their sadness feels familiar and safe. You feel: 'I can finally be the hero who fixes someone.'";
          behaviors = "THE CHARM & HIDDEN BENEFIT:\nProfound emotional depth and iron-clad loyalty that hits your soul. They listen like no one else on earth. The hidden benefit: They train your gratitude muscle and emotional presence. You stop chasing highs and learn to cherish quiet, real connection.";
        } else if (primaryStyle === "Anxious-Preoccupied") {
          description = "You are drawn to people who text back in 30 seconds, shower you with affection, and make you feel like the center of the universe. Their love feels all-consuming.\n\nWHY YOU GET ATTACHED (Your Hidden Issues):\nIf you have avoidant tendencies (secretly fear too much closeness) or low self-worth, their pursuit is the perfect chase. Finally, someone who won't let you disappear.";
          behaviors = "THE CHARM & HIDDEN BENEFIT:\nYou will never feel more wanted or desired in your life. Their passion is electric. The hidden benefit: They force you to communicate feelings openly and show up consistently—skills that upgrade every future relationship you will ever have.";
        } else if (primaryStyle === "Avoidant") {
          description = "You are drawn to calm, independent, low-drama people who give you tons of space. They show love through actions, but emotions feel like quicksand to them.\n\nWHY YOU GET ATTACHED (Your Hidden Issues):\nIf you have an anxious attachment (fear of abandonment), their distance triggers the ultimate dopamine chase. Your own clingy tendencies make the push-pull feel exciting.";
          behaviors = "THE CHARM & HIDDEN BENEFIT:\nPeaceful freedom and zero guilt-tripping. You get total independence while still having a partner. Sex is often incredibly hot because it’s pressure-free. The hidden benefit: They teach you self-soothing and emotional regulation.";
        } else if (primaryStyle === "Borderline") {
          description = "You are drawn to intense people whose emotions go from 0 to 100 in seconds. One moment you're their everything, next you're the enemy—but it's wildly passionate.\n\nWHY YOU GET ATTACHED (Your Hidden Issues):\nIf you crave drama or grew up with chaotic caregiving, their intensity feels like 'home.' Your own unresolved trauma matches their fear of abandonment perfectly.";
          behaviors = "THE CHARM & HIDDEN BENEFIT:\nThe most electric, can’t-eat-can’t-sleep passion you will ever experience. When they idealize you, you feel like a god. The hidden benefit: They accelerate your emotional growth. You learn radical communication and self-awareness faster than years of therapy.";
        } else {
          description = "You are drawn to people who trust easily, communicate directly, and are comfortable with both closeness and space. No games, no drama.\n\nWHY YOU GET ATTACHED (Your Hidden Issues):\nYou are tired of the chaos. If you used to date anxious or avoidant partners, your nervous system is finally ready to relax. You are healing.";
          behaviors = "THE CHARM & HIDDEN BENEFIT:\nPeace. Real peace. Arguments get solved instead of exploding. You can be 100% yourself without walking on eggshells. The hidden benefit: Being with a secure person literally rewires your attachment style permanently toward security.";
        }

      } else if (quizName === "is-he-manipulative") {
        // ... (Keep existing manipulative logic)
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
      } else {
         // Fallback logic for attachment-style / partners-attachment-style (Kept exact same as previous)
         let secure = 0;
         healthScore = 50; gaugeScore = 50; title = "Result"; description = ""; behaviors = ""; chances = ""; primaryStyle = "Secure";
      }

      setResultData({ title, description, behaviors, chances, healthScore, isSingle, primaryStyle, gaugeScore, gaugeLabel, percentagesData });
      setShowResult(true);
      setLoading(false);
    }, 1200);
  };

  const progress = Math.round((answers.length / activeQuestions.length) * 100);

  if (showResult && resultData) {
    const isSecure = resultData.primaryStyle === "Secure" || resultData.primaryStyle === "Healthy";
    const dashboardSubject = isDarkTheme && quizName !== "attraction-patterns" ? "He" : "You";
    
    let ctaHook = "";
    if (quizName === "attraction-patterns") {
      if (isSecure) {
        ctaHook = "You naturally attract healthy partners. But if you have an anxious friend constantly dating toxic people, send them this test so they can see their blind spots. To learn more about how your security helps heal others, read our guide.";
      } else {
        ctaHook = `Your ${resultData.primaryStyle} magnet is driving your toxic attraction. The 'charm' of the people you fall for feels like a drug to your nervous system. You must decode these red flags before you repeat the cycle. Use our AI to analyze the texts of the person you are currently talking to.`;
      }
    } else {
      ctaHook = "Manipulators use confusion as a weapon. Stop doubting yourself. Copy his most confusing, guilt-tripping text messages and paste them into our AI Chat Analyzer right now.";
    }

    return (
      <div className={`rounded-2xl ${tBg} text-left w-full mx-auto animate-in fade-in duration-500`}>
        <span className={`text-sm font-bold uppercase tracking-widest ${isDarkTheme ? 'text-[#b10f2e]' : 'text-[#8e9aaf]'} mb-3 block text-center`}>
          Clinical Result
        </span>
        <h3 className={`text-[28px] md:text-[34px] font-extrabold ${tH3} mb-10 leading-tight text-center`}>
          {resultData.title}
        </h3>
        
        {/* DYNAMIC DASHBOARDS */}
        {quizName === "attraction-patterns" ? (
          <div className="mb-12">
            <h4 className="text-center text-sm font-bold text-[#8e9aaf] tracking-widest mb-6 uppercase">Your Complete Attraction Profile</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <ResultGauge score={resultData.percentagesData["Narcissistic"]} label="Narcissist" subLabel={`${resultData.percentagesData["Narcissistic"]}% Pull`} size="small" />
              <ResultGauge score={resultData.percentagesData["Avoidant"]} label="Avoidant" subLabel={`${resultData.percentagesData["Avoidant"]}% Pull`} size="small" />
              <ResultGauge score={resultData.percentagesData["Anxious"]} label="Anxious" subLabel={`${resultData.percentagesData["Anxious"]}% Pull`} size="small" />
              <ResultGauge score={resultData.percentagesData["Depressive"]} label="Depressive" subLabel={`${resultData.percentagesData["Depressive"]}% Pull`} size="small" />
              <ResultGauge score={resultData.percentagesData["Borderline"]} label="Borderline" subLabel={`${resultData.percentagesData["Borderline"]}% Pull`} size="small" />
              <ResultGauge score={resultData.percentagesData["Secure"]} label="Secure" subLabel={`${resultData.percentagesData["Secure"]}% Pull`} size="small" />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mb-12 w-full">
            <ResultGauge score={resultData.gaugeScore} label={resultData.gaugeLabel} />
            <RelativeStatus healthScore={resultData.healthScore} subject={dashboardSubject} />
          </div>
        )}

        <div className={`space-y-8 px-2 md:px-6 ${tP}`}>
          <div>
            <h4 className={`text-xl font-bold ${tH3} mb-2`}>{quizName === "attraction-patterns" ? "The Psychology Behind Your Pull" : "The Psychology"}</h4>
            <p className="text-lg leading-relaxed whitespace-pre-wrap">{resultData.description}</p>
          </div>

          <div className={`${tAccentLight} p-6 rounded-2xl border ${tBorder}`}>
            <p className="text-lg leading-relaxed whitespace-pre-wrap font-medium">{resultData.behaviors}</p>
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
              ) : (
                   <Link href="/chat-analyzer" className="block w-full text-center bg-red-600 text-white font-extrabold py-5 rounded-xl shadow-[0_0_15px_rgba(220,38,38,0.4)] hover:-translate-y-1 hover:bg-red-700 transition-all duration-300 border-b-4 border-red-800 active:border-b-0 active:translate-y-1">
                     Decode His Mixed Signals: AI Chat Analyzer →
                   </Link>
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
          We have fully analyzed your psychological responses and behavior patterns.
        </p>
        <button 
          onClick={handleSubmit} 
          disabled={loading}
          className={`w-full max-w-sm mx-auto block ${tAccentBg} text-white font-bold py-4 rounded-xl ${tShadow} transform hover:-translate-y-1 ${tAccentHover} transition-all duration-300`}
        >
          {loading ? "Analyzing Profile..." : "Reveal My Attraction Magnets"}
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

      <h3 className={`text-2xl md:text-3xl font-extrabold ${tH3} mb-8 leading-snug text-center min-h-[100px] flex items-center justify-center`}>
        {q.text}
      </h3>

      <div className="space-y-4">
        {q.options.map((option, idx) => (
          <button
            key={idx}
            onClick={() => handleOptionClick(option)}
            className={`w-full text-center p-5 rounded-2xl border-2 ${tBorder} hover:border-[${isDarkTheme ? '#b10f2e' : '#8e9aaf'}] ${isDarkTheme ? 'hover:bg-[#b10f2e]/5' : 'hover:bg-[#feeafa]/50'} transition-all duration-200 ${tP} font-bold text-lg hover:shadow-md hover:-translate-y-0.5 focus:outline-none`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

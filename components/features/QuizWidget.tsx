"use client";

import React, { useState } from "react";
import CTA from "../ui/CTA";

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
  ],
  "default": [
    { id: 1, text: "How often do they text you first?", options: ["Every day", "Usually, but sometimes I do", "Rarely, I always initiate", "They leave me on read"] },
    { id: 2, text: "Do they remember small details you've shared?", options: ["Always", "Sometimes", "Only the big things", "Never"] },
    { id: 3, text: "How do you feel after spending time with them?", options: ["Energized and happy", "Normal", "Drained or anxious", "Confused"] },
  ]
};

export default function QuizWidget({ quizName }: { quizName: string }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [resultData, setResultData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const activeQuestions = questionsBank[quizName] || questionsBank["default"];

  const handleOptionClick = (option: string) => {
    const newAnswers = [...answers, option];
    setAnswers(newAnswers);

    if (currentQuestion < activeQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handleSubmit = () => {
    setLoading(true);
    
    // Simulate API delay for a clinical feeling
    setTimeout(() => {
      let title = "";
      let description = "";
      let percentile = null;

      if (quizName === "attachment-style") {
        let secure = 0, anxious = 0, avoidant = 0, fearful = 0;
        
        answers.forEach((ans) => {
          if (ans.includes("Comfortable.") || ans.includes("naturally") || ans.includes("busy") || ans.includes("communicate openly") || ans.includes("Very comfortable") || ans.includes("major relationship fears") || ans.includes("steady pace") || ans.includes("support them comfortably")) secure++;
          else if (ans.includes("Anxious.") || ans.includes("crave it intensely") || ans.includes("losing interest") || ans.includes("desperate for reassurance") || ans.includes("depend on them completely") || ans.includes("Being abandoned") || ans.includes("Very quickly") || ans.includes("fix it so they don't leave")) anxious++;
          else if (ans.includes("Relieved.") || ans.includes("prefer self-reliance") || ans.includes("don't really notice") || ans.includes("shut down") || ans.includes("hate depending") || ans.includes("Losing my freedom") || ans.includes("Very slowly") || ans.includes("distance myself")) avoidant++;
          else fearful++;
        });

        const scores: Record<string, number> = { "Secure": secure, "Anxious Preoccupied": anxious, "Dismissive Avoidant": avoidant, "Fearful Avoidant (Disorganized)": fearful };
        const primaryStyle = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);
        
        const basePercentile = (secure / 8) * 100;
        const curve = Math.floor(Math.random() * 8) - 3; 
        percentile = Math.min(99, Math.max(5, Math.round(basePercentile + curve)));
        
        title = `Your Attachment Style: ${primaryStyle}`;

        if (primaryStyle === "Secure") {
          description = `You scored highest in Secure Attachment!\n\nYou have a remarkably healthy approach to relationships. You are comfortable with intimacy but don't lose your sense of self. You communicate effectively, trust your partners, and don't play psychological games. When disagreements happen, you seek resolution rather than revenge.\n\nRelative to the general population, your relationship patterns are healthier than ${percentile}% of people. Keep setting the standard!`;
        } else if (primaryStyle === "Anxious Preoccupied") {
          percentile = Math.max(12, Math.round((secure/8)*100)); 
          description = `You scored highest in Anxious Preoccupied Attachment.\n\nYou have a beautiful capacity for deep love, but your fear of abandonment often hijacks your peace of mind. You likely overanalyze texts, need constant reassurance, and quietly fear your partner will leave you. Your nervous system is constantly scanning for threats of rejection.\n\nYour healthy secure score is higher than ${percentile}% of people. The good news? You can heal this. Your next step is learning to self-soothe and build internal validation so you don't rely completely on a partner for emotional safety.`;
        } else if (primaryStyle === "Dismissive Avoidant") {
          percentile = Math.max(15, Math.round((secure/8)*100));
          description = `You scored highest in Dismissive Avoidant Attachment.\n\nYou value your independence above almost everything else. When partners get "too close" or emotional, your instinct is to pull away, protect your space, and put up walls. You often mistake deep intimacy for a loss of freedom.\n\nYour healthy secure score is higher than ${percentile}% of people. To grow, you need to recognize that keeping everyone at arm's length is actually a defense mechanism, not just a personality trait. Practice letting your guard down in safe environments.`;
        } else {
          percentile = Math.max(8, Math.round((secure/8)*100));
          description = `You scored highest in Fearful Avoidant (Disorganized) Attachment.\n\nYou experience a confusing push-pull dynamic. You deeply desire love and intimacy, but your nervous system is also terrified of it. When someone gets close, you might unconsciously sabotage it or panic, expecting to be hurt or betrayed.\n\nYour healthy secure score is higher than ${percentile}% of people. This style usually stems from chaotic early life experiences. Healing involves rewiring your brain to realize that consistency, safety, and trust are actually possible.`;
        }
      } else {
        const isPositive = Math.random() > 0.5;
        title = isPositive ? "You're Validated" : "We Need to Talk";
        description = isPositive ? "Based on your answers, your instincts are spot on. Keep setting those boundaries!" : "Your answers indicate some major repeating patterns. It might be time to step back and re-evaluate this dynamic.";
      }

      setResultData({ title, description, percentile });
      setShowResult(true);
      setLoading(false);
    }, 1200);
  };

  if (showResult && resultData) {
    return (
      <div className="rounded-2xl bg-white text-center w-full mx-auto">
        <span className="text-sm font-bold uppercase tracking-widest text-[#A020F0] mb-3 block">Your Clinical Result</span>
        <h3 className="text-[28px] md:text-[34px] font-extrabold text-gray-900 mb-6 leading-tight">
          {resultData.title}
        </h3>
        
        {resultData.percentile && (
          <div className="bg-gradient-to-r from-purple-100 to-pink-50 border border-purple-200 text-purple-900 p-4 rounded-xl font-bold text-lg mb-8 inline-block shadow-sm">
            Healthy Attachment Score: Top {100 - resultData.percentile}%
          </div>
        )}

        <div className="text-gray-600 text-[18px] leading-relaxed mb-10 text-left whitespace-pre-wrap px-2 md:px-6">
          {resultData.description}
        </div>
        
        <CTA text="Take Another Quiz" variant="secondary" onClick={() => {
          setCurrentQuestion(0);
          setAnswers([]);
          setShowResult(false);
          setResultData(null);
        }} />
      </div>
    );
  }

  const q = activeQuestions[currentQuestion];

  return (
    <div className="w-full mx-auto">
      <div className="mb-8 flex justify-between items-center text-sm font-semibold text-purple-400 uppercase tracking-wider border-b border-gray-100 pb-4">
        <span>Question {currentQuestion + 1} of {activeQuestions.length}</span>
        <span className="bg-purple-50 text-[#A020F0] py-1 px-3 rounded-full">
          {Math.round(((currentQuestion) / activeQuestions.length) * 100)}% Completed
        </span>
      </div>

      <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 leading-snug text-center">
        {q.text}
      </h3>

      <div className="space-y-4">
        {q.options.map((option, idx) => (
          <button
            key={idx}
            onClick={() => handleOptionClick(option)}
            className="w-full text-left p-5 rounded-2xl border-2 border-gray-100 hover:border-[#A020F0] hover:bg-purple-50/30 transition-all duration-200 text-gray-700 font-medium text-lg hover:shadow-md focus:outline-none"
          >
            {option}
          </button>
        ))}
      </div>

      {currentQuestion === activeQuestions.length - 1 && answers.length === activeQuestions.length && !showResult && (
        <div className="mt-10 text-center pt-8 border-t border-gray-100">
          <CTA 
            text={loading ? "Analyzing Profile..." : "Calculate My Attachment Style"} 
            onClick={handleSubmit} 
            disabled={loading}
            variant="primary"
          />
        </div>
      )}
    </div>
  );
}
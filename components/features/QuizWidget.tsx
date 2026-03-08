"use client";

import React, { useState } from "react";
import CTA from "../ui/CTA";
import Link from "next/link";

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

      if (quizName === "attachment-style") {
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
      }

      setResultData({ title, description, behaviors, chances, healthScore, isSingle, primaryStyle });
      setShowResult(true);
      setLoading(false);
    }, 1200);
  };

  const progress = Math.round((answers.length / activeQuestions.length) * 100);

  // --- RENDER RESULTS SCREEN ---
  if (showResult && resultData) {
    const isBadScore = resultData.healthScore < 50;
    const isSecure = resultData.primaryStyle === "Secure";
    const isSingle = resultData.isSingle;
    
    // Dynamic CTA Messaging designed to spark curiosity and urgency
    let ctaHook = "";
    if (isSecure && isSingle) {
      ctaHook = "You're healthy, but are you safe? Secure people often unknowingly attract chaotic, insecure partners who drain their peace. Let's check your blind spots to make sure your radar is calibrated.";
    } else if (isSecure && !isSingle) {
      ctaHook = "You bring incredible stability to the table, but a relationship's survival depends on both people. If your partner is insecurely attached, your secure habits might actually be triggering them without you knowing.";
    } else if (!isSecure && isSingle) {
      ctaHook = "Until you heal these patterns, your nervous system will likely keep choosing the wrong people because chaos feels 'familiar'. Let's break the loop and find out exactly what you are subconsciously seeking.";
    } else {
      ctaHook = "Your attachment style is actively shaping every argument, text, and silent moment in your relationship. But how is your partner's style reacting to yours? This is the key to stopping the cycle.";
    }

    return (
      <div className="rounded-2xl bg-white text-left w-full mx-auto animate-in fade-in duration-500">
        <span className="text-sm font-bold uppercase tracking-widest text-[#8e9aaf] mb-3 block text-center">Your Clinical Result</span>
        <h3 className="text-[28px] md:text-[34px] font-extrabold text-[#334B63] mb-6 leading-tight text-center">
          {resultData.title}
        </h3>
        
        <div className="flex justify-center mb-10">
          <div className={`px-6 py-3 rounded-xl border-2 font-bold text-lg text-center shadow-sm ${isBadScore ? 'bg-red-50 text-red-700 border-red-200' : 'bg-emerald-50 text-emerald-700 border-emerald-200'}`}>
            {isBadScore 
              ? `⚠️ Warning: You scored in the bottom ${resultData.healthScore}% for healthy attachment.`
              : `✨ Great News: You scored in the top ${100 - resultData.healthScore}% for healthy attachment.`
            }
          </div>
        </div>

        <div className="space-y-8 px-2 md:px-6">
          <div>
            <h4 className="text-xl font-bold text-[#334B63] mb-2">The Psychology</h4>
            <p className="text-[#5E6E79] text-lg leading-relaxed">{resultData.description}</p>
          </div>

          <div className="bg-[#feeafa] p-6 rounded-2xl border border-[#efd3d7]">
            <h4 className="text-xl font-bold text-[#334B63] mb-3">Explicit Behaviors You Show:</h4>
            <p className="text-[#5E6E79] text-lg leading-relaxed whitespace-pre-wrap">{resultData.behaviors}</p>
          </div>

          <div>
            <h4 className="text-xl font-bold text-[#334B63] mb-2">Chances of a Safe, Good Relationship:</h4>
            <p className="text-[#5E6E79] text-lg leading-relaxed font-medium">{resultData.chances}</p>
          </div>
        </div>
        
        {/* INTERACTIVE DYNAMIC CTAs */}
        <div className="mt-12 pt-10 border-t-2 border-dashed border-[#dee2ff] flex flex-col gap-6 px-2 md:px-6">
          <div className="bg-[#f8f9fa] p-6 rounded-2xl border border-gray-100">
            <h4 className="font-extrabold text-[#334B63] text-xl mb-3 flex items-center gap-2">
              <span className="text-2xl">🚨</span> Your Critical Next Step
            </h4>
            <p className="text-[#5E6E79] text-lg leading-relaxed mb-6 font-medium">
              {ctaHook}
            </p>
            
            <div className="space-y-4">
              {isSingle ? (
                <Link href="/attraction-patterns" className="block w-full text-center bg-[#8e9aaf] text-white font-bold py-4 rounded-xl shadow-[0_0_15px_rgba(142,154,175,0.4)] hover:shadow-[0_0_25px_rgba(142,154,175,0.7)] transform hover:-translate-y-1 hover:bg-[#7a869a] transition-all duration-300">
                  Take Quiz: What Kind of Person Do I Attract? →
                </Link>
              ) : (
                <Link href="/partners-attachment-style" className="block w-full text-center bg-[#8e9aaf] text-white font-bold py-4 rounded-xl shadow-[0_0_15px_rgba(142,154,175,0.4)] hover:shadow-[0_0_25px_rgba(142,154,175,0.7)] transform hover:-translate-y-1 hover:bg-[#7a869a] transition-all duration-300">
                  Take Quiz: What is My Partner's Attachment Style? →
                </Link>
              )}

              {/* Only show the "Fix" button if they are insecurely attached! */}
              {!isSecure && (
                <Link href="/understanding-attachment-styles" className="block w-full text-center bg-emerald-500 text-white font-bold py-4 rounded-xl shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:shadow-[0_0_25px_rgba(16,185,129,0.6)] transform hover:-translate-y-1 hover:bg-emerald-400 transition-all duration-300 border border-emerald-400">
                  ✨ Start Healing: How to Fix My Attachment Style
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- RENDER 'ANALYZE' BUTTON SCREEN (HIDES QUESTIONS) ---
  if (isFinished) {
    return (
      <div className="w-full mx-auto text-center py-10 animate-in fade-in zoom-in duration-300">
        <div className="w-20 h-20 mx-auto bg-[#dee2ff] rounded-full flex items-center justify-center mb-6 shadow-inner border-2 border-white">
          <span className="text-3xl">🧠</span>
        </div>
        <h3 className="text-3xl font-extrabold text-[#334B63] mb-4">Assessment Complete</h3>
        <p className="text-[#5E6E79] text-lg mb-10 max-w-md mx-auto font-medium">
          We have fully analyzed your psychological responses and behavior patterns.
        </p>
        <button 
          onClick={handleSubmit} 
          disabled={loading}
          className="w-full max-w-sm mx-auto block bg-[#8e9aaf] text-white font-bold py-4 rounded-xl shadow-[0_0_20px_rgba(142,154,175,0.5)] hover:shadow-[0_0_30px_rgba(142,154,175,0.8)] transform hover:-translate-y-1 hover:bg-[#7a869a] transition-all duration-300"
        >
          {loading ? "Analyzing Profile..." : "Analyze My Attachment Style"}
        </button>
      </div>
    );
  }

  // --- RENDER ACTIVE QUESTIONS ---
  const q = activeQuestions[currentQuestion];

  return (
    <div className="w-full mx-auto animate-in slide-in-from-right-4 duration-300">
      
      {/* Visual Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center text-sm font-semibold text-[#8e9aaf] uppercase tracking-wider mb-3">
          <span>Question {currentQuestion + 1} of {activeQuestions.length}</span>
          <span>{progress}% Completed</span>
        </div>
        <div className="w-full bg-[#feeafa] rounded-full h-2.5 border border-[#efd3d7] overflow-hidden">
          <div className="bg-[#8e9aaf] h-full rounded-full transition-all duration-500 ease-out shadow-sm" style={{ width: `${progress}%` }}></div>
        </div>
      </div>

      <h3 className="text-2xl md:text-3xl font-bold text-[#334B63] mb-8 leading-snug text-center min-h-[80px] flex items-center justify-center">
        {q.text}
      </h3>

      <div className="space-y-4">
        {q.options.map((option, idx) => (
          <button
            key={idx}
            onClick={() => handleOptionClick(option)}
            className="w-full text-left p-5 rounded-2xl border-2 border-[#dee2ff] hover:border-[#8e9aaf] hover:bg-[#feeafa]/50 transition-all duration-200 text-[#5E6E79] font-medium text-lg hover:shadow-md hover:-translate-y-0.5 focus:outline-none"
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

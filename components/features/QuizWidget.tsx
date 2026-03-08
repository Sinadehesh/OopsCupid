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
  const isPartnerTest = quizName === "partners-attachment-style";

  // Dynamic Visual Theming (Pink for /me vs Crimson for /him)
  const tBg = isPartnerTest ? "bg-[#fdffff]" : "bg-white";
  const tH3 = isPartnerTest ? "text-[#280000]" : "text-[#334B63]";
  const tP = isPartnerTest ? "text-[#570000]" : "text-[#5E6E79]";
  const tBorder = isPartnerTest ? "border-[#de7c5a]/40" : "border-[#dee2ff]";
  const tAccentBg = isPartnerTest ? "bg-[#b10f2e]" : "bg-[#8e9aaf]";
  const tAccentHover = isPartnerTest ? "hover:bg-[#8a0b23]" : "hover:bg-[#7a869a]";
  const tAccentLight = isPartnerTest ? "bg-[#b10f2e]/10" : "bg-[#feeafa]";
  const tShadow = isPartnerTest ? "shadow-[0_0_20px_rgba(177,15,46,0.3)]" : "shadow-[0_0_20px_rgba(142,154,175,0.5)]";

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
        
        // Handle "Leaning" logic
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

      setResultData({ title, description, behaviors, chances, healthScore, isSingle, primaryStyle });
      setShowResult(true);
      setLoading(false);
    }, 1200);
  };

  const progress = Math.round((answers.length / activeQuestions.length) * 100);

  if (showResult && resultData) {
    const isBadScore = resultData.healthScore < 50;
    const isSecure = resultData.primaryStyle === "Secure";
    
    // URGENT HOOK COPY BASED ON TEST TYPE
    let ctaHook = "";
    if (isPartnerTest) {
      if (isSecure) {
        ctaHook = "He is displaying healthy patterns, but are his words aligning with his psychological blueprint? Drop his recent texts into our Chat Analyzer to verify his true intentions and make sure you aren't missing any subtle red flags.";
      } else {
        ctaHook = `His ${resultData.primaryStyle} attachment style is quietly dictating every argument and text message you exchange. Don't guess what he means anymore. Paste his confusing texts into our AI Analyzer to decode exactly what he is thinking.`;
      }
    } else {
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
        <span className={`text-sm font-bold uppercase tracking-widest ${isPartnerTest ? 'text-[#b10f2e]' : 'text-[#8e9aaf]'} mb-3 block text-center`}>
          Clinical Result
        </span>
        <h3 className={`text-[28px] md:text-[34px] font-extrabold ${tH3} mb-6 leading-tight text-center`}>
          {resultData.title}
        </h3>
        
        <div className="flex justify-center mb-10">
          <div className={`px-6 py-3 rounded-xl border-2 font-bold text-lg text-center shadow-sm ${isBadScore ? 'bg-red-50 text-red-700 border-red-200' : 'bg-emerald-50 text-emerald-700 border-emerald-200'}`}>
            {isBadScore 
              ? `⚠️ Warning: ${isPartnerTest ? 'He scored' : 'You scored'} in the bottom ${resultData.healthScore}% for healthy attachment.`
              : `✨ Great News: ${isPartnerTest ? 'He scored' : 'You scored'} in the top ${100 - resultData.healthScore}% for healthy attachment.`
            }
          </div>
        </div>

        <div className={`space-y-8 px-2 md:px-6 ${tP}`}>
          <div>
            <h4 className={`text-xl font-bold ${tH3} mb-2`}>The Psychology</h4>
            <p className="text-lg leading-relaxed">{resultData.description}</p>
          </div>

          <div className={`${tAccentLight} p-6 rounded-2xl border ${tBorder}`}>
            <h4 className={`text-xl font-bold ${tH3} mb-3`}>Explicit Behaviors {isPartnerTest ? 'He Shows' : 'You Show'}:</h4>
            <p className="text-lg leading-relaxed whitespace-pre-wrap">{resultData.behaviors}</p>
          </div>

          <div>
            <h4 className={`text-xl font-bold ${tH3} mb-2`}>Chances of a Safe, Stable Relationship:</h4>
            <p className="text-lg leading-relaxed font-medium">{resultData.chances}</p>
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
              {isPartnerTest ? (
                <>
                  <Link href="/chat-analyzer" className="block w-full text-center bg-red-600 text-white font-extrabold py-5 rounded-xl shadow-[0_0_15px_rgba(220,38,38,0.4)] hover:shadow-[0_0_25px_rgba(220,38,38,0.7)] transform hover:-translate-y-1 hover:bg-red-700 transition-all duration-300 border-b-4 border-red-800 active:border-b-0 active:translate-y-1">
                    Decode His Mixed Signals: AI Chat Analyzer →
                  </Link>
                  {!isSecure && (
                    <Link href="/relationship-red-flags" className="block w-full text-center bg-[#280000] text-[#fdffff] font-extrabold py-5 rounded-xl hover:-translate-y-1 hover:bg-[#150000] transition-all duration-300 border border-[#b10f2e]">
                      📖 Read: Dealing with an Insecure Partner
                    </Link>
                  )}
                </>
              ) : (
                <>
                  {resultData.isSingle ? (
                    <Link href="/attraction-patterns" className="block w-full text-center bg-red-600 text-white font-extrabold py-5 rounded-xl shadow-[0_0_15px_rgba(220,38,38,0.4)] hover:shadow-[0_0_25px_rgba(220,38,38,0.7)] transform hover:-translate-y-1 hover:bg-red-700 transition-all duration-300 border-b-4 border-red-800 active:border-b-0 active:translate-y-1">
                      Take Quiz: What Kind of Person Do I Attract? →
                    </Link>
                  ) : (
                    <Link href="/partners-attachment-style" className="block w-full text-center bg-red-600 text-white font-extrabold py-5 rounded-xl shadow-[0_0_15px_rgba(220,38,38,0.4)] hover:shadow-[0_0_25px_rgba(220,38,38,0.7)] transform hover:-translate-y-1 hover:bg-red-700 transition-all duration-300 border-b-4 border-red-800 active:border-b-0 active:translate-y-1">
                      Take Quiz: What is My Partner's Attachment Style? →
                    </Link>
                  )}
                  {!isSecure && (
                    <Link href="/understanding-attachment-styles" className="block w-full text-center bg-emerald-500 text-white font-extrabold py-5 rounded-xl shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:shadow-[0_0_25px_rgba(16,185,129,0.6)] transform hover:-translate-y-1 hover:bg-emerald-400 transition-all duration-300 border-b-4 border-emerald-700 active:border-b-0 active:translate-y-1">
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
          We have fully analyzed {isPartnerTest ? 'his' : 'your'} psychological responses and behavior patterns.
        </p>
        <button 
          onClick={handleSubmit} 
          disabled={loading}
          className={`w-full max-w-sm mx-auto block ${tAccentBg} text-white font-bold py-4 rounded-xl ${tShadow} transform hover:-translate-y-1 ${tAccentHover} transition-all duration-300`}
        >
          {loading ? "Analyzing Profile..." : (isPartnerTest ? "Analyze His Attachment Style" : "Analyze My Attachment Style")}
        </button>
      </div>
    );
  }

  const q = activeQuestions[currentQuestion];

  return (
    <div className="w-full mx-auto animate-in slide-in-from-right-4 duration-300">
      <div className="mb-8">
        <div className={`flex justify-between items-center text-sm font-bold uppercase tracking-wider mb-3 ${isPartnerTest ? 'text-[#b10f2e]' : 'text-[#8e9aaf]'}`}>
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
            className={`w-full text-left p-5 rounded-2xl border-2 ${tBorder} hover:border-[${isPartnerTest ? '#b10f2e' : '#8e9aaf'}] ${isPartnerTest ? 'hover:bg-[#b10f2e]/5' : 'hover:bg-[#feeafa]/50'} transition-all duration-200 ${tP} font-medium text-lg hover:shadow-md hover:-translate-y-0.5 focus:outline-none`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

"use client";

import React, { useState, useMemo, useRef } from "react";
import SharePrintButtons from "@/components/ui/SharePrintButtons";
import Link from "next/link";
import { generatePsychologicalProfile, computeLegacyResult } from "@/lib/psychometrics/classification";
import MasterReport from "@/components/report/MasterReport";
import { DashboardGrid, MultiGaugeGrid } from "@/components/report/ScoreBars";

// NEW ATTRACTION ENGINE IMPORTS
import { attractionQuestions } from "@/lib/psychometrics/attraction/questions";
import { generateAttractionProfile } from "@/lib/psychometrics/attraction/scoring";
import AttractionMasterReport from "@/components/report/AttractionMasterReport";

type Question = {
  id: string; 
  section?: string; 
  subscale?: string; 
  text: string; 
  options: string[]; 
  reverseScore?: boolean;
};

// 1. DEMOGRAPHICS (3 items)
const demoQ: Question[] = [
  { id: "demo_1", section: "demographics", text: "What is your current relationship status?", options: ["Single", "In a relationship", "It's complicated"] },
  { id: "demo_2", section: "demographics", text: "Do you have children?", options: ["Yes", "No"] },
  { id: "demo_3", section: "demographics", text: "What is your gender?", options: ["Woman", "Man", "Non-binary / Prefer not to say"] },
];

// 2. ECR-RS (45 items across 5 domains)
const ecrBasePlural = [
  "It helps to turn to [TARGET] in times of need.",
  "I usually discuss my problems and concerns with [TARGET].",
  "I talk things over with [TARGET].",
  "I find it easy to depend on [TARGET].",
  "I don't feel comfortable opening up to [TARGET].",
  "I prefer not to show [TARGET] how I feel deep down.",
  "I often worry that [TARGET] don't really care for me.",
  "I'm afraid that [TARGET] may abandon me.",
  "I worry that [TARGET] won't care about me as much as I care about them."
];

const ecrBaseSingular = [
  "It helps to turn to [TARGET] in times of need.",
  "I usually discuss my problems and concerns with [TARGET].",
  "I talk things over with [TARGET].",
  "I find it easy to depend on [TARGET].",
  "I don't feel comfortable opening up to [TARGET].",
  "I prefer not to show [TARGET] how I feel deep down.",
  "I often worry that [TARGET] doesn't really care for me.",
  "I'm afraid that [TARGET] may abandon me.",
  "I worry that [TARGET] won't care about me as much as I care about them."
];

// Contextual mapping: explains context on the very first question, then simplifies.
const ecrDomainsConfig = [
  { key: "general", text: "people I am close to", textFirst: "people I am close to", plural: true },
  { key: "romantic", text: "my romantic partner", textFirst: "my romantic partner", plural: false },
  { key: "mother", text: "my mother", textFirst: "my mother (or mother-like figure)", plural: false },
  { key: "father", text: "my father", textFirst: "my father (or father-like figure)", plural: false },
  { key: "work", text: "my coworkers", textFirst: "my coworkers", plural: true }
];

const ecrQ: Question[] = [];
ecrDomainsConfig.forEach(({ key, text, textFirst, plural }) => {
  const base = plural ? ecrBasePlural : ecrBaseSingular;
  base.forEach((qText, i) => {
    // Use the explicit explanation 'textFirst' only on the very first question (i === 0)
    const targetText = i === 0 ? textFirst : text;
    ecrQ.push({
      id: `ecr_${key}_${i + 1}`,
      section: "ecr",
      subscale: key.charAt(0).toUpperCase() + key.slice(1),
      text: qText.replace(/\[TARGET\]/g, targetText),
      options: ["1 - Strongly Disagree", "2", "3", "4", "5", "6", "7 - Strongly Agree"]
    });
  });
});

// 3. ROSENBERG SELF-ESTEEM (10 items)
const rsQ: Question[] = [
  "On the whole, I am satisfied with myself.",
  "At times I think I am no good at all.",
  "I feel that I have a number of good qualities.",
  "I am able to do things as well as most other people.",
  "I feel I do not have much to be proud of.",
  "I certainly feel useless at times.",
  "I feel that I'm a person of worth, at least on an equal plane with others.",
  "I wish I could have more respect for myself.",
  "All in all, I am inclined to feel that I am a failure.",
  "I take a positive attitude toward myself."
].map((text, i) => ({
  id: `rs_${i + 1}`,
  section: "rosenberg",
  text,
  options: ["1 - Strongly Disagree", "2 - Disagree", "3 - Agree", "4 - Strongly Agree"]
}));

// 4. DERS-16 EMOTION REGULATION (16 items)
const dersQ: Question[] = [
  "I have difficulty making sense out of my feelings.",
  "I am confused about how I feel.",
  "When I'm upset, I have difficulty getting work done.",
  "When I'm upset, I become out of control.",
  "When I'm upset, I believe that I will remain that way for a long time.",
  "When I'm upset, I believe that I'll end up feeling very depressed.",
  "When I'm upset, I have difficulty focusing on other things.",
  "When I'm upset, I feel out of control.",
  "When I'm upset, I feel ashamed with myself for feeling that way.",
  "When I'm upset, I feel like I am weak.",
  "When I'm upset, I feel angry with myself for feeling that way.",
  "When I'm upset, I believe that there is nothing I can do to make myself feel better.",
  "When I'm upset, I become angry with myself for feeling that way.",
  "When I'm upset, I start to feel very bad about myself.",
  "When I'm upset, I have difficulty thinking about anything else.",
  "When I'm upset, my emotions feel overwhelming."
].map((text, i) => ({
  id: `ders_${i + 1}`,
  section: "ders",
  text,
  options: ["1 - Almost never", "2 - Sometimes", "3 - About half the time", "4 - Most of the time", "5 - Almost always"]
}));

// 5. LOVE STYLES (18 items)
const loveStyles = [
  { id: "ls_eros_1", text: "My partner and I have the right physical 'chemistry' between us." },
  { id: "ls_eros_2", text: "I feel that my partner and I were meant for each other." },
  { id: "ls_eros_3", text: "My partner and I really understand each other." },
  { id: "ls_ludus_1", text: "I believe that what my partner doesn't know about me won't hurt them." },
  { id: "ls_ludus_2", text: "I have sometimes had to keep my partner from finding out about other people." },
  { id: "ls_ludus_3", text: "I enjoy playing the 'game of love' with a number of different partners." },
  { id: "ls_storge_1", text: "Our love is the best kind because it grew out of a long friendship." },
  { id: "ls_storge_2", text: "Our friendship merged gradually into love over time." },
  { id: "ls_storge_3", text: "Our love relationship is the most satisfying because it developed from a good friendship." },
  { id: "ls_pragma_1", text: "A main consideration in choosing my partner was how they would reflect on my family." },
  { id: "ls_pragma_2", text: "An important factor in choosing my partner was whether or not they would be a good parent." },
  { id: "ls_pragma_3", text: "One consideration in choosing my partner was how they would reflect on my career." },
  { id: "ls_mania_1", text: "When things aren't right with my partner and me, my stomach gets upset." },
  { id: "ls_mania_2", text: "If my partner ignores me for a while, I sometimes do stupid things to try to get their attention back." },
  { id: "ls_mania_3", text: "When my partner doesn't pay attention to me, I feel sick all over." },
  { id: "ls_agape_1", text: "I cannot be happy unless I place my partner's happiness before my own." },
  { id: "ls_agape_2", text: "I am usually willing to sacrifice my own wishes to let my partner achieve theirs." },
  { id: "ls_agape_3", text: "I would endure all things for the sake of my partner." }
];
const loveQ: Question[] = loveStyles.map(q => ({
  ...q,
  section: "lovestyle",
  options: ["1 - Strongly Disagree", "2 - Disagree", "3 - Neutral", "4 - Agree", "5 - Strongly Agree"]
}));

const legacyBanks: Record<string, Question[]> = {
  "is-he-manipulative": [
    { id: "1", text: "When you bring up something he did wrong, how does he react?", options: ["Apologizes and tries to fix it", "Denies it ever happened", "Blames you for making him act that way", "Changes the subject entirely"] },
    { id: "2", text: "How does he act around your friends or family?", options: ["Supportive and friendly", "Complains about them constantly", "Refuses to spend time with them", "Convinces you they don't care about you"] },
  ],
  "partners-attachment-style": [
    { id: "1", text: "When stressed, your partner:", options: ["Talks openly to connect", "Seeks lots of reassurance", "Withdraws/needs space alone", "Panics then shuts down"] },
  ],
  "default": [
    { id: "1", text: "How often do they text you first?", options: ["Every day", "Usually", "Rarely", "Never"] }
  ]
};

const PHASE_LABELS: Record<string, string> = {
  demographics: "Profile Setup", ecr: "Attachment Style", rosenberg: "Self-Esteem", ders: "Emotion Regulation",
  lovestyle: "Love Styles", yqs: "Deep Patterns", crq: "Relationship Blueprint", mds: "Inner World", parenting: "Parenting Style",
  "A": "Personality Core", "B": "Attachment Dynamics", "C": "Maladaptive Traits", 
  "D": "Dark Triad Risk", "E": "Clinical Vulnerabilities", "F": "Mate Preferences"
};

export default function QuizWidget({ quizName }: { quizName: string }) {
  const [currentIndex, setCurrentIndex]     = useState(0);
  const [answers, setAnswers]               = useState<Record<string, string>>({});
  const [showResult, setShowResult]         = useState(false);
  const [resultData, setResultData]         = useState<any>(null);
  const [loading, setLoading]               = useState(false);
  
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnimating, setIsAnimating]       = useState(false);
  const [slideDirection, setSlideDirection] = useState<"forward" | "backward">("forward");

  const topRef = useRef<HTMLDivElement>(null);

  const isDarkTheme = ["partners-attachment-style","is-he-manipulative"].includes(quizName);
  const isAttraction = quizName === "attraction-patterns" || quizName === "who-finds-me-attractive";

  const activeQuestions = useMemo(() => {
    if (quizName === "attachment-style") {
      return [...demoQ, ...ecrQ, ...rsQ, ...dersQ, ...loveQ]; 
    }
    
    if (isAttraction) {
      return attractionQuestions.map(q => ({
        id: q.id,
        section: q.moduleKey,
        subscale: q.subscaleKey,
        text: q.text,
        options: q.options
      }));
    }

    return legacyBanks[quizName] || legacyBanks["default"];
  }, [quizName, isAttraction]);

  const isFinished = currentIndex >= activeQuestions.length;
  const progress   = Math.round((currentIndex / activeQuestions.length) * 100);

  const colors = isAttraction ? {
    bg: "bg-white", cardBorder: "border-transparent", cardShadow: "", textPrimary: "text-[#086788]", textSecondary: "text-[#086788]/70", progressTrack: "bg-[#086788]/10", progressFill: "bg-[#F0C808]", optionBorder: "border-[#06AED5]/40", optionHover: "hover:border-[#06AED5] hover:bg-[#06AED5]/5 hover:-translate-y-0.5 hover:shadow-sm", optionSelected: "border-[#086788] bg-[#06AED5]/10 shadow-inner", btnPrimary: "bg-[#DD1C1A] text-white hover:bg-[#C11715]", btnBack: "border-[#086788]/20 text-[#086788] hover:bg-[#086788]/5 hover:border-[#086788]", chipBg: "bg-[#086788]/10", chipText: "text-[#086788]"
  } : isDarkTheme ? {
    bg: "bg-[#0f172a]", cardBorder: "border-slate-700", cardShadow: "shadow-xl", textPrimary: "text-slate-100", textSecondary: "text-slate-400", progressTrack: "bg-slate-100", progressFill: "bg-[#0496ff]", optionBorder: "border-slate-700", optionHover: "hover:border-[#b10f2e] hover:bg-[#b10f2e]/10", optionSelected: "border-[#0496ff] bg-[#0496ff]/10", btnPrimary: "bg-[#b10f2e] text-white", btnBack: "border-slate-700 text-slate-400 hover:bg-slate-800", chipBg: "bg-slate-800", chipText: "text-slate-300"
  } : {
    bg: "bg-white", cardBorder: "border-[#0D2C54]/10", cardShadow: "shadow-[0_12px_40px_rgba(13,44,84,0.06)]", textPrimary: "text-[#0D2C54]", textSecondary: "text-[#0D2C54]/60", progressTrack: "bg-[#0D2C54]/10", progressFill: "bg-[#FFB400]", optionBorder: "border-[#0D2C54]/15", optionHover: "hover:border-[#00A6ED] hover:bg-[#00A6ED]/[0.03] hover:-translate-y-[2px] hover:shadow-[0_4px_12px_rgba(0,166,237,0.12)]", optionSelected: "border-[#00A6ED] bg-[#00A6ED]/[0.05]", btnPrimary: "bg-[#00A6ED] text-white hover:bg-[#00A6ED]/90 shadow-md", btnBack: "border-[#0D2C54]/20 text-[#0D2C54] hover:bg-[#0D2C54]/5", chipBg: "bg-[#FFB400]/20", chipText: "text-[#0D2C54]"
  };

  const handleOptionClick = (option: string) => {
    if (isAnimating || selectedAnswer !== null) return; 
    setSelectedAnswer(option);
    const q = activeQuestions[currentIndex];
    setAnswers(prev => ({ ...prev, [q.id]: option }));
    
    setTimeout(() => {
      setIsAnimating(true);
      setSlideDirection("forward");
      setTimeout(() => {
        setCurrentIndex(prev => prev + 1);
        setSelectedAnswer(null);
        setIsAnimating(false);
      }, 250); 
    }, 400); 
  };

  const handleGodMode = () => {
    const fakeAnswers = { ...answers };
    activeQuestions.forEach(q => {
      if (!fakeAnswers[q.id]) {
        fakeAnswers[q.id] = q.options[Math.floor(Math.random() * q.options.length)];
      }
    });
    if (quizName === 'attachment-style') {
      fakeAnswers['demo_1'] = 'Single'; fakeAnswers['demo_2'] = 'No'; fakeAnswers['demo_3'] = 'Woman';
    }
    setAnswers(fakeAnswers);
    setCurrentIndex(activeQuestions.length);
  };

  const handleBack = () => {
    if (currentIndex > 0 && !isAnimating) {
      setIsAnimating(true);
      setSlideDirection("backward");
      setTimeout(() => {
        setCurrentIndex(prev => prev - 1);
        setSelectedAnswer(null); 
        setIsAnimating(false);
      }, 250);
    }
  };

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      if (quizName === "attachment-style") {
        const hasChildren = answers["demo_2"] === "Yes";
        const isSingle = answers["demo_1"] === "Single" || answers["demo_1"] === "It's complicated";
        const gender = answers["demo_3"] ?? "Non-binary";
        const profile = generatePsychologicalProfile(answers, hasChildren);
        setResultData({ profile, demographics: { isSingle, gender, hasChildren }, type: "attachment" });
      } else if (isAttraction) {
        const profile = generateAttractionProfile(answers);
        setResultData({ profile, type: "attraction" });
      } else {
        const res = computeLegacyResult(answers, quizName);
        setResultData({ ...res, type: "legacy" });
      }
      setShowResult(true);
      setLoading(false);
      if (topRef.current) topRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 2000);
  };

  if (loading) {
    return (
      <div ref={topRef} className={`w-full text-center py-24 ${colors.bg} rounded-[24px] ${colors.cardShadow} border ${colors.cardBorder} animate-in fade-in`}>
        <div className="flex flex-col items-center justify-center">
          <div className={`w-16 h-16 border-4 border-t-transparent ${isAttraction ? 'border-[#06AED5]' : 'border-[#00A6ED]'} rounded-full animate-spin mb-6`}></div>
          <h3 className={`text-2xl font-extrabold ${colors.textPrimary} mb-2 animate-pulse`}>Analyzing Profile...</h3>
        </div>
      </div>
    );
  }

  if (showResult && resultData) {
    if (resultData.type === "attachment") {
      return (
        <div ref={topRef} className="w-full animate-in fade-in duration-500">
          <MasterReport profile={resultData.profile} demographics={resultData.demographics} isDarkTheme={isDarkTheme} />
        </div>
      );
    }
    
    if (resultData.type === "attraction") {
      return (
        <div ref={topRef} className="w-full animate-in fade-in duration-500">
          <AttractionMasterReport profile={resultData.profile} isDarkTheme={isDarkTheme} />
        </div>
      );
    }

    return (
      <div ref={topRef} className={`rounded-[24px] ${colors.bg} text-left w-full max-w-3xl mx-auto ${colors.cardShadow} border ${colors.cardBorder} animate-in fade-in duration-500 p-6 md:p-10`}>
        <h3 className={`text-[28px] md:text-[34px] font-extrabold ${colors.textPrimary} mb-10 leading-tight text-center`}>{resultData.title}</h3>
        <DashboardGrid healthScore={resultData.healthScore} gaugeScore={resultData.gaugeScore} gaugeLabel={resultData.gaugeLabel} />
        <p className={`${colors.textPrimary} p-6 border ${colors.optionBorder} rounded-[16px] font-medium text-lg whitespace-pre-wrap mb-4 bg-slate-50/50`}>{resultData.description}</p>
        <p className={`${colors.textPrimary} p-6 border ${colors.optionBorder} rounded-[16px] font-medium text-lg whitespace-pre-wrap bg-slate-50/50`}>{resultData.behaviors}</p>
        <SharePrintButtons />
      </div>
    );
  }

  if (isFinished) {
    return (
      <div ref={topRef} className={`w-full max-w-3xl mx-auto ${colors.bg} rounded-[24px] ${colors.cardShadow} border ${colors.cardBorder} text-center py-16 px-6 animate-in fade-in zoom-in`}>
        <div className={`w-24 h-24 mx-auto ${colors.progressTrack} rounded-full flex items-center justify-center mb-6`}>
          <span className="text-4xl">🧠</span>
        </div>
        <h3 className={`text-3xl font-extrabold ${colors.textPrimary} mb-4`}>Assessment Complete</h3>
        <p className={`text-lg mb-10 max-w-md mx-auto font-medium ${colors.textSecondary}`}>All data captured. We are ready to compile your specific psychological profile.</p>
        <button onClick={handleSubmit} className={`w-full max-w-sm mx-auto block ${colors.btnPrimary} font-extrabold py-4 rounded-[14px] transform hover:-translate-y-1 transition-all duration-300`}>
          Reveal My Profile
        </button>
      </div>
    );
  }

  const q = activeQuestions[currentIndex];
  const baseSectionName = PHASE_LABELS[q.section || "default"] ?? q.section ?? "Assessment";
  const sectionName = q.subscale ? `${baseSectionName} • ${q.subscale}` : baseSectionName;

  return (
    <div ref={topRef} className={`w-full max-w-3xl mx-auto ${colors.bg} rounded-[24px] ${colors.cardShadow} border ${colors.cardBorder} flex flex-col justify-center min-h-[320px] p-5 md:p-6`}>
      <div className="mb-5">
        <div className="flex justify-between items-end mb-4">
          <div>
            <span className={`text-[11px] font-extrabold uppercase tracking-widest ${colors.textSecondary} block mb-2`}>Section</span>
            <span className={`text-xs md:text-sm font-extrabold px-3.5 py-1.5 rounded-md ${colors.chipBg} ${colors.chipText}`}>{sectionName}</span>
          </div>
          <div className={`text-sm md:text-base font-extrabold tracking-wide ${colors.textPrimary}`}>QUESTION {currentIndex + 1} / {activeQuestions.length}</div>
        </div>
        <div className={`w-full h-2 rounded-full ${colors.progressTrack} overflow-hidden`}>
          <div className={`h-full rounded-full transition-all duration-500 ease-out ${colors.progressFill}`} style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className={`transition-all duration-250 ease-in-out transform ${isAnimating ? (slideDirection === 'forward' ? 'opacity-0 -translate-y-4 scale-[0.99]' : 'opacity-0 translate-y-4 scale-[0.99]') : 'opacity-100 translate-y-0 scale-100'}`}>
        <h3 className={`text-xl md:text-2xl font-extrabold ${colors.textPrimary} mb-5 leading-snug text-left md:text-center`}>{q.text}</h3>
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 w-full">
          {q.options.map((option: string, idx: number) => {
            const isSelected = selectedAnswer === option;
            const isDisabled = selectedAnswer !== null && !isSelected;
            return (
              <button key={idx} onClick={() => handleOptionClick(option)} disabled={isDisabled}
                className={`w-[30%] min-w-[100px] flex-grow text-center flex-col justify-center py-3 px-4 md:py-4 md:px-5 rounded-[12px] border-[2px] font-bold text-sm md:text-base transition-all duration-200 flex items-center ${isSelected ? colors.optionSelected : colors.optionBorder} ${!isDisabled && !isSelected ? colors.optionHover : ''} ${isDisabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'} ${colors.textPrimary}`}>
                {(!isAttraction && !isDarkTheme) && (
                  <div className={`shrink-0 w-[22px] h-[22px] rounded-full border-[2px] mr-4 flex items-center justify-center transition-all duration-200 ${isSelected ? 'border-[#00A6ED] bg-[#00A6ED]' : 'border-[#0D2C54]/20 bg-white'}`}>
                    {isSelected && <div className="w-2 h-2 rounded-full bg-white shadow-sm" />}
                  </div>
                )}
                <span className="w-full text-center">{option}</span>
              </button>
            )
          })}
        </div>
      </div>

      <div className="mt-10 flex justify-between items-center">
        <button onClick={handleBack} disabled={currentIndex === 0 || isAnimating || selectedAnswer !== null}
          className={`text-sm font-extrabold flex items-center gap-2 px-5 py-2.5 rounded-[12px] border-[2px] transition-all ${currentIndex === 0 || isAnimating || selectedAnswer !== null ? 'opacity-0 pointer-events-none' : colors.btnBack}`}>
          <span>←</span> Back
        </button>
        <button onClick={handleGodMode} type="button" title="Instantly jump to results" className="text-[10px] md:text-xs font-bold text-slate-400 hover:text-slate-600 transition-all border border-slate-200 hover:border-slate-300 rounded-lg px-3 py-1.5 ml-auto bg-white shadow-sm">
          ⚡ God Mode
        </button>
      </div>
    </div>
  );
}

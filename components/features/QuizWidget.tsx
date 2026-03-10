"use client";

import React, { useState, useMemo, useRef } from "react";
import Link from "next/link";
import { generatePsychologicalProfile, computeLegacyResult } from "@/lib/psychometrics/classification";
import MasterReport from "@/components/report/MasterReport";
import { DashboardGrid, MultiGaugeGrid } from "@/components/report/ScoreBars";

// ─── STRICT TYPES ───
type Question = {
  id: string; 
  section?: string; // Made optional for legacy quizzes
  subscale?: string; 
  text: string; 
  options: string[]; 
  reverseScore?: boolean;
};

// ─── MASTER BATTERY ARRAYS ───
const demoQ: Question[] = [
  { id: "demo_1", section: "demographics", text: "What is your current relationship status?", options: ["Single", "In a relationship", "It's complicated"] },
  { id: "demo_2", section: "demographics", text: "Do you have children?", options: ["Yes", "No"] },
  { id: "demo_3", section: "demographics", text: "What is your gender?", options: ["Woman", "Man", "Non-binary / Prefer not to say"] },
];
const ecrQ: Question[] = [
  { id: "ecr_general_1", section: "ecr", text: "GENERAL: I find it easy to turn to people I am close to for emotional support.", options: ["1 - Strongly Disagree", "2", "3", "4", "5", "6", "7 - Strongly Agree"] },
  { id: "ecr_general_2", section: "ecr", text: "GENERAL: I naturally discuss my problems with close friends.", options: ["1 - Strongly Disagree", "2", "3", "4", "5", "6", "7 - Strongly Agree"] },
  { id: "ecr_general_3", section: "ecr", text: "GENERAL: I feel completely comfortable depending on others.", options: ["1 - Strongly Disagree", "2", "3", "4", "5", "6", "7 - Strongly Agree"] },
  { id: "ecr_general_4", section: "ecr", text: "GENERAL: I enjoy talking things over and sharing my inner world.", options: ["1 - Strongly Disagree", "2", "3", "4", "5", "6", "7 - Strongly Agree"] },
  { id: "ecr_general_5", section: "ecr", text: "GENERAL: I feel highly uncomfortable opening up emotionally to others.", options: ["1 - Strongly Disagree", "2", "3", "4", "5", "6", "7 - Strongly Agree"] },
  { id: "ecr_general_6", section: "ecr", text: "GENERAL: I prefer to keep my deepest feelings to myself.", options: ["1 - Strongly Disagree", "2", "3", "4", "5", "6", "7 - Strongly Agree"] },
  { id: "ecr_general_7", section: "ecr", text: "GENERAL: I frequently worry that people do not truly care about me.", options: ["1 - Strongly Disagree", "2", "3", "4", "5", "6", "7 - Strongly Agree"] },
  { id: "ecr_general_8", section: "ecr", text: "GENERAL: I have an intense fear that close ones will abandon me.", options: ["1 - Strongly Disagree", "2", "3", "4", "5", "6", "7 - Strongly Agree"] },
  { id: "ecr_general_9", section: "ecr", text: "GENERAL: I constantly worry that I care about others more than they care about me.", options: ["1 - Strongly Disagree", "2", "3", "4", "5", "6", "7 - Strongly Agree"] },
  { id: "ecr_romantic_1", section: "ecr", text: "ROMANTIC: I find it easy to depend on romantic partners.", options: ["1 - Strongly Disagree", "2", "3", "4", "5", "6", "7 - Strongly Agree"] },
  { id: "ecr_romantic_2", section: "ecr", text: "ROMANTIC: I naturally discuss my problems with romantic partners.", options: ["1 - Strongly Disagree", "2", "3", "4", "5", "6", "7 - Strongly Agree"] },
  { id: "ecr_romantic_3", section: "ecr", text: "ROMANTIC: I feel completely comfortable depending on romantic partners.", options: ["1 - Strongly Disagree", "2", "3", "4", "5", "6", "7 - Strongly Agree"] },
  { id: "ecr_romantic_4", section: "ecr", text: "ROMANTIC: I enjoy sharing my inner world with partners.", options: ["1 - Strongly Disagree", "2", "3", "4", "5", "6", "7 - Strongly Agree"] },
  { id: "ecr_romantic_5", section: "ecr", text: "ROMANTIC: I feel uncomfortable opening up emotionally to partners.", options: ["1 - Strongly Disagree", "2", "3", "4", "5", "6", "7 - Strongly Agree"] },
  { id: "ecr_romantic_6", section: "ecr", text: "ROMANTIC: I prefer to keep my deepest feelings to myself in romance.", options: ["1 - Strongly Disagree", "2", "3", "4", "5", "6", "7 - Strongly Agree"] },
  { id: "ecr_romantic_7", section: "ecr", text: "ROMANTIC: I frequently worry that romantic partners do not truly care.", options: ["1 - Strongly Disagree", "2", "3", "4", "5", "6", "7 - Strongly Agree"] },
  { id: "ecr_romantic_8", section: "ecr", text: "ROMANTIC: I fear that romantic partners will eventually abandon me.", options: ["1 - Strongly Disagree", "2", "3", "4", "5", "6", "7 - Strongly Agree"] },
  { id: "ecr_romantic_9", section: "ecr", text: "ROMANTIC: I worry I care about partners more than they care about me.", options: ["1 - Strongly Disagree", "2", "3", "4", "5", "6", "7 - Strongly Agree"] },
  { id: "ecr_mother_1", section: "ecr", text: "MOTHER: I found it easy to turn to my mother for emotional support.", options: ["1 - Strongly Disagree", "2", "3", "4", "5", "6", "7 - Strongly Agree"] },
  { id: "ecr_mother_2", section: "ecr", text: "MOTHER: I naturally discussed problems with my mother.", options: ["1 - Strongly Disagree", "2", "3", "4", "5", "6", "7 - Strongly Agree"] },
  { id: "ecr_mother_3", section: "ecr", text: "MOTHER: I felt comfortable depending on her.", options: ["1 - Strongly Disagree", "2", "3", "4", "5", "6", "7 - Strongly Agree"] },
  { id: "ecr_mother_4", section: "ecr", text: "MOTHER: I enjoyed sharing my inner world with her.", options: ["1 - Strongly Disagree", "2", "3", "4", "5", "6", "7 - Strongly Agree"] },
  { id: "ecr_mother_5", section: "ecr", text: "MOTHER: I felt uncomfortable opening up to her.", options: ["1 - Strongly Disagree", "2", "3", "4", "5", "6", "7 - Strongly Agree"] },
  { id: "ecr_mother_6", section: "ecr", text: "MOTHER: I preferred to keep my feelings to myself around her.", options: ["1 - Strongly Disagree", "2", "3", "4", "5", "6", "7 - Strongly Agree"] },
  { id: "ecr_mother_7", section: "ecr", text: "MOTHER: I worried she did not truly care about me.", options: ["1 - Strongly Disagree", "2", "3", "4", "5", "6", "7 - Strongly Agree"] },
  { id: "ecr_mother_8", section: "ecr", text: "MOTHER: I feared she would abandon me emotionally.", options: ["1 - Strongly Disagree", "2", "3", "4", "5", "6", "7 - Strongly Agree"] },
  { id: "ecr_mother_9", section: "ecr", text: "MOTHER: I worried I cared more about her than she cared about me.", options: ["1 - Strongly Disagree", "2", "3", "4", "5", "6", "7 - Strongly Agree"] },
  { id: "ecr_father_1", section: "ecr", text: "FATHER: I found it easy to turn to my father for emotional support.", options: ["1 - Strongly Disagree", "2", "3", "4", "5", "6", "7 - Strongly Agree"] },
  { id: "ecr_father_2", section: "ecr", text: "FATHER: I naturally discussed problems with my father.", options: ["1 - Strongly Disagree", "2", "3", "4", "5", "6", "7 - Strongly Agree"] },
  { id: "ecr_father_3", section: "ecr", text: "FATHER: I felt comfortable depending on him.", options: ["1 - Strongly Disagree", "2", "3", "4", "5", "6", "7 - Strongly Agree"] },
  { id: "ecr_father_4", section: "ecr", text: "FATHER: I enjoyed sharing my inner world with him.", options: ["1 - Strongly Disagree", "2", "3", "4", "5", "6", "7 - Strongly Agree"] },
  { id: "ecr_father_5", section: "ecr", text: "FATHER: I felt uncomfortable opening up to him.", options: ["1 - Strongly Disagree", "2", "3", "4", "5", "6", "7 - Strongly Agree"] },
  { id: "ecr_father_6", section: "ecr", text: "FATHER: I preferred to keep my feelings to myself around him.", options: ["1 - Strongly Disagree", "2", "3", "4", "5", "6", "7 - Strongly Agree"] },
  { id: "ecr_father_7", section: "ecr", text: "FATHER: I worried he did not truly care about me.", options: ["1 - Strongly Disagree", "2", "3", "4", "5", "6", "7 - Strongly Agree"] },
  { id: "ecr_father_8", section: "ecr", text: "FATHER: I feared he would abandon me emotionally.", options: ["1 - Strongly Disagree", "2", "3", "4", "5", "6", "7 - Strongly Agree"] },
  { id: "ecr_father_9", section: "ecr", text: "FATHER: I worried I cared more about him than he cared about me.", options: ["1 - Strongly Disagree", "2", "3", "4", "5", "6", "7 - Strongly Agree"] },
  { id: "ecr_work_1", section: "ecr", text: "WORK: I find it easy to depend on coworkers.", options: ["1 - Strongly Disagree", "2", "3", "4", "5", "6", "7 - Strongly Agree"] },
  { id: "ecr_work_2", section: "ecr", text: "WORK: I discuss problems with colleagues.", options: ["1 - Strongly Disagree", "2", "3", "4", "5", "6", "7 - Strongly Agree"] },
  { id: "ecr_work_3", section: "ecr", text: "WORK: I feel comfortable depending on teammates.", options: ["1 - Strongly Disagree", "2", "3", "4", "5", "6", "7 - Strongly Agree"] },
  { id: "ecr_work_4", section: "ecr", text: "WORK: I enjoy sharing my inner world at work.", options: ["1 - Strongly Disagree", "2", "3", "4", "5", "6", "7 - Strongly Agree"] },
  { id: "ecr_work_5", section: "ecr", text: "WORK: I feel uncomfortable opening up emotionally at work.", options: ["1 - Strongly Disagree", "2", "3", "4", "5", "6", "7 - Strongly Agree"] },
  { id: "ecr_work_6", section: "ecr", text: "WORK: I keep my deepest feelings to myself professionally.", options: ["1 - Strongly Disagree", "2", "3", "4", "5", "6", "7 - Strongly Agree"] },
  { id: "ecr_work_7", section: "ecr", text: "WORK: I worry coworkers do not truly care about me.", options: ["1 - Strongly Disagree", "2", "3", "4", "5", "6", "7 - Strongly Agree"] },
  { id: "ecr_work_8", section: "ecr", text: "WORK: I fear being abandoned by my team.", options: ["1 - Strongly Disagree", "2", "3", "4", "5", "6", "7 - Strongly Agree"] },
  { id: "ecr_work_9", section: "ecr", text: "WORK: I worry I care more about the team than they care about me.", options: ["1 - Strongly Disagree", "2", "3", "4", "5", "6", "7 - Strongly Agree"] },
];
const rsQ: Question[] = [
  { id: "rs_1", section: "rosenberg", text: "On the whole, I am satisfied with myself.", options: ["1 - Strongly Disagree", "2 - Disagree", "3 - Agree", "4 - Strongly Agree"] },
  { id: "rs_2", section: "rosenberg", text: "At times I think I am no good at all.", options: ["1 - Strongly Disagree", "2 - Disagree", "3 - Agree", "4 - Strongly Agree"] },
  { id: "rs_3", section: "rosenberg", text: "I feel that I have a number of good qualities.", options: ["1 - Strongly Disagree", "2 - Disagree", "3 - Agree", "4 - Strongly Agree"] },
  { id: "rs_4", section: "rosenberg", text: "I am able to do things as well as most other people.", options: ["1 - Strongly Disagree", "2 - Disagree", "3 - Agree", "4 - Strongly Agree"] },
  { id: "rs_5", section: "rosenberg", text: "I feel I do not have much to be proud of.", options: ["1 - Strongly Disagree", "2 - Disagree", "3 - Agree", "4 - Strongly Agree"] },
  { id: "rs_6", section: "rosenberg", text: "I certainly feel useless at times.", options: ["1 - Strongly Disagree", "2 - Disagree", "3 - Agree", "4 - Strongly Agree"] },
  { id: "rs_7", section: "rosenberg", text: "I feel that I'm a person of worth.", options: ["1 - Strongly Disagree", "2 - Disagree", "3 - Agree", "4 - Strongly Agree"] },
  { id: "rs_8", section: "rosenberg", text: "I wish I could have more respect for myself.", options: ["1 - Strongly Disagree", "2 - Disagree", "3 - Agree", "4 - Strongly Agree"] },
  { id: "rs_9", section: "rosenberg", text: "All in all, I am inclined to feel that I am a failure.", options: ["1 - Strongly Disagree", "2 - Disagree", "3 - Agree", "4 - Strongly Agree"] },
  { id: "rs_10", section: "rosenberg", text: "I take a positive attitude toward myself.", options: ["1 - Strongly Disagree", "2 - Disagree", "3 - Agree", "4 - Strongly Agree"] },
];
const dersQ: Question[] = [
  { id:"ders_1", section:"ders", text:"When I'm upset, I become angry with myself.", options:["1 - Almost Never","2","3","4","5 - Almost Always"] },
  { id:"ders_2", section:"ders", text:"When I'm upset, I feel ashamed with myself.", options:["1 - Almost Never","2","3","4","5 - Almost Always"] },
  { id:"ders_3", section:"ders", text:"When I'm upset, I feel guilty.", options:["1 - Almost Never","2","3","4","5 - Almost Always"] },
  { id:"ders_4", section:"ders", text:"When I'm upset, I feel like I am weak.", options:["1 - Almost Never","2","3","4","5 - Almost Always"] },
  { id:"ders_5", section:"ders", text:"When I'm upset, I have difficulty getting work done.", options:["1 - Almost Never","2","3","4","5 - Almost Always"] },
  { id:"ders_6", section:"ders", text:"When I'm upset, I have difficulty focusing.", options:["1 - Almost Never","2","3","4","5 - Almost Always"] },
  { id:"ders_7", section:"ders", text:"When I'm upset, I have difficulty thinking about anything else.", options:["1 - Almost Never","2","3","4","5 - Almost Always"] },
  { id:"ders_8", section:"ders", text:"When I'm upset, I feel out of control.", options:["1 - Almost Never","2","3","4","5 - Almost Always"] },
  { id:"ders_9", section:"ders", text:"When I'm upset, I have difficulty controlling behaviors.", options:["1 - Almost Never","2","3","4","5 - Almost Always"] },
  { id:"ders_10", section:"ders", text:"When I'm upset, I lose control over my behaviors.", options:["1 - Almost Never","2","3","4","5 - Almost Always"] },
  { id:"ders_11", section:"ders", text:"When I'm upset, I believe there is nothing I can do to feel better.", options:["1 - Almost Never","2","3","4","5 - Almost Always"] },
  { id:"ders_12", section:"ders", text:"When I'm upset, I believe that I will end up depressed.", options:["1 - Almost Never","2","3","4","5 - Almost Always"] },
  { id:"ders_13", section:"ders", text:"When I'm upset, it takes me a long time to feel better.", options:["1 - Almost Never","2","3","4","5 - Almost Always"] },
  { id:"ders_14", section:"ders", text:"When I'm upset, my emotions feel overwhelming.", options:["1 - Almost Never","2","3","4","5 - Almost Always"] },
  { id:"ders_15", section:"ders", text:"I have difficulty making sense out of my feelings.", options:["1 - Almost Never","2","3","4","5 - Almost Always"] },
  { id:"ders_16", section:"ders", text:"I am confused about how I feel.", options:["1 - Almost Never","2","3","4","5 - Almost Always"] },
];
const loveQ: Question[] = [
  { id:"ls_eros_1", section:"lovestyle", text:"My partner and I have the right physical chemistry.", options:["1 - Strongly Disagree","2","3","4","5 - Strongly Agree"] },
  { id:"ls_ludus_1", section:"lovestyle", text:"I believe that what my partner doesn't know won't hurt them.", options:["1 - Strongly Disagree","2","3","4","5 - Strongly Agree"] },
  { id:"ls_storge_1", section:"lovestyle", text:"The best relationships grow out of a deep friendship.", options:["1 - Strongly Disagree","2","3","4","5 - Strongly Agree"] },
  { id:"ls_pragma_1", section:"lovestyle", text:"I consider what a person will become before committing.", options:["1 - Strongly Disagree","2","3","4","5 - Strongly Agree"] },
  { id:"ls_mania_1", section:"lovestyle", text:"When my partner ignores me, I feel sick all over.", options:["1 - Strongly Disagree","2","3","4","5 - Strongly Agree"] },
  { id:"ls_agape_1", section:"lovestyle", text:"I would rather suffer myself than let my partner suffer.", options:["1 - Strongly Disagree","2","3","4","5 - Strongly Agree"] }
];
const yqsQ: Question[] = [
  { id:"yqs_ab_1", section:"yqs", text:"I worry people will find someone else and leave me.", options:["1 - Completely Untrue","2","3","4","5","6 - Perfectly Describes Me"] },
  { id:"yqs_mi_1", section:"yqs", text:"I feel I can't let my guard down, or they will hurt me.", options:["1 - Completely Untrue","2","3","4","5","6 - Perfectly Describes Me"] },
  { id:"yqs_ed_1", section:"yqs", text:"I don't feel people really understand my emotional needs.", options:["1 - Completely Untrue","2","3","4","5","6 - Perfectly Describes Me"] },
  { id:"yqs_de_1", section:"yqs", text:"No one could love me if they really knew me.", options:["1 - Completely Untrue","2","3","4","5","6 - Perfectly Describes Me"] },
  { id:"yqs_fa_1", section:"yqs", text:"I feel I am less talented than most people around me.", options:["1 - Completely Untrue","2","3","4","5","6 - Perfectly Describes Me"] },
  { id:"yqs_su_1", section:"yqs", text:"I feel I must give in to others' wishes or they'll reject me.", options:["1 - Completely Untrue","2","3","4","5","6 - Perfectly Describes Me"] }
];
const crqQ: Question[] = [
  { id:"crq_1", section:"crq", text:"I want people close to me to deeply understand my feelings.", options:["1 - Strongly Disagree","2","3","4","5 - Strongly Agree"] },
  { id:"crq_7", section:"crq", text:"When things get intense, I pull back to protect myself.", options:["1 - Strongly Disagree","2","3","4","5 - Strongly Agree"] }
];
const mdsQ: Question[] = [
  { id:"mds_1", section:"mds", text:"I spend large amounts of time lost in fantasy.", options:["1 - Almost Never","2","3","4","5 - Very Often"] },
];
const parQ: Question[] = [
  { id:"par_auth_1", section:"parenting", text:"I explain the reasons behind the rules I set.", options:["1 - Never","2","3","4","5 - Always"] },
  { id:"par_arit_1", section:"parenting", text:"I expect obedience without needing an explanation.", options:["1 - Never","2","3","4","5 - Always"] },
  { id:"par_perm_1", section:"parenting", text:"I give in when my child pushes back.", options:["1 - Never","2","3","4","5 - Always"] }
];

// Strictly typed Legacy Banks
const legacyBanks: Record<string, Question[]> = {
  "is-he-manipulative": [
    { id: "1", text: "When you bring up something he did wrong, how does he react?", options: ["Apologizes and tries to fix it", "Denies it ever happened", "Blames you for making him act that way", "Changes the subject entirely"] },
    { id: "2", text: "How does he act around your friends or family?", options: ["Supportive and friendly", "Complains about them constantly", "Refuses to spend time with them", "Convinces you they don't care about you"] },
    { id: "3", text: "When you want to do something without him:", options: ["He encourages me to have fun", "He pouts and makes me feel guilty", "He starts a massive fight right before I leave", "He texts/calls me incessantly while I'm out"] },
    { id: "4", text: "How has his affection changed since the beginning?", options: ["It has remained steady and loving", "He was intense at first, now he is cold", "He is only loving when I do what he wants", "He acts like a totally different person now"] },
    { id: "5", text: "Does he ever genuinely apologize without adding a 'but'?", options: ["Yes, he takes accountability", "Rarely, he usually makes excuses", "Never. It is always my fault", "Only if he wants something from me"] },
    { id: "6", text: "How does he handle your decisions, money, or appearance?", options: ["He respects my choices", "He gives unsolicited, critical advice", "He gets angry if I don't consult him first", "He actively controls my money or decisions"] },
    { id: "7", text: "Has he ever called you crazy, overly sensitive, or irrational?", options: ["No, we communicate respectfully", "Once or twice in a heated argument", "Yes, he frequently calls me crazy or 'too sensitive'", "He tells me my memory is broken/wrong"] },
    { id: "8", text: "How do you feel most of the time in this relationship?", options: ["Safe, relaxed, and loved", "Confused, like I am walking on eggshells", "Exhausted, I feel like everything is my fault", "Terrified to set him off"] },
  ],
  "partners-attachment-style": [
    { id: "1", text: "When stressed, your partner:", options: ["Talks openly to connect", "Seeks lots of reassurance", "Withdraws/needs space alone", "Panics then shuts down"] },
    { id: "2", text: "During arguments:", options: ["Stays engaged calmly", "Worries you'll leave/gets clingy", "Shuts down or leaves", "Yells then apologizes intensely"] },
    { id: "3", text: "About intimacy/emotions:", options: ["Comfortable sharing deeply", "Craves more closeness", "Keeps things surface-level", "Wants it but fears getting hurt"] },
    { id: "4", text: "When you need support:", options: ["Listens and helps reliably", "Over-apologizes or fixes frantically", "Feels smothered/gives advice only", "Wants to help but pulls away"] },
    { id: "5", text: "Plans/commitments:", options: ["Reliable and flexible", "Anxious if uncertain", "Avoids labeling things", "Hot/cold depending on mood"] },
    { id: "6", text: "Physical affection:", options: ["Natural and consistent", "Wants more always", "On their terms only", "Intense but inconsistent"] },
    { id: "7", text: "Past relationships:", options: ["Mostly healthy ones", "Often felt abandoned", "Prefers casual/short-term", "Turbulent breakups"] },
    { id: "8", text: "Your independence:", options: ["Supports happily", "Feels insecure", "Relieved/encouraged", "Alternates jealousy and distance"] },
    { id: "9", text: "Conflict resolution:", options: ["Works through together", "Fears breakup talks", "Stonewalls or deflects", "Explosive then regretful"] },
    { id: "10", text: "Long-term future:", options: ["Excited to build", "Anxiously needs reassurance", "Hesitant about merging lives", "Dreams big but doubts self"] },
    { id: "11", text: "Trust level:", options: ["Generally trusts easily", "Tests loyalty often", "Guards emotions tightly", "Trusts then distrusts suddenly"] },
    { id: "12", text: "Space needs:", options: ["Balanced", "Fears too much space", "Needs lots of independence", "Craves connection but overwhelms"] }
  ],
  "attraction-patterns": Array.from({length: 24}, (_, i) => ({ id: String(i + 1), text: "Rate this statement.", options: ["Not at all me", "Slightly me", "Neutral", "Very me", "OMG this is so me"] })),
  "who-finds-me-attractive": Array.from({length: 24}, (_, i) => ({ id: String(i + 1), text: "Rate this statement.", options: ["Not at all me", "Slightly me", "Neutral", "Very me", "OMG this is so me"] })),
  "default": [
    { id: "1", text: "How often do they text you first?", options: ["Every day", "Usually", "Rarely", "Never"] }
  ]
};

const PHASE_LABELS: Record<string, string> = {
  demographics: "Profile Setup", ecr: "Attachment Style", rosenberg: "Self-Esteem", ders: "Emotion Regulation",
  lovestyle: "Love Styles", yqs: "Deep Patterns", crq: "Relationship Blueprint", mds: "Inner World", parenting: "Parenting Style",
};

export default function QuizWidget({ quizName }: { quizName: string }) {
  const [currentIndex, setCurrentIndex]     = useState(0);
  const [answers, setAnswers]               = useState<Record<string, string>>({});
  const [showResult, setShowResult]         = useState(false);
  const [resultData, setResultData]         = useState<any>(null);
  const [loading, setLoading]               = useState(false);
  
  // Animation & UX States
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnimating, setIsAnimating]       = useState(false);
  const [slideDirection, setSlideDirection] = useState<"forward" | "backward">("forward");

  const topRef = useRef<HTMLDivElement>(null);

  const isDarkTheme = ["partners-attachment-style","is-he-manipulative"].includes(quizName);
  const isAttraction = quizName === "attraction-patterns" || quizName === "who-finds-me-attractive";

  const activeQuestions = useMemo(() => {
    if (quizName === "attachment-style") {
      const hasKids = answers["demo_2"] === "Yes";
      return [...demoQ, ...ecrQ, ...rsQ, ...dersQ, ...loveQ, ...yqsQ, ...crqQ, ...mdsQ, ...(hasKids ? parQ : [])];
    }
    return legacyBanks[quizName] || legacyBanks["default"];
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quizName, answers["demo_2"]]);

  const isFinished = currentIndex >= activeQuestions.length;
  const progress   = Math.round((currentIndex / activeQuestions.length) * 100);

  // PRECISE UI HIERARCHY AS REQUESTED
  const colors = isAttraction ? {
    bg: "bg-white", cardBorder: "border-transparent", cardShadow: "", textPrimary: "text-[#086788]", textSecondary: "text-[#086788]/70", progressTrack: "bg-[#086788]/10", progressFill: "bg-[#F0C808]", optionBorder: "border-[#06AED5]/40", optionHover: "hover:border-[#06AED5] hover:bg-[#06AED5]/5 hover:-translate-y-0.5 hover:shadow-sm", optionSelected: "border-[#086788] bg-[#06AED5]/10 shadow-inner", btnPrimary: "bg-[#DD1C1A] text-white hover:bg-[#C11715]", btnBack: "border-[#086788]/20 text-[#086788] hover:bg-[#086788]/5 hover:border-[#086788]", chipBg: "bg-[#086788]/10", chipText: "text-[#086788]"
  } : isDarkTheme ? {
    bg: "bg-[#0f172a]", cardBorder: "border-slate-700", cardShadow: "shadow-xl", textPrimary: "text-slate-100", textSecondary: "text-slate-400", progressTrack: "bg-slate-100", progressFill: "bg-[#0496ff]", optionBorder: "border-slate-700", optionHover: "hover:border-[#b10f2e] hover:bg-[#b10f2e]/10", optionSelected: "border-[#0496ff] bg-[#0496ff]/10", btnPrimary: "bg-[#b10f2e] text-white", btnBack: "border-slate-700 text-slate-400 hover:bg-slate-800", chipBg: "bg-slate-800", chipText: "text-slate-300"
  } : {
    // NEW MASTER ATTACHMENT PALETTE (Navy, Blue, Yellow)
    bg: "bg-white",
    cardBorder: "border-[#0D2C54]/10", // 1px solid rgba(13,44,84,0.08)
    cardShadow: "shadow-[0_12px_40px_rgba(13,44,84,0.06)]",
    textPrimary: "text-[#0D2C54]", // Navy
    textSecondary: "text-[#0D2C54]/60",
    progressTrack: "bg-[#0D2C54]/10",
    progressFill: "bg-[#FFB400]", // Yellow emphasis
    optionBorder: "border-[#0D2C54]/15", // soft neutral blue-gray
    optionHover: "hover:border-[#00A6ED] hover:bg-[#00A6ED]/[0.03] hover:-translate-y-[2px] hover:shadow-[0_4px_12px_rgba(0,166,237,0.12)]",
    optionSelected: "border-[#00A6ED] bg-[#00A6ED]/[0.05]",
    btnPrimary: "bg-[#00A6ED] text-white hover:bg-[#00A6ED]/90 shadow-md",
    btnBack: "border-[#0D2C54]/20 text-[#0D2C54] hover:bg-[#0D2C54]/5",
    chipBg: "bg-[#FFB400]/20",
    chipText: "text-[#0D2C54]"
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
        setResultData({ profile, demographics: { isSingle, gender, hasChildren } });
      } else {
        const res = computeLegacyResult(answers, quizName);
        setResultData(res);
      }
      setShowResult(true);
      setLoading(false);
      if (topRef.current) {
        topRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }
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
    if (quizName === "attachment-style" && resultData.profile) {
      return (
        <div ref={topRef} className="w-full animate-in fade-in duration-500">
          <MasterReport profile={resultData.profile} demographics={resultData.demographics} isDarkTheme={isDarkTheme} />
        </div>
      );
    }

    return (
      <div ref={topRef} className={`rounded-[24px] ${colors.bg} text-left w-full max-w-3xl mx-auto ${colors.cardShadow} border ${colors.cardBorder} animate-in fade-in duration-500 p-6 md:p-10`}>
        <h3 className={`text-[28px] md:text-[34px] font-extrabold ${colors.textPrimary} mb-10 leading-tight text-center`}>{resultData.title}</h3>
        {quizName === "who-finds-me-attractive" || quizName === "attraction-patterns" ? (
          <MultiGaugeGrid dialData={resultData.dialData} percentagesData={resultData.percentagesData} title={resultData.title} subLabelStr="%" />
        ) : (
          <DashboardGrid healthScore={resultData.healthScore} gaugeScore={resultData.gaugeScore} gaugeLabel={resultData.gaugeLabel} />
        )}
        <p className={`${colors.textPrimary} p-6 border ${colors.optionBorder} rounded-[16px] font-medium text-lg whitespace-pre-wrap mb-4 bg-slate-50/50`}>{resultData.description}</p>
        <p className={`${colors.textPrimary} p-6 border ${colors.optionBorder} rounded-[16px] font-medium text-lg whitespace-pre-wrap bg-slate-50/50`}>{resultData.behaviors}</p>
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
  const sectionName = PHASE_LABELS[q.section || "default"] ?? q.section ?? "Assessment";

  return (
    <div ref={topRef} className={`w-full max-w-3xl mx-auto ${colors.bg} rounded-[24px] ${colors.cardShadow} border ${colors.cardBorder} flex flex-col justify-center min-h-[450px] p-6 md:p-10`}>
      
      {/* HEADER: Section Indicator & Progress */}
      <div className="mb-10">
        <div className="flex justify-between items-end mb-4">
          <div>
            <span className={`text-[11px] font-extrabold uppercase tracking-widest ${colors.textSecondary} block mb-2`}>
              Section
            </span>
            <span className={`text-xs md:text-sm font-extrabold px-3.5 py-1.5 rounded-md ${colors.chipBg} ${colors.chipText}`}>
              {sectionName}
            </span>
          </div>
          <div className={`text-sm md:text-base font-extrabold tracking-wide ${colors.textPrimary}`}>
            QUESTION {currentIndex + 1} / {activeQuestions.length}
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className={`w-full h-2 rounded-full ${colors.progressTrack} overflow-hidden`}>
          <div className={`h-full rounded-full transition-all duration-500 ease-out ${colors.progressFill}`} style={{ width: \`\${progress}%\` }} />
        </div>
      </div>

      {/* QUESTION & OPTIONS (Animated Container) */}
      <div className={`transition-all duration-250 ease-in-out transform ${isAnimating ? (slideDirection === 'forward' ? 'opacity-0 -translate-y-4 scale-[0.99]' : 'opacity-0 translate-y-4 scale-[0.99]') : 'opacity-100 translate-y-0 scale-100'}`}>
        <h3 className={`text-2xl md:text-[28px] font-extrabold ${colors.textPrimary} mb-8 leading-snug text-left md:text-center`}>
          {q.text}
        </h3>

        <div className="grid grid-cols-1 gap-3 md:gap-4 w-full">
          {q.options.map((option: string, idx: number) => {
            const isSelected = selectedAnswer === option;
            const isDisabled = selectedAnswer !== null && !isSelected;
            
            return (
              <button 
                key={idx} 
                onClick={() => handleOptionClick(option)} 
                disabled={isDisabled}
                className={`
                  w-full text-left p-4 md:p-[20px] rounded-[16px] border-[2px] font-bold text-base md:text-lg transition-all duration-200 flex items-center
                  ${isSelected ? colors.optionSelected : colors.optionBorder}
                  ${!isDisabled && !isSelected ? colors.optionHover : ''}
                  ${isDisabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}
                  ${colors.textPrimary}
                `}
              >
                {/* Visual Indicator Checkbox */}
                {(!isAttraction && !isDarkTheme) && (
                  <div className={`shrink-0 w-[22px] h-[22px] rounded-full border-[2px] mr-4 flex items-center justify-center transition-all duration-200 ${isSelected ? 'border-[#00A6ED] bg-[#00A6ED]' : 'border-[#0D2C54]/20 bg-white'}`}>
                    {isSelected && <div className="w-2 h-2 rounded-full bg-white shadow-sm" />}
                  </div>
                )}
                <span className="flex-1">{option}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* FOOTER: Back Button */}
      <div className="mt-10 flex justify-start">
        <button 
          onClick={handleBack} 
          disabled={currentIndex === 0 || isAnimating || selectedAnswer !== null}
          className={`text-sm font-extrabold flex items-center gap-2 px-5 py-2.5 rounded-[12px] border-[2px] transition-all 
            ${currentIndex === 0 || isAnimating || selectedAnswer !== null
              ? 'opacity-0 pointer-events-none' 
              : colors.btnBack}`}
        >
          <span>←</span> Back
        </button>
      </div>

    </div>
  );
}

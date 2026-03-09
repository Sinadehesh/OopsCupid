"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { computeMasterProfile, computeLegacyResult } from "@/lib/psychometrics/classification";
import AttachmentQuadrant from "@/components/report/AttachmentQuadrant";
import { DashboardGrid, MultiGaugeGrid } from "@/components/report/ScoreBars";
import ReportSection from "@/components/report/ReportSection";

// ─── TYPES & BANKS ────────────────────────────────────────────────────────────
type Question = {
  id: string; section: string; subscale?: string; text: string; options: string[]; reverseScore?: boolean;
};

// (Preserving exact questionsBank structure for UI rendering)
const demographicQuestions: Question[] = [
  { id: "demo_1", section: "demographics", text: "What is your current relationship status?", options: ["Single", "In a relationship", "It's complicated"] },
  { id: "demo_2", section: "demographics", text: "Do you have children?", options: ["Yes", "No"] },
  { id: "demo_3", section: "demographics", text: "What is your gender?", options: ["Woman", "Man", "Non-binary / Prefer not to say"] },
];
const ecrQuestions: Question[] = [
  { id: "ecr_1", section: "ecr", text: "I find it easy to turn to people I am close to when I need emotional support.", options: ["1 - Strongly Disagree", "2", "3", "4 - Neutral", "5", "6", "7 - Strongly Agree"] },
  { id: "ecr_2", section: "ecr", text: "I naturally discuss my problems and concerns with my partner or close friends.", options: ["1 - Strongly Disagree", "2", "3", "4 - Neutral", "5", "6", "7 - Strongly Agree"] },
  { id: "ecr_3", section: "ecr", text: "I feel completely comfortable depending on others for help.", options: ["1 - Strongly Disagree", "2", "3", "4 - Neutral", "5", "6", "7 - Strongly Agree"] },
  { id: "ecr_4", section: "ecr", text: "I enjoy talking things over and sharing my inner world with people I care about.", options: ["1 - Strongly Disagree", "2", "3", "4 - Neutral", "5", "6", "7 - Strongly Agree"] },
  { id: "ecr_5", section: "ecr", text: "I feel highly uncomfortable and uneasy when opening up emotionally to others.", options: ["1 - Strongly Disagree", "2", "3", "4 - Neutral", "5", "6", "7 - Strongly Agree"] },
  { id: "ecr_6", section: "ecr", text: "I prefer to keep my deepest, most vulnerable feelings to myself.", options: ["1 - Strongly Disagree", "2", "3", "4 - Neutral", "5", "6", "7 - Strongly Agree"] },
  { id: "ecr_7", section: "ecr", text: "I frequently worry that the people I love do not truly care about me.", options: ["1 - Strongly Disagree", "2", "3", "4 - Neutral", "5", "6", "7 - Strongly Agree"] },
  { id: "ecr_8", section: "ecr", text: "I have an intense, lingering fear that my partner or close ones will eventually abandon me.", options: ["1 - Strongly Disagree", "2", "3", "4 - Neutral", "5", "6", "7 - Strongly Agree"] },
  { id: "ecr_9", section: "ecr", text: "I constantly worry that I care about others much more than they care about me.", options: ["1 - Strongly Disagree", "2", "3", "4 - Neutral", "5", "6", "7 - Strongly Agree"] },
];
const rosenbergQuestions: Question[] = [
  { id: "rs_1", section: "rosenberg", text: "On the whole, I am satisfied with myself.", options: ["1 - Strongly Disagree", "2 - Disagree", "3 - Agree", "4 - Strongly Agree"] },
  { id: "rs_2", section: "rosenberg", text: "At times I think I am no good at all.", options: ["1 - Strongly Disagree", "2 - Disagree", "3 - Agree", "4 - Strongly Agree"] },
  { id: "rs_3", section: "rosenberg", text: "I feel that I have a number of good qualities.", options: ["1 - Strongly Disagree", "2 - Disagree", "3 - Agree", "4 - Strongly Agree"] },
  { id: "rs_4", section: "rosenberg", text: "I am able to do things as well as most other people.", options: ["1 - Strongly Disagree", "2 - Disagree", "3 - Agree", "4 - Strongly Agree"] },
  { id: "rs_5", section: "rosenberg", text: "I feel I do not have much to be proud of.", options: ["1 - Strongly Disagree", "2 - Disagree", "3 - Agree", "4 - Strongly Agree"] },
  { id: "rs_6", section: "rosenberg", text: "I certainly feel useless at times.", options: ["1 - Strongly Disagree", "2 - Disagree", "3 - Agree", "4 - Strongly Agree"] },
  { id: "rs_7", section: "rosenberg", text: "I feel that I'm a person of worth, at least on an equal plane with others.", options: ["1 - Strongly Disagree", "2 - Disagree", "3 - Agree", "4 - Strongly Agree"] },
  { id: "rs_8", section: "rosenberg", text: "I wish I could have more respect for myself.", options: ["1 - Strongly Disagree", "2 - Disagree", "3 - Agree", "4 - Strongly Agree"] },
  { id: "rs_9", section: "rosenberg", text: "All in all, I am inclined to feel that I am a failure.", options: ["1 - Strongly Disagree", "2 - Disagree", "3 - Agree", "4 - Strongly Agree"] },
  { id: "rs_10", section: "rosenberg", text: "I take a positive attitude toward myself.", options: ["1 - Strongly Disagree", "2 - Disagree", "3 - Agree", "4 - Strongly Agree"] },
];
const dersQuestions: Question[] = [
  { id:"ders_1", section:"ders", text:"When I'm upset, I become angry with myself for feeling that way.", options:["1 - Almost Never","2","3","4","5 - Almost Always"] },
  { id:"ders_2", section:"ders", text:"When I'm upset, I feel ashamed with myself for feeling that way.", options:["1 - Almost Never","2","3","4","5 - Almost Always"] },
  { id:"ders_3", section:"ders", text:"When I'm upset, I feel guilty for feeling that way.", options:["1 - Almost Never","2","3","4","5 - Almost Always"] },
  { id:"ders_4", section:"ders", text:"When I'm upset, I feel like I am weak.", options:["1 - Almost Never","2","3","4","5 - Almost Always"] },
  { id:"ders_5", section:"ders", text:"When I'm upset, I have difficulty getting work done.", options:["1 - Almost Never","2","3","4","5 - Almost Always"] },
  { id:"ders_6", section:"ders", text:"When I'm upset, I have difficulty focusing on other things.", options:["1 - Almost Never","2","3","4","5 - Almost Always"] },
  { id:"ders_7", section:"ders", text:"When I'm upset, I have difficulty thinking about anything else.", options:["1 - Almost Never","2","3","4","5 - Almost Always"] },
  { id:"ders_8", section:"ders", text:"When I'm upset, I feel out of control.", options:["1 - Almost Never","2","3","4","5 - Almost Always"] },
  { id:"ders_9", section:"ders", text:"When I'm upset, I have difficulty controlling my behaviors.", options:["1 - Almost Never","2","3","4","5 - Almost Always"] },
  { id:"ders_10", section:"ders", text:"When I'm upset, I lose control over my behaviors.", options:["1 - Almost Never","2","3","4","5 - Almost Always"] },
  { id:"ders_11", section:"ders", text:"When I'm upset, I believe there is nothing I can do to make myself feel better.", options:["1 - Almost Never","2","3","4","5 - Almost Always"] },
  { id:"ders_12", section:"ders", text:"When I'm upset, I believe that I will end up feeling very depressed.", options:["1 - Almost Never","2","3","4","5 - Almost Always"] },
  { id:"ders_13", section:"ders", text:"When I'm upset, it takes me a long time to feel better.", options:["1 - Almost Never","2","3","4","5 - Almost Always"] },
  { id:"ders_14", section:"ders", text:"When I'm upset, my emotions feel overwhelming.", options:["1 - Almost Never","2","3","4","5 - Almost Always"] },
  { id:"ders_15", section:"ders", text:"I have difficulty making sense out of my feelings.", options:["1 - Almost Never","2","3","4","5 - Almost Always"] },
  { id:"ders_16", section:"ders", text:"I am confused about how I feel.", options:["1 - Almost Never","2","3","4","5 - Almost Always"] },
];
const loveStyleQuestions: Question[] = [
  { id:"ls_eros_1", section:"lovestyle", text:"My partner and I have the right physical chemistry.", options:["1 - Strongly Disagree","2","3","4","5 - Strongly Agree"] },
  { id:"ls_eros_2", section:"lovestyle", text:"I felt a strong physical attraction to my partner almost immediately.", options:["1 - Strongly Disagree","2","3","4","5 - Strongly Agree"] },
  { id:"ls_eros_3", section:"lovestyle", text:"For me, our relationship is the most important thing in the world.", options:["1 - Strongly Disagree","2","3","4","5 - Strongly Agree"] },
  { id:"ls_ludus_1", section:"lovestyle", text:"I believe that what my partner doesn't know about me won't hurt them.", options:["1 - Strongly Disagree","2","3","4","5 - Strongly Agree"] },
  { id:"ls_ludus_2", section:"lovestyle", text:"I enjoy keeping my partner slightly uncertain about my commitment.", options:["1 - Strongly Disagree","2","3","4","5 - Strongly Agree"] },
  { id:"ls_ludus_3", section:"lovestyle", text:"I can get over a relationship fairly quickly and easily.", options:["1 - Strongly Disagree","2","3","4","5 - Strongly Agree"] },
  { id:"ls_storge_1", section:"lovestyle", text:"The best relationships grow out of a strong, deep friendship.", options:["1 - Strongly Disagree","2","3","4","5 - Strongly Agree"] },
  { id:"ls_storge_2", section:"lovestyle", text:"Love is really deep affection developed from a close friendship.", options:["1 - Strongly Disagree","2","3","4","5 - Strongly Agree"] },
  { id:"ls_storge_3", section:"lovestyle", text:"Our love is the best kind because it grew out of a long friendship.", options:["1 - Strongly Disagree","2","3","4","5 - Strongly Agree"] },
  { id:"ls_pragma_1", section:"lovestyle", text:"I consider what a person is going to become in life before I commit.", options:["1 - Strongly Disagree","2","3","4","5 - Strongly Agree"] },
  { id:"ls_pragma_2", section:"lovestyle", text:"A main consideration is how they reflect on my career and family.", options:["1 - Strongly Disagree","2","3","4","5 - Strongly Agree"] },
  { id:"ls_pragma_3", section:"lovestyle", text:"It is best to love someone with a similar background to your own.", options:["1 - Strongly Disagree","2","3","4","5 - Strongly Agree"] },
  { id:"ls_mania_1", section:"lovestyle", text:"When my partner doesn't pay attention to me, I feel sick all over.", options:["1 - Strongly Disagree","2","3","4","5 - Strongly Agree"] },
  { id:"ls_mania_2", section:"lovestyle", text:"I cannot relax if I suspect that my partner is with someone else.", options:["1 - Strongly Disagree","2","3","4","5 - Strongly Agree"] },
  { id:"ls_mania_3", section:"lovestyle", text:"If ignored, I sometimes do things I regret to get their attention.", options:["1 - Strongly Disagree","2","3","4","5 - Strongly Agree"] },
  { id:"ls_agape_1", section:"lovestyle", text:"I would rather suffer myself than let my partner suffer.", options:["1 - Strongly Disagree","2","3","4","5 - Strongly Agree"] },
  { id:"ls_agape_2", section:"lovestyle", text:"Whatever happens to my partner, in a way it also happens to me.", options:["1 - Strongly Disagree","2","3","4","5 - Strongly Agree"] },
  { id:"ls_agape_3", section:"lovestyle", text:"I am usually willing to sacrifice my own wishes for theirs.", options:["1 - Strongly Disagree","2","3","4","5 - Strongly Agree"] },
];
const yqsQuestions: Question[] = [
  { id:"yqs_ab_1", section:"yqs", text:"I worry a great deal that the people I love will find someone else and leave me.", options:["1 - Completely Untrue","2","3","4","5","6 - Perfectly Describes Me"] },
  { id:"yqs_ab_2", section:"yqs", text:"People I've been close to have ended up leaving me alone.", options:["1 - Completely Untrue","2","3","4","5","6 - Perfectly Describes Me"] },
  { id:"yqs_ab_3", section:"yqs", text:"I cling to people because I'm afraid they'll leave me.", options:["1 - Completely Untrue","2","3","4","5","6 - Perfectly Describes Me"] },
  { id:"yqs_mi_1", section:"yqs", text:"I feel that I can't let my guard down around others, or they will intentionally hurt me.", options:["1 - Completely Untrue","2","3","4","5","6 - Perfectly Describes Me"] },
  { id:"yqs_mi_2", section:"yqs", text:"I feel that people will take advantage of me if I let them get too close.", options:["1 - Completely Untrue","2","3","4","5","6 - Perfectly Describes Me"] },
  { id:"yqs_mi_3", section:"yqs", text:"I believe that most people are fundamentally dishonest or out for themselves.", options:["1 - Completely Untrue","2","3","4","5","6 - Perfectly Describes Me"] },
  { id:"yqs_ed_1", section:"yqs", text:"I don't feel that people really understand or are attuned to my emotional needs.", options:["1 - Completely Untrue","2","3","4","5","6 - Perfectly Describes Me"] },
  { id:"yqs_ed_2", section:"yqs", text:"I rarely feel that the people I'm close to give me enough warmth or guidance.", options:["1 - Completely Untrue","2","3","4","5","6 - Perfectly Describes Me"] },
  { id:"yqs_ed_3", section:"yqs", text:"I have spent most of my life without someone who genuinely wanted to be there for me.", options:["1 - Completely Untrue","2","3","4","5","6 - Perfectly Describes Me"] },
  { id:"yqs_de_1", section:"yqs", text:"No one could love me if they really knew me.", options:["1 - Completely Untrue","2","3","4","5","6 - Perfectly Describes Me"] },
  { id:"yqs_de_2", section:"yqs", text:"I feel fundamentally flawed and defective — like I don't deserve love.", options:["1 - Completely Untrue","2","3","4","5","6 - Perfectly Describes Me"] },
  { id:"yqs_de_3", section:"yqs", text:"I hide the real me from others because I am ashamed of who I am.", options:["1 - Completely Untrue","2","3","4","5","6 - Perfectly Describes Me"] },
  { id:"yqs_fa_1", section:"yqs", text:"I feel that I am less talented or successful than most people around me.", options:["1 - Completely Untrue","2","3","4","5","6 - Perfectly Describes Me"] },
  { id:"yqs_fa_2", section:"yqs", text:"I feel that I am not as capable as others when it comes to career or finances.", options:["1 - Completely Untrue","2","3","4","5","6 - Perfectly Describes Me"] },
  { id:"yqs_fa_3", section:"yqs", text:"Most people my age are more successful in life than I am.", options:["1 - Completely Untrue","2","3","4","5","6 - Perfectly Describes Me"] },
  { id:"yqs_su_1", section:"yqs", text:"I feel I have no real choice but to give in to others' wishes or they'll reject me.", options:["1 - Completely Untrue","2","3","4","5","6 - Perfectly Describes Me"] },
  { id:"yqs_su_2", section:"yqs", text:"I put others' needs before my own to keep them from getting angry with me.", options:["1 - Completely Untrue","2","3","4","5","6 - Perfectly Describes Me"] },
  { id:"yqs_su_3", section:"yqs", text:"I have always let others make the important choices for me.", options:["1 - Completely Untrue","2","3","4","5","6 - Perfectly Describes Me"] },
];
const crqQuestions: Question[] = [
  { id:"crq_1", section:"crq", text:"I want the people close to me to deeply understand my feelings.", options:["1 - Strongly Disagree","2","3","4","5 - Strongly Agree"] },
  { id:"crq_2", section:"crq", text:"I deeply want to feel emotionally connected and accepted by the people I love.", options:["1 - Strongly Disagree","2","3","4","5 - Strongly Agree"] },
  { id:"crq_3", section:"crq", text:"When I share something personal, I expect to be criticized or dismissed.", options:["1 - Strongly Disagree","2","3","4","5 - Strongly Agree"] },
  { id:"crq_4", section:"crq", text:"I often expect that if I ask for what I need, I will be rejected.", options:["1 - Strongly Disagree","2","3","4","5 - Strongly Agree"] },
  { id:"crq_5", section:"crq", text:"I expect that people close to me will try to control or dominate my choices.", options:["1 - Strongly Disagree","2","3","4","5 - Strongly Agree"] },
  { id:"crq_6", section:"crq", text:"People I get close to tend to take over and leave little room for my needs.", options:["1 - Strongly Disagree","2","3","4","5 - Strongly Agree"] },
  { id:"crq_7", section:"crq", text:"When a relationship becomes emotionally intense, I tend to pull back to protect myself.", options:["1 - Strongly Disagree","2","3","4","5 - Strongly Agree"] },
  { id:"crq_8", section:"crq", text:"I often emotionally exit before a person can get close enough to hurt me.", options:["1 - Strongly Disagree","2","3","4","5 - Strongly Agree"] },
];
const mdsQuestions: Question[] = [
  { id:"mds_1", section:"mds", text:"I spend large amounts of time daydreaming or lost in fantasy.", options:["1 - Almost Never","2","3","4","5 - Very Often"] },
  { id:"mds_2", section:"mds", text:"My daydreams are so absorbing it's hard to stop them even when I want to.", options:["1 - Almost Never","2","3","4","5 - Very Often"] },
  { id:"mds_3", section:"mds", text:"My fantasy life interferes with my real-world relationships.", options:["1 - Almost Never","2","3","4","5 - Very Often"] },
  { id:"mds_4", section:"mds", text:"I use daydreaming to escape from painful feelings.", options:["1 - Almost Never","2","3","4","5 - Very Often"] },
  { id:"mds_5", section:"mds", text:"I feel distress when I am unable to daydream.", options:["1 - Almost Never","2","3","4","5 - Very Often"] },
  { id:"mds_6", section:"mds", text:"My inner fantasy world feels more satisfying than real-life relationships.", options:["1 - Almost Never","2","3","4","5 - Very Often"] },
];
const parentingQuestions: Question[] = [
  { id:"par_auth_1", section:"parenting", text:"I explain to my child the reasons behind the rules I set.", options:["1 - Never","2","3","4","5 - Always"] },
  { id:"par_auth_2", section:"parenting", text:"I encourage my child to express their feelings and opinions freely.", options:["1 - Never","2","3","4","5 - Always"] },
  { id:"par_auth_3", section:"parenting", text:"I set clear expectations but remain open to discussion.", options:["1 - Never","2","3","4","5 - Always"] },
  { id:"par_arit_1", section:"parenting", text:"I expect my child to obey my rules without needing an explanation.", options:["1 - Never","2","3","4","5 - Always"] },
  { id:"par_arit_2", section:"parenting", text:"I use strict consequences when my child misbehaves.", options:["1 - Never","2","3","4","5 - Always"] },
  { id:"par_arit_3", section:"parenting", text:"I make important decisions in my child's life without asking for their input.", options:["1 - Never","2","3","4","5 - Always"] },
  { id:"par_perm_1", section:"parenting", text:"I give in to my child when they push back on my decisions.", options:["1 - Never","2","3","4","5 - Always"] },
  { id:"par_perm_2", section:"parenting", text:"I find it difficult to enforce rules and follow through on consequences.", options:["1 - Never","2","3","4","5 - Always"] },
  { id:"par_perm_3", section:"parenting", text:"My child has more say in household decisions than is probably healthy.", options:["1 - Never","2","3","4","5 - Always"] },
];

const legacyBanks: Record<string, { id: number | string, text: string, options: string[], section?: string }[]> = {
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
  "attraction-patterns": Array.from({length: 24}, (_, i) => ({ id: String(i + 1), text: "Rate this statement.", options: ["Not at all me", "Slightly me", "Neutral", "Very me", "OMG this is so me"] })),
  "who-finds-me-attractive": Array.from({length: 24}, (_, i) => ({ id: String(i + 1), text: "Rate this statement.", options: ["Not at all me", "Slightly me", "Neutral", "Very me", "OMG this is so me"] })),
  "default": [
    { id: "1", text: "How often do they text you first?", options: ["Every day", "Usually", "Rarely", "Never"] }
  ]
};

// Phase mapping
const PHASE_LABELS: Record<string, string> = {
  demographics: "Profile Setup", ecr: "Attachment Style", rosenberg: "Self-Esteem", ders: "Emotion Regulation",
  lovestyle: "Love Styles", yqs: "Deep Patterns", crq: "Relationship Blueprint", mds: "Inner World", parenting: "Parenting Style",
};

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function QuizWidget({ quizName }: { quizName: string }) {
  const [currentIndex, setCurrentIndex]   = useState(0);
  const [answers, setAnswers]             = useState<Record<string, string>>({});
  const [showResult, setShowResult]       = useState(false);
  const [resultData, setResultData]       = useState<any>(null);
  const [loading, setLoading]             = useState(false);

  const isDarkTheme = ["partners-attachment-style","is-he-manipulative"].includes(quizName);

  const activeQuestions = useMemo((): (Question | {id: string | number, text: string, options: string[], section?: string})[] => {
    if (quizName === "attachment-style") {
      const hasKids = answers["demo_2"] === "Yes";
      return [
        ...demographicQuestions, ...ecrQuestions, ...rosenbergQuestions, ...dersQuestions,
        ...loveStyleQuestions, ...yqsQuestions, ...crqQuestions, ...mdsQuestions,
        ...(hasKids ? parentingQuestions : []),
      ];
    }
    return legacyBanks[quizName] || legacyBanks["default"];
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quizName, answers["demo_2"]]);

  const isFinished = currentIndex >= activeQuestions.length;
  const progress   = Math.round((currentIndex / activeQuestions.length) * 100);

  const tBg          = isDarkTheme ? "bg-[#fdffff]"                  : "bg-white";
  const tH3          = isDarkTheme ? "text-[#280000]"                : "text-[#334B63]";
  const tP           = isDarkTheme ? "text-[#570000]"                : "text-[#5E6E79]";
  const tBorder      = isDarkTheme ? "border-[#de7c5a]/40"           : "border-[#dee2ff]";
  const tAccentBg    = isDarkTheme ? "bg-[#b10f2e]"                  : "bg-[#006ba6]";
  const tAccentHover = isDarkTheme ? "hover:bg-[#8a0b23]"            : "hover:bg-[#0496ff]";
  const tAccentLight = isDarkTheme ? "bg-[#b10f2e]/10"               : "bg-[#0496ff]/5";
  const tShadow      = isDarkTheme ? "shadow-[0_0_20px_rgba(177,15,46,0.3)]" : "shadow-[0_0_20px_rgba(4,150,255,0.3)]";

  const handleOptionClick = (option: string) => {
    const q = activeQuestions[currentIndex];
    setAnswers(prev => ({ ...prev, [q.id]: option }));
    setCurrentIndex(prev => prev + 1);
  };

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      let res;
      if (quizName === "attachment-style" || quizName === "who-finds-me-attractive" || quizName === "attraction-patterns") {
        res = computeMasterProfile(answers, quizName);
      } else {
        res = computeLegacyResult(answers, quizName);
      }
      setResultData(res);
      setShowResult(true);
      setLoading(false);
    }, 1500);
  };

  // ─── RESULT RENDER ──────────────────────────────────────────────────────────
  if (showResult && resultData) {
    const isSecure = resultData.primaryStyle === "Secure";
    const ctaHook = isSecure ? "You have a solid foundation. Uncover your hidden blind spots before you fall for the wrong person." : "Your profile reveals active dysregulation. Until you break this pattern, you will keep choosing partners who trigger your deepest fears.";

    return (
      <div className={`rounded-2xl ${tBg} text-left w-full mx-auto animate-in fade-in duration-500`}>
        <span className="text-sm font-bold uppercase tracking-widest text-[#d81159] mb-3 block text-center">
          Clinical Assessment
        </span>
        <h3 className={`text-[28px] md:text-[34px] font-extrabold ${tH3} mb-10 leading-tight text-center`}>
          {resultData.title}
        </h3>
        
        {/* DASHBOARDS */}
        {quizName === "attachment-style" ? (
          <>
            <AttachmentQuadrant dialData={resultData.dialData} isDarkTheme={isDarkTheme} />
            <div className="mb-12">
              <h4 className={`text-center text-sm font-bold ${isDarkTheme ? "text-[#8f2d56]" : "text-[#006ba6]"} tracking-widest mb-6 uppercase`}>
                Core Psychological Engine
              </h4>
              <DashboardGrid healthScore={resultData.seScore} subject="Self-Esteem" gaugeScore={resultData.dersScore} gaugeLabel="Emotion Dysregulation" />
            </div>
          </>
        ) : quizName === "who-finds-me-attractive" || quizName === "attraction-patterns" ? (
          <MultiGaugeGrid 
            dialData={resultData.dialData} 
            percentagesData={resultData.percentagesData} 
            title={quizName === "who-finds-me-attractive" ? "Who is drawn to your energy" : "Your Complete Attraction Profile"}
            subLabelStr={quizName === "who-finds-me-attractive" ? "Magnet" : "Pull"}
          />
        ) : (
          <DashboardGrid healthScore={resultData.healthScore} gaugeScore={resultData.gaugeScore} gaugeLabel={resultData.gaugeLabel} subject="Subject" />
        )}

        {/* REPORTS */}
        <div className={`space-y-6 px-2 md:px-6 ${tP}`}>
          <ReportSection title={`Dominant Profile: ${resultData.primaryStyle}`} content={resultData.description} isDarkTheme={isDarkTheme}>
             {resultData.behaviors && <p className="text-lg leading-relaxed whitespace-pre-wrap font-medium mt-4">{resultData.behaviors}</p>}
          </ReportSection>
        </div>
        
        {/* URGENT CTA BLOCK */}
        <div className="mt-12 pt-10 border-t-2 border-dashed border-gray-200 px-2 md:px-6">
          <div className="bg-red-50 p-6 md:p-8 rounded-2xl border-2 border-red-500 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-red-200 rounded-full blur-2xl opacity-50 animate-pulse pointer-events-none" />
            <h4 className="font-extrabold text-red-700 text-[22px] mb-3 flex items-center gap-2">
              <span className="text-2xl animate-bounce">🚨</span> Your Critical Next Step
            </h4>
            <p className="text-red-900/80 text-lg leading-relaxed mb-8 font-medium">{ctaHook}</p>
            <div className="space-y-4 relative z-10">
               <Link href="/chat-analyzer" className="block w-full text-center bg-[#d81159] text-white font-extrabold py-5 rounded-xl shadow-[0_0_15px_rgba(216,17,89,0.4)] hover:-translate-y-1 hover:bg-[#b00e49] transition-all duration-300 border-b-4 border-[#8f2d56] active:border-b-0 active:translate-y-1">
                 Analyze Their Texts: AI Chat Analyzer →
               </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ─── COMPLETION SCREEN ────────────────────────────────────────────────────
  if (isFinished) {
    const sectionCount = quizName === "attachment-style" ? (answers["demo_2"] === "Yes" ? 8 : 7) : 1;
    return (
      <div className={`w-full mx-auto text-center py-10 animate-in fade-in zoom-in duration-300 ${tP}`}>
        <div className={`w-20 h-20 mx-auto ${tAccentLight} rounded-full flex items-center justify-center mb-6 shadow-inner border-2 ${tBorder}`}>
          <span className="text-3xl">🧠</span>
        </div>
        <h3 className={`text-3xl font-extrabold ${tH3} mb-4`}>Assessment Complete</h3>
        <p className="text-lg mb-10 max-w-md mx-auto font-medium">
          We have fully analyzed your {sectionCount}-part psychological profile.
        </p>
        <button onClick={handleSubmit} disabled={loading} className={`w-full max-w-sm mx-auto block ${tAccentBg} text-white font-bold py-4 rounded-xl ${tShadow} transform hover:-translate-y-1 ${tAccentHover} transition-all duration-300`}>
          {loading ? "Computing Profile..." : "Reveal My Profile"}
        </button>
      </div>
    );
  }

  // ─── QUESTION SCREEN ─────────────────────────────────────────────────────
  const q = activeQuestions[currentIndex];
  const qId = 'id' in q ? String(q.id) : String(currentIndex);
  const qText = 'text' in q ? q.text : '';
  const qOptions = 'options' in q ? q.options : [];
  const qSection = 'section' in q ? (q as Question).section : 'Assessment';

  return (
    <div className="w-full mx-auto animate-in slide-in-from-right-4 duration-300">
      <div className="mb-8">
        <div className={`flex justify-between items-center text-sm font-bold uppercase tracking-wider mb-3 ${isDarkTheme ? "text-[#b10f2e]" : "text-[#006ba6]"}`}>
          <span>{PHASE_LABELS[qSection] ?? qSection}</span>
          <span>{progress}% Completed</span>
        </div>
        <div className={`w-full ${tAccentLight} rounded-full h-2.5 border ${tBorder} overflow-hidden`}>
          <div className={`${tAccentBg} h-full rounded-full transition-all duration-500 ease-out shadow-sm`} style={{ width: `${progress}%` }} />
        </div>
      </div>

      <h3 className={`text-2xl md:text-3xl font-extrabold ${tH3} mb-8 leading-snug text-center min-h-[100px] flex items-center justify-center`}>
        {qText}
      </h3>

      <div className="space-y-4">
        {qOptions.map((option, idx) => (
          <button
            key={idx}
            onClick={() => handleOptionClick(option)}
            className={`w-full text-center p-5 rounded-2xl border-2 ${tBorder} hover:border-[#006ba6] hover:bg-[#0496ff]/5 transition-all duration-200 ${tP} font-bold text-lg hover:shadow-md hover:-translate-y-0.5 focus:outline-none`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

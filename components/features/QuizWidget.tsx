"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import SharePrintButtons from "@/components/ui/SharePrintButtons";
import { generatePsychologicalProfile, computeLegacyResult } from "@/lib/psychometrics/classification";
import AttachmentReport from "@/components/report/AttachmentReport";

import { attachmentQuestions } from "@/lib/psychometrics/attachment/questions";
import { attractionQuestions } from "@/lib/psychometrics/attraction/questions";
import { attractorQuestions } from "@/lib/psychometrics/attractor/questions";
import { partnerAttachmentQuestions } from "@/lib/psychometrics/partner-attachment/questions";
import { infidelityQuestions } from "@/lib/psychometrics/infidelity/questions";
import { friendRoleQuestions } from "@/lib/psychometrics/friend-role/questions";
import { friendUsedQuestions } from "@/lib/psychometrics/friend-used/questions";

import AttractionFreeResult from "@/app/attraction-patterns/_components/AttractionFreeResult";
import InfidelityFreeResult from "@/app/is-he-cheating/_components/InfidelityFreeResult";
import PremiumDossier from "@/components/report/premium/PremiumDossier";
import { buildAttractionDossier } from "@/lib/report/quizzes/attraction";
import { buildAttractorDossier } from "@/lib/report/quizzes/attractor";
import { buildPartnerAttachmentDossier } from "@/lib/report/quizzes/partnerAttachment";
import { buildFriendUsedDossier } from "@/lib/report/quizzes/friendUsed";
import FriendRoleMasterReport from "@/components/report/FriendRoleMasterReport";

import { generateAttractionProfile } from "@/lib/psychometrics/attraction/scoring";
import { generateAttractorProfile } from "@/lib/psychometrics/attractor/scoring";
import { generatePartnerAttachmentProfile } from "@/lib/psychometrics/partner-attachment/scoring";
import { generateInfidelityProfile } from "@/lib/psychometrics/infidelity/scoring";
import { generateFriendRoleProfile } from "@/lib/psychometrics/friend-role/scoring";
import { generateFriendUsedProfile } from "@/lib/psychometrics/friend-used/scoring";

import { Lock, Mail, ArrowRight, CheckCircle2 } from "lucide-react";
import { usePremiumAccess } from "@/lib/usePremiumAccess";
import { saveQuizResult, loadQuizResult } from "@/lib/quizResults";
import { trackEmailSubmit, trackResultView } from "@/lib/track";
import EmailResultOffer from "@/components/features/EmailResultOffer";
import ProgramOffer from "@/components/program/ProgramOffer";
import { GameQuestion, GameLoading } from "@/components/quiz/GameQuiz";
import { sticker, stickerStatic, display } from "@/lib/ui/sticker";

/** Each long test's name and runner emoji, for the game screen. */
const GAME_META: Record<string, { name: string; emoji: string }> = {
  "attachment-style": { name: "Attachment style", emoji: "🧸" },
  "attraction-patterns": { name: "Attraction patterns", emoji: "🧲" },
  "who-is-attracted-to-me": { name: "Who you attract", emoji: "💘" },
  "what-kind-of-person-do-i-attract": { name: "Who you attract", emoji: "💘" },
  "partners-attachment-style": { name: "His attachment style", emoji: "💭" },
  "is-he-cheating": { name: "Is he cheating?", emoji: "🔎" },
  "friend-group-role": { name: "Your friend group role", emoji: "👯" },
  "are-your-friends-using-you": { name: "Are they using you?", emoji: "🎣" },
};

/** Maps the infidelity scoring output into the shape InfidelityFreeResult expects */
function toFreeResultData(profile: ReturnType<typeof generateInfidelityProfile>, email: string) {
  const s = profile.normalizedScores;
  const score = profile.suspicionIndex;
  const riskLevel: "SEVERE" | "ELEVATED" | "MODERATE" =
    score >= 75 ? "SEVERE" : score >= 50 ? "ELEVATED" : "MODERATE";
  return {
    score,
    riskLevel,
    email,
    vectors: {
      digital:       s.Digital       ?? score,
      chronological: s.Schedule      ?? score,
      intimacy:      s.Emotion       ?? score,
      micro:         s.Defensive     ?? score,
    },
  };
}

/**
 * Quiz slug → localStorage key. A quiz missing from this table simply does
 * not persist, which is the old behaviour rather than a broken one.
 */
const STORAGE_KEYS: Record<string, string> = {
  "attraction-patterns": "oc_attraction_result",
  "who-is-attracted-to-me": "oc_attractor_result",
  "what-kind-of-person-do-i-attract": "oc_attracted_type_result",
  "partners-attachment-style": "oc_partner_attachment_result",
  "friend-group-role": "friend_role_result",
  "are-your-friends-using-you": "oc_friend_used_result",
};

export default function QuizWidget({ quizName }: { quizName: string }) {
  const router = useRouter();

  const [currentIndex, setCurrentIndex]     = useState(0);
  const [answers, setAnswers]               = useState<Record<string, string>>({});
  
  const [isScoring, setIsScoring]           = useState(false);
  const [showEmailGate, setShowEmailGate]   = useState(false);
  const [showResult, setShowResult]         = useState(false);
  const { granted: isPremiumUnlocked } = usePremiumAccess();
  const [isGenerating, setIsGenerating]     = useState(false);
  const [resultData, setResultData]         = useState<any>(null);
  
  const [email, setEmail]                   = useState("");
  const [agreed, setAgreed]                 = useState(false);
  const [isSubmitting, setIsSubmitting]     = useState(false);
  const [savingEmail, setSavingEmail]       = useState(false);
  const [emailSaved, setEmailSaved]         = useState(false);
  
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnimating, setIsAnimating]       = useState(false);
  const [slideDirection, setSlideDirection] = useState<"forward" | "backward">("forward");

  const topRef = useRef<HTMLDivElement>(null);

  // Where this quiz's result is parked so it survives the Stripe redirect.
  // The matching /premium route reads the same key.
  const storageKey = STORAGE_KEYS[quizName];

  useEffect(() => {
    if (!storageKey) return;
    const saved = loadQuizResult(storageKey);
    if (saved) {
      setResultData(saved);
      setShowResult(true);
    }
  }, [storageKey]);
  const pathname = usePathname();
  const isAttachment = quizName === "attachment-style";
  const isInfidelity = quizName === "is-he-cheating";
  
  const activeQuestions = useMemo(() => {
    if (isAttachment) return attachmentQuestions; 
    if (quizName === "attraction-patterns") return attractionQuestions;
    if (quizName === "who-is-attracted-to-me" || quizName === "what-kind-of-person-do-i-attract") return attractorQuestions;
    if (quizName === "partners-attachment-style") return partnerAttachmentQuestions;
    if (quizName === "is-he-cheating") return infidelityQuestions;
    if (quizName === "friend-group-role") return friendRoleQuestions;
    if (quizName === "are-your-friends-using-you") return friendUsedQuestions;
    return [{ id: "1", text: "Default Question", options: ["A", "B", "C", "D"], category: "General" }];
  }, [quizName, isAttachment]);

  const isFinished = currentIndex >= activeQuestions.length;
  const progress   = Math.round((currentIndex / activeQuestions.length) * 100);

  const handleOptionClick = (option: string) => {
    if (isAnimating || selectedAnswer !== null) return; 
    setSelectedAnswer(option);
    const q = activeQuestions[currentIndex] as any;
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
    activeQuestions.forEach((q: any) => {
      if (!fakeAnswers[q.id]) fakeAnswers[q.id] = q.options[Math.floor(Math.random() * q.options.length)];
    });
    if (isAttachment) {
      fakeAnswers['demo_1'] = 'Single'; fakeAnswers['demo_2'] = 'No'; fakeAnswers['demo_3'] = 'Woman';
    }
    setAnswers(fakeAnswers);
    setCurrentIndex(activeQuestions.length);
  };

  const handleBack = () => {
    if (currentIndex > 0 && !isAnimating) {
      setIsAnimating(true);
      setSlideDirection("backward");
      setTimeout(() => {setCurrentIndex(prev => prev - 1); setSelectedAnswer(null); setIsAnimating(false);}, 250);
    }
  };

  const handleCompile = () => {
    setIsScoring(true);
    if (topRef.current) topRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    setTimeout(() => {
      setIsScoring(false);
      revealResult();
    }, 1200);
  };

  /** Infidelity-specific unlock: save to localStorage then navigate to /premium page */
  const handleInfidelityUnlock = async () => {
    setIsGenerating(true);
    const freeData = toFreeResultData(resultData.profile, email);
    if (typeof window !== "undefined") {
      localStorage.setItem("infidelity_result", JSON.stringify(freeData));
    }
    try {
      await fetch("/api/leads/unlock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, quizType: "infidelity" }),
      });
    } catch (_) {}
    router.push("/is-he-cheating/premium");
  };

  /**
   * Score the answers and show the result. Email is NOT required.
   *
   * Search Console shows 23% of the queries reaching this site contain
   * "free", and several spell out "no email" / "no sign up", people are
   * explicitly looking for a test that does not demand an address, and
   * this quiz was the one with a wall. The gate collected 4 addresses in
   * five months, so it was protecting nothing and costing the exact
   * audience Google was already sending.
   *
   * The email ask now comes AFTER the result, where it is an offer
   * rather than a toll.
   */
  const revealResult = async (capturedEmail?: string) => {
    setIsSubmitting(true);

    // rawAnswers travels with every result. The paid report quotes the
    // buyer's own statements back to her, and it cannot do that from a
    // score, which is precisely why the reports read like leaflets while
    // these branches were throwing the answers away.
    let tempResultData: any = null;

    try {
      if (isAttachment) {
        const hasChildren = answers["demo_2"] === "Yes";
        const isSingle = answers["demo_1"] === "Single" || answers["demo_1"] === "It's complicated";
        const gender = answers["demo_3"] ?? "Non-binary";
        const profile = generatePsychologicalProfile(answers, hasChildren);
        tempResultData = { profile, demographics: { isSingle, gender, hasChildren }, rawAnswers: answers, type: "attachment", email };
      } else if (quizName === "attraction-patterns") {
        tempResultData = { profile: generateAttractionProfile(answers), rawAnswers: answers, type: "attraction" };
      } else if (quizName === "who-is-attracted-to-me" || quizName === "what-kind-of-person-do-i-attract") {
        tempResultData = { profile: generateAttractorProfile(answers), rawAnswers: answers, type: "attractor" };
      } else if (quizName === "partners-attachment-style") {
        tempResultData = { profile: generatePartnerAttachmentProfile(answers), rawAnswers: answers, type: "partner" };
      } else if (quizName === "is-he-cheating") {
        tempResultData = { profile: generateInfidelityProfile(answers), rawAnswers: answers, type: "infidelity", email };
      } else if (quizName === "friend-group-role") {
        tempResultData = { profile: generateFriendRoleProfile(answers), rawAnswers: answers, type: "friendrole" };
      } else if (quizName === "are-your-friends-using-you") {
        tempResultData = { profile: generateFriendUsedProfile(answers), rawAnswers: answers, type: "friendused" };
      } else {
        tempResultData = { ...computeLegacyResult(answers, quizName), rawAnswers: answers, type: "legacy" };
      }
      if (storageKey && tempResultData) saveQuizResult(storageKey, tempResultData);
      setResultData(tempResultData);
    } catch (err) {
      console.error(err);
      setResultData({ type: "error" });
    }

    // Only record a lead when an address was actually volunteered.
    if (capturedEmail) {
      try {
        await fetch('/api/leads', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: capturedEmail,
            quizType: quizName,
            rawAnswers: answers,
            profile: tempResultData?.profile || null
          })
        });
      } catch(err) {
        console.error("Failed to save to database:", err);
      }
    }

    setShowEmailGate(false);
    setShowResult(true);
    setIsSubmitting(false);
    trackResultView(quizName, tempResultData?.type ?? "unknown");
    if (topRef.current) topRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  /** The optional email form under the result. */
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !agreed) return;
    setSavingEmail(true);
    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          quizType: quizName,
          rawAnswers: answers,
          profile: resultData?.profile || null
        })
      });
      trackEmailSubmit(quizName);
      setEmailSaved(true);
    } catch (err) {
      console.error("Failed to save to database:", err);
      setEmailSaved(true); // never block the reader on our database
    } finally {
      setSavingEmail(false);
    }
  };

  if (isScoring) {
    return (
      <div ref={topRef} className="w-full">
        <GameLoading emoji={(GAME_META[quizName] ?? { emoji: "✨" }).emoji} />
      </div>
    );
  }

  // The old blocking email gate lived here. It is gone: the result is
  // shown first and the address is asked for underneath it.

  /** The optional email capture, rendered beneath whatever result shows. */
  const emailOffer = (
    <EmailResultOffer
      className="px-6 pb-16"
      onSubmit={handleEmailSubmit}
      email={email}
      setEmail={setEmail}
      agreed={agreed}
      setAgreed={setAgreed}
      saving={savingEmail}
      saved={emailSaved}
    />
  );

  /**
   * The free week 1 of whichever programme works on this quiz's problem.
   * Renders nothing until that programme is live, so quizzes pick it up
   * as each one opens. The attachment report places its own, because only
   * the anxious and fearful results should see it. Keyed on the page
   * path, because the legacy quizzes pass a title rather than a slug.
   */
  const programOffer = <ProgramOffer quizPath={pathname ?? ""} className="!pt-0" />;

  if (showResult && resultData) {
    if (resultData.type === "error") return <div className="text-center py-20 font-black text-[#dd1c1a]">Analysis Failed. Please refresh.</div>;
    
    if (resultData.type === "attachment") return <div ref={topRef} className="w-full animate-in fade-in duration-500"><AttachmentReport profile={resultData.profile} demographics={resultData.demographics} rawAnswers={resultData.rawAnswers} email={resultData.email} />{emailOffer}</div>;
    
    if (resultData.type === "attraction") {
      if (!isPremiumUnlocked) {
        return (
          <div ref={topRef} className="w-full animate-in fade-in">
            <AttractionFreeResult
              profile={resultData.profile}
              onUnlock={() => { window.location.href = "#unlock-offer"; }}
              isGenerating={isScoring}
            />
            {programOffer}
            {emailOffer}
          </div>
        );
      }
      return (
        <div ref={topRef} className="w-full animate-in fade-in">
          <PremiumDossier dossier={buildAttractionDossier(resultData.profile)} />
          {programOffer}
          {emailOffer}
        </div>
      );
    }

    // INFIDELITY: show free teaser result with paywall, unlock redirects to /is-he-cheating/premium
    if (resultData.type === "infidelity") {
      const freeData = toFreeResultData(resultData.profile, resultData.email ?? email);
      return (
        <div ref={topRef} className="w-full animate-in fade-in">
          <InfidelityFreeResult
            data={freeData}
            onUnlock={handleInfidelityUnlock}
            isGenerating={isGenerating}
          />
          {programOffer}
        </div>
      );
    }

    if (resultData.type === "attractor") return <div ref={topRef} className="w-full animate-in fade-in"><PremiumDossier dossier={buildAttractorDossier(resultData.profile)} />{programOffer}{emailOffer}</div>;
    if (resultData.type === "partner") return <div ref={topRef} className="w-full animate-in fade-in"><PremiumDossier dossier={buildPartnerAttachmentDossier(resultData.profile)} />{programOffer}{emailOffer}</div>;
    if (resultData.type === "friendrole") return <div ref={topRef} className="w-full animate-in fade-in"><FriendRoleMasterReport profile={resultData.profile} />{programOffer}{emailOffer}</div>;
    if (resultData.type === "friendused") return <div ref={topRef} className="w-full animate-in fade-in"><PremiumDossier dossier={buildFriendUsedDossier(resultData.profile)} />{programOffer}{emailOffer}</div>;
    return <><div ref={topRef} className="w-full max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-[#d6d2d2] p-8 md:p-12 text-center"><h3 className="text-3xl font-black text-[#086788] mb-8">{resultData.title || "Result"}</h3><SharePrintButtons /></div>{programOffer}</>;
  }

  if (isFinished) {
    const meta = GAME_META[quizName] ?? { name: "The test", emoji: "✨" };
    return (
      <div ref={topRef} className="w-full max-w-xl mx-auto px-1">
        <div className={`oc-pop relative overflow-hidden rounded-[28px] bg-gradient-to-br from-[#FF4FA3] via-[#FF6F7D] to-[#FF9A4D] text-white p-8 text-center ${stickerStatic}`}>
          <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-around">
            {["🏆", "✨", meta.emoji, "🎉", "🏆"].map((e, k) => (
              <span key={k} className="oc-burst text-2xl" style={{ animationDelay: `${k * 110}ms` }}>{e}</span>
            ))}
          </div>
          <div className="text-6xl mb-3" aria-hidden="true">🏆</div>
          <p className="text-[12px] font-black uppercase tracking-[0.2em] text-white/85 mb-2">All levels complete</p>
          <h3 className="text-[38px] leading-none mb-3" style={display}>You did it!</h3>
          <p className="text-[16px] font-bold text-white/95 mb-6">Every answer is in. Your result is one tap away.</p>
          <button onClick={handleCompile} className={`w-full min-h-[60px] rounded-2xl bg-[#1A1033] text-white font-black text-lg flex items-center justify-center gap-2 ${sticker} !border-white !shadow-[4px_4px_0_#ffffff]`}>
            Reveal my result <ArrowRight className="w-5 h-5" />
          </button>
        </div>
        <button onClick={handleBack} className="mt-5 text-sm font-black text-[#1A1033]/50 hover:text-[#1A1033]">← Change my last answer</button>
      </div>
    );
  }

  const q = activeQuestions[currentIndex] as any;
  const sectionName = q.section || q.moduleKey || q.category;
  const useKeypad = isAttachment && !String(q.id).startsWith("demo");
  const meta = GAME_META[quizName] ?? { name: "The test", emoji: "✨" };

  return (
    <div ref={topRef} className="w-full">
      <GameQuestion
        name={meta.name}
        emoji={meta.emoji}
        index={currentIndex}
        total={activeQuestions.length}
        text={q.text}
        section={sectionName && sectionName !== "General" ? String(sectionName) : undefined}
        options={q.options.map((o: string) => ({ label: o, value: o }))}
        onAnswer={(v) => handleOptionClick(String(v))}
        onBack={handleBack}
        delay={0}
        layout={useKeypad ? "grid" : "list"}
      />
      {/* Fills every answer at random. A testing aid only: in production a
          visitor could tap it and then pay for a report on random data. */}
      {process.env.NODE_ENV !== "production" && (
        <button onClick={handleGodMode} type="button" className="mt-2 min-h-[48px] text-xs font-bold px-4 text-[#1A1033]/40 hover:text-[#1A1033]">⚡ Skip</button>
      )}
    </div>
  );
}

"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Check, X } from "lucide-react";
import { knowQuizFor, decodeKnow, verdictFor, themPrompt, type KnowQuiz } from "@/lib/knowme/knowme";
import { clean } from "@/lib/survey/surveys";
import { trackQuizStart, trackQuizComplete, trackResultView, trackShare } from "@/lib/track";
import CopyButton from "@/components/share/CopyButton";
import MoreQuickTests from "@/components/tick/MoreQuickTests";
import { CANDY, sticker, stickerStatic, display } from "@/lib/ui/sticker";

interface Data {
  quiz: KnowQuiz;
  name: string;
  code: string;
  answers: number[] | null;
  /** Present when this is a score being sent back to her. */
  scored: { from: string; score: number } | null;
}

const MAKE_OWN = "flex items-center justify-center text-center px-4 w-full min-h-[58px] rounded-2xl bg-[#FFE68A] text-[#1A1033] font-black text-[17px]";

/**
 * The link she sent. Her friend guesses each answer, sees straight away if
 * it was right, gets a score and is offered their own quiz. The same page
 * shows her a score sent back (…&f=Tom&s=8).
 */
export default function KnowTake() {
  const [data, setData] = useState<Data | null>(null);
  const [picks, setPicks] = useState<number[]>([]);
  const [tapped, setTapped] = useState<number | null>(null);
  const [me, setMe] = useState("");
  const [back, setBack] = useState<string | null>(null);

  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const quiz = knowQuizFor(q.get("k"));
    const code = q.get("a") ?? "";
    const answers = decodeKnow(code, quiz);
    const s = Number(q.get("s"));
    const from = clean(q.get("f"), 24);
    const scored = q.has("s") && Number.isInteger(s) && s >= 0 && s <= quiz.questions.length ? { from: from || "Someone", score: s } : null;
    setData({ quiz, name: clean(q.get("n"), 24) || "your friend", code, answers, scored });
    if (scored && answers) trackResultView(`knowme-${quiz.mode}-score`, String(s));
  }, []);

  if (!data) return <div className="min-h-[70vh]" />;
  const { quiz, name, code, answers, scored } = data;
  const total = quiz.questions.length;

  const shell = (children: React.ReactNode) => (
    <div className="bg-[#FFF4FA] min-h-screen overflow-x-hidden">
      <div className="max-w-md mx-auto px-4 py-6 md:py-10 text-[#1A1033]">{children}</div>
    </div>
  );

  if (!answers) {
    return shell(
      <div className="text-center py-10">
        <p className="text-2xl mb-4" style={display}>This link looks incomplete 🤔</p>
        <Link href={quiz.page} className={`inline-flex rounded-2xl bg-[#FF4FA3] text-white font-black px-6 py-4 ${sticker}`}>Make your own quiz</Link>
      </div>
    );
  }

  const quizLink = () => `${window.location.origin}/survey/know?${new URLSearchParams({ k: quiz.mode, n: name, a: code }).toString()}`;

  // Her view of a score that was sent back to her.
  if (scored) {
    const v = verdictFor(quiz, scored.score);
    const resend = async () => {
      const url = quizLink();
      try {
        if (navigator.share) {
          await navigator.share({ title: quiz.title, text: "How well do you know me? 👀 Prove it", url });
          trackShare(`knowme-${quiz.mode}-resend`, "native");
          return;
        }
      } catch {
        return;
      }
      await navigator.clipboard?.writeText(url).catch(() => {});
      trackShare(`knowme-${quiz.mode}-resend`, "copy");
    };
    return shell(
      <>
        <div className={`rounded-[28px] p-6 mb-5 text-center ${stickerStatic}`} style={{ backgroundColor: CANDY[0] }}>
          <p className="text-[15px] font-black opacity-70 mb-1">{scored.from} took your quiz</p>
          <p className="text-[64px] leading-none mb-2" style={display}>{scored.score}/{total}</p>
          <p className="text-[24px] leading-tight" style={display}>{v.title}</p>
        </div>
        <button type="button" onClick={resend} className={`w-full min-h-[58px] rounded-2xl bg-[#FF4FA3] text-white font-black text-lg mb-3 ${sticker}`}>
          📤 Send your quiz to more people
        </button>
        <Link href={quiz.page} className={`${MAKE_OWN} ${sticker}`}>{quiz.emoji} Make a new quiz</Link>
        <MoreQuickTests title="While you wait, try a quiz" />
      </>
    );
  }

  const i = picks.length;
  const score = picks.filter((p, k) => p === answers[k]).length;

  const guess = (k: number) => {
    if (tapped !== null) return;
    if (i === 0) trackQuizStart(`knowme-${quiz.mode}`);
    setTapped(k);
    setTimeout(() => {
      const next = [...picks, k];
      setPicks(next);
      setTapped(null);
      if (next.length === total) trackQuizComplete(`knowme-${quiz.mode}`, total);
    }, 950);
  };

  const sendScore = async (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams({ k: quiz.mode, n: name, a: code, s: String(score) });
    const from = clean(me, 24);
    if (from) params.set("f", from);
    const url = `${window.location.origin}/survey/know?${params.toString()}`;
    setBack(url);
    try {
      if (navigator.share) {
        await navigator.share({ title: "My score", text: `I got ${score}/${total} on your quiz 👀`, url });
        trackShare(`knowme-${quiz.mode}-score`, "native");
      }
    } catch {
      // Share sheet closed: the link is on screen to copy.
    }
  };

  // Finished: the score, a look back, then send it and make your own.
  if (i >= total) {
    const v = verdictFor(quiz, score);
    return shell(
      <>
        <div className={`oc-pop rounded-[28px] p-6 mb-5 text-center ${stickerStatic}`} style={{ backgroundColor: CANDY[2] }}>
          <p className="text-[15px] font-black opacity-70 mb-1">How well you know {name}</p>
          <p className="text-[64px] leading-none mb-2" style={display}>{score}/{total}</p>
          <p className="text-[24px] leading-tight mb-1" style={display}>{v.title}</p>
          <p className="text-[15px] font-bold opacity-75">{v.line.split("{n}").join(name)}</p>
        </div>

        {!back ? (
          <form onSubmit={sendScore} className={`rounded-[26px] bg-white p-5 mb-4 ${stickerStatic}`}>
            <p className="text-[20px] mb-3" style={display}>Send {name} your score 💌</p>
            <label htmlFor="me" className="block text-[14px] font-black mb-1">Your name (so {name} knows who scored this)</label>
            <input id="me" value={me} onChange={(e) => setMe(e.target.value)} maxLength={24} className="w-full rounded-2xl border-[2.5px] border-[#1A1033] px-4 py-3 text-[16px] font-bold mb-3 outline-none" />
            <button type="submit" className={`w-full min-h-[56px] rounded-2xl bg-[#FF4FA3] text-white font-black text-lg ${sticker}`}>📤 Send my score</button>
          </form>
        ) : (
          <div className={`rounded-[26px] bg-white p-5 mb-4 ${stickerStatic}`}>
            <p className="text-[14px] font-bold opacity-65 mb-3">If the share sheet didn&apos;t open, copy this and send it to {name}.</p>
            <div className="flex items-center justify-between gap-2 rounded-2xl bg-[#FFF4FA] p-3">
              <p className="text-[12px] font-semibold break-all">{back}</p>
              <CopyButton text={back} />
            </div>
          </div>
        )}

        <Link href={quiz.page} className={`${MAKE_OWN} mb-6 ${sticker}`}>
          {quiz.emoji} Now make your own quiz
        </Link>

        <div className={`rounded-[24px] bg-white p-4 ${stickerStatic}`}>
          <p className="text-[15px] font-black mb-3">Your answers</p>
          <ol className="space-y-2.5">
            {quiz.questions.map((q, k) => {
              const right = picks[k] === answers[k];
              return (
                <li key={q.id} className="text-[14px] leading-snug">
                  <span className="font-black">{themPrompt(q, name)}</span>
                  <span className="block font-semibold opacity-80">
                    {right ? "✅ " : "❌ "}
                    {q.options[answers[k]].emoji} {q.options[answers[k]].label}
                    {!right && <span className="opacity-60"> (you said {q.options[picks[k]].label})</span>}
                  </span>
                </li>
              );
            })}
          </ol>
        </div>
        <MoreQuickTests title="Try a quiz about you" />
      </>
    );
  }

  const q = quiz.questions[i];
  const correct = answers[i];
  return shell(
    <>
      <div className="text-center mb-5">
        <span className="inline-block -rotate-2 rounded-full bg-white px-3 py-1 text-[12px] font-black mb-3 border-2 border-[#1A1033] shadow-[2px_2px_0_#1A1033]">
          {quiz.emoji} {name}&apos;s quiz
        </span>
        <h1 className="text-[30px] md:text-4xl leading-[1.05]" style={display}>How well do you know {name}? 👀</h1>
        {i === 0 && <p className="mt-2 text-[15px] font-bold opacity-70">Ten guesses. {name} picked the real answers.</p>}
      </div>
      <div className="flex items-center justify-between text-[13px] font-black mb-2">
        <span>Score: {score}</span>
        <span>{i + 1}/{total}</span>
      </div>
      <div className="h-3 rounded-full bg-white border-2 border-[#1A1033] overflow-hidden mb-5">
        <div className="h-full bg-gradient-to-r from-[#FF4FA3] to-[#FF9A4D] transition-all duration-300" style={{ width: `${(i / total) * 100}%` }} />
      </div>
      <div key={q.id} className={`oc-pop rounded-[28px] p-5 mb-5 ${stickerStatic}`} style={{ backgroundColor: CANDY[i % CANDY.length] }}>
        <p className="text-[26px] leading-[1.15]" style={display}>{themPrompt(q, name)}</p>
      </div>
      <div className="grid gap-3">
        {q.options.map((opt, k) => {
          const reveal = tapped !== null;
          const isRight = k === correct;
          const colour = !reveal ? "bg-white" : isRight ? "bg-[#B8F2D8]" : k === tapped ? "bg-[#FFB3C7]" : "bg-white opacity-60";
          return (
            <button
              key={opt.label}
              type="button"
              onClick={() => guess(k)}
              disabled={reveal}
              className={`min-h-[58px] rounded-2xl px-4 py-3 text-left flex items-center gap-3 font-black text-[17px] text-[#1A1033] ${colour} ${reveal ? stickerStatic : sticker}`}
            >
              <span className="text-2xl" aria-hidden="true">{opt.emoji}</span>
              <span className="flex-1">{opt.label}</span>
              {reveal && isRight && <Check className="w-5 h-5" strokeWidth={3} aria-label="right answer" />}
              {reveal && k === tapped && !isRight && <X className="w-5 h-5" strokeWidth={3} aria-label="wrong" />}
            </button>
          );
        })}
      </div>
    </>
  );
}

"use client";

import React, { useState } from "react";
import { Share2, Link2, Check, Download } from "lucide-react";
import { trackShare } from "@/lib/track";

/**
 * RESULT SHARE
 *
 * The only distribution a quiz site gets for free is people posting their
 * own result. Three things make that actually happen, and the old Share
 * button had none of them:
 *
 *  1. The shared link must preview as a designed card, not a bare URL.
 *     `/api/og` renders one from the same params.
 *  2. The text must be about THEM, not about us. "I got The Intensity
 *     Chaser" travels; "Check out this quiz" does not.
 *  3. Saving the image has to be one tap, because most sharing on
 *     Instagram and TikTok is a screenshot, not a link.
 *
 * The link points at the QUIZ, not the result — the recipient should land
 * somewhere they can take it themselves. That is the whole loop.
 */
export default function ResultShare({
  quiz,
  quizPath,
  title,
  score,
  scoreLabel,
  className = "",
}: {
  /** Display name, e.g. "Why Do I Pick Bad Guys?" */
  quiz: string;
  /** e.g. "/why-do-i-pick-bad-guys" */
  quizPath: string;
  /** The archetype or verdict — the bit worth posting. */
  title: string;
  score?: number;
  scoreLabel?: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  const origin =
    typeof window !== "undefined" ? window.location.origin : "https://www.oopscupid.com";

  const cardUrl =
    `${origin}/api/og?t=${encodeURIComponent(title)}` +
    `&q=${encodeURIComponent(quiz)}` +
    (typeof score === "number" ? `&s=${score}` : "") +
    (scoreLabel ? `&l=${encodeURIComponent(scoreLabel)}` : "");

  const shareUrl = `${origin}${quizPath}?ref=share`;
  const shareText = `I got "${title}" on the ${quiz}. Curious what you'd get.`;

  const nativeShare = async () => {
    trackShare(quizPath, "native");
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title: quiz, text: shareText, url: shareUrl });
        return;
      } catch {
        // Sheet dismissed — not an error, and not worth a message.
      }
    }
    copyLink();
  };

  const copyLink = async () => {
    trackShare(quizPath, "copy");
    try {
      await navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // Clipboard blocked (insecure origin, or permissions).
    }
  };

  const saveImage = () => {
    trackShare(quizPath, "image");
    window.open(cardUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className={`flex flex-wrap items-center gap-2.5 ${className}`}>
      <button
        onClick={nativeShare}
        className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-sm px-5 py-3 rounded-xl transition-colors"
      >
        <Share2 className="w-4 h-4" /> Share my result
      </button>

      <button
        onClick={saveImage}
        className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-bold text-sm px-4 py-3 rounded-xl transition-colors"
      >
        <Download className="w-4 h-4" /> Save image
      </button>

      <button
        onClick={copyLink}
        aria-live="polite"
        className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-bold text-sm px-4 py-3 rounded-xl transition-colors"
      >
        {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Link2 className="w-4 h-4" />}
        {copied ? "Copied" : "Copy link"}
      </button>
    </div>
  );
}

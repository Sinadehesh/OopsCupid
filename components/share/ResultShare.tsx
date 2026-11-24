"use client";

import React, { useEffect, useState } from "react";
import { Share2, Link2, Check } from "lucide-react";
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
 *  3. Posting has to be one tap, because sharing on Instagram and TikTok
 *     is a picture in a Story, not a link. "Post to my story" hands the
 *     phone's share sheet a ready-made 1080x1920 card of her result
 *     (/api/story), with the quiz's address on it.
 *
 * The link points at the QUIZ, not the result, the recipient should land
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
  /** The archetype or verdict, the bit worth posting. */
  title: string;
  score?: number;
  scoreLabel?: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  const origin =
    typeof window !== "undefined" ? window.location.origin : "https://www.oopscupid.com";

  const storyUrl =
    `${origin}/api/story?p=${encodeURIComponent(quizPath)}&t=${encodeURIComponent(title)}` +
    (typeof score === "number" ? `&s=${score}` : "") +
    (scoreLabel ? `&l=${encodeURIComponent(scoreLabel)}` : "");

  // Safari only opens the share sheet straight from a tap, so the card is
  // fetched as soon as the result shows, ready for that tap.
  const [story, setStory] = useState<File | null>(null);
  useEffect(() => {
    let gone = false;
    fetch(storyUrl)
      .then((r) => (r.ok ? r.blob() : Promise.reject(r.status)))
      .then((b) => {
        if (!gone) setStory(new File([b], "my-oopscupid-result.png", { type: "image/png" }));
      })
      .catch(() => {});
    return () => {
      gone = true;
    };
  }, [storyUrl]);

  const shareUrl = `${origin}${quizPath}?ref=share`;
  const shareText = `I got "${title}" on the ${quiz}. Curious what you'd get.`;

  const nativeShare = async () => {
    trackShare(quizPath, "native");
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title: quiz, text: shareText, url: shareUrl });
        return;
      } catch {
        // Sheet dismissed, not an error, and not worth a message.
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

  const postStory = async () => {
    trackShare(quizPath, "story");
    const nav = navigator as Navigator & { canShare?: (data: ShareData) => boolean };
    if (story && nav.canShare?.({ files: [story] })) {
      try {
        await nav.share({ files: [story] });
      } catch {
        // Share sheet closed.
      }
      return;
    }
    // No file sharing here (most computers): open the card to save it.
    window.open(storyUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className={`flex flex-wrap items-center gap-2.5 ${className}`}>
      <button
        onClick={postStory}
        className="inline-flex items-center gap-2 bg-[#FF4FA3] hover:bg-[#f0409a] text-white font-extrabold text-sm px-5 py-3 rounded-xl border-2 border-[#1A1033] shadow-[3px_3px_0_#1A1033] active:translate-y-[1px] transition-colors"
      >
        📸 Post to my story
      </button>

      <button
        onClick={nativeShare}
        className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-sm px-5 py-3 rounded-xl transition-colors"
      >
        <Share2 className="w-4 h-4" /> Send the link
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

import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { KNOW_QUIZZES, type KnowMode } from "@/lib/knowme/knowme";
import KnowMaker from "./KnowMaker";
import { FaqJsonLd } from "@/components/seo/JsonLd";
import { stickerStatic, display } from "@/lib/ui/sticker";

const baseUrl = "https://www.oopscupid.com";

export function knowMetadata(mode: KnowMode): Metadata {
  const k = KNOW_QUIZZES[mode];
  const url = `${baseUrl}${k.page}`;
  const card = `${baseUrl}/api/og?t=${encodeURIComponent(`${k.title} ${k.emoji}`)}&q=${encodeURIComponent("Make your quiz. Send it. See who really knows you")}`;
  return {
    metadataBase: new URL(baseUrl),
    title: k.seo.title,
    description: k.seo.description,
    alternates: { canonical: url },
    openGraph: { title: `${k.title} ${k.emoji}`, description: k.seo.description, url, type: "website", images: [{ url: card, width: 1200, height: 630, alt: k.title }] },
    twitter: { card: "summary_large_image", title: `${k.title} ${k.emoji}`, description: k.seo.description, images: [card] },
  };
}

/** The landing page: make the quiz, plus readable text for search. */
export default function KnowLanding({ mode }: { mode: KnowMode }) {
  const k = KNOW_QUIZZES[mode];
  const other = KNOW_QUIZZES[mode === "bestie" ? "boyfriend" : "bestie"];
  const faq = [
    { q: k.seo.about, a: k.seo.aboutText },
    {
      q: "Do you see or store the answers?",
      a: "No. Your answers travel inside the link itself, packed so they aren't readable at a glance, so nothing is saved on our servers and nobody sees them unless you send the link.",
    },
    { q: "Is it free?", a: "Yes, completely free, with no sign-up and no app to download." },
    {
      q: "Can lots of people take the same quiz?",
      a: `Yes. Send the same link to as many people as you like, or post it in the group chat. Everyone gets their own score out of ${k.questions.length} and can send it back to you.`,
    },
  ];
  return (
    <main className="min-h-screen bg-[#FFF4FA] overflow-x-hidden">
      <div className="max-w-xl mx-auto px-4 py-8 md:py-12 text-[#1A1033]">
        <div className="text-center mb-6">
          <span className="inline-block -rotate-2 rounded-full bg-white px-3 py-1 text-[12px] font-black mb-3 border-2 border-[#1A1033] shadow-[2px_2px_0_#1A1033]">
            {k.emoji} free · make it in a minute
          </span>
          <h1 className="text-[40px] md:text-5xl leading-[1.02] mb-3" style={display}>{k.title} {k.emoji}</h1>
          <p className="text-[17px] font-bold text-[#1A1033]/70 leading-relaxed">
            {mode === "bestie"
              ? "Answer ten questions about yourself, send the link to your friends, and find out who actually knows you. Spoiler: it's never who you'd expect."
              : "Answer ten questions about yourself, send him the link, and find out if he's really been listening. Works for girlfriends and partners too."}
          </p>
        </div>

        <KnowMaker mode={mode} />

        <section className="mt-12">
          <h2 className="text-2xl font-black leading-tight mb-3">{k.seo.about}</h2>
          <p className="text-[16px] font-semibold text-[#1A1033]/75 leading-relaxed mb-6">{k.seo.aboutText}</p>
          <h3 className="text-lg font-black mb-3">The {k.questions.length} questions</h3>
          <ol className={`rounded-[22px] bg-white p-5 mb-8 space-y-1.5 list-decimal pl-9 text-[15px] font-semibold ${stickerStatic}`}>
            {k.questions.map((x) => (
              <li key={x.id}>{x.me}</li>
            ))}
          </ol>
          <h3 className="text-lg font-black mb-3">Questions people ask</h3>
          <div className="space-y-4 mb-8">
            {faq.map((f) => (
              <div key={f.q}>
                <p className="font-black text-[15px]">{f.q}</p>
                <p className="text-[15px] text-[#1A1033]/75 leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
          <FaqJsonLd items={faq} />
          <p className="text-[15px] font-semibold text-[#1A1033]/75">
            {mode === "bestie" ? "Testing your boyfriend instead? Try " : "Testing your friends instead? Try "}
            <Link href={other.page} className="font-black underline">{other.title.toLowerCase()} {other.emoji}</Link>, or send a{" "}
            <Link href="/after-date-survey" className="font-black underline">post-date survey 💌</Link>.
          </p>
        </section>
      </div>
    </main>
  );
}

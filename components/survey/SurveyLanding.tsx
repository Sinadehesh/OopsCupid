import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { SURVEYS, type SurveyMode } from "@/lib/survey/surveys";
import SurveyMaker from "./SurveyMaker";
import { FaqJsonLd } from "@/components/seo/JsonLd";
import { stickerStatic, display } from "@/lib/ui/sticker";

const baseUrl = "https://www.oopscupid.com";

export function surveyMetadata(mode: SurveyMode): Metadata {
  const s = SURVEYS[mode];
  const url = `${baseUrl}${s.page}`;
  const card = `${baseUrl}/api/og?t=${encodeURIComponent(`${s.title} ${s.emoji}`)}&q=${encodeURIComponent("Send it. Get honest answers back")}`;
  return {
    metadataBase: new URL(baseUrl),
    title: s.seo.title,
    description: s.seo.description,
    alternates: { canonical: url },
    openGraph: { title: `${s.title} ${s.emoji}`, description: s.seo.description, url, type: "website", images: [{ url: card, width: 1200, height: 630, alt: s.title }] },
    twitter: { card: "summary_large_image", title: `${s.title} ${s.emoji}`, description: s.seo.description, images: [card] },
  };
}

/** The landing page: make the link, plus readable text for search. */
export default function SurveyLanding({ mode }: { mode: SurveyMode }) {
  const s = SURVEYS[mode];
  const other = SURVEYS[mode === "date" ? "hangout" : "date"];
  const who = mode === "date" ? "your date" : "your friend";
  const faq = [
    {
      q: `How does the ${s.title.toLowerCase()} work?`,
      a: `Type your first name and you get a link. Send it to ${who}; they answer ${s.questions.length} quick questions and send a link back that shows you their answers. It takes them about a minute.`,
    },
    {
      q: "Do you see or store the answers?",
      a: "No. The names and answers travel inside the links themselves, so nothing is saved on our servers and nobody else can see them unless you share the link.",
    },
    {
      q: "Is it free?",
      a: "Yes, completely free, with no sign-up and no app to download.",
    },
  ];
  return (
    <main className="min-h-screen bg-[#FFF4FA] overflow-x-hidden">
      <div className="max-w-xl mx-auto px-4 py-8 md:py-12 text-[#1A1033]">
        <div className="text-center mb-6">
          <span className="inline-block -rotate-2 rounded-full bg-white px-3 py-1 text-[12px] font-black mb-3 border-2 border-[#1A1033] shadow-[2px_2px_0_#1A1033]">
            {s.emoji} free · send it in 10 seconds
          </span>
          <h1 className="text-[40px] md:text-5xl leading-[1.02] mb-3" style={display}>{s.title} {s.emoji}</h1>
          <p className="text-[17px] font-bold text-[#1A1033]/70 leading-relaxed">
            {mode === "date"
              ? "Send your date a cheeky survey and get their honest review: your outfit, the red flags, the butterflies, and whether there's a second date."
              : "Send your friend a survey and find out how they really rated the hangout: the vibe, the gossip and the most iconic moment."}
          </p>
        </div>

        <SurveyMaker mode={mode} />

        <section className="mt-12">
          <h2 className="text-2xl font-black leading-tight mb-3">{s.seo.about}</h2>
          <p className="text-[16px] font-semibold text-[#1A1033]/75 leading-relaxed mb-6">
            {mode === "date"
              ? "A post-date survey is a playful questionnaire you send someone after a date, asking them to rate how it went. It started as a TikTok trend and stuck because it says the awkward part, \"did you actually like me?\", in a way that's funny instead of needy. This one is ready made, so you don't have to build a form."
              : "An after-hangout survey is a playful questionnaire you send a friend after you've hung out, asking them to rate the day. It's an excuse to relive the best bits, and a sneaky way to plan the next one."}
          </p>
          <h3 className="text-lg font-black mb-3">The {s.questions.length} questions</h3>
          <ol className={`rounded-[22px] bg-white p-5 mb-8 space-y-1.5 list-decimal pl-9 text-[15px] font-semibold ${stickerStatic}`}>
            {s.questions.map((x) => (
              <li key={x.id}>{x.prompt}</li>
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
            Need the other one? Try the{" "}
            <Link href={other.page} className="font-black underline">{other.title.toLowerCase()} {other.emoji}</Link>, or play a{" "}
            <Link href="/games" className="font-black underline">relationship game</Link> together.
          </p>
        </section>
      </div>
    </main>
  );
}

import type { Metadata } from "next";
import { KIT } from "@/lib/share/kit";
import CopyButton from "@/components/share/CopyButton";
import { stickerStatic, display } from "@/lib/ui/sticker";

export const metadata: Metadata = {
  title: "Share kit | OopsCupid",
  robots: { index: false, follow: false },
};

/**
 * The posting kit: every quiz's TikTok slideshow, Pinterest pin and
 * captions in one place, so posting one a day takes two minutes from a
 * phone. Not linked from the site and kept out of search.
 */
export default function KitPage() {
  return (
    <main className="min-h-screen bg-[#FFF4FA] overflow-x-hidden">
      <div className="max-w-2xl mx-auto px-4 py-8 md:py-12 text-[#1A1033]">
        <h1 className="text-[40px] md:text-5xl leading-[1] mb-3" style={display}>Share kit 📣</h1>
        <p className="text-[16px] font-bold text-[#1A1033]/70 mb-6">
          Every quiz, ready to post. Images are made from the quizzes themselves, so new quizzes appear here automatically.
        </p>

        <div className={`rounded-[22px] bg-white p-5 mb-4 ${stickerStatic}`}>
          <p className="text-lg mb-2" style={display}>🎵 TikTok or Instagram slideshow</p>
          <ol className="list-decimal pl-5 space-y-1 text-[15px] font-semibold">
            <li>Pick a quiz below and tap each slide to open it, then long-press and save it.</li>
            <li>In TikTok tap +, choose Photo, select the slides in order and add a trending sound.</li>
            <li>Copy the caption and post. One a day is plenty.</li>
          </ol>
        </div>

        <div className={`rounded-[22px] bg-white p-5 mb-8 ${stickerStatic}`}>
          <p className="text-lg mb-2" style={display}>📌 Pinterest, all pins in one go</p>
          <ol className="list-decimal pl-5 space-y-1 text-[15px] font-semibold">
            <li>Make a free business account at business.pinterest.com.</li>
            <li>Create a board called exactly <b>Relationship Quizzes</b>.</li>
            <li>Download the pins file, then on Pinterest choose Create Pin, then Bulk create Pins, and upload it.</li>
          </ol>
          <a href="/kit/pinterest.csv" className="mt-3 inline-flex rounded-full bg-[#FF4FA3] text-white px-4 py-2 text-[14px] font-black">
            ⬇️ Download the pins file ({KIT.length} pins)
          </a>
          <p className="mt-2 text-[12px] font-bold text-[#1A1033]/55">They post three a day over the next two weeks, each linking straight to its quiz.</p>
        </div>

        <div className="space-y-6">
          {KIT.map((k) => (
            <section key={k.slug} className={`rounded-[24px] p-4 ${stickerStatic}`} style={{ backgroundColor: k.bg }}>
              <div className="flex items-start justify-between gap-3 mb-3">
                <h2 className="text-xl leading-tight" style={display}>{k.emoji} {k.title}</h2>
                <a href={k.url} className="text-[12px] font-black underline shrink-0">open quiz</a>
              </div>

              <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1 [scrollbar-width:none]">
                {k.slides.map((_, n) => (
                  <a key={n} href={`/slides/${k.slug}/${n + 1}.png`} target="_blank" rel="noopener" className="shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={`/slides/${k.slug}/${n + 1}.png`} alt={`Slide ${n + 1}`} loading="lazy" width={90} height={160} className="w-[90px] h-[160px] rounded-xl border-2 border-[#1A1033] bg-white object-cover" />
                  </a>
                ))}
                <a href={`/pins/${k.slug}.png`} target="_blank" rel="noopener" className="shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`/pins/${k.slug}.png`} alt="Pinterest pin" loading="lazy" width={107} height={160} className="w-[107px] h-[160px] rounded-xl border-2 border-[#1A1033] bg-white object-cover" />
                </a>
              </div>

              <div className="mt-2 rounded-2xl bg-white/80 p-3">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <p className="text-[11px] font-black uppercase tracking-wider opacity-60">Caption</p>
                  <CopyButton text={k.tiktok} />
                </div>
                <p className="text-[14px] font-semibold leading-snug break-words">{k.tiktok}</p>
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}

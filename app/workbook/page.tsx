import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Lock, Check } from "lucide-react";
import { PROGRAMS } from "@/lib/programs/registry";
import CheckoutButton from "@/components/offers/CheckoutButton";

/**
 * THE PROGRAMME CATALOGUE
 *
 * Replaces a hand-written list of workbooks in which one was real and the
 * rest were "coming soon" cards with no content behind them. Everything
 * here is read from lib/programs/registry, so the page cannot advertise a
 * programme that does not exist: live ones can be started, outlines show
 * their structure and say plainly that they are being written.
 */

export const metadata: Metadata = {
  title: "Workbooks: Guided Programmes for Relationship Patterns",
  description:
    "Four-week guided programmes built on CBT, DBT and attachment research. Short daily sessions, everything saved, and a written review of each week. Week 1 of every programme is free.",
  alternates: { canonical: "https://www.oopscupid.com/workbook" },
};

export default function WorkbookCatalogue() {
  const live = PROGRAMS.filter((p) => p.status === "live");
  const coming = PROGRAMS.filter((p) => p.status !== "live");

  return (
    <div className="min-h-screen bg-[#FAFAF7] pb-24">
      <header className="max-w-5xl mx-auto px-6 pt-16 md:pt-24 pb-12 text-center">
        <p className="text-xs font-black uppercase tracking-[0.2em] text-[#E07850] mb-4">Workbooks</p>
        <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight leading-[1.05] mb-6">
          Understanding it is the start.
          <br />
          This is the part where it changes.
        </h1>
        <p className="text-lg md:text-xl text-slate-600 font-medium leading-relaxed max-w-2xl mx-auto">
          Four-week programmes, fifteen minutes a session, built on methods
          therapists use. Everything you write is kept, and read back to you at
          the end of each week. Week 1 of every programme is free.
        </p>
      </header>

      <main className="max-w-5xl mx-auto px-6 space-y-14">
        <section className="space-y-5">
          {live.map((p) => (
            <Link key={p.slug} href={`/workbook/${p.slug}`}
              className="group block bg-white rounded-3xl border border-slate-200/80 shadow-[0_2px_20px_rgba(15,23,42,0.05)] p-8 md:p-10 hover:-translate-y-0.5 transition-transform">
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <div className="flex-1">
                  <p className="text-xs font-black uppercase tracking-[0.18em] mb-3" style={{ color: p.accent }}>
                    Open now · 4 weeks · 20 sessions
                  </p>
                  <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-2">{p.title}</h2>
                  <p className="text-lg text-slate-600 font-medium mb-4">{p.subtitle}</p>
                  <p className="text-slate-700 font-medium leading-relaxed">{p.whoFor}</p>
                </div>
                <span className="shrink-0 inline-flex items-center gap-2 text-white font-extrabold px-7 py-4 rounded-2xl" style={{ backgroundColor: p.accent }}>
                  Start free <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>
          ))}
        </section>

        <section className="rounded-3xl bg-[#0E1621] text-white p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-black mb-4 leading-snug">One payment opens every programme.</h2>
              <ul className="space-y-2.5 text-white/75 font-medium">
                {["Every week of every open programme", "Each new programme as it opens, at no extra cost", "A written review of every week, quoting what you wrote", "Your full premium report for any quiz"].map((x) => (
                  <li key={x} className="flex gap-2.5"><Check className="w-5 h-5 text-[#EC8A66] shrink-0 mt-0.5" />{x}</li>
                ))}
              </ul>
            </div>
            <div className="md:text-right">
              <p className="text-5xl font-black mb-1">€49</p>
              <p className="text-white/50 font-bold text-sm mb-6">One payment · no subscription · 7-day refund</p>
              <CheckoutButton sku="report-workbook-bundle" returnTo="/workbook"
                className="inline-flex items-center justify-center gap-2 bg-[#EC8A66] hover:bg-[#E07850] text-white font-extrabold text-lg px-8 py-4 rounded-2xl w-full md:w-auto disabled:opacity-70">
                Unlock everything
              </CheckoutButton>
            </div>
          </div>
        </section>

        {coming.length > 0 && (
          <section>
            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-2">Being written</h2>
            <p className="text-slate-500 font-medium mb-6">
              The structure of each is finished. They open when every session is written, not before, and they are included in the bundle when they do.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {coming.map((p) => (
                <Link key={p.slug} href={`/workbook/${p.slug}`} className="block bg-white/60 rounded-2xl border border-slate-200 p-6 hover:bg-white transition-colors">
                  <p className="text-[11px] font-black uppercase tracking-[0.15em] text-slate-400 mb-2 flex items-center gap-1.5">
                    <Lock className="w-3 h-3" /> In development
                  </p>
                  <h3 className="text-lg font-black text-slate-900 mb-1">{p.title}</h3>
                  <p className="text-sm text-slate-600 font-medium">{p.subtitle}</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

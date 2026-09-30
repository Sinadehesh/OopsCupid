"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Lock, Sparkles, Loader2, MessageCircle, Eye, Footprints, LifeBuoy, Copy, Check } from "lucide-react";
import CheckoutButton from "@/components/offers/CheckoutButton";

/**
 * THE €2.99 QUICK READ
 *
 * Priced for the moment it appears: she has just seen her own result and
 * wants to know what it means for her. One tap, Apple Pay or Google Pay,
 * and a written read of exactly what she ticked appears on the same page.
 *
 * The card says precisely what she gets and when, shows the real price,
 * and invents nothing: no fake discount, no timer. What makes it easy to
 * say yes to is the price, the speed and the specificity.
 *
 * Her picks are kept on the phone across the Stripe round trip, then sent
 * to the server only to write the read. For versus games the names never
 * leave the phone at all.
 */

export type QuickReadInput =
  | { kind: "tick"; slug: string; picks: string[]; count: number; top?: string }
  | { kind: "versus"; slug: string; picks: Record<string, string>; names: { a: string; b: string }; count: number };

const pendingKey = (slug: string) => `oc_pending:${slug}`;

/** Save what she picked, so it survives the trip to Stripe and back. */
export function savePending(slug: string, data: unknown) {
  try {
    localStorage.setItem(pendingKey(slug), JSON.stringify(data));
  } catch {}
}

export function loadPending<T>(slug: string): T | null {
  try {
    const raw = localStorage.getItem(pendingKey(slug));
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

type Read = Record<string, any>;

export default function QuickRead({ input, pending }: { input: QuickReadInput; pending: unknown }) {
  const [access, setAccess] = useState<"checking" | "open" | "locked">("checking");
  const [read, setRead] = useState<Read | null>(null);
  const [state, setState] = useState<"idle" | "writing" | "error">("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    let off = false;
    fetch("/api/access", { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => {
        if (off) return;
        const open = Boolean(d?.premiumReport) || (Array.isArray(d?.reads) && d.reads.includes(input.slug));
        setAccess(open ? "open" : "locked");
      })
      .catch(() => !off && setAccess("locked"));
    return () => {
      off = true;
    };
  }, [input.slug]);

  const write = useCallback(async () => {
    setState("writing");
    setError("");
    try {
      const res = await fetch("/api/quick-read", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind: input.kind, slug: input.slug, picks: input.picks }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || "Something went wrong.");
      setRead(data.read);
      setState("idle");
    } catch (e: any) {
      setError(e?.message || "Something went wrong.");
      setState("error");
    }
  }, [input]);

  // Once it's open, write it straight away: she paid to see it now.
  useEffect(() => {
    if (access === "open" && !read && state === "idle") write();
  }, [access, read, state, write]);

  const names = input.kind === "versus" ? input.names : null;
  const fill = (s: string) =>
    names ? s.replace(/Person A/g, names.a).replace(/Person B/g, names.b) : s;

  if (access === "checking") return null;

  if (access === "open") {
    if (read) return <ReadView read={read} fill={fill} names={names} />;
    return (
      <div className="rounded-3xl bg-[#0E1621] text-white p-7 mb-8 text-center">
        {state === "error" ? (
          <>
            <p className="font-bold mb-4">{error}</p>
            <button onClick={write} className="bg-[#EC8A66] px-6 py-3 rounded-2xl font-extrabold">Try again</button>
          </>
        ) : (
          <>
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-3 text-[#F5DD90]" />
            <p className="font-extrabold text-lg">Writing your read…</p>
            <p className="text-white/60 text-sm mt-1">About ten seconds.</p>
          </>
        )}
      </div>
    );
  }

  const bought = `/${input.slug}?read=1`;
  const teaser =
    input.kind === "versus"
      ? [
          `What your guesses really say about ${input.names.a || "your first pick"}`,
          `…and about ${input.names.b || "your second pick"}`,
          "The one thing to say to the one who worries you",
        ]
      : [
          `Which of your ${input.count} ticks matters most`,
          "What they add up to, for you specifically",
          "A message you could send tonight, word for word",
        ];

  return (
    <div className="relative rounded-3xl bg-[#0E1621] text-white p-6 md:p-8 mb-8 overflow-hidden shadow-[0_18px_50px_rgba(14,22,33,0.35)]">
      <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-[#EC8A66]/25 blur-3xl" />
      <p className="relative text-[11px] font-black uppercase tracking-[0.2em] text-[#F5DD90] mb-2 flex items-center gap-1.5">
        <Sparkles className="w-3.5 h-3.5" /> Your personal read
      </p>
      <h2 className="relative text-2xl md:text-3xl font-black leading-snug mb-4">
        {input.kind === "versus" ? "See what your guesses really mean." : "Find out what your answers mean for you."}
      </h2>

      {/* A glimpse of the shape of it, blurred, because it is not written yet. */}
      <div className="relative rounded-2xl bg-white/5 border border-white/10 p-4 mb-5" aria-hidden="true">
        <div className="space-y-2 blur-[3px] select-none">
          <div className="h-3 rounded bg-white/40 w-11/12" />
          <div className="h-3 rounded bg-white/30 w-10/12" />
          <div className="h-3 rounded bg-white/30 w-8/12" />
          <div className="h-3 rounded bg-[#EC8A66]/60 w-9/12 mt-3" />
          <div className="h-3 rounded bg-white/30 w-7/12" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="flex items-center gap-1.5 bg-[#0E1621]/90 px-3 py-1.5 rounded-full text-xs font-black">
            <Lock className="w-3.5 h-3.5" /> Written for you when you unlock
          </span>
        </div>
      </div>

      <ul className="relative space-y-2 mb-6">
        {teaser.map((t) => (
          <li key={t} className="flex gap-2.5 font-semibold text-white/90">
            <Check className="w-5 h-5 text-[#EC8A66] shrink-0 mt-0.5" /> {t}
          </li>
        ))}
      </ul>

      <CheckoutButton
        sku="quick-read"
        returnTo={bought}
        beforeCheckout={() => savePending(input.slug, pending)}
        className="relative w-full min-h-[62px] bg-[#EC8A66] hover:bg-[#E07850] text-white font-black text-xl rounded-2xl transition-colors flex items-center justify-center gap-2 shadow-[0_10px_30px_rgba(236,138,102,0.45)] active:scale-[0.98] disabled:opacity-70"
      >
        Unlock my read · €2.99
      </CheckoutButton>
      <p className="relative text-center text-xs font-bold text-white/55 mt-3">
        Apple Pay, Google Pay or card · appears right here in seconds · one-off, no subscription
      </p>

      <div className="relative mt-5 pt-5 border-t border-white/10 text-center">
        <CheckoutButton
          sku="premium-report"
          returnTo={bought}
          beforeCheckout={() => savePending(input.slug, pending)}
          className="text-sm font-extrabold text-[#F5DD90] hover:underline disabled:opacity-70"
        >
          Or unlock every read and every full report on the site · €9.99
        </CheckoutButton>
      </div>
    </div>
  );
}

function ReadView({ read, fill, names }: { read: Read; fill: (s: string) => string; names: { a: string; b: string } | null }) {
  const [copied, setCopied] = useState(false);
  const message = read?.say?.message ? fill(read.say.message) : "";
  return (
    <div className="rounded-3xl bg-white border-2 border-[#EC8A66] p-6 md:p-8 mb-8 shadow-[0_10px_40px_rgba(236,138,102,0.15)]">
      <p className="text-[11px] font-black uppercase tracking-[0.2em] text-[#E07850] mb-2 flex items-center gap-1.5">
        <Sparkles className="w-3.5 h-3.5" /> Your personal read
      </p>
      <h2 className="text-2xl md:text-3xl font-black text-slate-900 leading-snug mb-5">{fill(read.headline ?? "")}</h2>

      {read.flag && (
        <div className="rounded-2xl bg-amber-50 border border-amber-200 p-4 mb-5 flex gap-3">
          <LifeBuoy className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <p className="text-amber-900 font-medium leading-relaxed">{fill(read.flag)}</p>
        </div>
      )}

      {read.together && (
        <div className="space-y-3 mb-6">
          {String(read.together).split(/\n+/).map((p, i) => (
            <p key={i} className="text-slate-700 font-medium leading-relaxed">{fill(p)}</p>
          ))}
        </div>
      )}

      {names && (
        <div className="grid gap-3 mb-6">
          {read.personA && <Person name={names.a} text={fill(read.personA)} />}
          {read.personB && <Person name={names.b} text={fill(read.personB)} />}
          {read.difference && <p className="text-slate-700 font-medium leading-relaxed">{fill(read.difference)}</p>}
        </div>
      )}

      {read.watch?.item && (
        <Section icon={<Eye className="w-4 h-4" />} title="The one to watch">
          <p className="font-black text-slate-900 mb-1">{fill(read.watch.item)}</p>
          <p className="text-slate-600 font-medium leading-relaxed">{fill(read.watch.why ?? "")}</p>
        </Section>
      )}

      {message && (
        <Section icon={<MessageCircle className="w-4 h-4" />} title={names && read.say?.to ? `What to say to ${read.say.to === "B" ? names.b : names.a}` : "What you could say"}>
          {read.say?.intro && <p className="text-slate-600 font-medium mb-3">{fill(read.say.intro)}</p>}
          <div className="rounded-2xl bg-slate-900 text-white p-4 font-semibold leading-relaxed">{message}</div>
          <button
            onClick={() => {
              navigator.clipboard?.writeText(message).then(() => setCopied(true)).catch(() => {});
            }}
            className="mt-2 inline-flex items-center gap-1.5 text-sm font-bold text-[#E07850]"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />} {copied ? "Copied" : "Copy it"}
          </button>
        </Section>
      )}

      {read.step && (
        <Section icon={<Footprints className="w-4 h-4" />} title="This week">
          <p className="text-slate-700 font-medium leading-relaxed">{fill(read.step)}</p>
        </Section>
      )}
    </div>
  );
}

function Section({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-slate-100 pt-5 mt-5">
      <p className="text-[11px] font-black uppercase tracking-[0.15em] text-slate-400 mb-2 flex items-center gap-1.5">{icon} {title}</p>
      {children}
    </div>
  );
}

function Person({ name, text }: { name: string; text: string }) {
  return (
    <div className="rounded-2xl bg-slate-50 p-4">
      <p className="font-black text-slate-900 mb-1">{name}</p>
      <p className="text-slate-600 font-medium leading-relaxed">{text}</p>
    </div>
  );
}

"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { BookOpen, Check, X, Play, Square, Copy, FlaskConical, Mail, Lightbulb, RotateCcw } from "lucide-react";
import type {
  Block, ReadBlock, ReflectBlock, ScaleBlock, ChooseBlock, SortBlock, ThoughtsBlock,
  ScriptBlock, TimerBlock, ExperimentBlock, CheckBlock, LetterBlock,
} from "@/lib/programs/types";
import { usePersisted, SaveMark, readSaved, useSessionPlace } from "./persist";

/**
 * The exercises. Eleven kinds, chosen because each one does something a
 * text box cannot: a slider measured twice shows change, a card sort
 * forces a decision, a thought record separates what happened from what it
 * meant, a timer gets the body involved. Variety is also simply what keeps
 * somebody coming back on day nine.
 *
 * Every textarea carries data-oc-skip. The site-wide autosave watches all
 * textareas under /workbook, and these blocks already save themselves as
 * structured rows; without the flag each answer would be stored twice and
 * the weekly review would read it twice.
 */

const CARD = "bg-white rounded-3xl border border-slate-200/80 shadow-[0_2px_20px_rgba(15,23,42,0.05)] p-6 md:p-8";
const FIELD = "w-full bg-white border-2 border-slate-200 rounded-2xl p-4 text-slate-800 font-medium leading-relaxed outline-none focus:border-slate-400 focus:ring-4 focus:ring-slate-100 transition-all resize-y";
const LABEL = "block text-[15px] md:text-base font-bold text-slate-800 leading-relaxed mb-3";

function Head({ children, status }: { children: React.ReactNode; status?: "idle" | "saving" | "saved" | "local" }) {
  return (
    <div className="flex items-start justify-between gap-4 mb-3">
      <div className="flex-1">{children}</div>
      {status && <SaveMark status={status} />}
    </div>
  );
}

/* ── read ─────────────────────────────────────────────────────────────── */
function Read({ b, accent }: { b: ReadBlock; accent: string }) {
  return (
    <div className={CARD}>
      <h3 className="text-xl md:text-2xl font-black text-slate-900 mb-4 flex items-center gap-2.5">
        <BookOpen className="w-5 h-5 shrink-0" style={{ color: accent }} />
        {b.title}
      </h3>
      <div className="space-y-4 text-slate-600 font-medium leading-relaxed text-[16px] md:text-[17px]">
        {b.body.map((p, i) => <p key={i}>{p}</p>)}
      </div>
      {b.why && (
        <div className="mt-6 rounded-2xl p-4 flex gap-3" style={{ backgroundColor: `${accent}12` }}>
          <Lightbulb className="w-5 h-5 shrink-0 mt-0.5" style={{ color: accent }} />
          <p className="text-sm font-semibold text-slate-700 leading-relaxed">{b.why}</p>
        </div>
      )}
    </div>
  );
}

/* ── reflect ──────────────────────────────────────────────────────────── */
function Reflect({ b }: { b: ReflectBlock }) {
  const [v, set, status] = usePersisted<string>(b.id, "", (x) => ({ label: b.prompt, text: x }));
  return (
    <div className={CARD}>
      <Head status={status}><p className={LABEL}>{b.prompt}</p></Head>
      {b.hint && <p className="text-sm text-slate-500 font-medium -mt-1 mb-3 leading-relaxed">{b.hint}</p>}
      <textarea data-oc-skip="1" rows={b.rows ?? 5} value={v} onChange={(e) => set(e.target.value)}
        placeholder={b.placeholder} className={FIELD} />
    </div>
  );
}

/* ── scale ────────────────────────────────────────────────────────────── */
function Scale({ b, accent }: { b: ScaleBlock; accent: string }) {
  const place = useSessionPlace();
  const [v, set, status] = usePersisted<number | null>(b.id, null, (x) => ({
    label: b.prompt,
    text: x === null ? "" : `${x} out of 10 (0 = ${b.low}, 10 = ${b.high})`,
  }));
  const [baseline, setBaseline] = useState<number | null>(null);
  useEffect(() => {
    if (!b.compareTo) return;
    setBaseline(readSaved<number>({ program: b.compareTo.program ?? place.program, week: b.compareTo.week, day: b.compareTo.day }, b.compareTo.id));
  }, [b.compareTo, place.program]);

  return (
    <div className={CARD}>
      <Head status={status}><p className={LABEL}>{b.prompt}</p></Head>
      <div className="flex items-center gap-4 mt-2">
        <span className="text-5xl font-black tabular-nums w-16 text-center" style={{ color: v === null ? "#CBD5E1" : accent }}>
          {v ?? "–"}
        </span>
        <input type="range" min={0} max={10} step={1} value={v ?? 5}
          onChange={(e) => set(Number(e.target.value))}
          className="flex-1 h-2 accent-slate-900 cursor-pointer" aria-label={b.prompt} />
      </div>
      <div className="flex justify-between text-xs font-bold text-slate-400 mt-2 pl-20">
        <span>0 · {b.low}</span><span>10 · {b.high}</span>
      </div>
      {b.compareTo && baseline !== null && v !== null && (
        <p className="mt-5 text-sm font-bold text-slate-600 rounded-xl bg-slate-50 p-3">
          {b.compareTo.label}: you said <span className="tabular-nums">{baseline}</span>. Today:{" "}
          <span className="tabular-nums">{v}</span>
          {v > baseline ? `, up ${v - baseline}.` : v < baseline ? `, down ${baseline - v}. That happens, and it is information.` : ", the same."}
        </p>
      )}
    </div>
  );
}

/* ── choose ───────────────────────────────────────────────────────────── */
function Choose({ b, accent }: { b: ChooseBlock; accent: string }) {
  const [v, set, status] = usePersisted<string[]>(b.id, [], (x) => ({ label: b.prompt, text: x.join("; ") }));
  const toggle = (o: string) => set(v.includes(o) ? v.filter((x) => x !== o) : [...v, o]);
  const after = v.length === 0 ? null : v.length >= Math.max(3, Math.ceil(b.options.length / 2)) ? b.after?.many ?? b.after?.few : b.after?.few;
  return (
    <div className={CARD}>
      <Head status={status}><p className={LABEL}>{b.prompt}</p></Head>
      <div className="grid gap-2.5 sm:grid-cols-2">
        {b.options.map((o) => {
          const on = v.includes(o);
          return (
            <button key={o} onClick={() => toggle(o)} aria-pressed={on}
              className={`text-left px-4 py-3.5 rounded-2xl border-2 font-bold leading-snug transition-all flex items-start gap-3 ${on ? "text-white border-transparent" : "bg-white border-slate-200 text-slate-700 hover:border-slate-400"}`}
              style={on ? { backgroundColor: accent } : undefined}>
              <span className={`w-5 h-5 rounded-md border-2 shrink-0 mt-0.5 flex items-center justify-center ${on ? "border-white bg-white/20" : "border-slate-300"}`}>
                {on && <Check className="w-3.5 h-3.5 text-white" />}
              </span>
              {o}
            </button>
          );
        })}
      </div>
      {after && <p className="mt-5 text-slate-700 font-medium leading-relaxed rounded-2xl bg-slate-50 p-4">{after}</p>}
    </div>
  );
}

/* ── sort ─────────────────────────────────────────────────────────────── */
function Sort({ b, accent }: { b: SortBlock; accent: string }) {
  const [placed, set, status] = usePersisted<Record<string, string>>(b.id, {}, (x) => ({
    label: b.prompt,
    text: b.buckets.map((k) => `${k}: ${b.items.filter((i) => x[i.text] === k).map((i) => i.text).join(" / ") || "none"}`).join(". "),
  }));
  const [held, setHeld] = useState<string | null>(null);
  const remaining = b.items.filter((i) => !placed[i.text]);
  const done = remaining.length === 0;
  const graded = b.items.some((i) => i.answer);

  return (
    <div className={CARD}>
      <Head status={status}><p className={LABEL}>{b.prompt}</p></Head>
      {!done && (
        <>
          <p className="text-xs font-black uppercase tracking-[0.15em] text-slate-400 mb-3">
            {held ? "Now tap where it goes" : "Tap a card"}
          </p>
          <div className="flex flex-wrap gap-2 mb-5">
            {remaining.map((i) => (
              <button key={i.text} onClick={() => setHeld(held === i.text ? null : i.text)}
                className={`px-4 py-2.5 rounded-xl border-2 font-bold text-sm transition-all ${held === i.text ? "text-white border-transparent scale-105" : "bg-slate-50 border-slate-200 text-slate-700"}`}
                style={held === i.text ? { backgroundColor: accent } : undefined}>
                {i.text}
              </button>
            ))}
          </div>
        </>
      )}
      <div className={`grid gap-3 ${b.buckets.length === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2"}`}>
        {b.buckets.map((k) => (
          <button key={k} disabled={!held}
            onClick={() => { if (held) { set({ ...placed, [held]: k }); setHeld(null); } }}
            className={`text-left rounded-2xl border-2 border-dashed p-4 min-h-[110px] transition-all ${held ? "border-slate-400 bg-slate-50 cursor-pointer" : "border-slate-200 cursor-default"}`}>
            <p className="text-xs font-black uppercase tracking-[0.15em] mb-2" style={{ color: accent }}>{k}</p>
            <div className="space-y-1.5">
              {b.items.filter((i) => placed[i.text] === k).map((i) => {
                const wrong = graded && i.answer && i.answer !== k;
                return (
                  <p key={i.text} className={`text-sm font-bold leading-snug flex gap-1.5 ${wrong ? "text-amber-700" : "text-slate-700"}`}>
                    {graded && (wrong ? <X className="w-4 h-4 shrink-0 mt-0.5" /> : <Check className="w-4 h-4 shrink-0 mt-0.5 text-emerald-600" />)}
                    {i.text}{wrong && <span className="font-medium text-amber-600"> (more likely: {i.answer})</span>}
                  </p>
                );
              })}
            </div>
          </button>
        ))}
      </div>
      {done && (
        <div className="mt-5 flex items-start justify-between gap-4">
          {b.after && <p className="text-slate-700 font-medium leading-relaxed">{b.after}</p>}
          <button onClick={() => set({})} className="shrink-0 text-xs font-bold text-slate-400 hover:text-slate-700 flex items-center gap-1">
            <RotateCcw className="w-3.5 h-3.5" /> Redo
          </button>
        </div>
      )}
    </div>
  );
}

/* ── thought record ───────────────────────────────────────────────────── */
const THOUGHT_COLS: { key: "situation" | "thought" | "evidence" | "balanced"; label: string; help: string }[] = [
  { key: "situation", label: "What happened", help: "Facts only. Where, when, the words that were said." },
  { key: "thought", label: "What went through your head", help: "The automatic thought, in the exact words it arrived in." },
  { key: "evidence", label: "What actually supports it, and what does not", help: "Both columns. Be a fair witness, not a prosecutor." },
  { key: "balanced", label: "A more complete way to see it", help: "Not positive thinking. Just a version that fits all the evidence." },
];
function Thoughts({ b, accent }: { b: ThoughtsBlock; accent: string }) {
  const [v, set, status] = usePersisted<Record<string, string>>(b.id, {}, (x) => ({
    label: b.prompt,
    text: THOUGHT_COLS.filter((c) => x[c.key]?.trim()).map((c) => `${c.label}: ${x[c.key]}`).join(" | "),
  }));
  const [showEx, setShowEx] = useState(false);
  return (
    <div className={CARD}>
      <Head status={status}><p className={LABEL}>{b.prompt}</p></Head>
      {b.example && (
        <button onClick={() => setShowEx(!showEx)} className="text-sm font-bold mb-4" style={{ color: accent }}>
          {showEx ? "Hide the example" : "See a worked example"}
        </button>
      )}
      {showEx && b.example && (
        <div className="rounded-2xl bg-slate-50 p-4 mb-5 space-y-2 text-sm text-slate-600 font-medium">
          {THOUGHT_COLS.map((c) => <p key={c.key}><strong className="text-slate-800">{c.label}:</strong> {b.example![c.key]}</p>)}
        </div>
      )}
      <div className="space-y-5">
        {THOUGHT_COLS.map((c, i) => (
          <div key={c.key}>
            <p className="text-sm font-black text-slate-800 mb-1"><span style={{ color: accent }}>{i + 1}.</span> {c.label}</p>
            <p className="text-xs text-slate-500 font-medium mb-2">{c.help}</p>
            <textarea data-oc-skip="1" rows={2} value={v[c.key] ?? ""} onChange={(e) => set({ ...v, [c.key]: e.target.value })} className={FIELD} />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── script ───────────────────────────────────────────────────────────── */
function Script({ b, accent }: { b: ScriptBlock; accent: string }) {
  const [v, set, status] = usePersisted<Record<string, string>>(b.id, {}, (x) => ({
    label: b.prompt,
    text: b.fields.some((f) => x[f.key]?.trim()) ? assemble(b.template, x) : "",
  }));
  const [copied, setCopied] = useState(false);
  const full = assemble(b.template, v, true);
  return (
    <div className={CARD}>
      <Head status={status}><p className={LABEL}>{b.prompt}</p></Head>
      <div className="grid gap-4 sm:grid-cols-2 mb-6">
        {b.fields.map((f) => (
          <label key={f.key} className="block">
            <span className="block text-sm font-bold text-slate-700 mb-1.5">{f.label}</span>
            <input value={v[f.key] ?? ""} onChange={(e) => set({ ...v, [f.key]: e.target.value })}
              placeholder={f.placeholder} className="w-full bg-white border-2 border-slate-200 rounded-xl px-4 py-3 font-medium text-slate-800 outline-none focus:border-slate-400" />
          </label>
        ))}
      </div>
      <div className="rounded-2xl p-5 border-2" style={{ borderColor: `${accent}40`, backgroundColor: `${accent}0A` }}>
        <p className="text-xs font-black uppercase tracking-[0.15em] mb-3" style={{ color: accent }}>Your words</p>
        <div className="space-y-2 text-lg font-bold text-slate-800 leading-relaxed">
          {full.split("\n").map((l, i) => <p key={i}>{l}</p>)}
        </div>
        <button onClick={() => { navigator.clipboard?.writeText(assemble(b.template, v)); setCopied(true); setTimeout(() => setCopied(false), 1800); }}
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-slate-500 hover:text-slate-800">
          <Copy className="w-4 h-4" /> {copied ? "Copied" : "Copy to keep on your phone"}
        </button>
      </div>
    </div>
  );
}
function assemble(template: string[], v: Record<string, string>, showBlanks = false): string {
  return template.map((line) => line.replace(/\{(\w+)\}/g, (_, k) => v[k]?.trim() || (showBlanks ? "____" : `[${k}]`))).join("\n");
}

/* ── timer ────────────────────────────────────────────────────────────── */
function Timer({ b, accent }: { b: TimerBlock; accent: string }) {
  const [left, setLeft] = useState(b.seconds);
  const [running, setRunning] = useState(false);
  const [done, set] = usePersisted<number>(b.id, 0, (n) => ({ label: b.title, text: n ? `Completed ${n} time${n === 1 ? "" : "s"}` : "" }));
  const tick = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!running) return;
    tick.current = setInterval(() => setLeft((s) => {
      if (s <= 1) { setRunning(false); set(done + 1); return b.seconds; }
      return s - 1;
    }), 1000);
    return () => { if (tick.current) clearInterval(tick.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running]);

  const elapsed = b.seconds - left;
  const cue = b.cues[Math.min(b.cues.length - 1, Math.floor((elapsed / b.seconds) * b.cues.length))];
  const pct = (elapsed / b.seconds) * 100;
  return (
    <div className={`${CARD} text-center`}>
      <p className="text-xs font-black uppercase tracking-[0.15em] mb-2" style={{ color: accent }}>{b.title}</p>
      <div className="relative w-44 h-44 mx-auto my-6">
        <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
          <circle cx="50" cy="50" r="44" fill="none" stroke="#F1F5F9" strokeWidth="6" />
          <circle cx="50" cy="50" r="44" fill="none" stroke={accent} strokeWidth="6" strokeLinecap="round"
            strokeDasharray={`${(pct / 100) * 276.5} 276.5`} style={{ transition: "stroke-dasharray 1s linear" }} />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-4xl font-black tabular-nums text-slate-900">
          {Math.floor(left / 60)}:{String(left % 60).padStart(2, "0")}
        </span>
      </div>
      <p className="text-lg font-bold text-slate-700 min-h-[3.5rem] max-w-md mx-auto leading-relaxed">{running ? cue : b.cues[0]}</p>
      <button onClick={() => { setRunning(!running); if (running) setLeft(b.seconds); }}
        className="mt-5 inline-flex items-center gap-2 text-white font-extrabold px-8 py-3.5 rounded-2xl" style={{ backgroundColor: accent }}>
        {running ? <><Square className="w-4 h-4" /> Stop</> : <><Play className="w-4 h-4" /> Start</>}
      </button>
      {done > 0 && <p className="text-xs font-bold text-slate-400 mt-3">Done {done} time{done === 1 ? "" : "s"}</p>}
    </div>
  );
}

/* ── experiment ───────────────────────────────────────────────────────── */
function Experiment({ b, accent }: { b: ExperimentBlock; accent: string }) {
  const [v, set, status] = usePersisted<Record<string, string>>(b.id, {}, (x) => ({
    label: `Experiment: ${b.task}`,
    text: [["Predicted", x.predict], ["What happened", x.result], ["Learned", x.learn]].filter(([, t]) => t?.trim()).map(([k, t]) => `${k}: ${t}`).join(" | "),
  }));
  const steps = [
    { key: "predict", label: b.predictPrompt, tag: "Before" },
    { key: "result", label: b.resultPrompt, tag: "After" },
    { key: "learn", label: b.learnPrompt, tag: "So" },
  ];
  return (
    <div className={CARD}>
      <Head status={status}>
        <p className="text-xs font-black uppercase tracking-[0.15em] mb-2 flex items-center gap-1.5" style={{ color: accent }}>
          <FlaskConical className="w-4 h-4" /> Experiment
        </p>
        <p className="text-lg font-black text-slate-900 leading-snug">{b.task}</p>
      </Head>
      <div className="space-y-5 mt-5">
        {steps.map((s) => (
          <div key={s.key}>
            <p className="text-sm font-bold text-slate-800 mb-2"><span className="text-[10px] font-black uppercase tracking-widest text-slate-400 mr-2">{s.tag}</span>{s.label}</p>
            <textarea data-oc-skip="1" rows={2} value={v[s.key] ?? ""} onChange={(e) => set({ ...v, [s.key]: e.target.value })} className={FIELD} />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── check ────────────────────────────────────────────────────────────── */
function CheckQ({ b, accent }: { b: CheckBlock; accent: string }) {
  const [pick, set] = usePersisted<number | null>(b.id, null, (i) => ({
    label: b.question,
    text: i === null ? "" : `${b.options[i].text} (${b.options[i].correct ? "right" : "not quite"})`,
  }));
  return (
    <div className={CARD}>
      <p className="text-xs font-black uppercase tracking-[0.15em] mb-2" style={{ color: accent }}>Quick check</p>
      <p className={LABEL}>{b.question}</p>
      <div className="space-y-2.5">
        {b.options.map((o, i) => {
          const chosen = pick === i;
          const reveal = pick !== null;
          const tone = !reveal ? "border-slate-200 hover:border-slate-400" : o.correct ? "border-emerald-400 bg-emerald-50" : chosen ? "border-amber-400 bg-amber-50" : "border-slate-100 opacity-60";
          return (
            <button key={i} onClick={() => set(i)} className={`w-full text-left px-4 py-3.5 rounded-2xl border-2 transition-all ${tone}`}>
              <span className="font-bold text-slate-800">{o.text}</span>
              {reveal && (chosen || o.correct) && <span className="block text-sm font-medium text-slate-600 mt-1.5 leading-relaxed">{o.because}</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ── letter ───────────────────────────────────────────────────────────── */
function Letter({ b, accent }: { b: LetterBlock; accent: string }) {
  const [v, set, status] = usePersisted<string>(b.id, "", (x) => ({ label: `Letter to ${b.to}`, text: x }));
  return (
    <div className={CARD}>
      <Head status={status}>
        <p className="text-xs font-black uppercase tracking-[0.15em] mb-2 flex items-center gap-1.5" style={{ color: accent }}>
          <Mail className="w-4 h-4" /> A letter to {b.to}
        </p>
        <p className={LABEL}>{b.prompt}</p>
      </Head>
      <div className="rounded-2xl bg-[#FFFDF7] border border-amber-100 p-5 md:p-7">
        <p className="font-serif text-lg text-slate-700 mb-3 italic">{b.opening}</p>
        <textarea data-oc-skip="1" rows={10} value={v} onChange={(e) => set(e.target.value)}
          className="w-full bg-transparent font-serif text-lg text-slate-800 leading-relaxed outline-none resize-y" />
      </div>
    </div>
  );
}

export default function BlockView({ block, accent }: { block: Block; accent: string }) {
  switch (block.kind) {
    case "read": return <Read b={block} accent={accent} />;
    case "reflect": return <Reflect b={block} />;
    case "scale": return <Scale b={block} accent={accent} />;
    case "choose": return <Choose b={block} accent={accent} />;
    case "sort": return <Sort b={block} accent={accent} />;
    case "thoughts": return <Thoughts b={block} accent={accent} />;
    case "script": return <Script b={block} accent={accent} />;
    case "timer": return <Timer b={block} accent={accent} />;
    case "experiment": return <Experiment b={block} accent={accent} />;
    case "check": return <CheckQ b={block} accent={accent} />;
    case "letter": return <Letter b={block} accent={accent} />;
  }
}

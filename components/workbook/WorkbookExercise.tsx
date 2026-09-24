"use client";

import React, { useEffect, useRef, useState } from "react";
import { Check, Loader2, AlertCircle } from "lucide-react";
import { saveWorkbookEntry } from "@/app/actions/saveWorkbookEntry";

/**
 * A workbook exercise that actually keeps what you write.
 *
 * 48 of the 49 workbook pages had input boxes; four of them called the
 * save action, and that action passed a userId the table did not have, so
 * Prisma rejected every write and the catch swallowed it. Two entries were
 * stored in five months. Everything else anyone typed was gone on refresh
 * — in a product sold for €49.
 *
 * Two layers of persistence, deliberately:
 *  - localStorage, immediately, so a refresh or a closed tab never costs
 *    anyone their writing even if the network is down;
 *  - the database, debounced, because the weekly review reads across days
 *    and cannot see localStorage.
 *
 * sessionId is a per-device random id kept in localStorage. It lets the
 * review group one person's entries without requiring an account, which
 * matters because sign-in is optional.
 */

function deviceSessionId(): string {
  try {
    const KEY = "oc_workbook_session";
    let id = localStorage.getItem(KEY);
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem(KEY, id);
    }
    return id;
  } catch {
    return "anonymous";
  }
}

export interface Field {
  key: string;
  label: string;
  placeholder?: string;
  /** Textareas default to 4 rows; set 1 for a single-line answer. */
  rows?: number;
}

export default function WorkbookExercise({
  workbook,
  week,
  day,
  exerciseKey,
  title,
  intro,
  fields,
}: {
  workbook: string;
  week: number;
  day: number;
  exerciseKey: string;
  title: string;
  intro?: string;
  fields: Field[];
}) {
  const storageKey = `oc_wb:${workbook}:${week}:${day}:${exerciseKey}`;
  const [values, setValues] = useState<Record<string, string>>({});
  const [state, setState] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const loaded = useRef(false);

  // Restore anything written before.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) setValues(JSON.parse(raw));
    } catch {
      // Private mode or corrupted entry — start empty rather than crash.
    }
    loaded.current = true;
  }, [storageKey]);

  const update = (key: string, value: string) => {
    const next = { ...values, [key]: value };
    setValues(next);

    // Local first, and synchronously: this is the copy that must not be lost.
    try {
      localStorage.setItem(storageKey, JSON.stringify(next));
    } catch {}

    setState("saving");
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(async () => {
      const written = Object.values(next).filter((v) => v.trim().length > 1);
      if (!written.length) {
        setState("idle");
        return;
      }
      try {
        const res = await saveWorkbookEntry({
          workbook,
          week,
          day,
          exerciseKey,
          content: next,
          sessionId: deviceSessionId(),
        });
        setState(res.success ? "saved" : "error");
      } catch {
        setState("error");
      }
    }, 1200);
  };

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-[0_2px_20px_rgba(15,23,42,0.05)] p-6 md:p-8 my-8">
      <div className="flex items-start justify-between gap-4 mb-2">
        <h3 className="text-xl md:text-2xl font-black text-slate-900">{title}</h3>
        <span className="shrink-0 text-xs font-bold text-slate-400 flex items-center gap-1.5 pt-1.5" aria-live="polite">
          {state === "saving" && <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Saving…</>}
          {state === "saved" && <><Check className="w-3.5 h-3.5 text-emerald-600" /> Saved</>}
          {state === "error" && <><AlertCircle className="w-3.5 h-3.5 text-amber-500" /> Saved on this device</>}
        </span>
      </div>

      {intro && <p className="text-slate-600 font-medium leading-relaxed mb-6">{intro}</p>}

      <div className="space-y-5">
        {fields.map((f) => (
          <div key={f.key}>
            <label htmlFor={`${exerciseKey}-${f.key}`} className="block text-sm font-bold text-slate-700 mb-2">
              {f.label}
            </label>
            <textarea
              id={`${exerciseKey}-${f.key}`}
              rows={f.rows ?? 4}
              value={values[f.key] ?? ""}
              onChange={(e) => update(f.key, e.target.value)}
              placeholder={f.placeholder}
              className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl focus:border-slate-400 focus:ring-4 focus:ring-slate-100 outline-none text-slate-800 font-medium leading-relaxed transition-all resize-y"
            />
          </div>
        ))}
      </div>

      <p className="text-[11px] font-bold text-slate-400 mt-5">
        Your writing is kept so the end-of-week review can read across your days.
      </p>
    </div>
  );
}

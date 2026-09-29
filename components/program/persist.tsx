"use client";

import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { saveWorkbookPage } from "@/app/actions/saveWorkbookEntry";
import { deviceSessionId } from "@/lib/workbook/session";

/**
 * Where a block lives, so it can save itself without being told.
 */
export interface SessionPlace {
  program: string;
  week: number;
  day: number;
}

const Place = createContext<SessionPlace | null>(null);

export function SessionProvider({ place, children }: { place: SessionPlace; children: React.ReactNode }) {
  return <Place.Provider value={place}>{children}</Place.Provider>;
}

export function useSessionPlace(): SessionPlace {
  const p = useContext(Place);
  if (!p) throw new Error("Block rendered outside a SessionProvider.");
  return p;
}

const storageKey = (p: SessionPlace, id: string) => `oc_prog:${p.program}:${p.week}:${p.day}:${id}`;

/** Read another block's saved value, for a re-measure against its baseline. */
export function readSaved<T>(p: SessionPlace, id: string): T | null {
  try {
    const raw = localStorage.getItem(storageKey(p, id));
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

/**
 * A block's value, kept.
 *
 * Every exercise saves itself, and it saves as text a person could read:
 * the weekly review is handed these rows verbatim, and "Self-trust: 3/10"
 * or "Picked: That never happened; You're too sensitive" is something it
 * can respond to. The site-wide textarea autosave only ever saw writing,
 * which left sliders, checklists and sorts invisible to the one feature
 * that is supposed to read across a week.
 *
 * localStorage on every change, because losing somebody's work is the
 * worst thing this product can do. The database a second after the last
 * change, one row per block, replaced rather than appended.
 */
export function usePersisted<T>(
  id: string,
  initial: T,
  /** How the review should read this value. Return "" to skip saving. */
  describe: (value: T) => { label: string; text: string }
): [T, (v: T) => void, "idle" | "saving" | "saved" | "local"] {
  const place = useSessionPlace();
  const [value, setValue] = useState<T>(initial);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "local">("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const loaded = useRef(false);

  useEffect(() => {
    const saved = readSaved<T>(place, id);
    if (saved !== null) setValue(saved);
    loaded.current = true;
    return () => { if (timer.current) clearTimeout(timer.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [place.program, place.week, place.day, id]);

  const update = (v: T) => {
    setValue(v);
    try {
      localStorage.setItem(storageKey(place, id), JSON.stringify(v));
    } catch {
      // Storage full or blocked: the database write below is still tried.
    }

    const { label, text } = describe(v);
    if (!text.trim()) return;

    setStatus("saving");
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(async () => {
      try {
        const res = await saveWorkbookPage({
          workbook: place.program,
          week: place.week,
          day: place.day,
          exerciseKey: id,
          content: { [label]: text },
          sessionId: deviceSessionId(),
        });
        setStatus(res.success ? "saved" : "local");
      } catch {
        setStatus("local");
      }
    }, 1000);
  };

  return [value, update, status];
}

export function SaveMark({ status }: { status: "idle" | "saving" | "saved" | "local" }) {
  if (status === "idle") return null;
  const text = { saving: "Saving…", saved: "Saved", local: "Saved on this device" }[status];
  return (
    <span className="text-[11px] font-bold text-slate-400" aria-live="polite">
      {text}
    </span>
  );
}

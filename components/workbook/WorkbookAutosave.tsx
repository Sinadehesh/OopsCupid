"use client";

import React, { useEffect, useRef, useState } from "react";
import { Check, Loader2, CloudOff } from "lucide-react";
import { saveWorkbookPage } from "@/app/actions/saveWorkbookEntry";
import { deviceSessionId } from "@/lib/workbook/session";

/**
 * KEEPS WHAT PEOPLE WRITE IN THE WORKBOOK.
 *
 * The workbook is 48 pages of exercises, each with its own hand-built
 * layout and its own useState. Four of them ever called the save action;
 * the other forty-four threw every word away on refresh — in a thing sold
 * for €49. And the weekly review reads across days, so a workbook that
 * forgets is a review that has nothing to read.
 *
 * Rewriting forty-four bespoke pages to share one input component would
 * have meant forty-four chances to break a layout. This does it from the
 * outside instead: one line per page, no change to the page's own state.
 *
 * How it works, and the honest limits:
 *
 *  - It finds the textareas on the page and watches them for input. That
 *    is deliberately independent of React, so it does not matter how each
 *    page wires its own state.
 *  - Restoring a value into a controlled React textarea needs the native
 *    value setter plus a synthetic input event; assigning `.value` alone
 *    is silently reverted on the next render.
 *  - Fields are keyed by their placeholder and question text rather than
 *    by position, so a page that shows a textarea conditionally does not
 *    shuffle everything saved under it.
 *  - The question above each box is saved alongside the answer. The review
 *    reads far better for knowing what was asked than it does from a
 *    variable name like `reflection2`.
 *
 * localStorage is written on every keystroke and the database 1.5 seconds
 * after typing stops: the local copy is the one that must never be lost,
 * the remote copy is the one the review needs.
 */

const DEBOUNCE_MS = 1500;

/** Set a controlled textarea's value so React notices the change. */
function setControlledValue(el: HTMLTextAreaElement, value: string) {
  const setter = Object.getOwnPropertyDescriptor(
    HTMLTextAreaElement.prototype,
    "value"
  )?.set;
  setter ? setter.call(el, value) : (el.value = value);
  el.dispatchEvent(new Event("input", { bubbles: true }));
}

/** The closest heading above a box in reading order. */
function headingBefore(el: Element): string {
  let node: Element | null = el.parentElement;
  while (node) {
    const found = [...node.querySelectorAll("h1, h2, h3, h4")].filter(
      (h) => h.compareDocumentPosition(el) & Node.DOCUMENT_POSITION_FOLLOWING
    );
    if (found.length) {
      const text = (found[found.length - 1].textContent ?? "").replace(/\s+/g, " ").trim();
      if (text.length >= 4) return text.slice(0, 120);
    }
    node = node.parentElement;
  }
  return "";
}

/**
 * The question a textarea is answering, as a reader would see it.
 *
 * Worth the care: this string is what the weekly review is handed as the
 * prompt for each answer. "Which of the three tools feels like the most
 * realistic emergency brake for you?" gives the review something to work
 * with. "reflection2" does not.
 *
 * The pages are hand-built, so the question sits in a <label>, a <p> or a
 * heading above the box depending on the day. Two failure modes to avoid:
 * grabbing a whole section wrapper (which swallows the page) and grabbing
 * a three-word stub like "Write to them".
 */
function questionFor(el: HTMLTextAreaElement): string {
  const clean = (s: string) => s.replace(/\s+/g, " ").trim();
  const isExample = (s: string) => /^e\.g\.|^for example/i.test(s);

  /**
   * Some days put the question in one column and the box in another, so the
   * only thing next to the box is a whole column. Reading that column's
   * text straight off runs the heading, the question and the worked example
   * together; its first paragraph is the question.
   */
  const proseInside = (container: Element): string => {
    for (const selector of ["label, p", "h1, h2, h3, h4"]) {
      for (const node of container.querySelectorAll(selector)) {
        const text = clean(node.textContent ?? "");
        if (text.length >= 15 && text.length <= 300 && !isExample(text)) return text;
      }
    }
    return "";
  };

  const labelled = el.id && document.querySelector(`label[for="${el.id}"]`);
  if (labelled?.textContent) return clean(labelled.textContent).slice(0, 220);

  const placeholder = clean(el.placeholder ?? "");
  const prose: string[] = [];
  const blocks: string[] = [];
  let heading = "";

  let node: Element | null = el;
  for (let depth = 0; node && depth < 4; depth++) {
    let sib: Element | null = node.previousElementSibling;
    while (sib) {
      const text = clean(sib.textContent ?? "");
      const tag = sib.tagName;
      // A wrapper that already contains this box's own placeholder is a
      // section, not a question — taking it pastes half the page in.
      const swallows = placeholder.length > 10 && text.includes(placeholder.slice(0, 30));
      if (!swallows && !isExample(text)) {
        if (text.length >= 15 && text.length <= 300) {
          if (/^(LABEL|P)$/.test(tag)) prose.push(text);
          else if (/^H[1-4]$/.test(tag)) { prose.push(text); heading ||= text; }
          else blocks.push(proseInside(sib) || text);
        } else if (text.length > 300) {
          // A wrapper: keep its own first paragraph, not the whole thing.
          const inner = proseInside(sib);
          if (inner) blocks.push(inner);
        }
      }
      sib = sib.previousElementSibling;
    }
    node = node.parentElement;
  }

  let question = prose[0] || blocks[0] || placeholder || "Reflection";
  // A stub reads as no question at all; the heading gives it its subject.
  // It also tells apart the five turns of a stepper that reuses one box:
  // "Name 5 things you can see" and "Name 4 things you can touch" share a
  // label, and without the heading they would overwrite each other.
  const above = heading || headingBefore(el);
  if (question.length < 45 && above && above !== question) {
    question = `${above} — ${question}`;
  }
  return question.slice(0, 220) || "Reflection";
}

/** A key that survives a page re-render and conditional rendering. */
function fieldKey(el: HTMLTextAreaElement, question: string): string {
  const basis = `${question} ${el.id || el.name || el.placeholder || ""}`;
  return basis
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 60) || "field";
}

export default function WorkbookAutosave({
  workbook,
  week,
  day,
  exerciseKey = "page",
}: {
  workbook: string;
  week: number;
  /** 0 for a week overview page, 1-7 for a day. */
  day: number;
  exerciseKey?: string;
}) {
  const [state, setState] = useState<"idle" | "saving" | "saved" | "local">("idle");
  const storageKey = `oc_wb:${workbook}:${week}:${day}`;
  const answers = useRef<Record<string, string>>({});
  const questions = useRef<Record<string, string>>({});
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  /** Boxes the reader has typed into: never overwrite those from storage. */
  const touched = useRef<WeakSet<HTMLTextAreaElement>>(new WeakSet());

  useEffect(() => {
    try {
      answers.current = JSON.parse(localStorage.getItem(storageKey) ?? "{}");
    } catch {
      answers.current = {};
    }

    /**
     * Re-read the page's boxes and their questions. This runs again on every
     * DOM change rather than once on mount, because several days put one box
     * inside a stepper: the element stays, the question above it changes, and
     * each step deserves its own saved answer.
     */
    const register = () => {
      document.querySelectorAll("textarea").forEach((el) => {
        const box = el as HTMLTextAreaElement;
        const question = questionFor(box);
        const key = fieldKey(box, question);
        if (box.dataset.ocKey === key) return;

        questions.current[key] = question;
        box.dataset.ocKey = key;
        // Readable in the inspector, and what the tests assert against
        // rather than a second copy of the extraction logic.
        box.dataset.ocQuestion = question;

        const saved = answers.current[key];
        if (saved && !box.value && !touched.current.has(box)) {
          setControlledValue(box, saved);
        }
      });
    };

    register();
    // Several pages reveal their exercises behind a step or a tab.
    const observer = new MutationObserver(register);
    observer.observe(document.body, { childList: true, subtree: true });

    const onInput = (event: Event) => {
      const box = event.target as HTMLTextAreaElement;
      if (!box || box.tagName !== "TEXTAREA") return;
      const key = box.dataset.ocKey;
      if (!key) return;
      touched.current.add(box);

      answers.current[key] = box.value;
      try {
        localStorage.setItem(storageKey, JSON.stringify(answers.current));
      } catch {
        // Full or disabled storage. The database write below is still tried.
      }

      setState("saving");
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(persist, DEBOUNCE_MS);
    };

    const persist = async () => {
      // Save under the question text: this is what the weekly review reads.
      const content: Record<string, string> = {};
      for (const [key, text] of Object.entries(answers.current)) {
        if (text.trim().length < 2) continue;
        content[questions.current[key] ?? key] = text.trim();
      }
      if (!Object.keys(content).length) {
        setState("idle");
        return;
      }

      try {
        const res = await saveWorkbookPage({
          workbook,
          week,
          day,
          exerciseKey,
          content,
          sessionId: deviceSessionId(),
        });
        setState(res.success ? "saved" : "local");
      } catch {
        setState("local");
      }
    };

    document.addEventListener("input", onInput, true);
    return () => {
      document.removeEventListener("input", onInput, true);
      observer.disconnect();
      if (timer.current) clearTimeout(timer.current);
    };
  }, [storageKey, workbook, week, day, exerciseKey]);

  if (state === "idle") return null;

  return (
    <div
      aria-live="polite"
      className="fixed bottom-4 right-4 z-50 flex items-center gap-2 rounded-full bg-slate-900/90 px-4 py-2 text-xs font-bold text-white shadow-lg backdrop-blur"
    >
      {state === "saving" && <><Loader2 className="h-3.5 w-3.5 animate-spin" /> Saving…</>}
      {state === "saved" && <><Check className="h-3.5 w-3.5 text-emerald-400" /> Saved</>}
      {state === "local" && <><CloudOff className="h-3.5 w-3.5 text-amber-400" /> Saved on this device</>}
    </div>
  );
}

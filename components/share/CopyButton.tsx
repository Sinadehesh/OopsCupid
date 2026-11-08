"use client";

import React, { useState } from "react";
import { Check, Copy } from "lucide-react";

/** One-tap copy for captions in the share kit. */
export default function CopyButton({ text, label = "Copy" }: { text: string; label?: string }) {
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setDone(true);
          setTimeout(() => setDone(false), 1500);
        } catch {
          // Clipboard blocked: the text is on screen to copy by hand.
        }
      }}
      className="inline-flex items-center gap-1.5 rounded-full bg-[#1A1033] text-white px-3 py-1.5 text-[12px] font-black shrink-0"
    >
      {done ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />} {done ? "Copied" : label}
    </button>
  );
}

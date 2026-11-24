"use client";

import React, { useState } from "react";
import { sticker } from "@/lib/ui/sticker";

const field = "w-full rounded-2xl border-[2.5px] border-[#1A1033] bg-white px-4 py-3 text-[16px] font-bold text-[#1A1033] outline-none focus:bg-[#FFF4FA]";

/**
 * A creator asks for their link. Saved as a lead with quizType "creator"
 * (the existing /api/leads), and listed for the owner at /creators/stats.
 */
export default function CreatorApply() {
  const [email, setEmail] = useState("");
  const [handle, setHandle] = useState("");
  const [platform, setPlatform] = useState("TikTok");
  const [followers, setFollowers] = useState("");
  const [note, setNote] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");

  const send = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("sending");
    setError("");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          quizType: "creator",
          profile: { handle: handle.trim().slice(0, 60), platform, followers: followers.trim().slice(0, 20), note: note.trim().slice(0, 500) },
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error ?? "Something went wrong. Please try again.");
      setState("sent");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setState("error");
    }
  };

  if (state === "sent") {
    return (
      <div className="rounded-[24px] bg-[#B8F2D8] p-5 border-[2.5px] border-[#1A1033] shadow-[4px_4px_0_#1A1033]">
        <p className="text-[20px] font-black mb-1">Got it 💌</p>
        <p className="text-[15px] font-semibold">We&apos;ll email you your link and your private sales page.</p>
      </div>
    );
  }

  return (
    <form onSubmit={send} className="space-y-3">
      <div>
        <label htmlFor="c-email" className="block text-[14px] font-black mb-1">Email, for your link and payouts</label>
        <input id="c-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" className={field} />
      </div>
      <div>
        <label htmlFor="c-handle" className="block text-[14px] font-black mb-1">Your handle</label>
        <input id="c-handle" required value={handle} onChange={(e) => setHandle(e.target.value)} placeholder="@yourname" className={field} />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="c-platform" className="block text-[14px] font-black mb-1">Where you post</label>
          <select id="c-platform" value={platform} onChange={(e) => setPlatform(e.target.value)} className={field}>
            {["TikTok", "Instagram", "YouTube", "Pinterest", "Other"].map((p) => (
              <option key={p}>{p}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="c-followers" className="block text-[14px] font-black mb-1">Followers (rough)</label>
          <input id="c-followers" value={followers} onChange={(e) => setFollowers(e.target.value)} placeholder="e.g. 12k" className={field} />
        </div>
      </div>
      <div>
        <label htmlFor="c-note" className="block text-[14px] font-black mb-1">Anything else (optional)</label>
        <textarea id="c-note" rows={3} value={note} onChange={(e) => setNote(e.target.value)} className={`${field} resize-none`} />
      </div>
      {error && <p className="text-[14px] font-bold text-[#C2185B]">{error}</p>}
      <button type="submit" disabled={state === "sending"} className={`w-full min-h-[58px] rounded-2xl bg-[#FF4FA3] text-white font-black text-lg disabled:opacity-60 ${sticker}`}>
        {state === "sending" ? "Sending…" : "Get my link"}
      </button>
    </form>
  );
}

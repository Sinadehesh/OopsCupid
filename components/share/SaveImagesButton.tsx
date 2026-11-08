"use client";

import React, { useEffect, useState } from "react";

/**
 * Save a set of images to the phone in one go. On phones this opens the
 * share sheet with every image attached ("Save Images" on iPhone, "Save" or
 * "Download" on Android); on a computer it downloads each file.
 *
 * Safari only allows the share sheet straight from a tap, so the images are
 * fetched first (on mount when `eager`, otherwise on the first tap) and
 * shared on the tap after.
 */
export default function SaveImagesButton({
  urls,
  name,
  eager = false,
  label = "Save all slides",
  className = "",
}: {
  urls: string[];
  name: string;
  eager?: boolean;
  label?: string;
  className?: string;
}) {
  const [files, setFiles] = useState<File[] | null>(null);
  const [state, setState] = useState<"idle" | "loading" | "ready" | "saved" | "error">("idle");
  const key = urls.join("|");

  const load = async () => {
    setState("loading");
    try {
      const loaded = await Promise.all(
        urls.map(async (u, i) => {
          const res = await fetch(u);
          if (!res.ok) throw new Error(String(res.status));
          return new File([await res.blob()], `${name}-${i + 1}.png`, { type: "image/png" });
        })
      );
      setFiles(loaded);
      setState("ready");
    } catch {
      setState("error");
    }
  };

  useEffect(() => {
    setFiles(null);
    setState("idle");
    if (eager) load();
    // Reload only when the set of images changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, eager]);

  const save = async () => {
    if (!files) {
      if (state !== "loading") await load();
      return;
    }
    const nav = navigator as Navigator & { canShare?: (data: ShareData) => boolean };
    if (nav.canShare?.({ files })) {
      try {
        await nav.share({ files });
        setState("saved");
      } catch {
        // She closed the share sheet; nothing to do.
      }
      return;
    }
    for (const f of files) {
      const a = document.createElement("a");
      a.href = URL.createObjectURL(f);
      a.download = f.name;
      document.body.appendChild(a);
      a.click();
      a.remove();
    }
    setState("saved");
  };

  const text =
    state === "loading"
      ? "Getting the images…"
      : state === "error"
        ? "Couldn't load them. Tap to try again"
        : state === "saved"
          ? "✅ Saved. Now open the app"
          : state === "ready" && !eager
            ? `📥 Tap again to save ${urls.length}`
            : `📥 ${label} (${urls.length})`;

  return (
    <button
      type="button"
      onClick={save}
      disabled={state === "loading"}
      className={`inline-flex items-center justify-center rounded-2xl bg-[#FF4FA3] text-white font-black px-4 py-3 text-[15px] border-[2.5px] border-[#1A1033] shadow-[3px_3px_0_#1A1033] disabled:opacity-70 ${className}`}
    >
      {text}
    </button>
  );
}

"use client";

import { useEffect } from "react";

/**
 * Recover from a deploy that happened while the tab was open.
 *
 * Every deploy renames the site's script and style files. A visitor who
 * loaded the page before a deploy and then taps a link asks for files from
 * the old build, which no longer exist: the page comes up unstyled or
 * half-broken, which is the worst possible moment if she was on her way to
 * a checkout. Vercel's fix for this (Skew Protection) is a paid feature,
 * so this does the simple thing instead: if one of our own build files
 * fails to load, reload the page once, which fetches the new build.
 *
 * Guarded so it can never loop: at most one reload a minute.
 */
const KEY = "oc_stale_reload";

function reloadOnce() {
  try {
    const last = Number(sessionStorage.getItem(KEY) || 0);
    if (Date.now() - last < 60_000) return;
    sessionStorage.setItem(KEY, String(Date.now()));
  } catch {
    // No storage: still reload, the browser's own cache rules stop a loop.
  }
  window.location.reload();
}

export default function StaleAssetReload() {
  useEffect(() => {
    const onError = (e: Event) => {
      const el = e.target as HTMLElement | null;
      const url = (el as HTMLLinkElement)?.href || (el as HTMLScriptElement)?.src || "";
      if ((el?.tagName === "LINK" || el?.tagName === "SCRIPT") && url.includes("/_next/static/")) reloadOnce();
    };
    const onRejection = (e: PromiseRejectionEvent) => {
      const msg = String(e.reason?.message ?? e.reason ?? "");
      if (/ChunkLoadError|Loading (CSS )?chunk|Failed to load (chunk|css)|dynamically imported module/i.test(msg)) reloadOnce();
    };
    // Load errors don't bubble, so listen in the capture phase.
    window.addEventListener("error", onError, true);
    window.addEventListener("unhandledrejection", onRejection);
    return () => {
      window.removeEventListener("error", onError, true);
      window.removeEventListener("unhandledrejection", onRejection);
    };
  }, []);
  return null;
}

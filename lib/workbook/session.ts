/**
 * A per-device id for grouping one person's workbook entries.
 *
 * Signing in is optional on this site, so the weekly review cannot rely on
 * a user id to know which entries belong together. This random id, kept in
 * localStorage, is what ties Monday's writing to Friday's.
 *
 * It is deliberately not derived from anything about the person: it is a
 * random value that means nothing outside this browser.
 */
export const WORKBOOK_SESSION_KEY = "oc_workbook_session";

/** Fallback when storage is blocked: unique to this tab, never shared. */
let memoryId: string | null = null;

function freshId(): string {
  try {
    return crypto.randomUUID();
  } catch {
    return `m-${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
  }
}

export function deviceSessionId(): string {
  try {
    let id = localStorage.getItem(WORKBOOK_SESSION_KEY);
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem(WORKBOOK_SESSION_KEY, id);
    }
    return id;
  } catch {
    // Private browsing, or storage disabled. A shared value such as
    // "anonymous" would pool every such reader into one review, quoting
    // strangers to each other, so this tab gets its own id instead. It
    // lasts until the tab closes, which is enough for a session's work.
    if (!memoryId) memoryId = freshId();
    return memoryId;
  }
}

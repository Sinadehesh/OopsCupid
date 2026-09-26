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

export function deviceSessionId(): string {
  try {
    let id = localStorage.getItem(WORKBOOK_SESSION_KEY);
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem(WORKBOOK_SESSION_KEY, id);
    }
    return id;
  } catch {
    // Private browsing, or storage disabled. The entry still saves; it just
    // cannot be grouped with the rest of the week.
    return "anonymous";
  }
}

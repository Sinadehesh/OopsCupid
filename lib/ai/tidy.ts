/**
 * The site's copy has no em or en dashes, and models reach for them however
 * firmly they are told not to. Anything under a "quote" key is left exactly
 * as the reader wrote it; everything the model wrote itself is tidied.
 */
export function tidy<T>(v: T, key = ""): T {
  if (typeof v === "string") {
    if (key === "quote") return v;
    return v
      .replace(/(\d)\s*[–—]\s*(\d)/g, "$1-$2")
      .replace(/\s*[–—]\s*/g, ", ")
      .replace(/,\s*([,.;:!?])/g, "$1") as T;
  }
  if (Array.isArray(v)) return v.map((x) => tidy(x, key)) as T;
  if (v && typeof v === "object") {
    return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, tidy(x, k)])) as T;
  }
  return v;
}

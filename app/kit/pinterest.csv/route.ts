import { KIT, SITE } from "@/lib/share/kit";

export const dynamic = "force-dynamic";

/**
 * Pinterest's bulk upload file: one pin per quiz, spread over the next two
 * weeks at three a day so a new account doesn't post everything at once.
 * The board has to exist with exactly this name before uploading.
 */
const BOARD = "Relationship Quizzes";
const SLOTS = [9, 14, 20];

const cell = (v: string) => `"${v.replace(/"/g, '""')}"`;

export function GET() {
  const start = new Date();
  start.setUTCDate(start.getUTCDate() + 1);
  const rows = KIT.map((k, i) => {
    const day = new Date(start);
    day.setUTCDate(start.getUTCDate() + Math.floor(i / SLOTS.length));
    day.setUTCHours(SLOTS[i % SLOTS.length], 0, 0, 0);
    const link = `${k.url}?utm_source=pinterest&utm_medium=social&utm_campaign=pins`;
    return [k.pinTitle, `${SITE}/pins/${k.slug}.png`, BOARD, "", k.pinDescription, link, day.toISOString().slice(0, 19), "relationship quiz, dating quiz, free quiz"]
      .map(cell)
      .join(",");
  });
  const csv = ["Title,Media URL,Pinterest board,Thumbnail,Description,Link,Publish date,Keywords", ...rows].join("\n");
  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="oopscupid-pins.csv"',
    },
  });
}

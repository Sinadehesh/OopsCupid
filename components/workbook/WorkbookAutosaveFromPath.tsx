"use client";

import { usePathname } from "next/navigation";
import WorkbookAutosave from "./WorkbookAutosave";

/**
 * Turns the URL into the autosave's coordinates, so persistence arrives by
 * being in the workbook rather than by each of forty-eight pages
 * remembering to ask for it. A day added later is covered the moment its
 * route exists.
 *
 *   /workbook/anxious-attachment/week-3/day-2  ->  week 3, day 2
 *   /workbook/anxious-attachment/week-3        ->  week 3, day 0
 */
export default function WorkbookAutosaveFromPath() {
  const path = usePathname() ?? "";
  const match = path.match(/^\/workbook\/([^/]+)(?:\/week-(\d+))?(?:\/day-(\d+))?/);
  if (!match) return null;

  const [, workbook, week, day] = match;
  if (!week) return null; // The workbook's front page sells; it does not collect.

  return (
    <WorkbookAutosave workbook={workbook} week={Number(week)} day={day ? Number(day) : 0} />
  );
}

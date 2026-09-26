'use server';

import type { Prisma } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';

interface WorkbookEntry {
  workbook: string;
  week: number;
  day: number;
  exerciseKey: string;
  content: Record<string, unknown>;
  sessionId?: string;
}

export async function saveWorkbookEntry(entry: WorkbookEntry) {
  try {
    // Signing in is optional, and auth() throws rather than returning null
    // when it is misconfigured — which must not cost someone their work.
    let userId: string | undefined;
    try {
      const session = await auth();
      userId = session?.user?.id ?? undefined;
    } catch {
      userId = undefined;
    }

    await prisma.workbookEntry.create({
      data: {
        workbook: entry.workbook,
        week: entry.week,
        day: entry.day,
        exerciseKey: entry.exerciseKey,
        content: entry.content as Prisma.InputJsonValue,
        sessionId: entry.sessionId,
        userId,
      },
    });
    return { success: true };
  } catch (error) {
    // This used to fail on every call and say nothing. Loud now: losing
    // someone's written work is the worst failure this product has.
    console.error('[saveWorkbookEntry] FAILED — user work lost:', error);
    return { success: false };
  }
}

/**
 * Save the answers on one workbook page, replacing what was there before.
 *
 * The autosave fires every time someone stops typing for a moment, so
 * `create` would leave thirty rows for one paragraph and the weekly review
 * would read the same half-finished sentence thirty times. One row per
 * (person, workbook, week, day, exercise) is what the review expects.
 *
 * Replace rather than update because the set of keys changes as they fill
 * the page in, and a partial update would leave stale answers behind.
 */
export async function saveWorkbookPage(entry: WorkbookEntry) {
  if (!entry.sessionId) {
    // Without a session id there is nothing to replace against, and
    // appending would duplicate. Fall back to a plain insert.
    return saveWorkbookEntry(entry);
  }

  try {
    let userId: string | undefined;
    try {
      const session = await auth();
      userId = session?.user?.id ?? undefined;
    } catch {
      userId = undefined;
    }

    const where = {
      sessionId: entry.sessionId,
      workbook: entry.workbook,
      week: entry.week,
      day: entry.day,
      exerciseKey: entry.exerciseKey,
    };

    await prisma.$transaction([
      prisma.workbookEntry.deleteMany({ where }),
      prisma.workbookEntry.create({
        data: { ...where, content: entry.content as Prisma.InputJsonValue, userId },
      }),
    ]);
    return { success: true };
  } catch (error) {
    console.error('[saveWorkbookPage] FAILED — user work lost:', error);
    return { success: false };
  }
}

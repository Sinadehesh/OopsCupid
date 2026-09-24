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

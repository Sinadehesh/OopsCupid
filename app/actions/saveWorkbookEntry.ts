'use server';

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
    const session = await auth();
    const userId = session?.user?.id ?? undefined;

    await prisma.workbookEntry.create({
      data: {
        workbook: entry.workbook,
        week: entry.week,
        day: entry.day,
        exerciseKey: entry.exerciseKey,
        content: entry.content,
        sessionId: entry.sessionId,
        userId,
      },
    });
    return { success: true };
  } catch (error) {
    console.error('WorkbookEntry save failed:', error);
    return { success: false };
  }
}

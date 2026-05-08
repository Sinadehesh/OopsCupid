'use server';

import { prisma } from '@/lib/prisma';

export async function saveWorkbookEntry({
  workbook,
  week,
  day,
  exerciseKey,
  content,
  sessionId,
}: {
  workbook: string;
  week: number;
  day: number;
  exerciseKey: string;
  content: Record<string, unknown>;
  sessionId?: string;
}) {
  try {
    await prisma.workbookEntry.create({
      data: { workbook, week, day, exerciseKey, content, sessionId },
    });
    return { success: true };
  } catch (error) {
    console.error('WorkbookEntry save failed:', error);
    return { success: false };
  }
}

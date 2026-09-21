-- Purchase table (Stripe payments).
--
-- ALREADY APPLIED to the Neon project "oopscupid-celeste-house"
-- (raspy-field-98840356) on 2026-09-21. Kept here so the schema change is
-- reproducible — this repo uses `prisma db push`, so there is no
-- migrations history to read it from.
--
-- Index names match Prisma's conventions so `prisma db push` sees the
-- database as already in sync and does not try to recreate them.

CREATE TABLE IF NOT EXISTS "Purchase" (
  "id"              TEXT NOT NULL,
  "stripeSessionId" TEXT NOT NULL,
  "sku"             TEXT NOT NULL,
  "email"           TEXT,
  "amountTotal"     INTEGER NOT NULL,
  "currency"        TEXT NOT NULL DEFAULT 'eur',
  "status"          TEXT NOT NULL DEFAULT 'paid',
  "needsScheduling" BOOLEAN NOT NULL DEFAULT false,
  "createdAt"       TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Purchase_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "Purchase_stripeSessionId_key" ON "Purchase"("stripeSessionId");
CREATE INDEX IF NOT EXISTS "Purchase_email_idx" ON "Purchase"("email");
CREATE INDEX IF NOT EXISTS "Purchase_needsScheduling_idx" ON "Purchase"("needsScheduling");

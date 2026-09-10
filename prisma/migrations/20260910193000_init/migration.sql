-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "Audience" AS ENUM ('VISITED', 'MISSED');

-- CreateEnum
CREATE TYPE "SheetSyncStatus" AS ENUM ('pending', 'synced', 'failed');

-- CreateTable
CREATE TABLE "FeedbackSubmission" (
    "id" UUID NOT NULL,
    "audience" "Audience" NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "emailNormalized" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "phoneNormalized" TEXT NOT NULL,
    "answers" JSONB NOT NULL,
    "locale" TEXT NOT NULL,
    "sheetSyncStatus" "SheetSyncStatus" NOT NULL DEFAULT 'pending',
    "sheetSyncedAt" TIMESTAMP(3),
    "sheetError" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FeedbackSubmission_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "FeedbackSubmission_sheetSyncStatus_createdAt_idx" ON "FeedbackSubmission"("sheetSyncStatus", "createdAt");

-- CreateIndex
CREATE INDEX "FeedbackSubmission_createdAt_idx" ON "FeedbackSubmission"("createdAt");

-- CreateIndex
CREATE INDEX "FeedbackSubmission_emailNormalized_idx" ON "FeedbackSubmission"("emailNormalized");

-- CreateIndex
CREATE INDEX "FeedbackSubmission_phoneNormalized_idx" ON "FeedbackSubmission"("phoneNormalized");

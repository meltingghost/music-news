/*
  Warnings:

  - You are about to alter the column `embedding` on the `NewsArticle` table. The data in that column could be lost. The data in that column will be cast from `Text` to `Unsupported("vector(1536)")`.

*/
-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "vector";

-- AlterTable
ALTER TABLE "NewsArticle"
ALTER COLUMN "embedding" TYPE vector USING embedding::vector;

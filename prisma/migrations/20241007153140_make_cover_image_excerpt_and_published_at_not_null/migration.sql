/*
  Warnings:

  - Made the column `coverImage` on table `Post` required. This step will fail if there are existing NULL values in that column.
  - Made the column `excerpt` on table `Post` required. This step will fail if there are existing NULL values in that column.
  - Made the column `publishedAt` on table `Post` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "coverImage" SET NOT NULL,
ALTER COLUMN "excerpt" SET NOT NULL,
ALTER COLUMN "publishedAt" SET NOT NULL;

/*
  Warnings:

  - Made the column `contentTranslations` on table `Post` required. This step will fail if there are existing NULL values in that column.
  - Made the column `excerptTranslations` on table `Post` required. This step will fail if there are existing NULL values in that column.
  - Made the column `titleTranslations` on table `Post` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "contentTranslations" SET NOT NULL,
ALTER COLUMN "excerptTranslations" SET NOT NULL,
ALTER COLUMN "titleTranslations" SET NOT NULL;

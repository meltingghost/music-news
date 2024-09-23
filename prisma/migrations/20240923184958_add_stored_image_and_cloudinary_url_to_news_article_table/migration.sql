/*
  Warnings:

  - A unique constraint covering the columns `[cloudinaryUrl]` on the table `NewsArticle` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "NewsArticle" ADD COLUMN     "cloudinaryUrl" TEXT,
ADD COLUMN     "storedImage" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX "NewsArticle_cloudinaryUrl_key" ON "NewsArticle"("cloudinaryUrl");

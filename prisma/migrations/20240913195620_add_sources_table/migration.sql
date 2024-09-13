/*
  Warnings:

  - Added the required column `sourceId` to the `NewsArticle` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Sources" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "Sources_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Sources_url_key" ON "Sources"("url");

-- AddForeignKey
ALTER TABLE "NewsArticle" ADD CONSTRAINT "NewsArticle_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "Sources"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Post";

-- CreateTable
CREATE TABLE "NewsArticle" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "description" TEXT,
    "age" TEXT,
    "pageAge" TIMESTAMP(3) NOT NULL,
    "scheme" TEXT NOT NULL,
    "netloc" TEXT NOT NULL,
    "hostname" TEXT NOT NULL,
    "favicon" TEXT,
    "path" TEXT,
    "thumbnail" TEXT,

    CONSTRAINT "NewsArticle_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "NewsArticle_url_key" ON "NewsArticle"("url");

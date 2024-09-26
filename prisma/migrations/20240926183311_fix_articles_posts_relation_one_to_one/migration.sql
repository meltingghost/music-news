/*
  Warnings:

  - A unique constraint covering the columns `[articleId]` on the table `Post` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Post_articleId_key" ON "Post"("articleId");

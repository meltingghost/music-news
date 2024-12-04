/*
  Warnings:

  - A unique constraint covering the columns `[nameEn]` on the table `Tags` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[nameEs]` on the table `Tags` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Tags_nameEn_key" ON "Tags"("nameEn");

-- CreateIndex
CREATE UNIQUE INDEX "Tags_nameEs_key" ON "Tags"("nameEs");

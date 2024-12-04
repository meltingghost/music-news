/*
  Warnings:

  - You are about to drop the column `name` on the `Tags` table. All the data in the column will be lost.
  - Added the required column `nameEn` to the `Tags` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nameEs` to the `Tags` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Tags_name_key";

-- AlterTable
ALTER TABLE "Tags" DROP COLUMN "name",
ADD COLUMN     "nameEn" TEXT NOT NULL,
ADD COLUMN     "nameEs" TEXT NOT NULL;

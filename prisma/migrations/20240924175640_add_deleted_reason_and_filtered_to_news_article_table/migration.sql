-- AlterTable
ALTER TABLE "NewsArticle" ADD COLUMN     "deletedReason" TEXT,
ADD COLUMN     "filtered" BOOLEAN NOT NULL DEFAULT false;

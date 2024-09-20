-- AlterTable
ALTER TABLE "NewsArticle" ADD COLUMN     "embedding" TEXT,
ADD COLUMN     "vectorized" BOOLEAN NOT NULL DEFAULT false;

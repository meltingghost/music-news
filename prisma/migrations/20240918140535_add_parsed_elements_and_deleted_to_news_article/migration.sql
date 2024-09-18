-- AlterTable
ALTER TABLE "NewsArticle" ADD COLUMN     "deleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "parsed" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "parsedContent" TEXT,
ADD COLUMN     "parsedExcerpt" TEXT,
ADD COLUMN     "parsedTitle" TEXT;

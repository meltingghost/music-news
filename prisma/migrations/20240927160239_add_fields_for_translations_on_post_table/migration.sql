-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "contentTranslations" JSONB,
ADD COLUMN     "excerptTranslations" JSONB,
ADD COLUMN     "titleTranslations" JSONB;

-- AlterTable
ALTER TABLE "Post" ADD COLUMN "searchableText" TEXT;

-- Add a tsvector column for full-text search
ALTER TABLE "Post" ADD COLUMN "searchVector" tsvector;

-- Populate the searchVector column with concatenated data
UPDATE "Post" 
SET "searchVector" = to_tsvector('english', 
  coalesce("titleTranslations"->>'en', '') || ' ' ||
  coalesce("contentTranslations"->>'en', '') || ' ' ||
  coalesce("excerptTranslations"->>'en', '')
);

ALTER TABLE "Post" ADD COLUMN "searchVectorEs" tsvector;

UPDATE "Post" 
SET "searchVectorEs" = to_tsvector('spanish', 
  coalesce("titleTranslations"->>'es', '') || ' ' ||
  coalesce("contentTranslations"->>'es', '') || ' ' ||
  coalesce("excerptTranslations"->>'es', '')
);

-- Add a GIN index for fast search
CREATE INDEX "post_search_idx" ON "Post" USING GIN ("searchVector");

CREATE INDEX "post_search_es_idx" ON "Post" USING GIN ("searchVectorEs");

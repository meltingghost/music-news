-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "searchableText" TEXT;

-- Add a tsvector column for full-text search
ALTER TABLE "Post" ADD COLUMN "searchVector" tsvector;

-- Populate the searchVector column with concatenated data
UPDATE "Post" 
SET "searchVector" = 
    to_tsvector('english', coalesce("titleTranslations"->>'en', '') || ' ' ||
                           coalesce("contentTranslations"->>'en', '') || ' ' ||
                           coalesce("excerptTranslations"->>'en', ''));

-- Add a GIN index for fast search
CREATE INDEX "post_search_idx" ON "Post" USING GIN ("searchVector");

-- Add a trigger to keep the tsvector updated
CREATE OR REPLACE FUNCTION update_search_vector() RETURNS trigger AS $$
BEGIN
  NEW."searchVector" := to_tsvector('english', 
    coalesce(NEW."titleTranslations"->>'en', '') || ' ' ||
    coalesce(NEW."contentTranslations"->>'en', '') || ' ' ||
    coalesce(NEW."excerptTranslations"->>'en', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER "post_search_trigger"
BEFORE INSERT OR UPDATE ON "Post"
FOR EACH ROW
EXECUTE FUNCTION update_search_vector();


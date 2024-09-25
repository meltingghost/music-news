-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "coverImage" TEXT,
    "excerpt" TEXT,
    "publishedAt" TIMESTAMP(3),
    "postedToTwitter" BOOLEAN NOT NULL DEFAULT false,
    "tweetId" INTEGER,
    "postedToLinkedin" BOOLEAN NOT NULL DEFAULT false,
    "linkedinPostId" INTEGER,
    "postedToInstagram" BOOLEAN NOT NULL DEFAULT false,
    "instagramMediaId" INTEGER,
    "postedToFacebook" BOOLEAN NOT NULL DEFAULT false,
    "facebookPostId" INTEGER,
    "articleId" INTEGER NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Post_slug_key" ON "Post"("slug");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "NewsArticle"("id") ON DELETE CASCADE ON UPDATE CASCADE;

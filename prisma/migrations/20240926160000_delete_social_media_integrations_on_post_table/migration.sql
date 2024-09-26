/*
  Warnings:

  - You are about to drop the column `facebookPostId` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `instagramMediaId` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `linkedinPostId` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `postedToFacebook` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `postedToInstagram` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `postedToLinkedin` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `postedToTwitter` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `tweetId` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "facebookPostId",
DROP COLUMN "instagramMediaId",
DROP COLUMN "linkedinPostId",
DROP COLUMN "postedToFacebook",
DROP COLUMN "postedToInstagram",
DROP COLUMN "postedToLinkedin",
DROP COLUMN "postedToTwitter",
DROP COLUMN "tweetId";

import prisma from "@/lib/prisma";
import NewsArticle from "@/interfaces/newsArticle";

export default interface Post {
  id: number;
  slug: string;
  title: string;
  content: string;
  createdAt: Date;
  coverImage: string;
  excerpt: string;
  publishedAt: Date;
  article: NewsArticle;
  articleId: number;
  titleTranslations: PrismaJson.TitleTranslations | null;
  contentTranslations: PrismaJson.ContentTranslations | null;
  excerptTranslations: PrismaJson.ExcerptTranslations | null;
}

import prisma from "@/lib/prisma";
import { Post } from "@prisma/client";

export async function getPaginatedPosts(
  skip: number,
  take: number,
  locale: "en" | "es" = "en"
): Promise<Post[]> {
  const posts = await prisma.post.findMany({
    skip,
    take,
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      slug: true,
      coverImage: true,
      publishedAt: true,
      titleTranslations: true,
      contentTranslations: true,
      excerptTranslations: true,
    },
  });

  return posts.map((post) => ({
    ...post,
    title: post.titleTranslations?.[locale],
    content: post.contentTranslations?.[locale],
    excerpt: post.excerptTranslations?.[locale],
  })) as Post[];
}

export async function getPostBySlug(slug: string, locale: "en" | "es" = "en") {
  const post = await prisma.post.findUnique({
    where: { slug },
    select: {
      slug: true,
      titleTranslations: true,
      contentTranslations: true,
      coverImage: true,
      publishedAt: true,
    },
  });

  if (!post) return null;

  const title = post.titleTranslations[locale];
  const content = post.contentTranslations[locale];

  return { ...post, title, content };
}

export async function fetchMorePosts(
  skip: number,
  take: number,
  locale: "en" | "es"
) {
  return await getPaginatedPosts(skip, take, locale);
}
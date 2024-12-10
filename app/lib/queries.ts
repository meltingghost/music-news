import prisma from "@/lib/prisma";
import { Post } from "@prisma/client";

export async function getPaginatedPosts(
  skip: number,
  take: number,
  locale: "en" | "es" = "en"
) {
  const [posts, totalPosts] = await Promise.all([
    prisma.post.findMany({
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
    }),
    prisma.post.count(),
  ]);

  return {
    posts: posts.map((post) => ({
      ...post,
      title: post.titleTranslations?.[locale],
      content: post.contentTranslations?.[locale],
      excerpt: post.excerptTranslations?.[locale],
    })) as Post[],
    totalPosts,
  };
}

// export async function getPaginatedPostsByCategory(
//   take: number,
//   locale: "en" | "es" = "en",
//   categoryId?: number,
//   excludedIds: number[] = []
// ): Promise<Post[]> {
//   const posts = await prisma.post.findMany({
//     take,
//     where: {
//       categoryId,
//       id: {
//         notIn: excludedIds,
//       },
//     },
//     orderBy: {
//       createdAt: "desc",
//     },
//     select: {
//       id: true,
//       slug: true,
//       coverImage: true,
//       publishedAt: true,
//       titleTranslations: true,
//       contentTranslations: true,
//       excerptTranslations: true,
//     },
//   });

//   return posts.map((post) => ({
//     ...post,
//     title: post.titleTranslations?.[locale],
//     content: post.contentTranslations?.[locale],
//     excerpt: post.excerptTranslations?.[locale],
//   })) as Post[];
// }

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

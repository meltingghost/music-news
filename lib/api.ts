import { Post } from "@prisma/client";
import prisma from "@/lib/prisma";

export async function getPaginatedPosts(
  skip: number,
  take: number
): Promise<Post[]> {
  const posts = await prisma.post.findMany({
    skip,
    take,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      article: {
        select: {
          id: true,
          type: true,
          title: true,
          url: true,
        },
      },
    },
  });

  return posts as Post[];
}

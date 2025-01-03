import { Post } from "@prisma/client";
import { Locale } from "@/app/[locale]/components/posts-logic";

export async function fetchTags(locale: Locale) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/tags/tags?locale=${locale}`);
  if (!res.ok) {
    console.error("Error fetching tags:", res.statusText);
    return [];
  }
  return res.json();
}

export async function fetchMorePosts(
  skip: number,
  take: number,
  locale: Locale
): Promise<{ posts: Post[]; totalPosts: number }> {
  const res = await fetch(
    `/api/posts?skip=${skip}&take=${take}&locale=${locale}`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch more posts");
  }
  return res.json();
}

// export async function fetchMorePostsByCategory(
//   take: number,
//   locale: "en" | "es",
//   categoryId: number,
//   loadedPostIds: number[]
// ): Promise<Post[]> {
//   const res = await fetch(
//     `/api/posts?take=${take}&locale=${locale}&categoryId=${categoryId}&loadedPostIds=${loadedPostIds.join(
//       ","
//     )}`
//   );

//   if (!res.ok) {
//     throw new Error("Failed to fetch more posts");
//   }

//   const data = await res.json();
//   return data;
// }

// export async function getPostsByCategory(
//   categoryId: number,
//   skip: number,
//   take: number,
//   locale: "en" | "es" = "en"
// ): Promise<Post[]> {
//   const posts = await prisma.post.findMany({
//     where: {
//       categoryId: categoryId,
//     },
//     include: {
//       category: true,
//     },
//     skip,
//     take,
//     orderBy: {
//       createdAt: "desc",
//     },
//   });

//   return posts.map((post) => ({
//     ...post,
//     title: post.titleTranslations?.[locale],
//     content: post.contentTranslations?.[locale],
//     excerpt: post.excerptTranslations?.[locale],
//   })) as Post[];
// }

export async function fetchPostsBySearchResult(
  searchQuery: string,
  skip: number,
  take: number,
  locale: Locale
): Promise<Post[]> {
  const response = await fetch(
    `/api/search?query=${encodeURIComponent(
      searchQuery
    )}&skip=${skip}&take=${take}&locale=${locale}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }

  return response.json();
}

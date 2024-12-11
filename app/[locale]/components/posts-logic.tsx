import { getPaginatedPosts } from "@/app/lib/queries";

export type Locale = "en" | "es";

export async function fetchInitialPosts(locale: Locale) {
  const carrouselPostsCount = 6;
  const morePostsCount = 9;

  const { posts, totalPosts } = await getPaginatedPosts(
    carrouselPostsCount,
    morePostsCount,
    locale
  );

  return { posts, totalPosts };
}

export async function fetchCarrouselPosts(locale: Locale) {
  const carrouselPostsCount = 6;

  const carrouselPosts = await getPaginatedPosts(
    0,
    carrouselPostsCount,
    locale
  );

  return { carrouselPosts };
}

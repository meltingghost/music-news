// TODO: Add skeleton loading (Suspense)
import React from "react";
import Container from "@/app/[locale]/components/container";
import { Navbar } from "@/app/[locale]/components/navbar";
import Carrousel from "@/app/[locale]/components/carrousel";
import { MorePosts } from "@/app/[locale]/components/more-posts";
import { getPaginatedPosts } from "@/app/lib/queries";

type Locale = "en" | "es";

type Props = {
  params: {
    locale: Locale;
  };
};

export default async function Index({ params: { locale } }: Props) {
  const carrouselPostsCount = 6;
  const morePostsCount = 9;

  const [{ posts: carrouselPosts }, { posts: initialMorePosts, totalPosts }] =
    await Promise.all([
      getPaginatedPosts(0, carrouselPostsCount, locale),
      getPaginatedPosts(carrouselPostsCount, morePostsCount, locale),
    ]);

  return (
    <main>
      <Navbar />
      <Carrousel posts={carrouselPosts} />
      <Container>
        {initialMorePosts.length > 0 && (
          <MorePosts
            initialPosts={initialMorePosts}
            totalPosts={totalPosts}
            locale={locale}
          />
        )}
      </Container>
    </main>
  );
}

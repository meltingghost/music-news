import React from "react";
import Container from "@/app/[locale]/components/container";
import { Navbar } from "@/app/[locale]/components/navbar";
import { Carrousel } from "@/app/[locale]/components/carrousel";
import { MorePosts } from "@/app/[locale]/components/more-posts";
import { getPaginatedPosts } from "@/app/actions";

type Locale = "en" | "es";

type Props = {
  params: {
    locale: Locale;
  };
};

export default async function Index({ params: { locale } }: Props) {
  const carrouselPostsCount = 6;
  const morePostsCount = 9;

  const carrouselPosts = await getPaginatedPosts(
    0,
    carrouselPostsCount,
    locale
  );
  const initialMorePosts = await getPaginatedPosts(
    carrouselPostsCount,
    morePostsCount,
    locale
  );

  return (
    <main>
      <Navbar />
      <Carrousel posts={carrouselPosts} />
      <Container>
        {initialMorePosts.length > 0 && (
          <MorePosts initialPosts={initialMorePosts} locale={locale} />
        )}
      </Container>
    </main>
  );
}

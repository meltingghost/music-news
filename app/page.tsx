import React from "react";
import Container from "@/app/components/container";
import { Navbar } from "@/app/components/navbar";
import { Carrousel } from "@/app/components/carrousel";
import { MoreStories } from "@/app/components/more-stories";
import { getPaginatedPosts } from "@/lib/api";

export default async function Index() {
  const carrouselPostsCount = 5;
  const morePostsCount = 7;

  const carrouselPosts = await getPaginatedPosts(0, carrouselPostsCount);

  const morePosts = await getPaginatedPosts(
    carrouselPostsCount,
    morePostsCount
  );

  return (
    <main>
      <Navbar />
      <Carrousel posts={carrouselPosts} />
      <Container>
        {morePosts.length > 0 && <MoreStories posts={morePosts} />}
      </Container>
    </main>
  );
}

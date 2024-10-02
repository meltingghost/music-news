import React from "react";
import Container from "@/app/components/container";
import { Navbar } from "@/app/components/navbar";
import { Carrousel } from "@/app/components/carrousel";
import { MoreStories } from "@/app/components/more-stories";
import { getAllPosts } from "@/app/hooks/posts";

export default async function Index() {
  const allPosts = await getAllPosts();
  const morePosts = allPosts.slice(7);

  return (
    <main>
      <Navbar />
      <Carrousel posts={allPosts.slice(0, 5)} />
      <Container>
        {morePosts.length > 5 && <MoreStories posts={morePosts} />}
      </Container>
    </main>
  );
}

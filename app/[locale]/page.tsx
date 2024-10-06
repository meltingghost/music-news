import React from "react";
import Container from "@/app/[locale]/components/container";
import { Navbar } from "@/app/[locale]/components/navbar";
import { Carrousel } from "@/app/[locale]/components/carrousel";
import { MorePosts } from "@/app/[locale]/components/more-posts";
import { getAllPosts } from "@/app/[locale]/hooks/posts";

type Locale = "en" | "es";

type Props = {
  params: {
    locale: Locale;
  };
};

export default async function Index({ params: { locale } }: Props) {
  const allPosts = await getAllPosts(locale);
  const morePosts = allPosts.slice(6);

  return (
    <main>
      <Navbar />
      <Carrousel posts={allPosts.slice(0, 6)} />
      <Container>
        {morePosts.length > 5 && <MorePosts posts={morePosts} />}
      </Container>
    </main>
  );
}

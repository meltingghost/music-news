"use client";

import React, { useState } from "react";
import { Post } from "@prisma/client";
import { fetchMorePosts } from "@/app/lib/fetches";
import { useTranslations } from "next-intl";
import PostDisplayed from "@/app/[locale]/components/posts-displayed";

type ShowMoreButtonProps = {
  initialPosts: Post[];
  totalPosts: number;
  locale: "en" | "es";
};

export default function ShowMoreLogic({
  initialPosts,
  totalPosts,
  locale,
}: ShowMoreButtonProps) {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [loading, setLoading] = useState(false);
  const [allPostsLoaded, setAllPostsLoaded] = useState(
    initialPosts.length >= totalPosts
  );

  const t = useTranslations("HomePage");

  const handleShowMore = async () => {
    setLoading(true);
    try {
      const { posts: newPosts, totalPosts: updatedTotalPosts } =
        await fetchMorePosts(posts.length + 6, 9, locale);

      if (newPosts.length > 0) {
        setPosts((prevPosts) => [...prevPosts, ...newPosts]);
      }

      if (posts.length + 6 + newPosts.length >= updatedTotalPosts) {
        setAllPostsLoaded(true);
      }
    } catch (error) {
      console.error("Error al cargar más posts:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col">
      <PostDisplayed initialPosts={posts} />
      {!allPostsLoaded && (
        <button
          className="border-solid border-2 w-60 self-center my-8 border-black text-black dark:border-white dark:text-white font-bold py-3 px-8 mb-10 rounded hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black duration-200 transition-colors"
          onClick={handleShowMore}
          disabled={loading}
        >
          {loading ? t("loading") : t("showMore")}
        </button>
      )}
    </div>
  );
}

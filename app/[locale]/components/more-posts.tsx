"use client";

import React, { useState } from "react";
import { PostPreview } from "@/app/[locale]/components/post-preview";
import { useTranslations } from "next-intl";
import { Post } from "@prisma/client";
import { fetchMorePosts } from "@/app/lib/api";

type Props = {
  initialPosts: Post[];
  totalPosts: number;
  locale: "en" | "es";
};

export function MorePosts({ initialPosts, totalPosts, locale }: Props) {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [visiblePosts, setVisiblePosts] = useState<number>(initialPosts.length);
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
        setVisiblePosts((prevVisible) => prevVisible + newPosts.length);
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
    <section>
      <h2 className="mb-8 text-5xl md:text-7xl font-bold tracking-tighter leading-tight">
        {t("more")}
      </h2>

      <div className="flex flex-wrap -m-4">
        {posts.slice(0, visiblePosts).map((post) => (
          <div
            key={post.slug}
            className="p-4 w-full md:w-1/3 lg:w-1/3 flex-grow"
          >
            <PostPreview
              title={post.title}
              coverImage={post.coverImage}
              date={new Date(post.publishedAt)}
              slug={post.slug}
              excerpt={post.excerpt}
            />
          </div>
        ))}
      </div>

      {!allPostsLoaded && (
        <div className="flex justify-center mt-8">
          <button
            className="border-solid border-2 border-black text-black dark:border-white dark:text-white font-bold py-3 px-8 mb-10 rounded hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black duration-200 transition-colors"
            onClick={handleShowMore}
            disabled={loading}
          >
            {loading ? t("loading") : t("showMore")}
          </button>
        </div>
      )}
    </section>
  );
}

"use client";

import React, { useState } from "react";
import Post from "@/interfaces/post";
import { PostPreview } from "@/components/post-preview";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

type Props = {
  posts: Post[];
};

export function MorePosts({ posts }: Props) {
  const [visiblePosts, setVisiblePosts] = useState(9);

  const handleShowMore = () => {
    setVisiblePosts((prevVisiblePosts) => prevVisiblePosts + 9);
  };

  const t = useTranslations("HomePage");

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
              date={post.publishedAt}
              slug={post.slug}
              excerpt={post.excerpt}
            />
          </div>
        ))}
      </div>

      {visiblePosts < posts.length && (
        <div className="flex justify-center mt-8">
          <button
            className="border-solid border-2 border-black text-black dark:border-white dark:text-white font-bold py-3 px-8 mb-10 rounded hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black duration-200 transition-colors"
            onClick={handleShowMore}
          >
            {t("showMore")}
          </button>
        </div>
      )}
    </section>
  );
}

import { Post } from "@prisma/client";
import { PostPreview } from "@/app/[locale]/components/post-preview";
import React from "react";
import { useTranslations } from "next-intl";

type PostDisplayedProps = {
  initialPosts: Post[];
};

export default function PostDisplayed({ initialPosts }: PostDisplayedProps) {
  const t = useTranslations("HomePage");
  return (
    <section>
      <h2 className="mb-8 text-5xl md:text-7xl font-bold tracking-tighter leading-tight">
        {t("more")}
      </h2>

      <div className="flex flex-wrap -m-4">
        {initialPosts.map((post) => (
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
    </section>
  );
}

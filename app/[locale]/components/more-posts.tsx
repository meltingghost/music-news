import React from "react";
import { PostPreview } from "@/app/[locale]/components/post-preview";
import { useTranslations } from "next-intl";
import ShowMoreButton from "@/app/[locale]/components/show-more-button";
import {
  fetchInitialPosts,
  Locale,
} from "@/app/[locale]/components/posts-logic";

type CarrouselProps = {
  locale: Locale;
};

export async function MorePosts({ locale }: CarrouselProps) {
  const { posts: initialPosts, totalPosts } = await fetchInitialPosts(locale);

  const t = useTranslations("HomePage");

  return (
    <>
      {initialPosts.length > 0 && (
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

          {initialPosts.length < totalPosts && (
            <div className="flex justify-center mt-8">
              <ShowMoreButton
                initialPosts={initialPosts}
                totalPosts={totalPosts}
                locale={locale}
              />
            </div>
          )}
        </section>
      )}
    </>
  );
}

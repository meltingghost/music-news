import React from "react";
import {
  fetchInitialPosts,
  Locale,
} from "@/app/[locale]/components/posts-logic";
import ShowMoreLogic from "@/app/[locale]/components/show-more-logic";

type CarrouselProps = {
  locale: Locale;
};

export async function MorePosts({ locale }: CarrouselProps) {
  const { posts: initialPosts, totalPosts } = await fetchInitialPosts(locale);

  return (
    <>
      {initialPosts.length > 0 && (
        <>
          {initialPosts.length < totalPosts && (
            <div className="flex justify-center mt-8">
              <ShowMoreLogic
                initialPosts={initialPosts}
                totalPosts={totalPosts}
                locale={locale}
              />
            </div>
          )}
        </>
      )}
    </>
  );
}

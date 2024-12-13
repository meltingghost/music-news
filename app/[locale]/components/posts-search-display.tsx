"use client";

import { useState, useEffect } from "react";
import { Post } from "@prisma/client";
import { PostPreview } from "@/app/[locale]/components/post-preview";
import { useTranslations } from "next-intl";
import { notFound } from "next/navigation";
import { fetchPostsBySearchResult } from "@/app/lib/fetches";
import { Locale } from "@/app/[locale]/components/posts-logic";

interface PostsSearchDisplayProps {
  locale: Locale;
  query: string;
}

export default function PostsSearchDisplay({
  locale,
  query,
}: PostsSearchDisplayProps) {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<Post[]>([]);

  const t = useTranslations("HomePage");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const results = await fetchPostsBySearchResult(query, 0, 10, locale);
        setPosts(results);
      } finally {
        setLoading(false);
      }
    };

    if (query) fetchData();
  }, [query, locale]);

  if (!posts && !loading) {
    return notFound();
  }

  return (
    <div className="p-9">
      {loading ? (
        <div className="flex flex-col items-center justify-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mb-4"></div>
          <p className="text-center text-lg text-blue-700 animate-pulse">
            {t("loading")}...
          </p>
        </div>
      ) : posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div key={post.slug} className="p-4">
              <PostPreview
                title={post.titleTranslations[locale]}
                coverImage={post.coverImage}
                date={new Date(post.publishedAt)}
                slug={post.slug}
                excerpt={post.excerptTranslations[locale] || "null"}
              />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-lg">No results found</p>
      )}
    </div>
  );
}

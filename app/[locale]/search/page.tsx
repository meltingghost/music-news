"use client";

import { useSearchParams } from "next/navigation";
import { PostPreview } from "../components/post-preview";
import { useEffect, useState } from "react";
import { getPostsBySearchResult } from "@/app/actions";
import { Post } from "@prisma/client";
import { notFound } from "next/navigation";
import { Navbar } from "@/app/[locale]/components/navbar";
import { useTranslations } from "next-intl";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const results = await getPostsBySearchResult(query, 0, 10, "en");
        setPosts(results);
      } finally {
        setLoading(false);
      }
    };

    if (query) fetchData();
  }, [query]);

  const t = useTranslations("HomePage");

  if (!posts && !loading) {
    return notFound();
  }

  return (
    <main>
      <Navbar />
      <div className="py-11">
        <h1 className="text-5xl mb-9 text-center">
          {t("searchResult")}"{query}"
        </h1>
        {loading ? (
          <p className="text-center text-lg">Loading...</p>
        ) : posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {posts.map((post) => (
              <div key={post.slug} className="p-4">
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
        ) : (
          <p className="text-center text-lg">No results found</p>
        )}
      </div>
    </main>
  );
}

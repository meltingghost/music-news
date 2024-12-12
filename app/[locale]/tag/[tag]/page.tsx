"use client";

import { useEffect, useState } from "react";
import { notFound, useParams, usePathname } from "next/navigation";
import Navbar from "@/app/[locale]/components/navbar";
import { useTranslations } from "next-intl";
import { PostPreview } from "@/app/[locale]/components/post-preview";
import { TagHeader } from "@/app/[locale]/components/headers";

type Params = {
  tag: string | string[];
  locale: "en" | "es";
};

type Post = {
  id: number;
  title: string;
  excerpt: string;
  slug: string;
  coverImage: string;
  publishedAt: string;
};

export default function TagPage() {
  const { tag, locale } = useParams<Params>();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (tag && locale) {
      const fetchPosts = async () => {
        setLoading(true);
        try {
          const res = await fetch(
            `/api/tags/posts-by-tag/${tag}?locale=${locale}`
          );
          const data = await res.json();
          setPosts(data);
        } finally {
          setLoading(false);
        }
      };
      fetchPosts();
    }
  }, [tag, locale]);

  const t = useTranslations("HomePage");

  if (!posts && !loading) {
    return notFound();
  }

  return (
    <main>
      <Navbar locale={locale} />
      <TagHeader tag={tag} />
      <div className="p-12">
        {loading ? (
          <p className="text-center text-lg">{t("loading")}</p>
        ) : posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <div key={post.id} className="p-4">
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
          <p className="text-center text-lg">{t("noResults")}</p>
        )}
      </div>
    </main>
  );
}

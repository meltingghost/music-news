"use client";

import Navbar from "@/app/[locale]/components/navbar";
import { TagHeader } from "@/app/[locale]/components/headers";
import { useParams, notFound } from "next/navigation";
import { Locale } from "@/app/[locale]/components/posts-logic";
import TagPostsDisplay from "@/app/[locale]/components/tag-posts-display";
import { useState, useEffect } from "react";

type Params = {
  tag: string | string[];
  locale: Locale;
};

type Post = {
  id: number;
  title: string;
  excerpt: string;
  slug: string;
  coverImage: string;
  publishedAt: string;
};

export default function TagPageContent() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  const { tag, locale } = useParams<Params>();

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

  if (!posts && !loading) {
    return notFound();
  }

  return (
    <main>
      <Navbar locale={locale} />
      <TagHeader tag={tag} />
      <TagPostsDisplay posts={posts} loading={loading} />
    </main>
  );
}

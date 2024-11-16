"use client";

import { useSearchParams } from "next/navigation";
import { PostPreview } from "../components/post-preview";
import { useEffect, useState } from "react";
import { getPostsBySearchResult } from "@/app/actions";
import { Post } from "@prisma/client";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const results = await getPostsBySearchResult(query, 0, 10, "en");
      setPosts(results);
    };
    if (query) fetchData();
  }, [query]);

  return (
    <div>
      <h1>Search Results for "{query}"</h1>
      {posts.length > 0 ? (
        posts.map((post) => (
          <div key={post.slug} className="p-4 w-full md:w-1/3 flex-grow">
            <PostPreview
              title={post.title}
              coverImage={post.coverImage}
              date={new Date(post.publishedAt)}
              slug={post.slug}
              excerpt={post.excerpt}
            />
          </div>
        ))
      ) : (
        <p>No results found</p>
      )}
    </div>
  );
}

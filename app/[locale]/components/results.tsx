"use client";
import React from "react";
import { useEffect, useState } from "react";

type Article = {
  title: string;
  snippet: string;
  url: string;
};

interface MetaUrl {
  scheme: string;
  netloc: string;
  hostname: string;
  favicon: string;
  path: string;
}

interface Thumbnail {
  src: string;
}

interface ArticleData {
  type: string;
  title: string;
  url: string;
  description: string;
  age: string;
  page_age: Date;
  meta_url: MetaUrl;
  thumbnail: Thumbnail;
}

export default function MusicNews() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch("/api/storeArticle?query=Music");
        if (!response.ok) {
          throw new Error("Failed to fetch articles");
        }
        const data: Article[] = await response.json();
        setArticles(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      }
    };

    fetchArticles();
  }, []);

  return (
    <div>
      <h1 className="text-3xl mb-4">Latest News</h1>
      <div>
        {error && <p>Error: {error}</p>}
        {articles.map((article, index) => (
          <div key={index} className="p-4 border-b">
            <h2 className="text-xl font-bold">{article.title}</h2>
            <p>{article.snippet}</p>
            <a href={article.url} className="text-blue-500">
              Read more
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

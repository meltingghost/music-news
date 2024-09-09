"use client";
import React from "react";
import { useState } from "react";
import prisma from "@/lib/prisma";

type SearchResult = {
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
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  const handleSearch = async (query: string) => {
    try {
      const res = await fetch(`/api/search?query=${query}`);
      const data = await res.json();
      setSearchResults(data);

      for (const result of data) {
        await fetch("/api/storeArticle", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            type: result.type,
            title: result.title,
            url: result.url,
            description: result.description,
            age: result.age,
            page_age: result.pageAge,
            meta_url: {
              scheme: result.meta_url.scheme,
              netloc: result.meta_url.netloc,
              hostname: result.meta_url.hostname,
              favicon: result.meta_url.favicon,
              path: result.meta_url.path,
            },
            thumbnail: {
              src: result.thumbnail?.src,
            },
          }),
        });
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search music news..."
        onKeyDown={(e) => {
          if (e.key === "Enter")
            handleSearch((e.target as HTMLInputElement).value);
        }}
        className="border p-2"
      />
      <div>
        {searchResults.map((result, index) => (
          <div key={index} className="p-4 border-b">
            <h2 className="text-xl font-bold">{result.title}</h2>
            <p>{result.snippet}</p>
            <a href={result.url} className="text-blue-500">
              Read more
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";

type SearchResult = {
  title: string;
  snippet: string;
  url: string;
};

export default function MusicNews() {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  const handleSearch = async (query: string) => {
    try {
      const res = await fetch(`/api/search?query=${query}`);
      const data = await res.json();
      setSearchResults(data);
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

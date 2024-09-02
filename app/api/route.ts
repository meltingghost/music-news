import { NextApiRequest, NextApiResponse } from "next";

type SearchResult = {
  title: string;
  snippet: string;
  url: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { query } = req.query;

  if (typeof query !== "string") {
    res.status(400).json({ error: "Invalid query parameter" });
    return;
  }

  try {
    const response = await fetch(
      `https://api.search.brave.com/res/v1/news/search?q=${query}`,
      {
        headers: {
          Accept: "application/json",
          "X-Subscription-Token": "BSA8jDXYKZERIIrABnFfShYkl8NhKQA",
        },
      }
    );
    const data = await response.json();
    res.status(200).json(data.results as SearchResult[]);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch search results" });
  }
}

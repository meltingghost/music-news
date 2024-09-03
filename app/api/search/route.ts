import { NextRequest, NextResponse } from "next/server";

type SearchResult = {
  title: string;
  snippet: string;
  url: string;
};

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query");

  if (!query) {
    return NextResponse.json(
      { error: "Invalid query parameter" },
      { status: 400 }
    );
  }

  const token = process.env.BRAVE_API_TOKEN;

  if (!token) {
    return NextResponse.json(
      { error: "API token is not set" },
      { status: 500 }
    );
  }

  try {
    const response = await fetch(
      `https://api.search.brave.com/res/v1/news/search?q=${query}`,
      {
        headers: {
          Accept: "application/json",
          "X-Subscription-Token": token,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch search results");
    }

    const data = await response.json();
    return NextResponse.json(data.results as SearchResult[]);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch search results" },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

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
      `https://api.search.brave.com/res/v1/news/search?q=Music`,
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
    const articlesToReturn = [];

    if (Array.isArray(data.results)) {
      for (const article of data.results) {
        articlesToReturn.push(article);

        const existingArticle = await prisma.newsArticle.findUnique({
          where: { url: article.url },
        });

        if (!existingArticle) {
          await prisma.newsArticle.create({
            data: {
              type: article.type,
              title: article.title,
              url: article.url,
              description: article.description,
              age: article.age,
              pageAge: new Date(article.page_age),
              scheme: article.meta_url?.scheme,
              netloc: article.meta_url?.netloc,
              hostname: article.meta_url?.hostname,
              favicon: article.meta_url?.favicon,
              path: article.meta_url?.path,
              thumbnail: article.thumbnail?.src,
            },
          });
        } else {
          console.log(`Article with URL ${article.url} already exists.`);
        }
      }
    } else {
      console.error("No results found in the API response.");
      return NextResponse.json({ error: "No results found" }, { status: 520 });
    }

    return NextResponse.json(articlesToReturn, { status: 200 });
  } catch (error) {
    console.error("Error fetching or storing articles:", error);
    return NextResponse.json(
      { error: "Failed to fetch or store articles" },
      { status: 500 }
    );
  }
}

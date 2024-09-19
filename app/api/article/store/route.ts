import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const token = process.env.BRAVE_API_TOKEN;
  const authHeader = req.headers.get("API_TOKEN");

  if (!token) {
    return NextResponse.json(
      { error: "API token is not set" },
      { status: 500 }
    );
  }

  if (authHeader !== process.env.API_TOKEN) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const oldestNewsSource = await prisma.sources.findFirst({
      orderBy: {
        updatedAt: "desc",
      },
    });

    if (!oldestNewsSource) {
      return NextResponse.json(
        { error: "No sources available" },
        { status: 500 }
      );
    }

    await prisma.sources.update({
      where: { id: oldestNewsSource.id },
      data: { updatedAt: new Date() },
    });

    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    const randomIndex = Math.floor(Math.random() * alphabet.length);
    const keyword = alphabet[randomIndex];

    const searchQuery = oldestNewsSource
      ? `${keyword} site:${oldestNewsSource.url}`
      : `${keyword}`;

    const url =
      "https://api.search.brave.com/res/v1/news/search?q=" + searchQuery;

    const response = await fetch(url, {
      headers: {
        Accept: "application/json",
        "X-Subscription-Token": token,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch search results");
    }

    const data = await response.json();

    if (Array.isArray(data.results)) {
      for (const article of data.results) {
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
              sourceId: oldestNewsSource.id,
              parsed: false,
            },
          });
        } else {
          console.log(`Article with URL ${article.url} already exists.`);
        }
      }
      return NextResponse.json(
        { message: "Articles processed successfully" },
        { status: 200 }
      );
    } else {
      console.error("No results found in the API response.");
      return NextResponse.json({ error: "No results found" }, { status: 520 });
    }
  } catch (error) {
    console.error("Error fetching or storing articles:", error);
    return NextResponse.json(
      { error: "Failed to fetch or store articles" },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

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

export async function GET(req: NextRequest) {
  const token = process.env.BRAVE_API_TOKEN;

  if (!token) {
    return NextResponse.json(
      { error: "API token is not set" },
      { status: 500 }
    );
  }

  try {
    const randomSource = await prisma.sources.findFirst({
      orderBy: {
        id: "asc",
      },
      take: 1,
      skip: Math.floor(Math.random() * (await prisma.sources.count())),
    });

    if (!randomSource) {
      return NextResponse.json(
        { error: "No sources available" },
        { status: 500 }
      );
    }

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

    if (Array.isArray(data.results)) {
      const filteredData = data.results.filter((article: ArticleData) =>
        article.url.includes(randomSource.url)
      );

      console.log(filteredData);
      for (const article of filteredData) {
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
              sourceId: randomSource.id,
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

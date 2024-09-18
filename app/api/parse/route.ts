import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { JSDOM } from "jsdom";
import { Readability } from "@mozilla/readability";

export default async function parseArticles() {
  try {
    const unparsedArticles = await prisma.newsArticle.findMany({
      where: { parsed: false },
      select: { url: true, id: true },
    });

    for (const article of unparsedArticles) {
      try {
        const response = await fetch(article.url);
        const articleHtml = await response.text();

        const dom = new JSDOM(articleHtml);
        const reader = new Readability(dom.window.document);
        const parsedArticle = reader.parse();

        if (!parsedArticle) {
          console.error(
            `Failed to parse article content for URL: ${article.url}`
          );
          await prisma.newsArticle.update({
            where: { id: article.id },
            data: {
              deleted: true,
            },
          });
          continue;
        }

        await prisma.newsArticle.update({
          where: { id: article.id },
          data: {
            parsed: true,
            parsedTitle: parsedArticle.title,
            parsedContent: parsedArticle.content,
            parsedExcerpt: parsedArticle.excerpt,
          },
        });

        console.log(
          `Successfully parsed and updated article with URL: ${article.url}`
        );
      } catch (error) {
        console.error(
          `Error processing article with URL: ${article.url}`,
          error
        );
      }
    }

    return NextResponse.json(
      { message: "Articles processed successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching unparsed articles", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

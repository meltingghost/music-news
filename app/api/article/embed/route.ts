import { NextRequest, NextResponse } from "next/server";
import { getEmbedding } from "@/utils/openai";
import prisma from "@/lib/prisma";
export const maxDuration = 60;

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get("API_TOKEN");

  if (authHeader !== process.env.API_TOKEN) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const articles = await prisma.newsArticle.findMany({
      where: {
        deleted: false,
        parsed: true,
        vectorized: false,
      },
      select: {
        id: true,
        url: true,
        parsedContent: true,
      },
    });

    for (const article of articles) {
      try {
        if (article.parsedContent === null) {
          console.warn(
            `Skipping article with URL: ${article.url} due to null content`
          );
          continue;
        }

        const Embedding = await getEmbedding(article.parsedContent);
        await prisma.$executeRaw`
  UPDATE "NewsArticle"
  SET "embedding" = ${Embedding}::vector, "vectorized" = true
  WHERE "id" = ${article.id}
`;
        console.log(`Successfully embedded article with URL: ${article.url}`);
      } catch (error) {
        console.error(
          `Error processing article with URL: ${article.url}`,
          error
        );
      }
    }

    return NextResponse.json(
      { message: "Embeddings generated and stored successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing embeddings:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

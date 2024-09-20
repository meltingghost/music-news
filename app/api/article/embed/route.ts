import { NextRequest, NextResponse } from "next/server";
import { getEmbedding } from "@/utils/openai";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get("API_TOKEN");

  if (authHeader !== process.env.API_TOKEN) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const articles = await prisma.newsArticle.findMany({
      select: {
        id: true,
        url: true,
        parsedContent: true,
      },
    });

    for (const article of articles) {
      try {
        const Embedding = await getEmbedding(article.parsedContent);
        const embeddingString = JSON.stringify(Embedding);

        await prisma.newsArticle.update({
          where: { id: article.id },
          data: {
            vectorized: true,
            embedding: embeddingString,
          },
        });

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

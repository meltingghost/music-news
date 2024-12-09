import { NextRequest, NextResponse } from "next/server";
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
        storedImage: true,
        filtered: false,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 10,
      select: {
        id: true,
        title: true,
        url: true,
      },
    });

    await Promise.all(
      articles.map(async (article) => {
        try {
          const similarNews: [
            {
              id: string;
              similarity: number;
            }
          ] = await prisma.$queryRaw`
            WITH comparation AS (
              SELECT embedding AS comparation_embedding
              FROM "NewsArticle"
              WHERE id = ${article.id}
            )
            SELECT n.id,
              1 - (n.embedding <=> c.comparation_embedding) AS similarity
            FROM "NewsArticle" n,
              comparation c
            WHERE n.id != ${article.id}
              AND n.embedding IS NOT NULL
            ORDER BY similarity DESC
            LIMIT 1;
          `;

          const _SIMILARITY_THRESHOLD = 0.9495;

          if (similarNews[0]?.similarity > _SIMILARITY_THRESHOLD) {
            await prisma.newsArticle.update({
              where: {
                id: article.id,
              },
              data: {
                deleted: true,
                deletedReason: `Similar to ${similarNews[0].id} (${similarNews[0].similarity})`,
              },
            });
          } else {
            await prisma.newsArticle.update({
              where: { id: article.id },
              data: {
                filtered: true,
              },
            });
          }

          console.log(
            `Successfully processed article with URL: ${article.url}`
          );
        } catch (error) {
          console.error(
            `Error processing article with URL: ${article.url}`,
            error
          );
        }
      })
    );

    return NextResponse.json(
      { message: "Articles filtered successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("An error occurred while filtering articles", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

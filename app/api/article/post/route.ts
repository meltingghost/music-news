import { NextRequest, NextResponse } from "next/server";
import { writePost } from "@/utils/openai";
import prisma from "@/lib/prisma";
import { v4 as uuidv4 } from "uuid";
import slugify from "slugify";

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
        filtered: true,
        posted: false,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 20,
      select: {
        id: true,
        title: true,
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

        const blogContent = await writePost(article.parsedContent);

        if (!blogContent) {
          console.error(`Error generating Blog Content for ${article.id}`);
          await prisma.newsArticle.update({
            where: {
              id: article.id,
            },
            data: {
              deleted: true,
              deletedReason: "Unable to generate Blog Post",
            },
          });
        } else {
          const slug = slugify(article.title, { lower: true, strict: true });

          await prisma.post.create({
            data: {
              slug: slug || uuidv4(),
              title: article.title,
              content: blogContent,
              articleId: article.id,
            },
          });

          await prisma.newsArticle.update({
            where: { id: article.id },
            data: { posted: true },
          });

          console.log(`Successfully posted article with URL: ${article.url}`);
        }
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
    console.error("An error occurred while processing articles", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

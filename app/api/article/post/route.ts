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
    const article = await prisma.newsArticle.findFirst({
      where: {
        deleted: false,
        filtered: true,
        posted: false,
      },
      orderBy: {
        createdAt: "asc",
      },
      select: {
        id: true,
        title: true,
        url: true,
        parsedContent: true,
        cloudinaryUrl: true,
      },
    });

    if (!article) {
      return NextResponse.json(
        { message: "No articles to process" },
        { status: 200 }
      );
    }

    if (article.parsedContent === null) {
      console.warn(
        `Skipping article with URL: ${article.url} due to null content`
      );
      return NextResponse.json(
        { message: "Article skipped due to null content" },
        { status: 200 }
      );
    }

    try {
      const {
        blogContent,
        blogTitle,
        blogExcerpt,
        blogSpanishTitle,
        blogSpanishContent,
        blogSpanishExcerpt,
      } = await writePost(article.parsedContent);

      const titleTranslations = { en: blogTitle, es: blogSpanishTitle };
      const contentTranslations = { en: blogContent, es: blogSpanishContent };
      const excerptTranslations = { en: blogExcerpt, es: blogSpanishExcerpt };

      if (
        !titleTranslations ||
        !contentTranslations ||
        !excerptTranslations ||
        !blogTitle ||
        !blogContent
      ) {
        console.error(
          `Error generating Blog Content, Title, or Excerpt for article with URL: ${article.url}`
        );
        await prisma.newsArticle.update({
          where: {
            id: article.id,
          },
          data: {
            deleted: true,
            deletedReason: "Unable to generate Blog Post, Title, or Excerpt",
          },
        });
      } else {
        const slug = slugify(blogTitle, { lower: true, strict: true });

        await Promise.all([
          prisma.post.create({
            data: {
              slug: slug || uuidv4(),
              title: blogTitle,
              content: blogContent,
              excerpt: blogExcerpt || "",
              coverImage: article.cloudinaryUrl || "",
              articleId: article.id,
              publishedAt: new Date(),
              titleTranslations: titleTranslations,
              contentTranslations: contentTranslations,
              excerptTranslations: excerptTranslations,
            },
          }),
          prisma.newsArticle.update({
            where: { id: article.id },
            data: { posted: true },
          }),
        ]);

        console.log(`Successfully posted article with URL: ${article.url}`);
      }
    } catch (error) {
      console.error(`Error processing article with URL: ${article.url}`, error);
    }

    return NextResponse.json(
      { message: "Article processed successfully" },
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

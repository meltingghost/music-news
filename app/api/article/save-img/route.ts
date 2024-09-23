import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { JSDOM } from "jsdom";
import { v2 as cloudinary } from "cloudinary";
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
        vectorized: true,
        storedImage: false,
      },
      select: { url: true, id: true },
    });

    for (const article of articles) {
      try {
        const response = await fetch(article.url);
        const articleHtml = await response.text();

        const dom = new JSDOM(articleHtml);
        const document = dom.window.document;

        const ogImage = document
          .querySelector('meta[property="og:image"]')
          ?.getAttribute("content");
        const twitterImage = document
          .querySelector('meta[name="twitter:image"]')
          ?.getAttribute("content");
        const wpImage = document
          .querySelector(".wp-post-image")
          ?.getAttribute("src");

        const imageUrl = ogImage || twitterImage || wpImage;

        if (imageUrl) {
          const uploadResponse = await cloudinary.uploader.upload(imageUrl);

          await prisma.newsArticle.update({
            where: { id: article.id },
            data: {
              storedImage: true,
              cloudinaryUrl: uploadResponse.secure_url,
            },
          });
        } else {
          console.error(`Failed to get article image for URL: ${article.url}`);
          await prisma.newsArticle.update({
            where: { id: article.id },
            data: {
              deleted: true,
            },
          });
        }
      } catch (error) {
        console.error(
          `Error processing article with URL: ${article.url}`,
          error
        );
      }
    }

    return NextResponse.json(
      { message: "Images processed successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("An error occurred while processing images", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

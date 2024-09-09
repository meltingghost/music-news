import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const article = await prisma.newsArticle.create({
      data: {
        type: data.type,
        title: data.title,
        url: data.url,
        description: data.description,
        age: data.age,
        pageAge: data.page_age,
        scheme: data.meta_url.scheme,
        netloc: data.meta_url.netloc,
        hostname: data.meta_url.hostname,
        favicon: data.meta_url.favicon,
        path: data.meta_url.path,
        thumbnail: data.thumbnail?.src,
      },
    });
    return NextResponse.json(article, { status: 200 });
  } catch (error) {
    console.error("Error storing article:", error);
    return NextResponse.json(
      { error: "Error storing article" },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import { JSDOM } from "jsdom";
import { Readability } from "@mozilla/readability";

export async function GET(req: NextRequest) {
  const token = process.env.BRAVE_API_TOKEN;

  if (!token) {
    return NextResponse.json(
      { error: "API token is not set" },
      { status: 500 }
    );
  }

  try {
    const { searchParams } = new URL(req.url);
    const articleUrl = searchParams.get("url");

    if (!articleUrl) {
      return NextResponse.json({ error: "No URL provided" }, { status: 400 });
    }

    const response = await fetch(articleUrl);
    const articleHtml = await response.text();

    const dom = new JSDOM(articleHtml);
    const reader = new Readability(dom.window.document);
    const parsedArticle = reader.parse();

    if (!parsedArticle) {
      return NextResponse.json(
        { error: "Failed to parse article content" },
        { status: 422 }
      );
    }

    return NextResponse.json({
      title: parsedArticle.title,
      content: parsedArticle.textContent,
      excerpt: parsedArticle.excerpt,
    });
  } catch (error) {
    console.error("Error parsing article", error);
    return NextResponse.json(
      { error: "Failed to parse article" },
      { status: 500 }
    );
  }
}

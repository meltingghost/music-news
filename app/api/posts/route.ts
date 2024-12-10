import { NextResponse } from "next/server";
import { getPaginatedPosts } from "@/app/lib/queries";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const skip = parseInt(searchParams.get("skip") || "0");
  const take = parseInt(searchParams.get("take") || "9");
  const locale = (searchParams.get("locale") as "en" | "es") || "en";

  try {
    const { posts, totalPosts } = await getPaginatedPosts(skip, take, locale);
    return NextResponse.json({ posts, totalPosts });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}

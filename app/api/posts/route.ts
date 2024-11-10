import { NextRequest, NextResponse } from "next/server";
import { getPaginatedPosts } from "@/app/actions";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const skip = parseInt(searchParams.get("skip") || "0", 10);
  const take = parseInt(searchParams.get("take") || "9", 10);
  const locale = searchParams.get("locale") || "en";

  try {
    const posts = await getPaginatedPosts(skip, take, locale as "en" | "es");
    return NextResponse.json(posts);
  } catch (error) {
    console.error("Error fetching paginated posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}

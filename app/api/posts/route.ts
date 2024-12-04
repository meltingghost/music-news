import { NextRequest, NextResponse } from "next/server";
// import { getPaginatedPostsByCategory } from "@/app/actions";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const take = parseInt(searchParams.get("take") || "9", 10);
  const locale = searchParams.get("locale") || "en";
  // const categoryId = parseInt(searchParams.get("categoryId") || "0", 10);
  const loadedPostIds = searchParams.get("loadedPostIds")
    ? searchParams.get("loadedPostIds")!.split(",").map(Number)
    : [];

  try {
    // const posts = await getPaginatedPostsByCategory(
    //   take,
    //   locale as "en" | "es",
    //   categoryId,
    //   loadedPostIds
    // );
    // return NextResponse.json(posts);
  } catch (error) {
    console.error("Error fetching paginated posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}
